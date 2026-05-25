// src/atmosphere/useAtmosphere.js
import { useMemo } from "react";
import { getSceneByPageAndTime } from "./sceneBuilder";
import { mergeAtmosphereUi } from "./mergeAtmosphere";

function buildAtmosphereStyles(ui = {}) {
  const cardBlur = ui.card?.blur ?? "16px";

  return {
    pageOverlayClass: ui.overlay ?? "from-black/35 via-black/20 to-black/55",

    cardStyle: {
      background: ui.card?.bg ?? "rgba(20, 28, 36, 0.52)",
      border: `1px solid ${ui.card?.border ?? "rgba(255,255,255,0.12)"}`,
      backdropFilter: `blur(${cardBlur})`,
      WebkitBackdropFilter: `blur(${cardBlur})`,
      boxShadow: ui.card?.shadow ?? "0 0 18px rgba(0,0,0,0.12)",
      color: ui.text?.primary ?? "rgba(255,255,255,0.94)",
    },

    buttonPrimaryStyle: {
      background: ui.button?.primaryBg ?? "rgba(40, 52, 64, 0.68)",
      border: `1px solid ${ui.button?.border ?? "rgba(255,255,255,0.16)"}`,
      color: ui.button?.text ?? "rgba(255,255,255,0.94)",
      backdropFilter: `blur(${cardBlur})`,
      WebkitBackdropFilter: `blur(${cardBlur})`,
    },

    buttonSecondaryStyle: {
      background: ui.button?.secondaryBg ?? "rgba(28, 38, 48, 0.48)",
      border: `1px solid ${ui.button?.border ?? "rgba(255,255,255,0.14)"}`,
      color: ui.button?.text ?? "rgba(255,255,255,0.9)",
      backdropFilter: `blur(${cardBlur})`,
      WebkitBackdropFilter: `blur(${cardBlur})`,
    },

    inputStyle: {
      background: ui.input?.bg ?? "rgba(20, 28, 36, 0.46)",
      border: `1px solid ${ui.input?.border ?? "rgba(255,255,255,0.14)"}`,
      color: ui.input?.text ?? "rgba(255,255,255,0.94)",
      backdropFilter: `blur(${cardBlur})`,
      WebkitBackdropFilter: `blur(${cardBlur})`,
    },

    transparentButtonStyle: {
      background: "transparent",
      border: `1px solid ${ui.button?.border ?? "rgba(255,255,255,0.14)"}`,
      color: ui.text?.secondary ?? "rgba(255,255,255,0.72)",
      backdropFilter: `blur(${cardBlur})`,
      WebkitBackdropFilter: `blur(${cardBlur})`,
    },

    text: ui.text ?? {},
    chip: ui.chip ?? {},
    bubble: ui.bubble ?? {},
  };
}

export function useAtmosphere(pageId, options = {}) {
  const hour = new Date().getHours();

const normalizedOptions = useMemo(() => {
  return {
    ...options,
    user: {
      ...(options.user ?? {}),
      time_state_override:
        options.user?.time_state_override ??
        options.user?.timeStateOverride ??
        options.context?.timeStateOverride ??
        null,
      weather_state_override:
        options.user?.weather_state_override ??
        options.user?.weatherStateOverride ??
        options.context?.weatherStateOverride ??
        null,
    },
    context: {
      ...(options.context ?? {}),
    },
  };
}, [options]);



 const atmosphere = useMemo(() => {
  return getSceneByPageAndTime(pageId, hour, normalizedOptions);
}, [pageId, hour, normalizedOptions]);

const ui = mergeAtmosphereUi(
  atmosphere?.timeState?.ui ?? {},
  atmosphere?.weatherState?.ui ?? {},
  atmosphere?.pageProfile ?? {}
);

const styles = buildAtmosphereStyles(ui);

  return {
    scene: atmosphere,
    backgroundVariant: atmosphere?.backgroundVariant ?? "morning",
    whisper: atmosphere?.whisper ?? "",
    ui,
    styles,
    pageProfile: atmosphere?.pageProfile ?? null,
    timeState: atmosphere?.timeState ?? null,
    weatherState: atmosphere?.weatherState ?? null,
    papaState: atmosphere?.papaState ?? null,
  };
}