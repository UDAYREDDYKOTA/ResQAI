import React, { useState } from "react";
import { useOperational } from "../../context/OperationalContext";
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Activity, 
  HeartPulse, 
  Ambulance, 
  BedDouble,
  ShieldCheck
} from "lucide-react";

export default function HospitalsPage() {
  const { hospitals, notifyHospital, currentSelectedIncident } = useOperational();
  const [notifyingHospitalId, setNotifyingHospitalId] = useState(null);
  const [notificationSuccess, setNotificationSuccess] = useState(false);

  const handleNotify = (hospId) => {
    setNotifyingHospitalId(hospId);
    notifyHospital(hospId, currentSelectedIncident?.id || "RQ-2048");
    setTimeout(() => {
      setNotifyingHospitalId(null);
      setNotificationSuccess(true);
      setTimeout(() => setNotificationSuccess(false), 4000);
    }, 600);
  };

  return (
    <div style={{ padding: "24px 30px", flex: 1, overflowY: "auto", backgroundColor: "var(--bg-app)" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "700", color: "var(--text-primary)" }}>
            HOSPITAL COORDINATION & ER CAPACITY
          </h1>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Real-time trauma intake readiness, ambulance bay allocation, and hospital pre-alerts
          </div>
        </div>

        {notificationSuccess && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid var(--color-success)",
            borderRadius: "var(--radius-xs)",
            padding: "6px 12px",
            fontSize: "11.5px",
            color: "var(--color-success)"
          }}>
            <CheckCircle2 size={14} />
            <span>Hospital Intake Pre-Alert Successfully Transmitted</span>
          </div>
        )}
      </div>

      {/* Active Incident Intake Notification Bar */}
      <div style={{
        backgroundColor: "var(--bg-surface-1)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        borderRadius: "var(--radius-sm)",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-xs)",
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Building2 size={20} color="var(--color-info)" />
          </div>
          <div>
            <div style={{ fontSize: "11px", color: "var(--color-info)", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              DISPATCH PRE-ALERT PIPELINE • INCIDENT #{currentSelectedIncident?.id || "RQ-2048"}
            </div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)", marginTop: "2px" }}>
              Target Intake Facility: <strong>City Care Hospital (Level 2 Trauma Center)</strong>
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
              Estimated Patients: 3 • Severity: Critical • Transit ETA: 7 min
            </div>
          </div>
        </div>

        <button
          onClick={() => handleNotify("HOSP-01")}
          disabled={notifyingHospitalId !== null}
          className="btn btn-primary"
          style={{ padding: "9px 20px", fontWeight: "600" }}
        >
          <Send size={14} />
          <span>{notifyingHospitalId ? "TRANSMITTING..." : "NOTIFY HOSPITAL INTAKE"}</span>
        </button>
      </div>

      {/* Hospital Capacity Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {hospitals.map((hosp) => {
          const erPercent = Math.round((hosp.erCapacity / hosp.erTotal) * 100);
          const icuPercent = Math.round((hosp.icuCapacity / hosp.icuTotal) * 100);
          const isDiverting = hosp.status === "DIVERTING_ICU";

          return (
            <div
              key={hosp.id}
              style={{
                backgroundColor: "var(--bg-surface-1)",
                border: isDiverting ? "1px solid rgba(239, 68, 68, 0.4)" : "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "14px"
              }}
            >
              {/* Card Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                    {hosp.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {hosp.address} ({hosp.zone})
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span className={`badge ${
                    isDiverting ? "badge-critical" : "badge-success"
                  }`}>
                    {hosp.status.replace("_", " ")}
                  </span>
                  <div className="font-mono" style={{ fontSize: "10.5px", color: "var(--color-info)", marginTop: "3px" }}>
                    ETA: {hosp.etaMinutes} min
                  </div>
                </div>
              </div>

              {/* Metrics Progress Meters */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {/* ER Capacity */}
                <div style={{ backgroundColor: "var(--bg-surface-2)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <span>ER TRAUMA BEDS</span>
                    <span className="font-mono" style={{ fontWeight: "700", color: "var(--text-primary)" }}>
                      {hosp.erCapacity} / {hosp.erTotal} Free
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-surface-0)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{
                      width: `${erPercent}%`,
                      height: "100%",
                      backgroundColor: erPercent < 30 ? "var(--color-critical)" : "var(--color-success)"
                    }} />
                  </div>
                </div>

                {/* ICU Capacity */}
                <div style={{ backgroundColor: "var(--bg-surface-2)", padding: "10px 12px", borderRadius: "var(--radius-xs)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", color: "var(--text-muted)", marginBottom: "4px" }}>
                    <span>ICU SURGICAL BEDS</span>
                    <span className="font-mono" style={{ fontWeight: "700", color: "var(--text-primary)" }}>
                      {hosp.icuCapacity} / {hosp.icuTotal} Free
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-surface-0)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{
                      width: `${icuPercent}%`,
                      height: "100%",
                      backgroundColor: icuPercent < 30 ? "var(--color-critical)" : "var(--color-info)"
                    }} />
                  </div>
                </div>
              </div>

              {/* Secondary Details & Actions */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "10px",
                fontSize: "11px"
              }}>
                <div style={{ display: "flex", gap: "14px", color: "var(--text-secondary)" }}>
                  <span>Trauma: <strong style={{ color: "var(--text-primary)" }}>{hosp.traumaCapability}</strong></span>
                  <span>Ambulance Bays: <strong style={{ color: "var(--text-primary)" }}>{hosp.ambulanceBays} / {hosp.baysTotal}</strong></span>
                  <span>Incoming Patients: <strong style={{ color: "var(--color-warning)" }}>{hosp.incomingPatients || 0}</strong></span>
                </div>

                <button
                  onClick={() => handleNotify(hosp.id)}
                  className="btn btn-secondary btn-xs"
                  style={{ fontSize: "10.5px" }}
                >
                  <Send size={11} />
                  <span>Notify Pre-Alert</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
