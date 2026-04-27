export const timeStates = {
  blue_hour_dawn: {
  id: "blue_hour_dawn",
  label: "Blue Hour Dawn",

  mood: ["quiet", "anticipatory", "reflective"],

  lighting:
    "Soft predawn blue atmosphere with faint amber emergence on the horizon. Low contrast lighting and gentle reflected light across still water.",

  ui: {
    overlay: "from-black/30 via-black/15 to-black/45",

    card: {
      bg: "rgba(40, 52, 64, 0.18)",
      border: "rgba(220, 235, 245, 0.08)",
      blur: "18px",
      shadow: "0 0 18px rgba(160, 200, 230, 0.05)"
    },

    bubble: {
      papaBg: "rgba(36, 54, 68, 0.30)",

      userBg: "rgba(178, 197, 214, 0.18)",

      border: "rgba(220, 235, 245, 0.10)",

      text: "rgba(245, 249, 255, 0.94)",

      blur: "18px",

      shadow: "0 0 18px rgba(160, 200, 230, 0.08)"
    },

    input: {
      bg: "rgba(150,170,190,0.14)",

      border: "rgba(255,255,255,0.08)",

      text: "rgba(255,255,255,0.92)",

      placeholder: "rgba(255,255,255,0.42)"
    },

    button: {
      primaryBg: "rgba(205, 160, 90, 0.22)",

      secondaryBg: "rgba(80, 100, 120, 0.22)",

      text: "rgba(255,255,255,0.92)",

      border: "rgba(255,255,255,0.10)"
    },

    chip: {
      bg: "rgba(70, 90, 110, 0.28)",

      activeBg: "rgba(210, 170, 90, 0.30)",

      text: "rgba(240,245,250,0.88)"
    },

    text: {
      primary: "rgba(245,249,255,0.94)",

      secondary: "rgba(220,230,240,0.72)",

      whisper: "rgba(210,220,235,0.52)"
    },

    glow: {
      intensity: "soft",

      color: "rgba(120,170,220,0.18)"
    }
  }
},

 late_afternoon: {
  id: "late_afternoon",

  label: "Late Afternoon",

  mood: ["warm", "grounded", "exploratory"],

  lighting:
    "Warm afternoon sunlight with amber highlights across water and vegetation. Rich reflections and gentle contrast with grounded warmth.",

  ui: {
    overlay: "from-black/30 via-black/15 to-black/45",

    card: {
      bg: "rgba(78, 62, 42, 0.20)",

      border: "rgba(255, 230, 190, 0.08)",

      blur: "16px",

      shadow: "0 0 18px rgba(255, 210, 140, 0.06)"
    },

    bubble: {
      papaBg: "rgba(88, 78, 54, 0.24)",

      userBg: "rgba(230, 200, 155, 0.18)",

      border: "rgba(255, 245, 220, 0.12)",

      text: "rgba(255, 252, 244, 0.94)",

      blur: "16px",

      shadow: "0 0 18px rgba(255, 220, 150, 0.08)"
    },

    input: {
      bg: "rgba(185, 160, 120, 0.16)",

      border: "rgba(255,255,255,0.10)",

      text: "rgba(255,255,255,0.94)",

      placeholder: "rgba(255,245,220,0.42)"
    },

    button: {
      primaryBg: "rgba(220, 155, 70, 0.30)",

      secondaryBg: "rgba(120, 90, 60, 0.24)",

      text: "rgba(255,250,240,0.94)",

      border: "rgba(255,230,190,0.14)"
    },

    chip: {
      bg: "rgba(110, 88, 62, 0.26)",

      activeBg: "rgba(230, 180, 90, 0.34)",

      text: "rgba(255,245,230,0.88)"
    },

    text: {
      primary: "rgba(255,252,244,0.94)",

      secondary: "rgba(240,225,205,0.72)",

      whisper: "rgba(225,210,190,0.52)"
    },

    glow: {
      intensity: "warm",

      color: "rgba(255, 190, 120, 0.18)"
    }
  }
},

evening_glow: {
  id: "evening_glow",

  label: "Evening Glow",

  mood: ["reflective", "warm", "settling"],

  lighting:
    "Warm evening light with soft amber reflections across still water. Deepening dusk tones and gentle lantern glow create a calm reflective atmosphere.",

  ui: {
    overlay: "from-black/40 via-black/20 to-black/55",

    card: {
      bg: "rgba(52, 42, 38, 0.24)",

      border: "rgba(240, 220, 200, 0.06)",

      blur: "20px",

      shadow: "0 0 24px rgba(0, 0, 0, 0.12)"
    },

    bubble: {
      papaBg: "rgba(66, 72, 78, 0.34)",

      userBg: "rgba(142, 118, 96, 0.22)",

      border: "rgba(230, 235, 240, 0.08)",

      text: "rgba(245, 242, 238, 0.94)",

      blur: "20px",

      shadow: "0 0 22px rgba(0, 0, 0, 0.12)"
    },

    input: {
      bg: "rgba(110, 95, 88, 0.20)",

      border: "rgba(255,255,255,0.08)",

      text: "rgba(245,242,238,0.94)",

      placeholder: "rgba(230,220,210,0.38)"
    },

    button: {
      primaryBg: "rgba(186, 117, 23, 0.34)",

      secondaryBg: "rgba(90, 82, 76, 0.24)",

      text: "rgba(255,245,235,0.92)",

      border: "rgba(240,220,200,0.10)"
    },

    chip: {
      bg: "rgba(82, 72, 68, 0.30)",

      activeBg: "rgba(200, 140, 70, 0.34)",

      text: "rgba(240,232,225,0.88)"
    },

    text: {
      primary: "rgba(245,242,238,0.94)",

      secondary: "rgba(220,210,200,0.72)",

      whisper: "rgba(205,195,188,0.48)"
    },

    glow: {
      intensity: "soft-warm",

      color: "rgba(255, 170, 90, 0.14)"
    }
  }
},
};