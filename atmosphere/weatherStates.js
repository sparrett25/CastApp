export const weatherStates = {
  base: {
    id: "base",
    label: "Base",
    folder: "base",
    fileSuffix: "",
    mode: "default",
    mood: ["balanced", "natural", "open"],
    environment: "Default regional atmosphere without an added weather modifier.",
    ui: {
      blurDelta: 0,
      opacityBoost: 0,
      contrast: "neutral",
      shimmer: "medium",
    },
  },

  "clear-sky": {
    id: "clear-sky",
    label: "Clear Sky",
    folder: "weather-clear-sky",
    fileSuffix: "clear-sky-v1",
    mode: "weather",
    mood: ["open", "bright", "clear"],
    environment: "Open sky, clean reflections, and greater visual spaciousness.",
    ui: {
      blurDelta: 0,
      opacityBoost: -0.02,
      contrast: "brighten",
      shimmer: "medium",
    },
  },

  breezy: {
    id: "breezy",
    label: "Breezy",
    folder: "weather-breezy",
    fileSuffix: "breezy-v1",
    mode: "weather",
    mood: ["moving", "alert", "fresh"],
    environment: "Soft wind movement across water, grasses, branches, and surface texture.",
    ui: {
      blurDelta: 0,
      opacityBoost: 0.02,
      contrast: "neutral",
      shimmer: "high",
    },
  },

  "first-fog": {
    id: "first-fog",
    label: "First Fog",
    folder: "weather-first-fog",
    fileSuffix: "first-fog-v1",
    mode: "weather",
    mood: ["quiet", "veiled", "inward"],
    environment: "Low fog softens the shoreline and draws the scene inward.",
    ui: {
      blurDelta: 2,
      opacityBoost: 0.04,
      contrast: "soften",
      shimmer: "low",
    },
  },

  "silver-rain": {
    id: "silver-rain",
    label: "Silver Rain",
    folder: "weather-silver-rain",
    fileSuffix: "silver-rain-v1",
    mode: "weather",
    mood: ["reflective", "sheltered", "listening"],
    environment: "Rain textures the water and turns the chamber inward.",
    ui: {
      blurDelta: 1,
      opacityBoost: 0.06,
      contrast: "deepen",
      shimmer: "low",
    },
  },

  "still-overcast": {
    id: "still-overcast",
    label: "Still Overcast",
    folder: "weather-still-overcast",
    fileSuffix: "still-overcast-v1",
    mode: "weather",
    mood: ["muted", "steady", "watchful"],
    environment: "Cloud cover mutes the light and settles the water into quiet gray.",
    ui: {
      blurDelta: 1,
      opacityBoost: 0.04,
      contrast: "soften",
      shimmer: "low",
    },
  },

  "ember-storm": {
    id: "ember-storm",
    label: "Ember Storm",
    folder: "weather-ember-storm",
    fileSuffix: "ember-storm-v1",
    mode: "weather",
    mood: ["charged", "cinematic", "threshold"],
    environment: "Storm-darkened sky with ember light and charged water movement.",
    ui: {
      blurDelta: 1,
      opacityBoost: 0.08,
      contrast: "deepen",
      shimmer: "low",
    },
  },
};