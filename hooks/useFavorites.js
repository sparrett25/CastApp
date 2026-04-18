import { useCallback, useMemo, useSyncExternalStore } from "react";

const LS_KEY = "cast:favorites";           // { gear:[], species:[], techniques:[], locations:[] }
const EVT_KEY = "favstore:update";         // custom event for same-tab updates

// --- stable snapshot: return the raw string, not a parsed object ---
function getSnapshotRaw() {
  // must return the *same* string when data hasn't changed
  const s = localStorage.getItem(LS_KEY);
  return s == null ? "null" : s;           // string identity drives updates
}

function subscribe(cb) {
  // react needs a stable callback on both storage + our custom event
  const handler = () => cb();
  window.addEventListener("storage", handler);
  window.addEventListener(EVT_KEY, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(EVT_KEY, handler);
  };
}

function parse(raw) {
  try { return JSON.parse(raw) ?? {}; } catch { return {}; }
}

function writeStore(nextObj) {
  localStorage.setItem(LS_KEY, JSON.stringify(nextObj));
  // notify this tab immediately
  window.dispatchEvent(new Event(EVT_KEY));
}

export function useFavorites(type) {
  // useSyncExternalStore requires stable subscribe + snapshot
  const raw = useSyncExternalStore(subscribe, getSnapshotRaw, getSnapshotRaw);
  const store = useMemo(() => parse(raw), [raw]);

  const set = new Set(store?.[type] ?? []);

  const isFav = useCallback((id) => set.has(id), [set]);

  const toggleFav = useCallback((id) => {
    const curr = parse(getSnapshotRaw());
    const nextSet = new Set(curr[type] ?? []);
    nextSet.has(id) ? nextSet.delete(id) : nextSet.add(id);
    const next = { ...curr, [type]: Array.from(nextSet) };
    writeStore(next);
  }, [type]);

  return { isFav, toggleFav, favSet: set };
}

export function byFavFirst(list, getId, favSet) {
  return [...list].sort((a, b) => {
    const af = favSet.has(getId(a)) ? 1 : 0;
    const bf = favSet.has(getId(b)) ? 1 : 0;
    if (af !== bf) return bf - af;               // favorites first
    return String(getId(a)).localeCompare(String(getId(b)));
  });
}
