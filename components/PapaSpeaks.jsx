import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePapa } from "../hooks/usePapa";

export default function PapaSpeaks({
  context = {},
  fallbackKey = "fallback",
  trigger,
  mode = "mini",
  className = "",
  onResponse,
}) {
  const { line, loading, ask } = usePapa();
  const lastDeliveredRef = useRef(null);
  const lastAskKeyRef = useRef(null);

  const askKey = useMemo(() => {
    return JSON.stringify({
      context,
      fallbackKey,
      trigger,
      mode,
    });
  }, [context, fallbackKey, trigger, mode]);

  useEffect(() => {
    if (lastAskKeyRef.current === askKey) return;
    lastAskKeyRef.current = askKey;

    ask(context, fallbackKey, mode);
    lastDeliveredRef.current = null;
  }, [ask, askKey, context, fallbackKey, mode]);

  useEffect(() => {
    if (!line || typeof onResponse !== "function") return;
    if (lastDeliveredRef.current === line) return;

    lastDeliveredRef.current = line;
    onResponse(line);
  }, [line, onResponse]);

  return (
    <div className={`papa-speaks ${className}`}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="typing"
            className="papa-speaks-typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="papa-dot" />
            <span className="papa-dot" />
            <span className="papa-dot" />
          </motion.div>
        ) : line ? (
          <motion.p
            key={line}
            className="papa-speaks-line"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}