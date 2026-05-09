import { GEAR } from "./gear";

export function getGearById(id) {
  return GEAR.find((gear) => gear.id === id) || null;
}

export function getRegionalGear(regionId) {
  if (!regionId) return GEAR;

  return GEAR.filter((gear) => {
    if (!gear.regionIds?.length) return true;
    return gear.regionIds.includes(regionId);
  });
}

export function getGearForSpecies(speciesId, regionId = null) {
  return GEAR.filter((gear) => {
    const matchesSpecies = gear.speciesIds?.includes(speciesId);
    const matchesRegion =
      !regionId || !gear.regionIds?.length || gear.regionIds.includes(regionId);

    return matchesSpecies && matchesRegion;
  });
}

export function getGearForWaterType(waterTypeId, regionId = null) {
  return GEAR.filter((gear) => {
    const matchesWater = gear.waterTypeIds?.includes(waterTypeId);
    const matchesRegion =
      !regionId || !gear.regionIds?.length || gear.regionIds.includes(regionId);

    return matchesWater && matchesRegion;
  });
}

export function getSpeciesForGear(gear, speciesList = []) {
  if (!gear) return [];

  return speciesList.filter((species) =>
    gear.speciesIds?.includes(species.id)
  );
}

export function getWatersForGear(gear, waterTypes = []) {
  if (!gear) return [];

  return waterTypes.filter((water) =>
    gear.waterTypeIds?.includes(water.id)
  );
}