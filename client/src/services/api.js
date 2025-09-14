const API_URL = import.meta.env.VITE_API_URL;

export const logEvent = async (type, details, interviewId, name, email) => {
  const log = {
    type,
    details,
    timestamp: new Date().toISOString(), // ✅ ensure string timestamp
  };

  await fetch(`${API_URL}/api/logs/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      interviewId,
      name,
      email,
      log,
    }),
  });

  return log; // return clean JSON for frontend state
};
