// Shared pieces for the generated favicon/app icon (app/icon.tsx, app/apple-icon.tsx).
// Built with plain flexbox divs since these render through Satori (next/og's
// ImageResponse), which only understands a flexbox subset of CSS.

export function CloudGlyph({ scale }: { scale: number }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end" }}>
      <div
        style={{
          width: 14 * scale,
          height: 14 * scale,
          borderRadius: "50%",
          background: "#f4f6f2",
          marginRight: -4 * scale,
        }}
      />
      <div
        style={{
          width: 20 * scale,
          height: 20 * scale,
          borderRadius: "50%",
          background: "#f4f6f2",
          marginBottom: -2 * scale,
        }}
      />
      <div
        style={{
          width: 14 * scale,
          height: 14 * scale,
          borderRadius: "50%",
          background: "#f4f6f2",
          marginLeft: -4 * scale,
        }}
      />
    </div>
  );
}

export function BuildingGlyph({ scale }: { scale: number }) {
  const rows = 3;
  const cols = 4;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2 * scale,
        background: "#10203a",
        padding: 6 * scale,
        borderTopLeftRadius: 3 * scale,
        borderTopRightRadius: 3 * scale,
      }}
    >
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} style={{ display: "flex", gap: 2 * scale }}>
          {Array.from({ length: cols }).map((_, col) => (
            <div
              key={col}
              style={{
                width: 6 * scale,
                height: 6 * scale,
                background: "#ffcf5c",
                borderRadius: 1 * scale,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
