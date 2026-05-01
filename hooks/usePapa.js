import { useState, useCallback, useRef } from "react";
import papaVoice from "../data/papaVoice.json";

function getFallbackLine(contextKey) {
  const pool =
    papaVoice[contextKey] ||
    papaVoice["fallback"] ||
    ["Still water remembers. Cast with presence."];

  return pool[Math.floor(Math.random() * pool.length)];
}

export function usePapa() {
  const [line, setLine] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const ask = useCallback(
    async (
      context = {},
      fallbackKey = "fallback",
      mode = "mini",
      options = {}
    ) => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const {
        profilePacket = null,
        pageProfile = null,
        atmosphere = null,
        message = null,
      } = options;

      setLoading(true);

      try {
        const response = await fetch("/api/papa", {
          method: "POST",
          signal: abortRef.current.signal,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode,
            message,
            context,
            profilePacket,
            pageProfile,
            atmosphere,
          }),
        });

        if (!response.ok) {
          throw new Error(`API ${response.status}`);
        }

        const data = await response.json();
        const text = data?.reply?.trim();

        if (text) {
          setLine(text);
        } else {
          setLine(getFallbackLine(fallbackKey));
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setLine(getFallbackLine(fallbackKey));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { line, loading, ask };
}