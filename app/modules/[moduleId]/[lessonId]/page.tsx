"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LessonDetail = {
  lesson_Id: string;
  lesson_Name: string;
  content?: string; // Zakładam, że lekcja ma jakąś treść
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  
  // Pobieramy oba ID z URL
  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLessonData() {
      try {
        // Zmień endpoint na taki, który zwraca pojedynczą lekcję po jej ID
        const res = await fetch(`https://localhost:7294/api/lessons/details/${lessonId}`);
        if (!res.ok) throw new Error("Nie udało się pobrać lekcji");
        
        const data = await res.json();
        setLesson(data);
      } catch (err) {
        console.error("ERROR FETCH LESSON:", err);
      } finally {
        setLoading(false);
      }
    }

    if (lessonId) fetchLessonData();
  }, [lessonId]);

  if (loading) return <div style={{ padding: "20px" }}>Ładowanie treści lekcji...</div>;
  if (!lesson) return <div style={{ padding: "20px" }}>Nie znaleziono lekcji.</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {/* HEADER */}
      <div style={{
        height: "60px",
        background: "white",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "20px"
      }}>
        <button 
          onClick={() => router.back()}
          style={{ cursor: "pointer", border: "none", background: "none", fontSize: "16px" }}
        >
          ← Powrót do modułu
        </button>
        <h2 style={{ fontSize: "18px", margin: 0 }}>{lesson.lesson_Name}</h2>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", background: "white", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h1>{lesson.lesson_Name}</h1>
        <hr style={{ margin: "20px 0", opacity: 0.2 }} />
        
        <div style={{ lineHeight: "1.6", fontSize: "18px" }}>
          {/* Tutaj wyświetlasz treść lekcji z bazy danych */}
          {lesson.content || "Ta lekcja nie ma jeszcze treści."}
        </div>
      </div>
    </div>
  );
}