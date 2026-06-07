import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";

import { supabase } from "../lib/supabase";
import { MY_LOCATIONS } from "../data/myLocations";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";

import {
  buildPapaPageContext,
  buildEntriesSummary,
} from "../utils/buildPapaPageContext";

import "../styles/pages/catch-ledger.css";

import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

import { getAtmosphereRegionKey } from "../utils/resolveChamberBackground";

const LOCATION_OPTIONS = [
  ...MY_LOCATIONS.map((loc) => ({
    id: loc.id,
    label: loc.name,
  })),
  { id: "other", label: "Other" },
];

const QUICK_SPECIES = [
  { id: "bluegill", label: "Bluegill" },
  { id: "largemouth-bass", label: "Largemouth Bass" },
  { id: "channel-catfish", label: "Channel Catfish" },
  { id: "nothing-today", label: "Nothing today" },
];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NewEntryForm({
  onSave,
  onCancel,
  existingEntries,
  cardStyle,
  inputStyle,
  buttonPrimaryStyle,
  buttonSecondaryStyle,
  chipTheme,
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

  const chipStyle = (active = false) => ({
    background: active ? chipTheme?.activeBg : chipTheme?.bg,
    border: `1px solid ${chipTheme?.border ?? "rgba(255,255,255,0.14)"}`,
    color: chipTheme?.text,
  });

  function handleQuickSpecies(option) {
    setSpecies(option.label);
    setSpeciesKey(option.id === "nothing-today" ? null : option.id);
  }

  function handleSpeciesInput(value) {
    setSpecies(value);
    setSpeciesKey(null);
  }

  function handleLocationPick(opt) {
    setLocation(opt.label);
    setLocationKey(opt.id === "other" ? null : opt.id);
  }

  async function handleSave() {
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
        !isNoCatch && !existingEntries.some((entry) => !entry.is_no_catch);

      const payload = {
        user_id: user.id,
        species: species.trim(),
        species_key: isNoCatch ? null : speciesKey,
        location,
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
  }

  return (
    <motion.div
      className="ledger-form-card"
      style={cardStyle}
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
            style={chipStyle(species === s.label)}
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
        style={inputStyle}
        onChange={(e) => handleSpeciesInput(e.target.value)}
      />

      <p className="ledger-field-label">
        Size <span className="ledger-optional">(optional)</span>
      </p>
      <input
        className="ledger-input"
        placeholder='e.g. "about 8 inches"'
        value={size}
        style={inputStyle}
        onChange={(e) => setSize(e.target.value)}
        disabled={isNoCatch}
      />

      <p className="ledger-field-label">Where?</p>
      <div className="ledger-location-row">
        {LOCATION_OPTIONS.map((l) => (
          <button
            key={l.id}
            className={`ledger-location-btn ${locationKey === l.id ? "active" : ""}`}
			style={chipStyle(locationKey === l.id)}
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
          style={chipStyle(released)}
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
        style={inputStyle}
        onChange={(e) => setNote(e.target.value)}
      />

      {saveError && <p className="ledger-error">{saveError}</p>}

      <div className="ledger-form-actions">
        <button
          className="ledger-save-btn"
          style={buttonPrimaryStyle}
          onClick={handleSave}
          disabled={!species.trim() || saving}
        >
          {saving ? "Saving..." : "Save entry →"}
        </button>

        <button
          className="ledger-cancel-btn"
          style={buttonSecondaryStyle}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
}

function EntryCard({ entry, cardStyle, chipTheme, textTheme }) {
  const noCatch = entry.is_no_catch;

  const badgeStyle = {
    background: chipTheme?.activeBg ?? chipTheme?.bg,
    border: `1px solid ${chipTheme?.border ?? "rgba(255,255,255,0.14)"}`,
    color: chipTheme?.text,
  };

  return (
    <motion.div
      className={`ledger-entry-card ${noCatch ? "no-catch" : ""}`}
      style={cardStyle}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="ledger-entry-header">
        <div>
          <span className="ledger-entry-species">{entry.species}</span>
          {entry.size_text && (
            <span className="ledger-entry-size"> · {entry.size_text}</span>
          )}
          {entry.is_first_catch && !noCatch && (
            <span className="ledger-first-badge" style={badgeStyle}>
              First catch
            </span>
          )}
        </div>

        <span className="ledger-entry-date" style={{ color: textTheme?.secondary }}>
          {formatDate(entry.catch_date)}
        </span>
      </div>

      <div className="ledger-entry-meta" style={{ color: textTheme?.secondary }}>
        <span className="ledger-entry-location">📍 {entry.location}</span>
        {!noCatch && entry.kept_or_released && (
          <span className="ledger-entry-released">
            {entry.kept_or_released === "released" ? "Released" : "Kept"}
          </span>
        )}
      </div>

      {entry.notes && <p className="ledger-entry-note">“{entry.notes}”</p>}
    </motion.div>
  );
}

function EmptyState({ onAdd, cardStyle, buttonPrimaryStyle, textTheme }) {
  return (
    <div className="ledger-empty" style={cardStyle}>
      <p className="ledger-empty-title">The ledger is waiting.</p>
      <p className="ledger-empty-sub" style={{ color: textTheme?.secondary }}>
        Every trip goes here — the good ones, the slow ones, and the ones where
        nothing bit. That&apos;s how you start to see the patterns.
      </p>
      <button
        className="ledger-add-btn"
        style={buttonPrimaryStyle}
        onClick={onAdd}
      >
        Log your first trip →
      </button>
    </div>
  );
}

export default function CatchLedgerPage() {
  const DEBUG_SCENE = null;

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [firstSave, setFirstSave] = useState(false);

  const { profilePacket } = useProfile();

  const displayName =
    profilePacket?.display_name ||
    profilePacket?.username ||
    profilePacket?.name ||
    "friend";

  const atmosphere = useAtmosphere("catchLedger", {
    user: profilePacket,
    context: {
      entryCount: entries.length,
      isEmpty: entries.length === 0,
      showForm,
      firstSave,
      latestEntry: entries[0] ?? null,
    },
  });

  const scene = DEBUG_SCENE ? getScene(DEBUG_SCENE) : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);

const atmospherePacket = buildAtmospherePacket({
  page: "catchLedger",
  region: resolvedRegion,
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weatherState?.id || scene?.weather || "base",
  user: profilePacket,
 
});

  const cardStyle = styles.cardStyle ?? {};
  const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
  const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
  const inputStyle = styles.inputStyle ?? {};
  const textTheme = ui.text ?? {};
  const chipTheme = ui.chip ?? {};
  const bubbleTheme = ui.bubble ?? {};

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};

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

        if (isMounted) setEntries(data ?? []);
      } catch (err) {
        console.error("Catch ledger load error:", err);
        if (isMounted) setEntries([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  const isFirstEntry = entries.length === 0;
  
  const [showHistory, setShowHistory] = useState(false);
  const recentEntries = entries.slice(0, 2);
  const visibleEntries = showHistory ? entries : recentEntries;
  

  function handleSave(entry) {
    setEntries((current) => [entry, ...current]);
    setShowForm(false);

    if (isFirstEntry && !entry.is_no_catch) {
      setFirstSave(true);
    }
  }

  const papaContext = {
    user: profilePacket,
    atmosphere: atmospherePacket,
	scene,
    event:
      entries.length === 0
        ? `${displayName} opened an empty catch ledger for the first time`
        : `${displayName} opened the catch ledger which has ${entries.length} ${
            entries.length === 1 ? "entry" : "entries"
          }`,
  };

  const papaKey = entries.length === 0 ? "fieldguide.open" : "fallback";

  const papaBubbleStyle = {
    background: bubbleTheme?.papaBg,
    border: `1px solid ${bubbleTheme?.border ?? "rgba(255,255,255,0.12)"}`,
    backdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
    WebkitBackdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
    boxShadow: bubbleTheme?.shadow,
    color: bubbleTheme?.text,
  };

  return (
    <CastBackground
      chamberKey="catchLedger"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
  signature={
    <div className="cast-atmosphere-signature cast-atmosphere-signature--inline">
      <span>
        {atmosphereSignature.page} • {atmosphereSignature.region} •{" "}
        {atmosphereSignature.time}
        {atmosphereSignature.weather &&
        atmosphereSignature.weather !== "Base" &&
        atmosphereSignature.weather !== "base"
          ? ` • ${atmosphereSignature.weather}`
          : ""}
      </span>
    </div>
  }
        papa={
          <PapaMini
            context={buildPapaPageContext("catch-ledger", {
              ...papaContext,
              entriesSummary: buildEntriesSummary(entries),
            })}
            fallbackKey={papaKey}
          />
        }
      >
        <div className="ledger-page">
          <AnimatePresence>
            {firstSave && entries[0] && (
              <motion.div
                className="ledger-papa-response"
                style={papaBubbleStyle}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="adv-voice-attr">Papa</p>
                <PapaSpeaks
                  context={buildPapaPageContext("catch-ledger", {
                    user: profilePacket,
                    atmosphere: scene,
                    event: `${displayName} just logged a new catch.`,
                    catchData: entries[0],
                  })}
                  fallbackKey="catch.first"
                  trigger="first-save"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!showForm && entries.length > 0 && !showHistory && (
            <button
              className="ledger-add-btn"
              onClick={() => setShowForm(true)}
              style={buttonPrimaryStyle}
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
                cardStyle={cardStyle}
                inputStyle={inputStyle}
                buttonPrimaryStyle={buttonPrimaryStyle}
                buttonSecondaryStyle={buttonSecondaryStyle}
                chipTheme={chipTheme}
              />
            )}
          </AnimatePresence>

          {!loading && entries.length === 0 && !showForm && (
            <EmptyState
              onAdd={() => setShowForm(true)}
              cardStyle={cardStyle}
              buttonPrimaryStyle={buttonPrimaryStyle}
              textTheme={textTheme}
            />
          )}

          {loading && (
            <div className="ledger-empty" style={cardStyle}>
              <p className="ledger-empty-title">Loading ledger...</p>
            </div>
          )}

          {entries.length > 0 && !showForm && (
			  <>
				<div className="ledger-list">
				  {visibleEntries.map((entry) => (
					<EntryCard
					  key={entry.id}
					  entry={entry}
					  cardStyle={cardStyle}
					  chipTheme={chipTheme}
					  textTheme={textTheme}
					/>
				  ))}
				</div>

				{entries.length > 2 && (
				  <button
					className="ledger-history-btn"
					style={buttonSecondaryStyle}
					onClick={() => setShowHistory((v) => !v)}
				  >
					{showHistory ? "← Recent catches" : "View full catch history →"}
				  </button>
				)}
			  </>
			)}
	  
		  
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}