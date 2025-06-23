import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeStart from "./pages/FirstPage";
import Header from "./pages/Header";
import CreateNote from './pages/CreateNote';
import PersonalAccount from "./pages/PersonalAcc";

// Import all new pages
import CalendarPage from './pages/CalendarPage';
import SupportPage from './pages/SupportPage';
import CorporateAccessPage from './pages/CorporateAccessPage';
import APIIntegrationPage from './pages/APIIntegrationPage';
import TeamNotesPage from './pages/TeamNotesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PremiumSubscriptionPage from './pages/PremiumSubscriptionPage';
import NoteTemplatesPage from './pages/NoteTemplatesPage';
import ExtensionsPage from './pages/ExtensionsPage';
import GiftCardsPage from './pages/GiftCardsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomeStart />
            </>
          }
        />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/personal-acc" element={<PersonalAccount />} />

        {/* New Routes */}
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/corporate-access" element={<CorporateAccessPage />} />
        <Route path="/api-integration" element={<APIIntegrationPage />} />
        <Route path="/team-notes" element={<TeamNotesPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/premium-subscription" element={<PremiumSubscriptionPage />} />
        <Route path="/note-templates" element={<NoteTemplatesPage />} />
        <Route path="/extensions" element={<ExtensionsPage />} />
        <Route path="/gift-cards" element={<GiftCardsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;