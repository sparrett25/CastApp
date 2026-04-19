import PapaSpeaks from "./PapaSpeaks";

/**
 * PapaMini — Papa's avatar + his live voice line.
 * Used in ChamberLayout top-right on every screen.
 *
 * Props:
 *   context     — passed to usePapa: { event, adventure, step }
 *   fallbackKey — key from papaVoice.json
 *   trigger     — re-triggers Papa when changed
 */
export default function PapaMini({
  context = {},
  fallbackKey,
  trigger,
}) {
  // Derive a sensible fallback key from time of day if none provided
  const hour = new Date().getHours();
  const timeKey =
    hour < 11 ? "home.morning" : hour < 17 ? "home.afternoon" : "home.evening";
  const resolvedKey = fallbackKey || timeKey;

  return (
    <div className="papa-badge">
      <img
        className="papa-img"
        src="/assets/papa/papa-avatar-sq-sm.png"
        alt="Papa"
      />
      <PapaSpeaks
        context={context}
        fallbackKey={resolvedKey}
        trigger={trigger}
      />
    </div>
  );
}
