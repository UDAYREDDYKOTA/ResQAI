// ResQAI Unified Emergency Operations Mock Data
// Metro Zone: Hyderabad / Cyberabad Metropolitan Command Area

export const INITIAL_ZONES = [
  {
    id: "ZONE-A",
    name: "Zone A (Central / Banjara)",
    coverage: 94,
    threshold: 80,
    activeIncidents: 4,
    availableAmbulances: 3,
    polygon: [
      [17.435, 78.420],
      [17.435, 78.465],
      [17.400, 78.465],
      [17.400, 78.420]
    ]
  },
  {
    id: "ZONE-B",
    name: "Zone B (West / Jubilee & Hitec)",
    coverage: 88,
    threshold: 75,
    activeIncidents: 5,
    availableAmbulances: 2,
    polygon: [
      [17.460, 78.360],
      [17.460, 78.420],
      [17.410, 78.420],
      [17.410, 78.360]
    ]
  },
  {
    id: "ZONE-C",
    name: "Zone C (North / Secunderabad)",
    coverage: 91,
    threshold: 75,
    activeIncidents: 3,
    availableAmbulances: 2,
    polygon: [
      [17.500, 78.430],
      [17.500, 78.500],
      [17.440, 78.500],
      [17.440, 78.430]
    ]
  },
  {
    id: "ZONE-D",
    name: "Zone D (South / Cyberabad East)",
    coverage: 86,
    threshold: 75,
    activeIncidents: 2,
    availableAmbulances: 1,
    polygon: [
      [17.400, 78.420],
      [17.400, 78.490],
      [17.350, 78.490],
      [17.350, 78.420]
    ]
  }
];

