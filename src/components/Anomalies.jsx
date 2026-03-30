import React from "react";
import Card from "./Card";
import { formatCurrency } from "../utils/helpers";

export default function Anomalies({ data = [] }) {
  return (
    <Card>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>🚨</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#E2E8F0",
        }}>
          Anomalies
        </span>

        {data.length > 0 && (
          <span style={{
            marginLeft: "auto",
            background: "rgba(239,68,68,0.2)",
            color: "#FCA5A5",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 20,
            padding: "2px 12px",
            fontSize: 12,
            fontWeight: 700,
          }}>
            {data.length} flagged
          </span>
        )}
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div style={{
          textAlign: "center",
          color: "#475569",
          padding: "28px 0",
          fontSize: 14,
        }}>
          ✅ No suspicious transactions detected
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((anomaly, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 16px",
                borderRadius: 12,
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.2)",
                gap: 12,
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <span style={{
                  color: "#CBD5E1",
                  fontSize: 13,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {anomaly.description || "Unusual transaction detected"}
                </span>
              </div>
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 15,
                color: "#FCA5A5",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}>
                {formatCurrency(anomaly.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
