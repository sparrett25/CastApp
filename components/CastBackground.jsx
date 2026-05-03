import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import chamberDefaults from "../data/chamberBackgrounds.json";
import { DEFAULT_REGION_KEY } from "../data/regionOptions";
import { resolveChamberBackgroundSrc } from "../utils/resolveChamberBackground";
import { useProfile } from "../context/ProfileContext";

function getTimeKey() {
  const hour = new Date().getHours();

  if (hour < 7) return "blue-hour-dawn";
  if (hour < 11) return "soft-morning-rise";
  if (hour < 16) return "late-afternoon-warmth";
  if (hour < 19) return "golden-dusk";
  return "quiet-evening-glow";
}

function resolveBackground(def, { variant, useTimeVariant = true } = {}) {
  if (!def) return null;

  if (def.src) return def;

  if (variant && def?.variants?.[variant]) {
    return {
      ...def.variants[variant],
      timeKey: variant,
    };
  }

  if (useTimeVariant) {
    const timeKey = getTimeKey();

    if (def?.variants?.[timeKey]) {
      return {
        ...def.variants[timeKey],
        timeKey,
      };
    }
  }

  return def.default || null;
}

export default function CastBackground({
  chamberKey,
  overrideSrc,
  variant,
  useTimeVariant = true,
  regionKey,
  overlay = "absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/60",
  className = "",
  children,
}) {
  const { profilePacket } = useProfile();

  const activeRegionKey =
  regionKey ||
  profilePacket?.regionKey ||
  profilePacket?.region_key ||
  DEFAULT_REGION_KEY;

  const def = chamberDefaults[chamberKey];

  const activeBg = overrideSrc
    ? {
        src: overrideSrc,
        caption: def?.default?.caption || def?.caption || chamberKey,
      }
    : resolveBackground(def, { variant, useTimeVariant });

  const timeKey = activeBg?.timeKey || variant || getTimeKey();

  const src =
    overrideSrc ||
    resolveChamberBackgroundSrc({
      chamberKey,
      timeKey,
      regionKey: activeRegionKey,
    }) ||
    activeBg?.src;

  return (
    <div className="min-h-screen bg-[#0a0f14] px-0 py-0 md:px-4 md:py-4">
      <div
        className={`relative mx-auto min-h-screen w-full overflow-hidden rounded-none md:min-h-[calc(100vh-2rem)] md:max-w-[1080px] md:rounded-[24px] ${className}`}
      >
        <AnimatePresence mode="wait">
          {src && (
            <motion.img
              key={`${chamberKey}:${activeRegionKey}:${timeKey}:${src}`}
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