import React, { useMemo, useState } from "react";
import { buildDockStatePrompt } from "/data/castPrompts/buildDockStatePrompt";

import {
  timeStates,
  weatherStates,
  pages,
  regions,
  wildlifeByPage,
  optionalObjectsByPage,
  baseConversionLock,
} from "./castPromptBlocks";

export default function CastPromptBuilder() {
  
	
  const [region, setRegion] = useState("midwestFarmPond");
  const [page, setPage] = useState("home");
  const [timeState, setTimeState] = useState("quietEveningGlow");
  const [weatherState, setWeatherState] = useState("none");
  const [promptType, setPromptType] = useState("conversion");
  const [includeWildlife, setIncludeWildlife] = useState(true);
  const [includeOptionalObject, setIncludeOptionalObject] = useState(true);

  const assembledPrompt = useMemo(() => {
	  const dockStateBlock = buildDockStatePrompt({
		pageId: page,
		timeKey: timeState,
		});
    const regionLabel = regions[region];
    const pageLabel = pages[page];
    const wildlife = wildlifeByPage[page];
    const optionalObject = optionalObjectsByPage[page];

    const header =
      promptType === "base"
        ? `# CAST BASE IMAGE PROMPT\n\nRegion: ${regionLabel}\nPage: ${pageLabel}`
        : promptType === "page"
        ? `# CAST PAGE TRANSFORMATION PROMPT\n\nRegion: ${regionLabel}\nPage: ${pageLabel}`
        : `# CAST PAGE CONVERSION PROMPT\n\nRegion: ${regionLabel}\nPage: ${pageLabel}`;

    return [
      header,
      "",
      promptType === "conversion" ? baseConversionLock : "",
      "",
      timeStates[timeState],
      "",
	  dockStateBlock,
	  "",
      weatherStates[weatherState],
      "",
      includeOptionalObject
        ? `# OPTIONAL OBJECT BLOCK\n\nPage Object: ${optionalObject}\n\nPreserve or introduce this object only if appropriate for the selected prompt type. Do not add unrelated objects.`
        : "",
      "",
      includeWildlife && wildlife !== "None"
        ? `# WILDLIFE BLOCK\n\nWildlife Accent: ${wildlife}\n\nUse only one primary wildlife accent. Wildlife should feel discovered, not displayed. Keep it secondary to atmosphere, water, and composition.`
        : "",
      "",
      `# FINAL SUPPRESSION RULES

- Do not introduce visual clutter
- Do not alter the page identity
- Do not change camera perspective
- Do not add heroic framing or dramatic spectacle
- Preserve the quiet, grounded CAST atmosphere`,
    ]
      .filter(Boolean)
      .join("\n\n---\n\n");
  }, [
    region,
    page,
    timeState,
    weatherState,
    promptType,
    includeWildlife,
    includeOptionalObject,
  ]);

  async function copyPrompt() {
    await navigator.clipboard.writeText(assembledPrompt);
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-2xl bg-stone-900 border border-stone-700 p-5 shadow-lg">
          <h1 className="text-2xl font-semibold mb-1">CAST Prompt Builder</h1>
          <p className="text-sm text-stone-400 mb-6">
            Assemble structured region, page, time, weather, wildlife, and object prompts.
          </p>

          <Control label="Prompt Type" value={promptType} onChange={setPromptType}
            options={{
              base: "Base Image",
              page: "Page Transformation",
              conversion: "Page Conversion",
            }}
          />

          <Control label="Region" value={region} onChange={setRegion} options={regions} />
          <Control label="Page" value={page} onChange={setPage} options={pages} />

          <Control
            label="Time State"
            value={timeState}
            onChange={setTimeState}
            options={{
              blueHourDawn: "Blue Hour Dawn",
              softMorningRise: "Soft Morning Rise",
              lateAfternoonWarmth: "Late Afternoon Warmth",
              goldenDusk: "Golden Dusk",
              quietEveningGlow: "Quiet Evening Glow",
            }}
          />

          <Control
            label="Weather State"
            value={weatherState}
            onChange={setWeatherState}
            options={{
              none: "None",
              lightOvercast: "Light Overcast",
              lightRain: "Light Rain",
              morningFog: "Morning Fog",
              goldenHaze: "Golden Haze",
            }}
          />

          <label className="flex items-center gap-2 mt-4 text-sm">
            <input
              type="checkbox"
              checked={includeOptionalObject}
              onChange={(e) => setIncludeOptionalObject(e.target.checked)}
            />
            Include page object
          </label>

          <label className="flex items-center gap-2 mt-3 text-sm">
            <input
              type="checkbox"
              checked={includeWildlife}
              onChange={(e) => setIncludeWildlife(e.target.checked)}
            />
            Include wildlife accent
          </label>

          <button
            onClick={copyPrompt}
            className="mt-6 w-full rounded-xl bg-amber-400 text-stone-950 font-semibold py-3 hover:bg-amber-300"
          >
            Copy Prompt
          </button>
        </section>

        <section className="rounded-2xl bg-stone-900 border border-stone-700 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Assembled Prompt</h2>
            <span className="text-xs text-stone-400">
              {assembledPrompt.length.toLocaleString()} characters
            </span>
          </div>

          <textarea
            className="w-full h-[75vh] rounded-xl bg-stone-950 border border-stone-700 p-4 text-sm leading-relaxed font-mono text-stone-100"
            value={assembledPrompt}
            readOnly
          />
        </section>
      </div>
    </div>
  );
}

function Control({ label, value, onChange, options }) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-stone-300 mb-1">{label}</span>
      <select
        className="w-full rounded-xl bg-stone-950 border border-stone-700 px-3 py-2 text-stone-100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {Object.entries(options).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}