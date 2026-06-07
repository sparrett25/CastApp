// src/pages/TripPlanner.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";

import { formatTripDate } from "../utils/trips";
import { supabase } from "../lib/supabase";
import { useProfile } from "../context/ProfileContext";

import "../styles/pages/trip-planner.css";

import {
  getAllLocations,
  getLocationById,
  getPrimarySpeciesForLocation,
  getAdditionalSpeciesForLocation,
} from "../utils/castData";

import {
  buildPapaPageContext,
  buildTripContext,
} from "../utils/buildPapaPageContext";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

const DURATIONS = [
  { id: "quick", label: "Quick trip", sub: "1–2 hours" },
  { id: "half", label: "Half day", sub: "3–4 hours" },
  { id: "full", label: "Full day", sub: "All day" },
];

const WHEN_OPTIONS = [
  { id: "today", label: "Today", offset: 0 },
  { id: "tomorrow", label: "Tomorrow", offset: 1 },
  { id: "weekend", label: "This weekend", offset: null },
  { id: "custom", label: "Pick a day", offset: null },
];

function getDateForOption(option) {
  if (!option) return null;

  if (option.offset !== null) {
    const d = new Date();
    d.setDate(d.getDate() + option.offset);
    return d.toISOString().split("T")[0];
  }

  if (option.id === "weekend") {
    const d = new Date();
    const day = d.getDay();
    const daysUntilSat = day === 6 ? 7 : 6 - day;
    d.setDate(d.getDate() + daysUntilSat);
    return d.toISOString().split("T")[0];
  }

  return null;
}

function buildChecklist(waterId, targetId) {
  const base = ["Rod and reel", "Tackle box", "Sunscreen", "Water bottle", "Hat"];
  const extras = [];

  if (targetId === "bluegill" || targetId === "redear-sunfish") {
    extras.push("Small hooks and worms", "Bobber");
  }

  if (targetId === "largemouth-bass") {
    extras.push("Soft plastic worms", "Texas rig setup", "Spinnerbait");
  }

  if (targetId === "channel-catfish") {
    extras.push("Chicken liver or stink bait", "Bottom rig");
  }

  if (targetId === "black-crappie") {
    extras.push("Light jig heads", "Small soft plastics or minnows");
  }

  if (targetId === "bowfin" || targetId === "gar" || targetId === "sunshine-bass") {
    extras.push("Heavier leader", "Pliers");
  }

  if (waterId === "morris-bridge") {
    extras.push("Bug spray");
  }

  if (waterId === "hardee-lakes" || waterId === "edward-medard") {
    extras.push("Polarized sunglasses");
  }

  return [...extras, ...base];
}

function getScooterAdvice(waterId, targetId) {
  if (waterId === "backyard-pond" && targetId === "bluegill") {
    return "Start at the shady edge and keep it simple. This pond rewards patience more than distance.";
  }

  if (waterId === "backyard-pond") {
    return "This is familiar water. Watch the bank, the shade, and the still pockets before your first cast.";
  }

  if (waterId === "edward-medard" && targetId === "largemouth-bass") {
    return "Start around shoreline grass, contour changes, and any cover that breaks the open water. Slow down and let structure guide you.";
  }

  if (waterId === "edward-medard") {
    return "This water teaches broad patterning. Look for shoreline grass, flats, and places where structure changes quietly.";
  }

  if (waterId === "morris-bridge") {
    return "Read the roots, timber, and current breaks before you cast. Fish here hold where the water gives them an easier place to wait.";
  }

  if (waterId === "hardee-lakes") {
    return "Choose your water with intention. Look for attractors, vegetation edges, and the lake that feels most alive today.";
  }

  return "Read the water before your first cast. Give yourself two minutes just to look.";
}

function inferWhenIdFromTripDate(tripDate) {
  if (!tripDate) return null;

  const today = new Date().toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = tomorrow.toISOString().split("T")[0];

  if (tripDate === today) return "today";
  if (tripDate === tomorrowKey) return "tomorrow";

  return "custom";
}

function findDurationId(durationLabel = "") {
  const found = DURATIONS.find((d) => durationLabel.includes(d.label));
  return found?.id || null;
}

