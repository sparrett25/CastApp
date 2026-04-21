import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/home-dock.css";
import { getActiveAdventure } from "../utils/adventureState";
import { supabase } from "../lib/supabase";
import {
  buildPapaPageContext,
  buildTripContext,
} from "../utils/buildPapaPageContext";

// Rotating whisper lines at the bottom
const WHISPERS = [
  "Still water remembers. Cast with presence.",
  "Begin in patience; the bite will find you.",
  "Read the wind, listen to the tide, trust your line.",
  "Every cast is a story. What will yours be today?",
  "The water has a way of speaking if we listen.",
  "Show up, be quiet, and it'll come to you.",
];

// The five pillars — secondary navigation, quiet
const PILLARS = [
  { emoji: "📖", title: "Field Guide",  desc: "Species, gear, and technique.",  path: "/species" },
  { emoji: "🐟", title: "Catch Ledger", desc: "Your fishing record.",            path: "/catch-ledger" },
  { emoji: "🗺️", title: "Map",          desc: "Your waters.",                    path: "/map" },
  { emoji: "📜", title: "Journal",      desc: "Write what the day felt like.",   path: "/journal" },
];
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const nav = useNavigate();
  const [activeAdventure] = useState(() => getActiveAdventure());
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [tripLoading, setTripLoading] = useState(true);

  // Rotating footer whisper with fade
  const idxRef = useRef(0);
  const [whisper, setWhisper] = useState(WHISPERS[0]);
  const [whisperVisible, setWhisperVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadUpcomingTrip() {
      try {
        setTripLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          if (isMounted) setUpcomingTrip(null);
          return;
        }

        const { data, error } = await supabase
          .from("cast_upcoming_trip_summary")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (isMounted) {
          setUpcomingTrip(data ?? null);
        }
      } catch (err) {
        console.error("Upcoming trip load error:", err);
        if (isMounted) {
          setUpcomingTrip(null);
        }
      } finally {
        if (isMounted) {
          setTripLoading(false);
        }
      }
    }

    loadUpcomingTrip();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWhisperVisible(false);
      setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % WHISPERS.length;
        setWhisper(WHISPERS[idxRef.current]);
        setWhisperVisible(true);
      }, 600);
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <CastBackground chamberKey="home">
      <ChamberLayout
			  title={`${getGreeting()}, Grant.`}
			  sub="Your fishing world is waiting."
			  papa={
				<PapaMini
				  context={buildPapaPageContext("home", {
					event: "Grant opened the app.",
					trip: buildTripContext(upcomingTrip),
					entriesSummary: {
					  hasUpcomingTrip: !!upcomingTrip,
					},
				  })}
				  fallbackKey="home.welcome"
				/>
			  }
			>
        <div className="home-dock">

          {/* Active Adventure Card */}
          <section className="home-adventure-section">
            <p className="home-section-label">Your Adventure</p>
            <motion.button
              className="adventure-card"
              onClick={() => nav(`/adventures/${activeAdventure.id}`)}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <div className="adventure-card-inner">
                <div className="adventure-card-left">
                  {activeAdventure.isNew && (
                    <span className="adventure-new-badge">New</span>
                  )}
                  <h2 className="adventure-title">{activeAdventure.title}</h2>
                  <p className="adventure-location">{activeAdventure.location}</p>
                  <p className="adventure-step">{activeAdventure.step}</p>
                </div>
                <div className="adventure-card-right">
                  <span className="adventure-arrow">→</span>
                </div>
              </div>
              <div className="adventure-progress-track">
                <motion.div
                  className="adventure-progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeAdventure.progress}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </motion.button>
          </section>

          {/* Upcoming Trip Card */}
          {!tripLoading && upcomingTrip && (
            <section className="home-adventure-section">
              <p className="home-section-label">Upcoming Trip</p>
              <motion.button
                className="adventure-card trip-card"
                onClick={() => nav("/trip-summary", { state: { tripId: upcomingTrip.id } })}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className="adventure-card-inner">
                  <div className="adventure-card-left">
                    <span
                      className="adventure-new-badge"
                      style={{
                        background: "rgba(15,110,86,0.25)",
                        color: "#5DCAA5",
                        borderColor: "rgba(15,110,86,0.4)"
                      }}
                    >
                      {upcomingTrip.timing_label || "Planned"}
                    </span>
                    <h2 className="adventure-title">{upcomingTrip.location}</h2>
                    <p className="adventure-location">
                      Targeting {upcomingTrip.target_species?.[0] || "Whatever bites"}
                      {upcomingTrip.duration_label ? ` · ${upcomingTrip.duration_label}` : ""}
                    </p>
                  </div>
                  <div className="adventure-card-right">
                    <span className="adventure-arrow">→</span>
                  </div>
                </div>
              </motion.button>
            </section>
          )}

          {/* Secondary Pillars */}
          <section className="home-pillars-section">
            <p className="home-section-label">Explore</p>
            <div className="home-pillars-grid">
              {PILLARS.map((p) => (
                <motion.button
                  key={p.path}
                  className="pillar-card"
                  onClick={() => nav(p.path)}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <span className="pillar-emoji">{p.emoji}</span>
                  <div>
                    <p className="pillar-title">{p.title}</p>
                    <p className="pillar-desc">{p.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Papa whisper footer */}
          <div className="home-whisper-bar">
            <AnimatePresence mode="wait">
              {whisperVisible && (
                <motion.p
                  key={whisper}
                  className="home-whisper-line"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5 }}
                >
                  ~ {whisper} ~
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => supabase.auth.signOut()}>
            Log Out
          </button>

        </div>
      </ChamberLayout>
    </CastBackground>
  );
}