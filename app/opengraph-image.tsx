import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "MyLink - Development in One Link";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D0D0D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          border: "24px solid white",
          position: "relative",
        }}
      >
        {/* Main Content Box Container to handle the offset shadow */}
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          {/* Subtle Offset Shadow */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              width: "100%",
              height: "100%",
              border: "8px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "transparent",
            }}
          />

          {/* Central Black Box */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "8px solid white",
              padding: "80px 100px",
              backgroundColor: "#0D0D0D",
              zIndex: 1,
            }}
          >
            <h1
              style={{
                fontSize: "140px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                lineHeight: 0.8,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
            >
              MyLink
            </h1>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 400,
                color: "white",
                margin: "40px 0 0 0",
                letterSpacing: "0.6em",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              Development in One Link
            </p>
          </div>
        </div>

        {/* Footer: Powered by ASALDESIGN */}
        <div
          style={{
            position: "absolute",
            bottom: "64px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div style={{ width: "60px", height: "2px", backgroundColor: "white" }} />
          <span
            style={{
              color: "white",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}
          >
            Powered by ASALDESIGN
          </span>
          <div style={{ width: "60px", height: "2px", backgroundColor: "white" }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
