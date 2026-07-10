import { useEffect, useMemo, useState } from "react";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { supabase } from "../lib/supabase";
import "../styles/pages/profile.css";
import "../styles/global/atmosphere.css";
import { useProfile } from "../context/ProfileContext";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";
import { REGION_OPTIONS, DEFAULT_REGION_KEY } from "../data/regionOptions";
import { buildAtmospherePacket } from "../atmosphere/buildAtmospherePacket";
import {
  getAtmosphereRegionKey,
  getAtmosphericInvitations,
  getAtmosphericPerception,
} from "../utils/resolveChamberBackground";



const PAPA_PRESENCES = [
  { key: "classic_papa", label: "Classic Papa", desc: "Warm, steady, familiar guidance." },
  { key: "quiet_guide", label: "Quiet Guide", desc: "Sparse, calm, and contemplative." },
  { key: "practical_fisherman", label: "Practical Fisherman", desc: "Direct advice about fish, gear, and technique." },
  { key: "storyteller", label: "Storyteller", desc: "More memory, story, and gentle reflection." },
  { key: "gentle_elder", label: "Gentle Elder", desc: "Soft emotional support and patient presence." }
];

const TIME_STATE_OPTIONS = [
  { key: "auto", label: "Automatic" },
  { key: "blue-hour-dawn", label: "Blue Hour Dawn" },
  { key: "first-light", label: "First Light" },
  { key: "soft-morning-rise", label: "Soft Morning Rise" },
  { key: "warm-drift", label: "Warm Drift" },
  { key: "golden-dusk", label: "Golden Dusk" },
  { key: "quiet-evening-glow", label: "Quiet Evening Glow" },
  { key: "ember-twilight", label: "Ember Twilight" },
  { key: "starry-night", label: "Starry Night" },
  
];

const WEATHER_STATE_OPTIONS = [
  { key: "auto", label: "Automatic" },
  { key: "first-fog", label: "First Fog" },
  { key: "still-overcast", label: "Still Overcast" },
  { key: "clear-sky", label: "Clear Sky" },
  { key: "silver-rain", label: "Silver Rain" },
  { key: "breezy", label: "Breezy" },
  { key: "ember-storm", label: "Ember Storm" },
  { key: "base", label: "Native" },
];

const EXPERIENCE_LEVELS = ["beginner", "casual", "intermediate", "experienced"];

function parseCommaList(value) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function formatArray(value) {
  return Array.isArray(value) ? value.join(", ") : "";
}

function titleCase(value) {
  return value ? value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "";
}

function ProfileSection({
  title,
  summary,
  open,
  onToggle,
  children,
  cardStyle,
  textTheme,
}) {
	
  return (
    <section
  className={"profile-section" + (open ? " is-open" : "")}
  style={cardStyle}
>
      <button type="button" className="profile-section-head" onClick={onToggle}>
        <div>
          <p className="profile-section-kicker">{title}</p>
          <p className="profile-section-summary">{summary}</p>
        </div>
        <span className="profile-section-arrow">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="profile-section-body">{children}</div>}
    </section>
  );
}

