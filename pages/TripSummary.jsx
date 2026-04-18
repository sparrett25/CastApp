import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { say } from "../data/say";
import { getTrip, upsertTripFields, formatWindow } from "../utils/trips";
import { listGear } from "../data/gear/loader";
import { TECHNIQUES } from "../data/techniques"; // if you put techniques elsewhere, adjust path
import CastBackground from "../components/CastBackground"; // adjust path if needed

export default function TripSummary() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const nav = useNavigate();

  const [trip, setTrip] = useState(() => getTrip(id));

  useEffect(() => {
    setTrip(getTrip(id));
  }, [id]);

  // -------- Suggestions (simple, tag-based)
  const envTag = useMemo(() => {
    const w = (trip?.water || "").toLowerCase();
    if (w.includes("bay") || w.includes("gulf") || w.includes("salt")) return "saltwater";
    return "freshwater";
  }, [trip]);

  const gearPicks = useMemo(() => {
    const all = listGear();
    // prefer freshwater/saltwater + beginner/intermediate
    const score = g => {
      let s = 0;
      if (g.tags?.some(t => t.variant === envTag)) s += 2;
      if (g.tags?.some(t => t.variant === "beginner" || t.variant === "intermediate")) s += 1;
      return s;
    };
    return [...all].sort((a,b)=>score(b)-score(a)).slice(0,3);
  }, [envTag]);

  const techPicks = useMemo(() => {
    const score = t => {
      let s = 0;
      if (t.tags?.some(x => x.variant === envTag)) s += 2;
      if (t.tags?.some(x => x.variant === "beginner" || x.variant === "intermediate")) s += 1;
      return s;
    };
    return [...(TECHNIQUES || [])].sort((a,b)=>score(b)-score(a)).slice(0,3);
  }, [envTag]);

  if (!trip) {
    return (
      <ChamberLayout
        title="Trip Summary"
        sub="Nothing planned yet—start with a time and a question."
        papa={<PapaMini line={say("summary.note")} />}
      >
        <Link className="btn-primary inline-block" to="/plan">Plan a trip</Link>
      </ChamberLayout>
    );
  }

  const startFishing = () => {
    upsertTripFields(trip.id, { status: "fishing", startedAt: new Date().toISOString() });
    nav(`/journal?id=${encodeURIComponent(trip.id)}`);
  };

  const goRitual = () => nav(`/mirror-lake?id=${encodeURIComponent(trip.id)}`);

  return (
  <CastBackground chamberKey="trip-summary">
    <ChamberLayout
      title="Trip Summary"
      sub="A quick readout of your window, place, and starting plan."
      papa={<PapaMini line={say("summary.note")} />}
    >
      <div className="section-card">
        <div className="text-white/90 font-medium mb-1">When</div>
        <div className="text-white/70">{formatWindow(trip)}</div>
      </div>

      <div className="section-card">
        <div className="text-white/90 font-medium mb-1">Place</div>
        <div className="text-white/70">{trip.water || "—"}</div>
        {trip.pinId ? (
          <Link to={`/map?focus=${encodeURIComponent(trip.pinId)}`} className="inline-block mt-2 underline">View on Map</Link>
        ) : null}
      </div>

      <div className="section-card">
        <div className="text-white/90 font-medium mb-1">Target</div>
        <div className="text-white/70">
          Primary: <span className="font-medium">{trip.target?.primary || "—"}</span>
          {trip.target?.secondary ? <> · Secondary: <span className="font-medium">{trip.target.secondary}</span></> : null}
        </div>
        {trip.intent ? <div className="text-white/60 mt-2 italic">“{trip.intent}”</div> : null}
      </div>

      {/* Suggestions */}
      <div className="section-card">
        <div className="text-white/90 font-medium mb-3">Suggested Gear</div>
        <div className="tile-grid">
          {gearPicks.map(g => (
            <Link key={g.slug} to={`/gear/${g.slug}`} className="tile">
              <span className="tile-icn" aria-hidden>{g.icon || "🎣"}</span>
              <div className="tile-txt">
                <div className="tile-title">{g.title}</div>
                <div className="tile-sub">{g.summary}</div>
              </div>
              <span className="tile-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="section-card">
        <div className="text-white/90 font-medium mb-3">Suggested Techniques</div>
        <div className="tile-grid">
          {techPicks.map(t => (
            <Link key={t.id} to={`/techniques/${t.id}`} className="tile">
              <span className="tile-icn" aria-hidden>{t.icon || "🎯"}</span>
              <div className="tile-txt">
                <div className="tile-title">{t.title}</div>
                <div className="tile-sub">{t.sub}</div>
              </div>
              <span className="tile-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="actions flex gap-3">
        <button className="btn-primary" onClick={goRitual}>Mirror Lake (Centering)</button>
        <button className="btn-primary" onClick={startFishing}>Start Trip</button>
      </div>
    </ChamberLayout>
	</CastBackground>
  );
}
