import React from "react";
import { useNavigate } from "react-router-dom";

export default function QuestCompletionSection({ quest }) {
  const navigate = useNavigate();

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4">
      <h2 className="text-xl font-semibold">Quest Complete</h2>

      {quest?.completion?.lore_outro && (
        <p className="text-slate-200">{quest.completion.lore_outro}</p>
      )}

      {quest?.completion?.rewards?.badges?.length > 0 && (
        <div className="text-amber-300 text-sm">
          Badge earned: {quest.completion.rewards.badges.join(", ")}
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => navigate("/mirror-lake")} className="btn-primary">
          Back to Mirror Lake
        </button>
        <button onClick={() => navigate("/quests")} className="btn-ghost">
          View Quests
        </button>
        <button onClick={() => navigate("/journal")} className="btn-ghost">
          Open Journal
        </button>
      </div>
    </section>
  );
}
