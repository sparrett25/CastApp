import { waterTypes } from "./waterTypes";

export function getWaterTypeById(id) {
  return waterTypes.find((water) => water.id === id) || null;
}

export function getRegionalWaterType(water, regionId) {
  if (!water) return null;

  const variant = water.regionalVariants?.[regionId];

  if (!variant) {
    return {
      ...water,
      baseLabel: water.label,
      canonicalId: water.id,
      activeRegionId: regionId,
    };
  }

  return {
    ...water,
    ...variant,
    id: water.id,
    baseLabel: water.label,
    canonicalId: water.id,
    category: variant.category || water.category,
    shortDescription: variant.shortDescription || water.shortDescription,
    toneTags: variant.toneTags || water.toneTags,
    structureTags: variant.structureTags || water.structureTags,
    whatToLookFor: variant.whatToLookFor || water.whatToLookFor,
    learningFocus: variant.learningFocus || water.learningFocus,
    gearIds: variant.gearIds || water.gearIds,
    techniqueIds: variant.techniqueIds || water.techniqueIds,
    papaReflection: variant.papaReflection || water.papaReflection,
    activeRegionId: regionId,
  };
}

export function getRegionalWaterTypes(regionId) {
  return waterTypes.map((water) => getRegionalWaterType(water, regionId));
}

export function getSpeciesForWater(water, speciesList) {
  if (!water || !Array.isArray(speciesList)) return [];

  return speciesList.filter((species) =>
    water.speciesIds?.includes(species.id)
  );
}

export function getWaterTypesForSpecies(speciesId, regionId = null) {
  const waters = regionId ? getRegionalWaterTypes(regionId) : waterTypes;

  return waters.filter((water) =>
    water.speciesIds?.includes(speciesId)
  );
}