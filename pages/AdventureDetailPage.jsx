import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import PapaSpeaks from "../components/PapaSpeaks";
import grantQuests from "../data/stories/grant/quests.json";
import "../styles/pages/adventure.css";

// ── Persist adventure progress ─────────────────────────────────
const STORAGE_KEY = (id) => `cast:v1:adventure:${id}`;

function loadProgress(questId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(questId));
    return raw ? JSON.parse(raw) : { stepIndex: 0, completed: false };
  } catch { return { stepIndex: 0, completed: false }; }
}

function saveProgress(questId, stepIndex, completed = false) {
  try {
    localStorage.setItem(STORAGE_KEY(questId), JSON.stringify({ stepIndex, completed }));
  } catch {}
}

// ── Catch form ─────────────────────────────────────────────────
function CatchForm({ onSubmit, questId }) {
  const [species, setSpecies] = useState("");
  const [note, setNote]       = useState("");
  const [released, setReleased] = useState(true);

  const isBass = species.toLowerCase().includes("bass") ||
                 species.toLowerCase().includes("largemouth");

  return (
    <div className="catch-form">
      <input
        className="catch-input"
        placeholder="What did you catch? (or 'nothing today')"
        value={species}
        onChange={e => setSpecies(e.target.value)}
      />
      <input
        className="catch-input"
        placeholder="One line about how it went..."
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <div className="catch-toggle-row">
        <span className="catch-toggle-label">Released?</span>
        <button
          className={`catch-toggle ${released ? "active" : ""}`}
          onClick={() => setReleased(r => !r)}
        >
          {released ? "Yes" : "No"}
        </button>
      </div>
      <button
        className="adv-btn-primary"
        onClick={() => species.trim() && onSubmit({ species: species.trim(), note, released, isBass })}
        disabled={!species.trim()}
      >
        Log it →
      </button>
    </div>
  );
}

