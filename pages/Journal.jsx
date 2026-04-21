import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import PapaSpeaks from "../components/PapaSpeaks";
import { supabase } from "../lib/supabase";
import "../styles/pages/journal-page.css";
import { buildPapaPageContext } from "../utils/buildPapaPageContext";

const PROMPTS = [
  "What did you notice today that you usually walk past?",
  "What would you do differently next time?",
  "Describe the moment right before the first cast.",
  "What did the water feel like today?",
  "What are you still thinking about?",
];

function getTodayBounds() {
  const now = new Date();

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  return {
    startIso: start.toISOString(),
    endIso: end.toISOString(),
  };
}

export default function JournalPage() {
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [lastEntry, setLastEntry] = useState(null);
  const [showPrompts, setShowPrompts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const hasText = text.trim().length > 0;

  const handlePrompt = (prompt) => {
    setText(prompt + " ");
    setSelectedPrompt(prompt);
    setShowPrompts(false);
    textareaRef.current?.focus();
  };

  const handleSave = async () => {
    if (!hasText) return;

    setSaveError("");
    setSaving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to save a journal entry.");

      const { startIso, endIso } = getTodayBounds();

      const { data: todayCatches, error: catchError } = await supabase
        .from("cast_catch_logs")
        .select(
          "id, species, species_key, location, location_key, kept_or_released, notes, catch_date, is_first_catch, is_no_catch"
        )
        .eq("user_id", user.id)
        .gte("catch_date", startIso)
        .lte("catch_date", endIso)
        .order("catch_date", { ascending: false });

      if (catchError) throw catchError;

      const payload = {
        user_id: user.id,
        entry_text: text.trim(),
        entry_date: new Date().toISOString(),
        prompt_used: selectedPrompt,
        papa_response: null,
        catch_context: todayCatches ?? [],
      };

      const { data, error } = await supabase
        .from("cast_journal_entries")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      setLastEntry(data);
      setSaved(true);
      setText("");
      setSelectedPrompt(null);
    } catch (err) {
      console.error("Journal save error:", err);
      setSaveError(err.message || "Could not save journal entry.");
    } finally {
      setSaving(false);
    }
  };


const handlePapaResponse = async (line) => {
  if (!lastEntry?.id || !line) return;
  if (lastEntry?.papa_response === line) return;

  try {
    const { error } = await supabase
      .from("cast_journal_entries")
      .update({ papa_response: line })
      .eq("id", lastEntry.id);

    if (error) throw error;

    setLastEntry((prev) =>
      prev ? { ...prev, papa_response: line } : prev
    );
  } catch (err) {
    console.error("Papa response save error:", err);
  }
};


  const handleNewEntry = () => {
    setSaved(false);
    setLastEntry(null);
    setText("");
    setSaveError("");
    setSelectedPrompt(null);
  };

  const catchCount = Array.isArray(lastEntry?.catch_context)
    ? lastEntry.catch_context.length
    : 0;

  return (
    <CastBackground chamberKey="journal">
      <ChamberLayout
		  title="Journal"
		  sub="Write what the day felt like."
		  papa={
			<PapaMini
			  context={buildPapaPageContext("journal", {
				event: "Grant opened his journal to write.",
			  })}
			  fallbackKey="journal.prompt"
			/>
		  }
		>
        <div className="journal-page">
          <AnimatePresence mode="wait">
            {!saved && (
              <motion.div
                key="write"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="journal-pause-line">Take a breath. There’s no rush here.</p>

                <div className="journal-prompt-row">
                  <button
                    className="journal-prompt-toggle"
                    onClick={() => setShowPrompts((v) => !v)}
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

                <p className="journal-paper-label">Your Journal</p>
                <div className="journal-paper">
                  <textarea
                    ref={textareaRef}
                    className="journal-textarea"
                    placeholder="What did the water teach you today?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={10}
                  />
                  <div className="journal-footer">
                    <span className="journal-wordcount">
                      {wordCount > 0 ? `${wordCount} word${wordCount === 1 ? "" : "s"}` : ""}
                    </span>
                    <button
                      className="journal-save-btn"
                      onClick={handleSave}
                      disabled={!hasText || saving}
                    >
                      {saving ? "Saving..." : "Save entry →"}
                    </button>
                  </div>
                </div>

                {saveError && <p className="journal-error">{saveError}</p>}

                <button
                  className="journal-archive-link"
                  onClick={() => navigate("/journal-archive")}
                >
                  Past entries →
                </button>
              </motion.div>
            )}

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
                    {new Date(lastEntry.entry_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="journal-saved-text">"{lastEntry.entry_text}"</p>
                </div>

                {catchCount > 0 && (
                  <div className="journal-catch-context">
                    <p className="journal-papa-attr">Today on the water</p>
                    <p className="journal-catch-context-line">
                      {catchCount} {catchCount === 1 ? "catch entry" : "catch entries"} linked to this reflection.
                    </p>
                  </div>
                )}

                <div className="journal-papa-response">
                  <p className="journal-papa-attr">Papa</p>
                  <PapaSpeaks
				  context={buildPapaPageContext("journal", {
				  event: "Grant just saved a journal reflection.",
				  journalEntry: lastEntry.entry_text,
				  catchContext: lastEntry.catch_context ?? [],
				  linkedCatchCount: Array.isArray(lastEntry.catch_context)
					? lastEntry.catch_context.length
					: 0,
				})}
				  fallbackKey="journal.prompt"
				  trigger={lastEntry.id}
				  onResponse={handlePapaResponse}
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