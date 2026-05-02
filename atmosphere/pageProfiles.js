export const pageProfiles = {
  intro: {
    id: "intro",
    label: "Intro",
    role: "thresholdInvitation",
    uiStyle: "threshold",
    emotionalTone: ["welcoming", "quiet", "threshold"],
    pacing: "slow",
    papaWhisperStyle: "inviting",

    scenes: {
      default: {
		  "blue-hour-dawn": "intro_blue_hour_dawn",
		  "soft-morning-rise": "intro_soft_morning_rise",
		  "late-afternoon-warmth": "intro_late_afternoon_warmth",
		  "golden-dusk": "intro_golden_dusk",
		  "quiet-evening-glow": "intro_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  home: {
    id: "home",
    label: "Home",
    role: "dockHub",
    uiStyle: "hub",
    emotionalTone: ["grounded", "welcoming", "present"],
    pacing: "steady",
    papaWhisperStyle: "settling",

    scenes: {
      default: {
		  "blue-hour-dawn": "home_blue_hour_dawn",
		  "soft-morning-rise": "home_soft_morning_rise",
		  "late-afternoon-warmth": "home_late_afternoon_warmth",
		  "golden-dusk": "home_golden_dusk",
		  "quiet-evening-glow": "home_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  adventure: {
    id: "adventure",
    label: "Adventure",
    role: "guidedAwareness",
    uiStyle: "guidedFlow",
    emotionalTone: ["curious", "observant", "playful", "attentive"],
    pacing: "measured",
    papaWhisperStyle: "encouraging",

    scenes: {
      default: {
		  "blue-hour-dawn": "adventure_blue_hour_dawn",
		  "soft-morning-rise": "adventure_soft_morning_rise",
		  "late-afternoon-warmth": "adventure_late_afternoon_warmth",
		  "golden-dusk": "adventure_golden_dusk",
		  "quiet-evening-glow": "adventure_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  fieldGuide: {
    id: "fieldGuide",
    label: "Field Guide",
    role: "learningReference",
    uiStyle: "scrollCards",
    emotionalTone: ["curious", "observant", "practical"],
    pacing: "measured",
    papaWhisperStyle: "curious",

    scenes: {
      default: {
		  "blue-hour-dawn": "fieldguide_blue_hour_dawn",
		  "soft-morning-rise": "fieldguide_soft_morning_rise",
		  "late-afternoon-warmth": "fieldguide_late_afternoon_warmth",
		  "golden-dusk": "fieldguide_golden_dusk",
		  "quiet-evening-glow": "fieldguide_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  locations: {
    id: "locations",
    label: "Locations",
    role: "waterMemory",
    uiStyle: "placeCards",
    emotionalTone: ["rooted", "exploratory", "relational"],
    pacing: "steady",
    papaWhisperStyle: "placeAware",

    scenes: {
      default: {
		  "blue-hour-dawn": "locations_blue_hour_dawn",
		  "soft-morning-rise": "locations_soft_morning_rise",
		  "late-afternoon-warmth": "locations_late_afternoon_warmth",
		  "golden-dusk": "locations_golden_dusk",
		  "quiet-evening-glow": "locations_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  planTrip: {
    id: "planTrip",
    label: "Plan Trip",
    role: "preparation",
    uiStyle: "guidedFlow",
    emotionalTone: ["intentional", "anticipatory", "calm"],
    pacing: "guided",
    papaWhisperStyle: "preparing",

    scenes: {
      default: {
		  "blue-hour-dawn": "plantrip_blue_hour_dawn",
		  "soft-morning-rise": "plantrip_soft_morning_rise",
		  "late-afternoon-warmth": "plantrip_late_afternoon_warmth",
		  "golden-dusk": "plantrip_golden_dusk",
		  "quiet-evening-glow": "plantrip_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  catchLedger: {
    id: "catchLedger",
    label: "Catch Ledger",
    role: "memoryCapture",
    uiStyle: "ledger",
    emotionalTone: ["honest", "grateful", "observant"],
    pacing: "steady",
    papaWhisperStyle: "noticing",

    scenes: {
      default: {
		  "blue-hour-dawn": "catchledger_blue_hour_dawn",
		  "soft-morning-rise": "catchledger_soft_morning_rise",
		  "late-afternoon-warmth": "catchledger_late_afternoon_warmth",
		  "golden-dusk": "catchledger_golden_dusk",
		  "quiet-evening-glow": "catchledger_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  journal: {
    id: "journal",
    label: "Journal",
    role: "reflection",
    uiStyle: "quietWriting",
    emotionalTone: ["still", "reflective", "open"],
    pacing: "slow",
    papaWhisperStyle: "quietWitness",

    scenes: {
      default: {
		  "blue-hour-dawn": "journal_blue_hour_dawn",
		  "soft-morning-rise": "journal_soft_morning_rise",
		  "late-afternoon-warmth": "journal_late_afternoon_warmth",
		  "golden-dusk": "journal_golden_dusk",
		  "quiet-evening-glow": "journal_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  papaDock: {
    id: "papaDock",
    label: "Talk to Papa",
    role: "conversation",
    uiStyle: "dialogue",
    emotionalTone: ["safe", "warm", "listening"],
    pacing: "slow",
    papaWhisperStyle: "companion",

    scenes: {
      default: {
		  "blue-hour-dawn": "papa_blue_hour_dawn",
		  "soft-morning-rise": "papa_soft_morning_rise",
		  "late-afternoon-warmth": "papa_late_afternoon_warmth",
		  "golden-dusk": "papa_golden_dusk",
		  "quiet-evening-glow": "papa_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },

  profile: {
    id: "profile",
    label: "Profile",
    role: "personalization",
    uiStyle: "userContext",
    emotionalTone: ["intentional", "grounded", "selfAware"],
    pacing: "steady",
    papaWhisperStyle: "personal",

    scenes: {
      default: {
		  "blue-hour-dawn": "profile_blue_hour_dawn",
		  "soft-morning-rise": "profile_soft_morning_rise",
		  "late-afternoon-warmth": "profile_late_afternoon_warmth",
		  "golden-dusk": "profile_golden_dusk",
		  "quiet-evening-glow": "profile_quiet_evening_glow",
		},
      seasonal: {},
      special: {},
    },
  },
};