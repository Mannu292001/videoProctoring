import Candidate from "../models/Candidate.js";

// Generate summary report
export const generateReport = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const candidate = await Candidate.findOne({ interviewId });

    if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found" });

    const logs = candidate.logs;

    // Count different events
    const summary = {
      totalLogs: logs.length,
      noFaceDetected: logs.filter((l) => l.type === "no_face").length,
      suspiciousItems: logs.filter((l) => l.type === "suspicious_item").length,
      lastActivity: logs.length > 0 ? logs[logs.length - 1].timestamp : null,
    };

    res.json({ success: true, candidate: candidate.name, interviewId, summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
