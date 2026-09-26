import React from "react";
import { OperationalProvider, useOperational } from "./context/OperationalContext";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import DemoController from "./components/layout/DemoController";
import LandingPage from "./components/pages/LandingPage";
import CommandCenterPage from "./components/pages/CommandCenterPage";
import IncidentsPage from "./components/pages/IncidentsPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import HospitalsPage from "./components/pages/HospitalsPage";
import SimulationPage from "./components/pages/SimulationPage";
import AnalyticsPage from "./components/pages/AnalyticsPage";
import RespondersPage from "./components/pages/RespondersPage";
import ReportEmergencyPage from "./components/pages/ReportEmergencyPage";
import AzureArchitectureModal from "./components/pages/AzureArchitectureModal";
import "./App.css";

function AppContent() {
  const { activeRoute, demoState } = useOperational();

  if (activeRoute === "landing") {
    return (
      <div className="app-container">
        <LandingPage />
        {(demoState.isPlaying || demoState.currentStep > 1) && <DemoController />}
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Top Mission Control Bar */}
      <Header />

      {/* Main Workspace Layout with Sidebar */}
      <div className="workspace-layout">
        <Sidebar />

        <main className="main-content">
          {activeRoute === "command" && <CommandCenterPage />}
          {activeRoute === "incidents" && <IncidentsPage />}
          {activeRoute === "resources" && <ResourcesPage />}
          {activeRoute === "hospitals" && <HospitalsPage />}
          {activeRoute === "simulation" && <SimulationPage />}
          {activeRoute === "analytics" && <AnalyticsPage />}
          {activeRoute === "responders" && <RespondersPage />}
          {activeRoute === "report" && <ReportEmergencyPage />}
          {activeRoute === "architecture" && <AzureArchitectureModal />}
        </main>
      </div>

      {/* Demo Playback HUD Controller */}
      {(demoState.isPlaying || demoState.currentStep > 1 || activeRoute === "command" || activeRoute === "simulation") && (
        <DemoController />
      )}
    </div>
  );
}

export default function App() {
  return (
    <OperationalProvider>
      <AppContent />
    </OperationalProvider>
  );
}