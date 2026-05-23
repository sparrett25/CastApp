export const SPECIES = [
  {
    id: "bluegill",
    slug: "bluegill",
    name: "Bluegill",
	image: "/images/species/bluegill.webp",
    latin: "Lepomis macrochirus",
    category: "panfish",
	regionIds: ["tampa", "midwest_pond"],
	waterTypeIds: ["pond", "lake", "reservoir", "marsh-wetlands", "canal"],
	gearIds: [],
	techniqueIds: [],
    locations: ["edward-medard", "backyard-pond", "hardee-lakes"],
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
	image: "/images/species/florida-largemouth-bass.webp",
    latin: "Micropterus salmoides",
    category: "bass",
	regionIds: ["tampa", "midwest_pond"],
	waterTypeIds: ["pond", "lake", "reservoir", "marsh-wetlands", "canal"],
	gearIds: [],
	techniqueIds: [],
    locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
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
  image: "/images/species/redear-sunfish.webp",
  latin: "Lepomis microlophus",
  category: "panfish",
	regionIds: ["tampa"],
	waterTypeIds: ["pond", "lake", "reservoir"],
	gearIds: [],
	techniqueIds: [],
  locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
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
  image: "/images/species/black-crappie.webp",
  latin: "Pomoxis nigromaculatus",
  category: "panfish",
	regionIds: ["tampa", "midwest_pond"],
	waterTypeIds: ["lake", "reservoir", "pond"],
	gearIds: [],
	techniqueIds: [],  
  locations: ["edward-medard", "morris-bridge", "hardee-lakes"],
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
  image: "/images/species/channel-catfish.webp",
  latin: "Ictalurus punctatus",
  category: "catfish",
	regionIds: ["tampa", "midwest_pond"],
	waterTypeIds: ["pond", "lake", "reservoir", "river", "canal"],
	gearIds: [],
	techniqueIds: [],
  locations: ["edward-medard", "hardee-lakes"],
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
  image: "/images/species/warmouth.webp",
  latin: "Lepomis gulosus",
  category: "panfish",
	regionIds: ["tampa"],
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
  image: "/images/species/bowfin.webp",
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
  image: "/images/species/gar.webp",
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
  image: "/images/species/sunshine-bass.webp",
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
  image: "/images/species/rainbow-trout.webp",
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
  image: "/images/species/brook-trout.webp",
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
  image: "/images/species/smallmouth-bass.webp",
  latin: "Micropterus dolomieu",
  category: "bass",

  regionIds: [
    "appalachian_creek",
    "northern_lakes",
    "pacific_northwest"
  ],

  waterTypeIds: [
    "pond",
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
  image: "/images/species/yellow-perch.webp",
  latin: "Perca flavescens",
  category: "panfish",

  regionIds: ["northern_lakes", "midwest_pond"],
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
},

{
  id: "bullhead",
  slug: "bullhead",
  name: "Bullhead",
  image: "/images/species/bullhead.webp",
  latin: "Ameiurus spp.",
  category: "catfish",

  regionIds: ["midwest_pond"],
  waterTypeIds: ["pond", "creek", "river", "reservoir"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "beginner",

  tone: ["patient", "grounded", "night-water"],

  tagline:
    "A hardy bottom fish that teaches patience, scent, and trust in quiet water.",

  intro:
    "Bullhead are often found in slower, muddier water where visibility matters less than scent, stillness, and timing. They reward anglers who are willing to sit longer, fish slower, and trust what they cannot always see.",

  description:
    "A small catfish often found in ponds, slower rivers, and reservoirs, especially near muddy bottoms, structure, and calmer water.",

  stats: [
    { label: "Habitat", value: "Slow bottom water" },
    { label: "Method", value: "Bait + patience" },
    { label: "Temperament", value: "Steady pull" }
  ],

  whereTheyHide:
    "Bullhead often stay near muddy bottoms, deeper pockets, submerged timber, shoreline cover, and calmer stretches where scent can settle naturally through the water.",

  bestTime:
    "Evenings, cloudy conditions, and lower light often improve bullhead activity, especially in still or slow-moving water.",

  scooterTips: [
    "Let the bait rest longer than feels necessary.",
    "Bullhead often find the bait slowly rather than striking quickly.",
    "Quiet water near the bottom usually matters more than casting far."
  ],

  whatItFeelsLike:
    "Bullhead feel like the water answering slowly after you finally stop trying to rush it.",

  papaLine:
    "Some fish teach patience by making you sit still long enough to notice the rest of the pond.",

  tags: ["catfish", "bottom", "patient", "muddy-water"],

  field_guide: {
    habitat: "Muddy ponds, slower rivers, and calm bottom water",
    technique: "Still bait presentation near the bottom",
    behavior: "Slow-moving bottom feeder that follows scent and vibration"
  }
},

{
  id: "walleye",
  slug: "walleye",
  name: "Walleye",
  image: "/images/species/walleye.webp",
  latin: "Sander vitreus",
  category: "predator",

  regionIds: ["northern_lakes"],
  waterTypeIds: ["lake", "river", "reservoir"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["low-light", "deep-water", "deliberate"],

  tagline:
    "A low-light predator that teaches patience, depth, and trust in subtle movement.",

  intro:
    "Walleye are often most active when the light softens and the water quiets. They reward anglers who pay attention to depth, structure, and the slower rhythm of changing evening water.",

  description:
    "A cool-water predator often found near deeper structure, rocky transitions, current seams, and lower-light feeding zones in lakes, rivers, and reservoirs.",

  stats: [
    { label: "Habitat", value: "Deep structure + low light" },
    { label: "Method", value: "Slow presentation" },
    { label: "Temperament", value: "Subtle strike" }
  ],

  whereTheyHide:
    "Walleye often hold near rocky drop-offs, deeper shelves, submerged structure, current seams, and transition zones where light becomes softer and baitfish gather.",

  bestTime:
    "Early morning, evening, overcast skies, and changing light conditions often improve walleye movement and feeding activity.",

  scooterTips: [
    "Slow down your presentation more than feels natural.",
    "Depth changes often matter more than distance.",
    "Pay attention to the edges where brighter water fades into shadow."
  ],

  whatItFeelsLike:
    "A walleye feels like the lake quietly revealing something from deeper water just as the light begins to fade.",

  papaLine:
    "Some fish wait for the world to soften before they start moving.",

  tags: ["predator", "deep-water", "low-light", "structure"],

  field_guide: {
    habitat: "Cool lakes, rivers, reservoirs, and rocky structure zones",
    technique: "Slow presentations near depth transitions and low-light areas",
    behavior: "Low-light predator that relates closely to structure and depth"
  }
},

{
  id: "northern-pike",
  slug: "northern-pike",
  name: "Northern Pike",
  image: "/images/species/northern-pike.webp",
  latin: "Esox lucius",
  category: "predator",

  regionIds: ["northern_lakes"],
  waterTypeIds: ["pond", "lake", "river", "reservoir", "marsh-wetlands"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["ambush", "stillness", "explosive"],

  tagline:
    "A quiet northern predator that waits motionless until the water suddenly erupts.",

  intro:
    "Northern pike often hold near weeds, reeds, structure, and calm edges where they can remain almost perfectly still before striking with sudden force. They reward patience, observation, and attention to quiet cover.",

  description:
    "A cold-water predator often found near vegetation, weed lines, reeds, shallow structure, and slower edges of lakes, rivers, reservoirs, and northern marsh water.",

  stats: [
    { label: "Habitat", value: "Weeds + ambush cover" },
    { label: "Method", value: "Steady retrieve" },
    { label: "Temperament", value: "Explosive strike" }
  ],

  whereTheyHide:
    "Northern pike often remain near weed edges, reeds, submerged vegetation, fallen timber, and calmer structure where baitfish move close enough for sudden ambush strikes.",

  bestTime:
    "Cool mornings, cloudy conditions, and lower light often improve pike activity, especially near vegetation and shoreline transitions.",

  scooterTips: [
    "Watch the edges where weeds meet open water.",
    "Pike often strike after long moments of stillness.",
    "Steady movement usually works better than rushing the retrieve."
  ],

  whatItFeelsLike:
    "A northern pike feels like the quiet edge of the lake suddenly deciding to move.",

  papaLine:
    "Some predators don’t chase the water. They become part of it until the right moment arrives.",

  tags: ["predator", "weed-edge", "ambush", "northern-water"],

  field_guide: {
    habitat: "Weed lines, reeds, vegetation, and quiet northern structure",
    technique: "Steady retrieves near cover and vegetation edges",
    behavior: "Ambush predator that strikes suddenly from stillness"
  }
},

{
  id: "brown-trout",
  slug: "brown-trout",
  name: "Brown Trout",
  image: "/images/species/brown-trout.webp",
  latin: "Salmo trutta",
  category: "trout",

  regionIds: ["northern_lakes"],
  waterTypeIds: ["creek", "river", "tailwater", "lake"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["cautious", "low-light", "deep-current"],

  tagline:
    "A cautious trout of deeper runs and fading light that rewards patience, subtlety, and quiet movement.",

  intro:
    "Brown trout often hold in deeper current, shaded structure, and quieter seams where the water feels older and slower. They reward anglers who move carefully, fish patiently, and trust subtle presentations over force.",

  description:
    "A cold-water trout often found in rivers, creeks, lakes, and tailwaters with deeper structure, current seams, shaded banks, and cooler water.",

  stats: [
    { label: "Habitat", value: "Deep current + structure" },
    { label: "Method", value: "Subtle presentation" },
    { label: "Temperament", value: "Cautious strike" }
  ],

  whereTheyHide:
    "Brown trout often hold near undercut banks, deeper runs, fallen timber, rocky structure, shaded seams, and calmer pockets beside stronger current.",

  bestTime:
    "Evening, dawn, cloud cover, and softer low-light periods often improve brown trout activity, especially when the water feels calm and quiet.",

  scooterTips: [
    "Approach slower than feels necessary.",
    "The best water is often the seam beside stronger current.",
    "Brown trout usually reward precision more than distance."
  ],

  whatItFeelsLike:
    "A brown trout feels like the river quietly revealing something old and careful beneath the current.",

  papaLine:
    "Some fish teach you that silence and patience are part of the presentation too.",

  tags: ["trout", "low-light", "current", "structure"],

  field_guide: {
    habitat: "Cool rivers, tailwaters, deeper seams, and shaded structure",
    technique: "Subtle drifts and careful current presentation",
    behavior: "Cautious trout that favors depth, cover, and lower light"
  }
},

{
  id: "muskie",
  slug: "muskie",
  name: "Muskie",
  image: "/images/species/muskie.webp",
  latin: "Esox masquinongy",
  category: "predator",

  regionIds: ["northern_lakes"],
  waterTypeIds: ["lake", "river", "reservoir"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "advanced",

  tone: ["mythic", "patient", "elusive"],

  tagline:
    "A legendary northern predator that rewards patience, persistence, and respect for quiet water.",

  intro:
    "Muskie are rarely rushed. They move through larger northern water with long periods of silence between moments of sudden presence. More than most fish, they teach patience, humility, and the understanding that some encounters cannot be forced.",

  description:
    "A large apex predator often found in northern lakes, rivers, and reservoirs near weed edges, structure, deeper transition zones, and quieter ambush water.",

  stats: [
    { label: "Habitat", value: "Large structured water" },
    { label: "Method", value: "Persistent casting" },
    { label: "Temperament", value: "Elusive strike" }
  ],

  whereTheyHide:
    "Muskie often move near weed lines, deeper transition zones, rocky points, submerged timber, and broad northern structure where baitfish movement naturally gathers.",

  bestTime:
    "Low-light periods, changing weather, cloudy conditions, and calm northern evenings often create the strongest muskie movement.",

  scooterTips: [
    "Fish slowly enough to notice the water changing around you.",
    "Persistence matters more than rushing.",
    "Some days the lesson is simply learning how to stay patient."
  ],

  whatItFeelsLike:
    "A muskie feels less like catching a fish and more like briefly crossing paths with something the lake almost decided not to reveal.",

  papaLine:
    "Some fish aren’t meant to be conquered. They’re meant to remind you how deep the water really is.",

  tags: ["predator", "northern-water", "legendary", "patient"],

  field_guide: {
    habitat: "Large northern lakes, rivers, structure zones, and weed transitions",
    technique: "Persistent casting near structure and transition water",
    behavior: "Elusive apex predator known for rare but memorable encounters"
  }
},

{
  id: "salmon",
  slug: "salmon",
  name: "Salmon",
  image: "/images/species/salmon.webp",
  latin: "Oncorhynchus spp.",
  category: "migratory",

  regionIds: ["pacific_northwest"],
  waterTypeIds: ["creek", "river", "tailwater", "lake"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["migratory", "ancestral", "current-driven"],

  tagline:
    "A migratory fish shaped by current, distance, and the instinct to return upstream.",

  intro:
    "Salmon move through rivers with purpose. They follow cold current, changing seasons, and pathways older than memory itself, teaching patience, timing, and respect for moving water.",

  description:
    "A migratory fish often found in rivers, creeks, tailwaters, and connected northern waters where current, seasonal movement, and colder flow shape behavior.",

  stats: [
    { label: "Habitat", value: "Cold moving water" },
    { label: "Method", value: "Current presentation" },
    { label: "Temperament", value: "Powerful run" }
  ],

  whereTheyHide:
    "Salmon often move through deeper runs, current seams, river channels, gravel stretches, and colder flowing water connected to seasonal migration paths.",

  bestTime:
    "Seasonal movement, cooler water, overcast skies, and active river flow often create the strongest salmon activity.",

  scooterTips: [
    "Watch the current before choosing where to stand.",
    "Moving water matters more than casting distance.",
    "Some days are more about timing than technique."
  ],

  whatItFeelsLike:
    "A salmon feels like briefly touching something ancient that was already moving long before you arrived.",

  papaLine:
    "Some fish aren’t just living in the river. They’re returning to it.",

  tags: ["migratory", "river", "current", "pacific-northwest"],

  field_guide: {
    habitat: "Cold rivers, creeks, tailwaters, and connected migratory water",
    technique: "Current-aware presentations and reading river movement",
    behavior: "Migratory fish strongly influenced by seasonal flow and current"
  }
},

{
  id: "steelhead",
  slug: "steelhead",
  name: "Steelhead",
  image: "/images/species/steelhead.webp",
  latin: "Oncorhynchus mykiss",
  category: "migratory",

  regionIds: ["pacific_northwest"],
  waterTypeIds: ["creek", "river", "tailwater"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "advanced",

  tone: ["migratory", "cold-current", "relentless"],

  tagline:
    "A migratory rainbow trout shaped by cold rivers, long movement, and relentless current.",

  intro:
    "Steelhead move through rivers with incredible endurance, following cold current and seasonal pathways that can stretch for immense distances. They reward patience, precision, and respect for moving water.",

  description:
    "A migratory form of rainbow trout often found in cold rivers, creeks, and tailwaters where current, seasonal movement, and oxygen-rich flow shape behavior.",

  stats: [
    { label: "Habitat", value: "Cold moving current" },
    { label: "Method", value: "Precise drift" },
    { label: "Temperament", value: "Powerful run" }
  ],

  whereTheyHide:
    "Steelhead often hold near deeper seams, cold runs, softer current pockets, gravel transitions, and structure that breaks heavy river flow.",

  bestTime:
    "Cool conditions, seasonal runs, cloudy skies, and stronger river movement often improve steelhead activity.",

  scooterTips: [
    "Current seams matter more than distance.",
    "Steelhead reward patience more than constant movement.",
    "Sometimes the river teaches more than the fish does."
  ],

  whatItFeelsLike:
    "A steelhead feels like trying to hold onto something built entirely from current and momentum.",

  papaLine:
    "Some fish spend their whole lives learning how to return against the current.",

  tags: ["steelhead", "migratory", "river", "cold-current"],

  field_guide: {
    habitat: "Cold rivers, creeks, and tailwaters with strong current",
    technique: "Precise drifts and current-aware presentations",
    behavior: "Migratory trout known for endurance, movement, and powerful runs"
  }
},

{
  id: "cutthroat-trout",
  slug: "cutthroat-trout",
  name: "Cutthroat Trout",
  image: "/images/species/cutthroat-trout.webp",
  latin: "Oncorhynchus clarkii",
  category: "trout",

  regionIds: ["pacific_northwest"],
  waterTypeIds: ["pond", "lake", "creek", "river", "tailwater"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["wild", "clear-water", "wilderness-edge"],

  tagline:
    "A wild trout of clear water, quiet edges, and cold places that still feel untouched.",

  intro:
    "Cutthroat trout often feel closely tied to place. They belong to clear creeks, forest lakes, cold seams, and quiet water where careful movement matters more than force.",

  description:
    "A cold-water trout often found in clear creeks, rivers, lakes, tailwaters, and sheltered forest water where clean flow, shade, and subtle presentation matter.",

  stats: [
    { label: "Habitat", value: "Clear cold water" },
    { label: "Method", value: "Light presentation" },
    { label: "Temperament", value: "Careful strike" }
  ],

  whereTheyHide:
    "Cutthroat trout often hold near shaded banks, cold seams, deeper pools, submerged cover, lake edges, and quiet pockets where clear water gives them both safety and feeding opportunities.",

  bestTime:
    "Cool mornings, cloudy skies, shaded water, and calmer low-light periods often improve cutthroat activity, especially in clear water.",

  scooterTips: [
    "Move quietly before you worry about casting far.",
    "Clear water means the fish can see more than you think.",
    "Small presentations often feel more natural in wild water."
  ],

  whatItFeelsLike:
    "A cutthroat trout feels like the forest letting you notice one quiet secret beneath the surface.",

  papaLine:
    "Some fish don’t belong to the map as much as they belong to the place itself.",

  tags: ["trout", "clear-water", "wild", "pacific-northwest"],

  field_guide: {
    habitat: "Clear creeks, rivers, lakes, tailwaters, and shaded cold water",
    technique: "Light presentations, quiet approach, and careful current awareness",
    behavior: "Wild trout that favors clean water, shade, and subtle movement"
  }
},

{
  id: "creek-chub",
  slug: "creek-chub",
  name: "Creek Chub",
  image: "/images/species/creek-chub.webp",
  latin: "Semotilus atromaculatus",
  category: "minnow",

  regionIds: ["appalachian_creek"],
  waterTypeIds: ["creek", "river"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "beginner",

  tone: ["small-water", "curious", "overlooked"],

  tagline:
    "A small creek fish that teaches curiosity, quiet observation, and attention to overlooked water.",

  intro:
    "Creek chub live in the smaller rhythms of moving water: shallow runs, rocky bends, shaded pools, and quiet current seams where life often goes unnoticed unless you slow down enough to look.",

  description:
    "A small freshwater fish commonly found in creeks and smaller rivers with rocky bottoms, current breaks, shallow pools, and shaded moving water.",

  stats: [
    { label: "Habitat", value: "Small moving water" },
    { label: "Method", value: "Light bait or observation" },
    { label: "Temperament", value: "Quick movement" }
  ],

  whereTheyHide:
    "Creek chub often gather near shallow pools, rocky seams, undercut banks, calmer current pockets, and smaller areas where food drifts naturally through the creek.",

  bestTime:
    "Warm afternoons, calmer creek flow, and shaded water often make creek chub easier to notice near the surface and along rocky edges.",

  scooterTips: [
    "Small fish still teach important lessons about water.",
    "Watch the current before worrying about catching something big.",
    "Sometimes noticing movement is more important than making a cast."
  ],

  whatItFeelsLike:
    "Creek chub feel like discovering that even the smallest parts of the creek are already alive with motion and attention.",

  papaLine:
    "Not every fish is there to impress you. Some are there to teach you how to notice.",

  tags: ["creek", "small-water", "native", "observation"],

  field_guide: {
    habitat: "Rocky creeks, shallow pools, and smaller moving water",
    technique: "Light tackle, observation, and subtle presentation",
    behavior: "Small active fish often found in groups near current seams"
  }
},

{
  id: "rock-bass",
  slug: "rock-bass",
  name: "Rock Bass",
  image: "/images/species/rock-bass.webp",
  latin: "Ambloplites rupestris",
  category: "panfish",

  regionIds: ["appalachian_creek"],
  waterTypeIds: ["creek", "river", "lake"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "beginner",

  tone: ["rocky-water", "steady", "hidden-cover"],

  tagline:
    "A creek and river fish that rewards quiet casts near rock, shade, and slower current pockets.",

  intro:
    "Rock bass often live close to structure: rocky seams, shaded banks, submerged timber, and calmer pockets beside moving water. They teach anglers to notice smaller holding areas that other fish often overlook.",

  description:
    "A hardy freshwater fish commonly found in creeks, rivers, and lakes near rock structure, current breaks, timber, and shaded cover.",

  stats: [
    { label: "Habitat", value: "Rock + shaded cover" },
    { label: "Method", value: "Light tackle" },
    { label: "Temperament", value: "Steady strike" }
  ],

  whereTheyHide:
    "Rock bass often hold near rock piles, submerged timber, undercut banks, calmer current seams, bridge shadows, and deeper pockets beside moving water.",

  bestTime:
    "Evenings, shaded water, and calmer current periods often improve rock bass activity, especially near structure.",

  scooterTips: [
    "Cast beside the rock, not just near it.",
    "Shade lines and slower seams usually matter more than open current.",
    "Small pockets of calm water often hold more life than they appear to."
  ],

  whatItFeelsLike:
    "A rock bass feels like discovering that the quiet corners of the creek were holding life the entire time.",

  papaLine:
    "The creek usually hides its lessons beside the rocks, not out in the middle of the current.",

  tags: ["creek", "rock-structure", "shade", "appalachia"],

  field_guide: {
    habitat: "Rocky creeks, rivers, shaded seams, and submerged structure",
    technique: "Light casts near rock and calmer current pockets",
    behavior: "Structure-oriented fish that relates closely to cover and slower seams"
  }
},

{
  id: "redeye-bass",
  slug: "redeye-bass",
  name: "Redeye Bass",
  image: "/images/species/redeye-bass.webp",
  latin: "Micropterus coosae",
  category: "bass",

  regionIds: ["appalachian_creek"],
  waterTypeIds: ["creek", "river"],

  gearIds: [],
  techniqueIds: [],

  locations: [],
  difficulty: "intermediate",

  tone: ["mountain-water", "wild", "current-aware"],

  tagline:
    "A mountain bass of rocky current and hidden southern creeks that rewards quiet movement and careful observation.",

  intro:
    "Redeye bass live in smaller Appalachian rivers and creeks where current, rock structure, and shaded water shape their behavior. They reward anglers who move carefully and pay attention to the subtle rhythm of mountain current.",

  description:
    "A native southern bass often found in rocky Appalachian creeks and rivers with clear current, shaded banks, deeper runs, and moving water.",

  stats: [
    { label: "Habitat", value: "Rocky mountain current" },
    { label: "Method", value: "Light current casting" },
    { label: "Temperament", value: "Aggressive strike" }
  ],

  whereTheyHide:
    "Redeye bass often hold near rock seams, current breaks, deeper creek runs, fallen timber, shaded bends, and calmer pockets beside moving water.",

  bestTime:
    "Cool mornings, shaded water, overcast conditions, and active creek current often improve redeye bass movement and feeding activity.",

  scooterTips: [
    "Watch the current before choosing where to cast.",
    "Mountain fish often hold closer to structure than you expect.",
    "Quiet movement along the bank matters as much as the retrieve."
  ],

  whatItFeelsLike:
    "A redeye bass feels like the mountain creek suddenly pushing back with more life than the water first revealed.",

  papaLine:
    "Mountain water teaches you that small rivers can still carry strong fish and old stories.",

  tags: ["bass", "mountain-creek", "current", "appalachia"],

  field_guide: {
    habitat: "Rocky Appalachian creeks, rivers, and shaded moving water",
    technique: "Current-aware casts near rock seams and structure",
    behavior: "Aggressive native bass closely tied to mountain current"
  }
}
  
];