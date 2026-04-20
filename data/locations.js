export const CAST_LOCATIONS = [
  
  {
  id: "backyard-pond",
  name: "Backyard Pond",
  location_type: "pond",
  location_type_label: "Pond",
  adventure_ids: ["backyard-pond"],
  tagline: "The first water is the one close enough to return to.",
  short_intro:
    "A familiar pond close to home where first casts become first lessons.",
  long_intro:
    "Backyard Pond is small, quiet, and personal. It teaches the first habits of fishing: looking before casting, noticing shade and edges, and learning that even simple water has patterns.",
  environment: {
    water_type: "Freshwater pond",
    structure: ["shoreline edges", "shade lines", "still pockets"],
    vegetation: ["pond-edge grass", "shallow cover"],
    depth_profile: "Shallow to moderate",
    water_movement: "still"
  },
  environment_summary:
    "This is a place for first attention. Fish often hold near the edges, in shade, and where simple cover breaks up the bank.",
  access: {
    summary: "Bank only",
    long_text:
      "This pond is simple and approachable from shore, making it a natural first place to learn how to observe before acting.",
    bank_access: "excellent",
    boat_access: "none",
    special_features: ["easy shoreline access", "familiar water"]
  },
  fish_species: [
    "bluegill",
    "small pond species"
  ],
  fishing_patterns: {
    primary_zones: [
      "shady edges",
      "bank-side cover",
      "still water near the shoreline"
    ],
    techniques: [
      "bobber fishing",
      "simple bait presentation",
      "close-range casting"
    ],
    seasonal_notes: []
  },
  wildlife: {
    presence_level: "low",
    notable_species: []
  },
  tone_profile: [
    "familiar",
    "quiet",
    "foundational",
    "local"
  ],
  difficulty: {
    beginner_friendly: "high",
    learning_focus: [
      "watching before casting",
      "basic rigging",
      "first-cast confidence",
      "logging the day"
    ]
  },
  difficulty_label: "Beginner Friendly",
  sub_locations: [],
  adventure_hooks: [
    "Read the water before your first cast.",
    "Notice where the shade touches the bank.",
    "Learn that even a small pond has patterns."
  ],
  papa_line:
    "Don't overlook the water closest to home. A first pond can teach you plenty."
},
  
  {
    id: "edward-medard",
    name: "Edward Medard Reservoir",
    location_type: "reservoir",
    location_type_label: "Reservoir",
	adventure_ids: ["edward-medard"],
    tagline: "Open water, broad structure, and shoreline grass to read.",
    short_intro:
      "A reclaimed reservoir with ledges, flats, vegetation, and room to explore.",
    long_intro:
      "Edward Medard feels wide, calm, and full of structure. It teaches shoreline patterning, vegetation awareness, and how to read a larger body of freshwater with patience.",
    environment: {
      water_type: "Freshwater reservoir",
      structure: ["ledges", "flats", "irregular shoreline", "coves"],
      vegetation: ["Kissimmee grass", "bulrush", "cattails"],
      depth_profile: "Average 9 ft, max 33 ft",
      water_movement: "still"
    },
    environment_summary:
      "This water rewards slow observation. Shoreline grass, contour changes, and open structure all matter here.",
    access: {
      summary: "Bank + boat",
      long_text:
        "Bank access is strong, and boats are allowed under idle-speed conditions. This makes the reservoir approachable while still encouraging thoughtful movement.",
      bank_access: "excellent",
      boat_access: "available",
      special_features: ["fishing pier", "dock", "campground"]
    },
    fish_species: [
      "largemouth bass",
      "bluegill",
      "redear sunfish",
      "sunshine bass",
      "channel catfish",
      "black crappie",
	  "warmouth"
    ],
    fishing_patterns: {
      primary_zones: ["shoreline vegetation", "ledges", "flats"],
      techniques: ["shoreline casting", "structure fishing"],
      seasonal_notes: ["bass active in shoreline grass during winter and spring"]
    },
    wildlife: {
      presence_level: "moderate",
      notable_species: []
    },
    tone_profile: ["open", "calm", "exploratory", "pattern-based"],
    difficulty: {
      beginner_friendly: "high",
      learning_focus: [
        "reading structure",
        "understanding shoreline vegetation",
        "lake pattern recognition"
      ]
    },
    difficulty_label: "Beginner Friendly",
    sub_locations: [],
    adventure_hooks: [
      "Observe the shoreline grass before casting.",
      "Find a ledge or flat that feels alive.",
      "Notice how open water and cover work together."
    ],
    papa_line:
      "Take your time here. The water will tell you more than your hurry will."
  },
  
  {
  id: "morris-bridge",
  name: "Morris Bridge / Trout Creek",
  location_type: "river_creek_system",
  location_type_label: "River · Creek",
  adventure_ids: ["hillsborough-river"],
  tagline: "Moving water, cypress roots, and quiet places where fish wait.",
  
  short_intro:
    "A wooded river system where fish hold tight to cover and the water is always in motion.",

  long_intro:
    "Morris Bridge and Trout Creek feel quieter, wilder, and more alive. The water moves slowly through cypress roots, fallen trees, and shaded banks. This place teaches patience, precision, and how to read water that is always changing.",

  environment: {
    water_type: "Freshwater river and creek",
    structure: ["cypress roots", "downed trees", "deep holes", "cut banks"],
    vegetation: ["riverbank vegetation", "submerged roots", "overhanging branches"],
    depth_profile: "Variable with deeper pockets and shallow runs",
    water_movement: "flowing"
  },

  environment_summary:
    "Fish here rarely sit in the open. They hold tight to roots, timber, and edges where current brings food to them. Learning to see these holding points is key.",

  access: {
    summary: "Bank + kayak",
    long_text:
      "Bank access is available along trails and boardwalk areas, while kayaks and small boats allow deeper exploration into the creek and river system. Movement is slower here, and positioning matters more than distance.",
    bank_access: "good",
    boat_access: "kayak / canoe / small boat",
    special_features: ["boardwalk", "river access", "wilderness trails"]
  },

  fish_species: [
    "largemouth bass",
    "bluegill",
    "redear sunfish",
    "black crappie",
    "channel catfish",
    "bowfin",
    "gar",
    "warmouth"
  ],

  fishing_patterns: {
    primary_zones: [
      "cypress roots",
      "fallen timber",
      "current breaks",
      "deep holes"
    ],
    techniques: [
      "target casting",
      "cover fishing",
      "topwater near structure",
      "live bait for panfish"
    ],
    seasonal_notes: [
      "early morning and evening are most active",
      "shaded water holds fish during heat"
    ]
  },

  wildlife: {
    presence_level: "high",
    notable_species: [
      "alligators",
      "turtles",
      "water snakes",
      "wading birds"
    ]
  },

  tone_profile: [
    "quiet",
    "wild",
    "observational",
    "alive"
  ],

  difficulty: {
    beginner_friendly: "medium",
    learning_focus: [
      "reading current",
      "identifying cover",
      "precision casting",
      "understanding fish positioning"
    ]
  },

  difficulty_label: "Moderate",

  sub_locations: [
    "Trout Creek",
    "Hillsborough River stretch"
  ],

  adventure_hooks: [
    "Watch how the current moves around roots and trees before casting.",
    "Look for a break in the current where fish can rest.",
    "Cast close to structure, not into open water.",
    "Notice how shade changes where fish hold."
  ],

  papa_line:
    "In moving water, they don’t chase like you think. They wait. You have to learn where."
},

{
  id: "hardee-lakes",
  name: "Hardee Lakes Park",
  location_type: "multi_lake_system",
  location_type_label: "Lake System",
  adventure_ids: ["hardee-lakes"],
  tagline: "A park of many waters, where each lake teaches something different.",

  short_intro:
    "A reclaimed lake system with multiple fishable waters, attractors, piers, and room to explore at your own pace.",

  long_intro:
    "Hardee Lakes feels layered and expansive in a different way than a single reservoir. Instead of learning one body of water, you learn a family of lakes—each with its own access, structure, and rhythm. This place teaches exploration, comparison, and how to choose water with intention.",

  environment: {
    water_type: "Freshwater multi-lake system",
    structure: ["fish attractors", "varied contours", "shoreline edges", "open pockets"],
    vegetation: ["spike rush", "bulrush", "submerged vegetation"],
    depth_profile: "Varies by lake, with many areas reaching up to 20 feet",
    water_movement: "still"
  },

  environment_summary:
    "These lakes reward curiosity. Some areas are easier to reach from shore, while others invite you to learn marked attractors, vegetation edges, and how each lake holds fish a little differently.",

  access: {
    summary: "Bank + boat",
    long_text:
      "All four lakes offer shore access and concrete boat ramps, while Hardee and Deer Lakes are especially friendly for bank fishing. Piers, attractors, and multiple launch points make this a strong place for both exploration and practice.",
    bank_access: "excellent",
    boat_access: "available on all lakes",
    special_features: ["fishing piers", "boat ramps", "fish attractor buoys", "boardwalk", "observation tower"]
  },

  fish_species: [
    "largemouth bass",
    "bluegill",
    "redear sunfish",
    "sunshine bass",
    "channel catfish",
    "black crappie"
  ],

  fishing_patterns: {
    primary_zones: [
      "fish attractors",
      "vegetation edges",
      "shoreline access points",
      "deeper contour changes"
    ],
    techniques: [
      "bank fishing",
      "targeting attractors",
      "shoreline casting",
      "boat-based exploration"
    ],
    seasonal_notes: [
      "different lakes may fish differently on the same day",
      "accessible attractors make it easier to learn productive structure"
    ]
  },

  wildlife: {
    presence_level: "moderate",
    notable_species: [
      "wading birds",
      "lake-edge wildlife"
    ]
  },

  tone_profile: [
    "exploratory",
    "layered",
    "accessible",
    "structured"
  ],

  difficulty: {
    beginner_friendly: "high",
    learning_focus: [
      "choosing between locations",
      "using fish attractors",
      "comparing lake behavior",
      "building confidence through exploration"
    ]
  },

  difficulty_label: "Beginner Friendly",

  sub_locations: [
    "Lake Hardee",
    "Deer Lake",
    "Lake Firefly",
    "Gator Lake"
  ],

  adventure_hooks: [
    "Compare one lake to another before deciding where to fish.",
    "Look for marked attractors and imagine what fish are holding there.",
    "Notice how vegetation and open water change from lake to lake.",
    "Choose a lake with intention instead of rushing to the nearest bank."
  ],

  papa_line:
    "Not every lake speaks the same way. Sometimes the lesson is learning which one to trust today."
}

];