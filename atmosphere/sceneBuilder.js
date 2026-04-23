import { timeStates } from "./timeStates";
import { weatherStates } from "./weatherStates";
import { papaStates } from "./papaStates";
import { pageProfiles } from "./pageProfiles";
import { getSceneWhisper } from "./whisperRegistry";


const introScenes = {
  intro_quiet_dawn: {
    id: "intro_quiet_dawn",
    page: "intro",
    time: "blue_hour_dawn",
    weather: "light_fog",
    papa: "quiet_observation",
    backgroundVariant: "morning"   
  },

  intro_golden_reflection: {
    id: "intro_golden_reflection",
    page: "intro",
    time: "late_afternoon",
    weather: "still_air",
    papa: "coffee_stillness",
    backgroundVariant: "afternoon"    
  },

  intro_storm_waiting: {
    id: "intro_storm_waiting",
    page: "intro",
    time: "storm_approaching",
    weather: "heavy_cloud_cover",
    papa: "silent_observation",
    backgroundVariant: "evening"    
  }
};

export function getScene(sceneId) {
  const scene = introScenes[sceneId];
  if (!scene) return null;

  return {
    ...scene,
	
	whisper: getSceneWhisper(scene.id),
	 
    pageProfile: pageProfiles[scene.page],
    timeState: timeStates[scene.time],
    weatherState: weatherStates[scene.weather],
    papaState: papaStates[scene.papa]
  };
}

export function getIntroSceneByTime(hour = new Date().getHours()) {
  if (hour < 11) return getScene("intro_quiet_dawn");
  if (hour < 17) return getScene("intro_golden_reflection");
  return getScene("intro_storm_waiting");
}