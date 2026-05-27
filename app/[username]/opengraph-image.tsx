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
              fontSize: "80px",
              fontWeight: 900,
              color: "white",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.05em",
              textAlign: "center",
              fontStyle: "italic",
              textTransform: "uppercase",
            }}
          >
            {displayName}의 <br />
            <span style={{ color: "#FFFFFF", background: "rgba(255,255,255,0.1)", padding: "0 10px" }}>마이링크</span>
          </h1>
          
          <div
            style={{
              marginTop: "48px",
              padding: "14px 28px",
              backgroundColor: "white",
              display: "flex",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "black",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              mylink.com/@{userId}
            </span>
          </div>
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
            The Developer's Identity
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
