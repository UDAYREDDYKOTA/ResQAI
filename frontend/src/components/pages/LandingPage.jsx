import React from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Radio, 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  GitMerge, 
  SlidersHorizontal, 
  Building2, 
  Clock, 
  Layers, 
  Cloud,
  CheckCircle2,
  Play,
  FileText
} from "lucide-react";
import TacticalMap from "../maps/TacticalMap";

export default function LandingPage() {
  const { setActiveRoute, startDemo } = useOperational();

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "var(--bg-app)",
      color: "var(--text-primary)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Hero Section */}
      <section style={{
        padding: "60px 40px 40px 40px",
        maxWidth: "1320px",
        margin: "0 auto",
        width: "100%"
      }}>
        {/* Top Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "4px 10px",
            backgroundColor: "rgba(56, 189, 248, 0.08)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            borderRadius: "var(--radius-xs)",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            color: "var(--color-info)",
            letterSpacing: "0.06em",
            fontWeight: "600"
          }}>
            <Cloud size={13} color="#0284c7" />
            MICROSOFT HACKATHON 2026 • MISSION-CRITICAL ARCHITECTURE
          </div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            backgroundColor: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "var(--radius-xs)",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            color: "var(--color-success)"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-success)" }} />
            DECISION-SUPPORT PLATFORM
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div style={{ maxWidth: "860px", marginBottom: "32px" }}>
          <h1 style={{
            fontSize: "52px",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            lineHeight: "1.08",
            marginBottom: "14px",
            color: "#ffffff"
          }}>
            RESQ<span style={{ color: "#38bdf8" }}>AI</span>
          </h1>
          <div style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "16px"
          }}>
            INTELLIGENCE FOR EMERGENCY RESPONSE
          </div>
          <p style={{
            fontSize: "18px",
            color: "var(--text-secondary)",
            lineHeight: "1.5",
            fontWeight: "400"
          }}>
            "One operational picture for incidents, responders, resources and hospitals."
          </p>
        </div>

        {/* Hero Action CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
          <button
            onClick={() => setActiveRoute("command")}
            className="btn btn-primary btn-lg"
            style={{
              padding: "12px 26px",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.35)",
              gap: "10px"
            }}
          >
            <span>ENTER COMMAND CENTER</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => setActiveRoute("report")}
            className="btn btn-secondary btn-lg"
            style={{
              padding: "12px 22px",
              gap: "8px"
            }}
          >
            <FileText size={16} color="var(--color-warning)" />
            <span>REPORT EMERGENCY</span>
          </button>

          <button
            onClick={() => {
              setActiveRoute("command");
              startDemo();
            }}
            className="btn btn-critical btn-lg"
            style={{
              padding: "12px 22px",
              background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)",
              border: "1px solid rgba(239, 68, 68, 0.5)",
              gap: "8px"
            }}
          >
            <Play size={14} fill="white" />
            <span>RUN LIVE DEMO</span>
          </button>
        </div>

        {/* Hero Operational HUD Card with Embedded Tactical Map */}
        <div style={{
          backgroundColor: "var(--bg-surface-1)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)"
        }}>
          {/* HUD Top Bar */}
          <div style={{
            padding: "14px 20px",
            backgroundColor: "var(--bg-surface-0)",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--color-critical)", boxShadow: "0 0 10px var(--color-critical)" }} />
              <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.06em", color: "var(--text-primary)" }}>
                LIVE OPERATIONS • METRO SECTOR HYDERABAD-CYBERABAD
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
              <span><strong style={{ color: "var(--text-primary)" }}>14</strong> ACTIVE INCIDENTS</span>
              <span><strong style={{ color: "var(--color-critical)" }}>3</strong> CRITICAL</span>
              <span><strong style={{ color: "var(--text-primary)" }}>21</strong> RESPONDERS</span>
              <span><strong style={{ color: "var(--color-success)" }}>8</strong> AMBULANCES</span>
              <span><strong style={{ color: "#38bdf8" }}>5</strong> HOSPITALS</span>
            </div>
          </div>

          {/* Map Preview Canvas */}
          <div style={{ height: "460px", width: "100%", position: "relative" }}>
            <TacticalMap />
          </div>
        </div>
      </section>

      {/* The Operational Challenge vs ResQAI Connects Them */}
      <section style={{
        padding: "60px 40px",
        backgroundColor: "var(--bg-surface-0)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 40px auto" }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-critical)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
              THE OPERATIONAL CHALLENGE
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", marginBottom: "12px" }}>
              Emergency Information is Dangerously Fragmented
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              When minutes define survival, critical operational data is isolated across disconnected silos:
              Citizens, Dispatchers, Responders, Hospitals, and Resource fleet systems.
            </p>
          </div>

          {/* 5 Fragmented Silos */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "50px" }}>
            {[
              { label: "Citizens", desc: "Fragmented mobile reports & panicked descriptions" },
              { label: "Dispatchers", desc: "Cognitive overload under simultaneous 911 calls" },
              { label: "Responders", desc: "Limited situational awareness prior to arrival" },
              { label: "Hospitals", desc: "Blind incoming trauma spikes without pre-alert" },
              { label: "Resource Fleets", desc: "Unseen coverage gaps in neighboring sectors" }
            ].map((silo, idx) => (
              <div key={idx} style={{
                backgroundColor: "var(--bg-surface-1)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "16px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}>
                  {silo.label}
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  {silo.desc}
                </div>
              </div>
            ))}
          </div>

          {/* ResQAI Connects Them Banner */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-info)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              RESQAI CONNECTS THEM
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#ffffff", marginTop: "4px" }}>
              One Cohesive Operational Workflow
            </h3>
          </div>

          {/* Workflow Sequence */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
            backgroundColor: "var(--bg-surface-1)",
            padding: "20px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-medium)"
          }}>
            {[
              { step: "01", name: "REPORT", sub: "Citizen & Sensor Ingestion" },
              { step: "02", name: "UNDERSTAND", sub: "AI Classification & Fusion" },
              { step: "03", name: "SIMULATE", sub: "Response Scenarios & Ripple" },
              { step: "04", name: "COORDINATE", sub: "Responder Dispatch & Hospital" },
              { step: "05", name: "RESOLVE", sub: "Telemetry & Incident Tracking" }
            ].map((wf, idx) => (
              <div key={idx} style={{
                padding: "14px",
                backgroundColor: "var(--bg-surface-0)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xs)"
              }}>
                <div className="font-mono" style={{ fontSize: "11px", color: "var(--color-info)", fontWeight: "700", marginBottom: "4px" }}>
                  STEP {wf.step}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>
                  {wf.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {wf.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Differentiation Feature Grid */}
      <section style={{ padding: "60px 40px", maxWidth: "1320px", margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: "36px" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-ai)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            MISSION-GRADE CAPABILITIES
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#ffffff", marginTop: "4px" }}>
            Enterprise Decision Support Architecture
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {/* Card 1: AI Incident Intelligence */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Cpu size={18} color="var(--color-ai)" />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                AI Incident Intelligence
              </h3>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
              Extracts incident type, severity, affected count, risk indicators (entrapment, chemical hazard), required equipment, and strategic response profiles from chaotic reports.
            </p>
            <div style={{
              backgroundColor: "var(--bg-surface-0)",
              padding: "12px 14px",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px"
            }}>
              <div style={{ color: "var(--color-critical)", fontWeight: "700" }}>INCIDENT: Road Accident • CRITICAL</div>
              <div style={{ color: "var(--text-secondary)", marginTop: "2px" }}>RESOURCE REQ: 2 × Ambulance (ALS) • 1 × Heavy Rescue • 1 × Police</div>
            </div>
          </div>

          {/* Card 2: Multi-Report Fusion */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <GitMerge size={18} color="var(--color-info)" />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                Multi-Report Fusion Engine
              </h3>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
              Prevents duplicate dispatch fatigue by calculating spatio-temporal (96%), time (92%), and semantic (89%) proximity, consolidating fragmented calls into a single unified incident.
            </p>
            <div style={{
              backgroundColor: "var(--bg-surface-0)",
              padding: "12px 14px",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px"
            }}>
              <div style={{ color: "var(--color-ai)", fontWeight: "700" }}>FUSED: 3 Citizen Calls → Incident #RQ-2048</div>
              <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>CORRELATION CONFIDENCE: 94.2% composite match</div>
            </div>
          </div>

          {/* Card 3: Response Simulation */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <SlidersHorizontal size={18} color="var(--color-warning)" />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                Response Simulation
              </h3>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
              Compares candidate response packages (Scenario A, B, C) evaluating arrival times, unit mix, hospital intake loads, and human operator confirmation safeguards.
            </p>
            <div style={{
              backgroundColor: "var(--bg-surface-0)",
              padding: "12px 14px",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px"
            }}>
              <div style={{ color: "var(--color-success)", fontWeight: "700" }}>SCENARIO A: 7 min ETA • 82% Reserve Coverage</div>
              <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>Labeled prototype simulation estimate for decision support</div>
            </div>
          </div>

          {/* Card 4: Resource Ripple Effect */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Layers size={18} color="var(--color-success)" />
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                Resource Ripple Effect Analysis
              </h3>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "16px" }}>
              Before assigning an ambulance or rescue squad, models how neighboring sector coverage drops (e.g. Zone A: 94% → 81%), guarding against regional vulnerability.
            </p>
            <div style={{
              backgroundColor: "var(--bg-surface-0)",
              padding: "12px 14px",
              borderRadius: "var(--radius-xs)",
              border: "1px solid var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px"
            }}>
              <div style={{ color: "var(--color-info)", fontWeight: "700" }}>ZONE A COVERAGE: 94% → 81% (SAFE THRESHOLD: 80%)</div>
              <div style={{ color: "var(--text-muted)", marginTop: "2px" }}>Autonomous threshold breach warnings before commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Azure Architecture Preview */}
      <section style={{
        padding: "50px 40px",
        backgroundColor: "var(--bg-surface-0)",
        borderTop: "1px solid var(--border-subtle)"
      }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--color-info)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
            MICROSOFT & AZURE CLOUD ARCHITECTURE
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "16px" }}>
            Engineered for Azure OpenAI, Azure Maps & Cosmos DB
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto 30px auto", lineHeight: "1.5" }}>
            ResQAI implements clean service abstractions ready to bind Azure OpenAI GPT-4o for telemetry NLP, Azure Maps for geospatial routing, and Azure Cosmos DB for real-time state synchronization.
          </p>
          <button
            onClick={() => setActiveRoute("architecture")}
            className="btn btn-secondary btn-sm"
            style={{ padding: "8px 18px" }}
          >
            <Cloud size={14} color="#0284c7" />
            <span>Inspect Technical Cloud Architecture</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "24px 40px",
        backgroundColor: "var(--bg-app)",
        borderTop: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "11px",
        color: "var(--text-muted)"
      }}>
        <div>
          RESQAI • INTELLIGENCE FOR EMERGENCY RESPONSE • PROTOTYPE DECISION-SUPPORT PLATFORM
        </div>
        <div style={{ fontFamily: "var(--font-mono)" }}>
          OPERATIONS STATUS: ACTIVE • UTC+05:30
        </div>
      </footer>
    </div>
  );
}
