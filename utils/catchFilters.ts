// src/utils/catchFilters.ts
export interface CatchEvidence {
  catchEntryId?: string;
  species?: string;          // normalized species name
  released?: boolean | null; // true/false/null according to your form
}

export interface CatchFilters {
  species?: string[];        // acceptable species; empty/undefined = any
  released?: boolean | null; // if defined, must match exactly
}

export function matchCatchFilters(
  filters: CatchFilters | null | undefined,
  evi: CatchEvidence | undefined
): boolean {
  if (!filters) return true; // no filters → always ok
  if (!evi?.catchEntryId) return false; // requires a real catch entry context

  // released flag check (strict equality when provided)
  if (typeof filters.released === "boolean") {
    if (evi.released !== filters.released) return false;
  }

  // species check (case-insensitive)
  if (filters.species && filters.species.length > 0) {
    const wanted = filters.species.map(s => s.trim().toLowerCase());
    const got = (evi.species ?? "").trim().toLowerCase();
    if (!wanted.includes(got)) return false;
  }

  return true;
}
