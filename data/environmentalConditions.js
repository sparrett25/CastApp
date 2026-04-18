export const getMockConditions = async () => {
  return {
    moon: {
      phase: 'Waxing Crescent',
      geojson: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-82.4572, 27.9506],
          },
          properties: {
            title: 'Moon Phase Marker',
          },
        }],
      },
    },
    tide: {
      state: 'Incoming',
    },
    temperature: {
      current: 82,
      feelsLike: 85,
    },
    wind: {
      speed: 12,
      direction: 'NE',
    },
  };
};