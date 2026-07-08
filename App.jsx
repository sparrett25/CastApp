import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { supabase } from "./lib/supabase";
import AuthPage from "./pages/AuthPage";

import CastShell from "./layouts/CastShell";
import Home from "./pages/HomePage";
import Intro from "./pages/IntroPage";
import FieldGuidePage from './pages/FieldGuidePage.jsx';
import CatchLedger from './pages/CatchLedgerPage.jsx';
import Journal from './pages/Journal.jsx';
import JournalArchive from './pages/JournalArchive.jsx';
import AdventureDetailPage from "./pages/AdventureDetailPage";
import AdventurePreviewPage from "./pages/AdventurePreviewPage";
import PapaDockPage from './pages/PapaDockPage.jsx';
import LocationsPage from './pages/LocationsPage.jsx';
import TripPlanner from "./pages/TripPlanner.jsx";
import TripSummary from "./pages/TripSummary.jsx";
import TripLedger from "./pages/TripLedger";
import Cabin from "./pages/CabinPage";
import ProfilePage from "./pages/ProfilePage.jsx";
import { ProfileContext, buildProfilePacket } from "./context/ProfileContext";
import About from "./pages/AboutPage";
import CastPromptBuilder from "./tools/CastPromptBuilder/castPromptBuilder";
import { StoryProvider } from "./context/StoryContext";
import { getLiveWeatherSnapshot } from "./services/weatherService";

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState(null);

async function hydrateProfileWeather(profile) {
  if (!profile) return null;

  if (profile.weather_state_override || !profile.weather_zip_code) {
    return profile;
  }

  try {
    const snapshot = await getLiveWeatherSnapshot(profile.weather_zip_code);

    return {
      ...profile,
      live_weather_state: snapshot?.state ?? null,
      live_weather_snapshot: snapshot ?? null,
    };
  } catch (err) {
    console.error("Weather mirror error:", err);
    return {
      ...profile,
      live_weather_state: null,
      live_weather_snapshot: null,
    };
  }
}

  async function loadOrCreateProfile(user) {
    const { data: existingProfile, error: fetchError } = await supabase
      .from("cast_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Profile fetch error:", fetchError);
      return null;
    }

    if (existingProfile) {
      const hydratedProfile = await hydrateProfileWeather(existingProfile);
		setProfile(hydratedProfile);
		return hydratedProfile;
    }

    const newProfilePayload = {
      user_id: user.id,
      display_name:
        user.user_metadata?.display_name ||
        user.email?.split("@")[0] ||
        "Grant",
      experience_level: "beginner",
      papa_presence_key: "classic_papa"
    };

    const { data: newProfile, error: insertError } = await supabase
      .from("cast_profiles")
      .insert(newProfilePayload)
      .select()
      .single();

    if (insertError) {
      console.error("Profile insert error:", insertError);
      return null;
    }

    const hydratedProfile = await hydrateProfileWeather(newProfile);
setProfile(hydratedProfile);
return hydratedProfile;
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const currentSession = data.session ?? null;
      setSession(currentSession);

      if (currentSession?.user) {
        loadOrCreateProfile(currentSession.user);
      } else {
        setProfile(null);
      }

      setAuthLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);

      if (session?.user) {
        loadOrCreateProfile(session.user);
      } else {
        setProfile(null);
      }

      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0b1016",
          color: "white",
          fontFamily: "Georgia, serif"
        }}
      >
        Loading Cast...
      </div>
    );
  }

  if (!session) {
    return <AuthPage />;
  }

  console.log("PROFILE:", profile);

  return (
    <ProfileContext.Provider
    value={{
      profile,
      setProfile,
      profilePacket: buildProfilePacket(profile),
    }}
  >
    <StoryProvider>
      <Routes>
        <Route element={<CastShell />}>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="intro" element={<Intro />} />
          <Route path="/field-guide" element={<FieldGuidePage />} />
          <Route path="/species" element={<FieldGuidePage />} />
          <Route path="/catch-ledger" element={<CatchLedger />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal-archive" element={<JournalArchive />} />
		  
		  <Route path="/adventures" element={<AdventurePreviewPage />} />
		  <Route path="/adventures/:questId" element={<AdventureDetailPage />} />

          <Route path="/papa" element={<PapaDockPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/plan-trip" element={<TripPlanner />} />
          <Route path="/trip-summary" element={<TripSummary />} />
		  <Route path="/profile" element={<ProfilePage />} />
		  <Route path="/auth-page" element={<AuthPage />} />
		  <Route path="/trips" element={<TripLedger />} />
		  <Route path="/cabin" element={<Cabin />} />
		  <Route path="/about" element={<About />} />
		  {import.meta.env.DEV && (
		  <Route path="/prompt-builder" element={<CastPromptBuilder />} />
		  
		)}
        </Route>
      </Routes>
    </StoryProvider>
	</ProfileContext.Provider>
  );
}