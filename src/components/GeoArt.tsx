// A solid geometric composition in the brand colours: large circles, half
// discs and blocks, cropped by the frame. Used as the image of the brand
// colour blocks (Solutions, the /work call to action); project placeholders
// use ProjectArt below. Deterministic:
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

// ── Project placeholders ───────────────────────────────────────
// A project without a screenshot gets its own composition, described as data
// in src/data/projects.ts (`art`). Each kind is a different way of building a
// picture (a field of dots, one diagonal cut, a bar chart, stacked capsules, a
// tile mosaic, concentric rings, nested arches), not the same shapes moved
// around, so no two cards in the grid read as the same pattern. All drawn on
// a 160 x 100 field (16:10), cropped from the centre in wider frames.

export const ART_COLORS = {
  signal: "#ff5b14",
  signal2: "#ff8a52",
  ink: "#0b0b0c",
  night3: "#2a2a2d",
  stone: "#f1efea",
  stone2: "#e4e1da",
  petrol: "#063f48",
  petrol2: "#0b5864",
} as const;

export type ArtColor = keyof typeof ART_COLORS;

// Tile of a mosaic: [tile colour, shape colour, shape]. Shapes: q0-q3 a
// quarter disc anchored in a corner (top-left, top-right, bottom-right,
// bottom-left), h0-h3 a half disc on a side (top, right, bottom, left),
// "c" a full disc, "e" an empty tile.
export type MosaicTile = [ArtColor, ArtColor, string];

export type ArtSpec =
  // A field of small dots or squares; some cells picked out in accent colours.
  | { kind: "dots"; bg: ArtColor; dot: ArtColor; cols: number; rows: number; size: number; square?: boolean; hi: number[]; hiColor: ArtColor; hi2?: number[]; hi2Color?: ArtColor }
  // One bold diagonal cut across the field, a band along the cut, one small mark.
  | { kind: "diagonal"; bg: ArtColor; cut: ArtColor; band: ArtColor; mark: ArtColor; flip?: boolean }
  // A bar chart: bars rising from the bottom, one picked out, and optionally a
  // large disc cropped by the top-left corner.
  | { kind: "bars"; bg: ArtColor; bar: ArtColor; accent: ArtColor; heights: number[]; accentIndex: number; coin?: ArtColor }
  // Horizontal capsules of different lengths; a two-colour one reads as a pill.
  | { kind: "pills"; bg: ArtColor; rows: { x: number; w: number; c: ArtColor; c2?: ArtColor }[] }
  // A grid of square tiles, each with a quarter disc, half disc or disc.
  | { kind: "mosaic"; tiles: MosaicTile[] }
  // Concentric rings around one point, filled from the outside in.
  | { kind: "rings"; bg: ArtColor; cx: number; cy: number; step: number; colors: ArtColor[]; mark?: ArtColor }
  // Nested arches standing on the bottom edge.
  | { kind: "arches"; bg: ArtColor; cx: number; step: number; colors: ArtColor[] };

const col = (c: ArtColor) => ART_COLORS[c];

function Dots({ s }: { s: Extract<ArtSpec, { kind: "dots" }> }) {
  const cw = 160 / s.cols;
  const ch = 100 / s.rows;
  const d = Math.min(cw, ch) * s.size;
  const cells = [];
  for (let i = 0; i < s.cols * s.rows; i++) {
    const x = (i % s.cols) * cw + cw / 2;
    const y = Math.floor(i / s.cols) * ch + ch / 2;
    const c = s.hi.includes(i) ? s.hiColor : s.hi2?.includes(i) && s.hi2Color ? s.hi2Color : s.dot;
    cells.push(
      s.square ? (
        <rect key={i} x={x - d / 2} y={y - d / 2} width={d} height={d} fill={col(c)} />
      ) : (
        <circle key={i} cx={x} cy={y} r={d / 2} fill={col(c)} />
      ),
    );
  }
  return <>{cells}</>;
}

function Diagonal({ s }: { s: Extract<ArtSpec, { kind: "diagonal" }> }) {
  return (
    <g transform={s.flip ? "translate(160 0) scale(-1 1)" : undefined}>
      <polygon points="64,100 164,0 164,100" fill={col(s.cut)} />
      <polygon points="44,100 144,0 164,0 64,100" fill={col(s.band)} />
      <circle cx="30" cy="30" r="11" fill={col(s.mark)} />
    </g>
  );
}

function Bars({ s }: { s: Extract<ArtSpec, { kind: "bars" }> }) {
  const n = s.heights.length;
  const pad = 14;
  const gap = 6;
  const w = (160 - pad * 2 - gap * (n - 1)) / n;
  return (
    <>
      {s.coin && <circle cx="22" cy="18" r="30" fill={col(s.coin)} />}
      {s.heights.map((h, i) => {
        const x = pad + i * (w + gap);
        const y = 100 - h * 100;
        return <rect key={i} x={x} y={y} width={w} height={100 - y} fill={col(i === s.accentIndex ? s.accent : s.bar)} />;
      })}
    </>
  );
}

