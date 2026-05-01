export const whisperRegistry = {
  intro_quiet_dawn: [
    "The water wakes slowly too.",
    "Some mornings ask only that you arrive.",
    "The lake was listening before you got here."
  ],

  intro_golden_reflection: [
    "Some light asks nothing but your presence.",
    "Afternoon settles gently over the water.",
    "There is no hurry here."
  ],

  intro_storm_waiting: [
    "Not every threshold arrives in sunlight.",
    "Even heavy skies can welcome you in.",
    "Some stillness gathers before the weather turns."
  ],

  home_quiet_dawn: [
    "Good morning, {{displayName}}. The water is waking with you.",
    "A quiet morning is a good place to begin.",
    "No need to rush the first cast."
  ],

  home_late_afternoon: [
    "Good afternoon, {{displayName}}. The day is softening now.",
    "The light is lower. The water may tell a different story.",
    "Some trips begin before you ever leave home."
  ],

  home_evening_glow: [
    "Good evening, {{displayName}}. The pond is settling too.",
    "Evening has a way of slowing the hand and clearing the mind.",
    "The day has moved through you. Let the water hold the rest."
  ]
};

function fillWhisperTemplate(text, variables = {}) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    return variables[key] ?? "";
  });
}

export function getSceneWhisper(sceneId, options = {}) {
  const whispers = whisperRegistry[sceneId] || [];

  if (!whispers.length) {
    return "";
  }

  const selected =
    whispers[Math.floor(Math.random() * whispers.length)];

  return fillWhisperTemplate(selected, {
    displayName:
      options?.user?.display_name ||
      options?.user?.username ||
      options?.user?.name ||
      "friend"
  });
}