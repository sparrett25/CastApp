import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/home-dock.css";
import { getActiveAdventure } from "../utils/adventureState";
import { supabase } from "../lib/supabase";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";


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
  { emoji: "📖", title: "Field Guide",  desc: "Explore and learn.",  path: "/species" },
  { emoji: "🗺️", title: "Locations",          desc: "Your waters.",                    path: "/locations" },
  { emoji: "📜", title: "Journal",      desc: "Write what the day felt like.",   path: "/journal" },
  { emoji: "💬", title: "Talk to Papa",      desc: "Interact with Papa.",   path: "/papa" },
];
function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const nav = useNavigate();
  
  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("home");

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE)
    : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? {};

  const bubbleTheme = ui.bubble;
  const inputTheme = ui.input;
  const buttonTheme = ui.button;
  const cardTheme = ui.card;
  const textTheme = ui.text;
  
  const [activeAdventure] = useState(() => getActiveAdventure());
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [tripLoading, setTripLoading] = useState(true);

  // Rotating footer whisper with fade
  const idxRef = useRef(0);
  const [whisper, setWhisper] = useState(WHISPERS[0]);
  const [whisperVisible, setWhisperVisible] = useState(true);

  const papaContext = {
  page: "home",
  };

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
    <CastBackground
	  chamberKey="home"
	  variant={scene?.backgroundVariant}
	  overlay={scene?.timeState?.ui?.overlay}
	>
      <ChamberLayout
			  papa={
				<PapaMini
				  context={papaContext}
				  fallbackKey="home.welcome"
				/>
			  }
			>
        <div className="home-dock">

          {/* Active Adventure Card */}
          <section className="home-adventure-section">
            <p className="home-section-label"
			style={{ color: textTheme?.secondary }}
			>Your Adventure</p>
            <motion.button
              className="adventure-card"
			  style={{
				  background: cardTheme?.bg,
				  border: `1px solid ${cardTheme?.border}`,
				  backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
				  WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
				  boxShadow: cardTheme?.shadow,
				  color: textTheme?.primary,
				}}
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
              <p className="home-section-label"
			  style={{ color: textTheme?.secondary }}
			  >Upcoming Trip</p>
              <motion.button
                className="adventure-card trip-card"
				style={{
				  background: cardTheme?.bg,
				  border: `1px solid ${cardTheme?.border}`,
				  backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
				  WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
				  boxShadow: cardTheme?.shadow,
				  color: textTheme?.primary,
				}}
                onClick={() => nav("/trip-summary", { state: { tripId: upcomingTrip.id } })}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className="adventure-card-inner">
                  <div className="adventure-card-left">
                    <span
                      className="adventure-new-badge"
                      style={{
						  background: ui.chip?.activeBg,
						  border: `1px solid ${ui.chip?.border || buttonTheme?.border}`,
						  color: ui.chip?.text,
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
            <p className="home-section-label"
			style={{ color: textTheme?.secondary }}
			>Explore</p>
            <div className="home-pillars-grid">
              {PILLARS.map((p) => (
                <motion.button
                  key={p.path}
                  className="pillar-card"
				  style={{
					  background: cardTheme?.bg,
					  border: `1px solid ${cardTheme?.border}`,
					  backdropFilter: `blur(${cardTheme?.blur || "18px"})`,
					  WebkitBackdropFilter: `blur(${cardTheme?.blur || "18px"})`,
					  boxShadow: cardTheme?.shadow,
					  color: textTheme?.primary,
					}}
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
				  style={{ color: textTheme?.secondary }}
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
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}