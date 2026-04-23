import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import chamberDefaults from "../data/chamberBackgrounds.json";

function getTimeKey() {
  const hour = new Date().getHours();
  if (hour < 11) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function resolveBackground(def, { variant, useTimeVariant = true } = {}) {
  if (!def) return null;

  // Backward compatibility: old flat format
  if (def.src) return def;

  // Explicit variant wins
  if (variant && def?.variants?.[variant]) {
    return def.variants[variant];
  }

  // Automatic time-based variant
  if (useTimeVariant) {
    const timeKey = getTimeKey();
    if (def?.variants?.[timeKey]) {
      return def.variants[timeKey];
    }
  }

  // Fallback to default
  return def.default || null;
}

/**
 * Props:
 * - chamberKey: one of the keys in chamberBackgrounds.json
 * - overrideSrc?: optional image URL
 * - variant?: optional explicit variant key like "morning" or "evening"
 * - useTimeVariant?: whether to auto-resolve by time of day
 * - overlay?: Tailwind classes for scrim
 * - className?: extra classes
 */
export default function CastBackground({
  chamberKey,
  overrideSrc,
  variant,
  useTimeVariant = true,
  overlay = "absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60",
  className = "",
  children,
}) {
  const def = chamberDefaults[chamberKey];

  const activeBg = overrideSrc
    ? {
        src: overrideSrc,
        caption: def?.default?.caption || def?.caption || chamberKey,
      }
    : resolveBackground(def, { variant, useTimeVariant });

  const src = activeBg?.src;

  return (
    <div className="min-h-screen bg-[#0a0f14] px-0 py-0 md:px-4 md:py-4">
      <div
        className={`relative mx-auto min-h-screen w-full overflow-hidden rounded-none md:min-h-[calc(100vh-2rem)] md:max-w-[1080px] md:rounded-[24px] ${className}`}
      >
        <AnimatePresence mode="wait">
          {src && (
            <motion.img
  key={`${chamberKey}:${src}`}
  src={src}
  alt={activeBg?.caption || chamberKey}
  className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover object-[42%_center]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
/>
          )}
        </AnimatePresence>

        <div className={overlay} />
        <div className="relative z-10 min-h-screen md:min-h-[calc(100vh-2rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}