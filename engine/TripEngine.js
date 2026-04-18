import { getMockConditions } from "../data/environmentalConditions";

/**
 * plan = {
 *   dateISO, timeOfDay, waterBodyId,
 *   targetSpeciesId: "largemouth_bass" | "bluegill" | "channel_catfish" | ...
 * }
 * Returns { gear[], bait[], techniques[], notes[], papaKeys[] , env }
 */
export async function generateTripSummary(plan) {
  const env = await inferEnvironment(plan);

  const rec = { gear: [], bait: [], techniques: [], notes: [], papaKeys: [], env };

  // --- species heuristics
  const s = (plan.targetSpeciesId || "").toLowerCase();

  if (s.includes("bluegill")) {
    rec.gear.push("light-rod", "4lb-line", "small-hook");
    rec.bait.push("nightcrawler");
    rec.techniques.push("bobber-near-weeds");
    rec.papaKeys.push("species.bluegill");
  }

  if (s.includes("largemouth") || s.includes("bass")) {
    rec.gear.push("medium-rod", "10lb-line");
    if (env.timeOfDay === "dawn" || env.timeOfDay === "dusk") {
      rec.techniques.push("topwater-walking-bait");
      rec.bait.push("topwater-walker");
      rec.papaKeys.push("summary.dawnTopwater");
    } else {
      rec.techniques.push("slow-jig");
      rec.bait.push("spinnerbait");
    }
    rec.papaKeys.push("species.largemouth_bass");
  }

  if (s.includes("catfish")) {
    rec.gear.push("medium-rod", "10lb-line");
    rec.bait.push("cut-bait", "stink-bait");
    rec.techniques.push("bottom-rig");
    rec.papaKeys.push("species.channel_catfish");
  }

  // --- environment heuristics
  if (env.windDir === "S" && env.windMph >= 8) {
    rec.notes.push("Try wind-blown banks and points; bait drifts toward you.");
    rec.papaKeys.push("summary.southWind");
  }
  if (env.waterClarity === "clear") {
    rec.notes.push("Use natural colors; longer leaders; quiet approach.");
  } else if (env.waterClarity === "murky") {
    rec.notes.push("Use high-contrast or rattling lures to stand out.");
  }
  if (env.cloudCover === "overcast") {
    rec.notes.push("Overcast can extend the bite window—cover water methodically.");
  }

  return rec;
}

async function inferEnvironment(plan) {
  // MVP: use mocked conditions; map to a simple envelope the UI can show.
  const mock = await getMockConditions();
  const season = getSeasonFromISO(plan.dateISO);
  return {
    dateISO: plan.dateISO,
    timeOfDay: plan.timeOfDay || "dawn",
    season,
    windDir: mock?.wind?.direction || "S",
    windMph: mock?.wind?.speed ?? 10,
    tempF: mock?.temperature?.current ?? 78,
    cloudCover: "partly",
    waterClarity: "stained",
    waterBodyId: plan.waterBodyId || "mirrorlake"
  };
}

function getSeasonFromISO(dateISO) {
  if (!dateISO) return "summer";
  const m = new Date(dateISO).getMonth() + 1;
  if (m <= 2 || m === 12) return "winter";
  if (m <= 5) return "spring";
  if (m <= 8) return "summer";
  return "fall";
}
