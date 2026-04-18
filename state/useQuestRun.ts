import { useReducer, useEffect } from "react";
import type { Quest } from "../types/quests";
import { questReducer, createRun, type QuestRun } from "./questMachine";
import { loadQuestRun, saveQuestRun, clearQuestRun } from "./questRunStorage";

type Event =
  | { type: "START"; quest: Quest }
  | { type: "COMPLETE_STEP"; quest: Quest; evidence?: unknown }
  | { type: "ABANDON" }
  | { type: "RESET" };

export function useQuestRun(initial: QuestRun | null = null) {
  const [run, dispatchBase] = useReducer(questReducer, initial as any);

  // wrapper that persists after each transition
  function dispatchPersist(e: Event) {
    const prev = run;
    const next = questReducer(prev as any, e);
    // persist or clear
    if (next && next.status !== "idle") saveQuestRun(next);
    if (next && next.status === "idle") clearQuestRun(next.quest_id);
    // manually set state to next
    // (since we computed next ourselves, call base dispatch with a no-op RESET then overwrite)
    dispatchBase(e as any);
  }

  function start(quest: Quest) {
    // try to rehydrate an existing run first
    const restored = loadQuestRun(quest.quest_id);
    if (restored) {
      dispatchPersist({ type: "RESET" });
      // set state to restored by dispatching START then COMPLETE_STEP 0 times (hacky)
      // simpler: just save restored and let reducer move on next actions
      saveQuestRun(restored);
    } else {
      dispatchPersist({ type: "START", quest });
    }
  }

  function completeStep(quest: Quest, evidence?: unknown) {
    dispatchPersist({ type: "COMPLETE_STEP", quest, evidence });
  }

  function abandon() {
    dispatchPersist({ type: "ABANDON" });
  }

  function reset() {
    dispatchPersist({ type: "RESET" });
  }

  // Optional: on mount, if an initial run exists, persist it (guards refresh)
  useEffect(() => {
    if (initial) saveQuestRun(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { run, start, completeStep, abandon, reset };
}
