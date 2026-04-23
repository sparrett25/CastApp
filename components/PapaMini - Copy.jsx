import PapaSpeaks from "./PapaSpeaks";

export default function PapaMini({
  context = {},
  fallbackKey,
  trigger,
}) {
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
        mode="mini"
      />
    </div>
  );
}