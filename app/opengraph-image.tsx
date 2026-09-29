import { ImageResponse } from "next/og";

export const alt = "Mandar Joshi, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#eeeee8",
        color: "#141414",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#55554f" }}>
        Mandar Joshi, full-stack developer
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          maxWidth: 900,
        }}
      >
        I build the parts of web apps that have to be right.
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
        <div style={{ width: 48, height: 4, background: "#d8321e" }} />
        mandarjoshi.vercel.app
      </div>
    </div>,
    size,
  );
}
