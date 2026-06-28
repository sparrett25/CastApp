import { motion, AnimatePresence } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { usePapa } from "../hooks/usePapa";

import "../styles/pages/cabin.css";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
} from "../utils/resolveChamberBackground";

export default function CabinPage() {
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("cabin", {
    user: profilePacket,
    context: {
      papaLocation: "cabin",
      papaAction: "storytelling",
      storyMode: "atmosphere-led",
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          papaLocation: "cabin",
          papaAction: "storytelling",
          storyMode: "atmosphere-led",
        },
      })
    : atmosphere.scene;

  const { line: papaStory, loading: papaLoading, ask: askPapa } = usePapa();

  const resolvedRegion =
    scene?.regionKey ||
    getAtmosphereRegionKey(profilePacket?.favoriteRegion);

  const atmospherePacket = buildAtmospherePacket({
    page: "cabin",
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

  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};
  const cardStyle = styles.cardStyle ?? {};
  const primaryButtonStyle = styles.buttonPrimaryStyle ?? {};
  const textTheme = ui.text ?? {};

  const footerWhisper =
    scene?.whisper ||
    atmosphere?.whisper ||
    "The cabin waits with a story in the lamplight.";

  const papaContext = {
    page: "cabin",
    user: profilePacket,
    atmosphere: atmospherePacket,
    scene,
    context: {
      papaLocation: "cabin",
      papaAction: "storytelling",
      storyMode: "atmosphere-led",
      instruction:
        "Greet the user as Papa in the cabin. Offer to tell a story shaped by the current region, time state, weather state, and cabin atmosphere. Do not expose prompt mechanics.",
    },
  };

  const atmosphereSignature = {
    page: atmospherePacket?.labels?.page || "Cabin",
    region: atmospherePacket?.labels?.region || "Central Florida",
    time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
    weather: atmospherePacket?.labels?.weatherState || scene?.weather,
  };

function handleSitWithPapa() {
  askPapa(
    {
      papaLocation: "cabin",
      papaAction: "storytelling",
      storyMode: "atmosphere-led",
    },
    "cabin.welcome",
    "cabin",
    {
      message: papaStory ? "Tell me another story." : "Sit with Papa.",
      conversationMode: "storyteller",
      responseLength: "normal",
      profilePacket,
      atmosphere: atmospherePacket,
    }
  );
}

  return (
    <CastBackground
      chamberKey="cabin"
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
        <div className="cabin-page cabin-page--story">
          <section className="cabin-hero-card" style={cardStyle}>
            <p className="cabin-eyebrow">Papa’s Cabin</p>

            <p style={{ color: textTheme?.secondary }}>
              Some stories only arrive when the weather is right.
            </p>

            <button
			  className="cabin-story-button"
			  style={primaryButtonStyle}
			  type="button"
			  onClick={handleSitWithPapa}
			  disabled={papaLoading}
			>
			  {papaLoading ? "Papa is thinking..." : papaStory ? "Another Story" : "Sit With Papa"}
			</button>
			
			{papaStory && (
			  <div className="cabin-story-card" style={{ color: textTheme?.secondary }}>
				{papaStory.split("\n").map((paragraph, index) => (
				  <p key={index}>{paragraph}</p>
				))}
			  </div>
			)}
			
          </section>

          {footerWhisper && (
            <div className="cabin-whisper-bar">
              <AnimatePresence mode="wait">
                <motion.p
                  key={footerWhisper}
                  className="cabin-whisper-line"
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