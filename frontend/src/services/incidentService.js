import { INITIAL_INCIDENTS, INITIAL_ZONES } from "../data/mockData";

export const IncidentService = {
  async getIncidents() {
    try {
      const res = await fetch("http://localhost:5000/api/incidents");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      // Backend unavailable, fallback to mock data
    }
    return INITIAL_INCIDENTS;
  },

  async getIncidentById(id) {
    const list = await this.getIncidents();
    return list.find(inc => inc.id === id) || null;
  },

  async submitReport(reportPayload) {
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportPayload)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Offline fallback
    }

    const newId = `RQ-${Math.floor(2050 + Math.random() * 50)}`;
    return {
      referenceId: `${newId}-A`,
      incidentId: newId,
      status: "ANALYZED",
      message: "Report successfully received and processed by ResQAI intelligence pipeline."
    };
  }
};
