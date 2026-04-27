// src/atmosphere/useAtmosphere.js
import { useMemo } from "react";
import { getSceneByPageAndTime } from "./sceneBuilder";

export function useAtmosphere(pageId) {
  const hour = new Date().getHours();

  const atmosphere = useMemo(() => {
    return getSceneByPageAndTime(pageId, hour);
  }, [pageId, hour]);

  return {
    scene: atmosphere,
    backgroundVariant: atmosphere?.backgroundVariant ?? "morning",
    whisper: atmosphere?.whisper ?? "",
    ui: atmosphere?.timeState?.ui ?? {},
    pageProfile: atmosphere?.pageProfile ?? null,
    timeState: atmosphere?.timeState ?? null,
    weatherState: atmosphere?.weatherState ?? null,
    papaState: atmosphere?.papaState ?? null,
  };
}