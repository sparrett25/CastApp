export const MY_LOCATIONS = [
  {
    id: "backyard-pond",
    name: "Backyard Pond",
    regionId: "tampa",
    waterTypeId: "pond",

    knownSpeciesIds: ["bluegill", "channel-catfish"],
    observedSpeciesIds: ["bluegill"],
    preferredSpeciesIds: [],

    recommendedGearIds: [
      "spinning-reel",
      "float-rig",
      "nightcrawlers",
      "monofilament-line",
    ],
    fieldKitGearIds: [],
    techniqueIds: [],

    adventureIds: ["backyard-pond"],

    notes:
      "A familiar pond close to home where first casts become first lessons.",

    photoUrls: [],
    fieldNoteIds: [],
    journalEntryIds: [],

    details: {
      tagline: "The first water is the one close enough to return to.",
      locationTypeLabel: "Pond",
      environment: {
        waterType: "Freshwater pond",
        structure: ["shoreline edges", "shade lines", "still pockets"],
        vegetation: ["pond-edge grass", "shallow cover"],
        depthProfile: "Shallow to moderate",
        waterMovement: "still",
      },
      access: {
        summary: "Bank only",
        bankAccess: "excellent",
        boatAccess: "none",
        specialFeatures: ["easy shoreline access", "familiar water"],
      },
      fishingPatterns: {
        primaryZones: ["shady edges", "bank-side cover", "still water near the shoreline"],
        techniques: ["bobber fishing", "simple bait presentation", "close-range casting"],
        seasonalNotes: [],
      },
      wildlife: {
        presenceLevel: "low",
        notableSpecies: [],
      },
      toneProfile: ["familiar", "quiet", "foundational", "local"],
      difficultyLabel: "Beginner Friendly",
      learningFocus: [
        "watching before casting",
        "basic rigging",
        "first-cast confidence",
        "logging the day",
      ],
      papaLine:
        "Don't overlook the water closest to home. A first pond can teach you plenty.",
    },
  },

  {
    id: "edward-medard",
    name: "Edward Medard Reservoir",
    regionId: "tampa",
    waterTypeId: "reservoir",

    knownSpeciesIds: [
      "largemouth-bass",
      "bluegill",
      "redear-sunfish",
      "sunshine-bass",
      "channel-catfish",
      "black-crappie",
      "warmouth",
    ],
    observedSpeciesIds: [],
    preferredSpeciesIds: [],

    recommendedGearIds: [
      "spinning-reel",
      "soft-plastic-worm",
      "spinnerbait",
      "carolina-rig",
      "monofilament-line",
    ],
    fieldKitGearIds: [],
    techniqueIds: [],

    adventureIds: ["edward-medard"],

    notes:
      "A reclaimed reservoir with shoreline grass, ledges, flats, vegetation, and room to explore.",

    photoUrls: [],
    fieldNoteIds: [],
    journalEntryIds: [],

    details: {
      tagline: "Open water, broad structure, and shoreline grass to read.",
      locationTypeLabel: "Reservoir",
      environment: {
        waterType: "Freshwater reservoir",
        structure: ["ledges", "flats", "irregular shoreline", "coves"],
        vegetation: ["Kissimmee grass", "bulrush", "cattails"],
        depthProfile: "Average 9 ft, max 33 ft",
        waterMovement: "still",
      },
      access: {
        summary: "Bank + boat",
        bankAccess: "excellent",
        boatAccess: "available",
        specialFeatures: ["fishing pier", "dock", "campground"],
      },
      fishingPatterns: {
        primaryZones: ["shoreline vegetation", "ledges", "flats"],
        techniques: ["shoreline casting", "structure fishing"],
        seasonalNotes: ["bass active in shoreline grass during winter and spring"],
      },
      wildlife: {
        presenceLevel: "moderate",
        notableSpecies: [],
      },
      toneProfile: ["open", "calm", "exploratory", "pattern-based"],
      difficultyLabel: "Beginner Friendly",
      learningFocus: [
        "reading structure",
        "understanding shoreline vegetation",
        "lake pattern recognition",
      ],
      papaLine:
        "Take your time here. The water will tell you more than your hurry will.",
    },
  },

  {
    id: "morris-bridge",
    name: "Morris Bridge / Trout Creek",
    regionId: "tampa",
    waterTypeId: "river",

    knownSpeciesIds: [
      "largemouth-bass",
      "bluegill",
      "redear-sunfish",
      "black-crappie",
      "channel-catfish",
      "bowfin",
      "gar",
      "warmouth",
    ],
    observedSpeciesIds: [],
    preferredSpeciesIds: [],

    recommendedGearIds: [
      "spinning-reel",
      "topwater-frog",
      "soft-plastic-worm",
      "live-baitfish",
      "monofilament-line",
    ],
    fieldKitGearIds: [],
    techniqueIds: [],

    adventureIds: ["hillsborough-river"],

    notes:
      "A wooded river and creek system with cypress roots, moving water, shaded banks, and quiet holding places.",

    photoUrls: [],
    fieldNoteIds: [],
    journalEntryIds: [],

    details: {
      tagline: "Moving water, cypress roots, and quiet places where fish wait.",
      locationTypeLabel: "River · Creek",
      environment: {
        waterType: "Freshwater river and creek",
        structure: ["cypress roots", "downed trees", "deep holes", "cut banks"],
        vegetation: ["riverbank vegetation", "submerged roots", "overhanging branches"],
        depthProfile: "Variable with deeper pockets and shallow runs",
        waterMovement: "flowing",
      },
      access: {
        summary: "Bank + kayak",
        bankAccess: "good",
        boatAccess: "kayak / canoe / small boat",
        specialFeatures: ["boardwalk", "river access", "wilderness trails"],
      },
      fishingPatterns: {
        primaryZones: ["cypress roots", "fallen timber", "current breaks", "deep holes"],
        techniques: [
          "target casting",
          "cover fishing",
          "topwater near structure",
          "live bait for panfish",
        ],
        seasonalNotes: [
          "early morning and evening are most active",
          "shaded water holds fish during heat",
        ],
      },
      wildlife: {
        presenceLevel: "high",
        notableSpecies: ["alligators", "turtles", "water snakes", "wading birds"],
      },
      toneProfile: ["quiet", "wild", "observational", "alive"],
      difficultyLabel: "Moderate",
      learningFocus: [
        "reading current",
        "identifying cover",
        "precision casting",
        "understanding fish positioning",
      ],
      subLocations: ["Trout Creek", "Hillsborough River stretch"],
      papaLine:
        "In moving water, they don’t chase like you think. They wait. You have to learn where.",
    },
  },

  {
    id: "hardee-lakes",
    name: "Hardee Lakes Park",
    regionId: "tampa",
    waterTypeId: "lake",

    knownSpeciesIds: [
      "largemouth-bass",
      "bluegill",
      "redear-sunfish",
      "sunshine-bass",
      "channel-catfish",
      "black-crappie",
    ],
    observedSpeciesIds: [],
    preferredSpeciesIds: [],

    recommendedGearIds: [
      "spinning-reel",
      "soft-plastic-worm",
      "spinnerbait",
      "live-baitfish",
      "monofilament-line",
    ],
    fieldKitGearIds: [],
    techniqueIds: [],

    adventureIds: ["hardee-lakes"],

    notes:
      "A multi-lake park system with shore access, piers, attractors, boat ramps, and several waters to compare.",

    photoUrls: [],
    fieldNoteIds: [],
    journalEntryIds: [],

    details: {
      tagline: "A park of many waters, where each lake teaches something different.",
      locationTypeLabel: "Lake System",
      environment: {
        waterType: "Freshwater multi-lake system",
        structure: ["fish attractors", "varied contours", "shoreline edges", "open pockets"],
        vegetation: ["spike rush", "bulrush", "submerged vegetation"],
        depthProfile: "Varies by lake, with many areas reaching up to 20 feet",
        waterMovement: "still",
      },
      access: {
        summary: "Bank + boat",
        bankAccess: "excellent",
        boatAccess: "available on all lakes",
        specialFeatures: [
          "fishing piers",
          "boat ramps",
          "fish attractor buoys",
          "boardwalk",
          "observation tower",
        ],
      },
      fishingPatterns: {
        primaryZones: [
          "fish attractors",
          "vegetation edges",
          "shoreline access points",
          "deeper contour changes",
        ],
        techniques: [
          "bank fishing",
          "targeting attractors",
          "shoreline casting",
          "boat-based exploration",
        ],
        seasonalNotes: [
          "different lakes may fish differently on the same day",
          "accessible attractors make it easier to learn productive structure",
        ],
      },
      wildlife: {
        presenceLevel: "moderate",
        notableSpecies: ["wading birds", "lake-edge wildlife"],
      },
      toneProfile: ["exploratory", "layered", "accessible", "structured"],
      difficultyLabel: "Beginner Friendly",
      learningFocus: [
        "choosing between locations",
        "using fish attractors",
        "comparing lake behavior",
        "building confidence through exploration",
      ],
      subLocations: ["Lake Hardee", "Deer Lake", "Lake Firefly", "Gator Lake"],
      papaLine:
        "Not every lake speaks the same way. Sometimes the lesson is learning which one to trust today.",
    },
  },
];