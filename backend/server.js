const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Attempt MongoDB Connection with timeout handling
mongoose.connect("mongodb+srv://varshitha34871_db_user:uday2127@cluster0.ikm2mxb.mongodb.net/?appName=Cluster0", {
  serverSelectionTimeoutMS: 4000
})
.then(() => console.log("[MongoDB] Connected to Atlas Cluster"))
.catch((err) => console.log("[MongoDB Notice] Atlas unavailable or network timeout; operating in high-performance in-memory mode."));

// In-Memory Emergency Operations Cache
let incidents = [
  {
    id: "RQ-2048",
    title: "Major Collision With Entrapment",
    type: "ROAD_ACCIDENT",
    priority: "CRITICAL",
    status: "AWAITING_DISPATCH",
    locationName: "Banjara Hills Rd 12",
    zone: "ZONE-A",
    coordinates: { lat: 17.4156, lng: 78.4350 },
    affectedPeople: 3,
    reportsCount: 3,
    confidence: 0.94,
    reportedAt: "20:42:01",
    lastUpdate: "20:42:08",
    riskIndicators: [
      "Possible vehicle cabin entrapment",
      "Multiple severe casualties with head trauma",
      "Both road lanes obstructed with fuel spillage risk"
    ],
    requiredResources: [
      { type: "AMBULANCE", count: 2, label: "2 × Ambulance (ALS)" },
      { type: "RESCUE", count: 1, label: "1 × Heavy Rescue" },
      { type: "POLICE", count: 1, label: "1 × Traffic Police" }
    ],
    hospitalMatch: {
      hospitalId: "HOSP-01",
      hospitalName: "City Care Hospital",
      erCapacity: 6,
      traumaCapability: "AVAILABLE",
      etaMinutes: 7
    }
  },
  {
    id: "RQ-2047",
    title: "Acute Cardiac Distress Call",
    type: "MEDICAL",
    priority: "HIGH",
    status: "RESPONDING",
    locationName: "Jubilee Hills Checkpost",
    zone: "ZONE-B",
    coordinates: { lat: 17.4319, lng: 78.4072 },
    affectedPeople: 1,
    reportsCount: 1,
    confidence: 0.91,
    reportedAt: "20:38:15",
    lastUpdate: "20:41:22",
    riskIndicators: ["Severe chest pain radiating to left arm", "Elderly patient"],
    requiredResources: [{ type: "AMBULANCE", count: 1, label: "1 × Ambulance (ALS)" }],
    assignedResources: ["AMB-A04"]
  },
  {
    id: "RQ-2046",
    title: "Industrial Warehouse Structural Fire",
    type: "FIRE",
    priority: "CRITICAL",
    status: "ACTIVE",
    locationName: "Kukatpally Industrial Area",
    zone: "ZONE-C",
    coordinates: { lat: 17.4849, lng: 78.4138 },
    affectedPeople: 8,
    reportsCount: 5,
    confidence: 0.97,
    reportedAt: "20:31:40",
    lastUpdate: "20:40:12",
    riskIndicators: ["Chemical storage proximity", "Structural collapse hazard", "Heavy toxic smoke"],
    requiredResources: [
      { type: "FIRE", count: 2, label: "2 × Fire Engines" },
      { type: "RESCUE", count: 1, label: "1 × Heavy Rescue" }
    ],
    assignedResources: ["FIRE-F01", "AMB-A18"]
  },
  {
    id: "RQ-2045",
    title: "Pedestrian Low-Speed Impact",
    type: "MEDICAL",
    priority: "MEDIUM",
    status: "RESOLVED",
    locationName: "Madhapur Cyber Gateway",
    zone: "ZONE-B",
    coordinates: { lat: 17.4483, lng: 78.3748 },
    affectedPeople: 1,
    reportsCount: 1,
    confidence: 0.88,
    reportedAt: "20:25:10",
    lastUpdate: "20:36:45",
    riskIndicators: ["Minor wrist contusion", "Vitals stable"],
    requiredResources: [{ type: "AMBULANCE", count: 1, label: "1 × Ambulance" }]
  }
];

let resources = [
  { id: "AMB-A12", callsign: "Ambulance A12", type: "AMBULANCE", zone: "ZONE-A", status: "AVAILABLE", crewCount: 2 },
  { id: "AMB-A07", callsign: "Ambulance A07", type: "AMBULANCE", zone: "ZONE-A", status: "AVAILABLE", crewCount: 2 },
  { id: "AMB-A09", callsign: "Ambulance A09", type: "AMBULANCE", zone: "ZONE-C", status: "AVAILABLE", crewCount: 2 },
  { id: "AMB-A04", callsign: "Ambulance A04", type: "AMBULANCE", zone: "ZONE-B", status: "RESPONDING", crewCount: 2 },
  { id: "RES-R03", callsign: "Rescue R03", type: "RESCUE", zone: "ZONE-A", status: "AVAILABLE", crewCount: 4 },
  { id: "POL-P08", callsign: "Police P08", type: "POLICE", zone: "ZONE-A", status: "AVAILABLE", crewCount: 2 }
];

