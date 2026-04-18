import { load, save } from "../../utils/persist";
import { mkId } from "../../utils/id";

export type JournalEntry = {
  id: string;
  created_at: string; // ISO
  lake_id?: string;
  chapter_id?: string;
  text: string;
  tags: string[];
  word_count: number;
};

const KEY = "journal";

export function listJournal(): JournalEntry[] {
  return load<JournalEntry[]>(KEY, []);
}

export function addJournal(entry: Omit<JournalEntry, "id" | "created_at" | "word_count"> & { text: string }): JournalEntry {
  const all = listJournal();
  const id = mkId("jrnl");
  const created_at = new Date().toISOString();
  const word_count = entry.text.trim().split(/\s+/).filter(Boolean).length;
  const rec: JournalEntry = { id, created_at, word_count, ...entry };
  save(KEY, [rec, ...all]);
  return rec;
}
