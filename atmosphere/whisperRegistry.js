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
  ]
};

export function getSceneWhisper(sceneId) {
  const whispers = whisperRegistry[sceneId] || [];

  if (!whispers.length) {
    return "";
  }

  return whispers[
    Math.floor(Math.random() * whispers.length)
  ];
}