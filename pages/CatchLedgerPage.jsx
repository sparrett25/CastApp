import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import { supabase } from "../lib/supabase";
import { getAllLocations } from "../utils/castData";
import "../styles/pages/catch-ledger.css";
import {
  buildPapaPageContext,
  buildEntriesSummary,
} from "../utils/buildPapaPageContext";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";


// ── Canonical location options + Other ────────────────────────
const LOCATION_OPTIONS = [
  ...getAllLocations().map((loc) => ({
    id: loc.id,
    label: loc.name,
  })),
  { id: "other", label: "Other" },
];

// ── Quick species for fast logging ────────────────────────────
const QUICK_SPECIES = [
  { id: "bluegill", label: "Bluegill" },
  { id: "largemouth-bass", label: "Largemouth Bass" },
  { id: "channel-catfish", label: "Channel Catfish" },
  { id: "nothing-today", label: "Nothing today" },
];

// ── Format date nicely ────────────────────────────────────────
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── New Entry Form ─────────────────────────────────────────────
function NewEntryForm({
  onSave,
  onCancel,
  existingEntries,
  cardTheme,
  inputTheme,
  buttonTheme,
  chipTheme,
  textTheme,
}) {
  const [species, setSpecies] = useState("");
  const [speciesKey, setSpeciesKey] = useState(null);

  const [size, setSize] = useState("");

  const [location, setLocation] = useState(LOCATION_OPTIONS[0]?.label || "");
  const [locationKey, setLocationKey] = useState(LOCATION_OPTIONS[0]?.id || null);

  const [released, setReleased] = useState(true);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const isNoCatch = species.trim().toLowerCase() === "nothing today";

  const handleQuickSpecies = (option) => {
    setSpecies(option.label);
    setSpeciesKey(option.id === "nothing-today" ? null : option.id);
  };

  const handleSpeciesInput = (value) => {
    setSpecies(value);
    setSpeciesKey(null);
  };

  const handleLocationPick = (opt) => {
    setLocation(opt.label);
    setLocationKey(opt.id === "other" ? null : opt.id);
  };

  const handleSave = async () => {
    if (!species.trim()) return;

    setSaveError("");
    setSaving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to log a catch.");

      const entryDate = new Date().toISOString();
      const isFirstCatch =
        !isNoCatch &&
        !existingEntries.some((entry) => !entry.is_no_catch);

      const payload = {
        user_id: user.id,
        species: species.trim(),
        species_key: isNoCatch ? null : speciesKey,
        location: location,
        location_key: locationKey,
        size_text: size.trim() || null,
        kept_or_released: isNoCatch ? null : released ? "released" : "kept",
        notes: note.trim() || null,
        catch_date: entryDate,
        is_first_catch: isFirstCatch,
        is_no_catch: isNoCatch,
      };

      const { data, error } = await supabase
        .from("cast_catch_logs")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      onSave(data);
    } catch (err) {
      console.error("Catch save error:", err);
      setSaveError(err.message || "Could not save catch.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
  className="ledger-form-card"
	  style={{
		background: cardTheme?.bg,
		border: `1px solid ${cardTheme?.border}`,
		backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
		WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
		boxShadow: cardTheme?.shadow,
	  }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="ledger-form-title">Log a catch</h3>

      <p className="ledger-field-label">What did you catch?</p>
      <div className="ledger-quick-row">
        {QUICK_SPECIES.map((s) => (
		
          <button
            key={s.id}
            className={`ledger-quick-btn ${species === s.label ? "active" : ""}`}
			style={{
			  background: species === s.label ? chipTheme?.activeBg : chipTheme?.bg,
			  border: `1px solid ${chipTheme?.border || buttonTheme?.border}`,
			  color: chipTheme?.text,
			}}
            onClick={() => handleQuickSpecies(s)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <input
        className="ledger-input"
        placeholder="Or type a species..."
        value={species}
		style={{
		  background: inputTheme?.bg,
		  border: `1px solid ${inputTheme?.border}`,
		  color: inputTheme?.text,
		}}
        onChange={(e) => handleSpeciesInput(e.target.value)}
      />

      <p className="ledger-field-label">
        Size <span className="ledger-optional">(optional)</span>
      </p>
      <input
        className="ledger-input"
        placeholder='e.g. "about 8 inches"'
        value={size}
		style={{
		  background: inputTheme?.bg,
		  border: `1px solid ${inputTheme?.border}`,
		  color: inputTheme?.text,
		}}
        onChange={(e) => setSize(e.target.value)}
        disabled={isNoCatch}
      />

      <p className="ledger-field-label">Where?</p>
      <div className="ledger-location-row">
        {LOCATION_OPTIONS.map((l) => (
          <button
            key={l.id}
            className={`ledger-location-btn ${location === l.label ? "active" : ""}`}
			style={{
			  background: location === l.label ? chipTheme?.activeBg : chipTheme?.bg,
			  border: `1px solid ${chipTheme?.border || buttonTheme?.border}`,
			  color: chipTheme?.text,
			}}
            onClick={() => handleLocationPick(l)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="ledger-released-row">
        <span className="ledger-field-label" style={{ margin: 0 }}>
          Released?
        </span>
        <button
          className={`catch-toggle ${released ? "active" : ""}`}
		  style={{
			  background: released ? chipTheme?.activeBg : chipTheme?.bg,
			  border: `1px solid ${chipTheme?.border || buttonTheme?.border}`,
			  color: chipTheme?.text,
			}}
          onClick={() => setReleased((r) => !r)}
          disabled={isNoCatch}
        >
          {released ? "Yes" : "No"}
        </button>
      </div>

      <p className="ledger-field-label">One line about how it went</p>
      <input
        className="ledger-input"
        placeholder="How did it feel?"
        value={note}
		style={{
		  background: inputTheme?.bg,
		  border: `1px solid ${inputTheme?.border}`,
		  color: inputTheme?.text,
		}}
        onChange={(e) => setNote(e.target.value)}
      />

      {saveError && <p className="ledger-error">{saveError}</p>}

      <div className="ledger-form-actions">
        <button
          className="ledger-save-btn"
		  style={{
			  background: buttonTheme?.primaryBg,
			  border: `1px solid ${buttonTheme?.border}`,
			  color: buttonTheme?.text,
			}}
          onClick={handleSave}
          disabled={!species.trim() || saving}
        >
          {saving ? "Saving..." : "Save entry →"}
        </button>
        <button className="ledger-cancel-btn" 
		style={{
		  background: buttonTheme?.secondaryBg,
		  border: `1px solid ${buttonTheme?.border}`,
		  color: buttonTheme?.text,
		}}
		onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

// ── Single entry card ──────────────────────────────────────────
function EntryCard({ entry, cardTheme, chipTheme, textTheme }) {
  const noCatch = entry.is_no_catch;

  return (
    <motion.div
      className={`ledger-entry-card ${noCatch ? "no-catch" : ""}`}
	  style={{
		  background: cardTheme?.bg,
		  border: `1px solid ${cardTheme?.border}`,
		  backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
		  WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
		  boxShadow: cardTheme?.shadow,
		  color: textTheme?.primary,
		}}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="ledger-entry-header">
        <div>
          <span className="ledger-entry-species">{entry.species}</span>
          {entry.size_text && <span className="ledger-entry-size"> · {entry.size_text}</span>}
          {entry.is_first_catch && !noCatch && (
            <span className="ledger-first-badge">First catch</span>
          )}
        </div>
        <span className="ledger-entry-date">{formatDate(entry.catch_date)}</span>
      </div>

      <div className="ledger-entry-meta">
        <span className="ledger-entry-location">📍 {entry.location}</span>
        {!noCatch && entry.kept_or_released && (
          <span className="ledger-entry-released">
            {entry.kept_or_released === "released" ? "Released" : "Kept"}
          </span>
        )}
      </div>

      {entry.notes && <p className="ledger-entry-note">"{entry.notes}"</p>}
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────
function EmptyState({ onAdd, cardTheme, buttonTheme, textTheme }) {
  return (
    <div
  className="ledger-empty"
	  style={{
		background: cardTheme?.bg,
		border: `1px solid ${cardTheme?.border}`,
		color: textTheme?.primary,
	  }}
	>
      <p className="ledger-empty-title">The ledger is waiting.</p>
      <p className="ledger-empty-sub">
        Every trip goes here — the good ones, the slow ones, and the ones where
        nothing bit. That&apos;s how you start to see the patterns.
      </p>
      <button className="ledger-add-btn" 
	  style={{
		  background: buttonTheme?.primaryBg,
		  border: `1px solid ${buttonTheme?.border}`,
		  color: buttonTheme?.text,
		}}
	  onClick={onAdd}>
        Log your first trip →
      </button>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function CatchLedgerPage() {
    
  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("catchLedger");

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE)
    : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? {};

  const inputTheme = ui.input;
  const buttonTheme = ui.button;
  const cardTheme = ui.card;
  const textTheme = ui.text;
    
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [firstSave, setFirstSave] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadEntries() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) {
          if (isMounted) setEntries([]);
          return;
        }

        const { data, error } = await supabase
          .from("cast_catch_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("catch_date", { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setEntries(data ?? []);
        }
      } catch (err) {
        console.error("Catch ledger load error:", err);
        if (isMounted) {
          setEntries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  const isFirstEntry = entries.length === 0;

  const handleSave = (entry) => {
    const updated = [entry, ...entries];
    setEntries(updated);
    setShowForm(false);

    if (isFirstEntry && !entry.is_no_catch) {
      setFirstSave(true);
    }
  };

  const papaContext = {
    event:
      entries.length === 0
        ? "Grant opened his empty catch ledger for the first time"
        : `Grant opened his catch ledger which has ${entries.length} ${
            entries.length === 1 ? "entry" : "entries"
          }`,
  };

  const papaKey = entries.length === 0 ? "fieldguide.open" : "fallback";

  return (
    <CastBackground
  chamberKey="catch-ledger"
	  variant={scene?.backgroundVariant}
	  overlay={scene?.timeState?.ui?.overlay}
	>
      <ChamberLayout
        papa={<PapaMini context={buildPapaPageContext("catch ledger", {
		  entriesSummary: buildEntriesSummary(entries),
		})} fallbackKey={papaKey} />}
      >
        <div className="ledger-page">
          <AnimatePresence>
            {firstSave && entries[0] && (
              <motion.div
                className="ledger-papa-response"
				style={{
				  background: bubbleTheme?.papaBg,
				  border: `1px solid ${bubbleTheme?.border}`,
				  backdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
				  WebkitBackdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
				  boxShadow: bubbleTheme?.shadow,
				  color: bubbleTheme?.text,
				}}
				
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="adv-voice-attr">Papa</p>
                <PapaSpeaks
                  context={buildPapaPageContext("catch ledger", {
				  event: "Grant just logged a new catch.",
				  catchData: entries[0],
				})}
                  fallbackKey="catch.first"
                  trigger="first-save"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!showForm && entries.length > 0 && (
            <button
			  className="ledger-add-btn"
			  onClick={() => setShowForm(true)}
			  style={{
				background: buttonTheme?.primaryBg,
				border: `1px solid ${buttonTheme?.border}`,
				color: buttonTheme?.text,
			  }}
			>
              + Log a catch
            </button>
          )}

          <AnimatePresence>
            {showForm && (
              <NewEntryForm
			  existingEntries={entries}
			  onSave={handleSave}
			  onCancel={() => setShowForm(false)}
			  cardTheme={cardTheme}
			  inputTheme={inputTheme}
			  buttonTheme={buttonTheme}
			  chipTheme={ui.chip}
			  textTheme={textTheme}
			/>
            )}
          </AnimatePresence>

          {!loading && entries.length === 0 && !showForm && (
            <EmptyState
			  onAdd={() => setShowForm(true)}
			  cardTheme={cardTheme}
			  buttonTheme={buttonTheme}
			  textTheme={textTheme}
			/>
          )}

          {loading && (
            <div
			  className="ledger-empty"
			  style={{
				background: cardTheme?.bg,
				border: `1px solid ${cardTheme?.border}`,
				color: textTheme?.primary,
			  }}
			>
              <p className="ledger-empty-title">Loading ledger...</p>
            </div>
          )}

          {entries.length > 0 && (
            <div className="ledger-list">
              {entries.map((entry) => (
                <EntryCard
				  key={entry.id}
				  entry={entry}
				  cardTheme={cardTheme}
				  chipTheme={ui.chip}
				  textTheme={textTheme}
				/>
              ))}
            </div>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}