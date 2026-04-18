export const mkId = (p = "id") =>
  `${p}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
