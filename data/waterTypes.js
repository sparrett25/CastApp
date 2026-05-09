export const waterTypes = [

 {
    id: "pond",
    label: "Pond",
    category: "Still Water",
    shortDescription:
      "Small, quiet water that rewards patience, shoreline observation, and simple presentations.",
    toneTags: ["quiet", "familiar", "patient", "beginner-friendly"],
    structureTags: ["shoreline grass", "shade", "dock edges", "shallow flats"],

    summary:
      "Ponds are small still waters where subtle movement matters. They often teach the first lessons of fishing: watching the surface, noticing shade, and learning how fish relate to edges.",

    whatToLookFor: [
      "Ripples near shoreline grass",
      "Bluegill beds or small surface taps",
      "Shade from trees, docks, or overhanging banks",
      "Small baitfish movement near the edge",
    ],

    learningFocus: [
      "Patience",
      "Watching before casting",
      "Simple bait presentation",
      "Reading small surface changes",
    ],

    speciesIds: ["bluegill", "largemouth-bass", "warmouth"],
    gearIds: ["light_spinning_rod", "bobber_rig", "soft_plastics"],
    techniqueIds: ["bobber_watching", "edge_casting", "slow_retrieve"],

    papaReflection:
      "A pond doesn’t ask you to hurry. Sit still long enough, and it’ll start telling you where life is moving.",

    regionalVariants: {
      tampa: {
        label: "Warm Neighborhood Pond",
        summary:
          "In Tampa, ponds often hold warm shallow edges, grass lines, bluegill, bass, turtles, wading birds, and slow evening activity.",
        speciesIds: ["bluegill", "largemouth-bass", "warmouth", "gar"],
      },

      midwest_pond: {
        label: "Farm Pond",
        summary:
          "In the Midwest, ponds often feel open and familiar, with grassy banks, panfish, bass, and quiet evening surface movement.",
        speciesIds: ["bluegill", "largemouth-bass", "channel-catfish"],
      },

      appalachian_creek: {
        label: "Sheltered Mountain Pond",
        summary:
          "In Appalachian country, ponds may sit tucked between hills or woods, quieter and cooler than southern ponds, with shade playing a larger role.",
        speciesIds: ["bluegill", "largemouth-bass", "rock-bass"],
      },

      pacific_northwest: {
        label: "Cool Forest Pond",
        summary:
          "In the Pacific Northwest, ponds often feel cooler, shaded, and reflective, shaped by evergreens, mist, and slower feeding windows.",
        speciesIds: ["rainbow-trout", "bluegill", "largemouth-bass"],
      },

      northern_lakes: {
        label: "Northwoods Pond",
        summary:
          "In northern lake country, small ponds can feel quiet and clear, often surrounded by reeds, pines, and cooler evening air.",
        speciesIds: ["bluegill", "yellow-perch", "largemouth-bass"],
      },
    },
  },

  {
    id: "lake",
    label: "Lake",
    category: "Still Water",
    shortDescription:
      "Larger still water with zones, depth changes, shoreline structure, and seasonal fish movement.",
    toneTags: ["spacious", "observant", "open", "seasonal"],
    structureTags: ["drop-offs", "weed beds", "points", "docks", "open water"],

    summary:
      "Lakes ask the angler to think in zones. Fish may relate to shorelines, vegetation, points, deeper water, or changing light depending on season and time of day.",

    whatToLookFor: [
      "Weed edges and openings",
      "Points where land reaches into water",
      "Shade around docks or trees",
      "Wind-blown banks",
      "Birds or baitfish activity",
    ],

    learningFocus: [
      "Thinking in zones",
      "Watching wind direction",
      "Finding structure",
      "Matching technique to depth",
    ],

    speciesIds: ["largemouth-bass", "bluegill", "crappie", "yellow-perch"],
    gearIds: ["medium_spinning_rod", "soft_plastics", "small_jigs"],
    techniqueIds: ["edge_casting", "slow_retrieve", "dock_casting"],

    papaReflection:
      "A lake can feel big at first. Don’t fish all of it. Find one edge, one shadow, one change — and begin there.",

    regionalVariants: {},
  },

  {
    id: "creek",
    label: "Creek",
    category: "Moving Water",
    shortDescription:
      "Small moving water that teaches close observation, careful movement, and reading current.",
    toneTags: ["intimate", "moving", "attentive", "exploratory"],
    structureTags: ["riffles", "pools", "bends", "rocks", "undercut banks"],

    summary:
      "Creeks are close, living water. They reward quiet feet, short casts, and careful attention to current seams, shaded pockets, and small pools.",

    whatToLookFor: [
      "Deeper pools after shallow riffles",
      "Current breaks behind rocks",
      "Shaded bends",
      "Undercut banks",
      "Small pockets of slower water",
    ],

    learningFocus: [
      "Reading current",
      "Moving quietly",
      "Short accurate casts",
      "Fishing one pocket at a time",
    ],

    speciesIds: ["smallmouth-bass", "rock-bass", "brook-trout", "rainbow-trout"],
    gearIds: ["ultralight_spinning_rod", "small_jigs", "inline_spinner"],
    techniqueIds: ["drift_bait", "pocket_casting", "short_casting"],

    papaReflection:
      "Creeks don’t give the whole story at once. They show you one bend, one pool, one pocket of quiet water at a time.",

    regionalVariants: {},
  },

  {
    id: "river",
    label: "River",
    category: "Moving Water",
    shortDescription:
      "Larger moving water shaped by current, bends, seams, depth, and seasonal flow.",
    toneTags: ["dynamic", "patterned", "powerful", "patient"],
    structureTags: ["current seams", "bends", "riffles", "deep runs", "banks"],

    summary:
      "Rivers are built from movement. The key is learning where fast water meets slow water, where fish can hold with less effort, and where food naturally drifts past them.",

    whatToLookFor: [
      "Current seams",
      "Inside bends",
      "Eddies",
      "Riffle corners",
      "Deep runs beside shallow water",
    ],

    learningFocus: [
      "Reading moving water",
      "Casting to seams",
      "Understanding drift",
      "Respecting current",
    ],

    speciesIds: ["smallmouth-bass", "catfish", "trout", "walleye", "brook-trout"],
    gearIds: ["medium_spinning_rod", "jigs", "live_bait_rig"],
    techniqueIds: ["drift_bait", "seam_casting", "bottom_bouncing"],

    papaReflection:
      "A river is always speaking, but never in a straight line. Watch where the current changes — that’s usually where the lesson is.",

    regionalVariants: {},
  },

  {
    id: "reservoir",
    label: "Reservoir",
    category: "Still Water",
    shortDescription:
      "Large managed water with changing levels, structure, points, coves, and seasonal fish movement.",
    toneTags: ["open", "structured", "seasonal", "exploratory"],
    structureTags: ["points", "drop-offs", "coves", "standing timber", "channels"],

    summary:
      "Reservoirs often combine lake-like stillness with hidden structure beneath the surface. Fish may follow points, channels, coves, timber, or changing water levels.",

    whatToLookFor: [
      "Points and coves",
      "Submerged timber",
      "Drop-offs",
      "Old creek channels",
      "Wind-blown shorelines",
    ],

    learningFocus: [
      "Finding structure",
      "Thinking seasonally",
      "Fishing transitions",
      "Using maps and observation together",
    ],

    speciesIds: ["largemouth-bass", "crappie", "catfish", "bluegill"],
    gearIds: ["medium_spinning_rod", "soft_plastics", "crankbait"],
    techniqueIds: ["structure_casting", "slow_retrieve", "jigging"],

    papaReflection:
      "Reservoirs hide a lot below the surface. Don’t just look at the water — imagine the land that used to be there.",

    regionalVariants: {},
  },
  
  {
  id: "marsh-wetlands",
  label: "Marsh / Wetlands",
  category: "Shallow Cover Water",
  shortDescription:
    "Vegetation-rich water that rewards quiet movement, edge awareness, and patience near cover.",
  toneTags: ["alive", "hidden", "patient", "watchful"],
  structureTags: ["reeds", "grass lines", "lily pads", "muddy edges", "shallow cover"],

  summary:
    "Marshes and wetlands are full of edges. Fish may hold where vegetation opens, where shade gathers, or where small movements reveal life beneath the surface.",

  whatToLookFor: [
    "Open pockets between vegetation",
    "Small baitfish or insect movement",
    "Edges where grass meets open water",
    "Bird activity near shallow feeding zones",
  ],

  learningFocus: [
    "Moving quietly",
    "Reading vegetation",
    "Casting to openings",
    "Watching subtle surface movement",
  ],

  speciesIds: ["largemouth-bass", "bluegill", "warmouth", "bowfin", "gar"],
  gearIds: ["medium_spinning_rod", "soft_plastics", "bobber_rig"],
  techniqueIds: ["edge_casting", "slow_retrieve", "close_cover_casting"],

  papaReflection:
    "Wetlands don’t reveal themselves all at once. Watch the edges long enough, and you’ll see where the water is breathing.",

  regionalVariants: {
    tampa: {
      label: "Warm Marsh Edge",
      summary:
        "In Tampa, marsh edges often hold warm shallow water, grass lines, gar, bowfin, bass, bluegill, turtles, and wading birds.",
      speciesIds: ["largemouth-bass", "bluegill", "warmouth", "bowfin", "gar"],
    },
  },
},
{
  id: "canal",
  label: "Canal",
  category: "Managed Water",
  shortDescription:
    "Straight-edged water shaped by banks, culverts, current pulses, and overlooked structure.",
  toneTags: ["overlooked", "structured", "urban", "patient"],
  structureTags: ["steep banks", "culverts", "bridges", "current breaks", "drainage edges"],

  summary:
    "Canals may look simple at first, but fish often relate to small pieces of structure: shade, culverts, bridges, pipes, current changes, and bank edges.",

  whatToLookFor: [
    "Shade under bridges",
    "Culvert openings",
    "Current after rain",
    "Bank edges and drop-offs",
    "Small fish activity near structure",
  ],

  learningFocus: [
    "Finding overlooked structure",
    "Fishing edges",
    "Watching water movement",
    "Noticing small changes in simple water",
  ],

  speciesIds: ["largemouth-bass", "bluegill", "gar", "catfish"],
  gearIds: ["medium_spinning_rod", "soft_plastics", "live_bait_rig"],
  techniqueIds: ["edge_casting", "structure_casting", "slow_retrieve"],

  papaReflection:
    "Even plain water has places where life gathers. Don’t dismiss a canal just because it runs straight.",

  regionalVariants: {
    tampa: {
      label: "Neighborhood Canal",
      summary:
        "In Tampa, canals can hold bass, bluegill, gar, catfish, and warm slow water near culverts, shaded banks, and drainage edges.",
      speciesIds: ["largemouth-bass", "bluegill", "gar", "channel-catfish"],
    },
  },
},
{
  id: "tailwater",
  label: "Tailwater",
  category: "Managed Moving Water",
  shortDescription:
    "Water below a dam where flow, temperature, and current shape fish behavior.",
  toneTags: ["technical", "steady", "current-aware", "precise"],
  structureTags: ["release flow", "current seams", "riffles", "deep runs", "gravel bars"],

  summary:
    "Tailwaters are shaped by controlled releases. They often require attention to flow, current seams, water clarity, and presentation because conditions can change quickly.",

  whatToLookFor: [
    "Current seams below release areas",
    "Deep runs beside shallower shelves",
    "Soft water behind rocks or structure",
    "Changes in water level or flow",
  ],

  learningFocus: [
    "Respecting current",
    "Reading flow changes",
    "Precise presentation",
    "Watching release conditions",
  ],

  speciesIds: ["rainbow-trout", "brown-trout", "smallmouth-bass", "brook-trout"],
  gearIds: ["light_spinning_rod", "ultralight_spinning_rod", "inline_spinner"],
  techniqueIds: ["drift_bait", "seam_casting", "slow_retrieve"],

  papaReflection:
    "Tailwater teaches respect. The current may look steady, but it’s always telling you what changed upstream.",

  regionalVariants: {
    pacific_northwest: {
      label: "Cold Tailwater",
      summary:
        "In the Pacific Northwest, tailwaters often feel cold, clear, and current-shaped, with trout holding near seams and deeper runs.",
      speciesIds: ["rainbow-trout", "brown-trout"],
    },
    appalachian_creek: {
      label: "Mountain Tailwater",
      summary:
        "In Appalachian country, tailwaters can carry cold release water through valleys, creating trout habitat where current and temperature matter deeply.",
      speciesIds: ["rainbow-trout", "brook-trout", "brown-trout"],
    },
  },
}
];