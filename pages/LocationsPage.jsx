import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { CAST_LOCATIONS } from "../data/locations";
import "../styles/pages/locations.css";
import grantQuests from "../data/stories/grant/quests.json";
import { SPECIES } from "../data/species";


// ── Small helpers ──────────────────────────────────────────────
function ToneBadge({ label }) {
  return <span className="loc-tone-badge">{label}</span>;
}

function SpeciesChip({ label, onClick }) {
  return (
    <span
      className={`loc-species-chip ${onClick ? "clickable" : ""}`}
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

function SectionBlock({ label, children }) {
  return (
    <div className="loc-section">
      <p className="loc-section-label">{label}</p>
      <div className="loc-section-body">{children}</div>
    </div>
  );
}

// ── Adventure card ─────────────────────────────────────────────
function AdventureLinkCard({ quest, onOpen }) {
  return (
    <motion.button
      className={`loc-adventure-card ${quest.status === "locked" ? "locked" : ""}`}
      onClick={() => quest.status !== "locked" && onOpen(quest.quest_id)}
      whileHover={quest.status !== "locked" ? { y: -2 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="loc-adventure-top">
        <div>
          <p className="loc-adventure-eyebrow">
            Adventure {quest.adventure_number}
          </p>
          <h4 className="loc-adventure-title">{quest.title}</h4>
          <p className="loc-adventure-subtitle">{quest.subtitle}</p>
        </div>

        <span className={`loc-adventure-status ${quest.status}`}>
          {quest.status === "locked" ? "Locked" : "Available"}
        </span>
      </div>

      {quest.lore_intro && (
        <p className="loc-adventure-intro">{quest.lore_intro}</p>
      )}

      <div className="loc-adventure-footer">
        {quest.status === "locked"
          ? "Complete earlier waters to unlock"
          : "Begin adventure →"}
      </div>
    </motion.button>
  );
}

// ── Hub Card ───────────────────────────────────────────────────
function LocationCard({ location, onClick }) {
  return (
    <motion.button
      className="loc-card"
      onClick={() => onClick(location)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="loc-card-top">
        <div>
          <p className="loc-card-eyebrow">{location.location_type_label}</p>
          <h3 className="loc-card-title">{location.name}</h3>
          <p className="loc-card-subtitle">{location.tagline}</p>
        </div>

        <div className="loc-card-meta">
          <span className={`loc-difficulty ${location.difficulty.beginner_friendly}`}>
            {location.difficulty_label}
          </span>
        </div>
      </div>

      <p className="loc-card-intro">{location.short_intro}</p>

      <div className="loc-card-row">
        <div className="loc-card-group">
          <p className="loc-mini-label">Water</p>
          <p className="loc-mini-value">{location.environment.water_type}</p>
        </div>
        <div className="loc-card-group">
          <p className="loc-mini-label">Access</p>
          <p className="loc-mini-value">{location.access.summary}</p>
        </div>
      </div>

      <div className="loc-card-tones">
        {location.tone_profile.map((tone) => (
          <ToneBadge key={tone} label={tone} />
        ))}
      </div>
    </motion.button>
  );
}

// ── Detail View ────────────────────────────────────────────────
function LocationDetail({ location, onBack, onOpenAdventure, onOpenSpecies }) {
  const locationAdventures = (location.adventure_ids || [])
    .map((id) => grantQuests.quests.find((q) => q.quest_id === id))
    .filter(Boolean);


const FIELD_GUIDE_SPECIES = Object.fromEntries(
  SPECIES.map((s) => [s.name.toLowerCase(), s.id])
);



  return (
    <motion.div
      className="loc-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="scroll-surface">
        <button className="loc-back-btn" onClick={onBack}>
          ← Locations
        </button>

        <p className="loc-detail-eyebrow">
          Locations · {location.location_type_label}
        </p>

        <h2 className="loc-detail-title">{location.name}</h2>
        <p className="loc-detail-subtitle">{location.tagline}</p>

        <p className="loc-detail-intro">{location.long_intro}</p>

        <div className="loc-stats-row">
          <div className="loc-stat">
            <p className="loc-stat-label">Water Type</p>
            <p className="loc-stat-value">{location.environment.water_type}</p>
          </div>
          <div className="loc-stat">
            <p className="loc-stat-label">Access</p>
            <p className="loc-stat-value">{location.access.summary}</p>
          </div>
          <div className="loc-stat">
            <p className="loc-stat-label">Difficulty</p>
            <p className="loc-stat-value">{location.difficulty_label}</p>
          </div>
        </div>

        <SectionBlock label="Tone of the place">
          <div className="loc-tone-wrap">
            {location.tone_profile.map((tone) => (
              <ToneBadge key={tone} label={tone} />
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Water and structure">
          <p>{location.environment_summary}</p>
          <div className="loc-chip-row">
            {location.environment.structure.map((item) => (
              <span key={item} className="loc-chip">{item}</span>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Vegetation">
          <div className="loc-chip-row">
            {location.environment.vegetation.map((item) => (
              <span key={item} className="loc-chip">{item}</span>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Fishing access">
          <p>{location.access.long_text}</p>
          <div className="loc-chip-row">
            {location.access.special_features.map((item) => (
              <span key={item} className="loc-chip">{item}</span>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock label="Common species">
		  <div className="loc-species-row">
			{location.fish_species.map((species) => (
			  <SpeciesChip
  key={species}
  label={species}
  onClick={
    FIELD_GUIDE_SPECIES[species.toLowerCase()]
      ? () => onOpenSpecies(FIELD_GUIDE_SPECIES[species.toLowerCase()])
      : null
  }
/>
			))}
		  </div>
		</SectionBlock>

        <SectionBlock label="What to look for">
          <ul className="loc-list">
            {location.fishing_patterns.primary_zones.map((zone) => (
              <li key={zone}>{zone}</li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock label="Learning focus">
          <ul className="loc-list">
            {location.difficulty.learning_focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionBlock>

        {locationAdventures.length > 0 && (
          <SectionBlock label="Adventures here">
            <div className="loc-adventure-stack">
              {locationAdventures.map((quest) => (
                <AdventureLinkCard
                  key={quest.quest_id}
                  quest={quest}
                  onOpen={onOpenAdventure}
                />
              ))}
            </div>
          </SectionBlock>
        )}

        {location.sub_locations?.length > 0 && (
          <SectionBlock label="Sub-locations">
            <div className="loc-chip-row">
              {location.sub_locations.map((item) => (
                <span key={item} className="loc-chip">{item}</span>
              ))}
            </div>
          </SectionBlock>
        )}

        {location.wildlife?.notable_species?.length > 0 && (
          <SectionBlock label="Wildlife nearby">
            <div className="loc-chip-row">
              {location.wildlife.notable_species.map((item) => (
                <span key={item} className="loc-chip">{item}</span>
              ))}
            </div>
          </SectionBlock>
        )}

        {location.adventure_hooks?.length > 0 && (
          <SectionBlock label="Adventure hooks">
            <div className="loc-voice-stack">
              {location.adventure_hooks.map((hook, i) => (
                <div key={i} className="loc-voice-block">
                  <p className="loc-voice-text">{hook}</p>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}

        {location.papa_line && (
          <div className="loc-papa-block">
            <p className="loc-voice-attr">Papa</p>
            <p className="loc-papa-line">"{location.papa_line}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const routeLocation = useLocation();

  const papaContext = {
    event: selectedLocation
      ? `Grant is reading about ${selectedLocation.name}`
      : "Grant is choosing where to fish",
  };
  
  
  useEffect(() => {
  const navState = routeLocation.state;

  if (navState?.selectedLocationId) {
    const matchedLocation = CAST_LOCATIONS.find(
      (loc) => loc.id === navState.selectedLocationId
    );

    if (matchedLocation) {
      setSelectedLocation(matchedLocation);
    }
  }
}, [routeLocation.state]);
  
  

  return (
    <CastBackground chamberKey="locations">
      <ChamberLayout
        title="Locations"
        sub="Waters to enter. Places to learn. Worlds to remember."
        papa={
          <PapaMini
            context={papaContext}
            fallbackKey="locations.open"
            trigger={selectedLocation?.id ?? "locations-hub"}
          />
        }
      >
        <div className="loc-page">
          <AnimatePresence mode="wait">
            {!selectedLocation && (
              <motion.div
                key="locations-hub"
                className="loc-hub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {CAST_LOCATIONS.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onClick={setSelectedLocation}
                  />
                ))}

                <p className="loc-more-hint">
                  More waters will appear as Grant explores farther from home.
                </p>
              </motion.div>
            )}

            {selectedLocation && (
              <LocationDetail
			  key={selectedLocation.id}
			  location={selectedLocation}
			  onBack={() => setSelectedLocation(null)}
			  onOpenAdventure={(questId) => navigate(`/adventures/${questId}`)}
			  onOpenSpecies={(entryId) =>
				navigate("/field-guide", {
				  state: {
					section: "species",
					entryId
				  }
				})
			  }
			/>
            )}
          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}