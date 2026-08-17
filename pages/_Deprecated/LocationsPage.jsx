import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/locations.css";
import "../styles/global/atmosphere.css";
import { SPECIES } from "../data/species";
import { waterTypes } from "../data/waterTypes";
import { REGION_OPTIONS } from "../data/regionOptions";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import { supabase } from "../lib/supabase";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
  getAtmosphericPerception,
} from "../utils/resolveChamberBackground";


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
  const [form, setForm] = useState({
    name: "",
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

    if (!form.name.trim() || !form.waterTypeId) return;

    onCreate({
      name: form.name.trim(),
      waterTypeId: form.waterTypeId,
    });
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
      <p
        className="loc-card-eyebrow"
        style={{ color: textTheme?.secondary }}
      >
        Create Location
      </p>

      <h3
        className="loc-card-title"
        style={{ color: textTheme?.primary }}
      >
        Add a new water
      </h3>

      <label className="loc-form-label">
        Location Name
        <input
          className="loc-form-input"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Backyard Pond"
        />
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

        <button
          type="button"
          className="loc-cancel-btn"
          onClick={onCancel}
        >
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
          {location.isFavorite && (
            <span
              className="loc-difficulty"
              style={{
                background: chipTheme?.activeBg,
                border: `1px solid ${chipTheme?.border}`,
                color: chipTheme?.text,
              }}
            >
              ★ Favorite
            </span>
          )}
          <span
            className="loc-difficulty"
            style={{
              background: chipTheme?.activeBg,
              border: `1px solid ${chipTheme?.border}`,
              color: chipTheme?.text,
            }}
          >
            {location.isActive === false ? "Inactive" : "Active"}
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

function saveEdits() {
  onUpdateLocation(draftLocation);
  setIsEditing(false);
}

  const [locationCatches, setLocationCatches] = useState([]);
  const [catchesLoading, setCatchesLoading] = useState(false);
  const [locationTrips, setLocationTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);
  
const speciesContextLocation = isEditing ? draftLocation : location;

const likelySpecies = SPECIES.filter((species) => {
  const matchesRegion =
    species.regionIds?.includes(speciesContextLocation.regionId) ||
    species.regions?.includes(speciesContextLocation.regionId);

  const matchesWater =
    species.waterTypeIds?.includes(speciesContextLocation.waterTypeId) ||
    species.waterTypes?.includes(speciesContextLocation.waterTypeId);

  return matchesRegion && matchesWater;
});


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
        .eq("location_key", location.locationKey)
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
}, [location.locationKey]);

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
        .eq("location_key", location.locationKey)
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
}, [location.locationKey]);


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
                {regionList.map((regionOption) => (
                  <option
                    key={regionOption.id || regionOption.key}
                    value={regionOption.id || regionOption.key}
                  >
                    {regionOption.label}
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
                {waterTypes.map((waterOption) => (
                  <option key={waterOption.id} value={waterOption.id}>
                    {waterOption.label}
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
            <p className="loc-stat-label">Status</p>
            {isEditing ? (
              <button
                type="button"
                className={`loc-species-chip ${
                  draftLocation.isActive !== false ? "active" : ""
                }`}
                onClick={() =>
                  updateDraft("isActive", draftLocation.isActive === false)
                }
              >
                {draftLocation.isActive === false ? "Inactive" : "Active"}
              </button>
            ) : (
              <p className="loc-stat-value">
                {location.isActive === false ? "Inactive" : "Active"}
              </p>
            )}
          </div>
        </div>

        <SectionBlock label="Relationship">
          {isEditing ? (
            <div className="loc-species-row">
              <button
                type="button"
                className={`loc-species-chip ${
                  draftLocation.isFavorite ? "active" : ""
                }`}
                onClick={() =>
                  updateDraft("isFavorite", !draftLocation.isFavorite)
                }
              >
                {draftLocation.isFavorite ? "★ Favorite" : "☆ Mark as favorite"}
              </button>
            </div>
          ) : (
            <p>
              {location.isFavorite
                ? "This is one of your favorite waters."
                : "This location is part of your saved waters."}
            </p>
          )}
        </SectionBlock>

        <SectionBlock label="About this water">
          <p className="loc-discovery-text">
            CAST uses this location&apos;s region and water type to connect it with the Field Guide.
          </p>
          <div className="loc-species-row">
            {likelySpecies.length ? (
              likelySpecies.map((species) => (
                <SpeciesChip
                  key={species.id}
                  label={species.name}
                  onClick={() => onOpenSpecies(species.id)}
                />
              ))
            ) : (
              <p>No species are mapped for this region and water type yet.</p>
            )}
          </div>
        </SectionBlock>

        <SectionBlock label="Notes">
          {isEditing ? (
            <textarea
              className="loc-form-input loc-textarea"
              value={draftLocation.notes || ""}
              onChange={(e) => updateDraft("notes", e.target.value)}
              placeholder="Access notes, water behavior, things worth remembering..."
            />
          ) : location.notes ? (
            <p>{location.notes}</p>
          ) : (
            <p>No personal notes added yet.</p>
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





        
      </div>
    </motion.div>
  );
}

function mapLocationFromDb(row) {
  return {
    ...row,
    locationKey: row.location_key,
    regionId: row.region_key,
    waterTypeId: row.water_type_key,
    isActive: row.is_active,
    isFavorite: row.is_favorite,
  };
}

function makeLocationKey(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}





export default function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
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
  
  
  useEffect(() => {
  let cancelled = false;

  async function fetchLocations() {
    try {
      setLocationsLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        if (!cancelled) setLocations([]);
        return;
      }

      const { data, error } = await supabase
        .from("cast_locations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (!cancelled) {
        setLocations((data ?? []).map(mapLocationFromDb));
      }
    } catch (error) {
      console.error("Locations load error:", error);

      if (!cancelled) {
        setLocations([]);
      }
    } finally {
      if (!cancelled) {
        setLocationsLoading(false);
      }
    }
  }

  fetchLocations();

  return () => {
    cancelled = true;
  };
}, []);
  
   
  
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

  
  async function handleCreateLocation(newLocation) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("No authenticated user found.");

    const locationKey = makeLocationKey(newLocation.name);

    const { data, error } = await supabase
      .from("cast_locations")
      .insert({
        user_id: user.id,
        location_key: locationKey,
        name: newLocation.name,
        region_key: resolvedRegion,
        water_type_key: newLocation.waterTypeId,
      })
      .select()
      .single();

    if (error) throw error;

    const mappedLocation = mapLocationFromDb(data);

    setLocations((prev) => [mappedLocation, ...prev]);
    setShowCreateForm(false);
    setSelectedLocation(mappedLocation);
  } catch (error) {
    console.error("Create location error:", error);
  }
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


async function handleUpdateLocation(updatedLocation) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("No authenticated user found.");

    const { data, error } = await supabase
      .from("cast_locations")
      .update({
        name: updatedLocation.name.trim(),
        region_key: updatedLocation.regionId,
        water_type_key: updatedLocation.waterTypeId,
        notes: updatedLocation.notes?.trim() || null,
        is_active: updatedLocation.isActive ?? true,
        is_favorite: updatedLocation.isFavorite ?? false,
      })
      .eq("id", updatedLocation.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;

    const mappedLocation = mapLocationFromDb(data);

    setLocations((prev) =>
      prev.map((loc) => (loc.id === mappedLocation.id ? mappedLocation : loc))
    );
    setSelectedLocation(mappedLocation);
  } catch (error) {
    console.error("Update location error:", error);
  }
}


 

  const visibleLocations = [...locations]
    .filter((location) => location.isActive !== false)
    .sort((a, b) => Number(Boolean(b.isFavorite)) - Number(Boolean(a.isFavorite)));

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

                {locationsLoading && (
                  <p className="loc-more-hint">Gathering your saved waters...</p>
                )}

                {!locationsLoading && visibleLocations.length === 0 && (
                  <p className="loc-more-hint">
                    No active locations yet. Add a water when you are ready.
                  </p>
                )}

                {visibleLocations.map((location) => (
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