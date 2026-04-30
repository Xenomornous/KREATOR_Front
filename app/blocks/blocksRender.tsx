"use client";

export default function BlockRenderer({ block, onChange }: any) {
  const data = block.content;

  const wrap = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box" as const,
    overflow: "hidden"
  };

  const input = {
    width: "100%",
    minWidth: 0,
    boxSizing: "border-box" as const,
    padding: "8px",
    marginBottom: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  };

  const row = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "6px",
    minWidth: 0
  };

  // =========================
  // TEXT
  // =========================
  if (block.type === "text") {
    return (
      <div style={wrap}>
        <input
          value={data.description}
          onChange={(e) =>
            onChange({ ...data, description: e.target.value })
          }
          style={{ ...input, fontWeight: "bold" }}
        />

        <input
          value={data.answer}
          readOnly
          style={{
            ...input,
            background: "#f9f9f9"
          }}
        />
      </div>
    );
  }

  // =========================
  // RADIO
  // =========================
  if (block.type === "radio") {
    return (
      <div style={wrap}>
        <input
          value={data.description}
          onChange={(e) =>
            onChange({ ...data, description: e.target.value })
          }
          style={{ ...input, fontWeight: "bold" }}
        />

        {data.options.map((opt: any) => (
          <div key={opt.id} style={row}>
            <input
              type="radio"
              name={block.id}
              checked={data.selected === opt.id}
              onChange={() =>
                onChange({ ...data, selected: opt.id })
              }
            />

            <input
              value={opt.label}
              onChange={(e) =>
                onChange({
                  ...data,
                  options: data.options.map((o: any) =>
                    o.id === opt.id
                      ? { ...o, label: e.target.value }
                      : o
                  )
                })
              }
              style={{ flex: 1, minWidth: 0 }}
            />

            {/* ❌ DELETE OPTION */}
            <button
              onClick={() =>
                onChange({
                  ...data,
                  options: data.options.filter(
                    (o: any) => o.id !== opt.id
                  ),
                  selected:
                    data.selected === opt.id ? "" : data.selected
                })
              }
            >
              ✕
            </button>
          </div>
        ))}

        {/* ➕ ADD OPTION */}
        <button
          onClick={() =>
            onChange({
              ...data,
              options: [
                ...data.options,
                {
                  id: crypto.randomUUID(),
                  label: "Nowa opcja"
                }
              ]
            })
          }
        >
          + Dodaj opcję
        </button>
      </div>
    );
  }

  // =========================
  // CHECKBOX
  // =========================
  if (block.type === "checkbox") {
    return (
      <div style={wrap}>
        <input
          value={data.description}
          onChange={(e) =>
            onChange({ ...data, description: e.target.value })
          }
          style={{ ...input, fontWeight: "bold" }}
        />

        {data.options.map((opt: any) => (
          <div key={opt.id} style={row}>
            <input
              type="checkbox"
              checked={data.selected.includes(opt.id)}
              onChange={() => {
                const is = data.selected.includes(opt.id);
                onChange({
                  ...data,
                  selected: is
                    ? data.selected.filter(
                        (s: string) => s !== opt.id
                      )
                    : [...data.selected, opt.id]
                });
              }}
            />

            <input
              value={opt.label}
              onChange={(e) =>
                onChange({
                  ...data,
                  options: data.options.map((o: any) =>
                    o.id === opt.id
                      ? { ...o, label: e.target.value }
                      : o
                  )
                })
              }
              style={{ flex: 1, minWidth: 0 }}
            />

            {/* ❌ DELETE OPTION */}
            <button
              onClick={() =>
                onChange({
                  ...data,
                  options: data.options.filter(
                    (o: any) => o.id !== opt.id
                  ),
                  selected: data.selected.filter(
                    (s: string) => s !== opt.id
                  )
                })
              }
            >
              ✕
            </button>
          </div>
        ))}

        {/* ➕ ADD OPTION */}
        <button
          onClick={() =>
            onChange({
              ...data,
              options: [
                ...data.options,
                {
                  id: crypto.randomUUID(),
                  label: "Nowa opcja"
                }
              ]
            })
          }
        >
          + Dodaj opcję
        </button>
      </div>
    );
  }

  return <div>Nieznany blok</div>;
}