export const INITIAL_HOSPITALS = [
  {
    id: "HOSP-01",
    name: "City Care Hospital",
    zone: "ZONE-A",
    address: "Road No. 1, Banjara Hills",
    coordinates: { lat: 17.4180, lng: 78.4460 },
    erCapacity: 6,
    erTotal: 12,
    traumaCapability: "AVAILABLE",
    icuCapacity: 3,
    icuTotal: 8,
    ambulanceBays: 2,
    baysTotal: 4,
    status: "ACCEPTING",
    etaMinutes: 7,
    incomingPatients: 0
  },
  {
    id: "HOSP-02",
    name: "Apollo Trauma Center",
    zone: "ZONE-B",
    address: "Road No. 72, Jubilee Hills",
    coordinates: { lat: 17.4280, lng: 78.4120 },
    erCapacity: 9,
    erTotal: 14,
    traumaCapability: "LEVEL_1_TRAUMA",
    icuCapacity: 5,
    icuTotal: 10,
    ambulanceBays: 3,
    baysTotal: 5,
    status: "ACCEPTING",
    etaMinutes: 11,
    incomingPatients: 1
  },
  {
    id: "HOSP-03",
    name: "Care Emergency Hospital",
    zone: "ZONE-A",
    address: "Premises 6-3-248, Road No. 10",
    coordinates: { lat: 17.4140, lng: 78.4390 },
    erCapacity: 8,
    erTotal: 10,
    traumaCapability: "LIMITED_TRAUMA",
    icuCapacity: 6,
    icuTotal: 6,
    ambulanceBays: 1,
    baysTotal: 3,
    status: "DIVERTING_ICU",
    etaMinutes: 9,
    incomingPatients: 0
  },
  {
    id: "HOSP-04",
    name: "KIMS Speciality Hospital",
    zone: "ZONE-C",
    address: "Minister Road, Secunderabad",
    coordinates: { lat: 17.4380, lng: 78.4810 },
    erCapacity: 5,
    erTotal: 16,
    traumaCapability: "AVAILABLE",
    icuCapacity: 4,
    icuTotal: 12,
    ambulanceBays: 2,
    baysTotal: 6,
    status: "ACCEPTING",
    etaMinutes: 16,
    incomingPatients: 2
  },
  {
    id: "HOSP-05",
    name: "Medicover Cyberabad",
    zone: "ZONE-B",
    address: "HUDA Techno Enclave, Madhapur",
    coordinates: { lat: 17.4470, lng: 78.3790 },
    erCapacity: 7,
    erTotal: 12,
    traumaCapability: "AVAILABLE",
    icuCapacity: 2,
    icuTotal: 8,
    ambulanceBays: 2,
    baysTotal: 4,
    status: "ACCEPTING",
    etaMinutes: 14,
    incomingPatients: 0
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "AMB-A12",
    callsign: "Ambulance A12",
    type: "AMBULANCE",
    category: "ADVANCED_LIFE_SUPPORT",
    zone: "ZONE-A",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["Trauma Kit", "Defibrillator AED", "Oxygen Tank", "Spinal Immobilizer"],
    coordinates: { lat: 17.4120, lng: 78.4420 },
    currentAssignment: null,
    batteryFuel: 88,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "AMB-A07",
    callsign: "Ambulance A07",
    type: "AMBULANCE",
    category: "ADVANCED_LIFE_SUPPORT",
    zone: "ZONE-A",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["Trauma Kit", "AED", "Pediatric Care Kit"],
    coordinates: { lat: 17.4210, lng: 78.4310 },
    currentAssignment: null,
    batteryFuel: 92,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "AMB-A09",
    callsign: "Ambulance A09",
    type: "AMBULANCE",
    category: "BASIC_LIFE_SUPPORT",
    zone: "ZONE-C",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["AED", "Oxygen", "First Response Kit"],
    coordinates: { lat: 17.4580, lng: 78.4480 },
    currentAssignment: null,
    batteryFuel: 81,
    telemetrySpeedKmh: 0,
    lastPing: "1 min ago"
  },
  {
    id: "AMB-A04",
    callsign: "Ambulance A04",
    type: "AMBULANCE",
    category: "ADVANCED_LIFE_SUPPORT",
    zone: "ZONE-B",
    status: "RESPONDING",
    crewCount: 2,
    equipment: ["Trauma Kit", "Defibrillator"],
    coordinates: { lat: 17.4300, lng: 78.4050 },
    currentAssignment: "RQ-2047",
    batteryFuel: 74,
    telemetrySpeedKmh: 48,
    lastPing: "Just now"
  },
  {
    id: "AMB-A02",
    callsign: "Ambulance A02",
    type: "AMBULANCE",
    category: "ADVANCED_LIFE_SUPPORT",
    zone: "ZONE-D",
    status: "TRANSPORTING",
    crewCount: 2,
    equipment: ["Ventilator", "Trauma Kit"],
    coordinates: { lat: 17.3780, lng: 78.4520 },
    currentAssignment: "RQ-2041",
    batteryFuel: 69,
    telemetrySpeedKmh: 42,
    lastPing: "2 min ago"
  },
  {
    id: "AMB-A15",
    callsign: "Ambulance A15",
    type: "AMBULANCE",
    category: "BASIC_LIFE_SUPPORT",
    zone: "ZONE-B",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["AED", "Oxygen"],
    coordinates: { lat: 17.4420, lng: 78.3810 },
    currentAssignment: null,
    batteryFuel: 95,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "AMB-A18",
    callsign: "Ambulance A18",
    type: "AMBULANCE",
    category: "ADVANCED_LIFE_SUPPORT",
    zone: "ZONE-C",
    status: "ON_SCENE",
    crewCount: 2,
    equipment: ["Burn Unit Kit", "Trauma Kit"],
    coordinates: { lat: 17.4830, lng: 78.4150 },
    currentAssignment: "RQ-2046",
    batteryFuel: 62,
    telemetrySpeedKmh: 0,
    lastPing: "30s ago"
  },
  {
    id: "AMB-A21",
    callsign: "Ambulance A21",
    type: "AMBULANCE",
    category: "BASIC_LIFE_SUPPORT",
    zone: "ZONE-A",
    status: "MAINTENANCE",
    crewCount: 0,
    equipment: ["Scheduled Inspection"],
    coordinates: { lat: 17.4080, lng: 78.4550 },
    currentAssignment: null,
    batteryFuel: 100,
    telemetrySpeedKmh: 0,
    lastPing: "10 min ago"
  },
  {
    id: "RES-R03",
    callsign: "Rescue R03",
    type: "RESCUE",
    category: "HEAVY_EXTRICATION",
    zone: "ZONE-A",
    status: "AVAILABLE",
    crewCount: 4,
    equipment: ["Hydraulic Cutters (Jaws of Life)", "Air Lifting Bags", "Winch 12T", "Thermal Camera"],
    coordinates: { lat: 17.4190, lng: 78.4380 },
    currentAssignment: null,
    batteryFuel: 90,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "RES-R07",
    callsign: "Rescue R07",
    type: "RESCUE",
    category: "RAPID_INTERVENTION",
    zone: "ZONE-B",
    status: "AVAILABLE",
    crewCount: 3,
    equipment: ["Pneumatic Spreaders", "Shoring Struts", "Hazmat Suits"],
    coordinates: { lat: 17.4320, lng: 78.3990 },
    currentAssignment: null,
    batteryFuel: 85,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "POL-P08",
    callsign: "Police P08",
    type: "POLICE",
    category: "TRAFFIC_INTERCEPTOR",
    zone: "ZONE-A",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["Emergency Lightbar", "Traffic Cones", "Breathalyzer", "AED"],
    coordinates: { lat: 17.4160, lng: 78.4300 },
    currentAssignment: null,
    batteryFuel: 91,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "POL-P14",
    callsign: "Police P14",
    type: "POLICE",
    category: "PATROL_UNIT",
    zone: "ZONE-A",
    status: "AVAILABLE",
    crewCount: 2,
    equipment: ["Barricades", "Radio Repeater"],
    coordinates: { lat: 17.4240, lng: 78.4410 },
    currentAssignment: null,
    batteryFuel: 79,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "POL-P03",
    callsign: "Police P03",
    type: "POLICE",
    category: "PATROL_UNIT",
    zone: "ZONE-C",
    status: "EN_ROUTE",
    crewCount: 2,
    equipment: ["Tactical Gear", "AED"],
    coordinates: { lat: 17.4450, lng: 78.4680 },
    currentAssignment: "RQ-2044",
    batteryFuel: 72,
    telemetrySpeedKmh: 54,
    lastPing: "Just now"
  },
  {
    id: "FIRE-F01",
    callsign: "Fire F01",
    type: "FIRE",
    category: "HIGH_PRESSURE_PUMPER",
    zone: "ZONE-C",
    status: "ON_SCENE",
    crewCount: 5,
    equipment: ["1000 GPM Water Pump", "Foam Inductor", "Breathing Apparatus"],
    coordinates: { lat: 17.4849, lng: 78.4138 },
    currentAssignment: "RQ-2046",
    batteryFuel: 68,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  },
  {
    id: "FIRE-F04",
    callsign: "Fire F04",
    type: "FIRE",
    category: "AERIAL_LADDER",
    zone: "ZONE-B",
    status: "AVAILABLE",
    crewCount: 4,
    equipment: ["32m Turntable Ladder", "Rescue Basket"],
    coordinates: { lat: 17.4490, lng: 78.3880 },
    currentAssignment: null,
    batteryFuel: 94,
    telemetrySpeedKmh: 0,
    lastPing: "Just now"
  }
];

