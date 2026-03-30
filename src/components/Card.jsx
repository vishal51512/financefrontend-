import React from "react";

export default function Card({ children, style = {}, className = "" }) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(15,23,42,0.75)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(110,231,183,0.12)",
        borderRadius: 20,
        padding: "28px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
