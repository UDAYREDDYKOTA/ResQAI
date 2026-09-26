import React from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  Activity, 
  Building2, 
  GitMerge, 
  TrendingDown, 
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function AnalyticsPage() {
  const { incidents, resources, hospitals, zones } = useOperational();

  return (
    <div style={{ padding: "24px 30px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
          OPERATIONS ANALYTICS & FLEET TELEMETRY
        </h1>
        <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
          Decision support performance metrics, response latency distribution, and capacity indices
        </div>
      </div>

      {/* Top 6 KPI Metric Panels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "Mean Response Time", value: "7.4 min", sub: "1.8 min faster than baseline", color: "var(--color-info)", icon: Clock },
          { label: "Active Incidents", value: "14", sub: "3 Critical priorities", color: "var(--text-primary)", icon: AlertTriangle },
          { label: "Critical Incidents", value: "3", sub: "All assigned response teams", color: "var(--color-critical)", icon: AlertTriangle },
          { label: "Resource Fleet Load", value: "72%", sub: "Ambulances & rescue", color: "var(--color-warning)", icon: Activity },
          { label: "Hospital ER Load", value: "64%", sub: "27 beds available across metro", color: "#38bdf8", icon: Building2 },
          { label: "Fused Duplicate Calls", value: "18", sub: "Reduced dispatch clutter by 62%", color: "var(--color-ai)", icon: GitMerge }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} style={{
              backgroundColor: "var(--bg-surface-1)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              padding: "14px"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {kpi.label}
                </span>
                <Icon size={13} color={kpi.color} />
              </div>
              <div className="font-mono" style={{ fontSize: "20px", fontWeight: "700", color: kpi.color, marginBottom: "4px" }}>
                {kpi.value}
              </div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                {kpi.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Analytics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        
        {/* Hourly Incident Volume Distribution */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "18px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
              Hourly Incident Volume (Past 8 Hours)
            </span>
            <span className="badge badge-neutral" style={{ fontSize: "9px" }}>24-HOUR PEAK: 20:00</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "160px", padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
            {[
              { time: "14:00", count: 4, critical: 0 },
              { time: "15:00", count: 6, critical: 1 },
              { time: "16:00", count: 7, critical: 1 },
              { time: "17:00", count: 11, critical: 2 },
              { time: "18:00", count: 14, critical: 2 },
              { time: "19:00", count: 12, critical: 1 },
              { time: "20:00", count: 16, critical: 3 },
              { time: "21:00", count: 9, critical: 1 }
            ].map((bar, idx) => {
              const heightPct = (bar.count / 18) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <span className="font-mono" style={{ fontSize: "9.5px", color: bar.critical > 0 ? "var(--color-critical)" : "var(--text-muted)" }}>
                    {bar.count}
                  </span>
                  <div style={{
                    width: "100%",
                    height: `${heightPct}%`,
                    backgroundColor: bar.critical > 1 ? "var(--color-critical)" : "var(--color-info)",
                    borderRadius: "2px 2px 0 0",
                    opacity: 0.85
                  }} />
                  <span className="font-mono" style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: "4px" }}>
                    {bar.time}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "14px", marginTop: "10px", fontSize: "10.5px", color: "var(--text-muted)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "var(--color-info)", borderRadius: "2px" }} /> Standard Incidents
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", backgroundColor: "var(--color-critical)", borderRadius: "2px" }} /> Multiple Critical Alert Threshold
            </span>
          </div>
        </div>

        {/* Response Time Distribution Histogram */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "18px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
              Response Latency Distribution (Minutes)
            </span>
            <span className="badge badge-success" style={{ fontSize: "9px" }}>MEDIAN: 7.2 MIN</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px", padding: "10px 0", borderBottom: "1px solid var(--border-subtle)" }}>
            {[
              { bracket: "< 5 min", pct: 18, count: 8 },
              { bracket: "5-7 min", pct: 44, count: 19 },
              { bracket: "7-9 min", pct: 26, count: 11 },
              { bracket: "9-12 min", pct: 9, count: 4 },
              { bracket: "> 12 min", pct: 3, count: 1 }
            ].map((hist, idx) => (
              <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-primary)" }}>
                  {hist.pct}%
                </span>
                <div style={{
                  width: "100%",
                  height: `${hist.pct * 2}%`,
                  backgroundColor: hist.bracket === "5-7 min" ? "var(--color-success)" : "var(--bg-surface-3)",
                  border: "1px solid var(--border-medium)",
                  borderRadius: "2px 2px 0 0"
                }} />
                <span style={{ fontSize: "9.5px", color: "var(--text-muted)", marginTop: "4px", whiteSpace: "nowrap" }}>
                  {hist.bracket}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "10px", fontSize: "11px", color: "var(--text-secondary)" }}>
            88% of all critical dispatches achieve on-scene arrival under the 9-minute emergency medical benchmark.
          </div>
        </div>
      </div>

      {/* Regional Zone Coverage & Hospital Summary Table */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "12px 18px",
          backgroundColor: "var(--bg-surface-0)",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
            Regional Zone Coverage Indices
          </span>
          <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>
            Configured Minimum Safety Threshold: 80%
          </span>
        </div>

        <table className="ops-table">
          <thead>
            <tr>
              <th>ZONE IDENTIFIER</th>
              <th>CURRENT COVERAGE</th>
              <th>ACTIVE CALLS</th>
              <th>READY AMBULANCES</th>
              <th>SAFETY STATUS</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id}>
                <td style={{ fontWeight: "700" }}>{z.name}</td>
                <td className="font-mono" style={{ fontWeight: "700", color: z.coverage < z.threshold ? "var(--color-critical)" : "var(--color-success)" }}>
                  {z.coverage}%
                </td>
                <td className="font-mono">{z.activeIncidents} Incidents</td>
                <td className="font-mono">{z.availableAmbulances} Units</td>
                <td>
                  <span className={`badge ${z.coverage < z.threshold ? "badge-critical" : "badge-success"}`}>
                    {z.coverage < z.threshold ? "BREACH WARNING" : "OPTIMAL"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
