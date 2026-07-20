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
  getAtmosphericPerception,
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
    title: "A Quiet Beginning",
    body: [
      "There is a quiet place by the water.",
	  "Some arrive hoping to catch fish.",
	  "Some come searching for peace after a long day.",
	  "Others simply need a reason to step outside and breathe.",
	  "At first, these reasons seem different.",
	  "In time, they often become the same.",
	  "Fishing has always been more than catching fish.",
	  "For generations, people learned the waters not from maps or screens, but by returning. They noticed where the first light touched the shoreline, how the wind carried insects across the surface, and how each season slowly changed the character of a familiar place. They learned to recognize the songs of birds, the arrival of dragonflies, the silence before rain, and the subtle movements that revealed life beneath the water.",
	  "These observations were never separate from fishing.",
	  "They were fishing.",
	  "The water rewarded those who paid attention.",
	  "Not only with fish, but with understanding.",
	  "CAST was born from that tradition.",
		"Not from a desire to improve fishing through technology, but from a belief that technology can quietly support the timeless practice of paying attention.",
"Its purpose is not to replace experience.",
"It is to help preserve it.",
"Not to tell you what to see.",
"But to help you notice what is already there.",
"The water has always been speaking.",
"CAST simply offers a place to listen.",
   ],
  },
{
    title: "A Different Kind of Companion",
    body: [
"Most applications begin with a question.",
"What are you trying to accomplish?",
"CAST begins with a different question.",
"Where are you today?",
"That distinction matters.",
"Before there are catches, there is water.",
"Before there are techniques, there is atmosphere.",
"Before there is success, there is presence.",
"A pond is never simply a pond.",
"The same shoreline changes with morning fog, summer heat, silver rain, autumn wind, and quiet evening light.",
"The fish respond.",
"The birds respond.",
"The insects respond.",
"And so do we.",
"No two visits are ever exactly alike.",
"To return to the same place is not to repeat an experience.",
"It is to begin a new relationship.",
"~",
"The water asks for nothing except your presence.",
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

const atmosphericPerception = getAtmosphericPerception({
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
	
  </>
  }
  
>


        <main className={uiStyles.containerClass}>
          {scene?.whisper && (
            <div className={uiStyles.whisperClass}>{scene.whisper}</div>
          )}

          

          <section className="about-hero-copy" aria-label="About CAST sections">
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
