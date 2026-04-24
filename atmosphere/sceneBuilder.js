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

  intro_evening_glow: {
    id: "intro_evening_glow",
    page: "intro",
    time: "evening_glow",
    weather: "still_air",
  papa: "quiet_observation",
  backgroundVariant: "evening"  
  },
  
  talk_quiet_dawn: {
  id: "talk_quiet_dawn",
  page: "papaDock",
  time: "blue_hour_dawn",
  weather: "light_fog",
  papa: "quiet_observation",
  backgroundVariant: "morning"
},

talk_late_afternoon: {
  id: "talk_late_afternoon",
  page: "papaDock",
  time: "late_afternoon",
  weather: "still_air",
  papa: "coffee_stillness",
  backgroundVariant: "afternoon"
},

talk_evening_glow: {
  id: "talk_evening_glow",
  page: "papaDock",
  time: "evening_glow",
  weather: "still_air",
  papa: "quiet_observation",
  backgroundVariant: "evening"
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
    papaState: papaStates[scene.papa]
  };
}

export function getIntroSceneByTime(hour = new Date().getHours()) {
  if (hour < 11) return getScene("intro_quiet_dawn");
  if (hour < 17) return getScene("intro_golden_reflection");
  return getScene("intro_storm_waiting");
}

export function getTalkSceneByTime(hour = new Date().getHours()) {
  if (hour < 11) return getScene("talk_quiet_dawn");
  if (hour < 17) return getScene("talk_late_afternoon");
  return getScene("talk_evening_glow");
}