function Pills({ s }: { s: Extract<ArtSpec, { kind: "pills" }> }) {
  const rh = 100 / s.rows.length;
  const h = rh * 0.62;
  return (
    <>
      {s.rows.map((r, i) => {
        const y = i * rh + (rh - h) / 2;
        return (
          <g key={i}>
            <rect x={r.x} y={y} width={r.w} height={h} rx={h / 2} fill={col(r.c)} />
            {r.c2 && (
              <path
                d={`M${r.x + r.w / 2} ${y} H${r.x + r.w - h / 2} A${h / 2} ${h / 2} 0 0 1 ${r.x + r.w - h / 2} ${y + h} H${r.x + r.w / 2} Z`}
                fill={col(r.c2)}
              />
            )}
          </g>
        );
      })}
    </>
  );
}

function MosaicShape({ x, y, t, shape, fill }: { x: number; y: number; t: number; shape: string; fill: string }) {
  const r = t;
  const h = t / 2;
  switch (shape) {
    case "q0":
      return <path d={`M${x} ${y} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + r} Z`} fill={fill} />;
    case "q1":
      return <path d={`M${x + t} ${y} V${y + r} A${r} ${r} 0 0 1 ${x} ${y} Z`} fill={fill} />;
    case "q2":
      return <path d={`M${x + t} ${y + t} H${x} A${r} ${r} 0 0 1 ${x + t} ${y} Z`} fill={fill} />;
    case "q3":
      return <path d={`M${x} ${y + t} V${y} A${r} ${r} 0 0 1 ${x + t} ${y + t} Z`} fill={fill} />;
    case "h0":
      return <path d={`M${x} ${y} H${x + t} A${h} ${h} 0 0 1 ${x} ${y} Z`} fill={fill} />;
    case "h1":
      return <path d={`M${x + t} ${y} V${y + t} A${h} ${h} 0 0 1 ${x + t} ${y} Z`} fill={fill} />;
    case "h2":
      return <path d={`M${x + t} ${y + t} H${x} A${h} ${h} 0 0 1 ${x + t} ${y + t} Z`} fill={fill} />;
    case "h3":
      return <path d={`M${x} ${y + t} V${y} A${h} ${h} 0 0 1 ${x} ${y + t} Z`} fill={fill} />;
    case "c":
      return <circle cx={x + h} cy={y + h} r={h * 0.8} fill={fill} />;
    default:
      return null;
  }
}

// Four columns of 40-unit tiles; three rows, centred, so the top and bottom
// rows are cropped by the same amount.
function Mosaic({ s }: { s: Extract<ArtSpec, { kind: "mosaic" }> }) {
  const t = 40;
  return (
    <>
      {s.tiles.map(([bg, fg, shape], i) => {
        const x = (i % 4) * t;
        const y = Math.floor(i / 4) * t - 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={t + 0.5} height={t + 0.5} fill={col(bg)} />
            {/* A hairline stroke in the same colour hides the anti-aliasing
                seam where a shape's straight edge meets the next tile. */}
            <g stroke={col(fg)} strokeWidth={0.4}>
              <MosaicShape x={x} y={y} t={t} shape={shape} fill={col(fg)} />
            </g>
          </g>
        );
      })}
    </>
  );
}

function Rings({ s }: { s: Extract<ArtSpec, { kind: "rings" }> }) {
  const n = s.colors.length;
  return (
    <>
      {s.colors.map((c, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={(n - i) * s.step} fill={col(c)} />
      ))}
      {s.mark && <rect x={16} y={24} width={12} height={12} fill={col(s.mark)} />}
    </>
  );
}

function Arches({ s }: { s: Extract<ArtSpec, { kind: "arches" }> }) {
  const n = s.colors.length;
  return (
    <>
      {s.colors.map((c, i) => {
        const r = (n - i) * s.step;
        return <path key={i} d={`M${s.cx - r} 100 A${r} ${r} 0 0 1 ${s.cx + r} 100 Z`} fill={col(c)} />;
      })}
    </>
  );
}

function ArtBody({ spec }: { spec: ArtSpec }) {
  switch (spec.kind) {
    case "dots":
      return <Dots s={spec} />;
    case "diagonal":
      return <Diagonal s={spec} />;
    case "bars":
      return <Bars s={spec} />;
    case "pills":
      return <Pills s={spec} />;
    case "mosaic":
      return <Mosaic s={spec} />;
    case "rings":
      return <Rings s={spec} />;
    case "arches":
      return <Arches s={spec} />;
  }
}

export function ProjectArt({ spec, className = "" }: { spec: ArtSpec; className?: string }) {
  const bg = spec.kind === "mosaic" ? ART_COLORS.ink : col(spec.bg);
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      className={`block size-full ${className}`}
      aria-hidden="true"
      data-art={spec.kind}
    >
      <rect width="160" height="100" fill={bg} />
      <ArtBody spec={spec} />
    </svg>
  );
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

export function GeoArt({ seed, tone, className = "" }: { seed: string; tone: GeoTone; className?: string }) {
  const t = TONES[tone];
  // The seed picks one of eight compositions (4-7 are 0-3 mirrored).
  const v = hash(seed) % 8;
  const n = v % 4;
  const mirrored = v >= 4;
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid slice"
      className={`block size-full ${className}`}
      aria-hidden="true"
    >
      <rect width="160" height="100" fill={t.bg} />
      <g transform={mirrored ? "translate(160 0) scale(-1 1)" : undefined}>
        <Layout n={n} t={t} />
      </g>
    </svg>
  );
}
