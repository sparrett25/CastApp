export const SPECIES = [
  {
    id: "bluegill",
    slug: "bluegill",
    name: "Bluegill",
	image: "/images/species/bluegill-sunfish.png",
    latin: "Lepomis macrochirus",
    category: "panfish",
	regionIds: ["tampa", "midwest_pond", "appalachian_creek", "pacific_northwest", "northern_lakes"],
	waterTypeIds: ["pond", "lake", "reservoir", "marsh-wetlands", "canal"],
	gearIds: [],
	techniqueIds: [],
    locations: ["backyard-pond", "edward-medard", "hardee-lakes"],
    unlock_source: "backyard-pond",
    difficulty: "beginner",
    tone: ["calm", "responsive", "accessible"],

    tagline: "Small, quick, and often the first fish to teach patience.",
    intro:
      "A bluegill may be small, but it teaches some of the most important lessons in fishing: where to look, how to wait, and how to notice the little movements near the bank.",

    description:
      "A small but responsive fish often found near shoreline cover, especially in calm and shallow water.",

    stats: [
      { label: "Habitat", value: "Shallow cover" },
      { label: "Method", value: "Bobber + bait" },
      { label: "Temperament", value: "Quick bite" }
    ],

    whereTheyHide:
      "Bluegill often gather near shoreline grass, shady edges, and simple cover where they can feed without spending too much energy.",

    bestTime:
      "They can bite throughout the day, but calmer mornings and evenings often make their movement easier to notice.",

    scooterTips: [
      "Watch the edge first. Bluegill don’t always sit far out.",
      "If the bobber twitches, don’t rush. Let the fish commit."
    ],

    whatItFeelsLike:
      "Bluegill feel like first proof that the water is alive and paying attention back.",

    papaLine:
      "Don’t measure a fish by size alone. Some of the smallest ones teach the biggest lessons.",

    tags: ["shoreline", "panfish", "beginner", "bobber"],

    field_guide: {
      habitat: "Shallow water near vegetation and cover",
      technique: "Bobber and worm or small bait",
      behavior: "Quick bites, often in groups"
    }
  },

  {
    id: "largemouth-bass",
    slug: "largemouth-bass",
    name: "Largemouth Bass",
	image: "/images/species/florida-largemouth-bass.png",
    latin: "Micropterus salmoides",
    category: "bass",
	regionIds: ["tampa", "midwest_pond", "appalachian_creek", "pacific_northwest", "northern_lakes"],
	waterTypeIds: ["pond", "lake", "reservoir", "marsh-wetlands", "canal"],
	gearIds: [],
	techniqueIds: [],
    locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
    unlock_source: "hillsborough-river",
    difficulty: "intermediate",
    tone: ["predatory", "selective", "pattern-based"],

    tagline: "A patient predator that rewards precision, rhythm, and reading structure.",
    intro:
      "Largemouth bass are not usually found by accident for long. They reward careful casting, good positioning, and learning how cover, shade, and structure work together.",

    description:
      "A larger predator that prefers structure, shade, and ambush points.",

    stats: [
      { label: "Habitat", value: "Structure + cover" },
      { label: "Method", value: "Soft plastics" },
      { label: "Temperament", value: "Ambush" }
    ],

    whereTheyHide:
      "Bass hold near roots, ledges, grass lines, timber, and current breaks where they can wait for food to come close.",

    bestTime:
      "Low-light periods and shaded structure are often productive, especially when the water feels still or the current creates a calm pocket.",

    scooterTips: [
      "Don’t throw into empty water if the structure is right beside it.",
      "Work the lure slow enough to give the fish a reason to commit."
    ],

    whatItFeelsLike:
      "A bass feels like a decision the water makes after you’ve shown enough patience.",

    papaLine:
      "The bass isn’t always where you want him. He’s where the water makes sense.",

    tags: ["bass", "structure", "cover", "ambush"],

    field_guide: {
      habitat: "Structure, cover, and current breaks",
      technique: "Soft plastics, slow retrieval",
      behavior: "Ambush predator, reacts to movement"
    }
  },
  {
  id: "redear-sunfish",
  slug: "redear-sunfish",
  name: "Redear Sunfish",
  image: "/images/species/redear-sunfish.png",
  latin: "Lepomis microlophus",
  category: "panfish",
	regionIds: ["tampa"],
	waterTypeIds: ["pond", "lake", "reservoir"],
	gearIds: [],
	techniqueIds: [],
  locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
  unlock_source: "edward-medard",
  difficulty: "beginner",
  tone: ["patient", "subtle", "grounded"],

  tagline: "A quiet bottom feeder that rewards patience and subtle observation.",
  intro:
    "Redear move differently than bluegill. They stay lower, closer to the bottom, and often go unnoticed by those focused only on the surface.",

  description:
    "A bottom-oriented sunfish that prefers slower presentations and subtle structure like sand patches and shell beds.",

  stats: [
    { label: "Habitat", value: "Bottom structure" },
    { label: "Method", value: "Light bait" },
    { label: "Temperament", value: "Subtle bite" }
  ],

  whereTheyHide:
    "Redear tend to stay near sandy bottoms, shell beds, and quieter areas where movement is less obvious.",

  bestTime:
    "They can be caught throughout the day, but calmer conditions and slower presentations increase your chances.",

  scooterTips: [
    "Slow down more than you think you need to.",
    "If nothing is happening up top, think lower."
  ],

  whatItFeelsLike:
    "Redear feel like a hidden layer of the water revealing itself only when you slow down enough to notice.",

  papaLine:
    "Not everything worth catching shows itself right away. Some fish make you earn the view.",

  tags: ["bottom", "panfish", "subtle", "patient"],

  field_guide: {
    habitat: "Bottom areas with sand or shell",
    technique: "Slow bait presentation",
    behavior: "Subtle bites, less aggressive than bluegill"
  }
},
{
  id: "black-crappie",
  slug: "black-crappie",
  name: "Black Crappie",
  image: "/images/species/black-crappie.png",
  latin: "Pomoxis nigromaculatus",
  category: "panfish",
	regionIds: ["tampa", "midwest_pond", "northern_lakes"],
	waterTypeIds: ["lake", "reservoir", "pond"],
	gearIds: [],
	techniqueIds: [],  
  locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
  unlock_source: "edward-medard",
  difficulty: "intermediate",
  tone: ["timed", "observational", "rhythmic"],

  tagline: "A schooling fish that appears in moments and teaches timing.",
  intro:
    "Crappie are not always there—until they are. They show up in groups, often briefly, and reward those paying attention to timing and depth.",

  description:
    "A schooling fish that suspends near structure and responds to subtle changes in depth and presentation.",

  stats: [
    { label: "Habitat", value: "Suspended near structure" },
    { label: "Method", value: "Small lures" },
    { label: "Temperament", value: "Light strike" }
  ],

  whereTheyHide:
    "Crappie gather near submerged structure, drop-offs, and deeper pockets, often suspended rather than on the bottom.",

  bestTime:
    "Morning and evening tend to be strongest, especially when the water is calm and light is lower.",

  scooterTips: [
    "If you catch one, slow down—there are usually more nearby.",
    "Adjust depth before changing location."
  ],

  whatItFeelsLike:
    "Crappie feel like catching a moment that almost passed you by.",

  papaLine:
    "Some fish don’t stay long. You have to notice when they arrive.",

  tags: ["schooling", "timing", "suspended", "light"],

  field_guide: {
    habitat: "Suspended near structure",
    technique: "Light jigs or small bait",
    behavior: "Schooling, appears in bursts"
  }
},
{
  id: "channel-catfish",
  slug: "channel-catfish",
  name: "Channel Catfish",
  image: "/images/species/channel-catfish.png",
  latin: "Ictalurus punctatus",
  category: "catfish",
	regionIds: ["tampa", "midwest_pond", "northern_lakes"],
	waterTypeIds: ["pond", "lake", "reservoir", "river", "canal"],
	gearIds: [],
	techniqueIds: [],
  locations: ["edward-medard", "hardee-lakes"],
  unlock_source: "hardee-lakes",
  difficulty: "beginner",
  tone: ["patient", "steady", "grounded"],

  tagline: "A patient bottom feeder that responds to scent and stillness.",
  intro:
    "Catfish don’t chase like other fish. They find what they need by sensing the water differently, teaching patience and trust in what you cannot see.",

  description:
    "A bottom-dwelling fish that relies on scent and vibration more than sight.",

  stats: [
    { label: "Habitat", value: "Deep bottom" },
    { label: "Method", value: "Bait + wait" },
    { label: "Temperament", value: "Strong pull" }
  ],

  whereTheyHide:
    "Catfish stay in deeper holes, slower-moving water, and along the bottom where scent can travel naturally.",

  bestTime:
    "Evenings and low-light periods are often best, but they can be found during the day in deeper areas.",

  scooterTips: [
    "Let the bait sit longer than feels comfortable.",
    "Trust scent more than movement."
  ],

  whatItFeelsLike:
    "Catching a catfish feels like the water responding after a long pause.",

  papaLine:
    "Some fish don’t need to see your bait. They just need to find it.",

  tags: ["bottom", "catfish", "patient", "strong"],

  field_guide: {
    habitat: "Deep, slow water",
    technique: "Scented bait, stationary",
    behavior: "Slow-moving, powerful once hooked"
  }
},
{
  id: "warmouth",
  slug: "warmouth",
  name: "Warmouth",
  image: "/images/species/warmouth.png",
  latin: "Lepomis gulosus",
  category: "panfish",
	regionIds: ["tampa", "appalachian_creek"],
	waterTypeIds: ["pond", "marsh-wetlands", "creek"],
	gearIds: [],
	techniqueIds: [],
  locations: ["morris-bridge", "edward-medard"],
  difficulty: "beginner",
  tone: ["hidden", "reactive", "close-range"],

  tagline: "A quiet ambush fish that lives where others overlook.",
  intro:
    "Warmouth don’t always show themselves. They sit close to cover, blending into the edges of structure, waiting for something to come close enough to react.",

  description:
    "A small but aggressive panfish that prefers tight cover and reacts quickly when something enters its space.",

  stats: [
    { label: "Habitat", value: "Heavy cover" },
    { label: "Method", value: "Close cast" },
    { label: "Temperament", value: "Reactive" }
  ],

  whereTheyHide:
    "Warmouth stay near roots, fallen branches, and shaded pockets where they can remain unseen until something moves close.",

  bestTime:
    "They can be caught throughout the day, especially in shaded areas where they feel protected.",

  scooterTips: [
    "Cast closer to cover than feels comfortable.",
    "If the water looks still, look again."
  ],

  whatItFeelsLike:
    "Catching a warmouth feels like discovering something that was there the whole time, just out of sight.",

  papaLine:
    "Not everything in the water is moving. Some things are waiting.",

  tags: ["cover", "hidden", "reactive", "panfish"],

  field_guide: {
    habitat: "Tight cover and shaded pockets",
    technique: "Short, precise casts",
    behavior: "Ambush-style reaction strikes"
  }
},
{
  id: "bowfin",
  slug: "bowfin",
  name: "Bowfin",
  image: "/images/species/bowfin.png",
  latin: "Amia calva",
  category: "predator",
	regionIds: ["tampa"],
	waterTypeIds: ["marsh-wetlands", "canal", "river"],
	gearIds: [],
	techniqueIds: [],
  locations: ["morris-bridge"],
  difficulty: "intermediate",
  tone: ["wild", "ancient", "powerful"],

  tagline: "An ancient fish that feels like something from another time.",
  intro:
    "Bowfin are different. They move with a kind of quiet confidence, often in still or slow-moving water, and when they strike, it feels sudden and powerful.",

  description:
    "A strong, aggressive fish that thrives in slow, weedy, or murky water and is known for its powerful fight.",

  stats: [
    { label: "Habitat", value: "Slow, weedy water" },
    { label: "Method", value: "Active lure or bait" },
    { label: "Temperament", value: "Aggressive" }
  ],

  whereTheyHide:
    "Bowfin favor thick vegetation, slow-moving water, and murky areas where other fish might avoid.",

  bestTime:
    "They can be active throughout the day, especially in warmer, still conditions.",

  scooterTips: [
    "If the water feels still and heavy, stay longer.",
    "Be ready when it hits—it won’t be subtle."
  ],

  whatItFeelsLike:
    "Hooking a bowfin feels like connecting with something older than the moment you’re in.",

  papaLine:
    "Some fish remind you that the water has been here long before you.",

  tags: ["wild", "powerful", "ancient", "predator"],

  field_guide: {
    habitat: "Weedy, slow-moving water",
    technique: "Lures or bait near vegetation",
    behavior: "Strong strikes and powerful fights"
  }
},
{
  id: "gar",
  slug: "gar",
  name: "Gar",
  image: "/images/species/gar.png",
  latin: "Lepisosteus spp.",
  category: "predator",
	regionIds: ["tampa"],
	waterTypeIds: ["river", "canal", "marsh-wetlands", "lake"],
	gearIds: [],
	techniqueIds: [],
  locations: ["morris-bridge"],
  difficulty: "intermediate",
  tone: ["still", "visual", "ancient"],

  tagline: "A surface hunter that teaches you to notice what is already visible.",
  intro:
    "Gar often reveal themselves before you ever cast. They cruise slowly near the surface, long and deliberate, like something half-hidden from another age.",

  description:
    "A surface-oriented predator often seen in slow water, known for its long shape, sharp snout, and calm but striking presence.",

  stats: [
    { label: "Habitat", value: "Surface + slow water" },
    { label: "Method", value: "Careful presentation" },
    { label: "Temperament", value: "Deliberate" }
  ],

  whereTheyHide:
    "Gar are often found in slower stretches of water, near the surface, where they can cruise calmly and watch what moves beneath them.",

  bestTime:
    "They are often easiest to notice in calmer water and brighter conditions when their bodies or surface movement give them away.",

  scooterTips: [
    "Sometimes the fish shows itself before the cast matters.",
    "Look for shape and motion near the surface, not just splashes."
  ],

  whatItFeelsLike:
    "Seeing a gar feels like noticing an older layer of the river moving right in front of you.",

  papaLine:
    "Some fish don’t hide. They just move slow enough that most folks never really see them.",

  tags: ["surface", "visual", "ancient", "predator"],

  field_guide: {
    habitat: "Slow surface water",
    technique: "Visible target presentation",
    behavior: "Cruises slowly, often seen before hooked"
  }
},
 
  {
  id: "sunshine-bass",
  slug: "sunshine-bass",
  name: "Sunshine Bass",
  image: "/images/species/sunshine-bass.png",
  latin: "Morone chrysops × Morone saxatilis",
  category: "bass",
	regionIds: ["tampa"],
	waterTypeIds: ["reservoir", "lake"],
	gearIds: [],
	techniqueIds: [],
  locations: ["edward-medard", "hardee-lakes"],
  difficulty: "intermediate",
  tone: ["fast", "open-water", "energetic"],

  tagline: "A stocked hybrid that brings sudden energy to open water.",
  intro:
    "Sunshine bass feel different from largemouth. They move with more speed, roam more openly, and bring a sharper, more energetic presence to the water.",

  description:
    "A hybrid bass often found in open water, known for stronger runs, schooling behavior, and sudden bursts of activity.",

  stats: [
    { label: "Habitat", value: "Open water" },
    { label: "Method", value: "Active retrieve" },
    { label: "Temperament", value: "Fast strike" }
  ],

  whereTheyHide:
    "Sunshine bass are more likely to roam than hold tight to cover, often moving through open water or along broader structure changes.",

  bestTime:
    "They can become especially active when feeding windows open suddenly, often during low light or when bait movement increases.",

  scooterTips: [
    "Think bigger water and more movement.",
    "If nothing is happening near the bank, look farther out."
  ],

  whatItFeelsLike:
    "A sunshine bass feels like the water suddenly speeding up all at once.",

  papaLine:
    "Not every bass waits in the weeds. Some of them run the open water like they’ve got somewhere to be.",

  tags: ["open-water", "fast", "schooling", "hybrid"],

  field_guide: {
    habitat: "Open water and broad structure zones",
    technique: "More active retrieve",
    behavior: "Fast-moving, often more energetic than largemouth"
  }
},
  
 {
  id: "rainbow-trout",
  slug: "rainbow-trout",
  name: "Rainbow Trout",
  image: "/images/species/rainbow-trout.png",
  latin: "Oncorhynchus mykiss",
  category: "trout",

  regionIds: ["appalachian_creek", "pacific_northwest"],
  waterTypeIds: ["creek", "river", "tailwater", "lake"],
  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",
  tone: ["clear-water", "alert", "precise"],

  tagline:
    "A current-shaped fish that rewards quiet movement and careful presentation.",

  intro:
    "Rainbow trout live in water that stays cool, oxygen-rich, and alive with movement. They respond less to force and more to rhythm, drift, and subtle mistakes in presentation.",

  description:
    "A fast, attentive trout often found in cool creeks, rivers, tailwaters, and clear lakes with moving or oxygen-rich water.",

  stats: [
    { label: "Habitat", value: "Cool moving water" },
    { label: "Method", value: "Natural drift" },
    { label: "Temperament", value: "Alert strike" }
  ],

  whereTheyHide:
    "Rainbow trout hold near seams, riffles, deeper runs, shaded pools, and oxygen-rich current where food naturally drifts toward them.",

  bestTime:
    "Lower light, cooler water, cloud cover, and calm movement around the bank often improve trout activity.",

  scooterTips: [
    "Approach slower than feels necessary.",
    "Trout notice movement above the water almost as much as movement in it.",
    "Watch the current before choosing where to cast."
  ],

  whatItFeelsLike:
    "A trout feels less like forcing a bite and more like briefly aligning with the rhythm of the current.",

  papaLine:
    "Trout water teaches you to slow down before it teaches you to fish.",

  tags: ["trout", "current", "clear-water", "precision"],

  field_guide: {
    habitat: "Cool creeks, rivers, and tailwaters",
    technique: "Natural drift and subtle presentation",
    behavior: "Alert, current-oriented, sensitive to movement"
  }
},

 {
  id: "brook-trout",
  slug: "brook-trout",
  name: "Brook Trout",
  image: "/images/species/brook-trout.png",
  latin: "Salvelinus fontinalis",
  category: "trout",

  regionIds: ["appalachian_creek", "pacific_northwest"],
  waterTypeIds: ["creek", "river", "tailwater"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["quiet", "sheltered", "cold-water"],

  tagline:
    "A hidden trout of cold creeks, shaded pools, and quiet mountain water.",

  intro:
    "Brook trout often live in smaller, colder water where movement matters less than patience and awareness. They reward careful approach, quiet steps, and attention to the subtle rhythm of the creek.",

  description:
    "A cold-water trout often found in shaded creeks, mountain streams, and smaller moving water with clean flow and cooler temperatures.",

  stats: [
    { label: "Habitat", value: "Cold shaded creeks" },
    { label: "Method", value: "Quiet presentation" },
    { label: "Temperament", value: "Cautious strike" }
  ],

  whereTheyHide:
    "Brook trout hold near undercut banks, shaded pools, fallen timber, deeper pockets, and calmer current seams where colder water gathers.",

  bestTime:
    "Cool mornings, cloudy skies, and lower light often improve brook trout activity, especially in smaller creeks and mountain water.",

  scooterTips: [
    "Approach slower and quieter than feels necessary.",
    "Sometimes the best cast is the one you almost don’t make.",
    "Watch the creek before stepping closer."
  ],

  whatItFeelsLike:
    "A brook trout feels like the creek briefly trusting you enough to reveal what it has been hiding.",

  papaLine:
    "Small mountain water teaches patience different than a lake ever could.",

  tags: ["trout", "creek", "cold-water", "mountain"],

  field_guide: {
    habitat: "Cold creeks and shaded moving water",
    technique: "Quiet casts and subtle drift",
    behavior: "Cautious, current-aware, sensitive to disturbance"
  }
},

{
  id: "smallmouth-bass",
  slug: "smallmouth-bass",
  name: "Smallmouth Bass",
  image: "/images/species/smallmouth-bass.png",
  latin: "Micropterus dolomieu",
  category: "bass",

  regionIds: [
    "appalachian_creek",
    "northern_lakes",
    "pacific_northwest"
  ],

  waterTypeIds: [
    "river",
    "creek",
    "lake",
    "tailwater"
  ],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["current-aware", "aggressive", "rock-oriented"],

  tagline:
    "A river-shaped bass that rewards movement, structure awareness, and reading current.",

  intro:
    "Smallmouth bass live differently than largemouth. They relate closely to current, rock structure, depth transitions, and moving water that carries food naturally through the system.",

  description:
    "A strong and aggressive bass often found near rock, current seams, deeper runs, and moving water with oxygen and structure.",

  stats: [
    { label: "Habitat", value: "Rock + moving water" },
    { label: "Method", value: "Active retrieve" },
    { label: "Temperament", value: "Aggressive strike" }
  ],

  whereTheyHide:
    "Smallmouth hold near rock piles, current seams, ledges, deeper pools, fallen timber, and transitions where moving water slows slightly.",

  bestTime:
    "Lower light, moving water, current changes, and overcast conditions often improve smallmouth activity.",

  scooterTips: [
    "Watch the current before you choose where to cast.",
    "Rock transitions usually matter more than open water.",
    "Moving water creates feeding lanes."
  ],

  whatItFeelsLike:
    "A smallmouth feels like the river suddenly deciding to push back.",

  papaLine:
    "River bass don’t wait the same way pond bass do. Current changes everything.",

  tags: ["bass", "river", "current", "rock"],

  field_guide: {
    habitat: "Rocky rivers, creeks, and moving water",
    technique: "Current-aware retrieves and structure casting",
    behavior: "Aggressive, current-oriented predator"
  }
},
  
 {
  id: "yellow-perch",
  slug: "yellow-perch",
  name: "Yellow Perch",
  image: "/images/species/yellow-perch.png",
  latin: "Perca flavescens",
  category: "panfish",

  regionIds: ["northern_lakes", "midwest_pond", "pacific_northwest"],
  waterTypeIds: ["pond", "lake", "reservoir"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "beginner",

  tone: ["schooling", "steady", "cool-water"],

  tagline:
    "A schooling fish of cooler lakes and ponds that teaches patience, depth, and small repeated bites.",

  intro:
    "Yellow perch often move in groups, feeding in patterns that reward quiet attention. They may not announce themselves loudly, but when you find one, there are often others nearby.",

  description:
    "A cool-water panfish often found in lakes, ponds, and reservoirs, especially near vegetation, drop-offs, and softer bottom transitions.",

  stats: [
    { label: "Habitat", value: "Cool lakes + ponds" },
    { label: "Method", value: "Small bait or jigs" },
    { label: "Temperament", value: "Schooling bite" }
  ],

  whereTheyHide:
    "Yellow perch often gather near weed edges, drop-offs, soft bottom transitions, and calmer areas where small food collects.",

  bestTime:
    "Morning, evening, and cooler conditions can be productive, especially when perch are gathered in feeding groups.",

  scooterTips: [
    "If you catch one perch, slow down and stay put for a few casts.",
    "Small hooks and small baits matter more than big presentations.",
    "Depth changes can matter more than distance."
  ],

  whatItFeelsLike:
    "Yellow perch feel like finding a little rhythm in the water and realizing more are moving beneath it.",

  papaLine:
    "Some fish teach you to keep listening after the first answer.",

  tags: ["panfish", "schooling", "cool-water", "lake"],

  field_guide: {
    habitat: "Cool ponds, lakes, reservoirs, and weed edges",
    technique: "Small bait, light jigs, and patient depth control",
    behavior: "Schooling fish that often feed in groups"
  }
} 
  
];