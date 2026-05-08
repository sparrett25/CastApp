// src/utils/resolveChamberBackground.js

import { DEFAULT_REGION_KEY } from "../data/regionOptions";

const TIME_OFFSET = {
  "blue-hour-dawn": 1,
  "soft-morning-rise": 2,
  "late-afternoon-warmth": 3,
  "golden-dusk": 4,
  "quiet-evening-glow": 5,
};

const CHAMBER_FOLDER_MAP = {
  intro: "papa",
  papaDock: "papa",
  home: "home",
  "field-guide": "fieldguide",
  locations: "locations",
  "plan-trip": "plantrip",
  "trip-summary": "plantrip",
  journal: "journal",
  "catch-ledger": "catchledger",
  profile: "profile",
};

const FILE_SLUG_MAP = {
  intro: "papa",
  papaDock: "papa",
  home: "home",
  "field-guide": "fieldguide",
  locations: "locations",
  "plan-trip": "plantrip",
  "trip-summary": "plantrip",
  journal: "journal",
  "catch-ledger": "catchledger",
  profile: "profile",
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

  return `/images/chambers/${folderKey}/${regionKey}/${imageNumber}-${fileSlug}-${timeKey}.webp`;
}