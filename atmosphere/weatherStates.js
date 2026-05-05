export const weatherStates = {
  light_fog: {
    id: "light_fog",
    label: "Light Fog",
    mood: ["still", "quiet", "inward"],
    environment:
      "Soft fog drifting across reflective lake water. Distant trees and shoreline dissolve into atmospheric haze.",
    ui: {
      blur: "medium",
      shimmer: "low",
      blurDelta: 2,
      opacityBoost: 0.04,
      contrast: "soften",
    },
  },

  still_air: {
    id: "still_air",
    label: "Still Air",
    mood: ["clear", "steady", "open"],
    environment:
      "Calm lake air with clear reflections and barely moving reeds. Atmosphere feels settled and spacious.",
    ui: {
      blur: "low",
      shimmer: "medium",
      blurDelta: 0,
      opacityBoost: 0,
      contrast: "neutral",
    },
  },

  heavy_cloud_cover: {
    id: "heavy_cloud_cover",
    label: "Heavy Cloud Cover",
    mood: ["charged", "watchful", "deep"],
    environment:
      "Dense clouds gathering above the lake with darkening water and thickened humidity. Reeds and palms sit beneath a heavy sky.",
    ui: {
      blur: "low",
      shimmer: "low",
      blurDelta: 1,
      opacityBoost: 0.06,
      contrast: "deepen",
    },
  },
};