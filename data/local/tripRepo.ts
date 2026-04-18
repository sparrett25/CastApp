import { load, save } from "../../utils/persist";
import { mkId } from "../../utils/id";

export type Trip = {
  id: string;
  start_at: string; // ISO
  lake_id?: string;
  title: string;
  gear?: string[];
  bait?: string[];
  techniques?: string[];
  notes?: string;
  is_active: boolean;
};

const KEY = "trips";

export function listTrips(): Trip[] {
  return load<Trip[]>(KEY, []);
}

export function upsertTrip(t: Omit<Trip, "id" | "start_at"> & { id?: string }): Trip {
  const all = listTrips();
  const id = t.id ?? mkId("trip");
  const existingIdx = all.findIndex(x => x.id === id);
  const rec: Trip = { id, start_at: all[existingIdx]?.start_at ?? new Date().toISOString(), ...t };
  if (existingIdx >= 0) {
    all[existingIdx] = rec;
  } else {
    all.unshift(rec);
  }
  save(KEY, all);
  return rec;
}
