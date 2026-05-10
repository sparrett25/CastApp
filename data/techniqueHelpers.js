import { TECHNIQUES } from "./techniques";

export function getTechniqueById(id) {
  return TECHNIQUES.find((technique) => technique.id === id) || null;
}

export function getRegionalTechniques(regionId) {
  if (!regionId) return TECHNIQUES;

  return TECHNIQUES.filter((technique) => {
    if (!technique.regionIds?.length) return true;
    return technique.regionIds.includes(regionId);
  });
}

export function getTechniquesForSpecies(speciesId, regionId = null) {
  return TECHNIQUES.filter((technique) => {
    const matchesSpecies = technique.speciesIds?.includes(speciesId);
    const matchesRegion =
      !regionId ||
      !technique.regionIds?.length ||
      technique.regionIds.includes(regionId);

    return matchesSpecies && matchesRegion;
  });
}

export function getTechniquesForWaterType(waterTypeId, regionId = null) {
  return TECHNIQUES.filter((technique) => {
    const matchesWater = technique.waterTypeIds?.includes(waterTypeId);
    const matchesRegion =
      !regionId ||
      !technique.regionIds?.length ||
      technique.regionIds.includes(regionId);

    return matchesWater && matchesRegion;
  });
}

export function getTechniquesForGear(gearId, regionId = null) {
  return TECHNIQUES.filter((technique) => {
    const matchesGear = technique.gearIds?.includes(gearId);
    const matchesRegion =
      !regionId ||
      !technique.regionIds?.length ||
      technique.regionIds.includes(regionId);

    return matchesGear && matchesRegion;
  });
}

export function getSpeciesForTechnique(technique, speciesList = []) {
  if (!technique) return [];

  return speciesList.filter((species) =>
    technique.speciesIds?.includes(species.id)
  );
}

export function getWatersForTechnique(technique, waterTypes = []) {
  if (!technique) return [];

  return waterTypes.filter((water) =>
    technique.waterTypeIds?.includes(water.id)
  );
}

export function getGearForTechnique(technique, gearList = []) {
  if (!technique) return [];

  return gearList.filter((gear) =>
    technique.gearIds?.includes(gear.id)
  );
}