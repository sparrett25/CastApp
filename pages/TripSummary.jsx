import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import { supabase } from "../lib/supabase";
import "../styles/pages/trip-summary.css";

export default function TripSummary() {
  const nav = useNavigate();
  const location = useLocation();

  const tripId = location.state?.tripId || null;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTrip() {
      try {
        setLoading(true);
        setError("");

        if (!tripId) {
          throw new Error("No trip was selected.");
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("You must be logged in to view this trip.");

        const { data, error } = await supabase
          .from("cast_trip_plans")
          .select("*")
          .eq("id", tripId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Trip not found.");

        if (isMounted) {
          setTrip(data);
        }
      } catch (err) {
        console.error("Trip summary load error:", err);
        if (isMounted) {
          setError(err.message || "Could not load trip.");
          setTrip(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTrip();

    return () => {
      isMounted = false;
    };
  }, [tripId]);

  if (loading) {
    return (
      <CastBackground chamberKey="trip-summary">
        <ChamberLayout
          title="Trip Summary"
          sub="Loading your itinerary..."
          papa={<PapaMini context={{ event: "Loading saved trip summary" }} />}
        >
          <div className="trip-summary-page">
		  <div className="trip-summary-card">
            <p>Loading trip...</p>
          </div>
		  </div>
        </ChamberLayout>
      </CastBackground>
    );
  }

  if (error || !trip) {
    return (
      <CastBackground chamberKey="trip-summary">
        <ChamberLayout
          title="Trip Summary"
          sub="Something interrupted the itinerary."
          papa={<PapaMini context={{ event: "Trip summary unavailable" }} />}
        >
          <div className="trip-summary-card">
            <p style={{ marginBottom: "1rem" }}>{error || "Trip not found."}</p>
            <div className="trip-summary-actions">
              <button className="trip-home-btn" onClick={() => nav("/home")}>
                Back to Home
              </button>
              <button className="trip-new-btn" onClick={() => nav("/plan-trip")}>
                Plan a Trip
              </button>
            </div>
          </div>
        </ChamberLayout>
      </CastBackground>
    );
  }

  const targetLabel = trip.target_species?.[0] || "Whatever bites";

  return (
    <CastBackground chamberKey="trip-summary">
      <ChamberLayout
        title="Trip Summary"
        sub="A saved plan for the water ahead."
        papa={
          <PapaMini
            context={{
              event: `Grant is viewing a saved trip to ${trip.location} targeting ${targetLabel}`,
            }}
          />
        }
      >
        <div className="trip-summary-card">
          <div className="trip-summary-header">
            <div>
              <p className="trip-summary-when">{trip.timing_label || "Planned Trip"}</p>
              <h2 className="trip-summary-title">{trip.location}</h2>
              <p className="trip-summary-sub">
                Targeting {targetLabel}
                {trip.duration_label ? ` · ${trip.duration_label}` : ""}
              </p>
              {trip.trip_date && (
                <p className="trip-summary-sub" style={{ marginTop: ".35rem", opacity: 0.8 }}>
                  {trip.trip_date}
                </p>
              )}
            </div>
            <div className="trip-summary-badge">📍</div>
          </div>

          {trip.scooter_note && (
            <div className="trip-scooter-block">
              <p className="trip-voice-attr">Scooter</p>
              <p className="trip-voice-text">"{trip.scooter_note}"</p>
            </div>
          )}

          <div className="trip-papa-block">
            <p className="trip-voice-attr">Papa</p>
            <PapaSpeaks
              context={{
                event: `Grant is reviewing his trip to ${trip.location} targeting ${targetLabel} ${trip.timing_label?.toLowerCase() || ""}`,
              }}
              fallbackKey="fallback"
              trigger={trip.id}
            />
          </div>

          <div className="trip-checklist">
            <p className="trip-checklist-label">What to bring</p>

            {Array.isArray(trip.checklist_items) && trip.checklist_items.length > 0 ? (
              trip.checklist_items.map((item, i) => (
                <div key={i} className="trip-checklist-item">
                  <span className="trip-check-dot" />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <p>No checklist saved for this trip.</p>
            )}

            {trip.summary_text && (
              <p className="trip-weather-note" style={{ marginTop: "1rem" }}>
                {trip.summary_text}
              </p>
            )}
          </div>

          <div className="trip-summary-actions">
            <button className="trip-home-btn" onClick={() => nav("/home")}>
              Back to Home
            </button>
            <button className="trip-new-btn" onClick={() => nav("/plan-trip")}>
              Plan another trip
            </button>
          </div>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}