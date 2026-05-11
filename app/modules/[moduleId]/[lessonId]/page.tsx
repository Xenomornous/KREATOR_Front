"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Lecture = {
  lecture_Id: string;
  lecture_Name: string;

  lesson_Id: string;
  lesson_Name: string;
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();

  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);

  const userDEBUG = "user1";

  useEffect(() => {
    async function fetchLectures() {
      try {
        const res = await fetch(
          `https://localhost:7294/api/lectures/${userDEBUG}/${moduleId}/${lessonId}`
        );

        if (!res.ok)
          throw new Error("Nie udało się pobrać lectures");

        const data = await res.json();

        setLectures(data);
      } catch (err) {
        console.error("ERROR FETCH LECTURES:", err);
      } finally {
        setLoading(false);
      }
    }

    if (lessonId) fetchLectures();
  }, [lessonId]);

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
                fontWeight: 900
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

          {/* CURRENT LESSON */}
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
              Aktualna lekcja
            </div>

            <div
              style={{
                padding: "18px",
                borderRadius: "18px",
                background: "#123524",
                color: "white"
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  marginBottom: "8px"
                }}
              >
                {lessonId}
              </div>

              <div
                style={{
                  opacity: 0.8,
                  fontSize: "14px"
                }}
              >
                {lectures.length} wykładów
              </div>
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
              Moduły / {moduleId} / {lessonId}
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "28px"
              }}
            >
              Lekcja: {lessonId} 📘
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
            <button
              onClick={() => router.back()}
              style={headerButton}
            >
              ← Powrót
            </button>

            <input
              placeholder="Szukaj wykładu..."
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

        {/* MAIN */}
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
              Ładowanie wykładów...
            </div>
          ) : lectures.length === 0 ? (
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
              Brak wykładów w tej lekcji
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px"
              }}
            >
              {lectures.map((lecture) => (
                <div
                  key={lecture.lecture_Id}
                  style={{
                    background: "white",
                    borderRadius: "26px",
                    padding: "28px",
                    border: "1px solid #e5ece7",
                    boxShadow:
                      "0 12px 35px rgba(18,53,36,0.05)",
                    display: "flex",
                    flexDirection: "column"
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
                    {lecture.lecture_Name}
                  </h2>

                  <p
                    style={{
                      color: "#6b7b72",
                      marginBottom: "28px"
                    }}
                  >
                    Interaktywny wykład i zadania
                  </p>

                  {/* ACTIONS */}
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginTop: "auto"
                    }}
                  >
                    <button
                      onClick={() =>
                        router.push(
                          `/lecture/${lecture.lecture_Id}`
                        )
                      }
                      style={primaryButton}
                    >
                      Otwórz
                    </button>

                    <button
                      onClick={() =>
                        router.push(
                          `/kreator?lecture=${lecture.lecture_Id}&lesson=${lessonId}&module=${moduleId}`
                        )
                      }
                      style={secondaryButton}
                    >
                      Edytuj
                    </button>
                  </div>
                </div>
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

const primaryButton = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#123524",
  color: "white",
  fontWeight: 700,
  cursor: "pointer"
};

const secondaryButton = {
  flex: 1,
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #dce5de",
  background: "white",
  color: "#123524",
  fontWeight: 700,
  cursor: "pointer"
};