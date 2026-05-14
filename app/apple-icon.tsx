import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(145deg, #0A8A8F 0%, #0A7075 50%, #065052 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        <svg
          width="110"
          height="110"
          viewBox="0 0 110 110"
          fill="none"
        >
          {/* T crossbar */}
          <rect x="18" y="20" width="74" height="16" rx="6" fill="white" />
          {/* T stem */}
          <rect x="47" y="34" width="16" height="52" rx="6" fill="white" />
          {/* Wave */}
          <path
            d="M16 96 Q28 86 40 96 Q52 106 64 96 Q76 86 94 96"
            stroke="rgba(255,255,255,0.50)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
