// src/atmosphere/normalizeWeatherState.js

export function normalizeWeatherState(weather) {
  if (!weather) return null;

  if (weather.thunderstorm) return "ember-storm";
  if (weather.precipitation > 0) return "silver-rain";
  if (weather.visibility < 2) return "first-fog";
  if (weather.windSpeed >= 10) return "breezy";
  if (weather.cloudCover >= 70) return "still-overcast";

  return "clear-sky";
}