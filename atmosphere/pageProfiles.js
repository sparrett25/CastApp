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
		  "starry-night": "intro_starry_night",
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
		  "starry-night": "home_starry_night",
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
		  "blue-hour-dawn": "field_guide_blue_hour_dawn",
		  "first-light": "field_guide_first_light",
		  "soft-morning-rise": "field_guide_soft_morning_rise",
		  "warm-drift": "field_guide_warm_drift",
		  "golden-dusk": "field_guide_golden_dusk",
		  "quiet-evening-glow": "field_guide_quiet_evening_glow",
		  "ember-twilight": "field_guide_ember_twilight",
		  "starry-night": "field_guide_starry_night",
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
		  "starry-night": "locations_starry_night",
		},
      seasonal: {},
      special: {},
    },
  },
  
  
trips: {
  id: "trips",
  label: "Trips",
  role: "preparation",
    uiStyle: "guidedFlow",
    emotionalTone: ["intentional", "anticipatory", "calm"],
    pacing: "guided",
    papaWhisperStyle: "preparing",
  
  scenes: {
    default: {
      "blue-hour-dawn": "trips_blue_hour_dawn",
      "first-light": "trips_first_light",
      "soft-morning-rise": "trips_soft_morning_rise",
      "warm-drift": "trips_warm_drift",
      "golden-dusk": "trips_golden_dusk",
      "quiet-evening-glow": "trips_quiet_evening_glow",
      "ember-twilight": "trips_ember_twilight",
	  "starry-night": "trips_starry_night",
    }
  }
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
		  "blue-hour-dawn": "plan_trip_blue_hour_dawn",
		  "first-light": "plan_trip_first_light",
		  "soft-morning-rise": "plan_trip_soft_morning_rise",
		  "warm-drift": "plan_trip_warm_drift",
		  "golden-dusk": "plan_trip_golden_dusk",
		  "quiet-evening-glow": "plan_trip_quiet_evening_glow",
		  "ember-twilight": "plan_trip_ember_twilight",
		  "starry-night": "plan_trip_starry_night",
		},
      seasonal: {},
      special: {},
    },
  },
  
   
  tripSummary: {
    id: "tripSummary",
    label: "Trip Summary",
    role: "preparation",
    uiStyle: "guidedFlow",
    emotionalTone: ["intentional", "anticipatory", "calm"],
    pacing: "guided",
    papaWhisperStyle: "preparing",

    scenes: {
      default: {
		  "blue-hour-dawn": "trip_summary_blue_hour_dawn",
		  "first-light": "trip_summary_first_light",
		  "soft-morning-rise": "trip_summary_soft_morning_rise",
		  "warm-drift": "trip_summary_warm_drift",
		  "golden-dusk": "trip_summary_golden_dusk",
		  "quiet-evening-glow": "trip_summary_quiet_evening_glow",
		  "ember-twilight": "trip_summary_ember_twilight",
		  "starry-night": "trip_summary_starry_night",
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
		  "blue-hour-dawn": "catch_ledger_blue_hour_dawn",
		  "first-light": "catch_ledger_first_light",
		  "soft-morning-rise": "catch_ledger_soft_morning_rise",
		  "warm-drift": "catch_ledger_warm_drift",
		  "golden-dusk": "catch_ledger_golden_dusk",
		  "quiet-evening-glow": "catch_ledger_quiet_evening_glow",
		  "ember-twilight": "catch_ledger_ember_twilight",
		  "starry-night": "catch_ledger_starry_night",
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
		  "starry-night": "journal_starry_night",
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
		  "blue-hour-dawn": "talk_blue_hour_dawn",
		  "first-light": "talk_first_light",
		  "soft-morning-rise": "talk_soft_morning_rise",
		  "warm-drift": "talk_warm_drift",
		  "golden-dusk": "talk_golden_dusk",
		  "quiet-evening-glow": "talk_quiet_evening_glow",
		  "ember-twilight": "talk_ember_twilight",
		  "starry-night": "talk_starry_night",
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
		  "starry-night": "profile_starry_night",
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
		  "blue-hour-dawn": "auth_page_blue_hour_dawn",
		  "first-light": "auth_page_first_light",
		  "soft-morning-rise": "auth_page_soft_morning_rise",
		  "warm-drift": "auth_page_warm_drift",
		  "golden-dusk": "auth_page_golden_dusk",
		  "quiet-evening-glow": "auth_page_quiet_evening_glow",
		  "ember-twilight": "auth_page_ember_twilight",
		  "starry-night": "auth_page_starry_night",
		},
      seasonal: {},
      special: {},
    },
  },
};