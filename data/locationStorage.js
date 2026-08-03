import { MY_LOCATIONS } from "./myLocations";

const STORAGE_KEY = "cast_my_locations_v2";
const LOCATIONS_UPDATED_EVENT = "cast:locations-updated";

const LEGACY_GEAR_IDS = {
  bobber: "float-rig",
  "live-bait": "live-baitfish",
  "topwater-lure": "topwater-frog",
};

function normalizeGearIds(ids = []) {
  return [
    ...new Set(
      ids
        .filter((id) => id !== "small-hooks")
        .map((id) => LEGACY_GEAR_IDS[id] ?? id)
    ),
  ];
}

function normalizeLocation(location) {
  const knownSpeciesIds =
    location.knownSpeciesIds ?? location.speciesIds ?? [];

  const fieldKitGearIds = normalizeGearIds(
    location.fieldKitGearIds ?? location.preferredGearIds ?? []
  );

  return {
    ...location,
    knownSpeciesIds,
    observedSpeciesIds: location.observedSpeciesIds ?? [],
    preferredSpeciesIds: location.preferredSpeciesIds ?? [],
    recommendedGearIds: normalizeGearIds(
      location.recommendedGearIds ?? location.gearIds ?? []
    ),
    fieldKitGearIds,
    techniqueIds: location.techniqueIds ?? [],
  };
}

export function loadLocations() {
  if (typeof window === "undefined") {
    return MY_LOCATIONS.map(normalizeLocation);
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return MY_LOCATIONS.map(normalizeLocation);

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.map(normalizeLocation)
      : MY_LOCATIONS.map(normalizeLocation);
  } catch (error) {
    console.warn("Unable to load saved CAST locations", error);
    return MY_LOCATIONS.map(normalizeLocation);
  }
}

export function saveLocations(locations) {
  const normalized = locations.map(normalizeLocation);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(LOCATIONS_UPDATED_EVENT, { detail: normalized })
    );
  }

  return normalized;
}

export function updateLocation(locationId, updater) {
  const locations = loadLocations();
  const updated = locations.map((location) =>
    location.id === locationId
      ? normalizeLocation(updater(normalizeLocation(location)))
      : location
  );

  saveLocations(updated);
  return updated;
}

export function subscribeToLocations(callback) {
  if (typeof window === "undefined") return () => {};

  const handleUpdate = (event) => {
    callback(event.detail ?? loadLocations());
  };

  const handleStorage = (event) => {
    if (event.key === STORAGE_KEY) callback(loadLocations());
  };

  window.addEventListener(LOCATIONS_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(LOCATIONS_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleStorage);
  };
}
