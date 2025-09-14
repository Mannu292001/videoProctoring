// Event logger to keep track of focus loss/suspicious items
const logs = [];

export function logEvent(type, details = {}) {
  const timestamp = new Date().toISOString();
  const entry = { type, details, timestamp };
  logs.push(entry);
  console.log("📌 Event logged:", entry);
  return entry;
}

export function getLogs() {
  return logs;
}

export function clearLogs() {
  logs.length = 0;
}
