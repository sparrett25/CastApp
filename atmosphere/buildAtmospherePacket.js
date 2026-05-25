import chamberBackgrounds from "../data/chamberBackgrounds.json";

const FALLBACK_REGION = "central-florida";
const FALLBACK_TIME_STATE = "soft-morning-rise";
const FALLBACK_WEATHER_STATE = "clear-sky";

export function buildAtmospherePacket({
  page,
  region = FALLBACK_REGION,
  timeState = FALLBACK_TIME_STATE,
  weatherState = FALLBACK_WEATHER_STATE,
  user = null,
  context = {},
} = {}) {
  const registry = chamberBackgrounds?.registries ?? {};
  const pages = chamberBackgrounds?.pages ?? {};

  const pageMeta = pages?.[page] ?? pages?.home ?? {};
  const regionMeta =
    registry?.regions?.[region] ?? registry?.regions?.[FALLBACK_REGION] ?? {};
  const timeMeta =
    registry?.timeStates?.[timeState] ??
    registry?.timeStates?.[FALLBACK_TIME_STATE] ??
    {};
  const weatherMeta =
    registry?.weatherStates?.[weatherState] ??
    registry?.weatherStates?.[FALLBACK_WEATHER_STATE] ??
    {};

  const pageVariant = pageMeta?.variants?.[timeState] ?? {};

  const emotionalField = [
    ...(regionMeta?.emotionalField ?? []),
    ...(pageMeta?.emotionalField ?? []),
    ...(timeMeta?.emotionalField ?? []),
    ...(weatherMeta?.emotionalField ?? []),
    ...(pageVariant?.atmosphere?.emotionalField ?? []),
  ];

  const sensoryNotes = [
    ...(regionMeta?.sensoryNotes ?? []),
    ...(timeMeta?.sensoryNotes ?? []),
    ...(weatherMeta?.sensoryNotes ?? []),
    ...(pageVariant?.atmosphere?.sensoryNotes ?? []),
  ];

  return {
    page,
    region,
    timeState,
    weatherState,

    user,
    context,

    caption:
      pageVariant?.caption ??
      pageMeta?.default?.caption ??
      `${page} • ${timeState}`,

    summary: {
      region: regionMeta?.summary ?? "",
      page: pageMeta?.summary ?? "",
      time: timeMeta?.summary ?? "",
      weather: weatherMeta?.summary ?? "",
      combined: [
        regionMeta?.summary,
        timeMeta?.summary,
        weatherMeta?.summary,
        pageMeta?.summary,
      ]
        .filter(Boolean)
        .join(" "),
    },

    emotionalField: [...new Set(emotionalField)],
    sensoryNotes: [...new Set(sensoryNotes)],

    environmentalTone: [
      regionMeta?.environmentalTone,
      pageMeta?.environmentalTone,
      timeMeta?.environmentalTone,
      weatherMeta?.environmentalTone,
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
      tone:
        pageVariant?.papaContext?.tone ??
        pageMeta?.papaContext?.tone ??
        weatherMeta?.papaContext?.tone ??
        timeMeta?.papaContext?.tone ??
        "calm",

      whisperStyle:
        pageVariant?.papaContext?.whisperStyle ??
        pageMeta?.papaContext?.whisperStyle ??
        weatherMeta?.papaContext?.whisperStyle ??
        timeMeta?.papaContext?.whisperStyle ??
        "brief, grounded, reflective",

      promptHints: [
        ...(regionMeta?.papaContext?.promptHints ?? []),
        ...(pageMeta?.papaContext?.promptHints ?? []),
        ...(timeMeta?.papaContext?.promptHints ?? []),
        ...(weatherMeta?.papaContext?.promptHints ?? []),
        ...(pageVariant?.papaContext?.promptHints ?? []),
      ],
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