import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { SPECIES } from "../data/species";
import { CAST_LOCATIONS } from "../data/locations";

import "../styles/pages/field-guide.css";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import {
  getRegionalWaterTypes,
  getActiveRegionalWaterTypes,
  getSpeciesForWater,
} from "../data/waterTypeHelpers";
import { getRegionIdFromKey } from "../data/regionOptions";

import {
  getRegionalSpecies,
  getWatersForSpecies,
  getSpeciesForWaterType,
} from "../data/speciesHelpers";

import { GEAR } from "../data/gear";
import { TECHNIQUES } from "../data/techniques";

import {
  getRegionalGear,
  getSpeciesForGear,
  getWatersForGear,
} from "../data/gearHelpers";

import {
  getRegionalTechniques,
  getSpeciesForTechnique,
  getWatersForTechnique,
  getGearForTechnique,
} from "../data/techniqueHelpers";

import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
} from "../utils/resolveChamberBackground";

// --- Species Chip to Locations ---

function LocationChip({ label, onClick }) {
  return (
    <span
      className={`fg-tag ${onClick ? "fg-tag-clickable" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}

// ── Section hub cards ──────────────────────────────────────────
function SectionCard({
  title,
  description,
  count,
  color,
  icon,
  onClick,
  cardTheme,
  textTheme,
  buttonTheme,
}) {
  return (
    <motion.button
      className="fg-section-card"
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        backdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <div className="fg-section-card-icon" style={{ color }}>{icon}</div>
      <div className="fg-section-card-body">
        <h3 className="fg-section-card-title" style={{ color: textTheme?.primary }}>
          {title}
        </h3>
        <p className="fg-section-card-desc" style={{ color: textTheme?.secondary }}>
          {description}
        </p>
      </div>
      <div
        className="fg-section-card-count"
        style={{ color: buttonTheme?.text || color }}
      >
        {count} entries →
      </div>
    </motion.button>
  );
}

// ── Water list card ────────────────────────────────
function WaterCard({ water, onClick, cardTheme, textTheme, chipTheme }) {
  return (
    <motion.button
      className="fg-entry-card"
      onClick={() => onClick(water)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        backdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <div className="fg-entry-info">
        <div className="fg-entry-header">
          <div>
            <h3 className="fg-entry-name" style={{ color: textTheme?.primary }}>
              {water.label}
            </h3>
            <p className="fg-entry-sub" style={{ color: textTheme?.secondary }}>
              {water.category}
            </p>
          </div>
          <span
            className="fg-unlocked-badge"
            style={{
              background: chipTheme?.activeBg,
              border: `1px solid ${chipTheme?.border}`,
              color: chipTheme?.text,
            }}
          >
            Water
          </span>
        </div>

        <p className="fg-entry-tagline" style={{ color: textTheme?.secondary }}>
          {water.shortDescription}
        </p>
      </div>
    </motion.button>
  );
}

// ── Species list card ──────────────────────────────────────────
function SpeciesCard({ species, onClick, cardTheme, textTheme, chipTheme }) {
  return (
    <motion.button
      className="fg-entry-card"
      onClick={() => onClick(species)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        backdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <div className="fg-entry-info">
        <div className="fg-entry-header">
          <div>
            <h3 className="fg-entry-name" style={{ color: textTheme?.primary }}>{species.name}</h3>
            <p className="fg-entry-sub" style={{ color: textTheme?.secondary }}>{species.latin}</p>
          </div>
          <span
            className="fg-unlocked-badge"
            style={{
              background: chipTheme?.activeBg,
              border: `1px solid ${chipTheme?.border}`,
              color: chipTheme?.text,
            }}
          >
            Field Note
          </span>
        </div>
        <p className="fg-entry-tagline" style={{ color: textTheme?.secondary }}>{species.tagline}</p>
      </div>
    </motion.button>
  );
}

// ── Gear / Technique list card ────────────────────────────────
function SimpleCard({ entry, onClick, accentColor, cardTheme, textTheme }) {
  return (
    <motion.button
      className="fg-simple-card"
      onClick={() => onClick(entry)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        borderLeft: `3px solid ${accentColor}`,
        backdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <div>
        <div className="fg-simple-header">
          <h3 className="fg-simple-name" style={{ color: textTheme?.primary }}>{entry.name}</h3>
          {entry.difficulty && <span className="fg-difficulty">{entry.difficulty}</span>}
        </div>
        <p className="fg-simple-tagline" style={{ color: textTheme?.secondary }}>{entry.tagline}</p>
      </div>
      <span className="fg-simple-arrow" style={{ color: textTheme?.secondary }}>→</span>
    </motion.button>
  );
}


// ── Water detail ────────────────────────────────────────────────
function WaterDetail({ water, onBack, onOpenSpecies, backButtonStyle }) {
  const linkedSpecies = getSpeciesForWaterType(
  water.id,
  water.activeRegionId
);

  return (
    <motion.div
      className="fg-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="scroll-surface">
        <button className="fg-back-btn" onClick={onBack} style={backButtonStyle}>
          ← Waters
        </button>

        <p className="fg-detail-eyebrow">Field Guide · Waters</p>
        <h2 className="fg-detail-name">{water.label}</h2>
        <p className="fg-detail-latin">{water.category}</p>

        <p className="fg-detail-intro" style={{ marginTop: "1rem" }}>
          {water.summary}
        </p>

        <div className="fg-section">
          <p className="fg-section-label">What to look for</p>
          <div className="fg-tags">
            {water.whatToLookFor?.map((item) => (
              <span key={item} className="fg-tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="fg-section">
          <p className="fg-section-label">Learning focus</p>
          <div className="fg-tags">
            {water.learningFocus?.map((item) => (
              <span key={item} className="fg-tag">{item}</span>
            ))}
          </div>
        </div>

        <div className="fg-section">
          <p className="fg-section-label">Common species</p>
          <div className="fg-tags">
            {linkedSpecies.map((species) => (
              <LocationChip
                key={species.id}
                label={species.name}
                onClick={() => onOpenSpecies(species.id)}
              />
            ))}
          </div>
        </div>

        <div className="fg-section">
          <p className="fg-section-label">Structure tags</p>
          <div className="fg-tags">
            {water.structureTags?.map((tag) => (
              <span key={tag} className="fg-tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="fg-papa-block">
          <p className="fg-voice-attr">Papa</p>
          <p className="fg-papa-line">"{water.papaReflection}"</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Species detail ─────────────────────────────────────────────
function SpeciesDetail({
  species,
  onBack,
  onOpenWater,
  backButtonStyle,
  regionalWaterTypes,
}) {
  
  const linkedWaters = getWatersForSpecies(
  species,
  regionalWaterTypes
);
  
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
        <div className="scroll-surface">
	  <button
  className="fg-back-btn"
  onClick={onBack}
  style={backButtonStyle}
>← Species</button>
      <p className="fg-detail-eyebrow">Field Guide · Species</p>
      <h2 className="fg-detail-name">{species.name}</h2>
      <p className="fg-detail-latin">{species.latin}</p>
      <div className="fg-illustration-wrap fg-species-image-wrap">
  {species.image ? (
    <img
      src={species.image}
      alt={`${species.name} field guide illustration`}
      className="fg-species-image"
    />
  ) : (
    <div className="fg-species-image-fallback">
      No illustration yet
    </div>
  )}
</div>
      <p className="fg-detail-intro">{species.intro}</p>
      <div className="fg-stats-row">
        {species.stats.map(s => (
          <div key={s.label} className="fg-stat">
            <p className="fg-stat-label">{s.label}</p>
            <p className="fg-stat-value">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="fg-section"><p className="fg-section-label">Where they hide</p>
		<p className="fg-section-body">{species.whereTheyHide}</p><div className="fg-tags">{species.tags.map(t => <span key={t} className="fg-tag">{t}</span>)}</div></div>
		<div className="fg-section">
		  <p className="fg-section-label">Found in</p>
		<div className="fg-tags">
		  {linkedWaters.map((water) => (
			<LocationChip
			  key={water.id}
			  label={water.label}
			  onClick={() => onOpenWater(water.id)}
			/>
		  ))}
		</div>
		</div>

      <div className="fg-section"><p className="fg-section-label">Best time</p><p className="fg-section-body">{species.bestTime}</p></div>
      <div className="fg-section"><p className="fg-section-label">Scooter's notes</p>{species.scooterTips.map((tip, i) => <div key={i} className="fg-voice-block scooter"><p className="fg-voice-text">"{tip}"</p></div>)}</div>
      <div className="fg-section"><p className="fg-section-label">What it feels like</p><p className="fg-section-body">{species.whatItFeelsLike}</p></div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{species.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}




// ── Gear detail ────────────────────────────────────────────────
function GearDetail({
  gear,
  onBack,
  onOpenSpecies,
  onOpenWater,
  regionalSpecies,
  regionalWaterTypes,
  backButtonStyle,
}) {
	
  const linkedSpecies = getSpeciesForGear(gear, regionalSpecies);
  const linkedWaters = getWatersForGear(gear, regionalWaterTypes);
	
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div className="scroll-surface">
	  <button className="fg-back-btn" onClick={onBack} style={backButtonStyle}>
  ← Gear
</button>
      <p className="fg-detail-eyebrow">Field Guide · Gear</p>
      <h2 className="fg-detail-name">{gear.name}</h2>
      <p className="fg-detail-latin">{gear.tagline}</p>
      <p className="fg-detail-intro" style={{ marginTop: "1rem" }}>{gear.intro}</p>
      <div className="fg-stats-row">
        {gear.stats.map(s => (
          <div key={s.label} className="fg-stat">
            <p className="fg-stat-label">{s.label}</p>
            <p className="fg-stat-value">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="fg-section">
	  <p className="fg-section-label">How it works</p>
	  <p className="fg-section-body">
	  {gear.howItWorks}
	  </p>
	  <div className="fg-tags">
	  {gear.tags.map(t => <span key={t} className="fg-tag">{t}</span>)
	  }
	  </div>
	  </div>
      
<div className="fg-section">
  <p className="fg-section-label">Good for species</p>
  <div className="fg-tags">
    {linkedSpecies.map((species) => (
      <LocationChip
        key={species.id}
        label={species.name}
        onClick={() => onOpenSpecies(species.id)}
      />
    ))}
  </div>
</div>

<div className="fg-section">
  <p className="fg-section-label">Ideal waters</p>
  <div className="fg-tags">
    {linkedWaters.map((water) => (
      <LocationChip
        key={water.id}
        label={water.label}
        onClick={() => onOpenWater(water.id)}
      />
    ))}
  </div>
</div>
	  
	  <div className="fg-section">
	  <p className="fg-section-label">Scooter's notes</p>
	  {gear.scooterTips.map((tip, i) => <div key={i} 
	  className="fg-voice-block scooter">
	  <p className="fg-voice-text">"{tip}"</p>
	  </div>
	  )
	  }
	  </div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{gear.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}

// ── Technique detail ───────────────────────────────────────────
function TechniqueDetail({
  technique,
  onBack,
  backButtonStyle,
  regionalSpecies,
  regionalWaterTypes,
  regionalGear,
  onOpenSpecies,
  onOpenWater,
  onOpenGear,
}) {
	
  const linkedSpecies = getSpeciesForTechnique(technique, regionalSpecies);
  const linkedWaters = getWatersForTechnique(technique, regionalWaterTypes);
  const linkedGear = getGearForTechnique(technique, regionalGear);	
	
	
  return (
    <motion.div className="fg-detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <div className="scroll-surface">
	  <button className="fg-back-btn" onClick={onBack} style={backButtonStyle}>
  ← Techniques
</button>
      <p className="fg-detail-eyebrow">Field Guide · Techniques</p>
      <h2 className="fg-detail-name">{technique.name}</h2>
      <p className="fg-detail-latin">{technique.tagline}</p>
      {technique.difficulty && <span className="fg-difficulty-badge">{technique.difficulty}</span>}
      <p className="fg-detail-intro" style={{ marginTop: "1rem" }}>{technique.intro}</p>
      <div className="fg-section">
        <p className="fg-section-label">How to do it</p>
        <ol className="fg-steps-list">
          {technique.steps.map((step, i) => (
            <li key={i} className="fg-step-item">
              <span className="fg-step-num">{i + 1}</span>
              <p className="fg-step-text">{step}</p>
            </li>
          ))}
        </ol>
        <div className="fg-tags" style={{ marginTop: "0.75rem" }}>{technique.tags.map(t => <span key={t} className="fg-tag">{t}</span>)}</div>
      </div>
      <div className="fg-section">
        <p className="fg-section-label">Common mistakes</p>
        {technique.commonMistakes.map((m, i) => (
          <div key={i} className="fg-mistake"><span className="fg-mistake-dot">·</span><p className="fg-section-body" style={{ margin: 0 }}>{m}</p></div>
        ))}
      </div>
      <div className="fg-section">
  <p className="fg-section-label">Useful for species</p>
  <div className="fg-tags">
    {linkedSpecies.map((species) => (
      <LocationChip
        key={species.id}
        label={species.name}
        onClick={() => onOpenSpecies(species.id)}
      />
    ))}
  </div>
</div>

<div className="fg-section">
  <p className="fg-section-label">Works in waters</p>
  <div className="fg-tags">
    {linkedWaters.map((water) => (
      <LocationChip
        key={water.id}
        label={water.label}
        onClick={() => onOpenWater(water.id)}
      />
    ))}
  </div>
</div>

<div className="fg-section">
  <p className="fg-section-label">Works with gear</p>
  <div className="fg-tags">
    {linkedGear.map((gear) => (
      <LocationChip
        key={gear.id}
        label={gear.name}
        onClick={() => onOpenGear(gear.id)}
      />
    ))}
  </div>
</div>
	  
	  <div className="fg-section"><p className="fg-section-label">Scooter's notes</p>{technique.scooterTips.map((tip, i) => <div key={i} className="fg-voice-block scooter"><p className="fg-voice-text">"{tip}"</p></div>)}</div>
      <div className="fg-papa-block"><p className="fg-voice-attr">Papa</p><p className="fg-papa-line">"{technique.papaLine}"</p></div>
	  </div>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────
export default function FieldGuidePage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const DEBUG_SCENE = null;
  
  const [view, setView] = useState(null);
  const { profilePacket } = useProfile();
  
  const activeRegionKey =
  profilePacket?.region_key ||
  profilePacket?.regionKey ||
  profilePacket?.region ||
  "100";

  const activeRegionId = getRegionIdFromKey(activeRegionKey);
  const regionalWaterTypes = getActiveRegionalWaterTypes(activeRegionId, SPECIES);
  const regionalSpecies = getRegionalSpecies(activeRegionId);
  const regionalGear = getRegionalGear(activeRegionId);
  const regionalTechniques = getRegionalTechniques(activeRegionId);
  
  const displayName =
  profilePacket?.display_name ||
  profilePacket?.username ||
  profilePacket?.name ||
  "friend";
  
  const atmosphere = useAtmosphere("fieldGuide", {
  user: profilePacket,
  context: {
    section: view?.section ?? null,
    entryName: view?.entry?.name ?? null,
    entryType: view?.entry?.type || view?.section || null,
  },
});



const scene = DEBUG_SCENE
  ? getScene(DEBUG_SCENE, {
      user: profilePacket,
      context: {
        section: view?.section ?? null,
        entryName: view?.entry?.name ?? null,
      },
    })
  : atmosphere.scene;

const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);

const atmospherePacket = buildAtmospherePacket({
  page: "fieldGuide",
  region: resolvedRegion,
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weatherState?.id || scene?.weather || "base",
  user: profilePacket,
  
});

const atmosphericInvitation = getAtmosphericInvitations({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});

const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
const styles = atmosphere.styles ?? {};

const cardStyle = styles.cardStyle ?? {};
const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
const transparentButtonStyle = styles.transparentButtonStyle ?? {};
const textTheme = ui.text ?? {};
const chipTheme = ui.chip ?? {};


const cardTheme = {
  bg: cardStyle.background,
  border: cardStyle.border?.replace("1px solid ", ""),
  blur: ui.card?.blur,
  shadow: cardStyle.boxShadow,
};

const buttonTheme = ui.button ?? {};
const backButtonStyle = buttonSecondaryStyle;

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};
  
  
  

  useEffect(() => {
  const navState = location.state;

  if (!navState?.section || !navState?.entryId) return;

  if (navState.section === "species") {
    const matchedSpecies = regionalSpecies.find(
      (s) => s.id === navState.entryId || s.slug === navState.entryId
    );

    if (matchedSpecies) {
      setView({
        section: "species",
        entry: matchedSpecies,
      });
      return;
    }

    setView({ section: "species" });
  }

  if (navState.section === "waters") {
    const matchedWater = regionalWaterTypes.find(
      (w) => w.id === navState.entryId
    );

    if (matchedWater) {
      setView({
        section: "waters",
        entry: matchedWater,
      });
      return;
    }

    setView({ section: "waters" });
  }
}, [location.state, regionalSpecies, regionalWaterTypes]);
  const section = view?.section ?? null;
  const entry = view?.entry ?? null;

  const papaContext = {
  page: "fieldGuide",
  user: profilePacket,
  atmosphere: atmospherePacket,
  scene,
  view: entry ? "entry" : section ? "section" : "home",
  section: section || null,
  entryName: entry?.name || null,
  entryType: entry?.type || section || null,
  event: entry
    ? `${displayName} is reading the field guide entry for ${entry.name}`
    : section
    ? `${displayName} is browsing the ${section} section of the field guide`
    : `${displayName} opened the field guide`,
};

  const goHub = () => setView(null);
  const goList = (sec) => setView({ section: sec });
  const goDetail = (e) => setView((v) => ({ ...v, entry: e }));
  const backToList = () => setView((v) => ({ section: v.section }));

  return (
    <CastBackground
	  chamberKey="fieldGuide"
	  variant={scene?.backgroundVariant}
	  overlay={ui.overlay}
	>
      <ChamberLayout
  signature={
	  <>
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
	<div className="cast-atmospheric-invitation">
      {atmosphericInvitation}
    </div>
  </>
  }
		  papa={
			<PapaMini
			  context={papaContext}
			  fallbackKey="fieldguide.open"
			  trigger={entry?.id ?? section}
			/>
		  }
		>
        <div className="fg-page">
          <AnimatePresence mode="sync">

            {!section && !entry && (
              <motion.div
                key="hub"
                className="fg-hub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
			  <SectionCard
				  title="Waters"
				  description="Ponds, lakes, creeks, rivers, and the places fish learn to move."
				  count={regionalWaterTypes.length}
				  color="#6FA8A3"
				  onClick={() => goList("waters")}
				  cardTheme={cardTheme}
				  textTheme={textTheme}
				  buttonTheme={buttonTheme}
				/>

				 <SectionCard
                  title="Species"
                  description={`The fish ${displayName} knows and the ones still waiting to be found.`}
                  count={regionalSpecies.length}
                  color="#BA7517"
                  onClick={() => goList("species")}
				  cardTheme={cardTheme}
				  textTheme={textTheme}
				  buttonTheme={buttonTheme}
                />
                <SectionCard
                  title="Gear"
                  description="Rods, reels, lures, and line — the tools of the craft."
                  count={regionalGear.length}
                  color="#185FA5"
                  onClick={() => goList("gear")}
				  cardTheme={cardTheme}
				  textTheme={textTheme}
				  buttonTheme={buttonTheme}
                />
                <SectionCard
                  title="Techniques"
                  description="How to read the water, cast, set the hook, and think like a fish."
                  count={regionalTechniques.length}
                  color="#0F6E56"
                  onClick={() => goList("techniques")}
				  cardTheme={cardTheme}
				  textTheme={textTheme}
				  buttonTheme={buttonTheme}
                />
                <p className="fg-more-hint">
				  More entries unlock as you explore new waters.
				</p>
              </motion.div>
            )}
			{section === "waters" && !entry && (
			  <motion.div
				key="waters-list"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -20 }}
				transition={{ duration: 0.3 }}
			  >
				<button className="fg-back-btn" style={backButtonStyle} onClick={goHub}>
				  ← Field Guide
				</button>

				<h3 className="fg-list-title">Waters</h3>

				{regionalWaterTypes.map((water) => (
				  <WaterCard
					key={water.id}
					water={water}
					onClick={goDetail}
					cardTheme={cardTheme}
					textTheme={textTheme}
					chipTheme={chipTheme}
				  />
				))}
			  </motion.div>
			)}
            {section === "species" && !entry && (
              <motion.div
                key="species-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button className="fg-back-btn" style={backButtonStyle} onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Species</h3>
                {regionalSpecies.map((s) => (
				  <SpeciesCard
					  key={s.id}
					  species={s}
					  onClick={goDetail}
					  cardTheme={cardTheme}
					  textTheme={textTheme}
					  chipTheme={chipTheme}
					/>
				))}
              </motion.div>
            )}

            {section === "gear" && !entry && (
              <motion.div
                key="gear-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button className="fg-back-btn" style={backButtonStyle} onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Gear</h3>
                {regionalGear.map((g) => (
                  <SimpleCard
					  key={g.id}
					  entry={g}
					  onClick={goDetail}
					  accentColor="#185FA5"
					  cardTheme={cardTheme}
					  textTheme={textTheme}
					/>
                ))}
              </motion.div>
            )}

            {section === "techniques" && !entry && (
              <motion.div
                key="tech-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <button className="fg-back-btn" style={backButtonStyle} onClick={goHub}>← Field Guide</button>
                <h3 className="fg-list-title">Techniques</h3>
                {regionalTechniques.map((t) => (
                  <SimpleCard
					  key={t.id}
					  entry={t}
					  onClick={goDetail}
					  accentColor="#0F6E56"
					  cardTheme={cardTheme}
					  textTheme={textTheme}
					/>
                ))}
              </motion.div>
            )}
			{section === "waters" && entry && (
			  <WaterDetail
				key={entry.id}
				water={entry}
				onBack={() => {
				  navigate("/field-guide", {
					replace: true,
					state: null,
				  });

				  setView({ section: "waters" });
				}}
				backButtonStyle={backButtonStyle}
				onOpenSpecies={(speciesId) => {
				  const matchedSpecies = SPECIES.find((s) => s.id === speciesId);

				  if (matchedSpecies) {
					setView({
					  section: "species",
					  entry: matchedSpecies,
					});
				  }
				}}
			  />
			)}

            {section === "species" && entry && (
              <SpeciesDetail
			  key={entry.id}
			  species={entry}
			  onBack={backToList}
			  backButtonStyle={backButtonStyle}
			  regionalWaterTypes={regionalWaterTypes}
			  onOpenWater={(waterId) => {
				const matchedWater = regionalWaterTypes.find(
				  (w) => w.id === waterId
				);

				if (matchedWater) {
				  setView({
					section: "waters",
					entry: matchedWater,
				  });
				}
			  }}
			/>
            )}

            {section === "gear" && entry && (
              <GearDetail
  key={entry.id}
  gear={entry}
  onBack={backToList}
  backButtonStyle={backButtonStyle}
  regionalSpecies={regionalSpecies}
  regionalWaterTypes={regionalWaterTypes}
  onOpenSpecies={(speciesId) => {
    const matchedSpecies = regionalSpecies.find((s) => s.id === speciesId);
    if (matchedSpecies) {
      setView({ section: "species", entry: matchedSpecies });
    }
  }}
  onOpenWater={(waterId) => {
    const matchedWater = regionalWaterTypes.find((w) => w.id === waterId);
    if (matchedWater) {
      setView({ section: "waters", entry: matchedWater });
    }
  }}
/>
            )}

            {section === "techniques" && entry && (
              <TechniqueDetail
  key={entry.id}
  technique={entry}
  onBack={backToList}
  backButtonStyle={backButtonStyle}
  regionalSpecies={regionalSpecies}
  regionalWaterTypes={regionalWaterTypes}
  regionalGear={regionalGear}
  onOpenSpecies={(speciesId) => {
    const matchedSpecies = regionalSpecies.find((s) => s.id === speciesId);
    if (matchedSpecies) {
      setView({ section: "species", entry: matchedSpecies });
    }
  }}
  onOpenWater={(waterId) => {
    const matchedWater = regionalWaterTypes.find((w) => w.id === waterId);
    if (matchedWater) {
      setView({ section: "waters", entry: matchedWater });
    }
  }}
  onOpenGear={(gearId) => {
    const matchedGear = regionalGear.find((g) => g.id === gearId);
    if (matchedGear) {
      setView({ section: "gear", entry: matchedGear });
    }
  }}
/>
            )}

          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}