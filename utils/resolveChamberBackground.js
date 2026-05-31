// src/utils/resolveChamberBackground.js

import { DEFAULT_REGION_KEY } from "../data/regionOptions";
import { weatherStates } from "../atmosphere/weatherStates";

const TIME_OFFSET = {
  "blue-hour-dawn": 1,
  "first-light": 2,
  "soft-morning-rise": 3,
  "warm-drift": 4,
  "golden-dusk": 5,
  "quiet-evening-glow": 6,
  "ember-twilight": 7, 
  "starry-night": 8,
};

const CHAMBER_FOLDER_MAP = {
  intro: "intro", 
  papaDock: "papadock",
  home: "home",
  fieldGuide: "fieldguide",
  locations: "locations",
  trips: "trips",
  tripSummary: "tripsummary",
  planTrip: "plantrip",
  journal: "journal",
  catchLedger: "catchledger",
  profile: "profile",
  authPage: "authpage",
};

const FILE_SLUG_MAP = {
  intro: "intro",
  papaDock: "papadock",
  home: "home",
  fieldGuide: "fieldguide",
  locations: "locations",
  trips: "trips",
  tripSummary: "tripsummary",
  planTrip: "plantrip",
  journal: "journal",
  catchLedger: "catchledger",
  profile: "profile",
  authPage: "authpage",
};

export function resolveChamberBackgroundSrc({
  chamberKey,
  timeKey = "blue-hour-dawn",
  regionKey = DEFAULT_REGION_KEY,
  weatherKey = "base",
}) {
  const base = Number(regionKey);
  const offset = TIME_OFFSET[timeKey] || 1;

  const folderKey = CHAMBER_FOLDER_MAP[chamberKey] || chamberKey;
  const fileSlug = FILE_SLUG_MAP[chamberKey] || chamberKey;

  const imageNumber = base + offset;

  const weatherFolder =
    weatherKey === "base" ? "base" : `weather-${weatherKey}`;

  const weatherSuffix =
    weatherKey === "base" ? "" : `-${weatherKey}-v1`;

  return `/images/chambers/${folderKey}/${regionKey}/${weatherFolder}/${imageNumber}-${fileSlug}-${timeKey}${weatherSuffix}.webp`;
}