import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";


const timeSuffixes = {
  "blue-hour-dawn": "blue_hour_dawn",
  "first-light": "first_light",
  "soft-morning-rise": "soft_morning_rise",
  "warm-drift": "warm_drift",
  "golden-dusk": "golden_dusk",
  "quiet-evening-glow": "quiet_evening_glow",
  "ember-twilight": "ember_twilight",
};

const dailyAtmosphereDefaults = {
  "blue-hour-dawn": {
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "blue-hour-dawn",
  },
  "first-light": {
    time: "first_light",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "first-light",
  },
  
  "soft-morning-rise": {
    time: "soft_morning_rise",
    weather: "lifting_fog",
    papa: "quiet_observation",
    backgroundVariant: "soft-morning-rise",
  },
  "warm-drift": {
    time: "warm_drift",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "warm-drift",
  },
  "golden-dusk": {
    time: "golden_dusk",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "golden-dusk",
  },
  "quiet-evening-glow": {
    time: "quiet_evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "quiet-evening-glow",
  },
  "ember-twilight": {
    time: "ember_twilight",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "ember-twilight",
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
  return "ember-twilight";
}







export function getSceneByPageAndTime(pageId, hour = new Date().getHours(), options = {}) {
  const profile = pageProfiles[pageId];
  if (!profile?.scenes?.default) return null;

  const overrideTimeKey =
    options?.user?.time_state_override ||
    options?.user?.timeStateOverride ||
    options?.context?.timeStateOverride ||
    null;

  const timeKey = overrideTimeKey || getTimeKey(hour);
  const sceneId = profile.scenes.default[timeKey];

  return getScene(sceneId, options);

}

export { Scenes };