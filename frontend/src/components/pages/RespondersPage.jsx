import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Radio, 
  Navigation, 
  AlertTriangle, 
  Users, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Send,
  MapPin,
  ChevronRight
} from "lucide-react";

export default function RespondersPage() {
  const { resources, updateResourceStatus, currentSelectedIncident } = useOperational();
  const [selectedUnitId, setSelectedUnitId] = useState("AMB-A12");
  const [responderNotes, setResponderNotes] = useState([
    { time: "20:42:10", sender: "Dispatch EOC", text: "Scenario A deployed. City Care trauma ward alerted." }
  ]);
  const [newNote, setNewNote] = useState("");

  const currentUnit = resources.find((r) => r.id === selectedUnitId) || resources[0];
  const inc = currentSelectedIncident || {
    id: "RQ-2048",
    type: "ROAD_ACCIDENT",
    priority: "CRITICAL",
    locationName: "Banjara Hills Rd 12",
    affectedPeople: 3,
    riskIndicators: ["Vehicle cabin entrapment", "Multiple severe casualties"]
  };

  const handleStatusChange = (status) => {
    updateResourceStatus(currentUnit.id, status);
    setResponderNotes((prev) => [
      ...prev,
      {
        time: new Date().toTimeString().split(" ")[0],
        sender: currentUnit.callsign,
        text: `Unit status updated to: ${status.replace("_", " ")}`
      }
    ]);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setResponderNotes((prev) => [
      ...prev,
      {
        time: new Date().toTimeString().split(" ")[0],
        sender: currentUnit.callsign,
        text: newNote.trim()
      }
    ]);
    setNewNote("");
  };

  return (
    <div style={{
      padding: "24px 20px",
      flex: 1,
      overflowY: "auto",
      backgroundColor: "var(--bg-app)",
      display: "flex",
      justifyContent: "center"
    }}>
      {/* Mobile-Friendly Tactical Terminal Frame */}
      <div style={{
        width: "100%",
        maxWidth: "680px",
        backgroundColor: "var(--bg-surface-0)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
      }}>
        {/* Terminal Header */}
        <div style={{
          padding: "16px 20px",
          backgroundColor: "var(--bg-surface-1)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
              <Radio size={14} color="var(--color-info)" />
              <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: "var(--color-info)" }}>
                RESQAI FIELD MOBILE TERMINAL
              </span>
            </div>
            <div style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
              {currentUnit.callsign}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Unit:</span>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              style={{
                backgroundColor: "var(--bg-surface-2)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xs)",
                color: "var(--text-primary)",
                padding: "4px 8px",
                fontSize: "11px",
                fontFamily: "var(--font-mono)"
              }}
            >
              {resources.map((r) => (
                <option key={r.id} value={r.id}>{r.callsign}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Action Buttons Bar */}
        <div style={{
          padding: "12px 16px",
          backgroundColor: "var(--bg-surface-2)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "6px"
        }}>
          {["ACKNOWLEDGED", "EN_ROUTE", "ON_SCENE", "TRANSPORTING", "AVAILABLE"].map((st) => {
            const isActive = currentUnit.status === st || (st === "EN_ROUTE" && currentUnit.status === "RESPONDING");
            return (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                style={{
                  padding: "7px 4px",
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: "700",
                  borderRadius: "var(--radius-xs)",
                  border: isActive ? "1px solid var(--color-info)" : "1px solid var(--border-subtle)",
                  backgroundColor: isActive ? "rgba(56, 189, 248, 0.2)" : "var(--bg-surface-0)",
                  color: isActive ? "var(--color-info)" : "var(--text-secondary)",
                  cursor: "pointer",
                  textAlign: "center"
                }}
              >
                {st.replace("_", " ")}
              </button>
            );
          })}
        </div>

        {/* Current Incident Assignment Card */}
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
            <div>
              <span className="badge badge-critical" style={{ marginBottom: "6px" }}>
                ACTIVE DISPATCH ASSIGNMENT
              </span>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                #{inc.id} • {inc.type.replace("_", " ")}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--text-secondary)", fontSize: "12px", marginTop: "4px" }}>
                <MapPin size={13} color="var(--color-critical)" />
                <span>{inc.locationName}</span>
              </div>
            </div>

            <div style={{
              backgroundColor: "var(--bg-surface-1)",
              border: "1px solid var(--border-subtle)",
              padding: "6px 12px",
              borderRadius: "var(--radius-xs)",
              textAlign: "right"
            }}>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>CASUALTIES</div>
              <div className="font-mono" style={{ fontSize: "15px", fontWeight: "700", color: "var(--color-critical)" }}>
                {inc.affectedPeople} Persons
              </div>
            </div>
          </div>

          {/* Operational Hazards & Risks */}
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "var(--radius-xs)",
            padding: "10px 14px",
            marginBottom: "14px"
          }}>
            <div style={{ fontSize: "10.5px", fontWeight: "700", color: "var(--color-critical)", textTransform: "uppercase", marginBottom: "4px" }}>
              Known Scene Risks & Extrication Hazards
            </div>
            <ul style={{ paddingLeft: "16px", fontSize: "12px", color: "var(--text-primary)", lineHeight: "1.4" }}>
              {(inc.riskIndicators || []).map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Destination Hospital Intake */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xs)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Building2 size={16} color="var(--color-info)" />
              <div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Destination Facility Pre-Alerted
                </div>
                <div style={{ fontSize: "12.5px", fontWeight: "700", color: "var(--text-primary)" }}>
                  City Care Hospital (ER Trauma Bay 2)
                </div>
              </div>
            </div>
            <div className="font-mono" style={{ fontSize: "11px", color: "var(--color-success)", fontWeight: "600" }}>
              READY FOR INTAKE
            </div>
          </div>
        </div>

        {/* Tactical Comm Log */}
        <div style={{ padding: "18px 20px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
            Field Telemetry & Tactical Log
          </div>

          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-xs)",
            padding: "10px 12px",
            maxHeight: "150px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "12px"
          }}>
            {responderNotes.map((note, idx) => (
              <div key={idx} style={{ fontSize: "11.5px" }}>
                <span className="font-mono" style={{ color: "var(--text-muted)", fontSize: "10px", marginRight: "6px" }}>
                  [{note.time}]
                </span>
                <strong style={{ color: "var(--color-info)", marginRight: "6px" }}>
                  {note.sender}:
                </strong>
                <span style={{ color: "var(--text-primary)" }}>{note.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddNote} style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Transmit tactical update to command center..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "var(--bg-surface-2)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xs)",
                padding: "8px 12px",
                fontSize: "12px",
                color: "var(--text-primary)",
                outline: "none"
              }}
            />
            <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: "0 14px" }}>
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
