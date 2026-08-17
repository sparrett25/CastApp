import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/locations.css";
import "../styles/global/atmosphere.css";
import { SPECIES } from "../data/species";
import { GEAR } from "../data/gear";
import { TECHNIQUES } from "../data/techniques";
import { waterTypes } from "../data/waterTypes";
import { REGION_OPTIONS } from "../data/regionOptions";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import {
  loadLocations,
  saveLocations,
  subscribeToLocations,
} from "../data/locationStorage";
import { supabase } from "../lib/supabase";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
  getAtmosphericPerception,
} from "../utils/resolveChamberBackground";


const GEAR_CATEGORY_LABELS = {
  "rod-reel": "Rods & Reels",
  line: "Line",
  "terminal-tackle": "Terminal Tackle",
  rig: "Rigs",
  bait: "Baits",
  lure: "Lures",
};

const TIME_STATE_OPTIONS = [
  { id: "blue-hour-dawn", label: "Blue Hour Dawn" },
  { id: "soft-morning-rise", label: "Soft Morning Rise" },
  { id: "warm-drift", label: "Warm Drift" },
  { id: "golden-dusk", label: "Golden Dusk" },
  { id: "quiet-evening-glow", label: "Quiet Evening Glow" },
];

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

function CreateLocationForm({
  onCreate,
  onCancel,
  cardTheme,
  textTheme,
  chipTheme,
}) {
  const regionList = Object.values(REGION_OPTIONS);

  const [form, setForm] = useState({
    name: "",
    regionId: regionList?.[0]?.id || regionList?.[0]?.key || "",
    waterTypeId: waterTypes?.[0]?.id || "",
  });

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.regionId || !form.waterTypeId) return;

    const water = waterTypes.find((w) => w.id === form.waterTypeId);

    const newLocation = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${form.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,

      name: form.name.trim(),
      regionId: form.regionId,
      waterTypeId: form.waterTypeId,

	knownSpeciesIds: [],
	observedSpeciesIds: [],
	preferredSpeciesIds: [],
	recommendedGearIds: [],
	fieldKitGearIds: [],
	techniqueIds: [],
	preferredTimeStateId: "",
	adventureIds: [],

      notes: "",

      photoUrls: [],
      fieldNoteIds: [],
      journalEntryIds: [],

      details: {
        tagline: "A new water waiting to be learned.",
        locationTypeLabel: water?.label || "Location",
      },
    };

    onCreate(newLocation);
  }

  return (
    <motion.form
      className="loc-create-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      style={{
        background: cardTheme?.bg,
        border: `1px solid ${cardTheme?.border}`,
        backdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        WebkitBackdropFilter: `blur(${cardTheme?.blur || "12px"})`,
        boxShadow: cardTheme?.shadow,
        color: textTheme?.primary,
      }}
    >
      <p className="loc-card-eyebrow" style={{ color: textTheme?.secondary }}>
        Create Location
      </p>

      <h3 className="loc-card-title" style={{ color: textTheme?.primary }}>
        Add a new water
      </h3>

      <label className="loc-form-label">
        Location Name
        <input
          className="loc-form-input"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Edward Medard Reservoir"
        />
      </label>

      <label className="loc-form-label">
        Region
        <select
          className="loc-form-input"
          value={form.regionId}
          onChange={(e) => updateField("regionId", e.target.value)}
        >
          {regionList.map((region) => (
            <option key={region.id || region.key} value={region.id || region.key}>
              {region.label}
            </option>
          ))}
        </select>
      </label>

      <label className="loc-form-label">
        Water Type
        <select
          className="loc-form-input"
          value={form.waterTypeId}
          onChange={(e) => updateField("waterTypeId", e.target.value)}
        >
          {waterTypes.map((water) => (
            <option key={water.id} value={water.id}>
              {water.label}
            </option>
          ))}
        </select>
      </label>

      <div className="loc-form-actions">
        <button
          type="submit"
          className="loc-create-btn"
          style={{
            background: chipTheme?.activeBg,
            border: `1px solid ${chipTheme?.border}`,
            color: chipTheme?.text,
          }}
        >
          Save Location
        </button>

        <button type="button" className="loc-cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

