import { useNavigate } from "react-router-dom";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";

import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";

import "../styles/pages/adventure-preview.css";

const TEASERS = [
  {
    title: "Preparing the Cast",
    text: "Some journeys begin before the line ever touches water.",
  },
  {
    title: "Bobber Waiting",
    text: "Stillness is not empty. The water is listening too.",
  },
  {
    title: "Walking the Shoreline",
    text: "Not every step needs a destination.",
  },
  {
    title: "Frog Encounter",
    text: "The smallest movement can become part of the story.",
  },
  {
    title: "Returning to the Dock",
    text: "Some trips end by carrying the quiet home.",
  },
];

export default function AdventurePreviewPage() {
  const nav = useNavigate();
  const { profilePacket } = useProfile();

  const atmosphere = useAtmosphere("adventures", {
    user: profilePacket,
    context: {
      preview: true,
      status: "coming-soon",
    },
  });

  const scene = atmosphere.scene;
  const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
  const styles = atmosphere.styles ?? {};

  const cardStyle = styles.cardStyle ?? {};
  const primaryButtonStyle = styles.buttonPrimaryStyle ?? {};
  const secondaryButtonStyle = styles.buttonSecondaryStyle ?? {};
  const textTheme = ui.text ?? {};

  const papaContext = {
    page: "adventures-preview",
    user: profilePacket,
    atmosphere: scene,
    context: {
      preview: true,
      status: "coming-soon",
    },
  };

  return (
    <CastBackground
      chamberKey="journal"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
        papa={
          <PapaMini
            context={papaContext}
            fallbackKey="adventures.preview"
          />
        }
      >
        <main className="adventure-preview">
          <section
            className="adventure-preview-hero"
            style={{
              background: cardStyle.background,
              border: cardStyle.border,
              boxShadow: cardStyle.boxShadow,
              backdropFilter: ui.card?.blur ? `blur(${ui.card.blur})` : undefined,
              WebkitBackdropFilter: ui.card?.blur
                ? `blur(${ui.card.blur})`
                : undefined,
            }}
          >
            <p
              className="adventure-preview-kicker"
              style={{ color: textTheme?.accent }}
            >
              Adventures
            </p>

            <h1 style={{ color: textTheme?.primary }}>
              Guided journeys are still forming.
            </h1>

            <p
              className="adventure-preview-copy"
              style={{ color: textTheme?.secondary }}
            >
              Adventures will become reflective fishing paths shaped by water,
              weather, patience, and place. For now, this chamber holds a quiet
              preview of what is coming.
            </p>

            <div className="adventure-preview-actions">
              <button
                className="adventure-preview-button"
                style={primaryButtonStyle}
                onClick={() => nav("/")}
              >
                Return Home
              </button>

              <button
                className="adventure-preview-button"
                style={secondaryButtonStyle}
                onClick={() => nav("/journal")}
              >
                Open Journal
              </button>
            </div>
          </section>

          <section className="adventure-preview-list">
            {TEASERS.map((item) => (
              <article
                key={item.title}
                className="adventure-preview-card"
                style={{
                  background: cardStyle.background,
                  border: cardStyle.border,
                  boxShadow: cardStyle.boxShadow,
                  backdropFilter: ui.card?.blur
                    ? `blur(${ui.card.blur})`
                    : undefined,
                  WebkitBackdropFilter: ui.card?.blur
                    ? `blur(${ui.card.blur})`
                    : undefined,
                }}
              >
                <h2 style={{ color: textTheme?.primary }}>{item.title}</h2>
                <p style={{ color: textTheme?.secondary }}>{item.text}</p>
              </article>
            ))}
          </section>

          <p
            className="adventure-preview-footer"
            style={{ color: textTheme?.muted || textTheme?.secondary }}
          >
            More paths will arrive when the water is ready.
          </p>
        </main>
      </ChamberLayout>
    </CastBackground>
  );
}