import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  Layers, 
  Flame, 
  ShieldAlert, 
  Ambulance, 
  Building2, 
  Car, 
  Navigation,
  Eye,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function TacticalMap() {
  const {
    incidents,
    resources,
    hospitals,
    zones,
    selectedIncidentId,
    selectIncident,
    dispatchScenario
  } = useOperational();

  const [zoom, setZoom] = useState(1);
  const [layers, setLayers] = useState({
    incidents: true,
    ambulances: true,
    police: true,
    fire: true,
    hospitals: true,
    zones: true,
    corridorRoutes: true
  });
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Map coordinate conversion helper
  // Latitude: 17.34 to 17.50, Longitude: 78.36 to 78.50
  // Map dimensions: width 1000, height 700
  const latToY = (lat) => {
    const minLat = 17.34;
    const maxLat = 17.51;
    return 650 - ((lat - minLat) / (maxLat - minLat)) * 600;
  };

  const lngToX = (lng) => {
    const minLng = 78.35;
    const maxLng = 78.51;
    return 50 + ((lng - minLng) / (maxLng - minLng)) * 900;
  };

  const toggleLayer = (layerName) => {
    setLayers((prev) => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  const activeIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: "560px",
      backgroundColor: "#070a0f",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid var(--border-subtle)"
    }}>
      {/* Top Map Controls Bar */}
      <div style={{
        position: "absolute",
        top: "14px",
        left: "14px",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(13, 18, 26, 0.88)",
        backdropFilter: "blur(6px)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-sm)",
        padding: "5px 10px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>
          <Layers size={13} color="var(--color-info)" />
          <span>LAYERS:</span>
        </div>

        <button
          onClick={() => toggleLayer("incidents")}
          className={`btn btn-xs ${layers.incidents ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-critical)" }} />
          Incidents ({incidents.length})
        </button>

        <button
          onClick={() => toggleLayer("ambulances")}
          className={`btn btn-xs ${layers.ambulances ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-success)" }} />
          Ambulances
        </button>

        <button
          onClick={() => toggleLayer("police")}
          className={`btn btn-xs ${layers.police ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-info)" }} />
          Police
        </button>

        <button
          onClick={() => toggleLayer("fire")}
          className={`btn btn-xs ${layers.fire ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-warning)" }} />
          Fire/Rescue
        </button>

        <button
          onClick={() => toggleLayer("hospitals")}
          className={`btn btn-xs ${layers.hospitals ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#38bdf8" }} />
          Hospitals ({hospitals.length})
        </button>

        <button
          onClick={() => toggleLayer("zones")}
          className={`btn btn-xs ${layers.zones ? "btn-secondary" : "btn-ghost"}`}
          style={{ fontSize: "10.5px", padding: "2px 7px" }}
        >
          Coverage Zones
        </button>
      </div>

      {/* Zoom & Viewport Controls (Top Right) */}
      <div style={{
        position: "absolute",
        top: "14px",
        right: "14px",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        background: "rgba(13, 18, 26, 0.88)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-sm)",
        padding: "4px"
      }}>
        <button 
          onClick={() => setZoom(Math.min(zoom + 0.15, 1.6))}
          className="btn btn-ghost btn-xs"
          style={{ width: "26px", height: "26px", padding: 0 }}
          title="Zoom In"
        >
          <Plus size={14} />
        </button>
        <button 
          onClick={() => setZoom(Math.max(zoom - 0.15, 0.8))}
          className="btn btn-ghost btn-xs"
          style={{ width: "26px", height: "26px", padding: 0 }}
          title="Zoom Out"
        >
          <Minus size={14} />
        </button>
        <button 
          onClick={() => setZoom(1)}
          className="btn btn-ghost btn-xs"
          style={{ width: "26px", height: "26px", padding: 0 }}
          title="Reset View"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Bottom Map Status Legend & Telemetry Bar */}
      <div style={{
        position: "absolute",
        bottom: "12px",
        left: "14px",
        right: "14px",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(13, 18, 26, 0.90)",
        backdropFilter: "blur(6px)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "6px 14px",
        fontSize: "11px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-secondary)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: "var(--text-muted)" }}>GEO METRO: HYDERABAD-CYBERABAD</span>
          <span>CENTER: 17.4156° N, 78.4350° E</span>
          <span>PROJECTION: EPSG:3857</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {zones.map((zone) => (
            <div key={zone.id} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "10px" }}>{zone.name.split(" ")[0]}:</span>
              <span style={{
                fontWeight: "700",
                color: zone.coverage < zone.threshold ? "var(--color-critical)" : "var(--color-success)"
              }}>
                {zone.coverage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Vector Tactical Map */}
      <svg
        viewBox="0 0 1000 700"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
          transition: "transform 0.25s ease-out",
          cursor: "grab"
        }}
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.8" />
          </pattern>
          <radialGradient id="criticalPulseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base dark canvas with subtle grid */}
        <rect width="1000" height="700" fill="#070a0f" />
        <rect width="1000" height="700" fill="url(#gridPattern)" />

        {/* Major Waterways / Hussain Sagar Lake representation */}
        <path
          d="M 680 340 C 720 310, 750 350, 780 330 C 800 370, 750 420, 700 400 C 660 380, 650 350, 680 340 Z"
          fill="rgba(14, 165, 233, 0.08)"
          stroke="rgba(56, 189, 248, 0.25)"
          strokeWidth="1.2"
        />
        <text x="705" y="370" fill="rgba(56, 189, 248, 0.4)" fontSize="10" fontFamily="var(--font-mono)">
          HUSSAIN SAGAR
        </text>

        {/* Major Arterial Road Corridors */}
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" strokeDasharray="3 3">
          {/* Outer Ring Road Express Corridor */}
          <path d="M 80 180 Q 500 120 920 180 T 880 620" fill="none" />
          {/* Inner Ring Road */}
          <path d="M 220 280 C 450 240, 650 280, 780 440 S 300 580, 220 280" fill="none" />
          {/* Banjara Hills Rd 12 Arterial Corridor */}
          <line x1="280" y1="360" x2="680" y2="410" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="2.5" strokeDasharray="none" />
        </g>

        {/* Coverage Zones Boundaries & Badges */}
        {layers.zones && (
          <g>
            {/* Zone A: Central / Banjara */}
            <rect
              x="380"
              y="260"
              width="310"
              height="250"
              fill="rgba(56, 189, 248, 0.02)"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x="390" y="280" fill="rgba(56, 189, 248, 0.6)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              ZONE A (CENTRAL / BANJARA) — 94% COVERAGE
            </text>

            {/* Zone B: West / Jubilee & Hitec */}
            <rect
              x="70"
              y="220"
              width="300"
              height="290"
              fill="rgba(16, 185, 129, 0.02)"
              stroke="rgba(16, 185, 129, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x="85" y="240" fill="rgba(16, 185, 129, 0.6)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              ZONE B (WEST / HITEC) — 88% COVERAGE
            </text>

            {/* Zone C: North / Secunderabad */}
            <rect
              x="420"
              y="40"
              width="450"
              height="210"
              fill="rgba(245, 158, 11, 0.02)"
              stroke="rgba(245, 158, 11, 0.18)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x="435" y="65" fill="rgba(245, 158, 11, 0.6)" fontSize="11" fontFamily="var(--font-mono)" fontWeight="600">
              ZONE C (NORTH / SECUNDERABAD) — 91% COVERAGE
            </text>
          </g>
        )}

        {/* Emergency Dispatch Corridor Vector line for #RQ-2048 */}
        {layers.corridorRoutes && (
          <g>
            {/* Route from Ambulance A12 to #RQ-2048 */}
            <path
              d={`M ${lngToX(78.4420)} ${latToY(17.4120)} Q ${lngToX(78.4380)} ${latToY(17.4135)} ${lngToX(78.4350)} ${latToY(17.4156)}`}
              fill="none"
              stroke="var(--color-critical)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Route from Hospital HOSP-01 to #RQ-2048 */}
            <path
              d={`M ${lngToX(78.4460)} ${latToY(17.4180)} L ${lngToX(78.4350)} ${latToY(17.4156)}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="2 3"
            />
          </g>
        )}

        {/* Hospitals Markers */}
        {layers.hospitals && hospitals.map((hosp) => {
          const x = lngToX(hosp.coordinates.lng);
          const y = latToY(hosp.coordinates.lat);
          return (
            <g
              key={hosp.id}
              transform={`translate(${x}, ${y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveTooltip({ type: "HOSPITAL", data: hosp, x, y })}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <rect
                x="-12"
                y="-12"
                width="24"
                height="24"
                rx="4"
                fill="#0b1724"
                stroke="#0284c7"
                strokeWidth="1.5"
              />
              <text x="0" y="4" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">
                H
              </text>
              <rect
                x="14"
                y="-10"
                width="65"
                height="16"
                rx="2"
                fill="#0d141f"
                stroke="rgba(56, 189, 248, 0.3)"
              />
              <text x="18" y="2" fill="var(--text-primary)" fontSize="9.5" fontWeight="600" fontFamily="var(--font-mono)">
                ER: {hosp.erCapacity}/{hosp.erTotal}
              </text>
            </g>
          );
        })}

        {/* Resources / Responders Markers */}
        {resources.map((res) => {
          const isAmbulance = res.type === "AMBULANCE";
          const isPolice = res.type === "POLICE";
          const isFire = res.type === "FIRE" || res.type === "RESCUE";

          if (isAmbulance && !layers.ambulances) return null;
          if (isPolice && !layers.police) return null;
          if (isFire && !layers.fire) return null;

          const x = lngToX(res.coordinates.lng);
          const y = latToY(res.coordinates.lat);
          const isAvailable = res.status === "AVAILABLE";

          const color = isAvailable ? "var(--color-success)" : isPolice ? "var(--color-info)" : "var(--color-warning)";

          return (
            <g
              key={res.id}
              transform={`translate(${x}, ${y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActiveTooltip({ type: "RESOURCE", data: res, x, y })}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <circle
                r="9"
                fill="#0d141e"
                stroke={color}
                strokeWidth="1.8"
              />
              <circle
                r="3.5"
                fill={color}
              />
              <text
                x="12"
                y="3"
                fill="var(--text-secondary)"
                fontSize="9"
                fontWeight="500"
                fontFamily="var(--font-mono)"
              >
                {res.callsign.split(" ")[1] || res.id}
              </text>
            </g>
          );
        })}

        {/* Incidents Markers */}
        {layers.incidents && incidents.map((inc) => {
          const x = lngToX(inc.coordinates.lat ? inc.coordinates.lng : 78.4350);
          const y = latToY(inc.coordinates.lat ? inc.coordinates.lat : 17.4156);
          const isSelected = inc.id === selectedIncidentId;
          const isCritical = inc.priority === "CRITICAL";

          return (
            <g
              key={inc.id}
              transform={`translate(${x}, ${y})`}
              style={{ cursor: "pointer" }}
              onClick={() => selectIncident(inc.id)}
              onMouseEnter={() => setActiveTooltip({ type: "INCIDENT", data: inc, x, y })}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Radar pulse effect for critical incidents */}
              {isCritical && (
                <>
                  <circle r="22" fill="url(#criticalPulseGrad)" />
                  <circle
                    r="18"
                    fill="none"
                    stroke="var(--color-critical)"
                    strokeWidth="1.2"
                    opacity="0.7"
                    className="animate-pulse-subtle"
                  />
                </>
              )}

              {/* Marker Shape */}
              <polygon
                points="0,-12 11,8 -11,8"
                fill={isCritical ? "var(--color-critical)" : inc.priority === "HIGH" ? "var(--color-warning)" : "var(--color-info)"}
                stroke="#ffffff"
                strokeWidth={isSelected ? "2" : "1"}
              />

              <text
                x="0"
                y="5"
                textAnchor="middle"
                fill="#000000"
                fontSize="9"
                fontWeight="800"
                fontFamily="var(--font-mono)"
              >
                !
              </text>

              {/* Incident Callout Pill */}
              <rect
                x="-36"
                y="-26"
                width="72"
                height="13"
                rx="2"
                fill="#0f1622"
                stroke={isSelected ? "var(--color-info)" : "var(--border-subtle)"}
                strokeWidth="1"
              />
              <text
                x="0"
                y="-17"
                textAnchor="middle"
                fill={isSelected ? "var(--color-info)" : "var(--text-primary)"}
                fontSize="8.5"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                {inc.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Tooltip */}
      {activeTooltip && (
        <div style={{
          position: "absolute",
          left: `${Math.min(activeTooltip.x + 15, 650)}px`,
          top: `${Math.max(activeTooltip.y - 45, 60)}px`,
          zIndex: 30,
          backgroundColor: "rgba(16, 22, 34, 0.95)",
          backdropFilter: "blur(8px)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-xs)",
          padding: "8px 12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          pointerEvents: "none",
          minWidth: "180px"
        }}>
          {activeTooltip.type === "INCIDENT" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                <span className="font-mono" style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "11px" }}>
                  #{activeTooltip.data.id}
                </span>
                <span className={`badge ${activeTooltip.data.priority === "CRITICAL" ? "badge-critical" : "badge-warning"}`}>
                  {activeTooltip.data.priority}
                </span>
              </div>
              <div style={{ fontWeight: "600", color: "var(--text-primary)", fontSize: "11.5px" }}>
                {activeTooltip.data.type.replace("_", " ")}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "10.5px" }}>
                {activeTooltip.data.locationName}
              </div>
              <div style={{ color: "var(--color-info)", fontSize: "10px", marginTop: "3px", fontFamily: "var(--font-mono)" }}>
                Affected: {activeTooltip.data.affectedPeople} persons | Status: {activeTooltip.data.status}
              </div>
            </div>
          )}

          {activeTooltip.type === "RESOURCE" && (
            <div>
              <div style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "11px" }}>
                {activeTooltip.data.callsign}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "10.5px" }}>
                Zone: {activeTooltip.data.zone} | Crew: {activeTooltip.data.crewCount}
              </div>
              <div style={{
                color: activeTooltip.data.status === "AVAILABLE" ? "var(--color-success)" : "var(--color-warning)",
                fontSize: "10px",
                fontWeight: "600",
                marginTop: "2px"
              }}>
                Status: {activeTooltip.data.status}
              </div>
            </div>
          )}

          {activeTooltip.type === "HOSPITAL" && (
            <div>
              <div style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "11.5px" }}>
                {activeTooltip.data.name}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "10.5px" }}>
                ER Trauma Beds: {activeTooltip.data.erCapacity} / {activeTooltip.data.erTotal}
              </div>
              <div style={{ color: "var(--color-info)", fontSize: "10px", marginTop: "2px" }}>
                Status: {activeTooltip.data.status} | ETA: {activeTooltip.data.etaMinutes} min
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
