import React from "react";

/**
 * intensity: 0..1 overall strength
 * speed: "slow" | "normal" | "fast"
 * hue: 0..360 (optional) to tint the shimmer slightly
 */
export default function WaterShimmerOverlay({ intensity = 1, speed = "normal", hue }) {
  const duration = speed === "slow" ? "18s" : speed === "fast" ? "8s" : "12s";
  const tint = hue != null ? `hue-rotate(${hue}deg)` : "none";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ filter: tint }}>
      {/* Shimmer sweep */}
      <div
        aria-hidden="true"
        style={{ animation: `shimmerSweep ${duration} linear infinite`, opacity: 0.06 * intensity }}
        className="absolute -left-1/3 top-0 h-full w-1/2
                   bg-gradient-to-r from-transparent via-white/70 to-transparent
                   mix-blend-soft-light blur-md"
      />
      {/* Ripple drift */}
      <div
        aria-hidden="true"
        style={{
          animation: `rippleDrift ${duration} linear infinite`,
          opacity: 0.08 * intensity,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 8px)," +
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0 1px, transparent 1px 80px)",
          backgroundSize: "18px 18px, 120px 120px",
          backgroundBlendMode: "soft-light",
        }}
        className="absolute inset-0"
      />
    </div>
  );
}
