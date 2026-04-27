import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import "../styles/pages/intro-page.css";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";


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
  background: cardBackground
},

    cardClass:
      glow === "cool"
        ? "portal-card portal-card--cool"
        : glow === "dim"
        ? "portal-card portal-card--dim"
        : "portal-card portal-card--warm"
  };
}

function ActionTile({ icon = "✨", title, onClick, className = "", style }) {
  return (
    <button className={`portal-card portal-card--intro ${className}`.trim()} style={style} onClick={onClick}>
      <div className="portal-header portal-header--intro">
        <h3 className="portal-title-only">{title}</h3>
      </div>
      <div className="portal-enter portal-enter--intro">Enter →</div>
    </button>
  );
}

export default function IntroPage() {
  const nav = useNavigate();
  const begin = () => nav("/home");

 const DEBUG_SCENE = null;

const atmosphere = useAtmosphere("intro");

const scene = DEBUG_SCENE
  ? getScene(DEBUG_SCENE)
  : atmosphere.scene;

  const uiStyles = getIntroUiStyles(scene);

  return (
    <CastBackground
	  chamberKey="intro"
	  variant={scene?.backgroundVariant}
	  overlay={scene?.timeState?.ui?.overlay}
	>
      <ChamberLayout    >
        <div className={uiStyles.containerClass}>
  <div className={uiStyles.whisperClass}>{scene?.whisper}</div>

  <h2 className={uiStyles.headlineClass}>
    <span>This is your place by the water. </span>
    <span>You can fish. You can explore. </span>
    <span>Or just sit and listen.</span>
  </h2>

  <ActionTile
    title="Step onto the Dock"
    onClick={begin}
    className={uiStyles.cardClass}
    style={uiStyles.cardStyle}
  />

  <p className="home-tip">The water remembers every visit.</p>
</div>
      </ChamberLayout>
    </CastBackground>
  );
}