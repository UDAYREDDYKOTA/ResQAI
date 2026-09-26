import React, { useState } from "react";
import { 
  GitMerge, 
  X, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Cpu, 
  ArrowDown, 
  Layers, 
  ChevronRight,
  User,
  Radio,
  FileText
} from "lucide-react";
import { CORRELATED_REPORTS_RQ2048 } from "../../data/mockData";

export default function MultiReportFusionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedReportId, setSelectedReportId] = useState("RQ-2048-A");
  const reports = CORRELATED_REPORTS_RQ2048;
  const currentReport = reports.find((r) => r.id === selectedReportId) || reports[0];

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(3, 6, 10, 0.85)",
      backdropFilter: "blur(6px)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "920px",
        maxHeight: "90vh",
        backgroundColor: "var(--bg-surface-0)",
        border: "1px solid var(--border-medium)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.75)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Modal Header */}
        <div style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface-1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "var(--radius-xs)",
              backgroundColor: "rgba(129, 140, 248, 0.15)",
              border: "1px solid rgba(129, 140, 248, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <GitMerge size={16} color="var(--color-ai)" />
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--text-primary)" }}>
                MULTI-REPORT FUSION ENGINE
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                Autonomous Spatio-Temporal and Semantic Incident Consolidation
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-xs"
            style={{ width: "28px", height: "28px", padding: 0 }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Fusion Visual Diagram */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "18px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px"
            }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
                FUSION CORRELATION PIPELINE
              </span>
              <span className="badge badge-ai" style={{ fontSize: "9.5px" }}>
                3 INCOMING STREAMS → 1 OPERATIONAL INCIDENT
              </span>
            </div>

            {/* 3 Citizen Reports Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              {reports.map((rep) => {
                const isSelected = rep.id === selectedReportId;
                return (
                  <div
                    key={rep.id}
                    onClick={() => setSelectedReportId(rep.id)}
                    style={{
                      backgroundColor: isSelected ? "rgba(129, 140, 248, 0.08)" : "var(--bg-surface-2)",
                      border: isSelected ? "1px solid rgba(129, 140, 248, 0.5)" : "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-xs)",
                      padding: "10px 12px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span className="font-mono" style={{ fontSize: "11px", fontWeight: "700", color: isSelected ? "var(--color-ai)" : "var(--text-primary)" }}>
                        #{rep.id}
                      </span>
                      <span className="font-mono" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
                        {rep.timestamp}
                      </span>
                    </div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "6px" }}>
                      {rep.source}
                    </div>
                    <div style={{
                      fontSize: "11px",
                      color: "var(--text-secondary)",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.35"
                    }}>
                      "{rep.text}"
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Correlation Convergence Bar */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "10px 0"
            }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "20px",
                background: "var(--bg-surface-0)",
                border: "1px solid var(--border-medium)",
                padding: "8px 24px",
                borderRadius: "var(--radius-sm)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={12} color="var(--color-info)" />
                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>LOCATION MATCH:</span>
                  <span className="font-mono" style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-info)" }}>96%</span>
                </div>

                <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-subtle)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={12} color="var(--color-ai)" />
                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>TIME MATCH:</span>
                  <span className="font-mono" style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-ai)" }}>92%</span>
                </div>

                <div style={{ width: "1px", height: "16px", backgroundColor: "var(--border-subtle)" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Cpu size={12} color="var(--color-success)" />
                  <span style={{ fontSize: "10.5px", color: "var(--text-muted)" }}>SEMANTIC MATCH:</span>
                  <span className="font-mono" style={{ fontSize: "12px", fontWeight: "700", color: "var(--color-success)" }}>89%</span>
                </div>
              </div>

              <ArrowDown size={18} color="var(--color-ai)" style={{ marginTop: "8px" }} />
            </div>

            {/* Consolidated Incident Result */}
            <div style={{
              backgroundColor: "rgba(239, 68, 68, 0.06)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "var(--radius-xs)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "var(--color-critical)", letterSpacing: "0.08em" }}>
                    CONSOLIDATED OPERATIONAL INCIDENT
                  </span>
                  <span className="badge badge-critical" style={{ fontSize: "9px" }}>
                    CRITICAL
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span className="font-mono" style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)" }}>
                    #RQ-2048
                  </span>
                  <span style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-secondary)" }}>
                    Road Accident • Banjara Hills Rd 12
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Composite Confidence
                </div>
                <div className="font-mono" style={{ fontSize: "16px", fontWeight: "700", color: "var(--color-info)" }}>
                  94.2%
                </div>
              </div>
            </div>
          </div>

          {/* Inspected Individual Report Deep Dive */}
          <div style={{
            backgroundColor: "var(--bg-surface-1)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "16px"
          }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
              INSPECTING SOURCE REPORT #{currentReport.id}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              fontSize: "12px",
              marginBottom: "12px"
            }}>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Caller / Source: </span>
                <strong style={{ color: "var(--text-primary)" }}>{currentReport.callerName} ({currentReport.source})</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Contact / Channel: </span>
                <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{currentReport.phone}</span>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Reported Location: </span>
                <strong style={{ color: "var(--text-primary)" }}>{currentReport.reportedLocation}</strong>
              </div>
              <div>
                <span style={{ color: "var(--text-muted)" }}>Coordinates: </span>
                <span className="font-mono" style={{ color: "var(--text-secondary)" }}>{currentReport.coordinates.lat}, {currentReport.coordinates.lng}</span>
              </div>
            </div>

            <div style={{
              backgroundColor: "var(--bg-surface-2)",
              padding: "10px 14px",
              borderRadius: "var(--radius-xs)",
              borderLeft: "3px solid var(--color-ai)",
              fontStyle: "italic",
              color: "var(--text-primary)",
              fontSize: "12.5px"
            }}>
              "{currentReport.text}"
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-surface-1)",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px"
        }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
