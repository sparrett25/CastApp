import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";
import { DEFAULT_REGION_KEY } from "../data/regionOptions";
import { getAtmosphereRegionKey } from "../utils/resolveChamberBackground";

const timeSuffixes = {
  "blue-hour-dawn": "blue_hour_dawn",
  "first-light": "first_light",
  "soft-morning-rise": "soft_morning_rise",
  "warm-drift": "warm_drift",
  "golden-dusk": "golden_dusk",
  "quiet-evening-glow": "quiet_evening_glow",
  "ember-twilight": "ember_twilight",
  "starry-night": "starry_night",
};

const dailyAtmosphereDefaults = {
  "blue-hour-dawn": {
    time: "blue_hour_dawn",
    papa: "quiet_observation",
    backgroundVariant: "blue-hour-dawn",
  },
  "first-light": {
    time: "first_light",
    papa: "quiet_observation",
    backgroundVariant: "first-light",
  },
  
  "soft-morning-rise": {
    time: "soft_morning_rise",
    papa: "quiet_observation",
    backgroundVariant: "soft-morning-rise",
  },
  "warm-drift": {
    time: "warm_drift",
    papa: "coffee_stillness",
    backgroundVariant: "warm-drift",
  },
  "golden-dusk": {
    time: "golden_dusk",
    papa: "quiet_observation",
    backgroundVariant: "golden-dusk",
  },
  "quiet-evening-glow": {
    time: "quiet_evening_glow",
    papa: "quiet_observation",
    backgroundVariant: "quiet-evening-glow",
  },
  "ember-twilight": {
    time: "ember_twilight",
     papa: "quiet_observation",
    backgroundVariant: "ember-twilight",
  },
  "starry-night": {
    time: "starry_night",
     papa: "quiet_observation",
    backgroundVariant: "starry-night",
  },
};


function makeDailyScenes(page, prefix) {
  return Object.fromEntries(
    Object.entries(dailyAtmosphereDefaults).map(([timeKey, atmosphere]) => {
      const suffix = timeSuffixes[timeKey];
      const id = `${prefix}_${suffix}`;

      return [
        id,
        {
          id,
          page,
          ...atmosphere,
        },
      ];
    })
  );
}

const Scenes = {
  ...makeDailyScenes("intro", "intro"),
  ...makeDailyScenes("home", "home"),
  ...makeDailyScenes("adventure", "adventure"),
  ...makeDailyScenes("fieldGuide", "field_guide"),
  ...makeDailyScenes("locations", "locations"),
  ...makeDailyScenes("planTrip", "plan_trip"),
  ...makeDailyScenes("trips", "trips"),
  ...makeDailyScenes("tripSummary", "trip_summary"),  
  ...makeDailyScenes("catchLedger", "catch_ledger"),
  ...makeDailyScenes("journal", "journal"),
  ...makeDailyScenes("papaDock", "talk"),
  ...makeDailyScenes("profile", "profile"),
};


export function getScene(sceneId, options = {}) {
  const scene = Scenes[sceneId];
  if (!scene) return null;

  return {
    ...scene,
    whisper: getSceneWhisper(scene.id, options),
    pageProfile: pageProfiles[scene.page],
    timeState: timeStates[scene.time],
    weatherState: weatherStates[scene.weather],
    papaState: papaStates[scene.papa],
  };
}

export function getTimeKey(hour = new Date().getHours()) {
  if (hour < 5) return "blue-hour-dawn";
  if (hour < 7) return "first-light";
  if (hour < 11) return "soft-morning-rise";
  if (hour < 15) return "warm-drift";
  if (hour < 18) return "golden-dusk";
  if (hour < 20) return "quiet-evening-glow";
  if (hour < 22) return "ember-twilight";
  return "starry-night";
}

export function getSceneByPageAndTime(pageId, hour = new Date().getHours(), options = {}) {
  const profile = pageProfiles[pageId];
  if (!profile?.scenes?.default) return null;

  const overrideTimeKey =
    options?.user?.time_state_override ||
    options?.user?.timeStateOverride ||
    options?.context?.timeStateOverride ||
    null;

  const overrideWeatherKey =
  options?.user?.weather_state_override ||
  options?.user?.weatherStateOverride ||
  options?.context?.weatherStateOverride ||
  null;

  const profileRegionKey =
  options?.user?.favoriteRegion ||
  options?.user?.regionKey ||
  options?.context?.regionKey ||
  DEFAULT_REGION_KEY;

const atmosphereRegionKey = getAtmosphereRegionKey(profileRegionKey);
  
  const timeKey = overrideTimeKey || getTimeKey(hour);
  const sceneId = profile.scenes.default[timeKey];

  const scene = getScene(sceneId, options);
  if (!scene) return null;

  const weatherKey = overrideWeatherKey || scene.weather;

  return {
  ...scene,
  regionNumber: profileRegionKey,
  regionKey: atmosphereRegionKey,
  weatherStateKey: weatherKey,
  weatherState: weatherStates[weatherKey],
};
}

export { Scenes };