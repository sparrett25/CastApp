// /src/components/ChamberBackground.jsx (STATIC, simple)
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaterShimmerOverlay from "./WaterShimmerOverlay";
import backgrounds from "../data/backgrounds.json";

/**
 * Props:
 * - chamber: "mirror-lake" (matches a key in backgrounds.json)
 * - storyState: { chapter, tone, time } (you can pass your dev toggles)
 * - variant: specific background id (optional)
 */
export default function ChamberBackground({
  chamber,
  storyState = {},
  variant,
  overlay = "absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60",
  className = "",
  children,
}) {
  const list = backgrounds?.[chamber] || [];

  if (!list.length) {
    console.warn(`[ChamberBackground] No backgrounds found for chamber "${chamber}".`);
  }

  const active = pickBackground(list, storyState, variant);

  return (
    <div className="min-h-screen bg-[#0a0f14] px-3 py-3 md:px-4 md:py-4">
  <div className={`relative mx-auto min-h-[calc(100vh-2rem)] w-full max-w-[1400px] overflow-hidden rounded-[24px] ${className}`}>
      <AnimatePresence mode="wait">
        {active?.src && (
          <motion.img
            key={active.src}
            src={active.src}
            alt={active?.caption || chamber}
            className="pointer-events-none select-none absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className={overlay} />
      <WaterShimmerOverlay {...getOverlaySettings(storyState)} />
      <div className="relative">{children}</div>
    </div>
	</div>
  );
}

function pickBackground(list, state, variant) {
  if (!list.length) return null;
  if (variant) return list.find(b => b.id === variant) || list[0];

  for (const bg of list) {
    const cond = bg.conditions || {};
    const ok = Object.entries(cond).every(([k, v]) => state?.[k] === v);
    if (ok) return bg;
  }
  return list[0];
}

function getOverlaySettings({ tone, time }) {
  let intensity = 0.8, speed = "normal", hue;
  if (tone === "adventurous") { intensity += 0.15; speed = "fast"; hue = 10; }
  if (tone === "nostalgic")   { intensity -= 0.1;  speed = "slow"; hue = -10; }
  if (tone === "mystic")      { intensity = 0.9;   speed = "slow"; hue = 210; }
  if (time === "night") { intensity -= 0.2; speed = "slow"; if (hue == null) hue = 190; }
  if (time === "day")   { intensity += 0.05; }
  return { intensity: clamp01(intensity), speed, hue };
}
const clamp01 = (n) => Math.max(0, Math.min(1, n));
