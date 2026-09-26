import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  SlidersHorizontal, 
  X, 
  Check, 
  Minus, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Ambulance, 
  Building2, 
  ArrowRight,
  Info,
  CheckCircle2
} from "lucide-react";
import { RESPONSE_SCENARIOS_RQ2048 } from "../../data/mockData";

export default function ResponseSimulator({ isOpen, onClose }) {
  const {
    currentSelectedIncident,
    selectedScenarioId,
    setSelectedScenarioId,
    dispatchScenario
  } = useOperational();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  if (!isOpen) return null;

  const inc = currentSelectedIncident;
  const scenarios = RESPONSE_SCENARIOS_RQ2048;
  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleConfirmDispatch = () => {
    dispatchScenario(inc.id, activeScenario.id);
    setConfirmModalOpen(false);
    onClose();
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(3, 6, 10, 0.88)",
      backdropFilter: "blur(6px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "980px",
        maxHeight: "92vh",
        backgroundColor: "var(--bg-surface-0)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface-1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SlidersHorizontal size={16} color="var(--color-info)" />
              <h2 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                RESPONSE SIMULATION & RESOURCE RIPPLE ANALYSIS
              </h2>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
              <span>Incident #{inc.id} • {inc.type.replace("_", " ")} ({inc.locationName})</span>
              <span>•</span>
              <span style={{ color: "var(--color-warning)", fontWeight: "500" }}>
                Simulation estimate — not a guaranteed real-world outcome. Decision support only.
              </span>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost btn-xs" style={{ width: "28px", height: "28px", padding: 0 }}>
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* Scenario Comparison Table */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            overflow: "hidden"
          }}>
            <div style={{
              padding: "10px 16px",
              backgroundColor: "var(--bg-surface-0)",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                Candidate Response Scenarios Matrix
              </span>
              <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
                Click a column or scenario card to evaluate ripple impact
              </span>
            </div>

            <table className="ops-table">
              <thead>
                <tr>
                  <th style={{ width: "24%" }}>Resource Unit</th>
                  {scenarios.map((sc) => (
                    <th 
                      key={sc.id}
                      onClick={() => setSelectedScenarioId(sc.id)}
                      style={{
                        width: "25%",
                        cursor: "pointer",
                        backgroundColor: selectedScenarioId === sc.id ? "rgba(56, 189, 248, 0.08)" : "transparent",
                        borderLeft: "1px solid var(--border-subtle)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontWeight: "700", color: selectedScenarioId === sc.id ? "var(--color-info)" : "var(--text-primary)" }}>
                          {sc.id.replace("SCENARIO-", "SCENARIO ")}
                        </span>
                        {sc.isRecommended && (
                          <span className="badge badge-success" style={{ fontSize: "9px" }}>RECOMMENDED</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Ambulance A12 (ALS)</strong></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Minus size={14} color="var(--text-dim)" /></td>
                </tr>
                <tr>
                  <td><strong>Ambulance A07 (ALS)</strong></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Minus size={14} color="var(--text-dim)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                </tr>
                <tr>
                  <td><strong>Ambulance A09 (BLS)</strong></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Minus size={14} color="var(--text-dim)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Minus size={14} color="var(--text-dim)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                </tr>
                <tr>
                  <td><strong>Rescue R03 (Heavy Cutters)</strong></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
                </tr>
                <tr>
                  <td><strong>Police Interceptor</strong></td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P08</td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P08</td>
                  <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P14</td>
                </tr>
                <tr style={{ backgroundColor: "var(--bg-surface-0)" }}>
                  <td style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Estimated Response ETA</td>
                  {scenarios.map((sc) => (
                    <td key={sc.id} style={{ borderLeft: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-info)" }}>
                      {sc.estimatedResponseTimeMinutes} min
                    </td>
                  ))}
                </tr>
                <tr style={{ backgroundColor: "var(--bg-surface-0)" }}>
                  <td style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Ambulance Coverage Remaining</td>
                  {scenarios.map((sc) => (
                    <td key={sc.id} style={{ borderLeft: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", fontWeight: "700", color: sc.remainingAmbulanceCoveragePercent < 80 ? "var(--color-warning)" : "var(--color-success)" }}>
                      {sc.remainingAmbulanceCoveragePercent}%
                    </td>
                  ))}
                </tr>
                <tr style={{ backgroundColor: "var(--bg-surface-0)" }}>
                  <td style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Hospital ER Load</td>
                  {scenarios.map((sc) => (
                    <td key={sc.id} style={{ borderLeft: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
                      {sc.hospitalLoadEstimate}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Resource Ripple Effect Breakdown */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "16px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
                REGIONAL RESOURCE RIPPLE EFFECT ({activeScenario.name.split(":")[0]})
              </span>
              <span className="badge badge-neutral" style={{ fontSize: "9.5px" }}>
                CONFIGURED MIN THRESHOLD: 80%
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {activeScenario.zoneRipple.map((zone) => (
                <div key={zone.zoneId} style={{
                  backgroundColor: "var(--bg-surface-2)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-xs)",
                  padding: "10px 12px"
                }}>
                  <div style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    {zone.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span className="font-mono" style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                      {zone.before}%
                    </span>
                    <ArrowRight size={12} color="var(--text-muted)" />
                    <span className="font-mono" style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: zone.after < 80 ? "var(--color-critical)" : "var(--color-success)"
                    }}>
                      {zone.after}%
                    </span>
                  </div>
                  <div style={{ fontSize: "9.5px", color: zone.delta === 0 ? "var(--text-muted)" : "var(--color-warning)", marginTop: "2px" }}>
                    {zone.delta === 0 ? "No Impact" : `Shift: ${zone.delta}%`}
                  </div>
                </div>
              ))}
            </div>

            {/* System Assessment Statement */}
            <div style={{
              backgroundColor: "rgba(56, 189, 248, 0.05)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: "var(--radius-xs)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "flex-start",
              gap: "10px"
            }}>
              <ShieldCheck size={16} color="var(--color-info)" style={{ marginTop: "2px", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--color-info)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  System Decision Support Assessment
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-primary)", marginTop: "2px", lineHeight: "1.4" }}>
                  {activeScenario.systemAssessment}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface-1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Selected: <strong style={{ color: "var(--text-primary)" }}>{activeScenario.name}</strong>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ padding: "7px 18px", fontWeight: "600" }}
            >
              <span>SELECT & PROCEED TO DISPATCH</span>
            </button>
          </div>
        </div>
      </div>

      {/* Operator Dispatch Confirmation Dialog */}
      {confirmModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            width: "480px",
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-sm)",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <AlertTriangle size={20} color="var(--color-critical)" />
              <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                Confirm Simulated Dispatch Authorization
              </h3>
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.45", marginBottom: "14px" }}>
              You are authorizing the dispatch of <strong style={{ color: "var(--text-primary)" }}>{activeScenario.resources.map(r => r.callsign).join(", ")}</strong> to Incident #{inc.id}.
              Zone A reserve ambulance coverage will adjust to <strong style={{ color: "var(--color-info)" }}>{activeScenario.remainingAmbulanceCoveragePercent}%</strong>.
            </p>

            <div style={{
              backgroundColor: "var(--bg-surface-2)",
              padding: "8px 12px",
              borderRadius: "var(--radius-xs)",
              fontSize: "10.5px",
              color: "var(--text-muted)",
              marginBottom: "18px"
            }}>
              HUMAN-IN-THE-LOOP SAFEGUARD: ResQAI operates as a decision-support advisory system. Dispatch commands require conscious operator execution.
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setConfirmModalOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button
                onClick={handleConfirmDispatch}
                className="btn btn-critical btn-sm"
                style={{ padding: "7px 18px", fontWeight: "600" }}
              >
                <span>EXECUTE DISPATCH</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
