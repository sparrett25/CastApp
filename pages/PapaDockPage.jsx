import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";

import "../styles/pages/papa-dock-page.css";
import "../styles/global/atmosphere.css";

import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { supabase } from "../lib/supabase";
import { useProfile } from "../context/ProfileContext";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
  getAtmosphericPerception,
} from "../utils/resolveChamberBackground";


const DEFAULT_OPENING_LINE = "You can talk here. No rush.";

function createOpeningMessage(text = DEFAULT_OPENING_LINE) {
  return {
    role: "papa",
    text,
    systemOpening: true,
  };
}

export default function PapaDockPage() {
  const { profilePacket } = useProfile();

  const DEBUG_SCENE = null;

  const [messages, setMessages] = useState([
    createOpeningMessage(DEFAULT_OPENING_LINE),
  ]);

  const [conversationMode, setConversationMode] = useState("guide");
  const [responseLength, setResponseLength] = useState("normal");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const [threadId, setThreadId] = useState(null);
  const [savingThread, setSavingThread] = useState(false);
  const [savedThread, setSavedThread] = useState(false);
  const [savingNoteKey, setSavingNoteKey] = useState(null);
  const [savedNoteKeys, setSavedNoteKeys] = useState({});
  const [saveError, setSaveError] = useState("");

  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [fieldNoteIndex, setFieldNoteIndex] = useState(null);
  const [fieldNoteLocationId, setFieldNoteLocationId] = useState("");

  const recognitionRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const silenceTimerRef = useRef(null);

  const atmosphere = useAtmosphere("papaDock", {
    user: profilePacket,
    context: {
      mode: "talk",
      messageCount: messages.length,
      hasSavedThread: savedThread,
    },
  });

  const scene = DEBUG_SCENE
    ? getScene(DEBUG_SCENE, {
        user: profilePacket,
        context: {
          mode: "talk",
          messageCount: messages.length,
          hasSavedThread: savedThread,
        },
      })
    : atmosphere.scene;

const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);
  
const atmospherePacket = buildAtmospherePacket({
  page: "papaDock",
  region: resolvedRegion,
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weatherState?.id || scene?.weather || "base",
  user: profilePacket,
  context: {
    mode: "talk",
    messageCount: messages.length,
    hasSavedThread: savedThread,
  },
});

const atmosphericInvitation = getAtmosphericInvitations({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});

const atmosphericPerception = getAtmosphericPerception({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});


const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
const styles = atmosphere.styles ?? {};

const cardStyle = styles.cardStyle ?? {};
const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
const inputStyle = styles.inputStyle ?? {};
const transparentButtonStyle = styles.transparentButtonStyle ?? {};
const textTheme = ui.text ?? {};
const bubbleTheme = ui.bubble ?? {};

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};

  useEffect(() => {
    const sceneOpening = scene?.whisper || DEFAULT_OPENING_LINE;

    setMessages((prev) => {
      if (
        prev.length === 1 &&
        prev[0]?.role === "papa" &&
        prev[0]?.systemOpening
      ) {
        return [createOpeningMessage(sceneOpening)];
      }

      return prev;
    });
  }, [scene?.whisper]);

  const hasMountedRef = useRef(false);

useEffect(() => {
  if (!hasMountedRef.current) {
    hasMountedRef.current = true;
    window.scrollTo(0, 0);
    return;
  }

  endRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages, loading]);


