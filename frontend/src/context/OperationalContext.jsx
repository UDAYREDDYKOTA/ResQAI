import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  INITIAL_INCIDENTS,
  INITIAL_RESOURCES,
  INITIAL_HOSPITALS,
  INITIAL_ZONES,
  RESPONSE_SCENARIOS_RQ2048,
  DEMO_STORYLINE_STEPS
} from "../data/mockData";
import { AudioAlerts } from "../utils/audioAlerts";

const OperationalContext = createContext(null);

export function OperationalProvider({ children }) {
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [hospitals, setHospitals] = useState(INITIAL_HOSPITALS);
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [selectedIncidentId, setSelectedIncidentId] = useState("RQ-2048");
  const [activeRoute, setActiveRoute] = useState("command"); // landing | command | incidents | incident-detail | resources | hospitals | simulation | analytics | responders | report | demo
  const [selectedScenarioId, setSelectedScenarioId] = useState("SCENARIO-A");
  const [soundMuted, setSoundMuted] = useState(false);

  // Operational Notification Feed
  const [notifications, setNotifications] = useState([
    {
      id: "N-01",
      timestamp: "20:42:01",
      type: "CRITICAL",
      title: "New Critical Incident Detected",
      message: "Incident #RQ-2048: Road Accident at Banjara Hills Rd 12. Multiple casualties reported."
    },
    {
      id: "N-02",
      timestamp: "20:42:03",
      type: "AI",
      title: "Multi-Report Fusion Executed",
      message: "3 citizen reports consolidated into incident #RQ-2048 (94% confidence match)."
    },
    {
      id: "N-03",
      timestamp: "20:42:05",
      type: "RESOURCE",
      title: "Resource Assessment Ready",
      message: "Multi-agency requirement computed: 2 ALS Ambulances, 1 Heavy Rescue, 1 Police."
    }
  ]);

  // Demo Storyline Engine
  const [demoState, setDemoState] = useState({
    isPlaying: false,
    currentStep: 1,
    speedMultiplier: 1,
    lastAction: null
  });

  const demoTimerRef = useRef(null);

  // Live Digital Clock
  const [liveClock, setLiveClock] = useState("20:42:18");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveClock(now.toTimeString().split(" ")[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const addNotification = (notif) => {
    const item = {
      id: `N-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toTimeString().split(" ")[0],
      ...notif
    };
    setNotifications((prev) => [item, ...prev.slice(0, 19)]);
  };

  const selectIncident = (id) => {
    setSelectedIncidentId(id);
    AudioAlerts.playRadarPing();
  };

  // Dispatch Scenario Trigger
  const dispatchScenario = (incidentId, scenarioId = "SCENARIO-A") => {
    const scenario = RESPONSE_SCENARIOS_RQ2048.find((s) => s.id === scenarioId) || RESPONSE_SCENARIOS_RQ2048[0];
    const assignedIds = scenario.resources.map((r) => r.id);

    // Update Incident
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          const updatedTimeline = [
            ...inc.timeline,
            {
              time: new Date().toTimeString().split(" ")[0],
              title: `Scenario Dispatched (${scenario.name.split(":")[0]})`,
              desc: `Allocated ${assignedIds.join(", ")} to ${inc.id}. Ripple effect verified.`,
              status: "info"
            }
          ];
          return {
            ...inc,
            status: "RESPONDING",
            assignedResources: assignedIds,
            timeline: updatedTimeline
          };
        }
        return inc;
      })
    );

    // Update Resources
    setResources((prev) =>
      prev.map((res) => {
        if (assignedIds.includes(res.id)) {
          return {
            ...res,
            status: "DISPATCHED",
            currentAssignment: incidentId,
            telemetrySpeedKmh: 46
          };
        }
        return res;
      })
    );

    // Update Zone Ripple Effect
    if (scenario.zoneRipple) {
      setZones((prev) =>
        prev.map((zone) => {
          const match = scenario.zoneRipple.find((z) => z.zoneId === zone.id);
          if (match) {
            return {
              ...zone,
              coverage: match.after
            };
          }
          return zone;
        })
      );
    }

    AudioAlerts.playDispatchBeep();
    addNotification({
      type: "RESOURCE",
      title: "Resources Dispatched",
      message: `Dispatched ${assignedIds.join(", ")} to Incident #${incidentId}. Zone A coverage: 81%.`
    });
  };

  // Notify Hospital
  const notifyHospital = (hospitalId, incidentId = "RQ-2048") => {
    setHospitals((prev) =>
      prev.map((hosp) => {
        if (hosp.id === hospitalId) {
          return {
            ...hosp,
            incomingPatients: hosp.incomingPatients + 3
          };
        }
        return hosp;
      })
    );

    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            timeline: [
              ...inc.timeline,
              {
                time: new Date().toTimeString().split(" ")[0],
                title: "Hospital Pre-Alert Confirmed",
                desc: `City Care Hospital trauma ward notified. ETA 7 min. 3 patients expected.`,
                status: "success"
              }
            ]
          };
        }
        return inc;
      })
    );

    AudioAlerts.playRadarPing();
    addNotification({
      type: "HOSPITAL",
      title: "Hospital Pre-Alert Sent",
      message: `City Care Hospital received emergency pre-intake transmission for Incident #${incidentId}.`
    });
  };

  // Update Responder Status
  const updateResourceStatus = (resourceId, newStatus) => {
    setResources((prev) =>
      prev.map((res) => {
        if (res.id === resourceId) {
          return { ...res, status: newStatus };
        }
        return res;
      })
    );

    addNotification({
      type: "RESOURCE",
      title: `Unit Status Update`,
      message: `${resourceId} status transitioned to ${newStatus}.`
    });
  };

  // Execute a specific Demo Step
  const executeDemoStep = (stepNumber) => {
    const step = DEMO_STORYLINE_STEPS.find((s) => s.stepIndex === stepNumber);
    if (!step) return;

    setDemoState((prev) => ({ ...prev, currentStep: stepNumber, lastAction: step.highlightAction }));

    switch (step.highlightAction) {
      case "RECEIVE_REPORT":
        addNotification({
          type: "INFO",
          title: "Citizen Report Ingested",
          message: step.summary
        });
        AudioAlerts.playRadarPing();
        break;
      case "AI_CLASSIFY":
        addNotification({
          type: "AI",
          title: "AI Analysis Complete",
          message: "Road Accident classified with 94% neural confidence score."
        });
        break;
      case "FUSION":
        addNotification({
          type: "AI",
          title: "Multi-Report Fusion",
          message: "Correlated 3 reports into unified Incident #RQ-2048."
        });
        AudioAlerts.playRadarPing();
        break;
      case "PRIORITY":
        AudioAlerts.playCriticalAlert();
        addNotification({
          type: "CRITICAL",
          title: "Priority Elevated: CRITICAL",
          message: "Severe casualties detected. Emergency response threshold reached."
        });
        break;
      case "RESOURCES_MATCH":
        addNotification({
          type: "RESOURCE",
          title: "Resource Requirement Identified",
          message: "Calculated need: 2 ALS Ambulances, 1 Heavy Rescue, 1 Police Interceptor."
        });
        break;
      case "HOSPITAL_CHECK":
        addNotification({
          type: "HOSPITAL",
          title: "Hospital Capacity Checked",
          message: "City Care Hospital verified (6 free trauma beds, 2 open bays)."
        });
        break;
      case "SIMULATE":
        addNotification({
          type: "AI",
          title: "Simulation Scenarios Ready",
          message: "Generated Scenarios A, B, and C with zone coverage ripple projections."
        });
        break;
      case "SELECT_SCENARIO":
        setSelectedScenarioId("SCENARIO-A");
        addNotification({
          type: "INFO",
          title: "Scenario A Approved",
          message: "Operator selected Scenario A (Balanced Multi-Agency Deployment)."
        });
        break;
      case "DISPATCH":
        dispatchScenario("RQ-2048", "SCENARIO-A");
        break;
      case "HOSPITAL_NOTIFIED":
        notifyHospital("HOSP-01", "RQ-2048");
        break;
      case "ARRIVED":
        updateResourceStatus("RES-R03", "ON_SCENE");
        updateResourceStatus("AMB-A12", "ON_SCENE");
        updateResourceStatus("POL-P08", "ON_SCENE");
        setIncidents((prev) =>
          prev.map((inc) => {
            if (inc.id === "RQ-2048") {
              return {
                ...inc,
                timeline: [
                  ...inc.timeline,
                  {
                    time: "20:42:15",
                    title: "First Units On Scene",
                    desc: "Rescue R03 and Ambulance A12 commenced extrication and vitals stabilization.",
                    status: "info"
                  }
                ]
              };
            }
            return inc;
          })
        );
        break;
      case "RESOLVED":
        setIncidents((prev) =>
          prev.map((inc) => {
            if (inc.id === "RQ-2048") {
              return {
                ...inc,
                status: "RESOLVED",
                timeline: [
                  ...inc.timeline,
                  {
                    time: "20:42:30",
                    title: "Incident Resolved",
                    desc: "Patients safely transferred to City Care Hospital ER. Roadway cleared.",
                    status: "success"
                  }
                ]
              };
            }
            return inc;
          })
        );
        updateResourceStatus("AMB-A12", "AVAILABLE");
        updateResourceStatus("AMB-A07", "AVAILABLE");
        updateResourceStatus("RES-R03", "AVAILABLE");
        updateResourceStatus("POL-P08", "AVAILABLE");
        setZones(INITIAL_ZONES);
        addNotification({
          type: "INFO",
          title: "Incident #RQ-2048 Resolved",
          message: "All units cleared, zone coverage returned to normal operating baseline."
        });
        break;
      default:
        break;
    }
  };

  // Demo playback loop
  useEffect(() => {
    if (demoState.isPlaying) {
      demoTimerRef.current = setTimeout(() => {
        if (demoState.currentStep < DEMO_STORYLINE_STEPS.length) {
          const next = demoState.currentStep + 1;
          executeDemoStep(next);
        } else {
          setDemoState((prev) => ({ ...prev, isPlaying: false }));
        }
      }, 3500 / demoState.speedMultiplier);
    }
    return () => clearTimeout(demoTimerRef.current);
  }, [demoState.isPlaying, demoState.currentStep, demoState.speedMultiplier]);

  const startDemo = () => {
    // Reset to beginning and play
    resetDemo();
    setDemoState({
      isPlaying: true,
      currentStep: 1,
      speedMultiplier: 1,
      lastAction: "RECEIVE_REPORT"
    });
    executeDemoStep(1);
  };

  const pauseDemo = () => {
    setDemoState((prev) => ({ ...prev, isPlaying: false }));
  };

  const resumeDemo = () => {
    setDemoState((prev) => ({ ...prev, isPlaying: true }));
  };

  const nextDemoStep = () => {
    if (demoState.currentStep < DEMO_STORYLINE_STEPS.length) {
      executeDemoStep(demoState.currentStep + 1);
    }
  };

  const prevDemoStep = () => {
    if (demoState.currentStep > 1) {
      executeDemoStep(demoState.currentStep - 1);
    }
  };

  const resetDemo = () => {
    clearTimeout(demoTimerRef.current);
    setIncidents(INITIAL_INCIDENTS);
    setResources(INITIAL_RESOURCES);
    setHospitals(INITIAL_HOSPITALS);
    setZones(INITIAL_ZONES);
    setSelectedIncidentId("RQ-2048");
    setSelectedScenarioId("SCENARIO-A");
    setDemoState({
      isPlaying: false,
      currentStep: 1,
      speedMultiplier: 1,
      lastAction: null
    });
  };

  const toggleSound = () => {
    const isMuted = AudioAlerts.toggleMute();
    setSoundMuted(isMuted);
  };

  // Calculate high-level summary KPIs
  const activeIncidentsCount = incidents.filter((i) => i.status !== "RESOLVED").length;
  const criticalIncidentsCount = incidents.filter((i) => i.priority === "CRITICAL" && i.status !== "RESOLVED").length;
  const availableAmbulancesCount = resources.filter((r) => r.type === "AMBULANCE" && r.status === "AVAILABLE").length;
  const totalRespondersCount = resources.length;

  const currentSelectedIncident = incidents.find((i) => i.id === selectedIncidentId) || incidents[0];

  return (
    <OperationalContext.Provider
      value={{
        incidents,
        resources,
        hospitals,
        zones,
        selectedIncidentId,
        currentSelectedIncident,
        selectedScenarioId,
        setSelectedScenarioId,
        selectIncident,
        activeRoute,
        setActiveRoute,
        notifications,
        addNotification,
        dispatchScenario,
        notifyHospital,
        updateResourceStatus,
        liveClock,
        soundMuted,
        toggleSound,
        activeIncidentsCount,
        criticalIncidentsCount,
        availableAmbulancesCount,
        totalRespondersCount,
        demoState,
        setDemoState,
        startDemo,
        pauseDemo,
        resumeDemo,
        nextDemoStep,
        prevDemoStep,
        resetDemo,
        executeDemoStep
      }}
    >
      {children}
    </OperationalContext.Provider>
  );
}

export const useOperational = () => useContext(OperationalContext);
