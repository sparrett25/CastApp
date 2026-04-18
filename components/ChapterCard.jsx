import React, { useRef } from "react";
import voices from "../data/stories/mirror-lake/voices-mirror-lake.json";

/**
 * Props:
 * - chapter: { id, title, tone, time, voiceLineId, summary, unlocks[] }
 * - onEnter: (chapter) => void (set story state here)
 * - onUnlock: (ids[]) => void (mark next chapters unlocked)
 */
export default function ChapterCard({ chapter, onEnter, onUnlock, disabled }) {
  const audioRef = useRef(null);
  const v = chapter.voiceLineId ? voices[chapter.voiceLineId] : null;

  const handleEnter = () => {
    onEnter(chapter);
    if (v?.file && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    if (chapter.unlocks?.length) onUnlock(chapter.unlocks);
  };

  return (
    <div className={`rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 text-white ${disabled ? "opacity-50" : ""}`}>
      <div className="mb-1 text-sm uppercase tracking-wide text-white/70">Chapter</div>
      <div className="text-xl font-semibold">{chapter.title}</div>
      <div className="mt-2 text-white/85">{chapter.summary}</div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
        <span className="rounded bg-white/15 px-2 py-0.5">Tone: {chapter.tone}</span>
        <span className="rounded bg-white/15 px-2 py-0.5">Time: {chapter.time}</span>
      </div>

      <button
        onClick={handleEnter}
        disabled={disabled}
        className="mt-4 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-white"
      >
        Enter
      </button>

      {v?.file && (
        <audio ref={audioRef} preload="auto">
          <source src={v.file} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}