export const CORRELATED_REPORTS_RQ2048 = [
  {
    id: "RQ-2048-A",
    timestamp: "20:42:01",
    source: "Citizen Mobile App",
    callerName: "Rajesh S.",
    phone: "+91 98490-XXXXX",
    text: "Major crash near Banjara Hills Rd 12 intersection between two sedans, glass everywhere, people shouting for help.",
    reportedLocation: "Banjara Hills Rd 12 near City Center Mall",
    coordinates: { lat: 17.4158, lng: 78.4352 },
    matchScore: { location: 96, time: 92, semantic: 89, composite: 93 }
  },
  {
    id: "RQ-2048-B",
    timestamp: "20:42:02",
    source: "Emergency Web Portal",
    callerName: "Dr. Ananya P.",
    phone: "+91 94401-XXXXX",
    text: "Two cars collided badly at Banjara Hills road 12. At least three people injured, one driver cannot open door, bleeding from forehead.",
    reportedLocation: "Road 12 junction, Banjara Hills",
    coordinates: { lat: 17.4155, lng: 78.4348 },
    matchScore: { location: 97, time: 94, semantic: 92, composite: 95 }
  },
  {
    id: "RQ-2048-C",
    timestamp: "20:42:03",
    source: "Traffic Police CCTV Dispatch",
    callerName: "Officer K. Rao",
    phone: "Radio CH-4",
    text: "Huge accident blocking both lanes near road 12. Multiple casualties, need ambulances and rescue cutters urgently.",
    reportedLocation: "Banjara Hills Rd 12 crossing",
    coordinates: { lat: 17.4156, lng: 78.4350 },
    matchScore: { location: 98, time: 96, semantic: 91, composite: 95 }
  }
];

