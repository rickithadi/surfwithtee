import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "#0A7075",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Wave arc */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          {/* T stem */}
          <rect x="9.5" y="7" width="3" height="11" rx="1" fill="white" />
          {/* T crossbar */}
          <rect x="4" y="4" width="14" height="3" rx="1" fill="white" />
          {/* Wave underline */}
          <path
            d="M4 19 Q7 17 11 19 Q15 21 18 19"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
