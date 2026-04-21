import { CAST_LOCATIONS } from "../data/locations";
import { SPECIES } from "../data/species";

function normalizeText(value) {
  return (value || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and");
}

function titleCaseWords(value) {
  return (value || "")
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function getAllLocations() {
  return CAST_LOCATIONS;
}

export function getLocationById(locationId) {
  return CAST_LOCATIONS.find((loc) => loc.id === locationId) || null;
}

export function getAllSpecies() {
  return SPECIES;
}

export function getSpeciesById(speciesId) {
  return SPECIES.find((species) => species.id === speciesId) || null;
}

export function getSpeciesBySlug(slug) {
  return SPECIES.find((species) => species.slug === slug) || null;
}

export function findSpeciesByName(name) {
  const normalized = normalizeText(name);

  return (
    SPECIES.find((species) => normalizeText(species.name) === normalized) ||
    SPECIES.find((species) => normalizeText(species.id) === normalized) ||
    SPECIES.find((species) => normalizeText(species.slug) === normalized) ||
    null
  );
}

export function getSpeciesOptionsForLocation(locationId) {
  const location = getLocationById(locationId);
  if (!location) return [];

  return (location.fish_species || []).map((fishName) => {
    const canonical = findSpeciesByName(fishName);

    if (canonical) {
      return {
        id: canonical.id,
        slug: canonical.slug,
        label: canonical.name,
        canonical: true,
        tip:
          canonical.scooterTips?.[0] ||
          canonical.tagline ||
          canonical.description ||
          "",
        species: canonical,
      };
    }

    return {
      id: normalizeText(fishName).replace(/\s+/g, "-"),
      slug: normalizeText(fishName).replace(/\s+/g, "-"),
      label: titleCaseWords(fishName),
      canonical: false,
      tip: "A local species found here.",
      species: null,
    };
  });
}

export function getPrimarySpeciesForLocation(locationId, limit = 3) {
  return getSpeciesOptionsForLocation(locationId).slice(0, limit);
}

export function getAdditionalSpeciesForLocation(locationId, offset = 3) {
  return getSpeciesOptionsForLocation(locationId).slice(offset);
}

export function getAdventuresForLocation(locationId) {
  const location = getLocationById(locationId);
  return location?.adventure_ids || [];
}