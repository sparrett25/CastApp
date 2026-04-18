// ── Trip storage utilities ────────────────────────────────────
const KEY = "cast:v1:trips";

export function getTrips() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function saveTrips(trips) {
  try { localStorage.setItem(KEY, JSON.stringify(trips)); }
  catch {}
}

export function getUpcomingTrip() {
  const trips = getTrips();
  const now = Date.now();
  // Find the most recent upcoming trip (planned, not completed)
  return trips.find(t => !t.completed && new Date(t.date).getTime() > now - 86400000) || null;
}

export function saveTrip(trip) {
  const existing = getTrips().filter(t => t.id !== trip.id);
  saveTrips([trip, ...existing]);
}

export function completeTrip(id, summary) {
  const trips = getTrips();
  const updated = trips.map(t =>
    t.id === id ? { ...t, completed: true, summary } : t
  );
  saveTrips(updated);
}

export function formatTripDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// ── Legacy aliases — keeps TripSummary.jsx working ────────────
export const formatWindow = formatTripDate;

export function getTrip(id) {
  const all = getTrips();
  return id ? all.find(t => t.id === id) : all[0];
}

export function upsertTripFields(id, fields) {
  const trips = getTrips();
  const updated = trips.map(t => t.id === id ? { ...t, ...fields } : t);
  saveTrips(updated);
  return updated.find(t => t.id === id);
}
