import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  SlidersHorizontal, 
  Check, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Building2, 
  Ambulance, 
  AlertTriangle,
  Play
} from "lucide-react";
import { RESPONSE_SCENARIOS_RQ2048 } from "../../data/mockData";

export default function SimulationPage() {
  const {
    currentSelectedIncident,
    selectedScenarioId,
    setSelectedScenarioId,
    dispatchScenario,
    setActiveRoute
  } = useOperational();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [dispatchExecuted, setDispatchExecuted] = useState(false);

  const inc = currentSelectedIncident;
  const scenarios = RESPONSE_SCENARIOS_RQ2048;
  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  const handleExecuteDispatch = () => {
    dispatchScenario(inc.id, activeScenario.id);
    setConfirmModalOpen(false);
    setDispatchExecuted(true);
    setTimeout(() => {
      setActiveRoute("command");
    }, 1500);
  };

  return (
    <div style={{ padding: "24px 30px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span className="badge badge-ai">DECISION SUPPORT ENGINE</span>
            <span style={{ fontSize: "11px", color: "var(--color-warning)" }}>
              Prototype Simulation Estimates — Not guaranteed real-world predictions
            </span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
            RESPONSE SIMULATION & RESOURCE RIPPLE ANALYSIS
          </h1>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Evaluating optimal dispatch combinations for Incident #{inc.id} ({inc.locationName})
          </div>
        </div>

        {dispatchExecuted && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid var(--color-success)",
            borderRadius: "var(--radius-xs)",
            padding: "8px 14px",
            fontSize: "12px",
            color: "var(--color-success)"
          }}>
            <span>Dispatch Executed. Transitioning to Command Center...</span>
          </div>
        )}
      </div>

      {/* Scenarios Comparison Matrix Table */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        marginBottom: "20px"
      }}>
        <div style={{
          padding: "12px 18px",
          backgroundColor: "var(--bg-surface-0)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontSize: "11.5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
            Scenario Comparative Evaluation
          </span>
          <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
            Select a candidate package to inspect regional ripple effect
          </span>
        </div>

        <table className="ops-table">
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Resource Unit</th>
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
                      {sc.name.split(":")[0]}
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
              <td><strong>Rescue R03 (Heavy Extrication)</strong></td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}><Check size={14} color="var(--color-success)" /></td>
            </tr>
            <tr>
              <td><strong>Traffic Police Interceptor</strong></td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P08</td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P08</td>
              <td style={{ borderLeft: "1px solid var(--border-subtle)" }}>Police P14</td>
            </tr>
            <tr style={{ backgroundColor: "var(--bg-surface-0)" }}>
              <td style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Estimated Response Time</td>
              {scenarios.map((sc) => (
                <td key={sc.id} style={{ borderLeft: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono)", fontWeight: "700", color: "var(--color-info)" }}>
                  {sc.estimatedResponseTimeMinutes} min
                </td>
              ))}
            </tr>
            <tr style={{ backgroundColor: "var(--bg-surface-0)" }}>
              <td style={{ fontWeight: "700", color: "var(--text-secondary)" }}>Ambulance Reserve Coverage</td>
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

      {/* Resource Ripple Effect Section */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "20px",
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
              RESOURCE RIPPLE EFFECT ANALYSIS
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginTop: "2px" }}>
              Projected Zone Coverage Shifts for {activeScenario.name}
            </div>
          </div>
          <span className="badge badge-neutral" style={{ fontSize: "10px" }}>
            ZONE SAFETY FLOOR: 80%
          </span>
        </div>

        {/* 4 Zone Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "18px" }}>
          {activeScenario.zoneRipple.map((z) => (
            <div
              key={z.zoneId}
              style={{
                backgroundColor: "var(--bg-surface-2)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xs)",
                padding: "14px"
              }}
            >
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>
                {z.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span className="font-mono" style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                  {z.before}%
                </span>
                <ArrowRight size={14} color="var(--text-muted)" />
                <span className="font-mono" style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: z.after < 80 ? "var(--color-critical)" : "var(--color-success)"
                }}>
                  {z.after}%
                </span>
              </div>
              <div style={{
                fontSize: "10.5px",
                color: z.delta < 0 ? "var(--color-warning)" : "var(--text-muted)",
                marginTop: "4px"
              }}>
                {z.delta === 0 ? "No coverage degradation" : `Net Delta: ${z.delta}%`}
              </div>
            </div>
          ))}
        </div>

        {/* System Assessment Callout */}
        <div style={{
          backgroundColor: "rgba(56, 189, 248, 0.06)",
          border: "1px solid rgba(56, 189, 248, 0.3)",
          borderRadius: "var(--radius-xs)",
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: "12px"
        }}>
          <ShieldCheck size={20} color="var(--color-info)" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-info)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Automated Decision Support Assessment
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "4px", lineHeight: "1.45" }}>
              "{activeScenario.systemAssessment}"
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dispatch Action Bar */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Active Selection: <strong style={{ color: "var(--text-primary)" }}>{activeScenario.name}</strong>
        </div>

        <button
          onClick={() => setConfirmModalOpen(true)}
          className="btn btn-primary btn-md"
          style={{ padding: "9px 24px", fontWeight: "600" }}
        >
          <span>AUTHORIZE & EXECUTE DISPATCH</span>
        </button>
      </div>

      {/* Confirmation Safeguard Modal */}
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
                Confirm Operator Dispatch Command
              </h3>
            </div>

            <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: "1.45", marginBottom: "14px" }}>
              Executing dispatch for <strong style={{ color: "var(--text-primary)" }}>{activeScenario.name}</strong> will transition selected units into DISPATCHED state and update regional coverage baselines.
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button onClick={() => setConfirmModalOpen(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button
                onClick={handleExecuteDispatch}
                className="btn btn-critical btn-sm"
                style={{ padding: "7px 18px", fontWeight: "600" }}
              >
                <span>CONFIRM DISPATCH</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
