// ── GEAR ──────────────────────────────────────────────────────
export const GEAR = [
  {
    id: "spinning-reel",
    name: "Spinning Reel",
	regionIds: [],
	waterTypeIds: [],
	speciesIds: [],
	techniqueIds: [],
    tagline: "The best place to start.",
    alwaysUnlocked: true,
    icon: "🎣",
    intro: "The spinning reel is the first reel most anglers ever use — and a lot of great fishermen never switch away from it. It's forgiving, it's versatile, and it works for nearly every situation Grant will encounter.",
    stats: [
      { label: "Best for", value: "Beginners & finesse" },
      { label: "Used with", value: "Light to medium tackle" },
      { label: "In Grant's kit", value: "Yes" },
    ],
    howItWorks: "The line sits on a fixed spool and wraps around it as you reel. Open the bail to cast, close it when the lure lands. That's the whole thing. Simple to learn, easy to manage.",
    tags: ["Beginner-friendly", "Versatile", "Light lures", "Live bait"],
    scooterTips: [
      "Open the bail, hold the line with your finger, cast, and let go at the right moment — that's it. The spinning reel is as simple as fishing gets. It'll handle worms, small jigs, bobbers, whatever you're throwing at the backyard pond.",
      "One thing to watch: don't reel while the drag is slipping — it twists the line. If a fish is running, let the drag do its job. Reel when you have control.",
    ],
    papaLine: "Every fisherman starts with a spinning reel. Most good ones keep one nearby for the rest of their lives.",
    color: "#185FA5",
  },
  {
  id: "ultralight-spinning-rod",

  name: "Ultralight Spinning Rod",
  regionIds: [
    "tampa",
    "midwest_pond",
    "appalachian_creek",
    "pacific_northwest",
    "northern_lakes"
  ],

  waterTypeIds: [
    "pond",
    "lake",
    "creek",
    "river"
  ],

  speciesIds: [
    "bluegill",
    "yellow-perch",
    "brook-trout",
    "rainbow-trout"
  ],

  techniqueIds: [
    "reading-the-water",
    "the-art-of-the-cast"
  ],
    tagline: "Feel everything.",
    alwaysUnlocked: true,
    icon: "🎋",
    intro: "An ultralight rod is built for sensitivity — it bends easily and lets you feel every tiny tap on the line. Perfect for the backyard pond where the fish are smaller and the presentations need to be subtle.",
    stats: [
      { label: "Best for", value: "Bluegill, small fish" },
      { label: "Action", value: "Light, flexible tip" },
      { label: "Ideal waters", value: "Ponds, creeks, calm shorelines" },
    ],
    howItWorks: "The rod loads — bends under weight — when you cast, then springs forward to send the lure. The lighter the rod, the more you feel in your hand. On an ultralight, a Bluegill feels like a bigger fight than it really is.",
    tags: ["Sensitive", "Light lures", "Small species", "Pond fishing"],
    scooterTips: [
      "Don't force it. Ultralight rods do the work when you let them flex. If you're muscling the cast, you're fighting the rod. Relax your grip, load it up, and let it go.",
      "Great for the backyard pond with a small hook, split shot, and a worm. You'll feel the Bluegill before you even see the bobber move.",
    ],
    papaLine: "The light rod teaches you to pay attention. You can't miss a bite when you can feel everything.",
    color: "#185FA5",
  },
  {
  id: "soft-plastic-worm",
  
  name: "Soft Plastic Worm",

  regionIds: [
    "tampa",
    "midwest_pond",
    "appalachian_creek",
    "northern_lakes"
  ],

  waterTypeIds: [
    "pond",
    "lake",
    "river",
    "reservoir"
  ],

  speciesIds: [
    "largemouth-bass",
    "smallmouth-bass"
  ],

  techniqueIds: [
    "reading-structure",
    "setting-the-hook"
  ],
    tagline: "The Largemouth's weakness.",
    alwaysUnlocked: true,
    icon: "🪱",
    intro: "If there's one lure that catches more Largemouth Bass than any other, it's the soft plastic worm. It moves like something real, it sinks slow, and it sits right near the bottom where bass are waiting. This is what you'll use on the Hillsborough River.",
    stats: [
      { label: "Best for", value: "Largemouth Bass" },
      { label: "Rig", value: "Texas rig, Carolina rig" },
      { label: "Speed", value: "Slow — very slow" },
    ],
    howItWorks: "Thread the worm onto the hook (Texas rig: tuck the point back in so it doesn't snag), add a bullet weight above the knot, and cast near structure. Then drag it slow — twitch, pause, twitch, pause. The bass can't resist something that looks injured.",
    tags: ["Largemouth Bass", "Bottom fishing", "Near structure", "Texas rig"],
    scooterTips: [
      "Slow is the whole game with plastic worms. Most beginners retrieve too fast. Cast it out, let it sink all the way to the bottom, and then barely move it. Twitch. Pause. Wait. The bass will find it.",
      "When you feel a tap, don't set the hook immediately — wait a half second for the fish to take it. Then sweep the rod sideways and reel. That's the Texas rig hookset.",
    ],
    papaLine: "The worm works because it doesn't rush. Neither should the fisherman holding it.",
    color: "#BA7517",
  },
  {
    id: "topwater-frog",
    name: "Topwater Frog",
	regionIds: [],
	waterTypeIds: [],
	speciesIds: [],
	techniqueIds: [],
    tagline: "The most exciting bite in fishing.",
    alwaysUnlocked: true,
    icon: "🐸",
    intro: "A topwater frog skims across lily pads and weeds without snagging, and when a bass explodes on it from below — you'll never forget it. This is the lure for early mornings on calm water.",
    stats: [
      { label: "Best for", value: "Largemouth Bass" },
      { label: "Conditions", value: "Calm mornings, lily pads" },
      { label: "Difficulty", value: "Patience required" },
    ],
    howItWorks: "Cast the frog into or over weeds, then twitch it slowly — pause, twitch, pause. It looks like a real frog sitting on the surface. When a bass hits, wait a full second before you set the hook. That's the hardest part.",
    tags: ["Surface strike", "Lily pads", "Weedless", "Early morning"],
    scooterTips: [
      "The topwater frog is all about timing. When you see the explosion, your instinct is to yank immediately — but don't. Wait. Count to one. Feel the weight. Then set the hook hard. Most missed strikes are from setting too early.",
      "Work it slow across the top of the pads. Cast into the thickest cover you can find — that's where the bass are hiding underneath.",
    ],
    papaLine: "Some moments ask you to wait just a little longer than feels natural. That's where the good things are.",
    color: "#0F6E56",
  },
  {
    id: "spinnerbait",
    name: "Spinnerbait",
	regionIds: [],
	waterTypeIds: [],
	speciesIds: [],
	techniqueIds: [],
    tagline: "Flash and vibration.",
    alwaysUnlocked: true,
    icon: "✨",
    intro: "A spinnerbait has a metal blade that spins as it moves through the water, creating flash and vibration that triggers a bass's instinct to strike. It's great for covering a lot of water quickly.",
    stats: [
      { label: "Best for", value: "Bass, murky water" },
      { label: "Retrieve", value: "Steady or burn-and-pause" },
      { label: "Conditions", value: "Stained or windy water" },
    ],
    howItWorks: "Cast it out and reel at a steady pace — the blade spins automatically. You can also burn it fast and then let it fall, which triggers reaction strikes. Works best when the water isn't crystal clear.",
    tags: ["Fast retrieve", "Vibration", "Murky water", "Weed lines"],
    scooterTips: [
      "Run it along the edge of a weed line or just above submerged structure. Bass are sitting there waiting for something to swim by. The spinnerbait looks like a small baitfish panicking — exactly what triggers a strike.",
      "Good choice on cloudy days or after a rain when the water's a little off-color. Clear, calm water is where soft plastics beat it.",
    ],
    papaLine: "Sometimes the best way to be noticed is just to keep moving.",
    color: "#BA7517",
  },
  {
    id: "monofilament-line",
    name: "Monofilament Line",
	regionIds: [],
	waterTypeIds: [],
	speciesIds: [],
	techniqueIds: [],
    tagline: "Forgiving and reliable.",
    alwaysUnlocked: true,
    icon: "〰️",
    intro: "Monofilament is the classic fishing line — affordable, easy to use, and forgiving. It stretches a little, which actually helps beginners because it absorbs the shock of a strong hookset or a fish running hard.",
    stats: [
      { label: "Best for", value: "Beginners, topwater" },
      { label: "Stretch", value: "Yes — shock absorbing" },
      { label: "Visibility", value: "Slightly visible" },
    ],
    howItWorks: "Mono floats better than other lines, which makes it great for topwater lures. The stretch means you're less likely to pull the hook out of a fish's mouth on a strong strike. Good all-around choice for the backyard pond.",
    tags: ["Beginner-friendly", "Topwater", "Affordable", "Floats"],
    scooterTips: [
      "Re-spool your mono at least once a season — it gets weaker in sunlight over time. If you see any kinks or discoloration, it's time for fresh line.",
      "Knots are critical with mono. Learn the improved clinch knot and use it every time. A bad knot is how you lose a good fish.",
    ],
    papaLine: "The line that stretches doesn't break as easy. Worth remembering.",
    color: "#185FA5",
  },
];