export const INITIAL_INCIDENTS = [
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
      { type: "RESCUE", count: 1, label: "1 × Heavy Rescue (Extrication)" },
      { type: "POLICE", count: 1, label: "1 × Traffic Police Unit" }
    ],
    recommendedResponse: "Multi-agency emergency dispatch with trauma center intake notification.",
    hospitalMatch: {
      hospitalId: "HOSP-01",
      hospitalName: "City Care Hospital",
      erCapacity: 6,
      traumaCapability: "AVAILABLE",
      etaMinutes: 7,
      matchReason: "Nearest Level 2 Trauma center with 6 available ER trauma beds and immediate surgical readiness."
    },
    correlatedReports: CORRELATED_REPORTS_RQ2048,
    assignedResources: [],
    timeline: [
      { time: "20:42:01", title: "Citizen Report Received", desc: "Report #RQ-2048-A ingested via mobile emergency flow", status: "success" },
      { time: "20:42:02", title: "AI Classification Completed", desc: "Detected ROAD_ACCIDENT with 94% classification confidence", status: "info" },
      { time: "20:42:03", title: "Multi-Report Fusion Executed", desc: "Correlated 3 distinct citizen reports within 200m radius into single incident", status: "ai" },
      { time: "20:42:04", title: "Critical Priority Triggered", desc: "Rule and neural severity model elevated priority to CRITICAL", status: "critical" },
      { time: "20:42:05", title: "Resource Requirements Identified", desc: "Extracted 2x Ambulance, 1x Rescue, 1x Police required", status: "info" },
      { time: "20:42:06", title: "Response Scenarios Evaluated", desc: "Generated 3 candidate dispatch configurations with zone ripple projection", status: "ai" }
    ]
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
    riskIndicators: [
      "Severe chest pain radiating to left arm",
      "Elderly patient with history of coronary disease"
    ],
    requiredResources: [
      { type: "AMBULANCE", count: 1, label: "1 × Ambulance (ALS)" }
    ],
    recommendedResponse: "Immediate ALS ambulance dispatch with ECG telemetry transmission.",
    hospitalMatch: {
      hospitalId: "HOSP-02",
      hospitalName: "Apollo Trauma Center",
      erCapacity: 9,
      traumaCapability: "LEVEL_1_TRAUMA",
      etaMinutes: 6
    },
    assignedResources: ["AMB-A04"],
    timeline: [
      { time: "20:38:15", title: "Citizen Call Received", desc: "Call from spouse reporting acute chest pain", status: "success" },
      { time: "20:39:00", title: "Ambulance A04 Dispatched", desc: "Unit rolling with siren and pre-arrival instructions", status: "info" }
    ]
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
    riskIndicators: [
      "Chemical storage proximity with flammable solvents",
      "Risk of roof truss structural collapse",
      "Dense toxic black smoke plume"
    ],
    requiredResources: [
      { type: "FIRE", count: 2, label: "2 × Fire Engines" },
      { type: "RESCUE", count: 1, label: "1 × Heavy Rescue" },
      { type: "AMBULANCE", count: 2, label: "2 × Ambulance" }
    ],
    recommendedResponse: "Second alarm industrial fire protocol with foam suppression and 500m evacuation perimeter.",
    hospitalMatch: {
      hospitalId: "HOSP-04",
      hospitalName: "KIMS Speciality Hospital",
      erCapacity: 5,
      traumaCapability: "AVAILABLE",
      etaMinutes: 8
    },
    assignedResources: ["FIRE-F01", "AMB-A18"],
    timeline: [
      { time: "20:31:40", title: "First Alarm Ingested", desc: "Multiple 911 calls reporting smoke", status: "critical" },
      { time: "20:34:10", title: "Fire F01 On Scene", desc: "Setting up attack line and hydrant connection", status: "info" }
    ]
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
    riskIndicators: [
      "Minor laceration and wrist contusion",
      "Conscious, alert, vitals within normal parameters"
    ],
    requiredResources: [
      { type: "AMBULANCE", count: 1, label: "1 × Ambulance (BLS)" }
    ],
    recommendedResponse: "On-scene basic triage and outpatient transfer if requested.",
    hospitalMatch: {
      hospitalId: "HOSP-05",
      hospitalName: "Medicover Cyberabad",
      erCapacity: 7,
      traumaCapability: "AVAILABLE",
      etaMinutes: 5
    },
    assignedResources: [],
    timeline: [
      { time: "20:25:10", title: "Report Ingested", desc: "Security guard reported pedestrian trip and fall", status: "success" },
      { time: "20:36:45", title: "Triage Completed & Closed", desc: "Patient treated on scene and signed refusal of transport", status: "success" }
    ]
  },
  {
    id: "RQ-2044",
    title: "Commercial Burglary In Progress",
    type: "CRIME",
    priority: "HIGH",
    status: "RESPONDING",
    locationName: "Begumpet Flyover North",
    zone: "ZONE-C",
    coordinates: { lat: 17.4447, lng: 78.4664 },
    affectedPeople: 2,
    reportsCount: 2,
    confidence: 0.92,
    reportedAt: "20:28:00",
    lastUpdate: "20:39:15",
    riskIndicators: [
      "Perpetrators reportedly carrying pry tools",
      "Night security officer pinned in booth"
    ],
    requiredResources: [
      { type: "POLICE", count: 2, label: "2 × Patrol Units" }
    ],
    recommendedResponse: "Silent approach intercept and perimeter containment.",
    hospitalMatch: null,
    assignedResources: ["POL-P03"],
    timeline: [
      { time: "20:28:00", title: "Silent Alarm Triggered", desc: "Commercial security monitoring feed", status: "info" }
    ]
  },
  {
    id: "RQ-2043",
    title: "Water Distress / Overturned Kayak",
    type: "RESCUE",
    priority: "MEDIUM",
    status: "ACTIVE",
    locationName: "Hussain Sagar Lakefront",
    zone: "ZONE-A",
    coordinates: { lat: 17.4239, lng: 78.4738 },
    affectedPeople: 1,
    reportsCount: 1,
    confidence: 0.89,
    reportedAt: "20:20:00",
    lastUpdate: "20:35:10",
    riskIndicators: [
      "Subject clinging to overturned craft",
      "Night water visibility under 10 meters"
    ],
    requiredResources: [
      { type: "RESCUE", count: 1, label: "1 × Water Rescue Unit" },
      { type: "AMBULANCE", count: 1, label: "1 × Ambulance" }
    ],
    recommendedResponse: "Deploy rescue boat with thermal imager.",
    hospitalMatch: null,
    assignedResources: [],
    timeline: []
  },
  {
    id: "RQ-2042",
    title: "Gas Leak Odor Reported",
    type: "OTHER",
    priority: "LOW",
    status: "AWAITING_DISPATCH",
    locationName: "Somajiguda Circle",
    zone: "ZONE-A",
    coordinates: { lat: 17.4285, lng: 78.4550 },
    affectedPeople: 0,
    reportsCount: 1,
    confidence: 0.85,
    reportedAt: "20:15:20",
    lastUpdate: "20:15:20",
    riskIndicators: ["Odor detected near pipeline regulator"],
    requiredResources: [{ type: "FIRE", count: 1, label: "1 × Hazmat Sniffer" }],
    recommendedResponse: "Dispatch gas utility liaison and sniff test crew.",
    hospitalMatch: null,
    assignedResources: [],
    timeline: []
  },
  {
    id: "RQ-2041",
    title: "Elderly Fall With Hip Fracture",
    type: "MEDICAL",
    priority: "HIGH",
    status: "RESPONDING",
    locationName: "Charminar Heritage Enclave",
    zone: "ZONE-D",
    coordinates: { lat: 17.3616, lng: 78.4747 },
    affectedPeople: 1,
    reportsCount: 1,
    confidence: 0.90,
    reportedAt: "20:10:00",
    lastUpdate: "20:38:00",
    riskIndicators: ["Unable to bear weight, severe pain"],
    requiredResources: [{ type: "AMBULANCE", count: 1, label: "1 × Ambulance" }],
    recommendedResponse: "Spinal board stabilization and orthopedic hospital transport.",
    hospitalMatch: null,
    assignedResources: ["AMB-A02"],
    timeline: []
  }
];

