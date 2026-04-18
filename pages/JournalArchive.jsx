import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import "../styles/pages/journal-page.css";

const STORAGE_KEY = "cast:v1:journal-entries";

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });
}

function EntryCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const preview = entry.text.length > 120
    ? entry.text.slice(0, 120) + "..."
    : entry.text;

  return (
    <motion.div
      className="archive-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <p className="archive-date">{formatDate(entry.date)}</p>
      <p className="archive-text">
        {expanded ? entry.text : preview}
      </p>
      {entry.text.length > 120 && (
        <button
          className="archive-expand-btn"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      {entry.papaResponse && (
        <div className="archive-papa">
          <p className="archive-papa-attr">Papa</p>
          <p className="archive-papa-line">"{entry.papaResponse}"</p>
        </div>
      )}
    </motion.div>
  );
}

export default function JournalArchive() {
  const navigate  = useNavigate();
  const entries   = loadEntries();

  return (
    <CastBackground chamberKey="journal">
      <ChamberLayout
        title="Past Entries"
        sub="Every entry is a record of someone paying attention."
        papa={<PapaMini
          context={{ event: `Grant is reading through his ${entries.length} journal entries` }}
          fallbackKey="journal.prompt"
        />}
      >
        <div className="journal-page">
          <button className="journal-back-btn" onClick={() => navigate("/journal")}>
            ← Write
          </button>

          {entries.length === 0 ? (
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
