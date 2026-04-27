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

    cardStyle: {
      background: `rgba(18, 12, 8, ${cardOpacity})`
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

const atmosphere = useAtmosphere("papaDock");

const scene = DEBUG_SCENE
  ? getScene(DEBUG_SCENE)
  : atmosphere.scene;

const bubbleTheme = atmosphere.ui?.bubble;
const inputTheme = atmosphere.ui?.input;
  
  
  const uiStyles = getIntroUiStyles(scene);

  return (
    <CastBackground
      chamberKey="intro"
      variant={scene?.backgroundVariant}
      overlay={scene?.timeState?.ui?.overlay || "absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/45"}
    >
      <ChamberLayout    >
        <div className="intro-container">

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