export default function TripPlanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  const isEditing = location.state?.mode === "edit";
  const editingTripId = location.state?.tripId || null;

  const [step, setStep] = useState(1);
  const [whenId, setWhenId] = useState(null);
  const [customDate, setCustomDate] = useState("");
  const [waterId, setWaterId] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [durationId, setDurationId] = useState(null);
  const [trip, setTrip] = useState(null);
  const [existingTrip, setExistingTrip] = useState(null);

  const [saving, setSaving] = useState(false);
  const [loadingTrip, setLoadingTrip] = useState(Boolean(isEditing && editingTripId));
  const [saveError, setSaveError] = useState("");
  const [showOtherTargets, setShowOtherTargets] = useState(false);

  const allLocations = getAllLocations();
  const selectedWater = getLocationById(waterId);

  const primaryTargets = waterId ? getPrimarySpeciesForLocation(waterId, 3) : [];
  const additionalTargets = waterId ? getAdditionalSpeciesForLocation(waterId, 3) : [];

  const selectedTarget =
    [...primaryTargets, ...additionalTargets].find((t) => t.id === targetId) || null;

  const selectedDuration = DURATIONS.find((d) => d.id === durationId);
  const selectedWhen = WHEN_OPTIONS.find((w) => w.id === whenId);

  const resolvedDate =
    whenId === "custom" ? customDate : whenId ? getDateForOption(selectedWhen) : null;

  const atmosphere = useAtmosphere("planTrip", {
    user: profilePacket,
    context: {
      step,
      isEditing,
      selectedWater,
      selectedTarget,
      selectedDuration,
      hasResolvedDate: Boolean(resolvedDate),
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          step,
          isEditing,
          selectedWater,
          selectedTarget,
          selectedDuration,
        },
      })
    : atmosphere.scene;

