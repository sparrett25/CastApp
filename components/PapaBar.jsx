import React, { useMemo } from "react";
import papaVoice from "../data/papaVoice.json";

/**
 * PapaBar shows a single voice line for a given context key (or keys).
 * - Pass `keyOrKeys` as a string or string[] of papaVoice keys.
 * - We pick one at random each render to keep Papa feeling alive.
 */
export default function PapaBar({ keyOrKeys, className = "" }) {
  const keys = Array.isArray(keyOrKeys) ? keyOrKeys : [keyOrKeys].filter(Boolean);

  const line = useMemo(() => {
    for (const k of keys) {
      const arr = papaVoice?.[k];
      if (Array.isArray(arr) && arr.length) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
    }
    // graceful fallback
    return "The water has a way of speaking if we listen.";
  }, [keys]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-black/70 text-white text-sm md:text-base ${className}`}>
      <div className="max-w-3xl mx-auto">{line}</div>
    </div>
  );
}
