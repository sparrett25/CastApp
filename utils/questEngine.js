// questEngine.js
export function onStoryFact(fact, { loadQuestsForLake, applyRewards, markQuestCompleted }) {
  const quests = loadQuestsForLake(fact.lake) || [];
  for (const q of quests) {
    for (const t of q.triggers || []) {
      if (t.when !== fact.type) continue;
      if (t.where?.lake && t.where.lake !== fact.lake) continue;
      if (!matchesRequire(fact, t.require)) continue;

      applyRewards(q.rewards || []);
      markQuestCompleted?.(q.id);
      break;
    }
  }
}

function matchesRequire(fact, req) {
  if (!req) return true;
  // numeric thresholds
  if (typeof req.minCount === "number" && !(fact.count >= req.minCount)) return false;

  // equality matches (tone, species, night, etc.)
  for (const [k, v] of Object.entries(req)) {
    if (k === "minCount") continue;
    if (fact[k] !== v) return false;
  }
  return true;
}
