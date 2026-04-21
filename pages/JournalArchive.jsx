import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { supabase } from "../lib/supabase";
import "../styles/pages/journal-page.css";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EntryCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);

  const fullText = entry.entry_text || "";
  const preview =
    fullText.length > 120 ? fullText.slice(0, 120) + "..." : fullText;

  return (
    <motion.div
      className="archive-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="archive-date">{formatDate(entry.entry_date)}</p>

      <p className="archive-text">{expanded ? fullText : preview}</p>

      {fullText.length > 120 && (
        <button
          className="archive-expand-btn"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {entry.papa_response && (
        <div className="archive-papa">
          <p className="archive-papa-attr">Papa</p>
          <p className="archive-papa-line">"{entry.papa_response}"</p>
        </div>
      )}
    </motion.div>
  );
}

export default function JournalArchive() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

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

        if (isMounted) {
          setEntries(data ?? []);
        }
      } catch (err) {
        console.error("Journal archive load error:", err);
        if (isMounted) {
          setEntries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CastBackground chamberKey="journal">
      <ChamberLayout
        title="Past Entries"
        sub="Every entry is a record of someone paying attention."
        papa={
          <PapaMini
            context={{
              event: `Grant is reading through his ${entries.length} journal entries`,
            }}
            fallbackKey="journal.prompt"
          />
        }
      >
        <div className="journal-page">
          <button className="journal-back-btn" onClick={() => navigate("/journal")}>
            ← Write
          </button>

          {loading ? (
            <div className="archive-empty">
              <p className="archive-empty-title">Loading entries...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="archive-empty">
              <p className="archive-empty-title">Nothing here yet.</p>
              <p className="archive-empty-sub">
                The first thing you write will live here. Start with one honest line.
              </p>
              <button
                className="journal-new-btn"
                onClick={() => navigate("/journal")}
              >
                Write your first entry →
              </button>
            </div>
          ) : (
            <div className="archive-list">
              {entries.map((entry, i) => (
                <EntryCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>
          )}
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}