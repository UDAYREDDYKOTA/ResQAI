import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  Volume2, 
  VolumeX, 
  Bell, 
  Play, 
  ChevronRight,
  Server,
  Layers,
  Radio
} from "lucide-react";

export default function Header() {
  const {
    activeIncidentsCount,
    criticalIncidentsCount,
    totalRespondersCount,
    availableAmbulancesCount,
    liveClock,
    soundMuted,
    toggleSound,
    notifications,
    setActiveRoute,
    activeRoute,
    startDemo,
    demoState
  } = useOperational();

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header style={{
      height: "50px",
      backgroundColor: "var(--bg-surface-0)",
      borderBottom: "1px solid var(--border-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 18px",
      position: "relative",
      zIndex: 50,
      userSelect: "none"
    }}>
      {/* Brand & Mission Status */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div 
          onClick={() => setActiveRoute("landing")}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "9px", 
            cursor: "pointer" 
          }}
        >
          {/* Minimalist geometric mark */}
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "var(--radius-xs)",
            backgroundColor: "#0369a1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(14, 165, 233, 0.35)",
            border: "1px solid rgba(56, 189, 248, 0.4)"
          }}>
            <Radio size={16} color="#38bdf8" />
          </div>
          <div>
            <div style={{ 
              fontWeight: "700", 
              fontSize: "15px", 
              letterSpacing: "0.08em", 
              color: "var(--text-primary)",
              lineHeight: "1"
            }}>
              RESQ<span style={{ color: "#38bdf8" }}>AI</span>
            </div>
            <div style={{ 
              fontSize: "8.5px", 
              color: "var(--text-muted)", 
              letterSpacing: "0.14em", 
              fontWeight: "600",
              marginTop: "2px"
            }}>
              INTELLIGENCE FOR EMERGENCY RESPONSE
            </div>
          </div>
        </div>

        <div style={{ width: "1px", height: "22px", backgroundColor: "var(--border-subtle)" }} />

        {/* Live Operational Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 8px",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "var(--radius-xs)",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            fontWeight: "600",
            color: "var(--color-success)"
          }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--color-success)",
              boxShadow: "0 0 8px var(--color-success)"
            }} />
            LIVE OPERATIONS
          </div>
          <span style={{ 
            fontSize: "11px", 
            color: "var(--text-muted)", 
            fontFamily: "var(--font-mono)",
            display: "none" 
          }}>
            SYSTEM: OPERATIONAL
          </span>
        </div>
      </div>

      {/* Center Operational Metrics HUD */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          background: "var(--bg-surface-1)",
          padding: "4px 14px",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)"
        }}>
          {/* Active Incidents */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              {activeIncidentsCount}
            </span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Active Incidents
            </span>
          </div>

          <div style={{ width: "1px", height: "14px", backgroundColor: "var(--border-subtle)" }} />

          {/* Critical */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--color-critical)" }}>
              {criticalIncidentsCount}
            </span>
            <span style={{ fontSize: "10px", color: "var(--color-critical)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Critical
            </span>
          </div>

          <div style={{ width: "1px", height: "14px", backgroundColor: "var(--border-subtle)" }} />

          {/* Responders */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
              {totalRespondersCount}
            </span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Responders
            </span>
          </div>

          <div style={{ width: "1px", height: "14px", backgroundColor: "var(--border-subtle)" }} />

          {/* Available Ambulances */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", fontFamily: "var(--font-mono)", color: "var(--color-success)" }}>
              {availableAmbulancesCount}
            </span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Ambulances Ready
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Clock, Sound, Notifications, Demo Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Live Clock */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--text-primary)",
          background: "var(--bg-surface-1)",
          padding: "5px 9px",
          borderRadius: "var(--radius-xs)",
          border: "1px solid var(--border-subtle)"
        }}>
          <Clock size={13} color="var(--text-muted)" />
          <span>{liveClock}</span>
          <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>IST</span>
        </div>

        {/* Audio Mute Toggle */}
        <button
          onClick={toggleSound}
          title={soundMuted ? "Sound muted" : "Tactical alerts active"}
          className="btn btn-secondary btn-xs"
          style={{ width: "30px", height: "30px", padding: 0 }}
        >
          {soundMuted ? <VolumeX size={14} color="var(--text-muted)" /> : <Volume2 size={14} color="#38bdf8" />}
        </button>

        {/* Notifications Popover Toggle */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-secondary btn-xs"
            style={{ width: "30px", height: "30px", padding: 0, position: "relative" }}
          >
            <Bell size={14} color="var(--text-secondary)" />
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--color-critical)"
            }} />
          </button>

          {showNotifications && (
            <div style={{
              position: "absolute",
              top: "38px",
              right: 0,
              width: "360px",
              backgroundColor: "var(--bg-surface-1)",
              border: "1px solid var(--border-medium)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              zIndex: 100,
              overflow: "hidden"
            }}>
              <div style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--border-subtle)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "var(--bg-surface-0)"
              }}>
                <span style={{ fontSize: "11.5px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                  Operational Alerts Feed
                </span>
                <span className="badge badge-neutral" style={{ fontSize: "10px" }}>
                  {notifications.length} EVENTS
                </span>
              </div>
              <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{
                    padding: "10px 14px",
                    borderBottom: "1px solid var(--border-subtle)",
                    fontSize: "12px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span className={`badge ${
                        n.type === "CRITICAL" ? "badge-critical" :
                        n.type === "AI" ? "badge-ai" :
                        n.type === "RESOURCE" ? "badge-info" :
                        n.type === "HOSPITAL" ? "badge-warning" : "badge-neutral"
                      }`} style={{ fontSize: "9.5px", padding: "1px 5px" }}>
                        {n.type}
                      </span>
                      <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                        {n.timestamp}
                      </span>
                    </div>
                    <div style={{ fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>
                      {n.title}
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "11px", lineHeight: "1.35" }}>
                      {n.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Demo Mode Button */}
        <button
          onClick={() => {
            if (activeRoute !== "command") setActiveRoute("command");
            startDemo();
          }}
          className="btn btn-critical btn-xs"
          style={{
            background: "linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            padding: "5px 12px",
            gap: "6px",
            boxShadow: "0 0 10px rgba(220, 38, 38, 0.3)"
          }}
        >
          <Play size={11} fill="white" />
          <span>RUN LIVE DEMO</span>
        </button>
      </div>
    </header>
  );
}
