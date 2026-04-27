import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import "../styles/pages/papa-dock-page.css";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { supabase } from "../lib/supabase";

export default function PapaDockPage() {
	
const DEBUG_SCENE = null;

const atmosphere = useAtmosphere("papaDock");

const scene = DEBUG_SCENE
  ? getScene(DEBUG_SCENE)
  : atmosphere.scene;

const ui = scene?.timeState?.ui ?? {};

const bubbleTheme = ui.bubble;
const inputTheme = ui.input;
const buttonTheme = ui.button;
const cardTheme = ui.card;
const textTheme = ui.text;


  
  const [messages, setMessages] = useState([
    { role: "papa", text: "You can talk here. No rush." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [threadId, setThreadId] = useState(null);
  const [savingThread, setSavingThread] = useState(false);
  const [savedThread, setSavedThread] = useState(false);
  const [savingNoteIndex, setSavingNoteIndex] = useState(null);
  const [savedNoteIndexes, setSavedNoteIndexes] = useState({});
  const [saveError, setSaveError] = useState("");

  const recognitionRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
recognition.onend = () => setListening(false);
recognition.onerror = () => setListening(false);

recognition.onresult = (event) => {
  const transcript = event.results?.[0]?.[0]?.transcript?.trim();
  if (!transcript) return;

  setInput((prev) => {
    if (!prev.trim()) return transcript;
    return `${prev.trim()} ${transcript}`;
  });
};

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);



	async function getCurrentUser() {
	  const {
		data: { user },
		error,
	  } = await supabase.auth.getUser();

	  if (error) throw error;
	  if (!user) throw new Error("You must be logged in to save.");

	  return user;
	}

	async function saveThread() {
	  if (savingThread || messages.length <= 1) return;

	  setSaveError("");
	  setSavingThread(true);

	  try {
		const user = await getCurrentUser();

		const fallbackTitle =
		  messages.find((m) => m.role !== "papa")?.text?.slice(0, 60) ||
		  "Talk with Papa";

		const { data: thread, error: threadError } = await supabase
		  .from("cast_papa_threads")
		  .insert({
			user_id: user.id,
			title: fallbackTitle,
			mode: "talk",
		  })
		  .select()
		  .single();

		if (threadError) throw threadError;

		const filteredMessages = messages.filter(
		  (msg, index) =>
			!(
			  index === 0 &&
			  msg.role === "papa" &&
			  msg.text === "You can talk here. No rush."
			)
		);

		const messagePayload = filteredMessages.map((msg) => ({
		  thread_id: thread.id,
		  user_id: user.id,
		  role: msg.role,
		  message_text: msg.text,
		}));

		const { error: messageError } = await supabase
		  .from("cast_papa_messages")
		  .insert(messagePayload);

		if (messageError) throw messageError;

		setThreadId(thread.id);
		setSavedThread(true);
	  } catch (err) {
		console.error("Save Papa thread error:", err);
		setSaveError(err.message || "Could not save this conversation.");
	  } finally {
		setSavingThread(false);
	  }
	}

	async function savePapaNote(message, index, noteType = "whisper") {
	  if (!message?.text || message.role !== "papa") return;

	  setSaveError("");
	  setSavingNoteIndex(index);

	  try {
		const user = await getCurrentUser();

		const { error } = await supabase.from("cast_papa_saved_notes").insert({
		  user_id: user.id,
		  source_thread_id: threadId,
		  source_message_id: null,
		  note_type: noteType,
		  title: noteType === "field_note" ? "Papa Field Note" : "Papa Whisper",
		  note_text: message.text,
		  tags: [],
		});

		if (error) throw error;

		setSavedNoteIndexes((prev) => ({
		  ...prev,
		  [index]: true,
		}));
	  } catch (err) {
		console.error("Save Papa note error:", err);
		setSaveError(err.message || "Could not save this Papa note.");
	  } finally {
		setSavingNoteIndex(null);
	  }
	}

	function clearChat() {
	  setMessages([{ role: "papa", text: "You can talk here. No rush." }]);
	  setInput("");
	  setThreadId(null);
	  setSavedThread(false);
	  setSavedNoteIndexes({});
	  setSaveError("");
	}


  function buildTalkPayload(text, history) {
    const recentHistory = history.slice(-6).map((msg) => ({
      role: msg.role,
      text: msg.text,
    }));

    return {
      mode: "talk",
      message: {
        userMessage: text,
        history: recentHistory,
      },
    };
  }

  async function sendMessage(textOverride) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nextUserMessage = { role: "user", text };
    const nextMessages = [...messages, nextUserMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/papa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildTalkPayload(text, nextMessages)),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const reply =
        data?.reply?.trim() ||
        "Something went a little quiet just then. Try again when you're ready.";

      await new Promise((resolve) => setTimeout(resolve, 500));

      setMessages((prev) => [...prev, { role: "papa", text: reply }]);
    } catch (error) {
      console.error("PapaDockPage sendMessage error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "papa",
          text: "Something went a little quiet just then. Try again when you're ready.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function handleMicClick() {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  }

  return (
    <CastBackground
	  chamberKey="papaDock"
	  variant={scene?.backgroundVariant}
	  overlay={scene?.timeState?.ui?.overlay}
	>
      <ChamberLayout
        papa={null}
      >
        <div className="papa-dock-page">
          

          <div className="papa-dock-conversation">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  className={`papa-dock-bubble-wrap ${
                    message.role === "papa"
                      ? "papa-dock-bubble-wrap--papa"
                      : "papa-dock-bubble-wrap--user"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
				  
                >
                  <div
				  className={`papa-dock-bubble ${
					message.role === "papa"
					  ? "papa-dock-bubble--papa"
					  : "papa-dock-bubble--user"
				  }`}
				  style={{
					background:
					  message.role === "papa"
						? bubbleTheme?.papaBg
						: bubbleTheme?.userBg,

					border: `1px solid ${bubbleTheme?.border}`,

					color: bubbleTheme?.text,

					backdropFilter: `blur(${bubbleTheme?.blur})`,
					WebkitBackdropFilter: `blur(${bubbleTheme?.blur})`,

					boxShadow: bubbleTheme?.shadow,
				  }}
				>
                    
                    <p
					  className="papa-dock-bubble-text"
					  style={{ color: textTheme?.primary }}
					>
					  {message.text}
					</p>
					
					{message.role === "papa" && index > 0 && (
					  <div className="papa-dock-bubble-actions">
						<button
						  type="button"
						  className="papa-dock-save-note-btn"
						  onClick={() => savePapaNote(message, index, "whisper")}
						  disabled={savingNoteIndex === index || savedNoteIndexes[index]}
						  style={{
							  background: buttonTheme?.secondaryBg,
							  border: `1px solid ${buttonTheme?.border}`,
							  color: buttonTheme?.text,
							}}
						>
						  {savedNoteIndexes[index]
							? "Saved"
							: savingNoteIndex === index
							? "Saving..."
							: "Save Whisper"}
						</button>

						<button
						  type="button"
						  className="papa-dock-save-note-btn"
						  onClick={() => savePapaNote(message, index, "field_note")}
						  disabled={savingNoteIndex === index || savedNoteIndexes[index]}
						  style={{
							  background: buttonTheme?.secondaryBg,
							  border: `1px solid ${buttonTheme?.border}`,
							  color: buttonTheme?.text,
							}}
						>
						  Save Field Note
						</button>
					  </div>
					)}
					
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="papa-dock-bubble-wrap papa-dock-bubble-wrap--papa">
                <div className="papa-dock-bubble papa-dock-bubble--papa">
                  <p className="papa-dock-bubble-attr">Papa</p>
                  <p className="papa-dock-bubble-text">. . .</p>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

			<div className="papa-dock-thread-actions">
			  <button
				type="button"
				className="papa-dock-save-thread-btn"
				onClick={saveThread}
				disabled={savingThread || savedThread || messages.length <= 1}
				style={{
				  background: buttonTheme?.secondaryBg,
				  border: `1px solid ${buttonTheme?.border}`,
				  color: buttonTheme?.text,
				}}
			  >
				{savedThread ? "Thread saved" : savingThread ? "Saving..." : "Save Thread"}
			  </button>

			  <button
				type="button"
				className="papa-dock-clear-btn"
				onClick={clearChat}
				style={{
				  background: "transparent",
				  border: `1px solid ${buttonTheme?.border}`,
				  color: textTheme?.secondary,
				}}
			  >
				Clear Chat
			  </button>
			</div>

			{saveError && <p className="papa-dock-save-error">{saveError}</p>}



          <form
		  className="papa-dock-input-row"
		  onSubmit={handleSubmit}
		  style={{
			  background: inputTheme?.bg ?? cardTheme?.bg,
			  border: `1px solid ${inputTheme?.border ?? cardTheme?.border}`,
			  backdropFilter: `blur(${cardTheme?.blur})`,
			  WebkitBackdropFilter: `blur(${cardTheme?.blur})`,
			  boxShadow: cardTheme?.shadow,
			}}
		>
		  
            <button
              type="button"
              className={`papa-dock-mic-btn ${
                listening ? "is-listening" : ""
              }`}
              onClick={handleMicClick}
			  style={{
			  background: listening ? buttonTheme?.primaryBg : buttonTheme?.secondaryBg,
			  border: `1px solid ${buttonTheme?.border}`,
			  color: buttonTheme?.text,
			}}
            >
              🎙
            </button>

            <input
			  className="papa-dock-input"
			  type="text"
			  value={input}
			  onChange={(e) => setInput(e.target.value)}
			  placeholder={listening ? "Listening..." : "What's on your mind?"}
			  disabled={loading}

			  style={{
				background: inputTheme?.bg,
				border: `1px solid ${inputTheme?.border}`,
				color: inputTheme?.text,
			  }}
			/>

            <button
              type="submit"
              className="papa-dock-send-btn"
              disabled={loading || !input.trim()}
			  style={{
			  background: buttonTheme?.primaryBg,
			  border: `1px solid ${buttonTheme?.border}`,
			  color: buttonTheme?.text,
			}}
            >
              Send →
            </button>
          </form>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}