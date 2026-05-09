import { SPECIES } from "./species";

export function getSpeciesById(id) {
  return SPECIES.find((species) => species.id === id || species.slug === id) || null;
}

export function getRegionalSpecies(regionId) {
  if (!regionId) return SPECIES;

  return SPECIES.filter((species) =>
    species.regionIds?.includes(regionId)
  );
}

export function getSpeciesForWaterType(waterTypeId, regionId = null) {
  return SPECIES.filter((species) => {
    const matchesWater = species.waterTypeIds?.includes(waterTypeId);
    const matchesRegion = !regionId || species.regionIds?.includes(regionId);

    return matchesWater && matchesRegion;
  });
}

export function getWatersForSpecies(species, waterTypes = []) {
  if (!species) return [];

  return waterTypes.filter((water) =>
    species.waterTypeIds?.includes(water.id)
  );
}