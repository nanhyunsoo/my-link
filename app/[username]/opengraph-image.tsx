import { ImageResponse } from "next/og";
import { getUserProfileById } from "@/lib/user";

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
  let userData = null;
  try {
    userData = await getUserProfileById(username);
  } catch (error) {
    console.error("Error fetching user profile for OG:", error);
  }
  
  const displayName = userData?.profile?.name || username;
  const userId = userData?.profile?.id || username;

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
              fontSize: "100px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
            }}
          >
            {displayName}&apos;S
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px" }}>
            <span
              style={{
                fontSize: "100px",
                fontWeight: 900,
                color: "white",
                backgroundColor: "#2563EB", // Standard primary blue
                padding: "0 20px",
                fontStyle: "italic",
                textTransform: "uppercase",
              }}
            >
              IDENTITY.
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
                fontSize: "36px",
                fontWeight: 900,
                color: "white",
                margin: 0,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              mylink.com/@{userId}
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.6)",
                margin: 0,
                letterSpacing: "0.02em",
                fontStyle: "italic",
              }}
            >
              The developer&apos;s link page.
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
