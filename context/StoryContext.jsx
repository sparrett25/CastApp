import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import lakes from "../data/lakes.json";

const StoryContext = createContext(null);
const DEFAULT_LAKE = "mirror-lake";


export function StoryProvider({ children }) {
  const [lake, setLake] = useState(() => localStorage.getItem("cast.lake") || DEFAULT_LAKE);
  const [state, setState] = useState({ chapter: "intro", tone: "nostalgic", time: "day" });
  const [backgroundMap, setBackgroundMap] = useState({});
  const [storyEnabled, setStoryEnabled] = useState(false);

  // Persist lake choice
  useEffect(() => localStorage.setItem("cast.lake", lake), [lake]);

  // Load per-lake backgrounds once lake changes
  useEffect(() => {
    const url = lakes[lake]?.backgrounds;
    async function load() {
      if (!url) return setBackgroundMap({});
      const res = await fetch(url);
      const json = await res.json();
      setBackgroundMap(json); // { "mirror-lake": [...], "journal":[...], ... }
    }
    load();
  }, [lake]);

  const value = useMemo(() => ({
    lake, setLake,
    state, setState,
    backgrounds: backgroundMap,
    lakes
  }), [lake, state, backgroundMap]);

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}
export const useStory = () => useContext(StoryContext);
