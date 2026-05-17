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
		  "first-light": "intro_first_light",
		  "soft-morning-rise": "intro_soft_morning_rise",
		  "warm-drift": "intro_warm_drift",
		  "golden-dusk": "intro_golden_dusk",
		  "quiet-evening-glow": "intro_quiet_evening_glow",
		  "ember-twilight": "intro_ember_twilight",
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
		  "first-light": "home_first_light",
		  "soft-morning-rise": "home_soft_morning_rise",
		  "warm-drift": "home_warm_drift",
		  "golden-dusk": "home_golden_dusk",
		  "quiet-evening-glow": "home_quiet_evening_glow",
		  "ember-twilight": "home_ember_twilight",
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
		  "first-light": "fieldguide_first_light",
		  "soft-morning-rise": "fieldguide_soft_morning_rise",
		  "warm-drift": "fieldguide_warm_drift",
		  "golden-dusk": "fieldguide_golden_dusk",
		  "quiet-evening-glow": "fieldguide_quiet_evening_glow",
		  "ember-twilight": "fieldguide_ember_twilight",
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
		  "first-light": "locations_first_light",
		  "soft-morning-rise": "locations_soft_morning_rise",
		  "warm-drift": "locations_warm_drift",
		  "golden-dusk": "locations_golden_dusk",
		  "quiet-evening-glow": "locations_quiet_evening_glow",
		  "ember-twilight": "locations_ember_twilight",
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
		  "first-light": "plantrip_first_light",
		  "soft-morning-rise": "plantrip_soft_morning_rise",
		  "warm-drift": "plantrip_warm_drift",
		  "golden-dusk": "plantrip_golden_dusk",
		  "quiet-evening-glow": "plantrip_quiet_evening_glow",
		  "ember-twilight": "plantrip_ember_twilight",
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
		  "first-light": "catchledger_first_light",
		  "soft-morning-rise": "catchledger_soft_morning_rise",
		  "warm-drift": "catchledger_warm_drift",
		  "golden-dusk": "catchledger_golden_dusk",
		  "quiet-evening-glow": "catchledger_quiet_evening_glow",
		  "ember-twilight": "catchledger_ember_twilight",
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
		  "first-light": "journal_first_light",
		  "soft-morning-rise": "journal_soft_morning_rise",
		  "warm-drift": "journal_warm_drift",
		  "golden-dusk": "journal_golden_dusk",
		  "quiet-evening-glow": "journal_quiet_evening_glow",
		  "ember-twilight": "journal_ember_twilight",
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
		  "first-light": "papa_first_light",
		  "soft-morning-rise": "papa_soft_morning_rise",
		  "warm-drift": "papa_warm_drift",
		  "golden-dusk": "papa_golden_dusk",
		  "quiet-evening-glow": "papa_quiet_evening_glow",
		  "ember-twilight": "papa_ember_twilight",
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
		  "first-light": "profile_first_light",
		  "soft-morning-rise": "profile_soft_morning_rise",
		  "warm-drift": "profile_warm_drift",
		  "golden-dusk": "profile_golden_dusk",
		  "quiet-evening-glow": "profile_quiet_evening_glow",
		  "ember-twilight": "profile_ember_twilight",
		},
      seasonal: {},
      special: {},
    },
  },
  authPage: {
    id: "authPage",
    label: "Login",
    role: "Login - Logoff - Signup",
    uiStyle: "userContext",
    emotionalTone: ["intentional", "grounded", "selfAware"],
    pacing: "steady",
    papaWhisperStyle: "personal",

    scenes: {
      default: {
		  "blue-hour-dawn": "authpage_blue_hour_dawn",
		  "first-light": "authpage_first_light",
		  "soft-morning-rise": "authpage_soft_morning_rise",
		  "warm-drift": "authpage_warm_drift",
		  "golden-dusk": "authpage_golden_dusk",
		  "quiet-evening-glow": "authpage_quiet_evening_glow",
		  "ember-twilight": "authpage_ember_twilight",
		},
      seasonal: {},
      special: {},
    },
  },
};