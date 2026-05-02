import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";


const timeSuffixes = {
  "blue-hour-dawn": "blue_hour_dawn",
  "soft-morning-rise": "soft_morning_rise",
  "late-afternoon-warmth": "late_afternoon_warmth",
  "golden-dusk": "golden_dusk",
  "quiet-evening-glow": "quiet_evening_glow",
};

const dailyAtmosphereDefaults = {
  "blue-hour-dawn": {
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "blue-hour-dawn",
  },
  "soft-morning-rise": {
    time: "soft_morning_rise",
    weather: "lifting_fog",
    papa: "quiet_observation",
    backgroundVariant: "soft-morning-rise",
  },
  "late-afternoon-warmth": {
    time: "late_afternoon_warmth",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "late-afternoon-warmth",
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
  if (hour < 7) return "blue-hour-dawn";
  if (hour < 11) return "soft-morning-rise";
  if (hour < 16) return "late-afternoon-warmth";
  if (hour < 19) return "golden-dusk";
  return "quiet-evening-glow";
}







export function getSceneByPageAndTime(pageId, hour = new Date().getHours(), options = {}) {
  const profile = pageProfiles[pageId];
  if (!profile?.scenes?.default) return null;

  const timeKey = getTimeKey(hour);
  const sceneId = profile.scenes.default[timeKey];
  
  const suffix = timeSuffixes[timeKey];
  
  return getScene(sceneId, options);
}

export { Scenes };