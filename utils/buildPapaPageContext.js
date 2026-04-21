export function buildPapaPageContext(page, extras = {}) {
  const base = {
    page,
    ...extras,
  };

  switch (page) {
    case "intro":
      return {
        ...base,
        event: extras.event || "Grant arrived at the dock.",
      };

    case "home":
      return {
        ...base,
        event: extras.event || "Grant is looking over his fishing world.",
      };

    case "field guide":
      return {
        ...base,
        event: extras.event || "Grant is browsing the field guide.",
      };

    case "field guide detail":
      return {
        ...base,
        event: extras.event || "Grant opened a field guide scroll.",
      };

    case "catch ledger":
      return {
        ...base,
        event: extras.event || "Grant is reviewing his catches.",
      };

    case "journal":
      return {
        ...base,
        event: extras.event || "Grant opened his journal.",
      };

    case "journal archive":
      return {
        ...base,
        event: extras.event || "Grant is reading through past reflections.",
      };

    case "plan trip":
      return {
        ...base,
        event: extras.event || "Grant is planning a fishing trip.",
      };

    case "trip summary":
      return {
        ...base,
        event: extras.event || "Grant is looking at his planned trip.",
      };

    case "locations":
      return {
        ...base,
        event: extras.event || "Grant is looking over nearby waters.",
      };

    case "location detail":
      return {
        ...base,
        event: extras.event || "Grant opened a location scroll.",
      };

    case "talk to papa":
      return {
        ...base,
        event: extras.event || "Grant is talking with Papa.",
      };

    default:
      return base;
  }
}

export function buildEntriesSummary(entries = []) {
  const safeEntries = Array.isArray(entries) ? entries : [];

  return {
    count: safeEntries.length,
    hasCatch: safeEntries.some((e) => !e.is_no_catch),
    hasEmpty: safeEntries.some((e) => e.is_no_catch),
    hasFirstCatch: safeEntries.some((e) => e.is_first_catch),
    locations: [...new Set(safeEntries.map((e) => e.location).filter(Boolean))],
    recentNotes: safeEntries
      .slice(0, 3)
      .map((e) => e.notes || e.species || "")
      .filter(Boolean),
  };
}

export function buildTripContext(trip) {
  if (!trip) return null;

  return {
    location: trip.water?.name || trip.location || null,
    target: trip.target?.label || trip.target || null,
    when: trip.whenLabel || trip.when || null,
    duration: trip.duration?.label || trip.duration || null,
  };
}

export function buildFocusContext(focusItem, focusType) {
  return {
    focusItem: focusItem || null,
    focusType: focusType || null,
  };
}