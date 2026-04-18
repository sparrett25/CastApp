import questsJson from "../data/stories/mirror-lake/quests.json";
import type { Quest } from "../types/quests";

type Store = {
  quests: Quest[];
  activeQuestId: string | null;
  load(): void;
  setActive(id: string): void;
  setStatus(id: string, status: Quest["status"]): void;
  clearActive(): void;
};

const KEY = "cast:questsState";

function readPersist() {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
}
function writePersist(data: any) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export const questsStore: Store = {
  quests: [],
  activeQuestId: null,

  load() {
    const persisted = readPersist();
    const quests: Quest[] = questsJson.quests.map(q => {
      const saved = persisted[q.quest_id];
      return saved ? { ...q, status: saved.status ?? q.status } : q;
    });
    this.quests = quests;
    this.activeQuestId = Object.entries(persisted)
      .find(([, v]: any) => v.active === true)?.[0] ?? null;
  },

  setActive(id) {
    this.quests = this.quests.map(q => q.quest_id === id ? { ...q, status: "active" } : q);
    this.activeQuestId = id;
    const persisted = readPersist();
    persisted[id] = { ...(persisted[id]||{}), status: "active", active: true };
    // mark others inactive
    for (const q of this.quests) if (q.quest_id !== id) {
      persisted[q.quest_id] = { ...(persisted[q.quest_id]||{}), active: false, status: q.status };
    }
    writePersist(persisted);
  },

  setStatus(id, status) {
    this.quests = this.quests.map(q => q.quest_id === id ? { ...q, status } : q);
    const persisted = readPersist();
    persisted[id] = { ...(persisted[id]||{}), status };
    writePersist(persisted);
  },

  clearActive() {
    const id = this.activeQuestId;
    this.activeQuestId = null;
    const persisted = readPersist();
    if (id) persisted[id] = { ...(persisted[id]||{}), active: false };
    writePersist(persisted);
  }
};
