import { useNavigate } from "react-router-dom";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";

import "../styles/pages/about-page.css";
import "../styles/global/atmosphere.css";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
} from "../utils/resolveChamberBackground";

function getAboutUiStyles(scene) {
  const tone = scene?.timeState?.ui?.textTone ?? "balanced";
  const glow = scene?.timeState?.ui?.glow ?? "warm";
  const cardOpacity = scene?.timeState?.ui?.cardOpacity ?? 0.18;

  const cardBackground =
    scene?.timeState?.ui?.cardBackground ??
    `rgba(18, 12, 8, ${cardOpacity})`;

  return {
    headlineClass:
      tone === "soft"
        ? "about-headline about-headline--soft"
        : tone === "balanced"
        ? "about-headline about-headline--balanced"
        : "about-headline about-headline--clear",

    whisperClass:
      glow === "cool"
        ? "about-scene-whisper about-scene-whisper--cool"
        : glow === "dim"
        ? "about-scene-whisper about-scene-whisper--dim"
        : "about-scene-whisper about-scene-whisper--warm",

    containerClass:
      glow === "cool"
        ? "about-container about-container--cool"
        : glow === "dim"
        ? "about-container about-container--dim"
        : "about-container about-container--warm",

    cardStyle: {
      background: cardBackground,
    },

    cardClass:
      glow === "cool"
        ? "about-card about-card--cool"
        : glow === "dim"
        ? "about-card about-card--dim"
        : "about-card about-card--warm",
  };
}

const aboutSections = [
  {
    title: "More Than a Fishing App",
    body: [
      "CAST began as a simple idea: build a fishing companion for a young nephew learning to fish.",
      "Over time, that idea changed. The greatest moments beside the water were not always measured by the fish that were caught. They were found in quiet mornings, changing skies, familiar places, thoughtful conversations, and memories that stayed long after the trip was over.",
      "Today, CAST is a quiet companion built around fishing, observation, memory, and presence.",
    ],
  },
  {
    title: "A Living World",
    body: [
      "CAST changes throughout the day. Morning light feels different than evening. A still pond feels different than gentle rain. A Midwestern farm pond carries a different atmosphere than a Florida lake or an Appalachian creek.",
      "Rather than treating these as backgrounds, CAST treats them as places. Every region, weather state, and time of day creates a different emotional landscape that gently shapes the experience.",
    ],
  },
  {
    title: "Learning the Water",
    body: [
      "The Field Guide introduces waters, species, gear, techniques, and the quiet art of observation.",
      "Trips help you set an intention before you go. Catch Logs remember what happened. Locations gradually learn what each place has taught you.",
      "Rather than rushing toward success, CAST encourages something older and simpler: stand still, observe first, and let the water tell its story before the first cast.",
    ],
  },
  {
    title: "Remembering What Matters",
    body: [
      "Every fishing trip becomes more than a date on a calendar. Reflections, field notes, catches, photographs, conversations with Papa, and future adventures slowly gather around the places you return to.",
      "Over time, locations become memory anchors. They remember not only what you caught, but how that place made you feel.",
    ],
  },
  {
    title: "Papa",
    body: [
      "Papa is CAST's companion. Sometimes he teaches. Sometimes he listens. Sometimes he simply tells a story.",
      "You can ask about fishing techniques, gear, wildlife, or share an observation from the shoreline. Papa's conversations are not intended to replace the experience beside the water. They are meant to deepen it.",
      "At the end of the day, you can visit Papa's Cabin, where stories arrive with the changing atmosphere and every evening feels a little different than the last.",
    ],
  },
  {
    title: "Your World",
    body: [
      "Every person experiences the outdoors differently. CAST allows you to shape that experience.",
      "Choose the region that feels like home. Follow the natural rhythm of the day, or linger in a favorite time of evening. Let changing weather influence the world around you.",
      "As CAST continues to grow, it will quietly follow the atmosphere around you, allowing the experience to change naturally with your local conditions.",
    ],
  },
  {
    title: "Why CAST Exists",
    body: [
      "Modern apps often ask us to move faster. CAST quietly asks something different.",
      "Slow down. Look a little longer. Listen. Remember.",
      "Whether you catch the biggest fish of your life or nothing at all, the evening was never empty. Every cast has a story. Every place remembers. And sometimes the most meaningful thing left to do is simply sit beside the water for a while.",
    ],
  },
];

export default function AboutPage() {
  const nav = useNavigate();
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  // Use the intro atmosphere so the About page feels like another threshold into CAST.
  // If you later add a dedicated About atmosphere coordinate, change PAGE_KEY to "about".
  const PAGE_KEY = "intro";

  const atmosphere = useAtmosphere(PAGE_KEY, {
    user: profilePacket,
    context: {
      isEntryThreshold: true,
      isAboutPage: true,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          isEntryThreshold: true,
          isAboutPage: true,
        },
      })
    : atmosphere.scene;

  const resolvedRegion =
    scene?.regionKey || getAtmosphereRegionKey(profilePacket?.favoriteRegion);

  const atmospherePacket = buildAtmospherePacket({
    page: PAGE_KEY,
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

  const uiStyles = getAboutUiStyles(scene);
  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};

  const entryButtonStyle = {
    ...uiStyles.cardStyle,
    ...buttonPrimaryStyle,
  };

  const atmosphereSignature = {
    page: "About CAST",
    region: atmospherePacket?.labels?.region || "Central Florida",
    time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
    weather: atmospherePacket?.labels?.weatherState || scene?.weather,
  };

  return (
    <CastBackground
      chamberKey={PAGE_KEY}
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
            <div className="cast-atmospheric-invitation">
              {atmosphericInvitation}
            </div>
          </>
        }
      >
        <main className={uiStyles.containerClass}>
          {scene?.whisper && (
            <div className={uiStyles.whisperClass}>{scene.whisper}</div>
          )}

          <section className="about-hero" style={uiStyles.cardStyle}>
            <div className="about-kicker">About CAST</div>
            <h1 className={uiStyles.headlineClass}>
              <span>Fishing remains its language. </span>
              <span>Presence is its purpose.</span>
            </h1>
            <p className="about-hero-copy">
              CAST is a quiet companion built around fishing, observation,
              memory, and the places that slowly become part of us.
            </p>
          </section>

          <section className="about-section-list" aria-label="About CAST sections">
            {aboutSections.map((section) => (
              <article
                key={section.title}
                className={`${uiStyles.cardClass} about-section-card`}
                style={uiStyles.cardStyle}
              >
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </section>

          <section className="about-closing" style={uiStyles.cardStyle}>
            <p className="about-closing-line">
              The water asks for nothing except your presence.
            </p>
            <button
              className={`about-dock-button ${uiStyles.cardClass}`.trim()}
              style={entryButtonStyle}
              onClick={() => nav("/home")}
            >
              Step onto the Dock →
            </button>
          </section>
        </main>
      </ChamberLayout>
    </CastBackground>
  );
}
