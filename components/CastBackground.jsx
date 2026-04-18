import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import chamberDefaults from "../data/chamberBackgrounds.json";

/**
 * Props:
 * - chamberKey: one of the keys in chamberBackgrounds.json
 * - overrideSrc?: optional image URL (e.g., from story system)
 * - overlay?: Tailwind classes for scrim
 * - className?: extra classes
 */
export default function CastBackground({
  chamberKey,
  overrideSrc,
  overlay = "absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60",
  className = "",
  children
}) {
  const def = chamberDefaults[chamberKey];
  const src = overrideSrc || def?.src;

  return (
    <div className="min-h-screen bg-[#0a0f14] px-3 py-3 md:px-4 md:py-4">
  <div className={`relative mx-auto min-h-[calc(100vh-2rem)] w-full max-w-[1080px] overflow-hidden rounded-[24px] ${className}`}>
      <AnimatePresence mode="wait">
        {src && (
          <motion.img
            key={`${chamberKey}:${src}`}
            src={src}
            alt={def?.caption || chamberKey}
            className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className={overlay} />
      <div className="relative">{children}</div>
    </div>
	</div>
  );
}
