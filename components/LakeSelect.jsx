import React from "react";
import { useStory } from "../context/StoryContext";

export default function LakeSelect() {
  const { lakes, lake, setLake, setState } = useStory();

  const choose = (slug) => {
    setLake(slug);
    setState({ chapter: "intro", tone: "nostalgic", time: "day" }); // reset story state for new lake
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Object.values(lakes).map((l) => (
        <button
          key={l.slug}
          onClick={() => choose(l.slug)}
          className={`group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 transition
            ${lake === l.slug ? "outline outline-2 outline-white/70" : ""}`}
        >
          <img src={l.cover} alt={l.title} className="h-48 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 text-left">
            <div className="text-lg font-semibold text-white">{l.title}</div>
            <div className="text-sm text-white/80">{l.intro}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
