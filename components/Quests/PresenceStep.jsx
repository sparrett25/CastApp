import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PresenceStep({ quest, step, onComplete }) {
  const navigate = useNavigate();
  const ritualKey = `ritual:${quest.quest_id}:${step.step_id}`;

  const ritualResult = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem(ritualKey) || "null");
    } catch {
      return null;
    }
  }, [ritualKey]);

  function startRitual() {
    const returnTo = encodeURIComponent(`/quests/${quest.quest_id}?step=${step.step_id}`);
    navigate(
      `/mirror-lake-ritual?return=${returnTo}&quest=${quest.quest_id}&step=${step.step_id}`
    );
  }

  function handleComplete() {
    if (!ritualResult) {
      alert("Complete the ritual first.");
      return;
    }
    onComplete({ ritual: ritualResult });
  }

  return (
    <div className="space-y-4">
      <p className="text-slate-200">{step.prompt}</p>
      <div className="flex gap-3">
        <button onClick={startRitual} className="btn-ghost">
          Begin Ritual
        </button>
        <button
          onClick={handleComplete}
          className="btn-primary"
          disabled={!ritualResult}
        >
          Mark Step Complete
        </button>
      </div>
      {ritualResult && (
        <div className="text-xs text-slate-400">
          Ritual logged: {ritualResult.durationSec}s • {ritualResult.intention}
        </div>
      )}
    </div>
  );
}
