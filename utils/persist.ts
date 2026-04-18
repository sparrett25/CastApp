const NS = "cast:v1";

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn("persist save failed", key, e);
  }
}

export function load<T = unknown>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${NS}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function remove(key: string) {
  try { localStorage.removeItem(`${NS}:${key}`); } catch {}
}
