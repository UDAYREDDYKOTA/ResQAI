import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Ambulance, 
  Shield, 
  Flame, 
  Wrench, 
  BatteryCharging, 
  Gauge, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Radio,
  Search
} from "lucide-react";

export default function ResourcesPage() {
  const { resources, updateResourceStatus } = useOperational();
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredResources = resources.filter((res) => {
    const matchesCat = categoryFilter === "ALL" || res.type === categoryFilter;
    const matchesStatus = statusFilter === "ALL" || res.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  return (
    <div style={{ padding: "24px 30px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
            RESOURCE MANAGEMENT
          </h1>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Operational readiness, equipment telemetry, and sector distribution
          </div>
        </div>

        {/* Quick KPI stats */}
        <div style={{ display: "flex", gap: "14px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
          <div className="panel" style={{ padding: "6px 12px" }}>
            <span style={{ color: "var(--text-muted)" }}>AMBULANCES: </span>
            <strong style={{ color: "var(--color-success)" }}>
              {resources.filter(r => r.type === "AMBULANCE" && r.status === "AVAILABLE").length} / {resources.filter(r => r.type === "AMBULANCE").length}
            </strong>
          </div>
          <div className="panel" style={{ padding: "6px 12px" }}>
            <span style={{ color: "var(--text-muted)" }}>POLICE UNITS: </span>
            <strong style={{ color: "var(--color-info)" }}>
              {resources.filter(r => r.type === "POLICE" && r.status === "AVAILABLE").length} / {resources.filter(r => r.type === "POLICE").length}
            </strong>
          </div>
          <div className="panel" style={{ padding: "6px 12px" }}>
            <span style={{ color: "var(--text-muted)" }}>FIRE/RESCUE: </span>
            <strong style={{ color: "var(--color-warning)" }}>
              {resources.filter(r => (r.type === "FIRE" || r.type === "RESCUE") && r.status === "AVAILABLE").length} / {resources.filter(r => r.type === "FIRE" || r.type === "RESCUE").length}
            </strong>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "var(--bg-surface-1)",
        padding: "10px 16px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)",
        marginBottom: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginRight: "4px" }}>
            Unit Category:
          </span>
          {["ALL", "AMBULANCE", "POLICE", "RESCUE", "FIRE"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn btn-xs ${categoryFilter === cat ? "btn-secondary" : "btn-ghost"}`}
              style={{ fontSize: "10.5px", borderColor: categoryFilter === cat ? "var(--color-info)" : "transparent" }}
            >
              {cat === "ALL" ? "All Units" : cat}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginRight: "4px" }}>
            Status:
          </span>
          {["ALL", "AVAILABLE", "DISPATCHED", "RESPONDING", "ON_SCENE", "MAINTENANCE"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`btn btn-xs ${statusFilter === st ? "btn-secondary" : "btn-ghost"}`}
              style={{ fontSize: "10.5px", borderColor: statusFilter === st ? "var(--color-info)" : "transparent" }}
            >
              {st.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Operational Resources Table */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }}>
        <table className="ops-table">
          <thead>
            <tr>
              <th>CALLSIGN / ID</th>
              <th>TYPE & CATEGORY</th>
              <th>OPERATIONAL STATUS</th>
              <th>ASSIGNED ZONE</th>
              <th>CREW</th>
              <th>EQUIPMENT LOADOUT</th>
              <th>TELEMETRY & FUEL</th>
              <th>CURRENT ASSIGNMENT</th>
              <th>UPDATE STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredResources.map((res) => {
              const isAvailable = res.status === "AVAILABLE";
              return (
                <tr key={res.id}>
                  <td className="font-mono">
                    <div style={{ fontWeight: "700", color: "var(--text-primary)" }}>{res.callsign}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{res.id}</div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {res.type === "AMBULANCE" && <Ambulance size={14} color="var(--color-success)" />}
                      {res.type === "POLICE" && <Shield size={14} color="var(--color-info)" />}
                      {res.type === "RESCUE" && <Wrench size={14} color="var(--color-warning)" />}
                      {res.type === "FIRE" && <Flame size={14} color="var(--color-critical)" />}
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "11.5px" }}>{res.type}</div>
                        <div style={{ fontSize: "9.5px", color: "var(--text-muted)" }}>{res.category ? res.category.replace("_", " ") : "STANDARD"}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${
                      res.status === "AVAILABLE" ? "badge-success" :
                      res.status === "DISPATCHED" || res.status === "RESPONDING" ? "badge-warning" :
                      res.status === "ON_SCENE" ? "badge-info" : "badge-neutral"
                    }`}>
                      {res.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="font-mono" style={{ fontSize: "11px" }}>
                    {res.zone}
                  </td>
                  <td className="font-mono" style={{ textAlign: "center" }}>
                    {res.crewCount} Crew
                  </td>
                  <td>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", maxWidth: "260px" }}>
                      {(res.equipment || []).map((eq, i) => (
                        <span key={i} className="badge badge-neutral" style={{ fontSize: "9.5px", padding: "1px 5px" }}>
                          {eq}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="font-mono" style={{ fontSize: "11px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <BatteryCharging size={12} color="var(--color-success)" />
                      <span>{res.batteryFuel || 90}%</span>
                      {res.telemetrySpeedKmh > 0 && (
                        <span style={{ color: "var(--color-info)", marginLeft: "4px" }}>
                          {res.telemetrySpeedKmh} km/h
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="font-mono" style={{ fontSize: "11px", color: res.currentAssignment ? "var(--color-info)" : "var(--text-muted)" }}>
                    {res.currentAssignment ? `#${res.currentAssignment}` : "STANDBY"}
                  </td>
                  <td>
                    <select
                      value={res.status}
                      onChange={(e) => updateResourceStatus(res.id, e.target.value)}
                      style={{
                        backgroundColor: "var(--bg-surface-0)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-xs)",
                        color: "var(--text-primary)",
                        padding: "3px 6px",
                        fontSize: "10.5px",
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer"
                      }}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="RESPONDING">RESPONDING</option>
                      <option value="ON_SCENE">ON SCENE</option>
                      <option value="TRANSPORTING">TRANSPORTING</option>
                      <option value="MAINTENANCE">MAINTENANCE</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
