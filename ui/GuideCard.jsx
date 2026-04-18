// ui/GuideCard.jsx
import { useEffect, useState } from "react";

export default function GuideCard({
  avatarUrl,
  text,
  actions = [],
  onAction,
  typing = true,
  typingDelayMs = 900,
  className = ""
}) {
  const [showText, setShowText] = useState(!typing);

  useEffect(() => {
    if (!typing) return;
    const t = setTimeout(() => setShowText(true), typingDelayMs);
    return () => clearTimeout(t);
  }, [typing, typingDelayMs]);

  return (
    <div
      className={[
        "absolute left-4 bottom-24 md:bottom-4", // extra space on mobile to clear FAB
        "bg-slate-900/80 text-slate-100 border border-slate-700",
        "rounded-lg p-3 backdrop-blur shadow-lg max-w-md",
        className
      ].join(" ")}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
        <img
          src={avatarUrl}
          alt="Guide"
          className="rounded-full shrink-0
                     w-16 h-16
                     sm:w-20 sm:h-20
                     md:w-24 md:h-24
                     lg:w-28 lg:h-28"
        />
        <div className="min-h-[3rem] flex items-center md:items-start">
          {showText ? (
            <p className="text-sm leading-snug">{text}</p>
          ) : (
            <span className="text-sm tracking-wider">•••</span>
          )}
        </div>
      </div>

      {actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={() => onAction?.(a.next)}
              className="px-3 py-1.5 text-xs rounded-md bg-amber-500 text-slate-900 font-medium hover:bg-amber-400 transition"
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
