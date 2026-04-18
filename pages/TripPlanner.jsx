import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import { saveTrip, formatTripDate } from "../utils/trips";
import "../styles/pages/trip-planner.css";

// ── Grant's known waters ───────────────────────────────────────
const WATERS = [
  { id: "backyard-pond",      label: "Scooter's Backyard Pond",  note: "Catch & release. Bluegill and catfish." },
  { id: "hillsborough-river", label: "Hillsborough River",       note: "Bass country. Work the bends." },
  { id: "alafia-river",       label: "Alafia River",             note: "Runs fast after rain. Snook near bridges." },
  { id: "cockroach-bay",      label: "Cockroach Bay",            note: "Saltwater. Redfish in the grass flats." },
  { id: "buckhorn-lake",      label: "Buckhorn Lake",            note: "Scooter's been scouting this one." },
];

// ── Target fish ────────────────────────────────────────────────
const TARGETS = [
  { id: "bluegill",       label: "Bluegill",        tip: "Worms near shade. You know this one." },
  { id: "largemouth-bass",label: "Largemouth Bass", tip: "Texas rig. Slow. Near structure." },
  { id: "catfish",        label: "Catfish",          tip: "Bottom bait. Patient waiting." },
  { id: "whatever-bites", label: "Whatever bites",  tip: "Open mind. Best way to fish." },
];

// ── Duration options ───────────────────────────────────────────
const DURATIONS = [
  { id: "quick",   label: "Quick trip",   sub: "1–2 hours" },
  { id: "half",    label: "Half day",     sub: "3–4 hours" },
  { id: "full",    label: "Full day",     sub: "All day"   },
];

// ── When options ───────────────────────────────────────────────
const WHEN_OPTIONS = [
  { id: "today",     label: "Today",        offset: 0 },
  { id: "tomorrow",  label: "Tomorrow",     offset: 1 },
  { id: "weekend",   label: "This weekend", offset: null },
  { id: "custom",    label: "Pick a day",   offset: null },
];

function getDateForOption(option) {
  if (option.offset !== null) {
    const d = new Date();
    d.setDate(d.getDate() + option.offset);
    return d.toISOString().split("T")[0];
  }
  if (option.id === "weekend") {
    const d = new Date();
    const day = d.getDay();
    const daysUntilSat = day === 6 ? 7 : (6 - day);
    d.setDate(d.getDate() + daysUntilSat);
    return d.toISOString().split("T")[0];
  }
  return null;
}

// ── Prep checklist based on water + target ────────────────────
function buildChecklist(water, target) {
  const base = [
    "Rod and reel",
    "Tackle box",
    "Sunscreen",
    "Water bottle",
    "Hat",
  ];
  const extras = [];

  if (target === "bluegill") extras.push("Small hooks and worms", "Bobber");
  if (target === "largemouth-bass") extras.push("Soft plastic worms", "Texas rig setup", "Spinnerbait");
  if (target === "catfish") extras.push("Chicken liver or stink bait", "Bottom rig");
  if (target === "whatever-bites") extras.push("A little of everything");
  if (water === "cockroach-bay") extras.push("Wading shoes", "Polarized sunglasses");
  if (water === "hillsborough-river" || water === "alafia-river") extras.push("Bug spray");

  return [...extras, ...base];
}

// ── Scooter's advice per water + target ──────────────────────
function getScooterAdvice(waterId, targetId) {
  if (waterId === "backyard-pond" && targetId === "bluegill")
    return "Start at the shady corner near the dock edge. Small hook, piece of worm, let it sit. You know this pond — trust what you know.";
  if (waterId === "backyard-pond" && targetId === "largemouth-bass")
    return "There's a bass in that pond. Cast a plastic worm along the drop-off near the far reeds. Work it slow.";
  if (waterId === "hillsborough-river")
    return "Find the bend where the current slows. That's where the bass are sitting. Texas rig, slow retrieve. Give it time.";
  if (waterId === "alafia-river")
    return "If it's rained recently the water'll be moving fast — snook push up near the bridges then. Otherwise work the inside bends for bass.";
  if (waterId === "cockroach-bay")
    return "Wade the grass flats slowly and look for redfish tails. Polarized glasses help. When you see one, cast ahead of it — not at it.";
  if (waterId === "buckhorn-lake")
    return "I've been watching the reed line on the north bank. Cast parallel to the reeds, let the worm sink. I think our Largemouth is in there.";
  return "Read the water before your first cast. Give yourself two minutes just to look.";
}

