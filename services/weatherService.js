// src/services/weatherService.js
import { normalizeWeatherState } from "../atmosphere/normalizeWeatherState";

const CACHE_MINUTES = 30;
const CACHE_KEY_PREFIX = "cast_weather_snapshot_";

function isFresh(snapshot) {
  if (!snapshot?.updatedAt) return false;
  const ageMs = Date.now() - new Date(snapshot.updatedAt).getTime();
  return ageMs < CACHE_MINUTES * 60 * 1000;
}

async function getCoordinatesFromZip(zipCode) {
  const url = `https://api.zippopotam.us/us/${encodeURIComponent(zipCode)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather ZIP not found.");

  const data = await res.json();
  const place = data?.places?.[0];

  if (!place) throw new Error("Weather ZIP not found.");

  return {
    latitude: Number(place.latitude),
    longitude: Number(place.longitude),
    name: place["place name"],
    state: place["state abbreviation"],
  };
}

async function fetchCurrentWeather(zipCode) {
  const { latitude, longitude, name } = await getCoordinatesFromZip(zipCode);

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m` +
    `&temperature_unit=fahrenheit` +
    `&wind_speed_unit=mph` +
    `&precipitation_unit=inch` +
    `&timezone=auto`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Unable to fetch live weather.");

  const data = await res.json();
  const state = normalizeWeatherState(data.current);

localStorage.removeItem("cast_weather_snapshot_33579");

  return {
    zipCode,
    locationName: name,
    state,
    updatedAt: new Date().toISOString(),
    current: data.current,
  };
}

export async function getLiveWeatherSnapshot(zipCode) {
  if (!zipCode || zipCode.length !== 5) return null;

  const cacheKey = `${CACHE_KEY_PREFIX}${zipCode}`;
  const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");

  if (isFresh(cached)) return cached;

  const snapshot = await fetchCurrentWeather(zipCode);
  localStorage.setItem(cacheKey, JSON.stringify(snapshot));

  return snapshot;
}