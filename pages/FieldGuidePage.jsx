import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import {
  FIELD_GUIDE_SPECIES, FIELD_GUIDE_GEAR, FIELD_GUIDE_TECHNIQUES, isUnlocked
} from "../data/fieldGuide";
import "../styles/pages/field-guide.css";

// ── Fish SVGs ──────────────────────────────────────────────────
function BluegillSVG() {
  return (
    <svg viewBox="0 0 380 140" xmlns="http://www.w3.org/2000/svg" className="fish-svg">
      <ellipse cx="175" cy="70" rx="105" ry="46" fill="#EF9F27" opacity="0.18"/>
      <ellipse cx="170" cy="70" rx="98" ry="40" fill="#EF9F27" opacity="0.32"/>
      <ellipse cx="163" cy="70" rx="88" ry="34" fill="#BA7517" opacity="0.2"/>
      <path d="M262 70 Q300 45 328 25 Q310 70 328 115 Q300 95 262 70Z" fill="#BA7517" opacity="0.55"/>
      <path d="M93 70 Q72 58 56 48 Q66 70 56 92 Q72 82 93 70Z" fill="#BA7517" opacity="0.45"/>
      <line x1="145" y1="36" x2="145" y2="104" stroke="#854F0B" strokeWidth="0.7" opacity="0.2"/>
      <line x1="168" y1="34" x2="168" y2="106" stroke="#854F0B" strokeWidth="0.7" opacity="0.18"/>
      <line x1="190" y1="36" x2="190" y2="104" stroke="#854F0B" strokeWidth="0.7" opacity="0.18"/>
      <line x1="211" y1="40" x2="211" y2="100" stroke="#854F0B" strokeWidth="0.7" opacity="0.18"/>
      <path d="M132 36 Q155 28 185 30 Q215 28 234 36" fill="none" stroke="#854F0B" strokeWidth="1.4" opacity="0.45" strokeLinecap="round"/>
      <path d="M135 104 Q158 112 188 110 Q218 112 236 104" fill="none" stroke="#854F0B" strokeWidth="1.4" opacity="0.45" strokeLinecap="round"/>
      <path d="M134 47 Q145 36 158 42 Q149 50 144 62Z" fill="#EF9F27" opacity="0.65"/>
      <path d="M134 93 Q145 104 158 98 Q149 90 144 78Z" fill="#EF9F27" opacity="0.65"/>
      <circle cx="74" cy="66" r="7" fill="#111" opacity="0.85"/>
      <circle cx="76" cy="64" r="2" fill="white" opacity="0.55"/>
    </svg>
  );
}

function BassSVG() {
  return (
    <svg viewBox="0 0 400 145" xmlns="http://www.w3.org/2000/svg" className="fish-svg">
      <ellipse cx="188" cy="72" rx="122" ry="52" fill="#5DCAA5" opacity="0.1"/>
      <ellipse cx="183" cy="72" rx="115" ry="45" fill="#1D9E75" opacity="0.16"/>
      <ellipse cx="175" cy="72" rx="105" ry="38" fill="#0F6E56" opacity="0.18"/>
      <path d="M285 72 Q335 40 368 18 Q342 72 368 126 Q335 104 285 72Z" fill="#0F6E56" opacity="0.52"/>
      <path d="M90 72 Q68 60 52 48 Q63 72 52 96 Q68 84 90 72Z" fill="#0F6E56" opacity="0.42"/>
      <path d="M148 38 Q172 26 195 32 Q178 46 168 60Z" fill="#1D9E75" opacity="0.62"/>
      <path d="M148 106 Q172 118 195 112 Q178 98 168 84Z" fill="#1D9E75" opacity="0.62"/>
      <circle cx="72" cy="67" r="8" fill="#111" opacity="0.88"/>
      <circle cx="74" cy="65" r="2.2" fill="white" opacity="0.5"/>
    </svg>
  );
}

// ── Section hub cards ──────────────────────────────────────────
function SectionCard({ title, description, count, color, icon, onClick }) {
  return (
    <motion.button
      className="fg-section-card"
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ borderColor: `${color}30` }}
    >
      <div className="fg-section-card-icon" style={{ color }}>{icon}</div>
      <div className="fg-section-card-body">
        <h3 className="fg-section-card-title">{title}</h3>
        <p className="fg-section-card-desc">{description}</p>
      </div>
      <div className="fg-section-card-count" style={{ color }}>{count} entries →</div>
    </motion.button>
  );
}

