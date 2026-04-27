import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";

const Scenes = {
  intro_quiet_dawn: {
    id: "intro_quiet_dawn",
    page: "intro",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  intro_golden_reflection: {
    id: "intro_golden_reflection",
    page: "intro",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  intro_evening_glow: {
    id: "intro_evening_glow",
    page: "intro",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  home_quiet_dawn: {
    id: "home_quiet_dawn",
    page: "home",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  home_golden_reflection: {
    id: "home_golden_reflection",
    page: "home",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  home_evening_glow: {
    id: "home_evening_glow",
    page: "home",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  field_guide_quiet_dawn: {
    id: "field_guide_quiet_dawn",
    page: "fieldGuide",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  field_guide_golden_reflection: {
    id: "field_guide_golden_reflection",
    page: "fieldGuide",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  field_guide_evening_glow: {
    id: "field_guide_evening_glow",
    page: "fieldGuide",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  locations_quiet_dawn: {
    id: "locations_quiet_dawn",
    page: "locations",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  locations_golden_reflection: {
    id: "locations_golden_reflection",
    page: "locations",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  locations_evening_glow: {
    id: "locations_evening_glow",
    page: "locations",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  plan_trip_quiet_dawn: {
    id: "plan_trip_quiet_dawn",
    page: "planTrip",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  plan_trip_golden_reflection: {
    id: "plan_trip_golden_reflection",
    page: "planTrip",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  plan_trip_evening_glow: {
    id: "plan_trip_evening_glow",
    page: "planTrip",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  catch_ledger_quiet_dawn: {
    id: "catch_ledger_quiet_dawn",
    page: "catchLedger",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  catch_ledger_golden_reflection: {
    id: "catch_ledger_golden_reflection",
    page: "catchLedger",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  catch_ledger_evening_glow: {
    id: "catch_ledger_evening_glow",
    page: "catchLedger",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  journal_quiet_dawn: {
    id: "journal_quiet_dawn",
    page: "journal",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  journal_golden_reflection: {
    id: "journal_golden_reflection",
    page: "journal",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  journal_evening_glow: {
    id: "journal_evening_glow",
    page: "journal",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },

  talk_quiet_dawn: {
    id: "talk_quiet_dawn",
    page: "papaDock",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning",
  },

  talk_golden_reflection: {
    id: "talk_golden_reflection",
    page: "papaDock",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon",
  },

  talk_evening_glow: {
    id: "talk_evening_glow",
    page: "papaDock",
    time: "evening_glow",
    weather: "still_air",
    papa: "quiet_observation",
    backgroundVariant: "evening",
  },
};

export function getScene(sceneId) {
  const scene = Scenes[sceneId];
  if (!scene) return null;

  return {
    ...scene,
    whisper: getSceneWhisper(scene.id),
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

export function getSceneByPageAndTime(pageId, hour = new Date().getHours()) {
  const profile = pageProfiles[pageId];
  if (!profile?.scenes?.default) return null;

  const timeKey = getTimeKey(hour);
  const sceneId = profile.scenes.default[timeKey];

  return getScene(sceneId);
}

export { Scenes };