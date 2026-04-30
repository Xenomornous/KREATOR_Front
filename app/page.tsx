"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f7fb",
        fontFamily: "sans-serif"
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
          width: "320px"
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>
          Kreator formularzy
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Twórz formularze metodą drag & drop
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link href="/kreator">
            <button style={btnPrimary}>
              Otwórz kreator
            </button>
          </Link>

          <Link href="/modules">
            <button style={btnSecondary}>
              Moduły
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// 🔥 styles
const btnPrimary = {
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const btnSecondary = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer"
};