import React, { useState } from "react";
import TacticalMap from "../maps/TacticalMap";
import IncidentIntelligencePanel from "../incidents/IncidentIntelligencePanel";
import MultiReportFusionModal from "../fusion/MultiReportFusionModal";
import ResponseSimulator from "../simulation/ResponseSimulator";

export default function CommandCenterPage() {
  const [fusionModalOpen, setFusionModalOpen] = useState(false);
  const [simulationModalOpen, setSimulationModalOpen] = useState(false);

  return (
    <div style={{
      display: "flex",
      flex: 1,
      height: "calc(100vh - 50px)",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Dominant Central Live Map Area (55-65%) */}
      <div style={{
        flex: 1,
        height: "100%",
        position: "relative",
        overflow: "hidden"
      }}>
        <TacticalMap />
      </div>

      {/* Right Intelligence Panel (Fixed 390px) */}
      <IncidentIntelligencePanel
        onOpenFusionModal={() => setFusionModalOpen(true)}
        onOpenSimulationModal={() => setSimulationModalOpen(true)}
      />

      {/* Modals for Deep Inspection */}
      <MultiReportFusionModal
        isOpen={fusionModalOpen}
        onClose={() => setFusionModalOpen(false)}
      />

      <ResponseSimulator
        isOpen={simulationModalOpen}
        onClose={() => setSimulationModalOpen(false)}
      />
    </div>
  );
}