// ── Main page ──────────────────────────────────────────────────
export default function TripPlanner() {
  const navigate = useNavigate();

  const [step, setStep]         = useState(1); // 1-4 = questions, 5 = summary
  const [whenId, setWhenId]     = useState(null);
  const [customDate, setCustomDate] = useState("");
  const [waterId, setWaterId]   = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [durationId, setDurationId] = useState(null);
  const [trip, setTrip]         = useState(null);

  const selectedWater    = WATERS.find(w => w.id === waterId);
  const selectedTarget   = TARGETS.find(t => t.id === targetId);
  const selectedDuration = DURATIONS.find(d => d.id === durationId);
  const selectedWhen     = WHEN_OPTIONS.find(w => w.id === whenId);

  const resolvedDate = whenId === "custom" ? customDate
    : whenId ? getDateForOption(selectedWhen)
    : null;

  const handleFinish = () => {
    const newTrip = {
      id: `trip-${Date.now()}`,
      date: resolvedDate,
      whenLabel: whenId === "custom" ? formatTripDate(customDate) : selectedWhen?.label,
      water: selectedWater,
      target: selectedTarget,
      duration: selectedDuration,
      checklist: buildChecklist(waterId, targetId),
      scooterAdvice: getScooterAdvice(waterId, targetId),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTrip(newTrip);
    setTrip(newTrip);
    setStep(5);
  };

  const papaContext = {
    event: trip
      ? `Grant just planned a fishing trip to ${trip.water?.label} targeting ${trip.target?.label} on ${trip.whenLabel}`
      : "Grant is planning a fishing trip",
  };

  return (
    <CastBackground chamberKey="plan-trip" >
      <ChamberLayout
        title="Plan a Trip"
        sub="Where are you going? What are you after?"
        papa={<PapaMini context={papaContext} fallbackKey="fallback" trigger={step === 5 ? "planned" : null} />}
      >
        <div className="trip-page">
          <AnimatePresence mode="wait">

            {/* ── Step 1: When ── */}
            {step === 1 && (
              <motion.div key="step1" className="trip-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <p className="trip-question">When are you going?</p>
                <div className="trip-options">
                  {WHEN_OPTIONS.map(w => (
                    <button
                      key={w.id}
                      className={`trip-option ${whenId === w.id ? "active" : ""}`}
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
                    value={customDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={e => setCustomDate(e.target.value)}
                  />
                )}
                <button
                  className="trip-next-btn"
                  disabled={!whenId || (whenId === "custom" && !customDate)}
                  onClick={() => setStep(2)}
                >
                  Next →
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Where ── */}
            {step === 2 && (
              <motion.div key="step2" className="trip-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="trip-back-btn" onClick={() => setStep(1)}>← Back</button>
                <p className="trip-question">Where are you fishing?</p>
                <div className="trip-options vertical">
                  {WATERS.map(w => (
                    <button
                      key={w.id}
                      className={`trip-option-row ${waterId === w.id ? "active" : ""}`}
                      onClick={() => setWaterId(w.id)}
                    >
                      <span className="trip-option-row-label">{w.label}</span>
                      <span className="trip-option-row-note">{w.note}</span>
                    </button>
                  ))}
                </div>
                <button className="trip-next-btn" disabled={!waterId} onClick={() => setStep(3)}>
                  Next →
                </button>
              </motion.div>
            )}

            {/* ── Step 3: What ── */}
            {step === 3 && (
              <motion.div key="step3" className="trip-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="trip-back-btn" onClick={() => setStep(2)}>← Back</button>
                <p className="trip-question">What are you after?</p>
                <div className="trip-options">
                  {TARGETS.map(t => (
                    <button
                      key={t.id}
                      className={`trip-option ${targetId === t.id ? "active" : ""}`}
                      onClick={() => setTargetId(t.id)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {selectedTarget && (
                  <p className="trip-target-tip">"{selectedTarget.tip}"<span className="trip-tip-attr"> — Scooter</span></p>
                )}
                <button className="trip-next-btn" disabled={!targetId} onClick={() => setStep(4)}>
                  Next →
                </button>
              </motion.div>
            )}

            {/* ── Step 4: How long ── */}
            {step === 4 && (
              <motion.div key="step4" className="trip-step" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="trip-back-btn" onClick={() => setStep(3)}>← Back</button>
                <p className="trip-question">How long?</p>
                <div className="trip-options">
                  {DURATIONS.map(d => (
                    <button
                      key={d.id}
                      className={`trip-option ${durationId === d.id ? "active" : ""}`}
                      onClick={() => setDurationId(d.id)}
                    >
                      <span className="trip-duration-label">{d.label}</span>
                      <span className="trip-duration-sub">{d.sub}</span>
                    </button>
                  ))}
                </div>
                <button className="trip-next-btn" disabled={!durationId} onClick={handleFinish}>
                  Plan this trip →
                </button>
              </motion.div>
            )}

            {/* ── Step 5: Trip summary ── */}
            {step === 5 && trip && (
              <motion.div key="step5" className="trip-summary-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

                {/* Trip header */}
                <div className="trip-summary-header">
                  <div>
                    <p className="trip-summary-when">{trip.whenLabel}</p>
                    <h2 className="trip-summary-title">{trip.water.label}</h2>
                    <p className="trip-summary-sub">Targeting {trip.target.label} · {trip.duration.sub}</p>
                  </div>
                  <div className="trip-summary-badge">📍</div>
                </div>

                {/* Scooter's advice */}
                <div className="trip-scooter-block">
                  <p className="trip-voice-attr">Scooter</p>
                  <p className="trip-voice-text">"{trip.scooterAdvice}"</p>
                </div>

                {/* Papa's send-off */}
                <div className="trip-papa-block">
                  <p className="trip-voice-attr">Papa</p>
                  <PapaSpeaks
                    context={{
                      event: `Grant just planned a fishing trip to ${trip.water.label} targeting ${trip.target.label} ${trip.whenLabel.toLowerCase()}`,
                    }}
                    fallbackKey="fallback"
                    trigger={trip.id}
                  />
                </div>

                {/* Checklist */}
                <div className="trip-checklist">
                  <p className="trip-checklist-label">What to bring</p>
                  {trip.checklist.map((item, i) => (
                    <div key={i} className="trip-checklist-item">
                      <span className="trip-check-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                  <p className="trip-weather-note">Check the weather the night before — calm mornings are best for bass.</p>
                </div>

                {/* Actions */}
                <div className="trip-summary-actions">
                  <button className="trip-home-btn" onClick={() => navigate("/")}>
                    Back to the Dock
                  </button>
                  <button className="trip-new-btn" onClick={() => { setStep(1); setWhenId(null); setWaterId(null); setTargetId(null); setDurationId(null); setTrip(null); }}>
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
