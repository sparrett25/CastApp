// src/utils/questGuards.ts
import type { QuestStep } from "@/types/quests";

export const isPresence = (s: QuestStep): s is QuestStep & { type: "presence" } =>
  s.type === "presence";
export const isTechnique = (s: QuestStep): s is QuestStep & { type: "technique" } =>
  s.type === "technique";
export const isCatch = (s: QuestStep): s is QuestStep & { type: "catch" } =>
  s.type === "catch";
export const isJournal = (s: QuestStep): s is QuestStep & { type: "journal" } =>
  s.type === "journal";
