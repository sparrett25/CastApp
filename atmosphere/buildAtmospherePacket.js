import chamberBackgrounds from "../data/chamberBackgrounds.json";

const FALLBACK_REGION = "central-florida";
const FALLBACK_TIME_STATE = "soft-morning-rise";
const FALLBACK_WEATHER_STATE = "base";

const TIME_KEY_MAP = {
  blue_hour_dawn: "blue-hour-dawn",
  first_light: "first-light",
  soft_morning_rise: "soft-morning-rise",
  warm_drift: "warm-drift",
  golden_dusk: "golden-dusk",
  quiet_evening_glow: "quiet-evening-glow",
  ember_twilight: "ember-twilight",
  starry_night: "starry-night",
};

const WEATHER_KEY_MAP = {
  // legacy
  still_air: "base",

  // clear sky
  clear_sky: "clear-sky",

  // breezy
  light_breeze: "breezy",
  breezy_wind: "breezy",

  // fog
  light_fog: "first-fog",
  lifting_fog: "first-fog",

  // rain
  silver_rain: "silver-rain",

  // overcast
  overcast: "still-overcast",
  still_overcast: "still-overcast",

  // storm
  thunderstorm: "ember-storm",
  ember_storm: "ember-storm",
};


function normalizeKey(value, fallback, map = {}) {
  if (!value) return fallback;

  if (typeof value === "string") {
    return map[value] ?? value;
  }

  return value.key ?? value.id ?? fallback;
}

