// A solid geometric composition in the brand colours: large circles, half
// discs and blocks, cropped by the frame. Used where a project has no
// screenshot, and as the image of the brand colour blocks. Deterministic:
// the same seed always draws the same picture, on the server and the client.

export type GeoTone = "signal" | "petrol" | "night" | "stone";

const TONES: Record<GeoTone, { bg: string; a: string; b: string; c: string }> = {
  signal: { bg: "#ff5b14", a: "#0b0b0c", b: "#ff8a52", c: "#f1efea" },
  petrol: { bg: "#063f48", a: "#ff5b14", b: "#0b5864", c: "#f1efea" },
  night: { bg: "#0b0b0c", a: "#ff5b14", b: "#2a2a2d", c: "#f1efea" },
  stone: { bg: "#e4e1da", a: "#0b0b0c", b: "#f1efea", c: "#ff5b14" },
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Four compositions on a 160 x 100 field (16:10). Each uses the tone's two
// shape colours and, sparingly, the third as a small counterweight.
function Layout({ n, t }: { n: number; t: (typeof TONES)[GeoTone] }) {
  switch (n) {
    case 0:
      return (
        <>
          <circle cx="118" cy="96" r="62" fill={t.b} />
          <path d="M118 34 A62 62 0 0 1 180 96 L118 96 Z" fill={t.a} />
          <rect x="16" y="16" width="30" height="30" fill={t.c} />
        </>
      );
    case 1:
      return (
        <>
          <path d="M0 0 H70 A70 70 0 0 1 0 70 Z" fill={t.a} />
          <rect x="86" y="58" width="74" height="42" fill={t.b} />
          <circle cx="123" cy="58" r="21" fill={t.c} />
        </>
      );
    case 2:
      return (
        <>
          <circle cx="56" cy="50" r="44" fill={t.b} />
          <circle cx="104" cy="50" r="44" fill={t.a} />
          <path d="M80 13.1 A44 44 0 0 1 80 86.9 A44 44 0 0 1 80 13.1 Z" fill={t.c} />
        </>
      );
    default:
      return (
        <>
          <rect x="16" y="62" width="26" height="38" fill={t.b} />
          <rect x="48" y="40" width="26" height="60" fill={t.b} />
          <rect x="80" y="18" width="26" height="82" fill={t.a} />
          <circle cx="136" cy="30" r="14" fill={t.c} />
        </>
      );
  }
}

// The homepage hero's block (5:6): orange, a lighter quarter disc in the top
// corner and a petrol half disc on the edge. The screenshot covers its lower
// left, so the shapes sit where they stay visible. No black shape touches the
// edge: on the black hero it would read as a notch cut out of the block.
export function HeroArt() {
  return (
    <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" className="block size-full" aria-hidden="true">
      <rect width="100" height="120" fill="#ff5b14" />
      <path d="M100 0 V58 A58 58 0 0 1 42 0 Z" fill="#ff8a52" />
      <path d="M100 70 A22 22 0 0 0 100 114 Z" fill="#063f48" />
      <rect x="10" y="10" width="14" height="14" fill="#f1efea" />
    </svg>
  );
}

export function GeoArt({
  seed,
  tone,
  variant,
  className = "",
  label,
}: {
  seed: string;
  tone: GeoTone;
  // Picks the composition directly (0-7; 4-7 are 0-3 mirrored). Without it,
  // the seed picks one.
  variant?: number;
  className?: string;
  label?: string;
}) {
  const t = TONES[tone];
  const v = (variant ?? hash(seed)) % 8;
  const n = v % 4;
  const mirrored = v >= 4;
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      className={`block size-full ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect width="160" height="100" fill={t.bg} />
      <g transform={mirrored ? "translate(160 0) scale(-1 1)" : undefined}>
        <Layout n={n} t={t} />
      </g>
    </svg>
  );
}
