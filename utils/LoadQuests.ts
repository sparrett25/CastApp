// src/utils/loadQuests.ts
import { LakeQuestsFileZ } from "@/schemas/quests.zod";

export function parseLakeQuests(json: unknown) {
  const parsed = LakeQuestsFileZ.safeParse(json);
  if (!parsed.success) {
    console.error("Quest file validation failed:", parsed.error.format());
    throw new Error("Invalid quests.json format");
  }
  return parsed.data;
}
