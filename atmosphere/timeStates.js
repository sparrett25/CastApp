export const timeStates = {
  blue_hour_dawn: {
    id: "blue_hour_dawn",
    label: "Blue Hour Dawn",
    mood: ["quiet", "anticipatory", "reflective"],
    lighting: "Soft predawn blue atmosphere with faint amber emergence on the horizon. Low contrast lighting and gentle reflected light across still water.",
    ui: {
      overlay: "from-black/30 via-black/15 to-black/45",
      cardOpacity: 0.18,
      textTone: "soft",
      glow: "cool"
    }
  },

  late_afternoon: {
    id: "late_afternoon",
    label: "Late Afternoon",
    mood: ["warm", "grounded", "exploratory"],
    lighting: "Warm afternoon sunlight with amber highlights across water and vegetation. Rich reflections and gentle contrast with grounded warmth.",
    ui: {
      overlay: "from-black/20 via-black/10 to-black/35",
      cardOpacity: 0.14,
      textTone: "balanced",
      glow: "warm"
    }
  },

  storm_approaching: {
    id: "storm_approaching",
    label: "Storm Approaching",
    mood: ["contemplative", "heavy", "initiatory"],
    lighting: "Muted storm-filtered light with cool gray-blue atmosphere and darker reflections across the water.",
    ui: {
      overlay: "from-black/40 via-black/20 to-black/55",
      cardOpacity: 0.22,
      textTone: "soft",
      glow: "dim"
    }
  }
};