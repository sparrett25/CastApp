export type QuestStatus = "locked" | "available" | "active" | "completed";
export type StepType = "presence" | "technique" | "catch" | "journal";

export interface QuestCompletionRule {
  requires_journal_entry: boolean;
  requires_catch_entry: boolean;
  tags_to_apply: string[];
  min_words?: number;
  catch_filters?: {
    species?: string[];
    released?: boolean | null;
  } | null;
}

export interface QuestStep {
  step_id: string;
  order: number;
  type: StepType;
  title: string;
  prompt: string;
  ui_hint?: string; // drive UI affordances; keep free-form
  completion_rule: QuestCompletionRule;
  auto_link?: {
    journal?: boolean;
    catch_ledger?: boolean;
  };
  skymap?: {
    star_tag: string; // which constellation/tag to light
    weight?: number;  // star size/importance
  };
}

export interface QuestPrereqs {
  quests_completed?: string[];
  tags_required?: string[];
  min_entries?: number;
}

export interface Quest {
  quest_id: string;
  title: string;
  subtitle?: string;
  status: QuestStatus;
  lore_intro?: string;
  prereqs?: QuestPrereqs;
  steps: QuestStep[];
  completion?: {
    lore_outro?: string;
    rewards?: {
      unlock_lore_ids?: string[];
      unlock_quest_ids?: string[];
      badges?: string[];
    };
  };
  telemetry?: {
    created_at?: string; // ISO8601
    updated_at?: string; // ISO8601
    version?: number;
  };
}

export interface LakeQuestsFile {
  lake_id: string;   // e.g. "lake.mirror_lake"
  version: number;
  updated_at: string; // ISO8601
  quests: Quest[];
}
