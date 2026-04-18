// src/types/fishing.d.ts

export type CatchEntry = {
  id: string;
  species_id: string;
  species_name: string;
  alias: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM (24h)
  location: { 
    name: string; 
    lat?: number | null; 
    lon?: number | null; 
    water_type: "freshwater" | "saltwater" | "brackish"; 
  };
  conditions?: { 
    tempF?: number | null; 
    wind?: { dir?: string; mph?: number | null }; 
    cloud?: number | null; 
    pressureTrend?: "rising" | "falling" | "steady" | null; 
    moonPhase?: string | null; 
  };
  tackle?: { 
    rod?: string | null; 
    bait_or_lure?: string | null; 
    color?: string | null; 
    presentation?: string | null; 
  };
  metrics?: { 
    length_in?: number | null; 
    weight_lb?: number | null; 
    released?: boolean | null; 
  };
  notes?: string;
  media?: { 
    mugshot_url?: string | null; 
    photos?: string[]; 
    video?: string | null; 
  };
  unlocked?: { 
    training_grounds?: boolean; 
    badges?: string[]; 
  };
  created_at: string;  // ISO timestamp
  updated_at: string;  // ISO timestamp
};