export const RESPONSE_SCENARIOS_RQ2048 = [
  {
    id: "SCENARIO-A",
    name: "Scenario A: Optimal Multi-Agency Balance",
    tag: "RECOMMENDED",
    isRecommended: true,
    resources: [
      { id: "AMB-A12", callsign: "Ambulance A12", type: "AMBULANCE", eta: "7 min" },
      { id: "AMB-A07", callsign: "Ambulance A07", type: "AMBULANCE", eta: "8 min" },
      { id: "RES-R03", callsign: "Rescue R03", type: "RESCUE", eta: "7 min" },
      { id: "POL-P08", callsign: "Police P08", type: "POLICE", eta: "5 min" }
    ],
    estimatedResponseTimeMinutes: 7,
    remainingAmbulanceCoveragePercent: 82,
    hospitalLoadEstimate: "Medium",
    zoneRipple: [
      { zoneId: "ZONE-A", name: "Zone A (Central)", before: 94, after: 81, status: "STABLE", delta: -13 },
      { zoneId: "ZONE-B", name: "Zone B (West)", before: 88, after: 88, status: "UNCHANGED", delta: 0 },
      { zoneId: "ZONE-C", name: "Zone C (North)", before: 91, after: 91, status: "UNCHANGED", delta: 0 },
      { zoneId: "ZONE-D", name: "Zone D (South)", before: 86, after: 86, status: "UNCHANGED", delta: 0 }
    ],
    systemAssessment: "Scenario A maintains acceptable regional coverage (81% >= 80% threshold) while fully satisfying the required 2 ALS Ambulances and Heavy Rescue for entrapment extrication."
  },
  {
    id: "SCENARIO-B",
    name: "Scenario B: Coverage Conservation",
    tag: "CONSERVATIVE",
    isRecommended: false,
    resources: [
      { id: "AMB-A12", callsign: "Ambulance A12", type: "AMBULANCE", eta: "7 min" },
      { id: "RES-R03", callsign: "Rescue R03", type: "RESCUE", eta: "7 min" },
      { id: "POL-P08", callsign: "Police P08", type: "POLICE", eta: "5 min" }
    ],
    estimatedResponseTimeMinutes: 9,
    remainingAmbulanceCoveragePercent: 91,
    hospitalLoadEstimate: "Low",
    zoneRipple: [
      { zoneId: "ZONE-A", name: "Zone A (Central)", before: 94, after: 89, status: "EXCELLENT", delta: -5 },
      { zoneId: "ZONE-B", name: "Zone B (West)", before: 88, after: 88, status: "UNCHANGED", delta: 0 },
      { zoneId: "ZONE-C", name: "Zone C (North)", before: 91, after: 91, status: "UNCHANGED", delta: 0 },
      { zoneId: "ZONE-D", name: "Zone D (South)", before: 86, after: 86, status: "UNCHANGED", delta: 0 }
    ],
    systemAssessment: "Scenario B preserves high regional ambulance readiness (89%), but leaves casualty transport pending second-wave dispatch."
  },
  {
    id: "SCENARIO-C",
    name: "Scenario C: Rapid Cross-Zone Convergence",
    tag: "RAPID_ARRIVE",
    isRecommended: false,
    resources: [
      { id: "AMB-A07", callsign: "Ambulance A07", type: "AMBULANCE", eta: "6 min" },
      { id: "AMB-A09", callsign: "Ambulance A09", type: "AMBULANCE", eta: "6 min" },
      { id: "RES-R03", callsign: "Rescue R03", type: "RESCUE", eta: "7 min" },
      { id: "POL-P14", callsign: "Police P14", type: "POLICE", eta: "6 min" }
    ],
    estimatedResponseTimeMinutes: 6,
    remainingAmbulanceCoveragePercent: 76,
    hospitalLoadEstimate: "Medium",
    zoneRipple: [
      { zoneId: "ZONE-A", name: "Zone A (Central)", before: 94, after: 79, status: "WARNING", delta: -15 },
      { zoneId: "ZONE-B", name: "Zone B (West)", before: 88, after: 88, status: "UNCHANGED", delta: 0 },
      { zoneId: "ZONE-C", name: "Zone C (North)", before: 91, after: 83, status: "STABLE", delta: -8 },
      { zoneId: "ZONE-D", name: "Zone D (South)", before: 86, after: 86, status: "UNCHANGED", delta: 0 }
    ],
    systemAssessment: "Scenario C delivers the fastest initial responder arrival (6 min), but dips Zone A ambulance reserve to 79%, slightly below the 80% configured security floor."
  }
];

