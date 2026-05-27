import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "MyLink";
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
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          border: "20px solid white",
        }}
      >
        <h1 style={{ fontSize: "128px", fontWeight: "900", fontStyle: "italic" }}>
          MyLink
        </h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
