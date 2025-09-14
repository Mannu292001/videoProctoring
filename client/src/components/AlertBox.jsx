import React from "react";

export default function AlertBox({ message, type = "danger" }) {
  const colors =
    type === "danger"
      ? "bg-red-100 text-red-800 border-red-400"
      : type === "warning"
      ? "bg-yellow-100 text-yellow-800 border-yellow-400"
      : "bg-green-100 text-green-800 border-green-400";

  return (
    <div
      className={`w-full border-l-4 p-4 rounded-md shadow-sm ${colors} flex items-center gap-2`}
    >
      <span>⚠️</span>
      <span className="font-medium">{message}</span>
    </div>
  );
}
