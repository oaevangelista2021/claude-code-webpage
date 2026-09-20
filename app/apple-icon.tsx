import { ImageResponse } from "next/og";
import { CloudGlyph, BuildingGlyph } from "@/components/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Full lockup: tagline sits between the wordmark and the building (not
// overlapping its windows, as in the original graphic), since there's
// enough room at 180px for the whole thing to stay legible.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(160deg, #ff7a3d 0%, #ff5a1f 100%)",
          padding: "16px 12px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CloudGlyph scale={1} />
          <div
            style={{
              marginTop: 6,
              fontSize: 24,
              fontWeight: 700,
              color: "#f4f6f2",
              letterSpacing: -0.5,
            }}
          >
            BUILDOLOGY
          </div>
          <div
            style={{
              marginTop: 2,
              fontSize: 8,
              fontWeight: 600,
              color: "#fff4ea",
              letterSpacing: 2,
            }}
          >
            AI CONSTRUCTION COMPANY
          </div>
        </div>
        <BuildingGlyph scale={1.5} />
      </div>
    ),
    { ...size },
  );
}
