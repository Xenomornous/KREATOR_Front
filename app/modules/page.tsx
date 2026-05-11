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

  const userDEBUG = "user1"; /// DEBUG USUNAC

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch(
          `https://localhost:7294/api/modules/${userDEBUG}`
        );

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
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#f8faf8",
        fontFamily: "Inter, sans-serif",
        color: "#123524"
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: "280px",
          background: "white",
          borderRight: "1px solid #e3ebe5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px",
          position: "sticky",
          top: 0,
          height: "100vh"
        }}
      >
        <div>
          {/* LOGO */}
          <div
            style={{
              marginBottom: "40px"
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#123524"
              }}
            >
              EduPlatform
            </div>

            <div
              style={{
                color: "#6b7b72",
                marginTop: "6px",
                fontSize: "14px"
              }}
            >
              Panel nauki
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "36px"
            }}
          >
            <SidebarItem
              label="Panel główny"
              href="/dashboard"
            />

            <SidebarItem
              active
              label="Moduły"
              href="/modules"
            />

            <SidebarItem
              label="Postępy"
              href="/progress"
            />

            <SidebarItem
              label="Ustawienia"
              href="/settings"
            />
          </div>

          {/* QUICK MODULES */}
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#6b7b72",
                marginBottom: "16px",
                textTransform: "uppercase",
                letterSpacing: "1px"
              }}
            >
              Twoje moduły
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              {modules.slice(0, 3).map((m) => (
                <Link
                  key={m.id}
                  href={`/modules/${m.module_Id}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "14px",
                      background: "#f8fbf8",
                      border: "1px solid #e3ebe5",
                      color: "#123524",
                      fontWeight: 600
                    }}
                  >
                    {m.module_Name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div
          style={{
            paddingTop: "20px",
            borderTop: "1px solid #edf2ee"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px"
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "999px",
                background: "#dff3e5"
              }}
            />

            <div>
              <div
                style={{
                  fontWeight: 700
                }}
              >
                Jan Kowalski
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7b72"
                }}
              >
                Uczeń
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENT */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* HEADER */}
        <header
          style={{
            height: "90px",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e3ebe5",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 40px",
            position: "sticky",
            top: 0,
            zIndex: 50
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                fontSize: "14px",
                color: "#6b7b72",
                marginBottom: "4px"
              }}
            >
              Panel / Moduły
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px"
              }}
            >
              Twoje moduły 📚
            </h1>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px"
            }}
          >
            <input
              placeholder="Szukaj modułu..."
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #dce5de",
                background: "white",
                outline: "none",
                width: "240px"
              }}
            />

            <button style={headerButton}>
              Profil
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div
          style={{
            flex: 1,
            padding: "40px"
          }}
        >
          {loading ? (
            <div
              style={{
                color: "#6b7b72",
                fontSize: "18px"
              }}
            >
              Ładowanie modułów...
            </div>
          ) : modules.length === 0 ? (
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "60px",
                textAlign: "center",
                border: "1px solid #e5ece7",
                color: "#6b7b72"
              }}
            >
              Brak dostępnych modułów
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px"
              }}
            >
              {modules.map((m) => (
                <Link
                  key={m.id}
                  href={`/modules/${m.module_Id}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <div
                    style={{
                      background: "white",
                      borderRadius: "26px",
                      padding: "28px",
                      border: "1px solid #e5ece7",
                      boxShadow:
                        "0 12px 35px rgba(18,53,36,0.05)",
                      transition: "0.2s",
                      cursor: "pointer"
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "18px",
                        background: "#dff3e5",
                        marginBottom: "20px"
                      }}
                    />

                    <h2
                      style={{
                        color: "#123524",
                        marginBottom: "10px"
                      }}
                    >
                      {m.module_Name}
                    </h2>

                    <p
                      style={{
                        color: "#6b7b72",
                        marginBottom: "24px"
                      }}
                    >
                      Kliknij aby otworzyć moduł
                    </p>

                    <div
                      style={{
                        color: "#1f6b42",
                        fontWeight: 700
                      }}
                    >
                      Otwórz moduł →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* COMPONENTS */

function SidebarItem({
  label,
  href,
  active = false
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none"
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderRadius: "14px",
          background: active ? "#123524" : "transparent",
          color: active ? "white" : "#123524",
          fontWeight: 600,
          transition: "0.2s"
        }}
      >
        {label}
      </div>
    </Link>
  );
}

/* STYLES */

const headerButton = {
  padding: "12px 16px",
  borderRadius: "12px",
  border: "1px solid #dce5de",
  background: "white",
  cursor: "pointer",
  fontWeight: 600,
  color: "#123524"
};