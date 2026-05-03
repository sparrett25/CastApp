import { createContext, useContext } from "react";
import { DEFAULT_REGION_KEY } from "../data/regionOptions";

export const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
  profilePacket: null,
});

export function useProfile() {
  return useContext(ProfileContext);
}

export function buildProfilePacket(profile) {
  if (!profile) return null;

  return {
    displayName: profile.display_name,
    bio: profile.bio,
    homeRegion: profile.home_region,
    homeWater: profile.home_water,
    favoritePlace: profile.favorite_place,
    experienceLevel: profile.experience_level,
    favoriteSpecies: profile.favorite_species || [],
    targetSpecies: profile.target_species || [],
    preferredBaits: profile.preferred_baits || [],
    papaPresenceKey: profile.papa_presence_key,
    regionKey: profile.region_key || DEFAULT_REGION_KEY,
    region_key: profile.region_key || DEFAULT_REGION_KEY,
    role: profile.role,
  };
}