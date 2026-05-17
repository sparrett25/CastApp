// src/utils/resolveChamberBackground.js

import { DEFAULT_REGION_KEY } from "../data/regionOptions";

const TIME_OFFSET = {
  "blue-hour-dawn": 1,
  "first-light": 2,
  "soft-morning-rise": 3,
  "warm-drift": 4,
  "golden-dusk": 5,
  "quiet-evening-glow": 6,
  "ember-twilight": 7, 
};

const CHAMBER_FOLDER_MAP = {
  intro: "papaintro", 
  papaDock: "papadock",
  home: "home",
  "field-guide": "fieldguide",
  locations: "locations",
  "plan-trip": "plantrip",
  "trip-summary": "plantrip",
  journal: "journal",
  "catch-ledger": "catchledger",
  profile: "profile",
  authpage: "authpage",
};

const FILE_SLUG_MAP = {
  intro: "intro",
  papaDock: "papadock",
  home: "home",
  "field-guide": "fieldguide",
  locations: "locations",
  "plan-trip": "plantrip",
  "trip-summary": "plantrip",
  journal: "journal",
  "catch-ledger": "catchledger",
  profile: "profile",
  authpage: "authpage",
};

export function resolveChamberBackgroundSrc({
  chamberKey,
  timeKey = "blue-hour-dawn",
  regionKey = DEFAULT_REGION_KEY,
}) {
  const base = Number(regionKey);
  const offset = TIME_OFFSET[timeKey] || 1;

  const folderKey = CHAMBER_FOLDER_MAP[chamberKey] || chamberKey;
  const fileSlug = FILE_SLUG_MAP[chamberKey] || chamberKey;

  const imageNumber = base + offset;

  return `/images/chambers/${folderKey}/${regionKey}/${imageNumber}-${fileSlug}-${timeKey}.png`;
}