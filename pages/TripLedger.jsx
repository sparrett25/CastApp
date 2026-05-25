// src/pages/TripLedger.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";

import { supabase } from "../lib/supabase";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import "../styles/pages/trip-ledger.css";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function formatDateLabel(dateString) {
  if (!dateString) return "Date not set";

  const date = new Date(`${dateString}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTargetLabel(trip) {
  return trip?.target_species?.[0] || "Whatever bites";
}

function TripCard({
  trip,
  type,
  cardStyle,
  primaryButtonStyle,
  secondaryButtonStyle,
  mutedTextColor,
  onView,
  onEdit,
  onDelete,
  chipStyle,
}) {
  const targetLabel = getTargetLabel(trip);

  
  return (
    <article className={`trip-ledger-card ${type}`} style={cardStyle}>
      <div className="trip-ledger-card-header">
        <div>
          <p className="trip-ledger-date" style={{ color: mutedTextColor }}>
            {trip.timing_label || formatDateLabel(trip.trip_date)}
          </p>

          <h3 className="trip-ledger-title">{trip.location || trip.title}</h3>

          <p className="trip-ledger-sub" style={{ color: mutedTextColor }}>
            Targeting {targetLabel}
            {trip.duration_label ? ` · ${trip.duration_label}` : ""}
          </p>
        </div>

        <span
		  className="trip-ledger-status"
		  style={chipStyle}
		>
          {trip.status || "planned"}
        </span>
      </div>

      {trip.scooter_note && (
        <p className="trip-ledger-note">“{trip.scooter_note}”</p>
      )}

      <div className="trip-ledger-actions">
        <button style={primaryButtonStyle} onClick={() => onView(trip)}>
          View
        </button>

        

        <button style={secondaryButtonStyle} onClick={() => onDelete(trip)}>
          Remove
        </button>
      </div>
    </article>
  );
}

export default function TripLedger() {
  const nav = useNavigate();
  const location = useLocation();
  const { profilePacket } = useProfile();
  
  const DEBUG_SCENE = null;

 const atmosphere = useAtmosphere("trips", {
  user: profilePacket,
});

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE)
    : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

const atmospherePacket = buildAtmospherePacket({
  page: "trips",
  region: scene?.regionKey || profilePacket?.favoriteRegion || "central-florida",
  timeState: scene?.timeState?.key,
  weatherState: scene?.weatherState?.key || "clear-sky",
  user: profilePacket,
  
});

const chipStyle = {
  background: ui.chip?.bg,
  border: `1px solid ${ui.chip?.border ?? "rgba(255,255,255,0.12)"}`,
  color: ui.chip?.text,
};


  const cardStyle = styles.cardStyle ?? {};
  const primaryButtonStyle = styles.buttonPrimaryStyle ?? {};
  const secondaryButtonStyle = styles.buttonSecondaryStyle ?? {};
  const textTheme = ui.text ?? {};

  const searchParams = new URLSearchParams(location.search);
  const initialFilter = searchParams.get("filter") || "upcoming";

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ledgerError, setLedgerError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

const displayName =
  profilePacket?.display_name ||
  profilePacket?.username ||
  "The angler";
  
  useEffect(() => {
    let isMounted = true;

    async function loadTrips() {
      try {
        setLoading(true);
        setLedgerError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("You must be logged in to view trips.");

        const { data, error } = await supabase
          .from("cast_trip_plans")
          .select("*")
          .eq("user_id", user.id)
          .order("trip_date", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setTrips(data || []);
        }
      } catch (err) {
        console.error("Trip ledger load error:", err);
        if (isMounted) {
          setLedgerError(err.message || "Could not load trips.");
          setTrips([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTrips();

    return () => {
      isMounted = false;
    };
  }, []);

  const { upcomingTrips, pastTrips } = useMemo(() => {
    const today = getTodayKey();

    const upcoming = [];
    const past = [];

    trips.forEach((trip) => {
      const isCompleted = trip.status === "completed";
      const isCancelled = trip.status === "cancelled";
      const isPastDate = trip.trip_date && trip.trip_date < today;

      if (isCompleted || isCancelled || isPastDate) {
        past.push(trip);
      } else {
        upcoming.push(trip);
      }
    });

    return {
      upcomingTrips: upcoming,
      pastTrips: past.sort((a, b) => {
        const aDate = a.trip_date || "";
        const bDate = b.trip_date || "";
        return bDate.localeCompare(aDate);
      }),
    };
  }, [trips]);

  const visibleTrips =
    activeFilter === "past" ? pastTrips : upcomingTrips;

  const papaContext = {
    page: "trips",
    atmosphere: atmospherePacket,
	scene,
    context: {
      upcomingCount: upcomingTrips.length,
      pastCount: pastTrips.length,
      activeFilter,
    },
    event:
  activeFilter === "past"
    ? `${displayName} is looking back through past fishing trips.`
    : `${displayName} is reviewing upcoming fishing trips.`,
  };

  function handleView(trip) {
    nav("/trip-summary", { state: { tripId: trip.id } });
  }

  function handleEdit(trip) {
    nav("/plan-trip", { state: { mode: "edit", tripId: trip.id } });
  }

  async function handleDelete(trip) {
    const confirmed = window.confirm(
      `Remove this trip to ${trip.location || trip.title}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(trip.id);

      const { error } = await supabase
        .from("cast_trip_plans")
        .delete()
        .eq("id", trip.id);

      if (error) throw error;

      setTrips((current) => current.filter((t) => t.id !== trip.id));
    } catch (err) {
      console.error("Trip delete error:", err);
      setLedgerError(err.message || "Could not remove trip.");
    } finally {
      setDeletingId(null);
    }
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
            context={papaContext}
            fallbackKey="fallback"
            trigger={`${activeFilter}-${upcomingTrips.length}-${pastTrips.length}`}
          />
        }
      >
        <div className="trip-ledger-page">
          <div className="trip-ledger-top" style={cardStyle}>
            <div>
              <p className="trip-ledger-kicker" style={{ color: textTheme?.secondary }}>
                Your waters
              </p>
              <h2 className="trip-ledger-heading">Trip Ledger</h2>
              <p className="trip-ledger-intro" style={{ color: textTheme?.secondary }}>
                Plan what is ahead, return to where you have been, and let each trip become part of the story.
              </p>
            </div>

            <button
              className="trip-ledger-new-btn"
              style={primaryButtonStyle}
              onClick={() => nav("/plan-trip")}
            >
              Plan New Trip
            </button>
          </div>

          <div className="trip-ledger-tabs">
            <button
              className={activeFilter === "upcoming" ? "active" : ""}
              style={activeFilter === "upcoming" ? primaryButtonStyle : secondaryButtonStyle}
              onClick={() => setActiveFilter("upcoming")}
            >
              Upcoming · {upcomingTrips.length}
            </button>

            <button
              className={activeFilter === "past" ? "active" : ""}
              style={activeFilter === "past" ? primaryButtonStyle : secondaryButtonStyle}
              onClick={() => setActiveFilter("past")}
            >
              Past · {pastTrips.length}
            </button>
          </div>

          {loading && (
            <div className="trip-ledger-empty" style={cardStyle}>
              Loading trips...
            </div>
          )}

          {ledgerError && (
            <div className="trip-ledger-empty" style={cardStyle}>
              {ledgerError}
            </div>
          )}

          {!loading && !ledgerError && visibleTrips.length === 0 && (
            <div className="trip-ledger-empty" style={cardStyle}>
              {activeFilter === "past"
                ? "No past trips yet. The water will remember once you begin."
                : "No upcoming trips planned yet."}

              {activeFilter === "upcoming" && (
                <button
                  style={primaryButtonStyle}
                  onClick={() => nav("/plan-trip")}
                >
                  Plan your first trip
                </button>
              )}
            </div>
          )}

          {!loading && !ledgerError && visibleTrips.length > 0 && (
            <div className="trip-ledger-list">
              {visibleTrips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  type={activeFilter}
                  cardStyle={{
                    ...cardStyle,
                    opacity: deletingId === trip.id ? 0.55 : 1,
                  }}
				  chipStyle={chipStyle}
                  primaryButtonStyle={primaryButtonStyle}
                  secondaryButtonStyle={secondaryButtonStyle}
                  mutedTextColor={textTheme?.secondary}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}