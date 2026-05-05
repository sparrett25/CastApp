import dockStates from "./dockStates.json";

export function buildDockStatePrompt({ pageId, timeKey }) {
  const time = dockStates.timeStates[timeKey];
  const page = dockStates.pages[pageId];

  if (!time || !page) return "";

  return `## Dock State Block

Page Dock State: ${page.dockState}
Page Meaning: ${page.meaning}

Hero Props:
${page.heroProps.length ? page.heroProps.map((p) => `- ${p}`).join("\n") : "- None"}

Support Props:
${page.supportProps.map((p) => `- ${p}`).join("\n")}

Avoid:
${page.avoid.map((p) => `- ${p}`).join("\n")}

Time-Based Object Behavior:
${time.objectBehavior}

Dock Surface Behavior:
${time.dockBehavior}

Wildlife Behavior:
${time.wildlifeBehavior}

Wildlife Placement Rule:
${time.placementRule}

Important:
- Objects may shift within their natural dock zone, but must not break the camera composition.
- Use no more than 1–2 hero props.
- Wildlife should support the page mood, not dominate the image.
- Preserve the overall dock, water, shoreline, and sky composition.`;
}