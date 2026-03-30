import React from "react";

export default function Spinner({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animation: "spin 0.9s linear infinite", display: "block" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle
        cx="12" cy="12" r="10"
        fill="none"
        stroke="#6EE7B7"
        strokeWidth="3"
        strokeDasharray="31.4"
        strokeDashoffset="10"
        strokeLinecap="round"
      />
    </svg>
  );
}
