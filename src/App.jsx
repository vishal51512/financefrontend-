import React, { useState, useEffect, useCallback } from "react";
import { fetchAnalytics } from "./api";
import Upload from "./components/Upload";
import { CategoryBreakdown, MonthlyTrend } from "./components/Charts";
import Anomalies from "./components/Anomalies";
import { TotalSpendCard, StatsRow, PredictionCard } from "./components/Dashboard";
import Spinner from "./components/Spinner";

const GAP = 20;

/* ── Global Styles ── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #060D1A;
    color: #E2E8F0;
    font-family: 'Syne', sans-serif;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(110,231,183,0.25);
    border-radius: 3px;
  }
`;

export default function App() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalytics();
      setAnalytics(data);
    } catch (e) {
      setError(e?.response?.data?.detail || e.message || "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return (
    <>
      <style>{globalStyles}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060D1A 0%, #0A1628 50%, #060D1A 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient background blobs */}
        <div style={{
          position: "fixed", top: -200, left: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.06), transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "fixed", bottom: -200, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.05), transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <header style={{
          borderBottom: "1px solid rgba(110,231,183,0.1)",
          background: "rgba(6,13,26,0.85)",
          backdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 100,
          padding: "0 clamp(16px, 4vw, 48px)",
        }}>
          <div style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 34, height: 34,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6EE7B7, #06B6D4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17,
              }}>
                💹
              </div>
              <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
                Finance<span style={{ color: "#6EE7B7" }}>Analyzer</span>
              </span>
            </div>

            {/* Refresh button */}
            <button
              onClick={loadAnalytics}
              disabled={loading}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(110,231,183,0.1)",
                border: "1px solid rgba(110,231,183,0.25)",
                borderRadius: 10,
                padding: "8px 16px",
                color: "#6EE7B7",
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? "default" : "pointer",
                fontFamily: "'Syne', sans-serif",
                transition: "background 0.2s",
              }}
            >
              {loading ? <Spinner size={14} /> : <span>↻</span>}
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </header>

        {/* ── Main content ── */}
        <main style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: `36px clamp(16px, 4vw, 48px) 80px`,
        }}>
          {/* Page title */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.1,
            }}>
              Your Financial<br />
              <span style={{
                background: "linear-gradient(90deg, #6EE7B7, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Overview
              </span>
            </h1>
            <p style={{ color: "#475569", marginTop: 10, fontSize: 15 }}>
              Upload your transaction CSV and get instant AI-powered insights.
            </p>
          </div>

          {/* Row 1 — Upload + Total + Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: GAP,
            marginBottom: GAP,
          }}>
            <Upload onUploadSuccess={loadAnalytics} />

            <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
              <TotalSpendCard total={analytics?.total_spent} />
              {analytics && <StatsRow analytics={analytics} />}
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div style={{
              padding: "14px 20px",
              marginBottom: GAP,
              borderRadius: 12,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#FCA5A5",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}>
              <span>❌</span>
              <span>Failed to load analytics: {error}</span>
            </div>
          )}

          {/* Loading spinner (first load) */}
          {loading && !analytics && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: 80,
              gap: 18,
            }}>
              <Spinner size={52} />
              <span style={{ color: "#475569", fontSize: 14 }}>Loading your analytics…</span>
            </div>
          )}

          {/* Row 2 — Charts */}
          {analytics && (
            <>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: GAP,
                marginBottom: GAP,
              }}>
                <CategoryBreakdown data={analytics.category_breakdown} />
                <MonthlyTrend data={analytics.monthly_trend} />
              </div>

              {/* Row 3 — Anomalies + Prediction */}
              <div style={{
                display: "grid",
                gridTemplateColumns: analytics.prediction != null ? "1fr 1fr" : "1fr",
                gap: GAP,
              }}>
                <Anomalies data={analytics.anomalies} />
                {analytics.prediction != null && (
                  <PredictionCard data={analytics.prediction} />
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
