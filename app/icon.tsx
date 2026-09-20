import { ImageResponse } from "next/og";
import { BuildingGlyph } from "@/components/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Browser-tab favicon: too small (32px) for the "BUILDOLOGY" wordmark or the
// "AI CONSTRUCTION COMPANY" tagline to ever be legible, so this is glyph-only.
// The full lockup lives in apple-icon.tsx, where there's room to read it.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #ff7a3d 0%, #ff5a1f 100%)",
          borderRadius: 6,
        }}
      >
        <BuildingGlyph scale={0.55} />
      </div>
    ),
    { ...size },
  );
}