// ── Presence timer ─────────────────────────────────────────────
function PresenceTimer({ seconds = 60, onComplete }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning]     = useState(false);
  const [done, setDone]           = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setDone(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const pct = ((seconds - remaining) / seconds) * 100;
  const label = seconds >= 90 ? "Stay still. Listen to the river." : "Stay still. Listen.";

  return (
    <div className="presence-timer">
      {!running && !done && (
        <button className="adv-btn-presence" onClick={start}>
          Start {seconds}-second wait
        </button>
      )}
      {running && (
        <>
          <div className="presence-ring-wrap">
            <svg viewBox="0 0 80 80" className="presence-ring">
              <circle cx="40" cy="40" r="34" className="presence-ring-track" />
              <circle
                cx="40" cy="40" r="34"
                className="presence-ring-fill"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - pct / 100)}`}
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="presence-ring-num">{remaining}</span>
          </div>
          <p className="presence-ring-label">{label}</p>
        </>
      )}
      {done && (
        <motion.div
          className="presence-done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="presence-done-text">Time's up. What did you notice?</p>
          <button className="adv-btn-primary" onClick={onComplete}>
            Continue →
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function AdventureDetailPage() {
  const { questId } = useParams();
  const navigate    = useNavigate();

  const quest = grantQuests.quests.find(q => q.quest_id === questId) ?? null;

  const [stepIndex, setStepIndex] = useState(() => {
    const saved = loadProgress(questId);
    return saved.completed ? 0 : saved.stepIndex;
  });
  const [completed, setCompleted] = useState(() => loadProgress(questId).completed);
  const [showIntro, setShowIntro] = useState(() => {
    const saved = loadProgress(questId);
    return !saved.completed && saved.stepIndex === 0;
  });
  const [catchData, setCatchData] = useState(null);

  const advance = (data = {}) => {
    if (data.species) setCatchData(data);
    const nextIndex = stepIndex + 1;
    if (nextIndex >= quest.steps.length) {
      saveProgress(questId, stepIndex, true);
      setCompleted(true);
    } else {
      saveProgress(questId, nextIndex, false);
      setStepIndex(nextIndex);
    }
  };

  if (!quest) {
    return (
      <CastBackground chamberKey="home">
        <div className="adv-page">
          <div className="adv-not-found">Adventure not found.</div>
        </div>
      </CastBackground>
    );
  }

  const step     = quest.steps[stepIndex];
  const progress = Math.round((stepIndex / quest.steps.length) * 100);
  const isRiver  = questId === "hillsborough-river";
  const caughtBass = catchData?.isBass;

  // ── Intro ──────────────────────────────────────────────────
  if (showIntro) {
    return (
      <CastBackground chamberKey="home">
        <div className="adv-page">
          <motion.div
            className="adv-intro-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="adv-intro-eyebrow">Adventure {quest.adventure_number}</p>
            <h1 className="adv-intro-title">{quest.title}</h1>
            <p className="adv-intro-sub">{quest.subtitle}</p>
            {quest.threshold && (
              <div className="adv-threshold-badge">Threshold Adventure</div>
            )}
            {quest.lore_intro && (
              <div className="adv-papa-note">
                <div className="adv-papa-note-avatar">
                  <img src="/assets/papa/papa-avatar-sq-sm.png" alt="Papa" />
                </div>
                <div>
                  <p className="adv-papa-note-attr">A note from Papa</p>
                  <p className="adv-papa-note-text">"{quest.lore_intro}"</p>
                </div>
              </div>
            )}
            <button className="adv-btn-primary" onClick={() => setShowIntro(false)}>
              Begin →
            </button>
            <button className="adv-btn-ghost" onClick={() => navigate(-1)}>
              ← Back
            </button>
          </motion.div>
        </div>
      </CastBackground>
    );
  }

  // ── Complete ───────────────────────────────────────────────
  if (completed) {
    const isBassAdventure = questId === "hillsborough-river";
    const bassLine = "You gave the water your patience. It gave you this.";

    return (
      <CastBackground chamberKey="home">
        <div className="adv-page">
          <motion.div
            className="adv-complete-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="adv-complete-badge">✓</div>
            <h2 className="adv-complete-title">Adventure Complete</h2>
            <p className="adv-complete-sub">{quest.title}</p>

            <div className="adv-rewards">
              {questId === "backyard-pond" && (
                <>
                  <div className="adv-reward-pill">🎣 Badge — First Cast</div>
                  <div className="adv-reward-pill">📖 Field Guide — Bluegill unlocked</div>
                </>
              )}
              {questId === "hillsborough-river" && (
                <>
                  <div className="adv-reward-pill">🏞️ Badge — River Fisher</div>
                  <div className="adv-reward-pill">📖 Field Guide — Largemouth Bass unlocked</div>
                </>
              )}
            </div>

            {/* Papa's special bass catch line */}
            {isBassAdventure && caughtBass ? (
              <div className="adv-papa-present adv-bass-moment" style={{ marginTop: "1.25rem" }}>
                <p className="adv-voice-attr">Papa</p>
                <p className="adv-bass-line">"{bassLine}"</p>
              </div>
            ) : (
              <div className="adv-papa-present" style={{ marginTop: "1.25rem" }}>
                <p className="adv-voice-attr">Papa</p>
                <PapaSpeaks
                  context={{
                    event: isBassAdventure
                      ? "Grant just completed the Hillsborough River adventure hunting for Largemouth Bass"
                      : "Grant just completed his first fishing adventure at the backyard pond",
                    adventure: quest.title,
                    catchData: catchData || undefined,
                  }}
                  fallbackKey="adventure.complete"
                  trigger="complete"
                />
              </div>
            )}

            {/* Threshold hint for Adventure 2 */}
            {isBassAdventure && (
              <motion.div
                className="adv-threshold-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <p className="adv-threshold-hint-text">
                  There are other waters beyond this river. Saltwater. Something bigger out there.
                </p>
              </motion.div>
            )}

            <button className="adv-btn-primary" style={{ marginTop: "1.25rem" }} onClick={() => navigate("/")}>
              Back to the Dock
            </button>
          </motion.div>
        </div>
      </CastBackground>
    );
  }

  // ── Step ───────────────────────────────────────────────────
  return (
    <CastBackground chamberKey="home">
      <div className="adv-page">

        <div className="adv-progress-bar">
          <motion.div
            className="adv-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.step_id}
            className="adv-step-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="adv-step-header">
              <span className="adv-step-count">
                Step {stepIndex + 1} of {quest.steps.length}
              </span>
              {step.type === "presence" && (
                <span className="adv-presence-tag">Presence moment</span>
              )}
            </div>

            <h2 className="adv-step-title">{step.title}</h2>
            <p className="adv-step-prompt">{step.prompt}</p>

            {/* Scooter tip */}
            {step.scooter_tip && (
              <div className="adv-scooter-tip">
                <p className="adv-voice-attr">Scooter</p>
                <p className="adv-voice-text">"{step.scooter_tip}"</p>
              </div>
            )}

            {/* Papa note (static) */}
            {step.papa_note && (
              <div className="adv-papa-note-inline">
                <p className="adv-voice-attr">Papa — a note he left</p>
                <p className="adv-voice-text">"{step.papa_note}"</p>
              </div>
            )}

            {/* Deer story — Scooter retells it, Papa responds */}
            {step.deer_story && (
              <>
                <div className="adv-scooter-tip adv-deer-story">
                  <p className="adv-voice-attr">Scooter — while you wait</p>
                  <p className="adv-voice-text">"{step.scooter_deer_story}"</p>
                </div>
                <div className="adv-papa-present">
                  <p className="adv-voice-attr">Papa</p>
                  <PapaSpeaks
                    context={{
                      event: "Scooter just told Grant the deer story about Papa at the hunting camp — Papa is listening and responds",
                      adventure: quest.title,
                      step: step.title,
                    }}
                    fallbackKey="adventure.waiting"
                    trigger={step.step_id}
                  />
                </div>
              </>
            )}

            {/* Papa present (live API, non-deer-story steps) */}
            {step.papa_present && !step.deer_story && (
              <div className="adv-papa-present">
                <p className="adv-voice-attr">Papa</p>
                <PapaSpeaks
                  context={{
                    event: `Grant is on step: ${step.title} in adventure: ${quest.title}`,
                    adventure: quest.title,
                    step: step.title,
                  }}
                  fallbackKey="adventure.waiting"
                  trigger={step.step_id}
                />
              </div>
            )}

            {/* Presence timer */}
            {step.type === "presence" && step.presence_timer_seconds && (
              <PresenceTimer
                seconds={step.presence_timer_seconds}
                onComplete={() => advance()}
              />
            )}

            {/* Catch form */}
            {step.type === "catch" && (
              <CatchForm onSubmit={(data) => advance(data)} questId={questId} />
            )}

            {/* Default done button */}
            {step.type !== "catch" && !(step.type === "presence" && step.presence_timer_seconds) && (
              <button className="adv-btn-primary" onClick={() => advance()}>
                {stepIndex === quest.steps.length - 1 ? "Complete Adventure →" : "Done →"}
              </button>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </CastBackground>
  );
}
