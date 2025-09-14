import Candidate from "../models/Candidate.js";

export const start = async (req, res) => {
  try {
    const { interviewId, name, email } = req.body;
    console.log(req.body);

    // check if candidate exists
    let candidate = await Candidate.findOne({ interviewId });

    if (!candidate) {
      // create new candidate without logs yet
      candidate = new Candidate({ interviewId, name, email, logs: [] });
      await candidate.save();
      return res.status(201).json({
        success: true,
        message: "Candidate registered successfully",
        candidate,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Candidate already registered",
        candidate,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


export const saveLog = async (req, res) => {
  try {
    const { interviewId, name, email, logs } = req.body;
    console.log("📩 Incoming log payload:", req.body);

    let candidate = await Candidate.findOne({ interviewId });

    if (!candidate) {
      candidate = new Candidate({ name, email, interviewId, logs: [] });
    }

    // If logs is an array → push each log
    if (Array.isArray(logs)) {
      logs.forEach((log) => {
        candidate.logs.push({
          ...log,
          timestamp: log.timestamp ? new Date(log.timestamp) : new Date(),
        });
      });
    } else if (logs) {
      // Handle single log case
      candidate.logs.push({
        ...logs,
        timestamp: logs.timestamp ? new Date(logs.timestamp) : new Date(),
      });
    }

    await candidate.save();

    res.status(201).json({ success: true, message: "Logs saved" });
  } catch (err) {
    console.error("❌ SaveLog error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Fetch logs by interviewId
export const getLogs = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const candidate = await Candidate.findOne({ interviewId });

    if (!candidate) return res.status(404).json({ success: false, message: "No logs found" });

    res.json({ success: true, logs: candidate.logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
