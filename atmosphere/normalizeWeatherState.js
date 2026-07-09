// src/atmosphere/normalizeWeatherState.js

export function normalizeWeatherState(current = {}) {
  if (!current) return null;

  const code = current.weather_code;
  const wind = current.wind_speed_10m ?? current.windSpeed ?? 0;
  const precip = current.precipitation ?? 0;
  const cloud = current.cloud_cover ?? current.cloudCover ?? 0;
  const visibility = current.visibility ?? null;

  if ([95, 96, 99].includes(code) || current.thunderstorm) {
    return "ember-storm";
  }

  if (
    precip > 0 ||
    [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)
  ) {
    return "silver-rain";
  }

  if ([45, 48].includes(code) || (visibility !== null && visibility < 2)) {
    return "first-fog";
  }

  if (wind >= 10) return "breezy";

  if (cloud >= 75 || code === 3) return "still-overcast";

  if (cloud <= 20 && [0, 1].includes(code)) return "clear-sky";

  return "base";
}