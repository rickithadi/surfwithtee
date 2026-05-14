import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Surf With Tee – Surf Lessons in Uluwatu, Bali";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photoData = await readFile(
    join(process.cwd(), "public/images/lesson-briefing-1.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(10,32,32,0.82) 0%, rgba(10,112,117,0.70) 55%, rgba(28,43,43,0.80) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "0 80px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#7ECECE",
              fontSize: 20,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: "0 0 28px",
              fontFamily: "sans-serif",
              fontWeight: 400,
            }}
          >
            Uluwatu, Bali · Indonesia
          </p>

          <h1
            style={{
              color: "white",
              fontSize: 100,
              fontWeight: 300,
              margin: 0,
              letterSpacing: "0.06em",
              lineHeight: 1,
            }}
          >
            SURF WITH TEE
          </h1>

          <div
            style={{
              width: 80,
              height: 2,
              background: "#7ECECE",
              margin: "36px auto",
            }}
          />

          <p
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 30,
              fontWeight: 300,
              margin: 0,
              fontFamily: "sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            Private & Group Surf Lessons
          </p>

          <p
            style={{
              color: "#7ECECE",
              fontSize: 20,
              margin: "16px 0 0",
              fontFamily: "sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            surfwithtee.vercel.app
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
