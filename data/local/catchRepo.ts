import { load, save } from "../../utils/persist.ts";
import { mkId } from "../../utils/id";

export type CatchEntry = {
  id: string;
  created_at: string;
  lake_id?: string;
  species: string;
  released: boolean | null;
  size?: string; // optional
  place?: string; // optional
  note?: string;
  tags: string[];
};

const KEY = "catches";

export function listCatches(): CatchEntry[] {
  return load<CatchEntry[]>(KEY, []);
}

export function addCatch(e: Omit<CatchEntry, "id" | "created_at">): CatchEntry {
  const id = mkId("catch");
  const created_at = new Date().toISOString();
  const rec: CatchEntry = { id, created_at, ...e };
  const all = listCatches();
  save(KEY, [rec, ...all]);
  return rec;
}
