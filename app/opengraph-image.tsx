import { ImageResponse } from "next/og";

export const alt = "GN Club: Activations, Events & Full Production";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const INK = "#08090a";
const LIME = "#c6f24e";
const CYAN = "#33c7e0";
const AMBER = "#f2b84e";
const FOG = "#f3f4f0";
const FOG_DIM = "#9a9da3";

const EYEBROW_TEXT = "EVENTS · ACTIVATIONS · WEB3 PRODUCTION";
const WORDMARK_TEXT = "GN CLUB";
const SUBTITLE_TEXT = "Activations, Events & Full Production";

async function loadGoogleFont(font: string, text: string, weight: number) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      // A legacy/non-Chrome UA reliably gets TTF font-src URLs back from the
      // Google Fonts CSS2 API instead of WOFF2, which satori needs.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
    },
  }).then((res) => res.text());

  const fontUrlMatch = css.match(/src: url\(([^)]+)\) format\('(opentype|truetype|woff)'\)/);

  if (!fontUrlMatch) {
    throw new Error(`Could not load font ${font} from Google Fonts`);
  }

  const fontUrl = fontUrlMatch[1];
  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [spaceGroteskBold, interSemiBold, interMedium] = await Promise.all([
    loadGoogleFont("Space Grotesk", WORDMARK_TEXT, 700),
    loadGoogleFont("Inter", EYEBROW_TEXT, 700),
    loadGoogleFont("Inter", SUBTITLE_TEXT, 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: INK,
        }}
      >
        {/* Subtle lime-led radial glow behind the centered content, purely
            a background depth effect — kept low-opacity so it never fights
            text contrast. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `radial-gradient(circle at 50% 45%, ${LIME}2e 0%, ${CYAN}14 38%, ${AMBER}0f 62%, transparent 78%)`,
          }}
        />

        {/* Left edge accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 7,
            display: "flex",
            backgroundColor: LIME,
          }}
        />

        {/* Centered content column */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "0 96px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: LIME,
            }}
          >
            {EYEBROW_TEXT}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 100,
              lineHeight: 1.05,
              color: FOG,
            }}
          >
            {WORDMARK_TEXT}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 760,
              textAlign: "center",
              justifyContent: "center",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 30,
              lineHeight: 1.3,
              color: FOG_DIM,
            }}
          >
            {SUBTITLE_TEXT}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interSemiBold,
          weight: 700,
          style: "normal",
        },
        {
          name: "Inter",
          data: interMedium,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