useEffect(() => {
  const el = inputRef.current;
  if (!el) return;

  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 220)}px`;
}, [input]);


  useEffect(() => {
  return () => {
    recognitionRef.current?.stop?.();
  };
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

  useEffect(() => {
    let isMounted = true;

    async function loadLocations() {
      setLocationsLoading(true);

      try {
        const user = await getCurrentUser();

        const { data, error } = await supabase
          .from("cast_locations")
          .select("id, name, location_key")
          .eq("user_id", user.id)
          .eq("is_active", true)
          .order("name", { ascending: true });

        if (error) throw error;

        if (isMounted) {
          setLocations(data ?? []);
        }
      } catch (err) {
        console.error("Load PapaDock locations error:", err);

        if (isMounted) {
          setLocations([]);
        }
      } finally {
        if (isMounted) {
          setLocationsLoading(false);
        }
      }
    }

    loadLocations();

    return () => {
      isMounted = false;
    };
  }, []);

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
        (msg, index) => !(index === 0 && msg.role === "papa" && msg.systemOpening)
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

  async function savePapaNote(
    message,
    index,
    noteType = "whisper",
    selectedLocationId = ""
  ) {
    if (!message?.text || message.role !== "papa" || message.systemOpening) return;

    const saveKey = `${index}:${noteType}`;

    if (noteType === "field_note" && !selectedLocationId) {
      setSaveError("Choose a location before saving this Field Note.");
      return;
    }

    setSaveError("");
    setSavingNoteKey(saveKey);

    try {
      const user = await getCurrentUser();

      const selectedLocation =
        noteType === "field_note"
          ? locations.find((location) => location.id === selectedLocationId)
          : null;

     
if (noteType !== "field_note") {
  const { error: noteError } = await supabase
    .from("cast_papa_saved_notes")
    .insert({
      user_id: user.id,
      source_thread_id: threadId,
      source_message_id: null,
      note_type: noteType,
      title: "Papa Whisper",
      note_text: message.text,
      tags: [],
      location_id: null,
      location_key: null,
    });

  if (noteError) throw noteError;
}

      if (noteType === "field_note") {
  const previousUserMessage =
    [...messages]
      .slice(0, index)
      .reverse()
      .find((item) => item.role === "user" && item.text?.trim())?.text ?? null;

  const now = new Date();
  const localDate = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);

  const { error: journalError } = await supabase
    .from("cast_journal_entries")
    .insert({
      user_id: user.id,
      title: "Papa Field Note",
      prompt_text: previousUserMessage,
      entry_text: message.text,
      entry_date: localDate,
      papa_response: null,
      entry_type: "field_note",
      location_id: selectedLocation.id,
      time_state_key: atmospherePacket?.timeState || null,
      weather_state_key: atmospherePacket?.weatherState || null,
    });

  if (journalError) throw journalError;

  setFieldNoteIndex(null);
  setFieldNoteLocationId("");
}




      setSavedNoteKeys((prev) => ({
        ...prev,
        [saveKey]: true,
      }));
    } catch (err) {
      console.error("Save Papa note error:", err);
      setSaveError(err.message || "Could not save this Papa note.");
    } finally {
      setSavingNoteKey(null);
    }
  }

  function clearChat() {
    setMessages([createOpeningMessage(scene?.whisper || DEFAULT_OPENING_LINE)]);
    setInput("");
    setThreadId(null);
    setSavedThread(false);
    setSavedNoteKeys({});
    setFieldNoteIndex(null);
    setFieldNoteLocationId("");
    setSaveError("");
  }

  function buildTalkPayload(text, history) {
    const recentHistory = history
      .filter((msg) => !msg.systemOpening)
      .slice(-6)
      .map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

    return {
	  mode: "talk",
	  conversationMode,
	  responseLength,
	  message: {
		userMessage: text,
		history: recentHistory,
		user: profilePacket,
		atmosphere: atmospherePacket,
		scene,
	  },
	  profilePacket,
	  atmosphere: atmospherePacket,
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
  
 useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) return;

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event?.error);
    setListening(false);

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  recognition.onresult = (event) => {
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const transcript = event.results[i]?.[0]?.transcript || "";

      if (event.results[i].isFinal) {
        finalTranscriptRef.current += ` ${transcript}`;
      } else {
        interimTranscript += ` ${transcript}`;
      }
    }

    const combinedTranscript = `${finalTranscriptRef.current} ${interimTranscript}`.trim();

    if (combinedTranscript) {
      setInput(combinedTranscript);
    }

    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    silenceTimerRef.current = setTimeout(() => {
      recognition.stop();
    }, 4000);
  };

  recognitionRef.current = recognition;

  return () => {
    recognition.stop();
  };
}, []);
 
 
 

  function handleMicClick() {
  if (!recognitionRef.current) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  if (listening) {
    recognitionRef.current.stop();
    return;
  }

  finalTranscriptRef.current = "";
  setInput("");

  try {
    recognitionRef.current.start();
  } catch (err) {
    console.error("Speech recognition start error:", err);
  }
}

  return (
    <CastBackground
      chamberKey="papaDock"
      variant={scene?.backgroundVariant}
      overlay={ui.overlay}
    >
      <ChamberLayout
signature={
	<>
    <div className="cast-atmosphere-signature cast-atmosphere-signature--inline">
      <span>
        {atmosphereSignature.page} • {atmosphereSignature.region} •{" "}
        {atmosphereSignature.time}
        {atmosphereSignature.weather &&
        atmosphereSignature.weather !== "Base" &&
        atmosphereSignature.weather !== "base"
          ? ` • ${atmosphereSignature.weather}`
          : ""}
      </span>
    </div>
	
	
	{atmosphericPerception && (
	  <div className="cast-atmospheric-perception">
		<strong>{atmosphericPerception.title}</strong>
		<span>{atmosphericPerception.description}</span>
	  </div>
	)}
	
	
	<div className="cast-atmospheric-awareness">
	  <strong>Awareness</strong>
	  <span>{atmosphericInvitation}</span>
	</div>

  </>
  }
  papa={null}>
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
                      backdropFilter: `blur(${bubbleTheme?.blur || "12px"})`,
                      WebkitBackdropFilter: `blur(${bubbleTheme?.blur || "12px"})`,
                      boxShadow: bubbleTheme?.shadow,
                    }}
                  >
                    <p
                      className="papa-dock-bubble-text"
                      style={{ color: textTheme?.primary }}
                    >
                      {message.text}
                    </p>

                    {message.role === "papa" &&
                      index > 0 &&
                      !message.systemOpening && (
                        <>
                          <div className="papa-dock-bubble-actions">
                            <button
                              type="button"
                              className="papa-dock-save-note-btn"
                              onClick={() =>
                                savePapaNote(message, index, "whisper")
                              }
                              disabled={
                                savingNoteKey === `${index}:whisper` ||
                                savedNoteKeys[`${index}:whisper`]
                              }
                              style={buttonSecondaryStyle}
                            >
                              {savedNoteKeys[`${index}:whisper`]
                                ? "Whisper Saved"
                                : savingNoteKey === `${index}:whisper`
                                ? "Saving..."
                                : "Save Whisper"}
                            </button>

                            <button
                              type="button"
                              className="papa-dock-save-note-btn"
                              onClick={() => {
                                if (savedNoteKeys[`${index}:field_note`]) return;

                                if (fieldNoteIndex === index) {
                                  setFieldNoteIndex(null);
                                  setFieldNoteLocationId("");
                                } else {
                                  setFieldNoteIndex(index);
                                  setFieldNoteLocationId("");
                                  setSaveError("");
                                }
                              }}
                              disabled={
                                savingNoteKey === `${index}:field_note` ||
                                savedNoteKeys[`${index}:field_note`]
                              }
                              style={buttonSecondaryStyle}
                            >
                              {savedNoteKeys[`${index}:field_note`]
                                ? "Field Note Saved"
                                : "Save Field Note"}
                            </button>
                          </div>

                          {fieldNoteIndex === index &&
                            !savedNoteKeys[`${index}:field_note`] && (
                              <div
                                className="papa-dock-field-note-location"
                                style={{
                                  marginTop: "0.75rem",
                                  paddingTop: "0.75rem",
                                  borderTop: `1px solid ${
                                    bubbleTheme?.border ??
                                    "rgba(255,255,255,0.12)"
                                  }`,
                                }}
                              >
                                <label
                                  htmlFor={`papa-field-note-location-${index}`}
                                  style={{
                                    display: "block",
                                    marginBottom: "0.45rem",
                                    color: textTheme?.secondary,
                                  }}
                                >
                                  Save this Field Note to
                                </label>

                                <select
                                  id={`papa-field-note-location-${index}`}
                                  value={fieldNoteLocationId}
                                  onChange={(e) =>
                                    setFieldNoteLocationId(e.target.value)
                                  }
                                  disabled={locationsLoading}
                                  style={{
                                    ...inputStyle,
                                    width: "100%",
                                    marginBottom: "0.6rem",
                                  }}
                                >
                                  <option value="">
                                    {locationsLoading
                                      ? "Loading locations..."
                                      : "Choose a location..."}
                                  </option>

                                  {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                      {location.name}
                                    </option>
                                  ))}
                                </select>

                                <div
                                  style={{
                                    display: "flex",
                                    gap: "0.5rem",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="papa-dock-save-note-btn"
                                    onClick={() =>
                                      savePapaNote(
                                        message,
                                        index,
                                        "field_note",
                                        fieldNoteLocationId
                                      )
                                    }
                                    disabled={
                                      !fieldNoteLocationId ||
                                      savingNoteKey === `${index}:field_note`
                                    }
                                    style={buttonPrimaryStyle}
                                  >
                                    {savingNoteKey === `${index}:field_note`
                                      ? "Saving..."
                                      : "Save to Location"}
                                  </button>

                                  <button
                                    type="button"
                                    className="papa-dock-save-note-btn"
                                    onClick={() => {
                                      setFieldNoteIndex(null);
                                      setFieldNoteLocationId("");
                                      setSaveError("");
                                    }}
                                    disabled={
                                      savingNoteKey === `${index}:field_note`
                                    }
                                    style={buttonSecondaryStyle}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}
                        </>
                      )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <div className="papa-dock-bubble-wrap papa-dock-bubble-wrap--papa">
                <div
                  className="papa-dock-bubble papa-dock-bubble--papa"
                  style={{
                    background: bubbleTheme?.papaBg,
                    border: `1px solid ${bubbleTheme?.border}`,
                    color: bubbleTheme?.text,
                    backdropFilter: `blur(${bubbleTheme?.blur || "12px"})`,
                    WebkitBackdropFilter: `blur(${bubbleTheme?.blur || "12px"})`,
                    boxShadow: bubbleTheme?.shadow,
                  }}
                >
                  <p className="papa-dock-bubble-text">. . .</p>
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

 
		
		
		
		<div className="papa-dock-input-container">
          <form
            className="papa-dock-input-row"
            onSubmit={handleSubmit}
            
			
			style={{
			  ...cardStyle,
			}}
						
			
          >
            <button
              type="button"
              className={`papa-dock-mic-btn ${
                listening ? "is-listening" : ""
              }`}
              onClick={handleMicClick}
              style={listening ? buttonPrimaryStyle : buttonSecondaryStyle}
            >
              🎙
            </button>



            <textarea
			  ref={inputRef}
			  className="papa-dock-input"
			  value={input}
			  rows={1}
			  onChange={(e) => {
				setInput(e.target.value);
			  }}
			  placeholder={listening ? "Listening..." : "What's on your mind?"}
			  disabled={loading}
			  style={{
				color: textTheme?.primary,
			  }}
			/>

            <button
              type="submit"
              className="papa-dock-send-btn"
              disabled={loading || !input.trim()}
              style={buttonPrimaryStyle}
            >
              Send →
            </button>
          </form>
        </div>
		
		<div
		  className="papa-dock-settings-card"
		  style={{
			...cardStyle,
		  }}
		>
		  <p className="papa-dock-settings-title">Conversation Settings</p>

		  <div className="papa-dock-settings-grid">
			<label className="papa-dock-setting">
			  <span>Style</span>
			  <select
				className="papa-dock-mode-select"
				value={conversationMode}
				onChange={(e) => setConversationMode(e.target.value)}
				disabled={loading}
			  >
				<option value="guide">Guide</option>
				<option value="reflection">Reflection</option>
				<option value="storyteller">Storyteller</option>
				<option value="quiet">Quiet Presence</option>
			  </select>
			</label>

			<label className="papa-dock-setting">
			  <span>Depth</span>
			  <select
				className="papa-dock-mode-select"
				value={responseLength}
				onChange={(e) => setResponseLength(e.target.value)}
				disabled={loading}
			  >
				<option value="normal">Normal</option>
				<option value="brief">Brief</option>
				<option value="deeper">Campfire</option>
			  </select>
			</label>
		  </div>
		</div>
		
		
		<div className="papa-dock-thread-actions">
            <button
              type="button"
              className="papa-dock-save-thread-btn"
              onClick={saveThread}
              disabled={savingThread || savedThread || messages.length <= 1}
              style={buttonSecondaryStyle}
            >
              {savedThread
                ? "Thread saved"
                : savingThread
                ? "Saving..."
                : "Save Thread"}
            </button>

            <button
              type="button"
              className="papa-dock-clear-btn"
              onClick={clearChat}
              style={buttonSecondaryStyle}
            >
              Clear Chat
            </button>
          </div>

          {saveError && (
            <p className="papa-dock-save-error">{saveError}</p>
          )}

		</div>
      </ChamberLayout>
    </CastBackground>
  );
}