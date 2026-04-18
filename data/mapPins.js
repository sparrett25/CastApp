// /data/mapPins.js
export const PINS = [
  { id: "alafia-river",     name: "Alafia River",     lat: 27.854, lng: -82.379, zoom: 12 },
  { id: "cockroach-bay",    name: "Cockroach Bay",    lat: 27.655, lng: -82.519, zoom: 12 },
  { id: "mirror-lake-pins", name: "Mirror Lake Pins", lat: 27.900, lng: -82.700, zoom: 14 }
];

export function getPin(id) {
  return PINS.find(p => p.id === id);
}
