import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          background: "transparent",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt="beercoder logo"
          width={64}
          height={64}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>
    ),
    { ...size }
  );
}
