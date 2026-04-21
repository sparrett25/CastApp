import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import "../styles/pages/journal-page.css";

// ── Storage ────────────────────────────────────────────────────
const STORAGE_KEY = "cast:v1:journal-entries";

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

// ── Scooter's optional prompts ────────────────────────────────


const PROMPTS = [
  "What did you notice today that you usually walk past?",
  "What would you do differently next time?",
  "Describe the moment right before the first cast.",
  "What did the water feel like today?",
  "What are you still thinking about?",
];

export default function JournalPage() {
  const navigate = useNavigate();
  const [text, setText]           = useState("");
  const [saved, setSaved]         = useState(false);
  const [lastEntry, setLastEntry] = useState(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const textareaRef = useRef(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const hasText   = text.trim().length > 0;

  const handlePrompt = (prompt) => {
    setText(prompt + " ");
    setShowPrompts(false);
    textareaRef.current?.focus();
  };

  const handleSave = () => {
    if (!hasText) return;
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: text.trim(),
      papaResponse: null, // will be set by PapaSpeaks after render
    };
    const existing = loadEntries();
    saveEntries([entry, ...existing]);
    setLastEntry(entry);
    setSaved(true);
    setText("");
  };

  const handlePapaResponse = (line) => {
    if (!lastEntry) return;
    const entries = loadEntries();
    const updated = entries.map(e =>
      e.id === lastEntry.id ? { ...e, papaResponse: line } : e
    );
    saveEntries(updated);
  };

  const handleNewEntry = () => {
    setSaved(false);
    setLastEntry(null);
  };

  return (
    <CastBackground chamberKey="journal">
      <ChamberLayout
        title="Journal"
        sub="Write what the day felt like."
        papa={<PapaMini context={{ event: "Grant opened his journal to write" }} fallbackKey="journal.prompt" />}
      >
        <div className="journal-page">
          <AnimatePresence mode="wait">

            {/* ── Write view ── */}
            {!saved && (
              <motion.div
                key="write"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Optional prompts */}
				<p className="journal-pause-line">Take a breath. There’s no rush here.</p>
                <div className="journal-prompt-row">
                  <button
                    className="journal-prompt-toggle"
                    onClick={() => setShowPrompts(v => !v)}
                  >
                    {showPrompts ? "Hide prompts" : "Need a nudge? →"}
                  </button>
                </div>

                <AnimatePresence>
                  {showPrompts && (
                    <motion.div
                      className="journal-prompts"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="journal-prompts-label">Scooter's prompts</p>
                      {PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          className="journal-prompt-item"
                          onClick={() => handlePrompt(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Textarea */}
				<p className="journal-paper-label">Your Journal</p>
                <div className="journal-paper">
                  <textarea
                    ref={textareaRef}
                    className="journal-textarea"
                    placeholder="What did the water teach you today?"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rows={10}
                  />
                  <div className="journal-footer">
                    <span className="journal-wordcount">
                      {wordCount > 0 ? `${wordCount} word${wordCount === 1 ? "" : "s"}` : ""}
                    </span>
                    <button
                      className="journal-save-btn"
                      onClick={handleSave}
                      disabled={!hasText}
                    >
                      Save entry →
                    </button>
                  </div>
                </div>

                {/* Link to archive */}
                <button
                  className="journal-archive-link"
                  onClick={() => navigate("/journal-archive")}
                >
                  Past entries →
                </button>
              </motion.div>
            )}

            {/* ── Saved view ── */}
            {saved && lastEntry && (
              <motion.div
                key="saved"
                className="journal-saved"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="journal-saved-entry">
                  <p className="journal-saved-date">
                    {new Date(lastEntry.date).toLocaleDateString("en-US", {
                      weekday: "long", month: "long", day: "numeric"
                    })}
                  </p>
                  <p className="journal-saved-text">"{lastEntry.text}"</p>
                </div>

                <div className="journal-papa-response">
                  <p className="journal-papa-attr">Papa</p>
                  <PapaSpeaks
                    context={{
                      event: `Grant just wrote in his journal: "${lastEntry.text.slice(0, 120)}"`,
                    }}
                    fallbackKey="journal.prompt"
                    trigger={lastEntry.id}
                  />
                </div>

                <div className="journal-saved-actions">
                  <button className="journal-new-btn" onClick={handleNewEntry}>
                    Write another →
                  </button>
                  <button
                    className="journal-archive-link"
                    onClick={() => navigate("/journal-archive")}
                  >
                    Past entries →
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}