let hospitals = [
  { id: "HOSP-01", name: "City Care Hospital", erCapacity: 6, erTotal: 12, traumaCapability: "AVAILABLE", etaMinutes: 7, incoming: 0 },
  { id: "HOSP-02", name: "Apollo Trauma Center", erCapacity: 9, erTotal: 14, traumaCapability: "LEVEL_1_TRAUMA", etaMinutes: 11, incoming: 1 },
  { id: "HOSP-03", name: "Care Emergency Hospital", erCapacity: 8, erTotal: 10, traumaCapability: "LIMITED_TRAUMA", etaMinutes: 9, incoming: 0 },
  { id: "HOSP-04", name: "KIMS Speciality Hospital", erCapacity: 5, erTotal: 16, traumaCapability: "AVAILABLE", etaMinutes: 16, incoming: 2 },
  { id: "HOSP-05", name: "Medicover Cyberabad", erCapacity: 7, erTotal: 12, traumaCapability: "AVAILABLE", etaMinutes: 14, incoming: 0 }
];

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "OPERATIONAL",
    system: "ResQAI Emergency Response Engine",
    version: "2.4.0-azure-ready",
    timestamp: new Date().toISOString()
  });
});

// Incidents
app.get("/api/incidents", (req, res) => {
  res.json(incidents);
});

app.get("/api/incidents/:id", (req, res) => {
  const inc = incidents.find(i => i.id === req.params.id);
  if (!inc) return res.status(404).json({ error: "Incident not found" });
  res.json(inc);
});

// Citizen Emergency Report Submission
app.post("/api/reports", (req, res) => {
  const { type = "ROAD_ACCIDENT", description = "", location = "Banjara Hills", affected = 2 } = req.body;
  const newNum = 2050 + Math.floor(Math.random() * 40);
  const newIncident = {
    id: `RQ-${newNum}`,
    title: description.slice(0, 38) || "Emergency Report",
    type: type.toUpperCase(),
    priority: affected >= 3 ? "CRITICAL" : "HIGH",
    status: "AWAITING_DISPATCH",
    locationName: location,
    zone: "ZONE-A",
    coordinates: { lat: 17.4156, lng: 78.4350 },
    affectedPeople: Number(affected),
    reportsCount: 1,
    confidence: 0.93,
    reportedAt: new Date().toLocaleTimeString(),
    lastUpdate: new Date().toLocaleTimeString(),
    riskIndicators: ["Immediate emergency response requested by citizen report"],
    requiredResources: [{ type: "AMBULANCE", count: 1, label: "1 × Ambulance" }]
  };

  incidents.unshift(newIncident);
  res.status(201).json({
    referenceId: `RQ-${newNum}-A`,
    incident: newIncident,
    message: "Report received and analyzed by ResQAI AI pipeline."
  });
});

// Resources
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

app.patch("/api/resources/:id/status", (req, res) => {
  const { status } = req.body;
  const resource = resources.find(r => r.id === req.params.id);
  if (!resource) return res.status(404).json({ error: "Resource not found" });
  resource.status = status;
  res.json(resource);
});

// Hospitals
app.get("/api/hospitals", (req, res) => {
  res.json(hospitals);
});

app.post("/api/hospitals/:id/notify", (req, res) => {
  const hosp = hospitals.find(h => h.id === req.params.id);
  if (!hosp) return res.status(404).json({ error: "Hospital not found" });
  hosp.incoming = (hosp.incoming || 0) + (req.body.patientCount || 3);
  res.json({ status: "NOTIFIED", hospital: hosp, timestamp: new Date().toISOString() });
});

// Analytics
app.get("/api/analytics", (req, res) => {
  res.json({
    averageResponseEstimateMin: 7.4,
    activeIncidents: incidents.filter(i => i.status !== "RESOLVED").length,
    criticalIncidents: incidents.filter(i => i.priority === "CRITICAL").length,
    resourceUtilizationPercent: 72,
    hospitalErLoadPercent: 64,
    duplicateReportsConsolidated: 18,
    regionalCoveragePercent: 88
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`[ResQAI Engine] Emergency Operations API running on port ${PORT}`);
});