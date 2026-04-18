import type { CatchEntry } from "@/types/fishing";

// Example function using the type
function addCatch(entry: CatchEntry) {
  console.log("Logging catch:", entry.species_name, "at", entry.location.name);
}