export default function ProfilePage() {
	
	
  const DEBUG_SCENE = null;
  
  const [profile, setProfile] = useState(null);
  const { profilePacket, setProfile: setGlobalProfile } = useProfile();
  const [form, setForm] = useState(null);
  const [openSection, setOpenSection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  
  console.log("CAST profilePacket:", profilePacket);
  
  const atmosphere = useAtmosphere("profile", {
  user: {
    ...profilePacket,
    time_state_override:
      form?.timeStateOverride === "auto" ? null : form?.timeStateOverride,
	  weather_state_override:
  form?.weatherStateOverride === "auto" ? null : form?.weatherStateOverride,
  },
  context: {
    openSection,
    selectedPresence: form?.papa_presence_key ?? null,
    experienceLevel: form?.experience_level ?? null,
  },
});
  
  
  const scene = DEBUG_SCENE
  ? getScene(DEBUG_SCENE, {
      user: profilePacket,
      context: {
        openSection,
        selectedPresence: form?.papa_presence_key ?? null,
      },
    })
  : atmosphere.scene;

const resolvedRegion =
  scene?.regionKey ||
  getAtmosphereRegionKey(profilePacket?.favoriteRegion);
  
  
const atmospherePacket = buildAtmospherePacket({
  page: "profile",
  region: resolvedRegion,
  timeState: scene?.backgroundVariant || "soft-morning-rise",
  weatherState: scene?.weatherState?.id || scene?.weather || "base",
  user: profilePacket,
  
});

const atmosphericInvitation = getAtmosphericInvitations({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});

const atmosphericPerception = getAtmosphericPerception({
  registry: atmospherePacket.registry,
  regionKey: atmospherePacket.region,
  timeKey: atmospherePacket.timeState,
  weatherKey: atmospherePacket.weatherState,
});

const ui = scene?.timeState?.ui ?? atmosphere.ui ?? {};
const styles = atmosphere.styles ?? {};

const cardStyle = styles.cardStyle ?? {};
const buttonPrimaryStyle = styles.buttonPrimaryStyle ?? {};
const buttonSecondaryStyle = styles.buttonSecondaryStyle ?? {};
const inputStyle = styles.inputStyle ?? {};
const textTheme = ui.text ?? {};
  
  const papaContext = {
    page: "profile",
	user: profilePacket,
	atmosphere: atmospherePacket,
    scene,
	intent: "User is reviewing their CAST profile and preferences."
  };

const atmosphereSignature = {
  page: atmospherePacket?.labels?.page || "Home",
  region: atmospherePacket?.labels?.region || "Central Florida",
  time: atmospherePacket?.labels?.timeState || scene?.backgroundVariant,
  weather: atmospherePacket?.labels?.weatherState || scene?.weather,
};

const isWeatherAutomatic = form?.weatherStateOverride === "auto";

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);

        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("No active user found.");

        const { data, error } = await supabase
          .from("cast_profiles")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;
        if (mounted) {
          setProfile(data);
          setForm({
            display_name: data?.display_name || "",
            bio: data?.bio || "",
            home_region: data?.home_region || "",
            home_water: data?.home_water || "",
            favorite_place: data?.favorite_place || "",
            experience_level: data?.experience_level || "beginner",
            favorite_species: formatArray(data?.favorite_species),
            target_species: formatArray(data?.target_species),
            preferred_baits: formatArray(data?.preferred_baits),
			regionKey: data?.region_key || DEFAULT_REGION_KEY,
			timeStateOverride: data?.time_state_override || "auto",
			weatherStateOverride: data?.weather_state_override || "auto",
			weatherZipCode: data?.weather_zip_code || "",
            papa_presence_key: data?.papa_presence_key || "classic_papa"
          });
        }
      } catch (err) {
        console.error("Profile load error:", err);
        if (mounted) setMessage(err.message || "Unable to load profile.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadProfile();




    return () => {
      mounted = false;
    };
  }, []);





  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!profile || !form) return;

    try {
      setSaving(true);
      setMessage("");

      const payload = {
        display_name: form.display_name.trim() || "Angler",
        bio: form.bio.trim() || null,
        home_region: form.home_region.trim() || null,
        home_water: form.home_water.trim() || null,
        favorite_place: form.favorite_place.trim() || null,
        experience_level: form.experience_level,
        favorite_species: parseCommaList(form.favorite_species),
        target_species: parseCommaList(form.target_species),
        preferred_baits: parseCommaList(form.preferred_baits),
		region_key: form.regionKey || DEFAULT_REGION_KEY,
		time_state_override:
		form.timeStateOverride === "auto" ? null : form.timeStateOverride,
		weather_state_override:
		form.weatherStateOverride === "auto" ? null : form.weatherStateOverride,
		weather_zip_code: form.weatherZipCode || null,
        papa_presence_key: form.papa_presence_key
      };

      const { data, error } = await supabase
        .from("cast_profiles")
        .update(payload)
        .eq("id", profile.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
	  setGlobalProfile(data);
      setMessage("Profile saved.");
    } catch (err) {
      console.error("Profile save error:", err);
      setMessage(err.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  }

  const selectedPresence = useMemo(
    () => PAPA_PRESENCES.find((p) => p.key === form?.papa_presence_key),
    [form?.papa_presence_key]
  );

  const identitySummary = form
    ? [form.display_name || "Angler", form.home_region, form.home_water]
        .filter(Boolean)
        .join(" · ") || "Name, home waters, and experience"
    : "";

  const fishingSummary = form
    ? [form.favorite_species || "Favorite species", form.preferred_baits || "Preferred baits"]
        .filter(Boolean)
        .join(" · ")
    : "";

  const presenceSummary = selectedPresence
    ? `${selectedPresence.label} · ${titleCase(form?.experience_level)}`
    : "Papa presence and CAST feel";

  if (loading || !form) {
    return (
      <CastBackground
	  chamberKey="profile"
	  variant={scene?.backgroundVariant}
	  regionKey={profilePacket?.region_key || DEFAULT_REGION_KEY}
	  overlay={ui.overlay}
	>
        <ChamberLayout>
          <div className="profile-page">
            <div className="profile-shell">
              <p className="profile-kicker">Profile</p>
              <h1>Loading your waters...</h1>
            </div>
          </div>
        </ChamberLayout>
      </CastBackground>
    );
  }

  return (
    <CastBackground
	  chamberKey="profile"
	  variant={scene?.backgroundVariant}
	   regionKey={form?.regionKey || DEFAULT_REGION_KEY}
	  overlay={ui.overlay}
	>
      <ChamberLayout
  signature={
	  <>
    <div className="cast-atmosphere-signature cast-atmosphere-signature--inline">
      <span>
        {atmosphereSignature.page} • {atmosphereSignature.region} •{" "}
        {atmosphereSignature.time}
        {atmosphereSignature.weather &&
        atmosphereSignature.weather !== "Base" &&
        atmosphereSignature.weather !== "base"
          ? ` • ${atmosphereSignature.weather}`
          : ""}
      </span>
    </div>
	
	{atmosphericPerception && (
	  <div className="cast-atmospheric-perception">
		<strong>{atmosphericPerception.title}</strong>
		<span>{atmosphericPerception.description}</span>
	  </div>
	)}
	
	
	<div className="cast-atmospheric-awareness">
	  <strong>Awareness</strong>
	  <span>{atmosphericInvitation}</span>
	</div>
	
  </>
  }
  
>

        <main className="profile-page">
          <section className="profile-hero">
            <p className="profile-kicker">Your Profile</p>
            
            <p>
              Shape how Papa speaks, what waters feel familiar, and how the app
              quietly understands your fishing world.
            </p>
          </section>

          <form className="profile-shell" onSubmit={handleSave}>
            <ProfileSection
              title="Identity"
              summary={identitySummary}
              open={openSection === "identity"}
			  cardStyle={cardStyle}
			  textTheme={textTheme}
              onToggle={() =>
                setOpenSection(openSection === "identity" ? null : "identity")
              }
            >
              <label>
                Display name
                <input
                  value={form.display_name}
                  onChange={(e) => updateField("display_name", e.target.value)}
                  placeholder="Angler"
                />
              </label>

              <label>
                Short bio
                <textarea
                  value={form.bio}
				  style={inputStyle}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="A few words about your time by the water..."
                />
              </label>

              <label>
                Home region
                <input
                  value={form.home_region}
				  style={inputStyle}
                  onChange={(e) => updateField("home_region", e.target.value)}
                  placeholder="Tampa Bay, FL"
                />
              </label>

              <label>
                Home water
                <input
                  value={form.home_water}
				  style={inputStyle}
                  onChange={(e) => updateField("home_water", e.target.value)}
                  placeholder="Backyard Pond"
                />
              </label>

              <label>
                Favorite place
                <input
                  value={form.favorite_place}
				  style={inputStyle}
                  onChange={(e) => updateField("favorite_place", e.target.value)}
                  placeholder="A dock, pond, creek, or lake..."
                />
              </label>

              <label>
                Experience level
                <select
                  value={form.experience_level}
				  style={inputStyle}
                  onChange={(e) => updateField("experience_level", e.target.value)}
                >
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {titleCase(level)}
                    </option>
                  ))}
                </select>
              </label>
            </ProfileSection>

            <ProfileSection
              title="Fishing Style"
              summary={fishingSummary}
              open={openSection === "fishing"}
			  cardStyle={cardStyle}
			  textTheme={textTheme}
              onToggle={() =>
                setOpenSection(openSection === "fishing" ? null : "fishing")
              }
            >
              <label>
                Favorite species
                <input
                  value={form.favorite_species}
				  style={inputStyle}
                  onChange={(e) => updateField("favorite_species", e.target.value)}
                  placeholder="Bluegill, Bass, Catfish"
                />
              </label>

              <label>
                Target species
                <input
                  value={form.target_species}
				  style={inputStyle}
                  onChange={(e) => updateField("target_species", e.target.value)}
                  placeholder="Bass, Warmouth"
                />
              </label>

              <label>
                Preferred baits
                <input
                  value={form.preferred_baits}
				  style={inputStyle}
                  onChange={(e) => updateField("preferred_baits", e.target.value)}
                  placeholder="Worms, minnows, spinnerbait"
                />
              </label>
            </ProfileSection>

            <ProfileSection
              title="CAST Presence"
              summary={presenceSummary}
              open={openSection === "presence"}
			  cardStyle={cardStyle}
			  textTheme={textTheme}
              onToggle={() =>
                setOpenSection(openSection === "presence" ? null : "presence")
              }
            >
              <label>
  Regional atmosphere
  <select
    value={form.regionKey || DEFAULT_REGION_KEY}
    style={inputStyle}
    onChange={(e) => updateField("regionKey", e.target.value)}
  >
    {Object.values(REGION_OPTIONS).map((region) => (
      <option key={region.key} value={region.key}>
        {region.label}
      </option>
    ))}
  </select>
