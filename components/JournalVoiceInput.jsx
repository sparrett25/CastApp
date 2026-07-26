import { useEffect, useRef, useState } from "react";

const MAX_RECORDING_SECONDS = 5 * 60;

function getSupportedMimeType() {
  if (
    typeof window === "undefined" ||
    typeof window.MediaRecorder === "undefined"
  ) {
    return "";
  }

  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];

  return (
    candidates.find((type) => MediaRecorder.isTypeSupported(type)) || ""
  );
}

function getFileExtension(mimeType = "") {
  if (mimeType.includes("mp4")) return "m4a";
  if (mimeType.includes("ogg")) return "ogg";
  return "webm";
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export default function JournalVoiceInput({
  buttonPrimaryStyle = {},
  buttonSecondaryStyle = {},
  textTheme = {},
  disabled = false,
  onTranscript,
  onStatusChange,
}) {
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState("");

  const isRecording = status === "recording";
  const isTranscribing = status === "transcribing";

  const updateStatus = (nextStatus) => {
    setStatus(nextStatus);
    onStatusChange?.(nextStatus);
  };

  const clearRecordingTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopMicrophoneTracks = () => {
    if (!mediaStreamRef.current) return;

    mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
  };

  const resetToIdle = () => {
    clearRecordingTimer();
    stopMicrophoneTracks();

    mediaRecorderRef.current = null;
    audioChunksRef.current = [];

    setElapsedSeconds(0);
    updateStatus("idle");
  };

  const transcribeRecording = async (audioBlob, mimeType) => {
    updateStatus("transcribing");
    setError("");

    try {
      const formData = new FormData();

      formData.append("audio", audioBlob, "journal-recording.webm");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "CAST could not turn that recording into words."
        );
      }

      const transcript = (result?.text || result?.transcript || "").trim();

      if (!transcript) {
        throw new Error(
          "CAST did not hear enough to create a transcript. Please try again."
        );
      }

      onTranscript?.(transcript);
      resetToIdle();
    } catch (transcriptionError) {
      console.error(
        "Journal voice transcription error:",
        transcriptionError
      );

      clearRecordingTimer();
      stopMicrophoneTracks();

      mediaRecorderRef.current = null;
      audioChunksRef.current = [];

      setError(
        transcriptionError?.message ||
          "CAST could not turn that recording into words. Please try speaking again."
      );

      setElapsedSeconds(0);
      updateStatus("idle");
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state === "inactive") return;

    clearRecordingTimer();
    recorder.stop();
  };

  const beginTimer = () => {
    clearRecordingTimer();

    timerRef.current = window.setInterval(() => {
      setElapsedSeconds((current) => {
        const next = current + 1;

        if (next >= MAX_RECORDING_SECONDS) {
          window.setTimeout(stopRecording, 0);
        }

        return Math.min(next, MAX_RECORDING_SECONDS);
      });
    }, 1000);
  };

  const startRecording = async () => {
    if (disabled || isRecording || isTranscribing) return;

    setError("");
    setElapsedSeconds(0);

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Voice recording is not supported in this browser.");
      }

      if (typeof MediaRecorder === "undefined") {
        throw new Error("Voice recording is not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaStreamRef.current = stream;
      audioChunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.addEventListener("dataavailable", (event) => {
        if (event.data?.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      recorder.addEventListener(
        "stop",
        async () => {
          clearRecordingTimer();
          stopMicrophoneTracks();

          const resolvedType =
            recorder.mimeType ||
            mimeType ||
            audioChunksRef.current[0]?.type ||
            "audio/webm";

          const blob = new Blob(audioChunksRef.current, {
            type: resolvedType,
          });

          audioChunksRef.current = [];
          mediaRecorderRef.current = null;

          if (!blob.size) {
            setError("No audio was captured. Please try again.");
            setElapsedSeconds(0);
            updateStatus("idle");
            return;
          }

          await transcribeRecording(blob, resolvedType);
        },
        { once: true }
      );

      recorder.addEventListener(
        "error",
        () => {
          clearRecordingTimer();
          stopMicrophoneTracks();

          mediaRecorderRef.current = null;
          audioChunksRef.current = [];

          setError("The recording was interrupted. Please try again.");
          setElapsedSeconds(0);
          updateStatus("idle");
        },
        { once: true }
      );

      recorder.start();
      updateStatus("recording");
      beginTimer();
    } catch (recordingError) {
      console.error("Journal voice recording error:", recordingError);

      clearRecordingTimer();
      stopMicrophoneTracks();

      const permissionDenied =
        recordingError?.name === "NotAllowedError" ||
        recordingError?.name === "PermissionDeniedError";

      setError(
        permissionDenied
          ? "Microphone access was not allowed. You can enable it in your browser settings and try again."
          : recordingError?.message ||
              "CAST could not begin recording. Please try again."
      );

      setElapsedSeconds(0);
      updateStatus("idle");
    }
  };

  useEffect(() => {
    return () => {
      clearRecordingTimer();

      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }

      stopMicrophoneTracks();
      onStatusChange?.("idle");
    };
  }, [onStatusChange]);

  return (
    <div className="journal-voice-input">
      {status === "idle" && (
        <button
          type="button"
          className="journal-voice-start-btn"
          style={buttonSecondaryStyle}
          onClick={startRecording}
          disabled={disabled}
        >
          <span aria-hidden="true">🎙</span>
          <span>Speak</span>
        </button>
      )}

      {isRecording && (
        <div className="journal-voice-recording">
          <div
            className="journal-voice-recording-status"
            aria-live="polite"
          >
            <span
              className="journal-voice-recording-dot"
              aria-hidden="true"
            />
            <span style={{ color: textTheme?.secondary }}>
              Listening…
            </span>
          </div>

          <div
            className="journal-voice-timer"
            style={{ color: textTheme?.primary }}
          >
            {formatDuration(elapsedSeconds)}
          </div>

          <button
            type="button"
            className="journal-voice-stop-btn"
            style={buttonPrimaryStyle}
            onClick={stopRecording}
          >
            Stop
          </button>
        </div>
      )}

      {isTranscribing && (
        <div
          className="journal-voice-transcribing"
          style={{ color: textTheme?.secondary }}
          aria-live="polite"
        >
          <span className="journal-voice-transcribing-mark" aria-hidden="true">
            …
          </span>
          <span>Turning your reflection into words…</span>
        </div>
      )}

      {error && (
        <p className="journal-voice-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
