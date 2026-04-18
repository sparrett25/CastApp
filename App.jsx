import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CastShell from "./layouts/CastShell";
import Home from "./pages/HomePage";
import Intro from "./pages/IntroPage";
import FieldGuidePage from './pages/FieldGuidePage.jsx';
import CatchLedger from './pages/CatchLedgerPage.jsx';
import Journal from './pages/Journal.jsx';
import JournalArchive from './pages/JournalArchive.jsx';
import AdventureDetailPage from "./pages/AdventureDetailPage";
import LocationsGuide from './pages/LocationsGuide.jsx';
import GrantMapPage from './pages/GrantMapPage.jsx';
import PapaDockPage from './pages/PapaDockPage.jsx';

import TripPlanner from "./pages/TripPlanner.jsx";
import TripSummary from "./pages/TripSummary.jsx";

import { StoryProvider } from "./context/StoryContext";

export default function App() {
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
		
		
		<Route path="/plan-trip" element={<TripPlanner />} />
		<Route path="/trip-summary" element={<TripSummary />} />
		<Route path="/locations-guide" element={<LocationsGuide />} />
	
      
      </Route>
    </Routes>
	</StoryProvider>
  );
}
