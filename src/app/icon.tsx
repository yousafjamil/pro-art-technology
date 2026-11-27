import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// The logo mark: the initials in black on a solid orange square.
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
          background: "#ff5b14",
          color: "#0b0b0c",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        PA
      </div>
    ),
    size,
  );
}