// ── Species list card ──────────────────────────────────────────
function SpeciesCard({ species, unlocked, onClick }) {
  return (
    <motion.button
      className={`fg-entry-card ${unlocked ? "" : "locked"}`}
      onClick={() => unlocked && onClick(species)}
      whileHover={unlocked ? { y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
	
      <div className="fg-entry-fish">
        {species.id === "bluegill" ? <BluegillSVG /> : <BassSVG />}
      </div>
      <div className="fg-entry-info">
        <div className="fg-entry-header">
          <div>
            <h3 className="fg-entry-name">{species.name}</h3>
            <p className="fg-entry-sub">{species.latin}</p>
          </div>
          {!unlocked
            ? <span className="fg-locked-badge">🔒 Locked</span>
            : <span className="fg-unlocked-badge">Unlocked</span>
          }
        </div>
        <p className="fg-entry-tagline">{species.tagline}</p>
      </div>
	 
    </motion.button>
  );
}

// ── Gear / Technique list card ────────────────────────────────
function SimpleCard({ entry, onClick, accentColor }) {
  return (
    <motion.button
      className="fg-simple-card"
      onClick={() => onClick(entry)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{ borderLeftColor: accentColor }}
    >
      <div>
        <div className="fg-simple-header">
          <h3 className="fg-simple-name">{entry.name}</h3>
          {entry.difficulty && (
            <span className="fg-difficulty">{entry.difficulty}</span>
          )}
        </div>
        <p className="fg-simple-tagline">{entry.tagline}</p>
      </div>
      <span className="fg-simple-arrow">→</span>
    </motion.button>
  );
}

// ── Species detail ─────────────────────────────────────────────
function SpeciesDetail({ species, onBack }) {
  const FishSVG = species.id === "bluegill" ? BluegillSVG : BassSVG;
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <div className="scroll-surface">
	  <button className="fg-back-btn" onClick={onBack}>← Species</button>
      <p className="fg-detail-eyebrow">Field Guide · Species</p>
      <h2 className="fg-detail-name">{species.name}</h2>
      <p className="fg-detail-latin">{species.latin}</p>
      <div className="fg-illustration-wrap"><FishSVG /></div>
      <p className="fg-detail-intro">{species.intro}</p>
      <div className="fg-stats-row">
        {species.stats.map(s => (
          <div key={s.label} className="fg-stat">
            <p className="fg-stat-label">{s.label}</p>
            <p className="fg-stat-value">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="fg-section"><p className="fg-section-label">Where they hide</p><p className="fg-section-body">{species.whereTheyHide}</p><div className="fg-tags">{species.tags.map(t => <span key={t} className="fg-tag">{t}</span>)}</div></div>
      <div className="fg-section"><p className="fg-section-label">Best time</p><p className="fg-section-body">{species.bestTime}</p></div>
      <div className="fg-section"><p className="fg-section-label">Scooter's notes</p>{species.scooterTips.map((tip, i) => <div key={i} className="fg-voice-block scooter"><p className="fg-voice-text">"{tip}"</p></div>)}</div>
      <div className="fg-section"><p className="fg-section-label">What it feels like</p><p className="fg-section-body">{species.whatItFeelsLike}</p></div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{species.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}

// ── Gear detail ────────────────────────────────────────────────
function GearDetail({ entry, onBack }) {
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div className="scroll-surface">
	  <button className="fg-back-btn" onClick={onBack}>← Gear</button>
      <p className="fg-detail-eyebrow">Field Guide · Gear</p>
      <h2 className="fg-detail-name">{entry.name}</h2>
      <p className="fg-detail-latin">{entry.tagline}</p>
      <p className="fg-detail-intro" style={{ marginTop: "1rem" }}>{entry.intro}</p>
      <div className="fg-stats-row">
        {entry.stats.map(s => (
          <div key={s.label} className="fg-stat">
            <p className="fg-stat-label">{s.label}</p>
            <p className="fg-stat-value">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="fg-section"><p className="fg-section-label">How it works</p><p className="fg-section-body">{entry.howItWorks}</p><div className="fg-tags">{entry.tags.map(t => <span key={t} className="fg-tag">{t}</span>)}</div></div>
      <div className="fg-section"><p className="fg-section-label">Scooter's notes</p>{entry.scooterTips.map((tip, i) => <div key={i} className="fg-voice-block scooter"><p className="fg-voice-text">"{tip}"</p></div>)}</div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{entry.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}

// ── Technique detail ───────────────────────────────────────────
function TechniqueDetail({ entry, onBack }) {
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div className="scroll-surface">
	  <button className="fg-back-btn" onClick={onBack}>← Techniques</button>
      <p className="fg-detail-eyebrow">Field Guide · Techniques</p>
      <h2 className="fg-detail-name">{entry.name}</h2>
      <p className="fg-detail-latin">{entry.tagline}</p>
      {entry.difficulty && <span className="fg-difficulty-badge">{entry.difficulty}</span>}
      <p className="fg-detail-intro" style={{ marginTop: "1rem" }}>{entry.intro}</p>
      <div className="fg-section">
        <p className="fg-section-label">How to do it</p>
        <ol className="fg-steps-list">
          {entry.steps.map((step, i) => (
            <li key={i} className="fg-step-item">
              <span className="fg-step-num">{i + 1}</span>
              <p className="fg-step-text">{step}</p>
            </li>
          ))}
        </ol>
        <div className="fg-tags" style={{ marginTop: "0.75rem" }}>{entry.tags.map(t => <span key={t} className="fg-tag">{t}</span>)}</div>
      </div>
      <div className="fg-section">
        <p className="fg-section-label">Common mistakes</p>
        {entry.commonMistakes.map((m, i) => (
          <div key={i} className="fg-mistake"><span className="fg-mistake-dot">·</span><p className="fg-section-body" style={{ margin: 0 }}>{m}</p></div>
        ))}
      </div>
      <div className="fg-section"><p className="fg-section-label">Scooter's notes</p>{entry.scooterTips.map((tip, i) => <div key={i} className="fg-voice-block scooter"><p className="fg-voice-text">"{tip}"</p></div>)}</div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{entry.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function FieldGuidePage() {
  // view: null = hub, { section } = list, { section, entry } = detail
  const [view, setView] = useState(null);

  const section  = view?.section ?? null;
  const entry    = view?.entry   ?? null;

  const papaContext = {
    event: entry
      ? `Grant is reading the field guide entry for ${entry.name}`
      : section
        ? `Grant is browsing the ${section} section of the field guide`
        : "Grant opened his field guide",
  };

  const goHub       = ()    => setView(null);
  const goList      = (sec) => setView({ section: sec });
  const goDetail    = (e)   => setView(v => ({ ...v, entry: e }));
  const backToList  = ()    => setView(v => ({ section: v.section }));

  return (
    <CastBackground chamberKey="field-guide">
      <ChamberLayout
        title="Field Guide"
        sub="What to look for. Where to find them. What they teach."
        papa={<PapaMini context={papaContext} fallbackKey="fieldguide.open" trigger={entry?.id ?? section} />}
      >
        <div className="fg-page">
          <AnimatePresence mode="wait">

            {/* ── Hub ── */}
            {!section && !entry && (
              <motion.div key="hub" className="fg-hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <SectionCard
                  title="Species"
                  description="The fish Grant knows and the ones he's still chasing."
                  count={FIELD_GUIDE_SPECIES.length}
                  color="#BA7517"
                  icon="🐟"
                  onClick={() => goList("species")}
                />
                <SectionCard
                  title="Gear"
                  description="Rods, reels, lures, and line — the tools of the craft."
                  count={FIELD_GUIDE_GEAR.length}
                  color="#185FA5"
                  icon="🎣"
                  onClick={() => goList("gear")}
                />
                <SectionCard
                  title="Techniques"
                  description="How to read the water, cast, set the hook, and think like a fish."
                  count={FIELD_GUIDE_TECHNIQUES.length}
                  color="#0F6E56"
                  icon="🌊"
                  onClick={() => goList("techniques")}
                />
                <p className="fg-more-hint">More entries unlock as Grant explores new waters.</p>
              </motion.div>
            )}

            {/* ── Species list ── */}
            {section === "species" && !entry && (
              <motion.div key="species-list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="fg-back-btn" onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Species</h3>
                {FIELD_GUIDE_SPECIES.map(s => (
                  <SpeciesCard key={s.id} species={s} unlocked={isUnlocked(s)} onClick={goDetail} />
                ))}
              </motion.div>
            )}

            {/* ── Gear list ── */}
            {section === "gear" && !entry && (
              <motion.div key="gear-list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="fg-back-btn" onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Gear</h3>
                {FIELD_GUIDE_GEAR.map(g => (
                  <SimpleCard key={g.id} entry={g} onClick={goDetail} accentColor="#185FA5" />
                ))}
              </motion.div>
            )}

            {/* ── Techniques list ── */}
            {section === "techniques" && !entry && (
              <motion.div key="tech-list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <button className="fg-back-btn" onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Techniques</h3>
                {FIELD_GUIDE_TECHNIQUES.map(t => (
                  <SimpleCard key={t.id} entry={t} onClick={goDetail} accentColor="#0F6E56" />
                ))}
              </motion.div>
            )}

            {/* ── Species detail ── */}
            {section === "species" && entry && (
              <SpeciesDetail key={entry.id} species={entry} onBack={backToList} />
            )}

            {/* ── Gear detail ── */}
            {section === "gear" && entry && (
              <GearDetail key={entry.id} entry={entry} onBack={backToList} />
            )}

            {/* ── Technique detail ── */}
            {section === "techniques" && entry && (
              <TechniqueDetail key={entry.id} entry={entry} onBack={backToList} />
            )}

          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
