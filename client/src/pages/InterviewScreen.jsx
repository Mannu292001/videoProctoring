import React, { useState, useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import LogsTable from "../components/LogsTable";
import AlertBox from "../components/AlertBox"; // ✅ use for alerts
import { logEvent } from "../services/api";
// import DownloadReportButton from "../components/DownloadReportButton";

const API_URL = import.meta.env.VITE_API_URL;

export default function InterviewScreen() {
  const [candidate, setCandidate] = useState({
    interviewId: "",
    name: "",
    email: "",
  });
  const [registered, setRegistered] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]); // ✅ red alert banners

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Candidate registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/logs/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate),
      });

      if (res.ok) {
        setRegistered(true);
        startCamera();
      }
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  // Camera handling
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Simulate ML detection -> push alerts + logs
  const simulateDetection = () => {
    const randomEvent = Math.random() > 0.5
      ? { type: "suspicious_item", message: "cell phone detected" }
      : { type: "no_face", message: "No face detected" };

    // Add to alerts (top red banners)
    setAlerts((prev) => [...prev, randomEvent.message]);

    // Add to logs table
    const log = {
      timestamp: new Date().toISOString(),
      eventType: randomEvent.type,
      details: { message: randomEvent.message },
    };
    setLogs((prev) => [...prev, log]);
  };

  // Start monitoring
  const startMonitoring = () => {
    setMonitoring(true);

    const log = {
      timestamp: new Date().toISOString(),
      eventType: "monitoring_started",
      details: { message: "Candidate monitoring session started" },
    };
    setLogs((prev) => [...prev, log]);

    // Simulate ML events every 5s
    window.detectionInterval = setInterval(simulateDetection, 5000);

    startCamera();
  };

  // Stop monitoring
  const stopMonitoring = async () => {
    setMonitoring(false);
    clearInterval(window.detectionInterval);

    const log = {
      timestamp: new Date().toISOString(),
      type: "monitoring_stopped",  // ✅ must match schema
      details: { message: "Candidate monitoring session stopped" },
    };

    setLogs((prev) => [...prev, log]);

    // Send logs to backend
    try {
      await fetch(`${API_URL}/api/logs/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId: candidate.interviewId,
          logs: [...logs, log].map((l) => ({
            timestamp: l.timestamp || new Date().toISOString(),
            type: l.type || l.eventType || "info",  // ✅ ensure `type` always exists
            details: l.details || {},
          })),
        }),
      });
      console.log("✅ Logs saved to backend");
    } catch (err) {
      console.error("❌ Error saving logs:", err);
    }

    stopCamera();
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6 font-poppins">
      {!registered ? (
        // ✅ Candidate registration form
        <form onSubmit={handleRegister} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Candidate Registration</h2>
          <input
            type="text"
            placeholder="Interview ID"
            className="w-full border p-3 rounded mb-3"
            value={candidate.interviewId}
            onChange={(e) => setCandidate({ ...candidate, interviewId: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-3"
            value={candidate.name}
            onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-3"
            value={candidate.email}
            onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Start Interview
          </button>
        </form>
      ) : (
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 text-center">Interview Monitoring</h2>

          {/* Video */}
          <VideoPlayer videoRef={videoRef} canvasRef={canvasRef} />

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              {alerts.map((msg, i) => (
                <AlertBox key={i} message={msg} />
              ))}
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            {/* Monitoring buttons */}
            <div className="flex justify-center gap-6">
              {!monitoring ? (
                <button
                  onClick={startMonitoring}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  ▶ Start Monitoring
                </button>
              ) : (
                <button
                  onClick={stopMonitoring}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg"
                >
                  ⏹ Stop Monitoring
                </button>
              )}
            </div>

            {/* Show Download Report button only if monitoring has stopped */}
            {!monitoring && registered && logs.length > 0 && (
              <DownloadReportButton interviewId={candidate.interviewId} />
            )}
          </div>

          {/* Logs Table */}
          <LogsTable logs={logs} />
        </div>
      )}
    </div>
  );
}
