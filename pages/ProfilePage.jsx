import { useEffect, useMemo, useState } from "react";
import CastBackground from "../components/CastBackground";
import ChamberLayout from "../components/ChamberLayout";
import PapaMini from "../components/PapaMini";
import { supabase } from "../lib/supabase";
import "../styles/pages/profile.css";
import { useProfile } from "../context/ProfileContext";
import { getScene } from "../atmosphere/sceneBuilder";
import { useAtmosphere } from "../atmosphere/useAtmosphere";



const PAPA_PRESENCES = [
  { key: "classic_papa", label: "Classic Papa", desc: "Warm, steady, familiar guidance." },
  { key: "quiet_guide", label: "Quiet Guide", desc: "Sparse, calm, and contemplative." },
  { key: "practical_fisherman", label: "Practical Fisherman", desc: "Direct advice about fish, gear, and technique." },
  { key: "storyteller", label: "Storyteller", desc: "More memory, story, and gentle reflection." },
  { key: "gentle_elder", label: "Gentle Elder", desc: "Soft emotional support and patient presence." }
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
  
  const atmosphere = useAtmosphere("profile", {
  user: profilePacket,
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
	intent: "User is reviewing their CAST profile and preferences."
  };

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
	  overlay={scene?.timeState?.ui?.overlay}
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
	  overlay={ui.overlay}
	>
      <ChamberLayout
        papa={
          <PapaMini
            context={papaContext}
            fallbackKey="profile.open"
            trigger={form.papa_presence_key}
          />
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
              <p className="profile-help-text">
                Choose how CAST feels beside you. More presence options can be added later.
              </p>

              <div className="presence-grid">
                {PAPA_PRESENCES.map((presence) => (
                  <button
                    key={presence.key}
                    type="button"
                    className={
                      "presence-option" +
                      (form.papa_presence_key === presence.key ? " is-selected" : "")
                    }
					style={
					  form.papa_presence_key === presence.key
						? buttonPrimaryStyle
						: buttonSecondaryStyle
					}
                    onClick={() => updateField("papa_presence_key", presence.key)}
                  >
                    <span>{presence.label}</span>
                    <small>{presence.desc}</small>
                  </button>
                ))}
              </div>
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