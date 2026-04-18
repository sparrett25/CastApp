// Utility to determine which adventure Grant should see on the home screen

const STORAGE_KEY = (id) => `cast:v1:adventure:${id}`;

function isCompleted(questId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(questId));
    if (!raw) return false;
    return JSON.parse(raw).completed === true;
  } catch { return false; }
}

function getProgress(questId, totalSteps) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(questId));
    if (!raw) return 0;
    const { stepIndex, completed } = JSON.parse(raw);
    if (completed) return 100;
    return Math.round((stepIndex / totalSteps) * 100);
  } catch { return 0; }
}

export function getActiveAdventure() {
  const backyardDone = isCompleted("backyard-pond");

  if (!backyardDone) {
    return {
      id: "backyard-pond",
      title: "The Backyard Pond",
      location: "Scooter's backyard pond · Riverview, FL",
      step: "Step 1 of 5 — Read the water",
      progress: getProgress("backyard-pond", 5),
      isNew: getProgress("backyard-pond", 5) === 0,
    };
  }

  const hillsboroughDone = isCompleted("hillsborough-river");

  if (!hillsboroughDone) {
    return {
      id: "hillsborough-river",
      title: "The Hillsborough River",
      location: "Hillsborough River · Tampa area, FL",
      step: "Find the Largemouth Bass",
      progress: getProgress("hillsborough-river", 5),
      isNew: getProgress("hillsborough-river", 5) === 0,
    };
  }

  // All adventures complete — placeholder for future adventures
  return {
    id: null,
    title: "More adventures coming",
    location: "Grant's waters · Tampa area, FL",
    step: "You've explored your home waters",
    progress: 100,
    isNew: false,
  };
}
