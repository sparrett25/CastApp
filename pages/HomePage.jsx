import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import HomeSectionCard from "../components/HomeSectionCard";

import "../styles/pages/home-dock.css";

import { getActiveAdventure } from "../utils/adventureState";
import { supabase } from "../lib/supabase";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";

import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

const PILLARS = [
  { emoji: "", title: "Field Guide", desc: "Explore and learn.", path: "/species" },
  { emoji: "️", title: "Locations", desc: "Your waters.", path: "/locations" },
  { emoji: "", title: "Journal", desc: "Write what the day felt like.", path: "/journal" },
  { emoji: "", title: "Talk to Papa", desc: "Interact with Papa.", path: "/papa" },
];

export default function HomePage() {
  const nav = useNavigate();
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  const [activeAdventure] = useState(() => getActiveAdventure());
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [tripLoading, setTripLoading] = useState(true);
  const [openSection, setOpenSection] = useState(false);

  const atmosphere = useAtmosphere("home", {
    user: profilePacket,
    context: {
      hasUpcomingTrip: Boolean(upcomingTrip),
      activeAdventure,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          hasUpcomingTrip: Boolean(upcomingTrip),
          activeAdventure,
        },
      })
    : atmosphere.scene;

const atmospherePacket = buildAtmospherePacket({
  page: "home",
  region: scene?.regionKey || profilePacket?.favoriteRegion || "central-florida",
  timeState: scene?.timeState?.key,
  weatherState: scene?.weatherState?.key || "clear-sky",
  user: profilePacket,
  
});

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const cardStyle = styles.cardStyle ?? {};
  const primaryButtonStyle = styles.buttonPrimaryStyle ?? {};
  const secondaryButtonStyle = styles.buttonSecondaryStyle ?? {};
  const textTheme = ui.text ?? {};

  const footerWhisper = scene?.whisper || atmosphere?.whisper || "";

  const papaContext = {
    page: "home",
    user: profilePacket,
    atmosphere: atmospherePacket,
	scene,
    context: {
      hasUpcomingTrip: Boolean(upcomingTrip),
      activeAdventure,
    },
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

  const cardTheme = {
    bg: cardStyle.background,
    border: cardStyle.border?.replace("1px solid ", ""),
    blur: ui.card?.blur,
    shadow: cardStyle.boxShadow,
  };

  return (
    <CastBackground
      chamberKey="home"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
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
                  style={secondaryButtonStyle}
                  onClick={() => nav(p.path)}
                >
                  <span>
                    {p.emoji} {p.title}
                  </span>
                  <small>{p.desc}</small>
                </button>
              ))}

              <button
                className="home-action-pill"
                style={secondaryButtonStyle}
                onClick={() => nav("/profile")}
              >
                <span>Profile</span>
                <small>Shape how CAST remembers you.</small>
              </button>
            </div>
          </HomeSectionCard>

          <HomeSectionCard
            title="Trips"
            summary={
              tripLoading
                ? "Loading your next trip..."
                : upcomingTrip
                ? `${upcomingTrip.location} · ${
                    upcomingTrip.timing_label || "Planned"
                  }`
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
                  style={primaryButtonStyle}
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

              <button
                className="home-action-pill"
                style={primaryButtonStyle}
                onClick={() => nav("/plan-trip")}
              >
                <span>Create New Trip</span>
                <small>Plan where, when, and what you’re after.</small>
              </button>

              <button
                className="home-action-pill"
                style={primaryButtonStyle}
                onClick={() => nav("/trips?filter=upcoming")}
              >
                <span>Upcoming Trips</span>
                <small>View planned waters.</small>
              </button>

              <button
                className="home-action-pill"
                style={primaryButtonStyle}
                onClick={() => nav("/trips?filter=past")}
              >
                <span>Past Trips</span>
                <small>Return to where you’ve been.</small>
              </button>
            </div>
          </HomeSectionCard>

          <HomeSectionCard
            title="Adventures"
            summary="Guided journeys are still being prepared"
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
                style={primaryButtonStyle}
                onClick={() => nav("/adventures")}
              >
                <span>Preview Adventures</span>
                <small>See what guided journeys will become.</small>
              </button>

              <button
                className="home-action-pill"
                style={primaryButtonStyle}
                onClick={() => nav("/adventures")}
              >
                <span>Coming Soon</span>
                <small>Reflective paths through water, weather, and discovery.</small>
              </button>
            </div>
          </HomeSectionCard>

          {footerWhisper && (
            <div className="home-whisper-bar">
              <AnimatePresence mode="wait">
                <motion.p
                  key={footerWhisper}
                  className="home-whisper-line"
                  style={{ color: textTheme?.secondary }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5 }}
                >
                  ~ {footerWhisper} ~
                </motion.p>
              </AnimatePresence>
            </div>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}