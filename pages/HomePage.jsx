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
import HomeSectionCard from "../components/HomeSectionCard";
import { useProfile } from "../context/ProfileContext";

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
  { emoji: "", title: "Field Guide",  desc: "Explore and learn.",  path: "/species" },
  { emoji: "️", title: "Locations",          desc: "Your waters.",                    path: "/locations" },
  { emoji: "", title: "Journal",      desc: "Write what the day felt like.",   path: "/journal" },
  { emoji: "", title: "Talk to Papa",      desc: "Interact with Papa.",   path: "/papa" },
];


export default function HomePage() {
  const nav = useNavigate();
  const { profilePacket } = useProfile();
  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("home");

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE)
    : atmosphere.scene;

  const ui = scene?.timeState?.ui ?? {};

  
  const buttonTheme = ui.button;
  const cardTheme = ui.card;
  const textTheme = ui.text;
  
  const [activeAdventure] = useState(() => getActiveAdventure());
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [tripLoading, setTripLoading] = useState(true);
  const [openSection, setOpenSection] = useState(false);
  
  // Rotating footer whisper with fade
  const idxRef = useRef(0);
  const [whisper, setWhisper] = useState(WHISPERS[0]);
  const [whisperVisible, setWhisperVisible] = useState(true);

  const papaContext = {
  page: "home",
  user: profilePacket,
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
        <div className="home-dock home-dock--sections">
  <HomeSectionCard
    title="Adventures"
    summary={`${activeAdventure.title} · ${activeAdventure.step}`}
    open={openSection === "adventures"}
    onToggle={() =>
      setOpenSection(openSection === "adventures" ? null : "adventures")
    }
    cardTheme={cardTheme}
    textTheme={textTheme}
  >
    <div className="home-action-stack">
      <button
        className="home-action-pill"
        onClick={() => nav(`/adventures/${activeAdventure.id}`)}
      >
        <span>Continue Adventure</span>
        <small>{activeAdventure.title}</small>
      </button>

      <button
        className="home-action-pill"
        onClick={() => nav(`/adventures/${activeAdventure.id}`)}
      >
        <span>View Adventures</span>
        <small>Choose a journey by the water.</small>
      </button>
    </div>
  </HomeSectionCard>

  <HomeSectionCard
    title="Trips"
    summary={
      tripLoading
        ? "Loading your next trip..."
        : upcomingTrip
        ? `${upcomingTrip.location} · ${upcomingTrip.timing_label || "Planned"}`
        : "No upcoming trip planned"
    }
    open={openSection === "trips"}
    onToggle={() =>
      setOpenSection(openSection === "trips" ? null : "trips")
    }
    cardTheme={cardTheme}
    textTheme={textTheme}
  >
    <div className="home-action-stack">
      {upcomingTrip && (
        <button
          className="home-action-pill"
          onClick={() =>
            nav("/trip-summary", { state: { tripId: upcomingTrip.id } })
          }
        >
          <span>View Next Trip</span>
          <small>
            {upcomingTrip.location} · Targeting{" "}
            {upcomingTrip.target_species?.[0] || "whatever bites"}
          </small>
        </button>
      )}

      <button className="home-action-pill" onClick={() => nav("/plan-trip")}>
        <span>Create New Trip</span>
        <small>Plan where, when, and what you’re after.</small>
      </button>

      <button className="home-action-pill" onClick={() => nav("/plan-trip")}>
        <span>Upcoming Trips</span>
        <small>View or edit planned waters.</small>
      </button>

      <button className="home-action-pill" onClick={() => nav("/plan-trip")}>
        <span>Past Trips</span>
        <small>Return to where you’ve been.</small>
      </button>
    </div>
  </HomeSectionCard>

  <HomeSectionCard
    title="Explore"
    summary="Field Guide · Locations · Journal · Papa"
    open={openSection === "explore"}
    onToggle={() =>
      setOpenSection(openSection === "explore" ? null : "explore")
    }
    cardTheme={cardTheme}
    textTheme={textTheme}
  >
    <div className="home-action-grid">
      {PILLARS.map((p) => (
        <button
          key={p.path}
          className="home-action-pill"
          onClick={() => nav(p.path)}
        >
          <span>{p.emoji} {p.title}</span>
          <small>{p.desc}</small>
        </button>
      ))}

      <button className="home-action-pill" onClick={() => nav("/profile")}>
        <span>Profile</span>
        <small>Shape how CAST remembers you.</small>
      </button>
    </div>
  </HomeSectionCard>

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