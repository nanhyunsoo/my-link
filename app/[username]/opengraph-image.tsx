import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "MyLink Profile";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { username } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          border: "20px solid white",
        }}
      >
        <h1 style={{ fontSize: "80px", fontWeight: "900", textAlign: "center" }}>
          @{username}의 마이링크
        </h1>
        <div style={{ marginTop: "20px", fontSize: "24px", color: "rgba(255,255,255,0.7)" }}>
          mylink.com/ @{username}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
