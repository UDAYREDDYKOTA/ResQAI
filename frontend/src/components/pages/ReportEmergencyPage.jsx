import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  AlertTriangle, 
  MapPin, 
  FileText, 
  Send, 
  CheckCircle2, 
  Cpu, 
  Clock, 
  Camera, 
  ArrowRight,
  Shield,
  Flame,
  Ambulance,
  Car
} from "lucide-react";
import { AIService } from "../../services/aiService";

export default function ReportEmergencyPage() {
  const { addNotification, selectIncident, setActiveRoute } = useOperational();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "ROAD_ACCIDENT",
    location: "Banjara Hills Rd 12 near City Center",
    description: "Two cars collided with high impact. Driver is trapped inside cabin, bleeding visibly. Urgent ambulance needed.",
    affectedPeople: 3,
    callerName: "Sanjay K.",
    callerPhone: "+91 98490-12345"
  });

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [submissionResult, setSubmissionResult] = useState(null);

  const analysisStages = [
    "INGESTING REPORT",
    "EXTRACTING INCIDENT DETAILS",
    "ESTIMATING SEVERITY",
    "IDENTIFYING RISK INDICATORS",
    "MATCHING RESOURCES",
    "CHECKING DUPLICATE REPORTS",
    "CHECKING HOSPITAL CAPACITY",
    "GENERATING RESPONSE OPTIONS"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnalyzing(true);
    setAnalysisStep(0);

    // Simulate animated structured AI ingestion sequence
    for (let i = 0; i < analysisStages.length; i++) {
      setAnalysisStep(i);
      await new Promise((res) => setTimeout(res, 400));
    }

    const aiResult = await AIService.analyzeIncident(formData);
    const newRefId = `RQ-2048-A`;

    setSubmissionResult({
      referenceId: newRefId,
      incidentId: "RQ-2048",
      aiResult,
      timestamp: new Date().toLocaleTimeString()
    });

    setAnalyzing(false);

    addNotification({
      type: "INFO",
      title: "New Citizen Report Received",
      message: `Report #${newRefId} ingested via citizen portal. Correlated with Incident #RQ-2048.`
    });
  };

  return (
    <div style={{
      padding: "30px 20px",
      flex: 1,
      overflowY: "auto",
      backgroundColor: "var(--bg-app)",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "680px",
        backgroundColor: "var(--bg-surface-0)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        padding: "30px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
      }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span className="badge badge-info">CITIZEN EMERGENCY REPORT</span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>DIRECT INTAKE PORTAL</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)" }}>
            REPORT AN EMERGENCY
          </h1>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
            Real-time emergency intake connected to ResQAI AI dispatch decision engine.
          </p>
        </div>

        {/* AI Analysis Experience Loader */}
        {analyzing ? (
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid rgba(129, 140, 248, 0.4)",
            borderRadius: "var(--radius-sm)",
            padding: "24px",
            textAlign: "center"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
              <Cpu size={20} color="var(--color-ai)" />
              <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--color-ai)", letterSpacing: "0.06em" }}>
                RESQAI NEURAL PIPELINE PROCESSING...
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "420px", margin: "0 auto", textAlign: "left" }}>
              {analysisStages.map((stage, idx) => {
                const isCompleted = idx < analysisStep;
                const isCurrent = idx === analysisStep;
                return (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-xs)",
                    backgroundColor: isCurrent ? "rgba(129, 140, 248, 0.12)" : "var(--bg-surface-2)",
                    border: isCurrent ? "1px solid rgba(129, 140, 248, 0.4)" : "1px solid transparent",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)"
                  }}>
                    <span style={{ color: isCompleted ? "var(--color-success)" : isCurrent ? "var(--color-ai)" : "var(--text-muted)" }}>
                      {stage}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 size={13} color="var(--color-success)" />
                    ) : isCurrent ? (
                      <span className="badge badge-ai" style={{ fontSize: "9px" }}>PROCESSING</span>
                    ) : (
                      <span style={{ color: "var(--text-dim)", fontSize: "10px" }}>PENDING</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : submissionResult ? (
          /* Submission Result Card */
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-sm)",
            padding: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <CheckCircle2 size={24} color="var(--color-success)" />
              <div>
                <div style={{ fontSize: "12px", color: "var(--color-success)", fontWeight: "700" }}>
                  REPORT RECEIVED & ANALYZED
                </div>
                <div className="font-mono" style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                  Reference: #{submissionResult.referenceId}
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: "var(--bg-surface-2)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xs)",
              padding: "16px",
              marginBottom: "20px"
            }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
                AI Incident Intelligence Summary
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "12px", marginBottom: "10px" }}>
                <div>Type: <strong style={{ color: "var(--text-primary)" }}>{submissionResult.aiResult.incidentType}</strong></div>
                <div>Severity: <strong style={{ color: "var(--color-critical)" }}>{submissionResult.aiResult.priority}</strong></div>
                <div>Casualties: <strong style={{ color: "var(--text-primary)" }}>{submissionResult.aiResult.affectedPeople} Persons</strong></div>
                <div>Confidence: <strong style={{ color: "var(--color-info)" }}>{Math.round(submissionResult.aiResult.confidence * 100)}%</strong></div>
              </div>

              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Correlated with unified emergency incident: <strong style={{ color: "var(--text-primary)" }}>#{submissionResult.incidentId}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  selectIncident(submissionResult.incidentId);
                  setActiveRoute("command");
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: "10px 18px", fontWeight: "600" }}
              >
                <span>OPEN IN COMMAND CENTER</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => setSubmissionResult(null)}
                className="btn btn-secondary"
                style={{ padding: "10px 18px" }}
              >
                <span>Submit Another</span>
              </button>
            </div>
          </div>
        ) : (
          /* Reporting Form */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Step 1: Incident Category */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Step 1: What Happened?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {[
                  { id: "ROAD_ACCIDENT", label: "Road Accident", icon: Car },
                  { id: "MEDICAL", label: "Medical Crisis", icon: Ambulance },
                  { id: "FIRE", label: "Fire / Smoke", icon: Flame },
                  { id: "CRIME", label: "Crime / Hazard", icon: Shield },
                  { id: "RESCUE", label: "Rescue Distress", icon: AlertTriangle },
                  { id: "OTHER", label: "Other Hazard", icon: FileText }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.type === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: item.id })}
                      style={{
                        padding: "10px",
                        backgroundColor: isSelected ? "rgba(56, 189, 248, 0.12)" : "var(--bg-surface-1)",
                        border: isSelected ? "1px solid var(--color-info)" : "1px solid var(--border-subtle)",
                        borderRadius: "var(--radius-xs)",
                        color: isSelected ? "var(--color-info)" : "var(--text-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11.5px",
                        fontWeight: "600"
                      }}
                    >
                      <Icon size={18} color={isSelected ? "var(--color-info)" : "var(--text-muted)"} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Location */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Step 2: Where is the Incident?
              </label>
              <div style={{ position: "relative" }}>
                <MapPin size={15} color="var(--color-critical)" style={{ position: "absolute", left: "10px", top: "10px" }} />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter landmark, street or GPS coordinates..."
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 34px",
                    backgroundColor: "var(--bg-surface-1)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "12.5px",
                    color: "var(--text-primary)",
                    outline: "none"
                  }}
                  required
                />
              </div>
            </div>

            {/* Step 3: Incident Details */}
            <div>
              <label style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                Step 3: What Do You See?
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe injuries, entrapment, smoke, number of vehicles..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  backgroundColor: "var(--bg-surface-1)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "12px",
                  color: "var(--text-primary)",
                  outline: "none",
                  resize: "vertical"
                }}
                required
              />
            </div>

            {/* Casualties count & Contact */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={{ fontSize: "10.5px", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Estimated People Injured / Affected:
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.affectedPeople}
                  onChange={(e) => setFormData({ ...formData, affectedPeople: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    backgroundColor: "var(--bg-surface-1)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "12px",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: "10.5px", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                  Your Phone (Optional):
                </label>
                <input
                  type="text"
                  value={formData.callerPhone}
                  onChange={(e) => setFormData({ ...formData, callerPhone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "7px 10px",
                    backgroundColor: "var(--bg-surface-1)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xs)",
                    fontSize: "12px",
                    color: "var(--text-primary)"
                  }}
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn btn-critical btn-lg"
              style={{ padding: "12px", width: "100%", fontWeight: "700" }}
            >
              <Send size={15} />
              <span>SUBMIT EMERGENCY REPORT</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