const atmospherePacket = buildAtmospherePacket({
  page: "planTrip",
  region: scene?.regionKey || profilePacket?.favoriteRegion || "central-florida",
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weather || "base",
  user: profilePacket,
  context: {
  step,
  isEditing,
  selectedWater,
  selectedTarget,
  selectedDuration,
  hasResolvedDate: Boolean(resolvedDate),
},
});

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const cardStyle = styles.cardStyle ?? {};
  const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
  const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
  const inputStyle = styles.inputStyle ?? {};
  const transparentButtonStyle = styles.transparentButtonStyle ?? {};
  const textTheme = ui.text ?? {};

  useEffect(() => {
    let isMounted = true;

    async function loadExistingTrip() {
      if (!isEditing || !editingTripId) return;

      try {
        setLoadingTrip(true);
        setSaveError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("You must be logged in to edit this trip.");

        const { data, error } = await supabase
          .from("cast_trip_plans")
          .select("*")
          .eq("id", editingTripId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Trip not found.");

        if (!isMounted) return;

        setExistingTrip(data);
        setWaterId(data.location_key || null);
        setTargetId(data.target_species_keys?.[0] || null);
        setDurationId(findDurationId(data.duration_label));

        const inferredWhen = inferWhenIdFromTripDate(data.trip_date);
        setWhenId(inferredWhen);

        if (inferredWhen === "custom") {
          setCustomDate(data.trip_date || "");
        }
      } catch (err) {
        console.error("Trip edit load error:", err);
        if (isMounted) setSaveError(err.message || "Could not load trip.");
      } finally {
        if (isMounted) setLoadingTrip(false);
      }
    }

    loadExistingTrip();

    return () => {
      isMounted = false;
    };
  }, [isEditing, editingTripId]);

  useEffect(() => {
    if (!waterId) return;

    if (!isEditing || !existingTrip) {
      setTargetId(null);
    }

    setShowOtherTargets(false);
  }, [waterId, isEditing, existingTrip]);

  const chamberPapaContext = useMemo(() => {
    const event =
      step === 1
        ? isEditing
          ? "The angler is adjusting when a fishing trip will happen."
          : "The angler is deciding when to go fishing."
        : step === 2
        ? "The angler is choosing where to fish."
        : step === 3
        ? "The angler is choosing what they are after."
        : step === 4
        ? "The angler is deciding how long to stay."
        : isEditing
        ? "The angler has updated a fishing trip."
        : "The angler has planned a fishing trip.";

    return buildPapaPageContext("planTrip", {
      user: profilePacket,
      atmosphere: atmospherePacket,
	  scene,
      event,
      trip: buildTripContext(trip),
    });
  }, [step, trip, isEditing, profilePacket, scene]);

  const summaryPapaContext = useMemo(() => {
    if (!trip) return null;

    return {
      page: "planTrip",
      user: profilePacket,
      atmosphere: atmospherePacket,
	  scene,
      event: isEditing
        ? "A fishing trip has been updated."
        : "A fishing trip has been planned.",
      trip: {
        location: trip.water?.name,
        target: trip.target?.label,
        when: trip.whenLabel?.toLowerCase(),
        duration: trip.duration?.label,
      },
    };
  }, [trip, isEditing, profilePacket, scene]);

  async function handleFinish() {
    setSaveError("");
    setSaving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to plan a trip.");

      const whenLabel =
        whenId === "custom" ? formatTripDate(customDate) : selectedWhen?.label;

      const checklist = buildChecklist(waterId, targetId);
      const scooterAdvice = getScooterAdvice(waterId, targetId);

      const payload = {
        user_id: user.id,
        title: selectedWater?.name || "Planned Trip",
        location: selectedWater?.name || "",
        location_key: selectedWater?.id || null,
        trip_date: resolvedDate || null,
        timing_label: whenLabel || null,
        target_species: selectedTarget ? [selectedTarget.label] : [],
        target_species_keys: selectedTarget ? [selectedTarget.id] : [],
        duration_label: selectedDuration
          ? `${selectedDuration.label} · ${selectedDuration.sub}`
          : null,
        checklist_items: checklist,
        scooter_note: scooterAdvice,
        papa_note:
          existingTrip?.papa_note || "The water has a way of speaking if we listen.",
        summary_text: `Targeting ${selectedTarget?.label} · ${selectedDuration?.sub}`,
        status: existingTrip?.status || "planned",
      };

      let response;

      if (isEditing && editingTripId) {
        response = await supabase
          .from("cast_trip_plans")
          .update(payload)
          .eq("id", editingTripId)
          .eq("user_id", user.id)
          .select()
          .single();
      } else {
        response = await supabase
          .from("cast_trip_plans")
          .insert(payload)
          .select()
          .single();
      }

      if (response.error) throw response.error;

      const data = response.data;

      const savedTrip = {
        id: data.id,
        date: data.trip_date,
        whenLabel,
        water: selectedWater,
        target: selectedTarget,
        duration: selectedDuration,
        checklist,
        scooterAdvice,
        papaNote: data.papa_note,
        completed: data.status === "completed",
        createdAt: data.created_at,
      };

      setTrip(savedTrip);
      setStep(5);
    } catch (err) {
      console.error("Trip save error:", err);
      setSaveError(err.message || "Could not save trip.");
    } finally {
      setSaving(false);
    }
  }

  function resetPlanner() {
    setStep(1);
    setWhenId(null);
    setCustomDate("");
    setWaterId(null);
    setTargetId(null);
    setDurationId(null);
    setTrip(null);
    setExistingTrip(null);
    setSaveError("");
  }

  if (loadingTrip) {
    return (
      <CastBackground
        chamberKey="planTrip"
        variant={scene?.backgroundVariant}
        overlay={ui.overlay}
      >
        <ChamberLayout
          papa={
            <PapaMini
              context={{
                page: "planTrip",
                user: profilePacket,
                atmosphere: atmospherePacket,
				scene,
                event: "Loading a saved fishing trip for editing.",
              }}
              fallbackKey="fallback"
            />
          }
        >
          <div className="trip-page">
            <div className="trip-summary-card" style={cardStyle}>
              <p>Loading trip...</p>
            </div>
          </div>
        </ChamberLayout>
      </CastBackground>
    );
  }

  return (
    <CastBackground
      chamberKey="planTrip"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
        papa={
          <PapaMini
            context={chamberPapaContext}
            fallbackKey="fallback"
            trigger={step === 5 ? `planned-${trip?.id}` : `step-${step}`}
          />
        }
      >
        <div className="trip-page">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                className="trip-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="trip-question">
                  {isEditing ? "When should this trip happen?" : "When are you going?"}
                </p>

                <div className="trip-options">
                  {WHEN_OPTIONS.map((w) => (
                    <button
                      key={w.id}
                      className={`trip-option ${whenId === w.id ? "active" : ""}`}
                      style={whenId === w.id ? buttonPrimaryStyle : buttonSecondaryStyle}
                      onClick={() => setWhenId(w.id)}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>

                {whenId === "custom" && (
                  <input
                    type="date"
                    className="trip-date-input"
                    style={inputStyle}
                    value={customDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setCustomDate(e.target.value)}
                  />
                )}

                <button
                  className="trip-next-btn"
                  style={buttonPrimaryStyle}
                  disabled={!whenId || (whenId === "custom" && !customDate)}
                  onClick={() => setStep(2)}
                >
                  Next →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                className="trip-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="trip-back-btn"
                  style={transparentButtonStyle}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>

                <p className="trip-question">Where are you fishing?</p>

                <div className="trip-options vertical">
                  {allLocations.map((loc) => (
                    <button
                      key={loc.id}
                      className={`trip-option-row ${waterId === loc.id ? "active" : ""}`}
                      style={waterId === loc.id ? buttonPrimaryStyle : cardStyle}
                      onClick={() => setWaterId(loc.id)}
                    >
                      <span className="trip-option-row-label">{loc.name}</span>
                      <span
                        className="trip-option-row-note"
                        style={{ color: textTheme.secondary }}
                      >
                        {loc.tagline || loc.short_intro || loc.location_type_label}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  className="trip-next-btn"
                  style={buttonPrimaryStyle}
                  disabled={!waterId}
                  onClick={() => setStep(3)}
                >
                  Next →
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                className="trip-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="trip-back-btn"
                  style={transparentButtonStyle}
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>

                <p className="trip-question">What are you after?</p>

                <div className="trip-options">
                  {primaryTargets.map((t) => (
                    <button
                      key={t.id}
                      className={`trip-option ${targetId === t.id ? "active" : ""}`}
                      style={targetId === t.id ? buttonPrimaryStyle : buttonSecondaryStyle}
                      onClick={() => setTargetId(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {additionalTargets.length > 0 && !showOtherTargets && (
                  <button
                    type="button"
                    className="trip-other-btn"
                    style={buttonSecondaryStyle}
                    onClick={() => setShowOtherTargets(true)}
                  >
                    Other species here
                  </button>
                )}

                {showOtherTargets && additionalTargets.length > 0 && (
                  <div className="trip-options trip-options-secondary">
                    {additionalTargets.map((t) => (
                      <button
                        key={t.id}
                        className={`trip-option ${targetId === t.id ? "active" : ""}`}
                        style={targetId === t.id ? buttonPrimaryStyle : buttonSecondaryStyle}
                        onClick={() => setTargetId(t.id)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                )}

                {selectedTarget && (
                  <p
                    className="trip-target-tip"
                    style={{ color: textTheme.secondary }}
                  >
                    “{selectedTarget.tip}”
                    <span className="trip-tip-attr"> — Scooter</span>
                  </p>
                )}

                <button
                  className="trip-next-btn"
                  style={buttonPrimaryStyle}
                  disabled={!targetId}
                  onClick={() => setStep(4)}
                >
                  Next →
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                className="trip-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  className="trip-back-btn"
                  style={transparentButtonStyle}
                  onClick={() => setStep(3)}
                >
                  ← Back
                </button>

                <p className="trip-question">How long?</p>

                <div className="trip-options">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.id}
                      className={`trip-option ${durationId === d.id ? "active" : ""}`}
                      style={durationId === d.id ? buttonPrimaryStyle : buttonSecondaryStyle}
                      onClick={() => setDurationId(d.id)}
                    >
                      <span className="trip-duration-label">{d.label}</span>
                      <span className="trip-duration-sub">{d.sub}</span>
                    </button>
                  ))}
                </div>

                <button
                  className="trip-next-btn"
                  style={buttonPrimaryStyle}
                  disabled={!durationId || saving}
                  onClick={handleFinish}
                >
                  {saving
                    ? isEditing
                      ? "Updating..."
                      : "Planning..."
                    : isEditing
                    ? "Update this trip →"
                    : "Plan this trip →"}
                </button>

                {saveError && <p className="trip-error">{saveError}</p>}
              </motion.div>
            )}

            {step === 5 && trip && (
              <motion.div
                key="step5"
                className="trip-summary-card"
                style={cardStyle}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="trip-summary-header">
                  <div>
                    <p className="trip-summary-when">{trip.whenLabel}</p>
                    <h2 className="trip-summary-title">{trip.water.name}</h2>
                    <p className="trip-summary-sub">
                      Targeting {trip.target.label} · {trip.duration.sub}
                    </p>
                  </div>
                  <div className="trip-summary-badge">📍</div>
                </div>

                <div className="trip-scooter-block">
                  <p className="trip-voice-attr">Scooter</p>
                  <p className="trip-voice-text">“{trip.scooterAdvice}”</p>
                </div>

                <div className="trip-papa-block">
                  <p className="trip-voice-attr">Papa</p>
                  {summaryPapaContext && (
                    <PapaSpeaks
                      context={summaryPapaContext}
                      fallbackKey="fallback"
                      trigger={trip.id}
                    />
                  )}
                </div>

                <div className="trip-checklist">
                  <p className="trip-checklist-label">What to bring</p>

                  {trip.checklist.map((item, i) => (
                    <div key={i} className="trip-checklist-item">
                      <span className="trip-check-dot" />
                      <span>{item}</span>
                    </div>
                  ))}

                  <p className="trip-weather-note">
                    Check the weather the night before and let the water shape your first approach.
                  </p>
                </div>

                <div className="trip-summary-actions">
                  <button
                    className="trip-home-btn"
                    style={transparentButtonStyle}
                    onClick={() => navigate("/trips?filter=upcoming")}
                  >
                    Back to Trip Ledger
                  </button>

                  <button
                    className="trip-new-btn"
                    style={buttonSecondaryStyle}
                    onClick={resetPlanner}
                  >
                    Plan another trip
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}