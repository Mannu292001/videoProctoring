import React from "react";

export default function LogsTable({ logs }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Timestamp
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Event Type
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr
              key={idx}
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
            >
              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800 font-medium border-b">
                {log.eventType}
              </td>
              <td className="px-4 py-2 text-sm text-gray-600 border-b">
                {log.details?.message || JSON.stringify(log.details)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
