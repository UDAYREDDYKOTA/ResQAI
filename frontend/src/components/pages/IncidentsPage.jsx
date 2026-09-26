import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Ambulance, 
  CheckCircle2, 
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";

export default function IncidentsPage() {
  const { incidents, selectIncident, setSelectedIncidentId, setActiveRoute } = useOperational();
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIncidents = incidents.filter((inc) => {
    const matchesPriority = priorityFilter === "ALL" || inc.priority === priorityFilter;
    const matchesStatus = statusFilter === "ALL" || inc.status === statusFilter;
    const matchesSearch = inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.locationName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: "24px 30px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
            INCIDENT MANAGEMENT
          </h1>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Operational dispatch queue and multi-agency incident tracking
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setActiveRoute("report")}
            className="btn btn-secondary btn-sm"
          >
            <span>Ingest New Incident</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        backgroundColor: "var(--bg-surface-1)",
        padding: "12px 16px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-subtle)",
        marginBottom: "16px"
      }}>
        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by ID, location, or incident type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: "var(--bg-surface-0)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xs)",
              padding: "6px 10px",
              color: "var(--text-primary)",
              fontSize: "12px",
              width: "100%",
              outline: "none"
            }}
          />
        </div>

        {/* Priority Filter Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginRight: "4px" }}>
            Priority:
          </span>
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`btn btn-xs ${priorityFilter === p ? "btn-secondary" : "btn-ghost"}`}
              style={{
                fontSize: "10.5px",
                fontFamily: "var(--font-mono)",
                borderColor: priorityFilter === p ? "var(--color-info)" : "transparent"
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", marginRight: "4px" }}>
            Status:
          </span>
          {["ALL", "AWAITING_DISPATCH", "RESPONDING", "ACTIVE", "RESOLVED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`btn btn-xs ${statusFilter === s ? "btn-secondary" : "btn-ghost"}`}
              style={{
                fontSize: "10.5px",
                borderColor: statusFilter === s ? "var(--color-info)" : "transparent"
              }}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Dense Operational Table */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }}>
        <table className="ops-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TYPE</th>
              <th>PRIORITY</th>
              <th>LOCATION</th>
              <th>AFFECTED</th>
              <th>REQUIRED UNITS</th>
              <th>STATUS</th>
              <th>REPORTED</th>
              <th>LAST UPDATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: "30px", color: "var(--text-muted)" }}>
                  NO MATCHING INCIDENTS LOCATED
                </td>
              </tr>
            ) : (
              filteredIncidents.map((inc) => {
                const isCrit = inc.priority === "CRITICAL";
                return (
                  <tr key={inc.id} style={{ cursor: "pointer" }}>
                    <td className="font-mono" style={{ fontWeight: "700", color: "var(--text-primary)" }}>
                      #{inc.id}
                    </td>
                    <td style={{ fontWeight: "600" }}>
                      {inc.type.replace("_", " ")}
                    </td>
                    <td>
                      <span className={`badge ${
                        inc.priority === "CRITICAL" ? "badge-critical" :
                        inc.priority === "HIGH" ? "badge-warning" :
                        inc.priority === "MEDIUM" ? "badge-info" : "badge-neutral"
                      }`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>
                      {inc.locationName}
                    </td>
                    <td className="font-mono" style={{ textAlign: "center" }}>
                      {inc.affectedPeople}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {(inc.requiredResources || []).map((r, i) => (
                          <span key={i} className="badge badge-neutral" style={{ fontSize: "9.5px", padding: "1px 5px" }}>
                            {r.label ? r.label.split(" ")[0] + " " + r.label.split(" ")[2] : r.type}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        inc.status === "AWAITING_DISPATCH" ? "badge-critical" :
                        inc.status === "RESPONDING" ? "badge-info" :
                        inc.status === "RESOLVED" ? "badge-success" : "badge-neutral"
                      }`}>
                        {inc.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {inc.reportedAt}
                    </td>
                    <td className="font-mono" style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                      {inc.lastUpdate}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => {
                            selectIncident(inc.id);
                            setActiveRoute("command");
                          }}
                          className="btn btn-secondary btn-xs"
                          title="View on Command Center map"
                        >
                          EOC Map
                        </button>
                        <button
                          onClick={() => {
                            selectIncident(inc.id);
                            setActiveRoute("simulation");
                          }}
                          className="btn btn-primary btn-xs"
                          title="Simulate Response"
                        >
                          Simulate
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
