import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Cpu, 
  AlertTriangle, 
  Users, 
  Percent, 
  Ambulance, 
  Shield, 
  Wrench, 
  Building2, 
  GitMerge, 
  SlidersHorizontal, 
  ExternalLink,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Flame
} from "lucide-react";

export default function IncidentIntelligencePanel({ onOpenFusionModal, onOpenSimulationModal }) {
  const {
    currentSelectedIncident,
    setActiveRoute,
    dispatchScenario,
    notifyHospital
  } = useOperational();

  const inc = currentSelectedIncident;
  if (!inc) return null;

  const isCritical = inc.priority === "CRITICAL";

  return (
    <aside style={{
      width: "390px",
      backgroundColor: "var(--bg-surface-0)",
      borderLeft: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 50px)",
      overflowY: "auto",
      userSelect: "none"
    }}>
      {/* Header Operational Block */}
      <div style={{
        padding: "16px 18px",
        borderBottom: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-surface-1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
          <span style={{
            fontSize: "10px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.08em",
            fontWeight: "700",
            color: isCritical ? "var(--color-critical)" : "var(--color-warning)"
          }}>
            {isCritical ? "CRITICAL INCIDENT" : "ACTIVE INCIDENT"}
          </span>
          <span className={`badge ${
            inc.status === "AWAITING_DISPATCH" ? "badge-critical" :
            inc.status === "RESPONDING" ? "badge-info" :
            inc.status === "RESOLVED" ? "badge-success" : "badge-neutral"
          }`}>
            {inc.status.replace("_", " ")}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "4px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
            #{inc.id}
          </h2>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-secondary)" }}>
            {inc.type.replace("_", " ")}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3px", fontSize: "11px", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <MapPin size={12} color="var(--text-muted)" />
            <span>{inc.locationName} ({inc.coordinates.lat?.toFixed(4)}, {inc.coordinates.lng?.toFixed(4)})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Clock size={12} color="var(--text-muted)" />
            <span>Reported {inc.reportedAt} • Last update {inc.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* AI Incident Intelligence Block */}
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Cpu size={14} color="var(--color-ai)" />
            <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", color: "var(--color-ai)" }}>
              AI INCIDENT INTELLIGENCE
            </span>
          </div>
          <span className="badge badge-ai" style={{ fontSize: "9.5px" }}>
            ANALYSIS COMPLETE
          </span>
        </div>

        {/* Intelligence Stats Matrix */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
          marginBottom: "14px"
        }}>
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            padding: "8px 10px",
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ fontSize: "9.5px", color: "var(--text-muted)", textTransform: "uppercase" }}>Priority</div>
            <div style={{
              fontSize: "12px",
              fontWeight: "700",
              fontFamily: "var(--font-mono)",
              color: isCritical ? "var(--color-critical)" : "var(--color-warning)",
              marginTop: "2px"
            }}>
              {inc.priority}
            </div>
          </div>

          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            padding: "8px 10px",
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ fontSize: "9.5px", color: "var(--text-muted)", textTransform: "uppercase" }}>Affected</div>
            <div style={{ fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-primary)", marginTop: "2px" }}>
              {inc.affectedPeople} Persons
            </div>
          </div>

          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            padding: "8px 10px",
            borderRadius: "var(--radius-xs)",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ fontSize: "9.5px", color: "var(--text-muted)", textTransform: "uppercase" }}>Confidence</div>
            <div style={{ fontSize: "12px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--color-info)", marginTop: "2px" }}>
              {Math.round((inc.confidence || 0.94) * 100)}%
            </div>
          </div>
        </div>

        {/* Risk Indicators */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "10.5px", fontWeight: "600", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
            Risk Indicators
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {(inc.riskIndicators || []).map((indicator, idx) => (
              <div key={idx} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "7px",
                fontSize: "11.5px",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-surface-1)",
                padding: "6px 8px",
                borderRadius: "var(--radius-xs)",
                borderLeft: "2px solid var(--color-critical)"
              }}>
                <span style={{ color: "var(--color-critical)", fontSize: "12px", lineHeight: "1" }}>•</span>
                <span>{indicator}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Requirements */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "10.5px", fontWeight: "600", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>
            Resource Requirements
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(inc.requiredResources || []).map((resReq, idx) => (
              <div key={idx} style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-medium)",
                padding: "4px 8px",
                borderRadius: "var(--radius-xs)",
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                color: "var(--text-primary)"
              }}>
                {resReq.type === "AMBULANCE" && <Ambulance size={12} color="var(--color-success)" />}
                {resReq.type === "RESCUE" && <Wrench size={12} color="var(--color-warning)" />}
                {resReq.type === "POLICE" && <Shield size={12} color="var(--color-info)" />}
                {resReq.type === "FIRE" && <Flame size={12} color="var(--color-critical)" />}
                <span>{resReq.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Duplicate Reports & Fusion CTA */}
        <div style={{
          backgroundColor: "rgba(129, 140, 248, 0.07)",
          border: "1px solid rgba(129, 140, 248, 0.25)",
          borderRadius: "var(--radius-xs)",
          padding: "9px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div>
            <div style={{ fontSize: "10px", color: "var(--color-ai)", fontWeight: "700", letterSpacing: "0.05em" }}>
              DUPLICATE CITIZEN REPORTS
            </div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)", marginTop: "1px" }}>
              {inc.reportsCount || 3} Correlated Reports Fused
            </div>
          </div>
          <button
            onClick={onOpenFusionModal}
            className="btn btn-secondary btn-xs"
            style={{ fontSize: "10.5px", gap: "4px" }}
          >
            <GitMerge size={12} color="var(--color-ai)" />
            <span>Inspect Fusion</span>
          </button>
        </div>
      </div>

      {/* Hospital Match Block */}
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Hospital Coordination Match
          </span>
          <span className="badge badge-info" style={{ fontSize: "9px" }}>
            7 MIN ETA
          </span>
        </div>

        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          padding: "10px 12px",
          borderRadius: "var(--radius-xs)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "700", fontSize: "12.5px", color: "var(--text-primary)" }}>
              {inc.hospitalMatch?.hospitalName || "City Care Hospital"}
            </div>
            <span style={{ fontSize: "10px", color: "var(--color-success)", fontFamily: "var(--font-mono)", fontWeight: "600" }}>
              ACCEPTING
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "8px" }}>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
              ER Trauma Capacity: <strong style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>6 Free</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
              Trauma Readiness: <strong style={{ color: "var(--color-info)" }}>Available</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Block */}
      <div style={{ padding: "16px 18px", marginTop: "auto", display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={onOpenSimulationModal}
          className="btn btn-primary"
          style={{ width: "100%", padding: "9px 14px", fontWeight: "600" }}
        >
          <SlidersHorizontal size={14} />
          <span>SIMULATE RESPONSE SCENARIOS</span>
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <button
            onClick={() => setActiveRoute("incidents")}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "11px" }}
          >
            <ExternalLink size={12} />
            <span>Full Incident View</span>
          </button>

          <button
            onClick={() => setActiveRoute("resources")}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: "11px" }}
          >
            <Ambulance size={12} />
            <span>Fleet Resources</span>
          </button>
        </div>

        {inc.status === "AWAITING_DISPATCH" && (
          <button
            onClick={() => dispatchScenario(inc.id, "SCENARIO-A")}
            className="btn btn-critical btn-sm"
            style={{ width: "100%", marginTop: "2px", fontWeight: "600" }}
          >
            <span>DIRECT DISPATCH (SCENARIO A)</span>
          </button>
        )}
      </div>
    </aside>
  );
}
