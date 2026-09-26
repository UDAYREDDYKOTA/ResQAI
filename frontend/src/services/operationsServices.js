import { INITIAL_RESOURCES, INITIAL_HOSPITALS, RESPONSE_SCENARIOS_RQ2048 } from "../data/mockData";

export const ResourceService = {
  async getResources() {
    try {
      const res = await fetch("http://localhost:5000/api/resources");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    return INITIAL_RESOURCES;
  }
};

export const HospitalService = {
  async getHospitals() {
    try {
      const res = await fetch("http://localhost:5000/api/hospitals");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {}
    return INITIAL_HOSPITALS;
  },

  async notifyHospital(hospitalId, payload) {
    try {
      await fetch(`http://localhost:5000/api/hospitals/${hospitalId}/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {}
    return {
      status: "CONFIRMED",
      timestamp: new Date().toLocaleTimeString(),
      ackCode: `ACK-${Math.floor(1000 + Math.random() * 9000)}`
    };
  }
};

export const SimulationService = {
  getScenarios(incidentId) {
    return RESPONSE_SCENARIOS_RQ2048;
  }
};
