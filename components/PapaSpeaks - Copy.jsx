import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePapa } from "../hooks/usePapa";

/**
 * PapaSpeaks — drop this anywhere Papa should respond to a moment.
 *
 * Props:
 *   context     — object passed to usePapa: { event, adventure, step, catchData }
 *   fallbackKey — key from papaVoice.json to use if API fails
 *   trigger     — any value; when it changes, Papa speaks again
 *   className   — optional extra classes
 *
 * Usage (home screen greeting):
 *   <PapaSpeaks context={{ event: "opened the app" }} fallbackKey="home.morning" />
 *
 * Usage (after a catch):
 *   <PapaSpeaks
 *     context={{ event: "caught a fish", catchData: { species: "Bluegill" } }}
 *     fallbackKey="catch.first"
 *     trigger={catchId}
 *   />
 */
export default function PapaSpeaks({
  context = {},
  fallbackKey = "fallback",
  trigger,
  className = "",
}) {
  const { line, loading, ask } = usePapa();

  // Ask Papa whenever trigger changes (or on first mount)
  useEffect(() => {
  ask(context, fallbackKey);
}, [ask, context, fallbackKey, trigger]);

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
