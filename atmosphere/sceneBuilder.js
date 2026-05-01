import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";


const timeSuffixes = {
  morning: "quiet_dawn",
  afternoon: "golden_reflection",
  evening: "evening_glow",
};




const dailyAtmosphereDefaults = {
  morning: {
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },
  afternoon: {
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },
  evening: {
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },
};


function makeDailyScenes(page, prefix) {
  return Object.fromEntries(
    Object.entries(dailyAtmosphereDefaults).map(([timeKey, atmosphere]) => {
      const suffix =
        timeKey === "morning"
          ? "quiet_dawn"
          : timeKey === "afternoon"
          ? "golden_reflection"
          : "evening_glow";

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
  if (hour < 11) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
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