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
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "130px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
            }}
          >
            DEVELOPMENT
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            <span
              style={{
                fontSize: "130px",
                fontWeight: 900,
                color: "white",
                marginRight: "20px",
                textTransform: "uppercase",
              }}
            >
              IN
            </span>
            <span
              style={{
                fontSize: "130px",
                fontWeight: 900,
                color: "white",
                backgroundColor: "#2563EB", // Standard primary blue
                padding: "0 20px",
                fontStyle: "italic",
                textTransform: "uppercase",
              }}
            >
              ONE LINK.
            </span>
          </div>
          
          <div
            style={{
              marginTop: "60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              GitHub, Blog, Portfolio.
            </p>
            <p
              style={{
                fontSize: "32px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              All links for developers in a single page.
            </p>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
