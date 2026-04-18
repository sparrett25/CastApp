import { useNavigate } from "react-router-dom";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/intro-page.css";


function ActionTile({ icon = "✨", title, desc, onClick }) {
  return (
  
    <button className="portal-card" onClick={onClick}>
      <div className="portal-header">
        <span className="portal-emoji">{icon}</span>
        <h3>{title}</h3>
      </div>
      <p className="portal-desc">{desc}</p>
      <div className="portal-enter">Onto the dock →</div>
    </button>
  );
}

export default function IntroPage() {
  const nav = useNavigate();
  const begin = () => nav("/home");
  

  return (
    <CastBackground chamberKey="intro">
      <ChamberLayout
        title="Cast"
        sub="The Invitation"
        papa={
          <PapaMini
            line="Let’s start simple. Just step onto the dock with me. We’ll see what the water has to say today."
          />
        }
      >
        <div className="intro-container">
          
          <h2>
			  This is your place by the water. <br />
			  You can fish. <br />
			  You can explore. <br />
			  Or just sit and listen.
			</h2>
<p className="intro-breath-line">Take a breath. There’s no rush.</p>
          <div className="intro-actions">
  <ActionTile
    icon="🌟"
    title="Step onto the Dock"
    desc="Start your day at the water."
    onClick={begin}
  />
</div>

          <p className="home-tip">The water remembers every visit.</p>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