export const DEMO_STORYLINE_STEPS = [
  {
    stepIndex: 1,
    time: "20:42:01",
    title: "Citizen Emergency Report Ingested",
    summary: "Citizen Report #RQ-2048-A submitted with crash description and location coordinates.",
    highlightAction: "RECEIVE_REPORT",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 2,
    time: "20:42:02",
    title: "AI Analysis: Road Accident Identified",
    summary: "Neural NLP classifier extracts collision details, casualty count (3), and entrapment indicators.",
    highlightAction: "AI_CLASSIFY",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 3,
    time: "20:42:03",
    title: "Multi-Report Fusion: 3 Reports Consolidated",
    summary: "ResQAI correlates 3 incoming citizen & traffic reports with 94%+ spatio-temporal confidence.",
    highlightAction: "FUSION",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 4,
    time: "20:42:04",
    title: "Priority Elevation: CRITICAL Detected",
    summary: "High casualty count and entrapment elevates priority to CRITICAL. EOC alerts triggered.",
    highlightAction: "PRIORITY",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 5,
    time: "20:42:05",
    title: "Resource Matching: Multi-Agency Protocol",
    summary: "AI identifies requirement: 2 ALS Ambulances, 1 Heavy Rescue Extrication, 1 Police interceptor.",
    highlightAction: "RESOURCES_MATCH",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 6,
    time: "20:42:06",
    title: "Hospital Capacity Check",
    summary: "City Care Hospital verified: 6 trauma ER beds free, Level 2 trauma team standing by.",
    highlightAction: "HOSPITAL_CHECK",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 7,
    time: "20:42:07",
    title: "Response Scenarios & Ripple Generated",
    summary: "ResQAI evaluates Scenarios A, B, and C with zone coverage ripple impact projections.",
    highlightAction: "SIMULATE",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 8,
    time: "20:42:08",
    title: "Operator Validates Scenario A",
    summary: "Human-in-the-loop decision: Command operator approves recommended Scenario A dispatch package.",
    highlightAction: "SELECT_SCENARIO",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 9,
    time: "20:42:10",
    title: "Multi-Agency Units Dispatched",
    summary: "Ambulance A12, Ambulance A07, Rescue R03, Police P08 transition to DISPATCHED / EN ROUTE.",
    highlightAction: "DISPATCH",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 10,
    time: "20:42:12",
    title: "City Care Hospital In-Take Notified",
    summary: "Automated telemetry pre-alert sent to ER triage desk with patient count (3) and 7 min ETA.",
    highlightAction: "HOSPITAL_NOTIFIED",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 11,
    time: "20:42:15",
    title: "Responders Arrive On Scene",
    summary: "Rescue R03 commences hydraulic cutter extrication; Ambulance A12 begins immediate patient triage.",
    highlightAction: "ARRIVED",
    activeIncidentId: "RQ-2048"
  },
  {
    stepIndex: 12,
    time: "20:42:30",
    title: "Extrication Complete & Stabilized",
    summary: "All 3 patients successfully extricated and transported. Incident moves to RESOLVED.",
    highlightAction: "RESOLVED",
    activeIncidentId: "RQ-2048"
  }
];
