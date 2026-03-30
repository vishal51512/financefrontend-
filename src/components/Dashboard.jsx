import React from "react";
import Card from "./Card";
import { formatCurrency } from "../utils/helpers";

/* ── Total Spending Card ── */
export function TotalSpendCard({ total }) {
  return (
    <Card style={{ position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: -30, right: -30,
        width: 140, height: 140,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(110,231,183,0.14), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>💰</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: "#64748B",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Total Spent
        </span>
      </div>

      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(32px, 5vw, 44px)",
        fontWeight: 800,
        color: "#6EE7B7",
        letterSpacing: "-1.5px",
        lineHeight: 1,
        marginBottom: 10,
      }}>
        {total !== null && total !== undefined ? formatCurrency(total) : "—"}
      </div>

      <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>
        Across all analyzed transactions
      </p>
    </Card>
  );
}

/* ── Stats Row ── */
export function StatsRow({ analytics }) {
  const catCount  = Object.keys(analytics.category_breakdown || {}).length;
  const monthCount = Object.keys(analytics.monthly_trend || {}).length;
  const anomalyCount = (analytics.anomalies || []).length;

  const stats = [
    { label: "Categories",  value: catCount,    icon: "🏷️",  danger: false },
    { label: "Months",      value: monthCount,  icon: "📅",  danger: false },
    { label: "Anomalies",   value: anomalyCount, icon: "⚠️", danger: anomalyCount > 0 },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
      {stats.map((s) => (
        <Card key={s.label} style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>{s.icon}</span>
            <span style={{
              color: "#64748B",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}>
              {s.label}
            </span>
          </div>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: s.danger ? "#FCA5A5" : "#6EE7B7",
          }}>
            {s.value}
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ── AI Prediction Card ── */
export function PredictionCard({ data }) {
  if (data === null || data === undefined) return null;

  const display =
    typeof data === "object"
      ? JSON.stringify(data, null, 2)
      : String(data);

  return (
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 22 }}>🔮</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#E2E8F0",
        }}>
          AI Prediction
        </span>
      </div>

      <pre style={{
        margin: 0,
        color: "#94A3B8",
        fontSize: 13,
        fontFamily: "monospace",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        background: "rgba(15,23,42,0.5)",
        borderRadius: 10,
        padding: "14px 16px",
        border: "1px solid rgba(110,231,183,0.08)",
      }}>
        {display}
      </pre>
    </Card>
  );
}
