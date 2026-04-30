"use client";
import { useState } from "react";
import { blockTypes } from "@/app/blocks/blocks";
import BlockRenderer from "@/app/blocks/blocksRender";

type Block = {
  id: string;
  type: string;
  content: any;
};

export default function Kreator() {
  const [slots, setSlots] = useState<(Block | null)[]>(Array(10).fill(null));

  function handleAdd(type: string, index: number) {
    const blockDef = blockTypes.find((b) => b.type === type);
    if (!blockDef) return;

    setSlots((prev) => {
      const next = [...prev];

      const newBlock: Block = {
        id: crypto.randomUUID(),
        type,
        content: structuredClone(blockDef.defaultContent)
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

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        height: "100vh",
        overflow: "hidden"
      }}
    >

      {/* LEFT */}
      <div
        style={{
          borderRight: "1px solid #ddd",
          padding: "10px",
          overflowY: "auto"
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
              background: "white"
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
          minWidth: 0
        }}
      >
        <h3>Grid</h3>

        <div
          style={{
            display: "grid",
            gridTemplateRows: "repeat(10, minmax(120px, auto))",
            gap: "12px"
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
                minWidth: 0
              }}
            >
              {block ? (
                <div
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("blockId", block.id)
                  }
                  style={{
                    minWidth: 0,
                    overflow: "hidden"
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>{block.type}</div>

                  <BlockRenderer
                    block={block}
                    onChange={(newContent: any) => {
                      setSlots((prev) =>
                        prev.map((b) =>
                          b?.id === block.id
                            ? { ...b, content: newContent }
                            : b
                        )
                      );
                    }}
                  />

                  {/* ✅ USUŃ BLOK */}
                  <button
                    onClick={() =>
                      setSlots((prev) =>
                        prev.map((b) =>
                          b?.id === block.id ? null : b
                        )
                      )
                    }
                    style={{
                      marginTop: "8px",
                      background: "#e2e2e2",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      cursor: "pointer"
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
    </div>
  );
}