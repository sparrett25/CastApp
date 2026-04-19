import { useState, useCallback, useRef } from "react";
import papaVoice from "../data/papaVoice.json";

// ─────────────────────────────────────────────
// Fallback: pull a random line from papaVoice
// for a given context key
// ─────────────────────────────────────────────
function getFallbackLine(contextKey) {
  const pool =
    papaVoice[contextKey] ||
    papaVoice["fallback"] ||
    ["Still water remembers. Cast with presence."];

  return pool[Math.floor(Math.random() * pool.length)];
}

// ─────────────────────────────────────────────
// Build the user message from context
// ─────────────────────────────────────────────
function buildUserMessage(context) {
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 11 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const parts = [`It is ${timeOfDay}.`];

  if (context.adventure) {
    parts.push(`Grant is on Adventure: "${context.adventure}".`);
  }

  if (context.step) {
    parts.push(`He is on: ${context.step}.`);
  }

  if (context.event) {
    parts.push(`What just happened: ${context.event}.`);
  }

  if (context.catchData) {
    const { species, size } = context.catchData;
    parts.push(
      `Grant just caught a ${species}${size ? ` (${size})` : ""}.`
    );
  }

  parts.push("Give Grant one short thought. Do not explain or elaborate.");

  return parts.join(" ");
}

// ─────────────────────────────────────────────
// usePapa hook
// ─────────────────────────────────────────────
export function usePapa() {
  const [line, setLine] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const ask = useCallback(async (context = {}, fallbackKey = "fallback") => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);

    try {
      const response = await fetch("/api/papa", {
        method: "POST",
        signal: abortRef.current.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: buildUserMessage(context),
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
  }, []);

  return { line, loading, ask };
}