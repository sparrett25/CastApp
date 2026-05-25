import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";

import { supabase } from "../lib/supabase";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { useProfile } from "../context/ProfileContext";

import "../styles/pages/journal-page.css";

import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EntryCard({
  entry,
  index,
  cardStyle,
  buttonSecondaryStyle,
  bubbleTheme,
  textTheme,
}) {
  const [expanded, setExpanded] = useState(false);

  const fullText = entry.entry_text || "";
  const preview =
    fullText.length > 120 ? fullText.slice(0, 120) + "..." : fullText;

  const papaBubbleStyle = {
    background: bubbleTheme?.papaBg ?? cardStyle.background,
    border: `1px solid ${bubbleTheme?.border ?? "rgba(255,255,255,0.12)"}`,
    color: bubbleTheme?.text ?? textTheme?.primary,
    backdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
    WebkitBackdropFilter: `blur(${bubbleTheme?.blur || "18px"})`,
    boxShadow: bubbleTheme?.shadow ?? cardStyle.boxShadow,
  };

  return (
    <motion.div
      className="archive-card"
      style={cardStyle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="archive-date" style={{ color: textTheme?.secondary }}>
        {formatDate(entry.entry_date)}
      </p>

      <p className="archive-text" style={{ color: textTheme?.primary }}>
        {expanded ? fullText : preview}
      </p>

      {fullText.length > 120 && (
        <button
          className="archive-expand-btn"
          style={buttonSecondaryStyle}
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {entry.papa_response && (
        <div className="archive-papa" style={papaBubbleStyle}>
          <p className="archive-papa-attr">Papa</p>
          <p className="archive-papa-line">“{entry.papa_response}”</p>
        </div>
      )}
    </motion.div>
  );
}

export default function JournalArchive() {
  const navigate = useNavigate();
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const atmosphere = useAtmosphere("journalArchive", {
    user: profilePacket,
    context: {
      entryCount: entries.length,
      isEmpty: entries.length === 0,
      loading,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          entryCount: entries.length,
          isEmpty: entries.length === 0,
          loading,
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
  const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
  const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
  const transparentButtonStyle = styles.transparentButtonStyle ?? {};
  const textTheme = ui.text ?? {};
  const bubbleTheme = ui.bubble ?? {};

  const displayName =
    profilePacket?.display_name ||
    profilePacket?.username ||
    profilePacket?.name ||
    "the angler";

  useEffect(() => {
    let isMounted = true;

    async function loadEntries() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          if (isMounted) setEntries([]);
          return;
        }

        const { data, error } = await supabase
          .from("cast_journal_entries")
          .select("*")
          .eq("user_id", user.id)
          .order("entry_date", { ascending: false });

        if (error) throw error;

        if (isMounted) setEntries(data ?? []);
      } catch (err) {
        console.error("Journal archive load error:", err);
        if (isMounted) setEntries([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  const papaContext = {
    page: "journal archive",
    user: profilePacket,
    atmosphere: atmospherePacket,
	scene,
    context: {
      entryCount: entries.length,
      isEmpty: entries.length === 0,
      loading,
    },
    event: loading
      ? `${displayName} is opening the journal archive.`
      : entries.length === 0
      ? `${displayName} opened an empty journal archive.`
      : `${displayName} is reading through ${entries.length} journal ${
          entries.length === 1 ? "entry" : "entries"
        }.`,
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
            fallbackKey="journal.prompt"
          />
        }
      >
        <div className="journal-page">
          <button
            className="journal-back-btn"
            style={transparentButtonStyle}
            onClick={() => navigate("/journal")}
          >
            ← Write
          </button>

          {loading ? (
            <div className="archive-empty" style={cardStyle}>
              <p className="archive-empty-title">Loading entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="archive-empty" style={cardStyle}>
              <p className="archive-empty-title">Nothing here yet.</p>
              <p
                className="archive-empty-sub"
                style={{ color: textTheme?.secondary }}
              >
                The first thing you write will live here. Start with one honest line.
              </p>

              <button
                className="journal-new-btn"
                style={buttonPrimaryStyle}
                onClick={() => navigate("/journal")}
              >
                Write your first entry →
              </button>
            </div>
          ) : (
            <div className="archive-list">
              {entries.map((entry, i) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  cardStyle={cardStyle}
                  buttonSecondaryStyle={buttonSecondaryStyle}
                  bubbleTheme={bubbleTheme}
                  textTheme={textTheme}
                />
              ))}
            </div>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}