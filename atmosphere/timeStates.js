export const timeStates = {
  blue_hour_dawn: {
    id: "blue_hour_dawn",
    label: "Blue Hour Dawn",
    mood: ["quiet", "anticipatory", "reflective", "inward"],
    lighting:
      "Cool blue-gray predawn atmosphere with faint amber warmth emerging near the horizon. Low contrast light, soft mist, and gentle reflections across still water.",
    ui: {
      overlay: "from-black/35 via-black/18 to-black/52",
      card: {
        bg: "rgba(40, 52, 64, 0.20)",
        border: "rgba(220, 235, 245, 0.08)",
        blur: "18px",
        shadow: "0 0 18px rgba(160, 200, 230, 0.05)",
      },
      bubble: {
        papaBg: "rgba(36, 54, 68, 0.32)",
        userBg: "rgba(178, 197, 214, 0.18)",
        border: "rgba(220, 235, 245, 0.10)",
        text: "rgba(245, 249, 255, 0.94)",
        blur: "18px",
        shadow: "0 0 18px rgba(160, 200, 230, 0.08)",
      },
      input: {
        bg: "rgba(150,170,190,0.14)",
        border: "rgba(255,255,255,0.08)",
        text: "rgba(255,255,255,0.92)",
        placeholder: "rgba(255,255,255,0.42)",
      },
      button: {
        primaryBg: "rgba(70, 78, 88, 0.34)",
        secondaryBg: "rgba(52, 60, 68, 0.26)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(70, 90, 110, 0.28)",
        activeBg: "rgba(210, 170, 90, 0.30)",
        text: "rgba(240,245,250,0.88)",
      },
      text: {
        primary: "rgba(245,249,255,0.94)",
        secondary: "rgba(220,230,240,0.72)",
        whisper: "rgba(210,220,235,0.52)",
      },
      glow: {
        intensity: "soft",
        color: "rgba(120,170,220,0.18)",
      },
	  nav: {
	  bg: "rgba(32, 28, 24, 0.52)",
	  border: "rgba(255, 235, 205, 0.10)",
	  blur: "18px",
	  shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
	  text: "rgba(255, 248, 235, 0.94)",
	  buttonBg: "rgba(255, 255, 255, 0.08)",
	  buttonBorder: "rgba(255, 255, 255, 0.12)",
	  },	    
    },
  },

  first_light: {
    id: "first_light",
    label: "First Light",
    mood: ["emerging", "clear", "gentle", "possible"],
    lighting:
      "Early dawn light begins to reveal the full scene. Cool mist remains over the water while pale gold softly enters the horizon, creating a balanced threshold between blue hour stillness and morning warmth.",
    ui: {
      overlay: "from-black/31 via-black/14 to-black/46",
      card: {
        bg: "rgba(52, 62, 64, 0.20)",
        border: "rgba(235, 230, 205, 0.08)",
        blur: "18px",
        shadow: "0 0 18px rgba(210, 200, 160, 0.05)",
      },
      bubble: {
        papaBg: "rgba(50, 62, 66, 0.30)",
        userBg: "rgba(205, 195, 165, 0.17)",
        border: "rgba(245, 240, 220, 0.10)",
        text: "rgba(250, 250, 244, 0.94)",
        blur: "18px",
        shadow: "0 0 18px rgba(220, 205, 160, 0.07)",
      },
      input: {
        bg: "rgba(165, 165, 145, 0.14)",
        border: "rgba(255,255,255,0.09)",
        text: "rgba(250,250,244,0.94)",
        placeholder: "rgba(245,240,220,0.42)",
      },
      button: {
        primaryBg: "rgba(88, 86, 76, 0.32)",
        secondaryBg: "rgba(54, 62, 64, 0.25)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(82, 90, 88, 0.27)",
        activeBg: "rgba(220, 175, 90, 0.31)",
        text: "rgba(248,245,235,0.88)",
      },
      text: {
        primary: "rgba(250,250,244,0.94)",
        secondary: "rgba(228,230,222,0.73)",
        whisper: "rgba(218,220,210,0.52)",
      },
      glow: {
        intensity: "threshold",
        color: "rgba(235, 205, 140, 0.15)",
      },
      nav: {
        bg: "rgba(32, 28, 24, 0.52)",
        border: "rgba(255, 235, 205, 0.10)",
        blur: "18px",
        shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
        text: "rgba(255, 248, 235, 0.94)",
        buttonBg: "rgba(255, 255, 255, 0.08)",
        buttonBorder: "rgba(255, 255, 255, 0.12)",
      },
    },
  },

  soft_morning_rise: {
    id: "soft_morning_rise",
    label: "Soft Morning Rise",
    mood: ["awakening", "hopeful", "fresh", "gentle"],
    lighting:
      "Soft morning warmth begins to enter the scene as fog lifts from reflective water. Gentle gold touches reeds, dock edges, and shoreline vegetation while the atmosphere remains calm.",
    ui: {
      overlay: "from-black/28 via-black/12 to-black/42",
      card: {
        bg: "rgba(64, 68, 56, 0.19)",
        border: "rgba(245, 230, 190, 0.08)",
        blur: "17px",
        shadow: "0 0 18px rgba(230, 200, 140, 0.05)",
      },
      bubble: {
        papaBg: "rgba(70, 76, 64, 0.28)",
        userBg: "rgba(220, 200, 160, 0.17)",
        border: "rgba(255, 245, 220, 0.10)",
        text: "rgba(255, 252, 244, 0.94)",
        blur: "17px",
        shadow: "0 0 18px rgba(240, 210, 150, 0.07)",
      },
      input: {
        bg: "rgba(180, 165, 130, 0.14)",
        border: "rgba(255,255,255,0.09)",
        text: "rgba(255,252,244,0.94)",
        placeholder: "rgba(255,245,220,0.42)",
      },
      button: {
        primaryBg: "rgba(105, 96, 76, 0.30)",
        secondaryBg: "rgba(62, 66, 58, 0.24)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(92, 94, 72, 0.26)",
        activeBg: "rgba(220, 180, 90, 0.32)",
        text: "rgba(255,248,232,0.88)",
      },
      text: {
        primary: "rgba(255,252,244,0.94)",
        secondary: "rgba(238,228,205,0.74)",
        whisper: "rgba(230,218,190,0.52)",
      },
      glow: {
        intensity: "gentle-warm",
        color: "rgba(245, 205, 130, 0.16)",
      },
	  nav: {
	  bg: "rgba(32, 28, 24, 0.52)",
	  border: "rgba(255, 235, 205, 0.10)",
	  blur: "18px",
	  shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
	  text: "rgba(255, 248, 235, 0.94)",
	  buttonBg: "rgba(255, 255, 255, 0.08)",
	  buttonBorder: "rgba(255, 255, 255, 0.12)",
	  },	    
    },
  },

  warm_drift: {
    id: "warm_drift",
    label: "Warm Drift",
    mood: ["warm", "grounded", "familiar", "easy"],
    lighting:
      "Warm afternoon daylight settles across water and vegetation. Reflections shimmer softly, shadows are gentle, and the scene feels grounded, familiar, and lived-in.",
    ui: {
      overlay: "from-black/30 via-black/15 to-black/45",
      card: {
        bg: "rgba(78, 62, 42, 0.20)",
        border: "rgba(255, 230, 190, 0.08)",
        blur: "16px",
        shadow: "0 0 18px rgba(255, 210, 140, 0.06)",
      },
      bubble: {
        papaBg: "rgba(88, 78, 54, 0.24)",
        userBg: "rgba(230, 200, 155, 0.18)",
        border: "rgba(255, 245, 220, 0.12)",
        text: "rgba(255, 252, 244, 0.94)",
        blur: "16px",
        shadow: "0 0 18px rgba(255, 220, 150, 0.08)",
      },
      input: {
        bg: "rgba(185, 160, 120, 0.16)",
        border: "rgba(255,255,255,0.10)",
        text: "rgba(255,255,255,0.94)",
        placeholder: "rgba(255,245,220,0.42)",
      },
      button: {
        primaryBg: "rgba(110, 98, 88, 0.30)",
        secondaryBg: "rgba(62, 66, 70, 0.24)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(110, 88, 62, 0.26)",
        activeBg: "rgba(230, 180, 90, 0.34)",
        text: "rgba(255,245,230,0.88)",
      },
      text: {
        primary: "rgba(255,252,244,0.94)",
        secondary: "rgba(240,225,205,0.72)",
        whisper: "rgba(225,210,190,0.52)",
      },
      glow: {
        intensity: "warm",
        color: "rgba(255, 190, 120, 0.18)",
      },
	  nav: {
	  bg: "rgba(32, 28, 24, 0.52)",
	  border: "rgba(255, 235, 205, 0.10)",
	  blur: "18px",
	  shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
	  text: "rgba(255, 248, 235, 0.94)",
	  buttonBg: "rgba(255, 255, 255, 0.08)",
	  buttonBorder: "rgba(255, 255, 255, 0.12)",
	  },	    
    },
  },

  golden_dusk: {
    id: "golden_dusk",
    label: "Golden Dusk",
    mood: ["warm", "reflective", "slowing", "transitional"],
    lighting:
      "Long golden light stretches across still water and shoreline edges. Warm reflections deepen, shadows lengthen, and the world begins slowing toward evening.",
    ui: {
      overlay: "from-black/34 via-black/18 to-black/50",
      card: {
        bg: "rgba(74, 52, 38, 0.23)",
        border: "rgba(255, 220, 180, 0.08)",
        blur: "18px",
        shadow: "0 0 22px rgba(255, 170, 90, 0.08)",
      },
      bubble: {
        papaBg: "rgba(82, 62, 50, 0.30)",
        userBg: "rgba(210, 150, 90, 0.20)",
        border: "rgba(255, 230, 205, 0.10)",
        text: "rgba(255, 246, 238, 0.94)",
        blur: "18px",
        shadow: "0 0 20px rgba(255, 165, 90, 0.10)",
      },
      input: {
        bg: "rgba(150, 105, 76, 0.18)",
        border: "rgba(255,255,255,0.09)",
        text: "rgba(255,246,238,0.94)",
        placeholder: "rgba(245,225,205,0.40)",
      },
      button: {
        primaryBg: "rgba(130, 88, 58, 0.34)",
        secondaryBg: "rgba(72, 58, 50, 0.26)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(100, 70, 54, 0.30)",
        activeBg: "rgba(225, 145, 70, 0.36)",
        text: "rgba(255,238,226,0.88)",
      },
      text: {
        primary: "rgba(255,246,238,0.94)",
        secondary: "rgba(235,215,200,0.72)",
        whisper: "rgba(220,198,185,0.50)",
      },
      glow: {
        intensity: "golden",
        color: "rgba(255, 155, 80, 0.18)",
      },
	  nav: {
	  bg: "rgba(32, 28, 24, 0.52)",
	  border: "rgba(255, 235, 205, 0.10)",
	  blur: "18px",
	  shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
	  text: "rgba(255, 248, 235, 0.94)",
	  buttonBg: "rgba(255, 255, 255, 0.08)",
	  buttonBorder: "rgba(255, 255, 255, 0.12)",
	  },	    
    },
  },

  quiet_evening_glow: {
    id: "quiet_evening_glow",
    label: "Quiet Evening Glow",
    mood: ["reflective", "settling", "quiet", "restful"],
    lighting:
      "Warm light fades into soft dusk tones and dark silhouettes. The water settles into evening stillness with a calm reflective glow along the horizon.",
    ui: {
      overlay: "from-black/42 via-black/24 to-black/58",
      card: {
        bg: "rgba(52, 42, 38, 0.24)",
        border: "rgba(240, 220, 200, 0.06)",
        blur: "20px",
        shadow: "0 0 24px rgba(0, 0, 0, 0.12)",
      },
      bubble: {
        papaBg: "rgba(66, 72, 78, 0.34)",
        userBg: "rgba(142, 118, 96, 0.22)",
        border: "rgba(230, 235, 240, 0.08)",
        text: "rgba(245, 242, 238, 0.94)",
        blur: "20px",
        shadow: "0 0 22px rgba(0, 0, 0, 0.12)",
      },
      input: {
        bg: "rgba(110, 95, 88, 0.20)",
        border: "rgba(255,255,255,0.08)",
        text: "rgba(245,242,238,0.94)",
        placeholder: "rgba(230,220,210,0.38)",
      },
      button: {
        primaryBg: "rgba(70, 78, 88, 0.34)",
        secondaryBg: "rgba(52, 60, 68, 0.26)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.12)",
      },
      chip: {
        bg: "rgba(82, 72, 68, 0.30)",
        activeBg: "rgba(200, 140, 70, 0.34)",
        text: "rgba(240,232,225,0.88)",
      },
      text: {
        primary: "rgba(245,242,238,0.94)",
        secondary: "rgba(220,210,200,0.72)",
        whisper: "rgba(205,195,188,0.48)",
      },
      glow: {
        intensity: "soft-warm",
        color: "rgba(255, 170, 90, 0.14)",
      },
	  nav: {
	  bg: "rgba(32, 28, 24, 0.52)",
	  border: "rgba(255, 235, 205, 0.10)",
	  blur: "18px",
	  shadow: "0 10px 28px rgba(0, 0, 0, 0.22)",
	  text: "rgba(255, 248, 235, 0.94)",
	  buttonBg: "rgba(255, 255, 255, 0.08)",
	  buttonBorder: "rgba(255, 255, 255, 0.12)",
	  },	    
    },
  },
  
    ember_twilight: {
    id: "ember_twilight",
    label: "Ember Twilight",
    mood: ["closure", "remembrance", "still", "inward"],
    lighting:
      "Post-sunset ember glow lingers near the horizon while the foreground, dock, and water deepen into cool shadow. Reflections become minimal, distant shorelines soften into silhouettes, and the scene feels quiet, inward, and memory-like.",
    ui: {
      overlay: "from-black/52 via-black/34 to-black/68",
      card: {
        bg: "rgba(34, 34, 42, 0.28)",
        border: "rgba(220, 205, 195, 0.06)",
        blur: "22px",
        shadow: "0 0 26px rgba(0, 0, 0, 0.18)",
      },
      bubble: {
        papaBg: "rgba(42, 48, 56, 0.38)",
        userBg: "rgba(105, 82, 76, 0.24)",
        border: "rgba(225, 220, 220, 0.08)",
        text: "rgba(242, 238, 234, 0.94)",
        blur: "22px",
        shadow: "0 0 24px rgba(0, 0, 0, 0.16)",
      },
      input: {
        bg: "rgba(88, 76, 78, 0.22)",
        border: "rgba(255,255,255,0.07)",
        text: "rgba(242,238,234,0.94)",
        placeholder: "rgba(220,210,205,0.36)",
      },
      button: {
        primaryBg: "rgba(58, 64, 74, 0.36)",
        secondaryBg: "rgba(42, 48, 56, 0.28)",
        text: "rgba(255,255,255,0.92)",
        border: "rgba(255,255,255,0.11)",
      },
      chip: {
        bg: "rgba(66, 58, 62, 0.32)",
        activeBg: "rgba(180, 105, 65, 0.34)",
        text: "rgba(238,230,224,0.88)",
      },
      text: {
        primary: "rgba(242,238,234,0.94)",
        secondary: "rgba(210,202,198,0.70)",
        whisper: "rgba(198,190,188,0.46)",
      },
      glow: {
        intensity: "ember-low",
        color: "rgba(220, 105, 65, 0.12)",
      },
      nav: {
        bg: "rgba(28, 24, 24, 0.58)",
        border: "rgba(255, 220, 200, 0.08)",
        blur: "20px",
        shadow: "0 10px 30px rgba(0, 0, 0, 0.28)",
        text: "rgba(255, 244, 235, 0.94)",
        buttonBg: "rgba(255, 255, 255, 0.07)",
        buttonBorder: "rgba(255, 255, 255, 0.10)",
      },
    },
  },
  
};