import React, { useState, useRef } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import { uploadTransactions } from "../api";

export default function Upload({ onUploadSuccess }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // { ok: bool, msg: string }
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      setStatus({ ok: false, msg: "Please upload a valid .csv file." });
      return;
    }
    setUploading(true);
    setStatus(null);
    try {
      await uploadTransactions(file);
      setStatus({ ok: true, msg: `"${file.name}" uploaded successfully!` });
      onUploadSuccess();
    } catch (e) {
      const msg = e?.response?.data?.detail || e.message || "Unknown error";
      setStatus({ ok: false, msg: `Upload failed: ${msg}` });
    } finally {
      setUploading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <Card>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 22 }}>📤</span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 18,
          fontWeight: 700,
          color: "#E2E8F0",
          letterSpacing: "-0.3px",
        }}>
          Upload Transactions
        </span>
      </div>

      {/* Drop Zone */}
      <div
        onClick={() => !uploading && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? "#6EE7B7" : "rgba(110,231,183,0.3)"}`,
          borderRadius: 14,
          padding: "40px 20px",
          textAlign: "center",
          cursor: uploading ? "default" : "pointer",
          transition: "all 0.25s ease",
          background: dragging ? "rgba(110,231,183,0.06)" : "rgba(15,23,42,0.4)",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />

        {uploading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <Spinner size={36} />
            <span style={{ color: "#94A3B8", fontSize: 14 }}>Uploading your file…</span>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 38, marginBottom: 12 }}>📁</div>
            <p style={{ color: "#94A3B8", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Drag & drop a{" "}
              <strong style={{ color: "#6EE7B7" }}>.csv</strong> file here,<br />
              or{" "}
              <span style={{ color: "#6EE7B7", textDecoration: "underline" }}>
                click to browse
              </span>
            </p>
          </>
        )}
      </div>

      {/* Status Message */}
      {status && (
        <div
          style={{
            marginTop: 14,
            padding: "12px 16px",
            borderRadius: 10,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: status.ok
              ? "rgba(16,185,129,0.12)"
              : "rgba(239,68,68,0.12)",
            border: `1px solid ${status.ok
              ? "rgba(16,185,129,0.35)"
              : "rgba(239,68,68,0.35)"}`,
            color: status.ok ? "#6EE7B7" : "#FCA5A5",
          }}
        >
          <span>{status.ok ? "✅" : "❌"}</span>
          {status.msg}
        </div>
      )}
    </Card>
  );
}
