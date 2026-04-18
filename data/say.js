// /data/say.js
import rawVoices from "./papaVoice.json";

// Handle default-exported JSON (some bundlers)
const voices = rawVoices && rawVoices.default ? rawVoices.default : rawVoices;

const FALLBACK = ["Still water remembers. Cast with presence."];

// ---------- utils
const lower = (s) => String(s).toLowerCase();

function toLines(val) {
  if (!val) return null;
  if (Array.isArray(val)) {
    const arr = val
      .map((v) => (typeof v === "string" ? v : v && (v.text || v.line)))
      .filter(Boolean);
    return arr.length ? arr : null;
  }
  if (typeof val === "object") {
    for (const k of ["lines", "quotes", "sayings", "values"]) {
      const arr = toLines(val[k]);
      if (arr) return arr;
    }
  }
  return null;
}

function pick(arr, seed) {
  const pool = arr && arr.length ? arr : FALLBACK;
  const i = typeof seed === "number" ? Math.abs(seed) % pool.length : Math.floor(Math.random() * pool.length);
  return pool[i];
}

// direct top-level key
function getDirect(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
}

// direct top-level key, case-insensitive
function getDirectCI(obj, key) {
  const t = lower(key);
  const k = Object.keys(obj).find((kk) => lower(kk) === t);
  return k ? obj[k] : undefined;
}

// dot-path traversal
function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o && o[k] != null ? o[k] : undefined), obj);
}

// dot-path traversal, case-insensitive
function getPathCI(obj, path) {
  let cur = obj;
  for (const seg of path.split(".")) {
    if (!cur || typeof cur !== "object") return undefined;
    const key = Object.keys(cur).find((k) => lower(k) === lower(seg));
    if (!key) return undefined;
    cur = cur[key];
  }
  return cur;
}

// ---------- main
/**
 * say("chamber.species") → checks direct key first (your file's style),
 * then nested forms, then defaults.
 */
export function say(pathOrArray, seed) {
  // direct array supplied
  if (Array.isArray(pathOrArray)) return pick(toLines(pathOrArray) || FALLBACK, seed);

  const path = String(pathOrArray || "");
  const isChamber = path.toLowerCase().startsWith("chamber.");

  // 1) DIRECT top-level key (works with flat keys like "chamber.species")
  let lines = toLines(getDirect(voices, path));
  if (!lines) lines = toLines(getDirectCI(voices, path));

  // 2) NESTED path (supports { chamber: { species: [...] } } structure)
  if (!lines) lines = toLines(getPath(voices, path));
  if (!lines) lines = toLines(getPathCI(voices, path));

  // 3) For chamber.* also try without the prefix as a direct/nested key
  if (!lines && isChamber) {
    const alt = path.slice("chamber.".length);
    lines = toLines(getDirect(voices, alt)) || toLines(getDirectCI(voices, alt))
         || toLines(getPath(voices, alt))  || toLines(getPathCI(voices, alt));
  }

  // 4) Defaults
  if (!lines) lines = toLines(voices?.defaults);

  return pick(lines, seed);
}