</label>

<label>
  Time state
  <select
    value={form.timeStateOverride || "auto"}
    style={inputStyle}
    onChange={(e) => updateField("timeStateOverride", e.target.value)}
  >
    {TIME_STATE_OPTIONS.map((state) => (
      <option key={state.key} value={state.key}>
        {state.label}
      </option>
    ))}
  </select>
</label>

<label>
  Weather state
  <select
    value={form.weatherStateOverride || "auto"}
    style={inputStyle}
    onChange={(e) => updateField("weatherStateOverride", e.target.value)}
  >
    {WEATHER_STATE_OPTIONS.map((state) => (
      <option key={state.key} value={state.key}>
        {state.label}
      </option>
    ))}
  </select>
</label>

{form.weatherStateOverride === "auto" && (
  <label>
    Weather Mirror
    <input
      value={form.weatherZipCode || ""}
      style={inputStyle}
      onChange={(e) => updateField("weatherZipCode", e.target.value)}
      placeholder="Zip Code"
      inputMode="numeric"
      maxLength={5}
    />
  </label>
)}




<p className="profile-help-text">
  Automatic lets CAST quietly follow the rhythm of the day while mirroring the live weather from the place you choose below. Select a specific time or weather state whenever you'd like to manually shape the atmosphere.
</p>



            </ProfileSection>

            <button
			  className="profile-save"
			  type="submit"
			  disabled={saving}
			  style={buttonPrimaryStyle}
			>
              {saving ? "Saving..." : "Save profile →"}
            </button>

            {message && <p className="profile-message">{message}</p>}
          </form>
        </main>
      </ChamberLayout>
    </CastBackground>
  );
}