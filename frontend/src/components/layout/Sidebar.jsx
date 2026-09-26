import React from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Ambulance, 
  Building2, 
  SlidersHorizontal, 
  BarChart3, 
  Radio, 
  FileText, 
  Cpu, 
  Cloud,
  Layers,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const { activeRoute, setActiveRoute, criticalIncidentsCount, startDemo } = useOperational();

  const navigationItems = [
    { id: "command", label: "Command Center", icon: LayoutDashboard, badge: "EOC" },
    { id: "incidents", label: "Incidents", icon: AlertTriangle, count: criticalIncidentsCount, countColor: "var(--color-critical)" },
    { id: "resources", label: "Resources", icon: Ambulance },
    { id: "hospitals", label: "Hospitals", icon: Building2 },
    { id: "simulation", label: "Simulation", icon: SlidersHorizontal, badge: "AI" },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "responders", label: "Responder View", icon: Radio, subtext: "Mobile Terminal" },
    { id: "report", label: "Report Emergency", icon: FileText, subtext: "Citizen Portal" },
    { id: "architecture", label: "Azure Architecture", icon: Cloud, badge: "Cloud" }
  ];

  return (
    <aside style={{
      width: "230px",
      backgroundColor: "var(--bg-surface-0)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "calc(100vh - 50px)",
      flexShrink: 0,
      userSelect: "none"
    }}>
      {/* Navigation Group */}
      <div style={{ padding: "14px 10px" }}>
        <div style={{
          fontSize: "10px",
          fontWeight: "700",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0 10px 8px 10px"
        }}>
          Operations Command
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveRoute(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px",
                  borderRadius: "var(--radius-xs)",
                  border: isActive ? "1px solid rgba(56, 189, 248, 0.3)" : "1px solid transparent",
                  backgroundColor: isActive ? "rgba(56, 189, 248, 0.08)" : "transparent",
                  color: isActive ? "var(--color-info)" : "var(--text-secondary)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={16} color={isActive ? "var(--color-info)" : "var(--text-muted)"} />
                  <div>
                    <div style={{ 
                      fontSize: "12.5px", 
                      fontWeight: isActive ? "600" : "500",
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)"
                    }}>
                      {item.label}
                    </div>
                    {item.subtext && (
                      <div style={{ fontSize: "9.5px", color: "var(--text-muted)", marginTop: "1px" }}>
                        {item.subtext}
                      </div>
                    )}
                  </div>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    fontFamily: "var(--font-mono)",
                    backgroundColor: item.countColor || "var(--bg-surface-2)",
                    color: "#fff",
                    padding: "1px 6px",
                    borderRadius: "10px"
                  }}>
                    {item.count}
                  </span>
                )}

                {item.badge && (
                  <span className={`badge ${item.badge === "AI" ? "badge-ai" : "badge-neutral"}`} style={{ fontSize: "9px", padding: "1px 4px" }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer System Status & Live Demo Launcher */}
      <div style={{
        padding: "14px",
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-surface-0)"
      }}>
        {/* Cloud Readiness status */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          padding: "8px 10px",
          borderRadius: "var(--radius-xs)",
          marginBottom: "10px"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Azure Ready
            </span>
            <span style={{ fontSize: "9.5px", color: "var(--color-success)", fontFamily: "var(--font-mono)" }}>
              CONNECTED
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
            <Cloud size={12} color="#0284c7" />
            <span>OpenAI + Atlas Sync</span>
          </div>
        </div>

        {/* Demo Scenario Launch */}
        <button
          onClick={() => {
            setActiveRoute("command");
            startDemo();
          }}
          className="btn btn-secondary btn-sm"
          style={{
            width: "100%",
            fontSize: "11px",
            justifyContent: "center",
            fontWeight: "600",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            background: "rgba(56, 189, 248, 0.05)",
            color: "var(--color-info)"
          }}
        >
          <Cpu size={13} color="var(--color-info)" />
          <span>LAUNCH DEMO SCENARIO</span>
        </button>
      </div>
    </aside>
  );
}
