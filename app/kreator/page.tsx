"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { blockTypes } from "@/app/blocks/blocks";
import BlockRenderer from "@/app/blocks/blocksRender";

type Block = {
  id: string;
  type: string;
  content: any;
};

export default function Kreator() {
  const searchParams = useSearchParams();

  // ✅ POPRAWKA: query params zamiast useParams
  const lectureId = searchParams.get("lecture") || "";
  const moduleId = searchParams.get("module") || "";
  const lessonId = searchParams.get("lesson") || "";

  const [slots, setSlots] = useState<(Block | null)[]>(Array(10).fill(null));

  useEffect(() => {
    if (!lectureId) return;

    const load = async () => {
      try {
        const res = await fetch(
          `https://localhost:7294/api/lectures_json/${lectureId}`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (!data.lecture_json) return;

        const parsed = JSON.parse(data.lecture_json);

        if (!parsed.blocks) return;

        const newSlots: (Block | null)[] = Array(10).fill(null);

        parsed.blocks.forEach((b: any) => {
          newSlots[b.position] = {
            id: b.id,
            type: b.type,
            content: b.content,
          };
        });

        setSlots(newSlots);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      }
    };

    load();
  }, [lectureId]);

  function handleAdd(type: string, index: number) {
    const blockDef = blockTypes.find((b) => b.type === type);
    if (!blockDef) return;

    setSlots((prev) => {
      const next = [...prev];

      const newBlock: Block = {
        id: crypto.randomUUID(),
        type,
        content: structuredClone(blockDef.defaultContent),
      };

      const temp = next[index];
      next[index] = newBlock;

      if (temp) {
        const freeIndex = next.findIndex((b) => b === null);
        if (freeIndex !== -1) next[freeIndex] = temp;
      }

      return next;
    });
  }

  function handleMove(fromId: string, toIndex: number) {
    setSlots((prev) => {
      const next = [...prev];

      const fromIndex = next.findIndex((b) => b?.id === fromId);
      if (fromIndex === -1) return prev;

      const temp = next[toIndex];
      next[toIndex] = next[fromIndex];
      next[fromIndex] = temp;

      return next;
    });
  }

  async function handleSave() {
    const userDEBUG = "user1";

    if (!lectureId) {
      console.error("❌ lectureId is missing");
      return;
    }

    const blocks = slots
      .filter((b): b is Block => b !== null)
      .map((block, index) => ({
        id: block.id,
        type: block.type,
        position: index,
        content: block.content,
      }));

    const payload = {
      lecture_id: lectureId,
      lecture_name: "Grammar",
      mod_user: userDEBUG,
      lecture_json: JSON.stringify({ blocks }),
    };

    try {
      const res = await fetch("https://localhost:7294/api/lectures_json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      showToast("Zapisano lecture_json", "success");
    } catch (err) {
      showToast("Błąd zapisu danych", "error");
    }
  }

  // TOAST
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | null }>({
  message: "",
  type: null,
});

function showToast(message: string, type: "success" | "error") {
  setToast({ message, type });

  setTimeout(() => {
    setToast({ message: "", type: null });
  }, 5000);
}

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          zIndex: 1000,
          padding: "10px 16px",
          background: "#111",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        Zapisz
      </button>

      {/* LEFT */}
      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h3>Bloki</h3>

        {blockTypes.map((b) => (
          <div
            key={b.type}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("type", b.type)}
            style={{
              border: "1px solid #ccc",
              padding: "8px",
              marginBottom: "8px",
              cursor: "grab",
              borderRadius: "6px",
              background: "white",
            }}
          >
            {b.label}
          </div>
        ))}
      </div>

      {/* GRID */}
      <div
        style={{
          padding: "10px",
          overflowY: "auto",
          minWidth: 0,
        }}
      >
        <h3>Grid</h3>

        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(10, minmax(120px, auto))",
            gap: "12px",
          }}
        >
          {slots.map((block, index) => (
            <div
              key={index}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const type = e.dataTransfer.getData("type");
                const blockId = e.dataTransfer.getData("blockId");

                if (type) handleAdd(type, index);
                else if (blockId) handleMove(blockId, index);
              }}
              style={{
                border: "2px dashed #bbb",
                borderRadius: "8px",
                minHeight: "120px",
                padding: "8px",
                background: block ? "white" : "#f7f7f7",
                minWidth: 0,
              }}
            >
              {block ? (
                <div
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("blockId", block.id)
                  }
                  style={{ minWidth: 0, overflow: "hidden" }}
                >
                  <div style={{ fontWeight: "bold" }}>{block.type}</div>

                  <BlockRenderer
                    block={block}
                    onChange={(newContent: any) => {
                      setSlots((prev) =>
                        prev.map((b) =>
                          b?.id === block.id ? { ...b, content: newContent } : b
                        )
                      );
                    }}
                  />

                  <button
                    onClick={() =>
                      setSlots((prev) =>
                        prev.map((b) => (b?.id === block.id ? null : b))
                      )
                    }
                    style={{
                      marginTop: "8px",
                      background: "#999",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Usuń blok
                  </button>
                </div>
              ) : (
                <div style={{ opacity: 0.3 }}>Upuść tutaj</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {toast.type && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "12px 16px",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            background: toast.type === "success" ? "green" : "red",
            zIndex: 9999,
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}