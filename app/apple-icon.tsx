import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const src = `${base}/images/logo.jpg`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 36,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt="beercoder logo"
          width={180}
          height={180}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    ),
    { ...size }
  );
}
