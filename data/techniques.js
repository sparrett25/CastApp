export const TECHNIQUES = [
  { id:"drop-shot",      icon:"🎯", title:"Drop Shot",                  sub:"Suspend finesse. Minimal rod tip, let it breathe." },
  { id:"jigging",        icon:"🧲", title:"Jigging",                    sub:"Bottom feel. Count the fall; read bottom with line." },
  { id:"spinnerbait-ret",icon:"🌀", title:"Spinnerbait Retrieve",       sub:"Flash + thump. Slow-roll in stain, burn in wind." },
  { id:"texas-rig",      icon:"🪱", title:"Texas Rig",                  sub:"Weedless control. Drag, hop, pause along edges." },
  { id:"skip-docks",     icon:"🛶", title:"Skipping Docks",             sub:"Low entry, flat trajectory. Quiet is everything." },
  { id:"topwater-walk",  icon:"💧", title:"Topwater • Walk-the-Dog",    sub:"Surface cadence. Slack line creates the walk." }
];
export const getTechnique = id => TECHNIQUES.find(t => t.id === id);
