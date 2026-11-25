import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141516",
          borderRadius: 4,
          color: "#e8e9eb",
          fontSize: 14,
          fontWeight: 500,
          fontFamily: "monospace",
        }}
      >
        PA
      </div>
    ),
    size,
  );
}
