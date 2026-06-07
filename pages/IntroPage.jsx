import { useNavigate } from "react-router-dom";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";

import "../styles/pages/intro-page.css";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import { getAtmosphereRegionKey } from "../utils/resolveChamberBackground";

function getIntroUiStyles(scene) {
  const tone = scene?.timeState?.ui?.textTone ?? "balanced";
  const glow = scene?.timeState?.ui?.glow ?? "warm";
  const cardOpacity = scene?.timeState?.ui?.cardOpacity ?? 0.18;

  const cardBackground =
    scene?.timeState?.ui?.cardBackground ??
    `rgba(18, 12, 8, ${cardOpacity})`;

  return {
    headlineClass:
      tone === "soft"
        ? "intro-headline intro-headline--soft"
        : tone === "balanced"
        ? "intro-headline intro-headline--balanced"
        : "intro-headline intro-headline--clear",

    whisperClass:
      glow === "cool"
        ? "intro-scene-whisper intro-scene-whisper--cool"
        : glow === "dim"
        ? "intro-scene-whisper intro-scene-whisper--dim"
        : "intro-scene-whisper intro-scene-whisper--warm",

    containerClass:
      glow === "cool"
        ? "intro-container intro-container--cool"
        : glow === "dim"
        ? "intro-container intro-container--dim"
        : "intro-container intro-container--warm",

    cardStyle: {
      background: cardBackground,
    },

    cardClass:
      glow === "cool"
        ? "portal-card portal-card--cool"
        : glow === "dim"
        ? "portal-card portal-card--dim"
        : "portal-card portal-card--warm",
  };
}

function ActionTile({ title, onClick, className = "", style }) {
  return (
    <button
      className={`portal-card portal-card--intro ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      <div className="portal-header portal-header--intro">
        <h3 className="portal-title-only">{title}</h3>
      </div>

      <div className="portal-enter portal-enter--intro">Enter →</div>
    </button>
  );
}

export default function IntroPage() {
  const nav = useNavigate();
  const { profilePacket } = useProfile();

  const begin = () => nav("/home");

  const DEBUG_SCENE = null;

  const atmosphere = useAtmosphere("intro", {
    user: profilePacket,
    context: {
      isEntryThreshold: true,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          isEntryThreshold: true,
        },
      })
    : atmosphere.scene;

const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);
  
const atmospherePacket = buildAtmospherePacket({
  page: "intro",
  region: resolvedRegion,
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weatherState?.id || scene?.weather || "base",
  user: profilePacket,
  
});

  const uiStyles = getIntroUiStyles(scene);
  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};

const styles = atmosphere.styles ?? {};

const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};

 const entryButtonStyle = {
  ...uiStyles.cardStyle,
  ...buttonPrimaryStyle,
};

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};

  return (
    <CastBackground
      chamberKey="intro"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
  signature={
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
  }
  >
        <div className={uiStyles.containerClass}>
          {scene?.whisper && (
            <div className={uiStyles.whisperClass}>{scene.whisper}</div>
          )}

          <h2 className={uiStyles.headlineClass}>
            <span>This is your place by the water. </span>
            <span>You can fish. You can explore. </span>
            <span>Or just sit and listen.</span>
          </h2>

          <ActionTile
            title="Step onto the Dock"
            onClick={begin}
            className={uiStyles.cardClass}
            style={entryButtonStyle}
          />

          <p className="home-tip">The water remembers every visit.</p>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}