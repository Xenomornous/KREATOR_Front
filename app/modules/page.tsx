"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Module = {
  id: number;
  user_Id: string;
  module_Id: string;
  module_Name: string;
  role: string;
  mod_User: string;
  mod_Date: string;
};

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const userDEBUG = "user1" as string;              /// DEBUG USUNAC !!!!

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch(`https://localhost:7294/api/modules/${userDEBUG}`);
        const data = await res.json();

        setModules(data);
      } catch (err) {
        console.error("Błąd API:", err);
        setModules([]);
      } finally {
        setLoading(false);
      }
    }

    fetchModules();
  }, []);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <div
        style={{
          height: "60px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "white"
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          📚 MyApp
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div>Moje konto</div>
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "#ddd"
            }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5"
        }}
      >
        {loading ? (
          <div>Ładowanie...</div>
        ) : modules.length === 0 ? (
          <div style={{ opacity: 0.6, fontSize: "18px" }}>
            Brak modułów
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 200px)",
              gap: "30px"
            }}
          >
            {modules.map((m) => (
              <Link
                key={m.id}
                href={`/modules/${m.module_Id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                    textAlign: "center",
                    cursor: "pointer"
                  }}
                >
                  <h3>{m.module_Name}</h3>
                  <p style={{ opacity: 0.6 }}>Wejdź do modułu</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}