function LocationCard({ location, onClick, cardTheme, textTheme, chipTheme }) {
  const water = waterTypes.find((w) => w.id === location.waterTypeId);

  return (
    <motion.button
      className="loc-card"
      onClick={() => onClick(location)}
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
      <div className="loc-card-top">
        <div>
          <p className="loc-card-eyebrow" style={{ color: textTheme?.secondary }}>
            {water?.label || location.waterTypeId || "Location"}
          </p>
          <h3 className="loc-card-title" style={{ color: textTheme?.primary }}>
            {location.name}
          </h3>
        </div>

        <div className="loc-card-meta">
          <span
            className="loc-difficulty"
            style={{
              background: chipTheme?.activeBg,
              border: `1px solid ${chipTheme?.border}`,
              color: chipTheme?.text,
            }}
          >
            Saved Place
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function LocationDetail({
  location,
  onBack,
  onOpenSpecies,
  onOpenWaterType,
  onOpenGear,
  onOpenTechnique,
  onUpdateLocation,
  cardTheme,
  textTheme,
  chipTheme,
  backButtonStyle,
}) {
	
  const water = waterTypes.find((w) => w.id === location.waterTypeId);
  const region = Object.values(REGION_OPTIONS).find(
    (r) => r.id === location.regionId || r.key === location.regionId
  );

const regionList = Object.values(REGION_OPTIONS);


const [isEditing, setIsEditing] = useState(false);
const [draftLocation, setDraftLocation] = useState(location);

const selectedWater = waterTypes.find((w) => w.id === draftLocation.waterTypeId);

useEffect(() => {
  setDraftLocation(location);
}, [location]);

function updateDraft(field, value) {
  setDraftLocation((prev) => ({
    ...prev,
    [field]: value,
  }));
}

function toggleArrayValue(field, value) {
  setDraftLocation((prev) => {
    const current = prev[field] || [];
    const exists = current.includes(value);

    return {
      ...prev,
      [field]: exists
        ? current.filter((item) => item !== value)
        : [...current, value],
    };
  });
}

function saveEdits() {
  onUpdateLocation(draftLocation);
  setIsEditing(false);
}

  const [locationCatches, setLocationCatches] = useState([]);
  const [catchesLoading, setCatchesLoading] = useState(false);
  const [locationTrips, setLocationTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  
  const memoryCount =
    (location.photoUrls?.length || 0) +
    (location.fieldNoteIds?.length || 0) +
    (location.journalEntryIds?.length || 0);

const likelySpecies = SPECIES.filter((species) => {
  const matchesRegion =
    species.regionIds?.includes(location.regionId) ||
    species.regions?.includes(location.regionId);

  const matchesWater =
    species.waterTypeIds?.includes(location.waterTypeId) ||
    species.waterTypes?.includes(location.waterTypeId);

  return matchesRegion && matchesWater;
});

const observedLikelyCount =
  location.observedSpeciesIds?.filter((speciesId) =>
    likelySpecies.some((species) => species.id === speciesId)
  ).length || 0;

const regionalGear = GEAR.filter(
  (gear) => !gear.regionIds?.length || gear.regionIds.includes(location.regionId)
);

const regionalTechniques = TECHNIQUES.filter(
  (technique) =>
    !technique.regionIds?.length || technique.regionIds.includes(location.regionId)
);



useEffect(() => {
  let isMounted = true;

  async function loadLocationCatches() {
    try {
      setCatchesLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) return;

      const { data, error } = await supabase
        .from("cast_catch_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("location_key", location.id)
        .order("catch_date", { ascending: false })
        .limit(2);

      if (error) throw error;

      if (isMounted) setLocationCatches(data ?? []);
    } catch (err) {
      console.error("Location catches load error:", err);
      if (isMounted) setLocationCatches([]);
    } finally {
      if (isMounted) setCatchesLoading(false);
    }
  }

  loadLocationCatches();

  return () => {
    isMounted = false;
  };
}, [location.id]);

useEffect(() => {
  let isMounted = true;

  async function loadLocationTrips() {
    try {
      setTripsLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) return;

      const { data, error } = await supabase
        .from("cast_trip_plans")
        .select("*")
        .eq("user_id", user.id)
        .eq("location_key", location.id)
        .order("trip_date", { ascending: false })
        .limit(2);

      if (error) throw error;

      if (isMounted) setLocationTrips(data ?? []);
    } catch (err) {
      console.error("Location trips load error:", err);
      if (isMounted) setLocationTrips([]);
    } finally {
      if (isMounted) setTripsLoading(false);
    }
  }

  loadLocationTrips();

  return () => {
    isMounted = false;
  };
}, [location.id]);


  return (
    <motion.div
      className="loc-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="scroll-surface">
        <button className="loc-back-btn" style={backButtonStyle} onClick={onBack}>
          ← Locations
        </button>

        <p className="loc-detail-eyebrow">
		  Locations ·{" "}
		  {isEditing
			? selectedWater?.label || draftLocation.waterTypeId || "Saved Place"
			: water?.label || location.waterTypeId || "Saved Place"}
		</p>

        {isEditing ? (
		  <input
			className="loc-form-input loc-title-input"
			value={draftLocation.name || ""}
			onChange={(e) => updateDraft("name", e.target.value)}
			placeholder="Location name"
		  />
		) : (
		  <h2 className="loc-detail-title">{location.name}</h2>
		)}

        {(isEditing ? draftLocation.notes : location.notes) && (
  <p className="loc-detail-subtitle">
    {isEditing ? draftLocation.notes : location.notes}
  </p>
)}

		<div className="loc-edit-actions">
		  {isEditing ? (
			<>
			  <button className="loc-create-btn" onClick={saveEdits}>
				Save Changes
			  </button>
			  <button
				className="loc-cancel-btn"
				onClick={() => {
				  setDraftLocation(location);
				  setIsEditing(false);
				}}
			  >
				Cancel
			  </button>
			</>
		  ) : (
			<button className="loc-new-btn" onClick={() => setIsEditing(true)}>
			  Edit Location
			</button>
		  )}
		</div>

        <div className="loc-stats-row">
          <div className="loc-stat">
		  <p className="loc-stat-label">Region</p>

		  {isEditing ? (
			<select
			  className="loc-form-input"
			  value={draftLocation.regionId || ""}
			  onChange={(e) => updateDraft("regionId", e.target.value)}
			>
			  {regionList.map((region) => (
				<option key={region.id || region.key} value={region.id || region.key}>
				  {region.label}
				</option>
			  ))}
			</select>
		  ) : (
			<p className="loc-stat-value">
			  {region?.label || location.regionId || "Unassigned"}
			</p>
		  )}
		</div>


          <div className="loc-stat">
		  <p className="loc-stat-label">Water Type</p>

		  {isEditing ? (
			<select
			  className="loc-form-input"
			  value={draftLocation.waterTypeId || ""}
			  onChange={(e) => updateDraft("waterTypeId", e.target.value)}
			>
			  {waterTypes.map((water) => (
				<option key={water.id} value={water.id}>
				  {water.label}
				</option>
			  ))}
			</select>
		  ) : (
			<SpeciesChip
			  label={water?.label || location.waterTypeId || "Unassigned"}
			  onClick={water ? () => onOpenWaterType(water.id) : null}
			/>
		  )}
		</div>
				  
		  
		  

          <div className="loc-stat">
            <p className="loc-stat-label">Memories</p>
            <p className="loc-stat-value">{memoryCount}</p>
          </div>
        </div>

        <SectionBlock label="Known here">
		  {isEditing ? (
			<div className="loc-species-row">
			  {SPECIES.map((species) => (
				<button
				  key={species.id}
				  type="button"
				  className={`loc-species-chip ${
					draftLocation.knownSpeciesIds?.includes(species.id) ? "active" : ""
				  }`}
				  onClick={() => toggleArrayValue("knownSpeciesIds", species.id)}
				>
				  {species.name}
				</button>
			  ))}
			</div>
		  ) : (
			<div className="loc-species-row">
			  {location.knownSpeciesIds?.length ? (
				location.knownSpeciesIds.map((speciesId) => {
				  const species = SPECIES.find((s) => s.id === speciesId);

				  return (
					<SpeciesChip
					  key={speciesId}
					  label={species?.name || speciesId}
					  onClick={species ? () => onOpenSpecies(species.id) : null}
					/>
				  );
				})
			  ) : (
				<p>No documented species added yet.</p>
			  )}
			</div>
		  )}
		</SectionBlock>

		<SectionBlock label="Likely species">
		  {likelySpecies.length ? (
			<>
			  <p className="loc-discovery-text">
				{observedLikelyCount} of {likelySpecies.length} likely species observed.
			  </p>

			  <div className="loc-species-row">
				{likelySpecies.map((species) => {
				  const observed = location.observedSpeciesIds?.includes(species.id);

				  return (
					<span
					  key={species.id}
					  className={`loc-species-chip ${
						observed ? "discovery" : ""
					  }`}
					  onClick={() => onOpenSpecies(species.id)}
					>
					  {observed ? `✓ ${species.name}` : species.name}
					</span>
				  );
				})}
			  </div>
			</>
		  ) : (
			<p>No likely species mapped for this region and water type yet.</p>
		  )}
		</SectionBlock>

		<SectionBlock label="Observed here">
		  {isEditing ? (
			<div className="loc-species-row">
			  {likelySpecies.map((species) => (
				<button
				  key={species.id}
				  type="button"
				  className={`loc-species-chip ${
					draftLocation.observedSpeciesIds?.includes(species.id) ? "active" : ""
				  }`}
				  onClick={() => toggleArrayValue("observedSpeciesIds", species.id)}
				>
				  {species.name}
				</button>
			  ))}
			</div>
		  ) : (
			<div className="loc-species-row">
			  {location.observedSpeciesIds?.length ? (
				location.observedSpeciesIds.map((speciesId) => {
				  const species = SPECIES.find((s) => s.id === speciesId);
				  return (
					<SpeciesChip
					  key={speciesId}
					  label={species?.name || speciesId}
					  onClick={species ? () => onOpenSpecies(species.id) : null}
					/>
				  );
				})
			  ) : (
				<p>No personal observations recorded yet.</p>
			  )}
			</div>
		  )}
		</SectionBlock>


		<SectionBlock label="Preferred species">
		  {isEditing ? (
			<div className="loc-species-row">
			  {SPECIES.map((species) => (
				<button
				  key={species.id}
				  type="button"
				  className={`loc-species-chip ${
					draftLocation.preferredSpeciesIds?.includes(species.id) ? "active" : ""
				  }`}
				  onClick={() => toggleArrayValue("preferredSpeciesIds", species.id)}
				>
				  {species.name}
				</button>
			  ))}
			</div>
		  ) : (
			<div className="loc-species-row">
			  {location.preferredSpeciesIds?.length ? (
				location.preferredSpeciesIds.map((speciesId) => {
				  const species = SPECIES.find((s) => s.id === speciesId);

				  return (
					<SpeciesChip
					  key={speciesId}
					  label={species?.name || speciesId}
					  onClick={species ? () => onOpenSpecies(species.id) : null}
					/>
				  );
				})
			  ) : (
				<p>No preferred species added yet.</p>
			  )}
			</div>
		  )}
		</SectionBlock>

		<SectionBlock label="Recommended gear">
		  <div className="loc-species-row">
			{location.recommendedGearIds?.length ? (
			  location.recommendedGearIds.map((gearId) => {
				const gear = GEAR.find((entry) => entry.id === gearId);
				return (
				  <SpeciesChip
					key={gearId}
					label={gear?.name || gearId}
					onClick={gear ? () => onOpenGear(gear.id) : null}
				  />
				);
			  })
			) : (
			  <p>No recommendations added yet.</p>
			)}
		  </div>
		</SectionBlock>

		<SectionBlock label="My field kit">
		  {isEditing ? (
			<>
			  {Object.entries(GEAR_CATEGORY_LABELS).map(([category, label]) => {
				const entries = regionalGear.filter((gear) => gear.category === category);
				if (!entries.length) return null;

				return (
				  <div key={category} style={{ marginBottom: "0.85rem" }}>
					<p className="loc-discovery-text">{label}</p>
					<div className="loc-species-row">
					  {entries.map((gear) => (
						<button
						  key={gear.id}
						  type="button"
						  className={`loc-species-chip ${
							draftLocation.fieldKitGearIds?.includes(gear.id) ? "active" : ""
						  }`}
						  onClick={() => toggleArrayValue("fieldKitGearIds", gear.id)}
						>
						  {gear.name}
						</button>
					  ))}
					</div>
				  </div>
				);
			  })}
			</>
		  ) : (
			<div className="loc-species-row">
			  {location.fieldKitGearIds?.length ? (
				location.fieldKitGearIds.map((gearId) => {
				  const gear = GEAR.find((g) => g.id === gearId);

				  return (
					<SpeciesChip
					  key={gearId}
					  label={gear?.name || gearId}
					  onClick={gear ? () => onOpenGear(gear.id) : null}
					/>
				  );
				})
			  ) : (
				<p>No gear, bait, rigs, or lures saved for this water yet.</p>
			  )}
			</div>
		  )}
		</SectionBlock>

		<SectionBlock label="My techniques">
		  {isEditing ? (
			<div className="loc-species-row">
			  {regionalTechniques.map((technique) => (
				<button
				  key={technique.id}
				  type="button"
				  className={`loc-species-chip ${
					draftLocation.techniqueIds?.includes(technique.id) ? "active" : ""
				  }`}
				  onClick={() => toggleArrayValue("techniqueIds", technique.id)}
				>
				  {technique.name}
				</button>
			  ))}
			</div>
		  ) : (
			<div className="loc-species-row">
			  {location.techniqueIds?.length ? (
				location.techniqueIds.map((techniqueId) => {
				  const technique = TECHNIQUES.find((entry) => entry.id === techniqueId);
				  return (
					<SpeciesChip
					  key={techniqueId}
					  label={technique?.name || techniqueId}
					  onClick={technique ? () => onOpenTechnique(technique.id) : null}
					/>
				  );
				})
			  ) : (
				<p>No techniques saved for this water yet.</p>
			  )}
			</div>
		  )}
		</SectionBlock>
      
		<SectionBlock label="Preferred time">
		  {isEditing ? (
			<select
			  className="loc-form-input"
			  value={draftLocation.preferredTimeStateId || ""}
			  onChange={(e) => updateDraft("preferredTimeStateId", e.target.value)}
			>
			  <option value="">No preferred time yet</option>
			  {TIME_STATE_OPTIONS.map((time) => (
				<option key={time.id} value={time.id}>
				  {time.label}
				</option>
			  ))}
			</select>
		  ) : location.preferredTimeStateId ? (
			<p>
			  {
				TIME_STATE_OPTIONS.find(
				  (time) => time.id === location.preferredTimeStateId
				)?.label || location.preferredTimeStateId
			  }
			</p>
		  ) : (
			<p>No preferred time added yet.</p>
		  )}
		</SectionBlock>
	  
          <SectionBlock label="Notes">
			  {isEditing ? (
				<textarea
				  className="loc-form-input loc-textarea"
				  value={draftLocation.notes || ""}
				  onChange={(e) => updateDraft("notes", e.target.value)}
				  placeholder="Best time of day, water behavior, access notes, memories..."
				/>
			  ) : location.notes ? (
				<p>{location.notes}</p>
			  ) : (
				<p>No notes added yet.</p>
			  )}
			</SectionBlock>
        

        <SectionBlock label="Photos">
          {location.photoUrls?.length ? (
            <div className="loc-chip-row">
              {location.photoUrls.map((url, i) => (
                <span key={url || i} className="loc-chip">
                  Photo {i + 1}
                </span>
              ))}
            </div>
          ) : (
            <p>Photos will live here as this place gathers memories.</p>
          )}
        </SectionBlock>
		
		<SectionBlock label="Recent catches here">
		  {catchesLoading ? (
			<p>Looking through the ledger...</p>
		  ) : locationCatches.length ? (
			<div className="loc-chip-row">
			  {locationCatches.map((entry) => (
				<span key={entry.id} className="loc-chip">
				  {entry.species} · {new Date(entry.catch_date).toLocaleDateString()}
				</span>
			  ))}
			</div>
		  ) : (
			<p>No catches logged here yet.</p>
		  )}
		</SectionBlock>

		<SectionBlock label="Trips planned here">
		  {tripsLoading ? (
			<p>Looking through planned waters...</p>
		  ) : locationTrips.length ? (
			<div className="loc-chip-row">
			  {locationTrips.map((trip) => (
				<span key={trip.id} className="loc-chip">
				  {trip.timing_label || trip.trip_date || "Planned trip"} ·{" "}
				  {trip.target_species?.[0] || "Whatever bites"}
				</span>
			  ))}
			</div>
		  ) : (
			<p>No trips planned here yet.</p>
		  )}
		</SectionBlock>

        <SectionBlock label="Field notes">
          {location.fieldNoteIds?.length ? (
            <div className="loc-chip-row">
              {location.fieldNoteIds.map((id) => (
                <span key={id} className="loc-chip">{id}</span>
              ))}
            </div>
          ) : (
            <p>Papa field notes can later be attached to this location.</p>
          )}
        </SectionBlock>

        <SectionBlock label="Journal entries">
          {location.journalEntryIds?.length ? (
            <div className="loc-chip-row">
              {location.journalEntryIds.map((id) => (
                <span key={id} className="loc-chip">{id}</span>
              ))}
            </div>
          ) : (
            <p>Reflections from this place can later appear here.</p>
          )}
        </SectionBlock>

        
      </div>
    </motion.div>
  );
}

export default function LocationsPage() {
  const [locations, setLocations] = useState(() => loadLocations());
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  

  const navigate = useNavigate();
  const routeLocation = useLocation();

  const DEBUG_SCENE = null;
  const { profilePacket } = useProfile();

  const displayName =
    profilePacket?.display_name ||
    profilePacket?.username ||
    profilePacket?.name ||
    "friend";

  const atmosphere = useAtmosphere("locations", {
    user: profilePacket,
    context: {
      view: selectedLocation ? "entry" : "home",
      locationName: selectedLocation?.name ?? null,
      locationType: selectedLocation?.waterTypeId ?? null,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          view: selectedLocation ? "entry" : "home",
          locationName: selectedLocation?.name ?? null,
        },
      })
    : atmosphere.scene;

  const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);
  
  const atmospherePacket = buildAtmospherePacket({
    page: "locations",
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

const atmosphericPerception = getAtmosphericPerception({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});


  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const cardStyle = styles.cardStyle ?? {};
  const transparentButtonStyle = styles.transparentButtonStyle ?? {};
  const textTheme = ui.text ?? {};
  const chipTheme = ui.chip ?? {};

  const cardTheme = {
    bg: cardStyle.background,
    border: cardStyle.border?.replace("1px solid ", ""),
    blur: ui.card?.blur,
    shadow: cardStyle.boxShadow,
  };

  const backButtonStyle = transparentButtonStyle;

  const papaContext = {
    page: "locations",
    user: profilePacket,
    atmosphere: atmospherePacket,
    scene,
    view: selectedLocation ? "entry" : "home",
    locationName: selectedLocation?.name || null,
    locationType: selectedLocation?.waterTypeId || null,
    event: selectedLocation
      ? `${displayName} is remembering ${selectedLocation.name}`
      : `${displayName} opened their saved locations`,
  };

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};

  function handleCreateLocation(newLocation) {
    setLocations((prev) => saveLocations([newLocation, ...prev]));
    setShowCreateForm(false);
    setSelectedLocation(newLocation);
  }

  useEffect(() => {
    const navState = routeLocation.state;

    if (navState?.selectedLocationId) {
      const matchedLocation = locations.find(
        (loc) => loc.id === navState.selectedLocationId
      );

      if (matchedLocation) {
        setSelectedLocation(matchedLocation);
      }
    }
  }, [routeLocation.state, locations]);


function handleUpdateLocation(updatedLocation) {
  setLocations((prev) =>
    saveLocations(
      prev.map((loc) =>
        loc.id === updatedLocation.id ? updatedLocation : loc
      )
    )
  );

  setSelectedLocation(updatedLocation);
}

  useEffect(() => subscribeToLocations(setLocations), []);

  return (
    <CastBackground
      chamberKey="locations"
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
	
	
	{atmosphericPerception && (
	  <div className="cast-atmospheric-perception">
		<strong>{atmosphericPerception.title}</strong>
		<span>{atmosphericPerception.description}</span>
	  </div>
	)}
	
	
	<div className="cast-atmospheric-awareness">
	  <strong>Awareness</strong>
	  <span>{atmosphericInvitation}</span>
	</div>
	
  </>
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
                <button
                  className="loc-new-btn"
                  onClick={() => setShowCreateForm((prev) => !prev)}
                  style={backButtonStyle}
                >
                  {showCreateForm ? "Close" : "+ New Location"}
                </button>

                <AnimatePresence>
                  {showCreateForm && (
                    <CreateLocationForm
                      onCreate={handleCreateLocation}
                      onCancel={() => setShowCreateForm(false)}
                      cardTheme={cardTheme}
                      textTheme={textTheme}
                      chipTheme={chipTheme}
                    />
                  )}
                </AnimatePresence>

                {locations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    onClick={setSelectedLocation}
                    cardTheme={cardTheme}
                    textTheme={textTheme}
                    chipTheme={chipTheme}
                  />
                ))}

                <p className="loc-more-hint">
                  Saved places become memory anchors as you return to the water.
                </p>
              </motion.div>
            )}

            {selectedLocation && (
              <LocationDetail
				  key={selectedLocation.id}
				  location={selectedLocation}
				  onBack={() => setSelectedLocation(null)}
				  onUpdateLocation={handleUpdateLocation}
				  onOpenSpecies={(entryId) =>
					navigate("/field-guide", {
					  state: {
						section: "species",
						entryId,
					  },
					})
				  }
				  onOpenWaterType={(entryId) =>
					navigate("/field-guide", {
					  state: {
						section: "waters",
						entryId,
					  },
					})
				  }
				  onOpenGear={(entryId) =>
					navigate("/field-guide", {
					  state: { section: "gear", entryId },
					})
				  }
				  onOpenTechnique={(entryId) =>
					navigate("/field-guide", {
					  state: { section: "techniques", entryId },
					})
				  }
				  cardTheme={cardTheme}
				  textTheme={textTheme}
				  chipTheme={chipTheme}
				  backButtonStyle={backButtonStyle}
				/>
            )}
          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}