export function buildAtmospherePacket({
  page,
  region = FALLBACK_REGION,
  timeState = FALLBACK_TIME_STATE,
  weatherState = FALLBACK_WEATHER_STATE,
  user = null,
  context = {},
} = {}) {
  const registry = chamberBackgrounds?.registry ?? {};
  const pages = chamberBackgrounds?.chambers ?? {};

  const normalizedTimeState = normalizeKey(
    timeState,
    FALLBACK_TIME_STATE,
    TIME_KEY_MAP
  );

  const normalizedWeatherState = normalizeKey(
    weatherState,
    FALLBACK_WEATHER_STATE,
    WEATHER_KEY_MAP
  );

  const pageMeta = pages?.[page] ?? pages?.home ?? {};

  const regionMeta =
    registry?.regions?.[region] ?? registry?.regions?.[FALLBACK_REGION] ?? {};

  const timeMeta =
    registry?.timeStates?.[normalizedTimeState] ??
    registry?.timeStates?.[FALLBACK_TIME_STATE] ??
    {};

  const weatherMeta =
    registry?.weatherStates?.[normalizedWeatherState] ??
    registry?.weatherStates?.[FALLBACK_WEATHER_STATE] ??
    {};

  const pageVariant = pageMeta?.variants?.[normalizedTimeState] ?? {};

  const emotionalField = [
    ...(regionMeta?.baseTone ?? []),
    ...(regionMeta?.emotionalField ?? []),
    ...(pageMeta?.pageTone ?? []),
    ...(pageMeta?.emotionalField ?? []),
    ...(timeMeta?.emotionalField ?? []),
    ...(weatherMeta?.emotionalField ?? []),
    ...(pageVariant?.atmosphere?.emotionalField ?? []),
  ];

  const sensoryNotes = [
    ...(regionMeta?.atmosphere ?? []),
    ...(regionMeta?.sensoryNotes ?? []),
    timeMeta?.sensoryLine,
    weatherMeta?.sensoryLine,
    ...(timeMeta?.sensoryNotes ?? []),
    ...(weatherMeta?.sensoryNotes ?? []),
    ...(pageVariant?.atmosphere?.sensoryNotes ?? []),
  ].filter(Boolean);

  const promptHints = [
    ...(regionMeta?.papaContext?.promptHints ?? []),
    pageMeta?.papaPurposeHint,
    ...(pageMeta?.papaContext?.promptHints ?? []),
    ...(timeMeta?.papaContext?.promptHints ?? []),
    ...(weatherMeta?.papaContext?.promptHints ?? []),
    ...(pageVariant?.papaContext?.promptHints ?? []),
    weatherMeta?.papaToneModifier
      ? `Weather tone modifier: ${weatherMeta.papaToneModifier}`
      : null,
  ].filter(Boolean);

  return {
    page,
    region,
    timeState: normalizedTimeState,
    weatherState: normalizedWeatherState,

    user,
    context,

    labels: {
      page: pageMeta?.label ?? page,
      region: regionMeta?.label ?? region,
      timeState: timeMeta?.label ?? normalizedTimeState,
      weatherState: weatherMeta?.label ?? normalizedWeatherState,
    },

    caption:
      pageVariant?.caption ??
      pageMeta?.default?.caption ??
      `${pageMeta?.label ?? page} • ${timeMeta?.label ?? normalizedTimeState}`,

    summary: {
      region: regionMeta?.summary ?? "",
      page: pageMeta?.summary ?? "",
      time: timeMeta?.summary ?? "",
      weather: weatherMeta?.summary ?? "",
      combined: [
        regionMeta?.summary,
        pageMeta?.summary,
        timeMeta?.summary,
        weatherMeta?.summary,
      ]
        .filter(Boolean)
        .join(" "),
    },

    overlay: {
      title: `${timeMeta?.label ?? normalizedTimeState} • ${
        weatherMeta?.label ?? normalizedWeatherState
      }`,
      subtitle: `${pageMeta?.label ?? page} in ${regionMeta?.label ?? region}`,
      summary:
        weatherMeta?.overlaySummary ??
        weatherMeta?.summary ??
        timeMeta?.overlaySummary ??
        timeMeta?.summary ??
        "",
      sensoryLine: weatherMeta?.sensoryLine ?? timeMeta?.sensoryLine ?? "",
      papaHint:
        weatherMeta?.papaToneModifier ??
        timeMeta?.papaTone ??
        pageVariant?.papaContext?.tone ??
        "",
    },

    emotionalField: [...new Set(emotionalField)],

    sensoryNotes: [...new Set(sensoryNotes)],

    environmentalTone: [
      regionMeta?.environmentalTone,
      pageMeta?.environmentalTone,
      timeMeta?.environmentalTone,
      weatherMeta?.environmentalTone,
      weatherMeta?.movement,
    ]
      .filter(Boolean)
      .join(" · "),

    soundscape: {
      ambient: [
        ...(regionMeta?.soundscape?.ambient ?? []),
        ...(timeMeta?.soundscape?.ambient ?? []),
        ...(weatherMeta?.soundscape?.ambient ?? []),
      ],
      wildlife: [
        ...(regionMeta?.soundscape?.wildlife ?? []),
        ...(timeMeta?.soundscape?.wildlife ?? []),
        ...(weatherMeta?.soundscape?.wildlife ?? []),
      ],
      weather: weatherMeta?.soundscape?.weather ?? [],
      intensity:
        weatherMeta?.soundscape?.intensity ??
        timeMeta?.soundscape?.intensity ??
        "low",
    },

    papaContext: {
      tone: pageVariant?.papaContext?.tone ?? timeMeta?.papaTone ?? "calm",

      weatherToneModifier: weatherMeta?.papaToneModifier ?? "",

      whisperStyle:
        pageVariant?.papaContext?.whisperStyle ??
        pageMeta?.papaContext?.whisperStyle ??
        "short, sensory, and page-aware",

      promptHints,

      emotionalField: [...new Set(emotionalField)],

      sensoryLine: weatherMeta?.sensoryLine ?? timeMeta?.sensoryLine ?? "",

      soundscape: {
        weather: weatherMeta?.soundscape?.weather ?? [],
        intensity:
          weatherMeta?.soundscape?.intensity ??
          timeMeta?.soundscape?.intensity ??
          "low",
      },
    },

    source: {
      regionMeta,
      pageMeta,
      timeMeta,
      weatherMeta,
      pageVariant,
    },
  };
}

export default buildAtmospherePacket;