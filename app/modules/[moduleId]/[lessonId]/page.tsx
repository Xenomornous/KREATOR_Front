"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

        if (!res.ok) throw new Error("Nie udało się pobrać lectures");

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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* HEADER */}
      <div
        style={{
          height: "60px",
          background: "white",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: "20px",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "16px",
          }}
        >
          ← Powrót do modułu
        </button>

        <h2 style={{ fontSize: "18px", margin: 0 }}>
          Lekcja: {lessonId}
        </h2>
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        {loading ? (
          <div>Ładowanie...</div>
        ) : lectures.length === 0 ? (
          <div>Brak lectures</div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 200px)",
              gap: "30px",
            }}
          >
            {lectures.map((lecture) => (
              <div
                key={lecture.lecture_Id}
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <h3>{lecture.lecture_Name}</h3>
                <p style={{ opacity: 0.6, margin: 0 }}>Lecture</p>

                {/* EDIT BUTTON */}
                <button
                  onClick={() =>
                    router.push(
                      `/kreator?lecture=${lecture.lecture_Id}&lesson=${lessonId}&module=${moduleId}`
                    )
                  }
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Edytuj
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}