"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Lesson = {
  lesson_Id: string;
  lesson_Name: string;
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch(
          `https://localhost:7294/api/lessons/user1/${moduleId}`
        );

        const data = await res.json();
        setLessons(data);
      } catch (err) {
        console.error("ERROR FETCH LESSONS:", err);
      } finally {
        setLoading(false);
      }
    }

    if (moduleId) fetchLessons();
  }, [moduleId]);

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
        <div style={{ fontWeight: "bold" }}>
          📚 Moduł: {moduleId}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
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
        ) : lessons.length === 0 ? (
          <div>Brak lekcji</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 200px)",
              gap: "30px"
            }}
          >
            {lessons.map((lesson) => (
              <Link
                key={lesson.lesson_Id}
                href={`/modules/${moduleId}/${lesson.lesson_Id}`}
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
                  <h3>{lesson.lesson_Name}</h3>
                  <p style={{ opacity: 0.6 }}>Wejdź do lekcji</p>

                  {/* EDIT BUTTON */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(
                        `/kreator?lesson=${lesson.lesson_Id}&module=${moduleId}`
                      );
                    }}
                    style={{
                      marginTop: "10px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      background: "white",
                      cursor: "pointer"
                    }}
                  >
                    Edytuj lekcję
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}