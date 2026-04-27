export const pageProfiles = {
  intro: {
    id: "intro",
    label: "Intro",
    role: "invitation",
    uiStyle: "threshold",
    emotionalTone: ["welcoming", "still", "threshold"],
    pacing: "slow",

    scenes: {
      default: {
        morning: "intro_quiet_dawn",
        afternoon: "intro_golden_reflection",
        evening: "intro_evening_glow",
      },
      seasonal: {},
      special: {},
    },
  },

  home: {
    id: "home",
    label: "Home",
    role: "dock",
    uiStyle: "hub",
    emotionalTone: ["grounded", "welcoming", "present"],
    pacing: "steady",

    scenes: {
      default: {
        morning: "home_quiet_dawn",
        afternoon: "home_golden_reflection",
        evening: "home_evening_glow",
      },
      seasonal: {},
      special: {},
    },
  },
  
  adventure: {
    id: "adventure",
    label: "adventure",
    role: "learning",
    uiStyle: "guidedFlow",
    emotionalTone: ["curious", "observant", "attentive"],
    pacing: "measured",

    scenes: {
      default: {
        morning: "home_quiet_dawn",
        afternoon: "home_golden_reflection",
        evening: "home_evening_glow",
      },
      seasonal: {},
      special: {},
    },
  },

  fieldGuide: {
    id: "fieldGuide",
    label: "Field Guide",
    role: "learning",
    uiStyle: "scrollCards",
    emotionalTone: ["curious", "observant", "attentive"],
    pacing: "measured",

    scenes: {
      default: {
        morning: "field_guide_quiet_dawn",
        afternoon: "field_guide_golden_reflection",
        evening: "field_guide_evening_glow",
      },
      seasonal: {},
      special: {},
    },
  },

  locations: {
    id: "locations",
    label: "Locations",
    role: "waters",
    uiStyle: "placeCards",
    emotionalTone: ["rooted", "exploratory", "relational"],
    pacing: "steady",

    scenes: {
      default: {
        morning: "locations_quiet_dawn",
        afternoon: "locations_golden_reflection",
        evening: "locations_evening_glow",
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

    scenes: {
      default: {
        morning: "plan_trip_quiet_dawn",
        afternoon: "plan_trip_golden_reflection",
        evening: "plan_trip_evening_glow",
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

    scenes: {
      default: {
        morning: "catch_ledger_quiet_dawn",
        afternoon: "catch_ledger_golden_reflection",
        evening: "catch_ledger_evening_glow",
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

    scenes: {
      default: {
        morning: "journal_quiet_dawn",
        afternoon: "journal_golden_reflection",
        evening: "journal_evening_glow",
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

    scenes: {
      default: {
        morning: "talk_quiet_dawn",
        afternoon: "talk_golden_reflection",
        evening: "talk_evening_glow",
      },
      seasonal: {},
      special: {},
    },
  },
};