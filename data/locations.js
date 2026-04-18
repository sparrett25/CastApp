export const LOCATIONS = [
  { id:"alafia-river",      icon:"🏞️", title:"Alafia River",      sub:"Tannin lines, creek mouths, inside bends at moving water." },
  { id:"cockroach-bay",     icon:"🏝️", title:"Cockroach Bay",     sub:"Grass-flat edges, mullet activity, wind-ward points." },
  { id:"mirror-lake-pins",  icon:"📍", title:"Mirror Lake Pins",  sub:"Your saved spots; return with new wind and new eyes." }
];
export const getLocation = id => LOCATIONS.find(l => l.id === id);
