import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import "../styles/pages/catch-ledger.css";

// ── Storage ────────────────────────────────────────────────────
const STORAGE_KEY = "cast:v1:catch-ledger";

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

// ── Tampa-area locations Grant knows ──────────────────────────
const LOCATIONS = [
  "Scooter's backyard pond",
  "Alafia River",
  "Hillsborough River",
  "Cockroach Bay",
  "Other",
];

// ── Common species for quick-select ───────────────────────────
const QUICK_SPECIES = ["Bluegill", "Catfish", "Bass", "Nothing today"];

// ── Format date nicely ────────────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });
}

// ── New Entry Form ─────────────────────────────────────────────
function NewEntryForm({ onSave, onCancel }) {
  const [species, setSpecies]   = useState("");
  const [size, setSize]         = useState("");
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [released, setReleased] = useState(true);
  const [note, setNote]         = useState("");

  const handleSave = () => {
    if (!species.trim()) return;
    onSave({
      id: Date.now().toString(),
      species: species.trim(),
      size: size.trim(),
      location,
      released,
      note: note.trim(),
      date: new Date().toISOString(),
    });
  };

  return (
    <motion.div
      className="ledger-form-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="ledger-form-title">Log a catch</h3>

      {/* Quick-pick species */}
      <p className="ledger-field-label">What did you catch?</p>
      <div className="ledger-quick-row">
        {QUICK_SPECIES.map(s => (
          <button
            key={s}
            className={`ledger-quick-btn ${species === s ? "active" : ""}`}
            onClick={() => setSpecies(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <input
        className="ledger-input"
        placeholder="Or type a species..."
        value={species}
        onChange={e => setSpecies(e.target.value)}
      />

      {/* Size — optional */}
      <p className="ledger-field-label">Size <span className="ledger-optional">(optional)</span></p>
      <input
        className="ledger-input"
        placeholder='e.g. "about 8 inches"'
        value={size}
        onChange={e => setSize(e.target.value)}
      />

      {/* Location */}
      <p className="ledger-field-label">Where?</p>
      <div className="ledger-location-row">
        {LOCATIONS.map(l => (
          <button
            key={l}
            className={`ledger-location-btn ${location === l ? "active" : ""}`}
            onClick={() => setLocation(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Released */}
      <div className="ledger-released-row">
        <span className="ledger-field-label" style={{ margin: 0 }}>Released?</span>
        <button
          className={`catch-toggle ${released ? "active" : ""}`}
          onClick={() => setReleased(r => !r)}
        >
          {released ? "Yes" : "No"}
        </button>
      </div>

      {/* Note */}
      <p className="ledger-field-label">One line about how it went</p>
      <input
        className="ledger-input"
        placeholder="How did it feel?"
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <div className="ledger-form-actions">
        <button
          className="ledger-save-btn"
          onClick={handleSave}
          disabled={!species.trim()}
        >
          Save entry →
        </button>
        <button className="ledger-cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

// ── Single entry card ──────────────────────────────────────────
function EntryCard({ entry, isFirst }) {
  const noCatch = entry.species.toLowerCase().includes("nothing");

  return (
    <motion.div
      className={`ledger-entry-card ${noCatch ? "no-catch" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="ledger-entry-header">
        <div>
          <span className="ledger-entry-species">{entry.species}</span>
          {entry.size && (
            <span className="ledger-entry-size"> · {entry.size}</span>
          )}
          {isFirst && !noCatch && (
            <span className="ledger-first-badge">First catch</span>
          )}
        </div>
        <span className="ledger-entry-date">{formatDate(entry.date)}</span>
      </div>

      <div className="ledger-entry-meta">
        <span className="ledger-entry-location">📍 {entry.location}</span>
        {!noCatch && (
          <span className="ledger-entry-released">
            {entry.released ? "Released" : "Kept"}
          </span>
        )}
      </div>

      {entry.note && (
        <p className="ledger-entry-note">"{entry.note}"</p>
      )}
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="ledger-empty">
      <p className="ledger-empty-title">The ledger is waiting.</p>
      <p className="ledger-empty-sub">
        Every trip goes here — the good ones, the slow ones, and the ones where nothing bit. That's how you start to see the patterns.
      </p>
      <button className="ledger-add-btn" onClick={onAdd}>
        Log your first trip →
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function CatchLedgerPage() {
  const navigate  = useNavigate();
  const [entries, setEntries]     = useState(() => loadEntries());
  const [showForm, setShowForm]   = useState(false);
  const [firstSave, setFirstSave] = useState(false);

  const isFirstEntry = entries.length === 0;

  const handleSave = (entry) => {
    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    setShowForm(false);
    if (isFirstEntry) setFirstSave(true);
  };

  // Papa context — aware of catch count
  const papaContext = {
    event: entries.length === 0
      ? "Grant opened his empty catch ledger for the first time"
      : `Grant opened his catch ledger which has ${entries.length} ${entries.length === 1 ? "entry" : "entries"}`,
  };
  const papaKey = entries.length === 0 ? "fieldguide.open" : "fallback";

  return (
    <CastBackground chamberKey="catch-ledger">
      <ChamberLayout
        title="Catch Ledger"
        sub="Every trip. Every fish. Every day on the water."
        papa={<PapaMini context={papaContext} fallbackKey={papaKey} />}
      >
        <div className="ledger-page">

          {/* Papa's first-entry response */}
          <AnimatePresence>
            {firstSave && (
              <motion.div
                className="ledger-papa-response"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="adv-voice-attr">Papa</p>
                <PapaSpeaks
                  context={{
                    event: "Grant just logged his very first catch in his fishing ledger",
                    catchData: entries[0],
                  }}
                  fallbackKey="catch.first"
                  trigger="first-save"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add button */}
          {!showForm && entries.length > 0 && (
            <button
              className="ledger-add-btn"
              onClick={() => setShowForm(true)}
            >
              + Log a catch
            </button>
          )}

          {/* Form */}
          <AnimatePresence>
            {showForm && (
              <NewEntryForm
                onSave={handleSave}
                onCancel={() => setShowForm(false)}
              />
            )}
          </AnimatePresence>

          {/* Empty state */}
          {entries.length === 0 && !showForm && (
            <EmptyState onAdd={() => setShowForm(true)} />
          )}

          {/* Entry list */}
          {entries.length > 0 && (
            <div className="ledger-list">
              {entries.map((entry, i) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  isFirst={i === entries.length - 1}
                />
              ))}
            </div>
          )}

        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
