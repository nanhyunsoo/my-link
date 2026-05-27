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
          border: "24px solid white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "8px solid white",
            padding: "60px 80px",
            backgroundColor: "black",
            position: "relative",
          }}
        >
          {/* Offset Shadow effect */}
          <div 
            style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "-20px",
              bottom: "-20px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              zIndex: -1,
            }}
          />
          
          <h1
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}
          >
            MyLink
          </h1>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.7)",
              margin: "24px 0 0 0",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            Development in One Link
          </p>
        </div>
        
        <div 
          style={{
            position: "absolute",
            bottom: "60px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div style={{ width: "40px", height: "2px", backgroundColor: "white" }} />
          <span style={{ color: "white", fontSize: "16px", fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase" }}>
            The Developer's Link Page
          </span>
          <div style={{ width: "40px", height: "2px", backgroundColor: "white" }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
