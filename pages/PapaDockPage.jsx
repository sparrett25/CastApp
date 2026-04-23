import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import "../styles/pages/papa-dock-page.css";

export default function PapaDockPage() {
  const [messages, setMessages] = useState([
    { role: "papa", text: "You can talk here. No rush." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

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

    const nextGrantMessage = { role: "grant", text };
    const nextMessages = [...messages, nextGrantMessage];

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
    <CastBackground chamberKey="papaDock">
      <ChamberLayout
        papa={null}
      >
        <div className="papa-dock-page">
          <div className="papa-dock-intro">
            

            <div className="papa-dock-intro-copy">
              <p className="papa-dock-line">You can talk here. No rush.</p>
              <p className="papa-dock-subline">
                Tap the microphone or type your words below.
              </p>
            </div>
          </div>

          <div className="papa-dock-conversation">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  className={`papa-dock-bubble-wrap ${
                    message.role === "papa"
                      ? "papa-dock-bubble-wrap--papa"
                      : "papa-dock-bubble-wrap--grant"
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
                        : "papa-dock-bubble--grant"
                    }`}
                  >
                    <p className="papa-dock-bubble-attr">
                      {message.role === "papa" ? "Papa" : "Grant"}
                    </p>
                    <p className="papa-dock-bubble-text">{message.text}</p>
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

          <form className="papa-dock-input-row" onSubmit={handleSubmit}>
            <button
              type="button"
              className={`papa-dock-mic-btn ${
                listening ? "is-listening" : ""
              }`}
              onClick={handleMicClick}
            >
              🎙
            </button>

            <input
              className="papa-dock-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? "Listening..." : "Say something to Papa..."}
              disabled={loading}
            />

            <button
              type="submit"
              className="papa-dock-send-btn"
              disabled={loading || !input.trim()}
            >
              Send →
            </button>
          </form>
        </div>
      </ChamberLayout>
    </CastBackground>
  );
}