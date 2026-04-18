import { load, save, remove } from "../utils/persist";
import type { QuestRun } from "./questMachine";

const KEY = (questId: string) => `questRun:${questId}`;

export function loadQuestRun(questId: string): QuestRun | null {
  return load<QuestRun | null>(KEY(questId), null);
}

export function saveQuestRun(run: QuestRun | null) {
  if (!run) return;
  save(KEY(run.quest_id), run);
}

export function clearQuestRun(questId: string) {
  remove(KEY(questId));
}
