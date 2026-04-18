import { z } from "zod";
import type { LakeQuestsFile } from "@/types/quests";

export const QuestStatusZ = z.enum(["locked", "available", "active", "completed"]);
export const StepTypeZ   = z.enum(["presence", "technique", "catch", "journal"]);

export const CompletionRuleZ = z.object({
  requires_journal_entry: z.boolean(),
  requires_catch_entry: z.boolean(),
  tags_to_apply: z.array(z.string()).default([]),
  min_words: z.number().int().nonnegative().optional(),
  catch_filters: z.object({
    species: z.array(z.string()).optional(),
    released: z.boolean().nullable().optional()
  }).nullable().optional()
});

export const QuestStepZ = z.object({
  step_id: z.string().min(1),
  order: z.number().int().positive(),
  type: StepTypeZ,
  title: z.string().min(1),
  prompt: z.string().min(1),
  ui_hint: z.string().optional(),
  completion_rule: CompletionRuleZ,
  auto_link: z.object({
    journal: z.boolean().optional(),
    catch_ledger: z.boolean().optional()
  }).partial().optional(),
  skymap: z.object({
    star_tag: z.string().min(1),
    weight: z.number().int().positive().optional()
  }).optional()
});

export const QuestPrereqsZ = z.object({
  quests_completed: z.array(z.string()).optional(),
  tags_required: z.array(z.string()).optional(),
  min_entries: z.number().int().nonnegative().optional()
}).partial();

export const QuestZ = z.object({
  quest_id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  status: QuestStatusZ,
  lore_intro: z.string().optional(),
  prereqs: QuestPrereqsZ.optional(),
  steps: z.array(QuestStepZ).min(1),
  completion: z.object({
    lore_outro: z.string().optional(),
    rewards: z.object({
      unlock_lore_ids: z.array(z.string()).optional(),
      unlock_quest_ids: z.array(z.string()).optional(),
      badges: z.array(z.string()).optional()
    }).partial().optional()
  }).partial().optional(),
  telemetry: z.object({
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    version: z.number().int().positive().optional()
  }).partial().optional()
});

export const LakeQuestsFileZ = z.object({
  lake_id: z.string().min(1),
  version: z.number().int().positive(),
  updated_at: z.string().min(1),
  quests: z.array(QuestZ)
});

// Inferred Type (runtime-safe + compile-time)
export type LakeQuestsFileParsed = z.infer<typeof LakeQuestsFileZ> satisfies LakeQuestsFile;
