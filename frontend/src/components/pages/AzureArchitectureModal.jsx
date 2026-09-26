import React from "react";
import { 
  Cloud, 
  Cpu, 
  Database, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Layers, 
  ArrowRight, 
  Server,
  ArrowDown,
  CheckCircle2
} from "lucide-react";

export default function AzureArchitectureModal() {
  return (
    <div style={{ padding: "30px 40px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ marginBottom: "26px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "3px 8px",
            backgroundColor: "rgba(2, 132, 199, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            borderRadius: "var(--radius-xs)",
            fontSize: "11px",
            color: "var(--color-info)",
            fontFamily: "var(--font-mono)"
          }}>
            <Cloud size={13} color="#0284c7" />
            MICROSOFT AZURE CLOUD ARCHITECTURE
          </div>
        </div>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)" }}>
          TECHNICAL ARCHITECTURE & CLOUD READINESS
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
          Production-grade system topology connecting citizen telemetry, AI reasoning, and multi-agency dispatch.
        </p>
      </div>

      {/* Top Architecture Flow Pipeline */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "24px",
        marginBottom: "24px"
      }}>
        <div style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: "16px" }}>
          END-TO-END OPERATIONAL DATA PIPELINE
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", overflowX: "auto", paddingBottom: "10px" }}>
          {[
            { step: "01", title: "Citizen & Sensors", tech: "Mobile / IoT Webhook", sub: "Text, Audio, GPS" },
            { step: "02", title: "Event Ingestion", tech: "Azure Event Grid", sub: "Sub-10ms pub/sub" },
            { step: "03", title: "AI Intelligence", tech: "Azure OpenAI GPT-4o", sub: "Extraction & Fusion" },
            { step: "04", title: "Geospatial Routing", tech: "Azure Maps", sub: "Isochrones & ETA" },
            { step: "05", title: "Operational State", tech: "Cosmos DB / Atlas", sub: "Distributed sync" },
            { step: "06", title: "EOC Command Center", tech: "ResQAI Mission UI", sub: "Human-in-the-loop" }
          ].map((node, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                flex: 1,
                minWidth: "140px",
                backgroundColor: "var(--bg-surface-2)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xs)",
                padding: "12px"
              }}>
                <div className="font-mono" style={{ fontSize: "10px", color: "var(--color-info)", fontWeight: "700" }}>
                  {node.step}
                </div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)", marginTop: "3px" }}>
                  {node.title}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-ai)", fontWeight: "600", marginTop: "2px" }}>
                  {node.tech}
                </div>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>
                  {node.sub}
                </div>
              </div>
              {idx < 5 && <ArrowRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Cloud Components Detail Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        
        {/* Azure OpenAI */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Cpu size={18} color="var(--color-ai)" />
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
              Azure OpenAI Service
            </h3>
          </div>
          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "12px" }}>
            Extracts structured entity payloads (casualty count, entrapment status, hazardous materials) from unstructured voice or text reports. Runs spatio-temporal and semantic clustering for multi-report duplicate fusion.
          </p>
          <div style={{
            backgroundColor: "var(--bg-surface-0)",
            padding: "8px 12px",
            borderRadius: "var(--radius-xs)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-ai)"
          }}>
            AIService.analyzeIncident() • AIService.detectDuplicateReports()
          </div>
        </div>

        {/* Azure Maps */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <MapPin size={18} color="var(--color-info)" />
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
              Azure Maps & Routing
            </h3>
          </div>
          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "12px" }}>
            Powers emergency corridor routing, matrix response distance calculations, and real-time isochrone reachability contours. Dynamically re-routes ambulances around active traffic blockades.
          </p>
          <div style={{
            backgroundColor: "var(--bg-surface-0)",
            padding: "8px 12px",
            borderRadius: "var(--radius-xs)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-info)"
          }}>
            AzureMapsRouteService.getEmergencyRoute() • IsochronePolygonEngine
          </div>
        </div>

        {/* Azure Cosmos DB / MongoDB Atlas */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Database size={18} color="var(--color-success)" />
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
              Azure Cosmos DB / Distributed State
            </h3>
          </div>
          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "12px" }}>
            Sub-millisecond read/write latency with multi-region replication. Ensures that when an ambulance or hospital status updates in one sector, all EOC dispatch consoles synchronize instantly.
          </p>
          <div style={{
            backgroundColor: "var(--bg-surface-0)",
            padding: "8px 12px",
            borderRadius: "var(--radius-xs)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-success)"
          }}>
            ChangeFeedSubscriber • MongoDB Atlas Connected Cluster
          </div>
        </div>

        {/* Microsoft Entra ID */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <ShieldCheck size={18} color="var(--color-warning)" />
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
              Microsoft Entra ID & RBAC
            </h3>
          </div>
          <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "12px" }}>
            Zero Trust identity architecture with fine-grained role-based access control separating COMMAND_OPERATOR authorizations from RESPONDER unit terminals, HOSPITAL triage desks, and CITIZEN intake.
          </p>
          <div style={{
            backgroundColor: "var(--bg-surface-0)",
            padding: "8px 12px",
            borderRadius: "var(--radius-xs)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--color-warning)"
          }}>
            RBAC: COMMAND_OPERATOR | RESPONDER | HOSPITAL | CITIZEN
          </div>
        </div>
      </div>
    </div>
  );
}
