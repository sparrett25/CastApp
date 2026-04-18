// src/state/questMachine.ts
import type { Quest } from "../types/quests";
import { matchCatchFilters, type CatchEvidence } from "../utils/catchFilters";

export type QuestRunStatus = "idle" | "active" | "completed" | "abandoned";

export interface QuestRun {
  quest_id: string;
  status: QuestRunStatus;
  currentStepIndex: number;         // 0-based
  completedStepIds: string[];
  startedAt?: string;               // ISO
  completedAt?: string;             // ISO
}

export type QuestEvent =
  | { type: "START"; quest: Quest }
  | { type: "COMPLETE_STEP"; quest: Quest; evidence?: unknown }
  | { type: "ABANDON" }
  | { type: "RESET" };

export function createRun(quest: Quest): QuestRun {
  return {
    quest_id: quest.quest_id,
    status: "active",
    currentStepIndex: 0,
    completedStepIds: [],
    startedAt: new Date().toISOString()
  };
}

function stepIsSatisfied(
  step: Quest["steps"][number],
  ctx: { journalOk: boolean; catchOk: boolean; minWordsOk: boolean; catchFiltersOk: boolean }
) {
  const r = step.completion_rule;
  if (r.requires_journal_entry && !ctx.journalOk) return false;
  if (r.requires_catch_entry && !ctx.catchOk) return false;
  if (r.min_words && !ctx.minWordsOk) return false;
  if (r.catch_filters && !ctx.catchFiltersOk) return false;
  return true;
}

// Reducer-like state machine
export function questReducer(run: QuestRun | null, event: QuestEvent): QuestRun {
  switch (event.type) {
    case "START": {
      return createRun(event.quest);
    }
    case "COMPLETE_STEP": {
      if (!run || run.status !== "active") return run ?? (null as any);
      const { quest, evidence } = event;
      const step = quest.steps[run.currentStepIndex];
      if (!step) return run;

      const ev = (evidence ?? {}) as {
        journalEntryId?: string;
        journalWordCount?: number;
      } & CatchEvidence;

      const journalOk = !!ev.journalEntryId || !step.completion_rule.requires_journal_entry;
      const catchOk = !!ev.catchEntryId || !step.completion_rule.requires_catch_entry;
      const minWordsOk =
        typeof ev.journalWordCount === "number"
          ? ev.journalWordCount >= (step.completion_rule.min_words ?? 0)
          : true;
      const catchFiltersOk = matchCatchFilters(
        step.completion_rule.catch_filters ?? undefined,
        ev
      );

      const ctx = { journalOk, catchOk, minWordsOk, catchFiltersOk };
      if (!stepIsSatisfied(step, ctx)) return run;

      const nextIndex = run.currentStepIndex + 1;
      const done = nextIndex >= quest.steps.length;

      return {
        ...run,
        completedStepIds: [...new Set([...run.completedStepIds, step.step_id])],
        currentStepIndex: done ? run.currentStepIndex : nextIndex,
        status: done ? "completed" : "active",
        completedAt: done ? new Date().toISOString() : run.completedAt
      };
    } // <-- ✅ properly closed

    case "ABANDON": {
      if (!run) return run as any;
      return { ...run, status: "abandoned" };
    }
    case "RESET": {
      if (!run) return run as any;
      return {
        ...run,
        status: "idle",
        currentStepIndex: 0,
        completedStepIds: [],
        startedAt: undefined,
        completedAt: undefined
      };
    }
    default:
      return run as any;
  }
}
