// src/atmosphere/mergeAtmosphere.js

function addPx(value = "16px", delta = 0) {
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) return value;
  return `${numeric + delta}px`;
}

function boostRgbaAlpha(rgba = "", boost = 0) {
  if (!rgba.startsWith("rgba")) return rgba;

  return rgba.replace(
    /rgba\(([^,]+),([^,]+),([^,]+),([^)]+)\)/,
    (_, r, g, b, a) => {
      const nextAlpha = Math.min(1, Math.max(0, Number.parseFloat(a) + boost));
      return `rgba(${r.trim()}, ${g.trim()}, ${b.trim()}, ${nextAlpha.toFixed(2)})`;
    }
  );
}

function getPageUiModifiers(pageProfile = {}) {
  switch (pageProfile.uiStyle) {
    case "threshold":
      return {
        blurDelta: 1,
        opacityBoost: -0.01,
      };

    case "dialogue":
      return {
        blurDelta: 0,
        opacityBoost: 0.03,
      };

    case "quietWriting":
      return {
        blurDelta: 1,
        opacityBoost: 0.01,
      };

    case "guidedFlow":
      return {
        blurDelta: 0,
        opacityBoost: 0.02,
      };

    case "ledger":
      return {
        blurDelta: 0,
        opacityBoost: 0.025,
      };

    case "scrollCards":
    case "placeCards":
      return {
        blurDelta: 0,
        opacityBoost: 0.015,
      };

    default:
      return {
        blurDelta: 0,
        opacityBoost: 0,
      };
  }
}

export function mergeAtmosphereUi(timeUi = {}, weatherUi = {}, pageProfile = {}) {
  const pageMods = getPageUiModifiers(pageProfile);

  const blurDelta = (weatherUi?.blurDelta ?? 0) + pageMods.blurDelta;
  const opacityBoost = (weatherUi?.opacityBoost ?? 0) + pageMods.opacityBoost;

  return {
    ...timeUi,

    card: {
      ...timeUi.card,
      blur: addPx(timeUi.card?.blur, blurDelta),
      bg: boostRgbaAlpha(timeUi.card?.bg, opacityBoost),
    },

    bubble: {
      ...timeUi.bubble,
      blur: addPx(timeUi.bubble?.blur, blurDelta),
      papaBg: boostRgbaAlpha(timeUi.bubble?.papaBg, opacityBoost),
      userBg: boostRgbaAlpha(timeUi.bubble?.userBg, opacityBoost),
    },

    input: {
      ...timeUi.input,
      bg: boostRgbaAlpha(timeUi.input?.bg, opacityBoost),
    },

    button: {
      ...timeUi.button,
      primaryBg: boostRgbaAlpha(timeUi.button?.primaryBg, opacityBoost),
      secondaryBg: boostRgbaAlpha(timeUi.button?.secondaryBg, opacityBoost),
    },

    meta: {
      weatherContrast: weatherUi?.contrast ?? "neutral",
      weatherShimmer: weatherUi?.shimmer ?? "medium",
      pageStyle: pageProfile?.uiStyle ?? "default",
      pageRole: pageProfile?.role ?? "default",
    },
  };
}