import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/locations.css";
import grantQuests from "../data/stories/grant/quests.json";
import { SPECIES } from "../data/species";
import { GEAR } from "../data/gear";
import { waterTypes } from "../data/waterTypes";
import { REGION_OPTIONS } from "../data/regionOptions";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import { MY_LOCATIONS } from "../data/myLocations";
import { supabase } from "../lib/supabase";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

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
  onOpenAdventure,
  onOpenSpecies,
  onOpenWaterType,
  cardTheme,
  textTheme,
  chipTheme,
  backButtonStyle,
}) {
  const water = waterTypes.find((w) => w.id === location.waterTypeId);
  const region = Object.values(REGION_OPTIONS).find(
    (r) => r.id === location.regionId || r.key === location.regionId
  );

  const [locationCatches, setLocationCatches] = useState([]);
  const [catchesLoading, setCatchesLoading] = useState(false);
  const [locationTrips, setLocationTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(false);

  const memoryCount =
    (location.photoUrls?.length || 0) +
    (location.fieldNoteIds?.length || 0) +
    (location.journalEntryIds?.length || 0);

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
          Locations · {water?.label || location.waterTypeId || "Saved Place"}
        </p>

        <h2 className="loc-detail-title">{location.name}</h2>

        {location.notes && (
          <p className="loc-detail-subtitle">{location.notes}</p>
        )}

        <div className="loc-stats-row">
          <div className="loc-stat">
            <p className="loc-stat-label">Region</p>
            <p className="loc-stat-value">
              {region?.label || location.regionId || "Unassigned"}
            </p>
          </div>



          <div className="loc-stat">
		  <p className="loc-stat-label">Water Type</p>

		  <SpeciesChip
			label={water?.label || location.waterTypeId || "Unassigned"}
			onClick={water ? () => onOpenWaterType(water.id) : null}
		  />
		</div>
				  
		  
		  

          <div className="loc-stat">
            <p className="loc-stat-label">Memories</p>
            <p className="loc-stat-value">{memoryCount}</p>
          </div>
        </div>

        <SectionBlock label="Known species">
          <div className="loc-species-row">
            {location.speciesIds?.length ? (
              location.speciesIds.map((speciesId) => {
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
              <p>No species added yet.</p>
            )}
          </div>
        </SectionBlock>

        <SectionBlock label="Preferred gear">
          <div className="loc-species-row">
            {location.gearIds?.length ? (
              location.gearIds.map((gearId) => {
                const gear = GEAR.find((g) => g.id === gearId);

                return (
                  <SpeciesChip
                    key={gearId}
                    label={gear?.name || gearId}
                    onClick={null}
                  />
                );
              })
            ) : (
              <p>No preferred gear added yet.</p>
            )}
          </div>
        </SectionBlock>

        {location.notes && (
          <SectionBlock label="Notes">
            <p>{location.notes}</p>
          </SectionBlock>
        )}

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
  const [selectedLocation, setSelectedLocation] = useState(null);
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


const atmospherePacket = buildAtmospherePacket({
  page: "home",
  region: scene?.regionKey || profilePacket?.favoriteRegion || "central-florida",
  timeState: scene?.timeState?.key,
  weatherState: scene?.weatherState?.key || "clear-sky",
  user: profilePacket,
  context: {
    hasUpcomingTrip: Boolean(upcomingTrip),
    activeAdventure,
  },
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

  useEffect(() => {
    const navState = routeLocation.state;

    if (navState?.selectedLocationId) {
      const matchedLocation = MY_LOCATIONS.find(
        (loc) => loc.id === navState.selectedLocationId
      );

      if (matchedLocation) {
        setSelectedLocation(matchedLocation);
      }
    }
  }, [routeLocation.state]);

  return (
    <CastBackground
      chamberKey="locations"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
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
                {MY_LOCATIONS.map((location) => (
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