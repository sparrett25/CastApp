// src/data/regionOptions.js

export const REGION_OPTIONS = {
  "100": {
    key: "100",
    id: "tampa",
    label: "Florida Freshwater",
    description: "Humid lakes, moss, palms, cranes, and reflective stillness.",
  },
  "200": {
    key: "200",
    id: "northern_lakes",
    label: "Northern Lake Country",
    description: "Clear lakes, reeds, pines, cooler evenings, and northern stillness.",
  },
  "300": {
    key: "300",
    id: "midwest_pond",
    label: "Midwest Farm Pond",
    description: "Open fields, cattails, fences, grasses, and rural calm.",
  },
  "400": {
    key: "400",
    id: "appalachian_creek",
    label: "Appalachian Creek",
    description: "Sheltered creeks, wooded banks, mountain shade, and moving water.",
  },
  "500": {
    key: "500",
    id: "pacific_northwest",
    label: "Pacific Northwest",
    description: "Evergreens, mist, cold water, quiet lakes, and deep forest air.",
  },
};

export const DEFAULT_REGION_KEY = "100";

export function getRegionIdFromKey(regionKey) {
  return REGION_OPTIONS[regionKey]?.id || REGION_OPTIONS[DEFAULT_REGION_KEY].id;
}

