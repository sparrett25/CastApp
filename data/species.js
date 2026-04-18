export const SPECIES = [
  { id:"bluegill",         icon:"🔆", title:"Bluegill",         sub:"Patience in the shallows. Finesse & observation." },
  { id:"channel_catfish",  icon:"🌑", title:"Channel Catfish",  sub:"Depth dwellers. Scent, stillness, and night water." },
  { id:"largemouth_bass",  icon:"🐟", title:"Largemouth Bass",  sub:"Boldness & timing. Structure, edges, dawn topwater." }
];
export const getSpecies = id => SPECIES.find(s => s.id === id);
