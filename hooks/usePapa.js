import { useState, useCallback, useRef } from "react";
import papaVoice from "../data/papaVoice.json";

function getFallbackLine(contextKey) {
  const pool =
    papaVoice[contextKey] ||
    papaVoice["fallback"] ||
    ["Still water remembers. Cast with presence."];

  return pool[Math.floor(Math.random() * pool.length)];
}

function buildUserMessage(context) {
  const hour = new Date().getHours();
  const timeOfDay =
    hour < 11 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const parts = [`It is ${timeOfDay}.`];

  if (context.page) {
    parts.push(`Grant is in Cast on the ${context.page} page.`);
  }

  if (context.adventure) {
    parts.push(`Grant is on Adventure: "${context.adventure}".`);
  }

  if (context.step) {
    parts.push(`He is on: ${context.step}.`);
  }

  if (context.event) {
    parts.push(`What just happened: ${context.event}.`);
  }

  if (context.trip) {
    const tripBits = [];

    if (context.trip.location) {
      tripBits.push(`location: ${context.trip.location}`);
    }

    if (context.trip.target) {
      tripBits.push(`target: ${context.trip.target}`);
    }

    if (context.trip.when) {
      tripBits.push(`when: ${context.trip.when}`);
    }

    if (context.trip.duration) {
      tripBits.push(`duration: ${context.trip.duration}`);
    }

    if (tripBits.length > 0) {
      parts.push(`Planned trip context — ${tripBits.join(", ")}.`);
    }
  }

  if (context.catchData) {
    const { species, size, location, is_no_catch, is_first_catch } = context.catchData;

    if (is_no_catch) {
      parts.push(`Grant logged a day where nothing bit${location ? ` at ${location}` : ""}.`);
    } else {
      parts.push(
        `Grant just caught a ${species}${size ? ` (${size})` : ""}${location ? ` at ${location}` : ""}.`
      );

      if (is_first_catch) {
        parts.push(`This was his first catch in the ledger.`);
      }
    }
  }

  if (Array.isArray(context.catchContext) && context.catchContext.length > 0) {
    const catchCount = context.catchContext.length;
    const summary = context.catchContext
      .slice(0, 3)
      .map((entry) => {
        if (entry.is_no_catch) {
          return `nothing today${entry.location ? ` at ${entry.location}` : ""}`;
        }
        return `${entry.species}${entry.location ? ` at ${entry.location}` : ""}`;
      })
      .join("; ");

    parts.push(
      `Today on the water there ${catchCount === 1 ? "was 1 catch entry" : `were ${catchCount} catch entries`}: ${summary}.`
    );
  }

  if (context.journalEntry) {
    const excerpt =
      context.journalEntry.length > 180
        ? context.journalEntry.slice(0, 180) + "..."
        : context.journalEntry;

    parts.push(`Grant wrote in his journal: "${excerpt}"`);
  }

  if (context.linkedCatchCount) {
    parts.push(
      `This reflection is linked to ${context.linkedCatchCount} catch ${context.linkedCatchCount === 1 ? "entry" : "entries"}.`
    );
  }

  parts.push(
    "Give Grant one short thought. Stay warm, calm, simple, and observant. Do not explain or elaborate."
  );

  return parts.join(" ");
}

export function usePapa() {
  const [line, setLine] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef(null);

  const ask = useCallback(async (
    context = {},
    fallbackKey = "fallback",
    mode = "mini"
  ) => {
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
          mode,
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