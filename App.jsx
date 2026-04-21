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
import GrantMapPage from './pages/GrantMapPage.jsx';
import PapaDockPage from './pages/PapaDockPage.jsx';
import LocationsPage from './pages/LocationsPage.jsx';

import TripPlanner from "./pages/TripPlanner.jsx";
import TripSummary from "./pages/TripSummary.jsx";

import { StoryProvider } from "./context/StoryContext";

export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState(null);

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
      setProfile(existingProfile);
      return existingProfile;
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

    setProfile(newProfile);
    return newProfile;
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
    <StoryProvider>
      <Routes>
        <Route element={<CastShell />}>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} />
          <Route path="intro" element={<Intro />} />
          <Route path="/field-guide" element={<FieldGuidePage />} />
          <Route path="/species" element={<FieldGuidePage />} />
          <Route path="/catch-ledger" element={<CatchLedger />} />
          <Route path="/map" element={<GrantMapPage />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal-archive" element={<JournalArchive />} />
          <Route path="/adventures/:questId" element={<AdventureDetailPage />} />
          <Route path="/papa" element={<PapaDockPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/plan-trip" element={<TripPlanner />} />
          <Route path="/trip-summary" element={<TripSummary />} />
        </Route>
      </Routes>
    </StoryProvider>
  );
}