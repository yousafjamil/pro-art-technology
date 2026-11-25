// The parts a project drawing is built from: small line glyphs and the
// screen blocks of src/data/drawings.ts, each drawn into a box in screen
// units. Hairlines only, in the neutral ramp: outlines in muted, secondary
// lines in line-strong, text stand-ins as line-strong bars. No accent, no
// fills beyond the bars, nothing glows.

import type { ReactNode } from "react";
import type { Block, Glyph } from "@/data/drawings";

export const LINE = { fill: "none", vectorEffect: "non-scaling-stroke" as const, strokeWidth: 1 };
export const S1 = "stroke-muted";
export const S2 = "stroke-line-strong";
const BAR = "fill-line-strong";

export type Box = { x: number; y: number; w: number; h: number };
// minScale: the smallest scale this screen is drawn at. Text that would
// come out under 7px there is drawn as a bar instead, so nothing on a
// drawing is an unreadable smudge of letters.
export type Ctx = { minScale: number; uid: string };

// ── Glyphs, on a 24-unit grid ────────────────────────────────

const P = (d: string) => <path d={d} {...LINE} />;
const C = (cx: number, cy: number, r: number) => <circle cx={cx} cy={cy} r={r} {...LINE} />;
const R = (x: number, y: number, w: number, h: number, rx = 0) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} {...LINE} />
);

const GLYPHS: Record<Glyph, ReactNode> = {
  cross: P("M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"),
  drop: P("M12 3C9 7.5 5.5 11 5.5 15a6.5 6.5 0 0 0 13 0C18.5 11 15 7.5 12 3z"),
  heart: P("M12 20s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 5.8-8 11-8 11z"),
  flame: P("M12 2.5c.8 3.6 5.5 5.8 5.5 11.5a5.5 5.5 0 0 1-11 0c0-3 1.6-4.6 2.6-6.8 1 1.6 1.8 2.6 1.8 4.3 1.6-2.2 1.6-5.6 1.1-9z"),
  bolt: P("M13.5 2L5 13.5h6L10 22l9-12h-6.5z"),
  car: <>{P("M2.5 15.5V12l3-4.5h10.5l4 4.5h1.5v3.5M5.5 12H20M9 15.5h6")}{C(7, 15.5, 2)}{C(17, 15.5, 2)}</>,
  suv: <>{P("M2.5 15.5V9.5l2-3.5h12l3 4.5h2v5M2.5 10.5h19M9 15.5h6")}{C(7, 15.5, 2)}{C(17, 15.5, 2)}</>,
  van: <>{P("M2 15.5v-9h13.5l5 5v4M15.5 6.5v5h5M2 11.5h13.5M8.5 15.5h6")}{C(6.5, 15.5, 2)}{C(17, 15.5, 2)}</>,
  phone: <>{R(7, 2.5, 10, 19, 2)}{P("M10.5 18.5h3")}</>,
  sofa: P("M4.5 10V7h15v3M2.5 10.5h4v4h11v-4h4v6h-19zM4.5 16.5v2.5M19.5 16.5v2.5"),
  capsule: <>{R(2.5, 8, 19, 8, 4)}{P("M12 8v8")}</>,
  bell: P("M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15zM10 20.5a2 2 0 0 0 4 0"),
  torch: P("M8 3h8v4l-2 3v11h-4V10L8 7zM8 7h8"),
  vibrate: <>{R(8, 4, 8, 16, 1.5)}{P("M4.5 8v8M19.5 8v8M2 10v4M22 10v4")}</>,
  pin: <>{P("M12 21.5s-6.5-6.6-6.5-11.5a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11.5-6.5 11.5z")}{C(12, 10, 2.2)}</>,
  clock: <>{C(12, 12, 9)}{P("M12 7v5l3.5 2")}</>,
  calendar: <>{R(3, 5, 18, 16, 2)}{P("M3 10h18M8 3v4M16 3v4")}</>,
  bag: P("M5 8h14l-1 13H6zM9 8V6.5a3 3 0 0 1 6 0V8"),
  server: <>{R(4, 4, 16, 6.5, 1)}{R(4, 13.5, 16, 6.5, 1)}{P("M7 7.25h2.5M7 16.75h2.5")}</>,
  code: P("M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"),
  shield: P("M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"),
  box: P("M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"),
  truck: <>{P("M2 6h12v10H2zM14 9.5h4l3 3.5v3h-7")}{C(6, 17.5, 1.8)}{C(17.5, 17.5, 1.8)}</>,
  user: <>{C(12, 8, 4)}{P("M4 21a8 8 0 0 1 16 0")}</>,
  globe: <>{C(12, 12, 9)}{P("M3 12h18M12 3c3.5 3 3.5 15 0 18M12 3c-3.5 3-3.5 15 0 18")}</>,
  chat: P("M4 5h16v11H9.5L4 20z"),
  menu: P("M4 7h16M4 12h16M4 17h10"),
  back: P("M15 5l-7 7 7 7"),
  search: <>{C(10.5, 10.5, 6.5)}{P("M15.5 15.5L21 21")}</>,
  frame: <>{R(3, 3, 18, 18)}{R(6.5, 6.5, 11, 11)}</>,
  swap: P("M4 8h15l-4-4M20 16H5l4 4"),
  spark: P("M12 3l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"),
  home: P("M4 11l8-7 8 7v9.5H4zM10 20.5v-5h4v5"),
  briefcase: <>{R(3, 8, 18, 12, 1.5)}{P("M9 8V5h6v3M3 13h18")}</>,
  trophy: P("M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 20.5h8"),
  watch: <>{C(12, 12, 6)}{P("M9 6.5L9.5 3h5l.5 3.5M9 17.5l.5 3.5h5l.5-3.5M12 9.5V12l1.5 1.5")}</>,
  pulse: P("M2 12h5l2-5 3 10 2.5-7 1.5 2H22"),
  pill: <>{P("M8.5 3.5l12 12a4.2 4.2 0 0 1-6 6l-12-12a4.2 4.2 0 0 1 6-6zM6 12l6-6")}</>,
  store: P("M3 9l1.5-5h15L21 9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M4.5 11.5V20h15v-8.5M10 20v-5h4v5"),
};

export function glyph(g: Glyph, cx: number, cy: number, size: number, cls = S1, key?: React.Key) {
  const k = size / 24;
  return (
    <g key={key} className={cls} transform={`translate(${cx - size / 2} ${cy - size / 2}) scale(${k})`}>
      {GLYPHS[g]}
    </g>
  );
}

// ── Primitives ──────────────────────────────────────────────

function rect(x: number, y: number, w: number, h: number, rx = 3, cls = S2, key?: React.Key) {
  return <rect key={key} x={x} y={y} width={Math.max(0, w)} height={Math.max(0, h)} rx={rx} {...LINE} className={cls} />;
}

function bar(x: number, y: number, w: number, h = 4, key?: React.Key) {
  return <rect key={key} x={x} y={y} width={Math.max(0, w)} height={h} className={BAR} />;
}

function line(d: string, cls = S2, key?: React.Key, dash?: string) {
  return <path key={key} d={d} {...LINE} className={cls} strokeDasharray={dash} />;
}

// An image placeholder: the drafting convention, a box with its diagonals.
function xbox(x: number, y: number, w: number, h: number, key?: React.Key) {
  return (
    <g key={key}>
      {rect(x, y, w, h, 2)}
      {line(`M${x} ${y}L${x + w} ${y + h}M${x + w} ${y}L${x} ${y + h}`)}
    </g>
  );
}

// A photograph: a frame with a horizon and a sun, so photos read as photos.
function photo(x: number, y: number, w: number, h: number, key?: React.Key) {
  const r = Math.max(1.5, Math.min(w, h) * 0.08);
  return (
    <g key={key}>
      {rect(x, y, w, h, 2)}
      {line(
        `M${x} ${y + h * 0.82}L${x + w * 0.32} ${y + h * 0.48}L${x + w * 0.52} ${y + h * 0.68}L${x + w * 0.7} ${y + h * 0.42}L${x + w} ${y + h * 0.78}`,
      )}
      <circle cx={x + w * 0.76} cy={y + h * 0.24} r={r} {...LINE} className={S2} />
    </g>
  );
}

function text(ctx: Ctx, s: string, x: number, y: number, size: number, anchor: "start" | "middle" | "end" = "start", key?: React.Key) {
  if (size * ctx.minScale < 7) {
    const w = s.length * size * 0.6;
    const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
    return bar(x0, y - size * 0.62, w, size * 0.62, key);
  }
  return (
    <text key={key} x={x} y={y} fontSize={size} textAnchor={anchor} className="font-mono fill-muted">
      {s}
    </text>
  );
}

function pill(x: number, y: number, w: number, h: number, cls = S1, key?: React.Key) {
  return (
    <g key={key}>
      {rect(x, y, w, h, h / 2, cls)}
      {bar(x + w * 0.25, y + h / 2 - 1.5, w * 0.5, 3)}
    </g>
  );
}

// ── Blocks ──────────────────────────────────────────────────

export function drawBlock(b: Block, box: Box, ctx: Ctx, key: React.Key): ReactNode {
  const body = inner(b, box, ctx);
  if (b.rtl) {
    return (
      <g key={key} transform={`matrix(-1 0 0 1 ${2 * box.x + box.w} 0)`}>
        {body}
      </g>
    );
  }
  return <g key={key}>{body}</g>;
}

function inner(b: Block, { x, y, w, h }: Box, ctx: Ctx): ReactNode {
  const cy = y + h / 2;
  switch (b.kind) {
    case "appbar": {
      const icons = b.icons ?? [];
      const aiX = x + w - icons.length * 20 - 16;
      return (
        <>
          {b.lead === "logo" ? (
            <>
              {rect(x, cy - 7, 14, 14, 3, S1)}
              {bar(x + 20, cy - 2, 34, 4)}
            </>
          ) : (
            <>
              {b.lead && glyph(b.lead, x + 7, cy, b.lead === "cross" ? 15 : 14)}
              {bar(x + 24, cy - 2, w * 0.3, 4)}
            </>
          )}
          {icons.map((g, i) => glyph(g, x + w - 7 - i * 20, cy, 13, S1, i))}
          {b.ai && (
            <>
              {rect(aiX - 13, cy - 8, 26, 16, 8, S1)}
              {glyph("spark", aiX, cy, 11)}
            </>
          )}
        </>
      );
    }

    case "topbar":
      return (
        <>
          {rect(x, cy - 7, w * 0.42, 14, 7)}
          {glyph("search", x + 10, cy, 9, S2)}
          {bar(x + 20, cy - 1.5, w * 0.18, 3)}
          {glyph("bell", x + w - 46, cy, 11)}
          {glyph("chat", x + w - 28, cy, 11)}
          <circle cx={x + w - 8} cy={cy} r={7} {...LINE} className={S1} />
          {glyph("user", x + w - 8, cy, 9, S2)}
        </>
      );

    case "nav": {
      let r = x + w;
      const parts: ReactNode[] = [];
      if (b.cta) {
        parts.push(pill(r - 36, cy - 7, 36, 14, S1, "cta"));
        r -= 46;
      }
      if (b.cart) {
        parts.push(glyph("bag", r - 7, cy, 13, S1, "cart"));
        parts.push(glyph("user", r - 27, cy, 12, S1, "acct"));
        r -= 44;
      }
      if (b.lang) {
        parts.push(
          <g key="lang">
            {rect(r - 44, cy - 7, 44, 14, 3, S1)}
            {line(`M${r - 22} ${cy - 7}V${cy + 7}`)}
            {text(ctx, "EN", r - 33, cy + 3.5, 10, "middle")}
            {text(ctx, "AR", r - 11, cy + 3.5, 10, "middle")}
          </g>,
        );
        r -= 54;
      }
      for (let i = 0; i < (b.links ?? 0); i++) {
        parts.push(bar(r - 20, cy - 1.5, 20, 3, `l${i}`));
        r -= 28;
      }
      return (
        <>
          {rect(x, cy - 5, 10, 10, 2, S1)}
          {bar(x + 14, cy - 2, 26, 4)}
          {b.search && (
            <>
              {rect(x + 58, cy - 7, w * 0.36, 14, 7)}
              {glyph("search", x + 68, cy, 9, S2)}
              {bar(x + 78, cy - 1.5, w * 0.14, 3)}
            </>
          )}
          {parts}
          {line(`M${x} ${y + h + 3}H${x + w}`)}
        </>
      );
    }

    case "figure":
      return (
        <>
          {rect(x, y, w, h, 6, S1)}
          {bar(x + 12, y + 14, 44, 4)}
          {text(ctx, b.value, x + 12, y + 50, 28)}
          {bar(x + 12, y + h - 20, 56, 3)}
          {bar(x + 12, y + h - 12, 36, 3)}
          {b.action && pill(x + w - 50, y + h - 28, 38, 18, S1)}
        </>
      );

    case "list": {
      const rowH = h / b.rows;
      const rows: ReactNode[] = [];
      for (let i = 0; i < b.rows; i++) {
        const ry = y + i * rowH;
        const rc = ry + rowH / 2;
        const lr = Math.min(rowH * 0.28, 10);
        const lead =
          b.lead === "glyph" && b.glyphs
            ? (
                <g>
                  {rect(x, rc - lr - 1, 2 * lr + 2, 2 * lr + 2, 4)}
                  {glyph(b.glyphs[i % b.glyphs.length], x + lr + 1, rc, lr * 1.3)}
                </g>
              )
            : b.lead === "square"
              ? xbox(x, rc - lr, 2 * lr, 2 * lr)
              : b.lead === "capsule"
                ? (
                    <g>
                      {rect(x, rc - lr * 0.5, lr * 2.4, lr, lr * 0.5, S1)}
                      {line(`M${x + lr * 1.2} ${rc - lr * 0.5}V${rc + lr * 0.5}`, S1)}
                    </g>
                  )
                : <circle cx={x + lr} cy={rc} r={lr} {...LINE} className={S2} />;
        const tx = x + 2 * lr + (b.lead === "capsule" ? 14 : 10);
        let trail: ReactNode = null;
        const value = b.values?.[i] ?? "";
        if (b.trail === "badge") {
          trail = (
            <g>
              {rect(x + w - 34, rc - 9, 34, 18, 9, S1)}
              {text(ctx, value, x + w - 17, rc + 5, 14, "middle")}
            </g>
          );
        } else if (b.trail === "meter") {
          const f = b.fills?.[i] ?? 0.5;
          trail = (
            <g>
              {rect(x + w - 34, rc - 3, 34, 6, 1)}
              {bar(x + w - 34, rc - 3, 34 * f, 6)}
            </g>
          );
        } else if (b.trail === "toggle") {
          const on = i !== 1;
          trail = (
            <g>
              {rect(x + w - 26, rc - 7, 26, 14, 7, S1)}
              <circle cx={on ? x + w - 7 : x + w - 19} cy={rc} r={4.5} {...LINE} className={S1} />
            </g>
          );
        } else if (b.trail === "chevron") {
          trail = line(`M${x + w - 8} ${rc - 4}l4 4-4 4`, S1);
        }
        const tw = x + w - tx - 44;
        rows.push(
          <g key={i}>
            {i > 0 && line(`M${x} ${ry}H${x + w}`)}
            {lead}
            {bar(tx, rc - 5, tw * 0.9, 4)}
            {bar(tx, rc + 3, tw * 0.55, 3)}
            {trail}
          </g>,
        );
      }
      return rows;
    }

    case "chips": {
      const ch = Math.min(h, 24);
      const widths = b.glyphs ? b.glyphs.map(() => 30) : [34, 26, 38, 30, 36].slice(0, b.count ?? 4);
      let cx = x;
      return widths.map((cw, i) => {
        const el = (
          <g key={i}>
            {rect(cx, cy - ch / 2, cw, ch, ch / 2, i === 0 ? S1 : S2)}
            {b.glyphs ? glyph(b.glyphs[i], cx + cw / 2, cy, ch * 0.62, i === 0 ? S1 : S2) : bar(cx + 8, cy - 1.5, cw - 16, 3)}
          </g>
        );
        cx += cw + 6;
        return el;
      });
    }

    case "search":
      return (
        <>
          {rect(x, cy - h / 2, w, h, h / 2)}
          {glyph("search", x + 13, cy, 11, S1)}
          {bar(x + 24, cy - 1.5, w * 0.42, 3)}
        </>
      );

    case "lineChart": {
      const ax = x + 26;
      const top = y + 12;
      const bottom = y + h - 16;
      const right = x + w - 12;
      const pts = b.points.map((v, i) => [ax + ((right - ax) * i) / (b.points.length - 1), bottom - (bottom - top) * v] as const);
      return (
        <>
          {rect(x, y, w, h, 4)}
          {line(`M${ax} ${top}V${bottom}H${right}`, S1)}
          {[0, 1, 2].map((i) => bar(x + 8, top + i * ((bottom - top) / 2) - 1.5, 12, 3, `t${i}`))}
          {pts.map(([px], i) => line(`M${px} ${bottom}v3`, S2, `x${i}`))}
          {line(`M${ax} ${bottom - (bottom - top) * 0.66}H${right}`, S2, "ref", "3 3")}
          <polyline points={pts.map((p) => p.join(",")).join(" ")} {...LINE} className={S1} />
          {pts.map(([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={2} {...LINE} className={S1} />
          ))}
        </>
      );
    }

    case "map": {
      const X = (f: number) => x + w * f;
      const Y = (f: number) => y + h * f;
      const route = b.route.map(([fx, fy]) => `${X(fx)},${Y(fy)}`).join(" ");
      const [sx, sy] = b.route[0];
      const [ex, ey] = b.route[b.route.length - 1];
      return (
        <>
          {rect(x, y, w, h, 4)}
          {line(`M${x} ${Y(0.3)}H${x + w}M${x} ${Y(0.64)}H${x + w}M${X(0.2)} ${y}V${y + h}M${X(0.46)} ${y}V${y + h}M${X(0.74)} ${y}V${y + h}`)}
          {line(`M${X(0.05)} ${y + h}L${X(0.62)} ${y}`, S2, "diag", "2 3")}
          {line(`M${x} ${Y(0.88)}C${X(0.3)} ${Y(0.8)} ${X(0.6)} ${Y(0.95)} ${x + w} ${Y(0.86)}`)}
          <polyline points={route} {...LINE} className={S1} strokeWidth={1.5} />
          <circle cx={X(sx)} cy={Y(sy)} r={4} {...LINE} className={S1} />
          <circle cx={X(sx)} cy={Y(sy)} r={1.5} className="fill-muted" />
          {glyph("pin", X(ex), Y(ey) - 7, 15)}
        </>
      );
    }

    case "floorplan": {
      const racks = b.racks ?? 5;
      const docks = b.docks ?? 6;
      const ix = x + 14;
      const iw = w - 28;
      const top = y + 12;
      const usable = h - 42;
      const pitch = usable / racks;
      const cell = 14;
      const els: ReactNode[] = [];
      for (let r = 0; r < racks; r++) {
        const ry = top + r * pitch;
        const rh = Math.min(10, pitch * 0.5);
        els.push(rect(ix, ry, iw * 0.62, rh, 0, S1, `a${r}`));
        els.push(rect(ix + iw * 0.7, ry, iw * 0.3, rh, 0, S1, `b${r}`));
        let d = "";
        for (let c = ix + cell; c < ix + iw * 0.62; c += cell) d += `M${c} ${ry}v${rh}`;
        for (let c = ix + iw * 0.7 + cell; c < ix + iw; c += cell) d += `M${c} ${ry}v${rh}`;
        els.push(line(d, S2, `c${r}`));
      }
      const dw = 18;
      const dGap = (w - 40 - docks * dw) / (docks - 1);
      for (let i = 0; i < docks; i++) {
        els.push(rect(x + 20 + i * (dw + dGap), y + h - 4, dw, 8, 0, S1, `d${i}`));
      }
      return (
        <>
          {rect(x, y, w, h, 0, S1)}
          {els}
          {line(`M${x + 20 + dw / 2} ${y + h - 6}V${y + h - 22}H${ix + iw * 0.66}V${top + 4}`, S2, "path", "3 3")}
        </>
      );
    }

    case "tiles": {
      const cols = b.cols;
      const rows = b.rows ?? 2;
      const g = b.crop ? 12 : 8;
      const cap = b.caption ? 16 : 0;
      const cw = (w - (cols - 1) * g) / cols;
      const els: ReactNode[] = [];
      const draw = (tx: number, ty: number, tw: number, th: number, k: string) => {
        els.push(b.photo ? photo(tx, ty, tw, th, k) : xbox(tx, ty, tw, th, k));
        if (b.crop) {
          const m = 2;
          const l = 5;
          els.push(
            line(
              `M${tx - m - l} ${ty}h${l}M${tx} ${ty - m - l}v${l}M${tx + tw + m} ${ty}h${l}M${tx + tw} ${ty - m - l}v${l}` +
                `M${tx - m - l} ${ty + th}h${l}M${tx} ${ty + th + m}v${l}M${tx + tw + m} ${ty + th}h${l}M${tx + tw} ${ty + th + m}v${l}`,
              S1,
              `${k}c`,
            ),
          );
        }
        if (b.caption === "price") {
          els.push(bar(tx, ty + th + 5, tw * 0.7, 3, `${k}p`));
          els.push(bar(tx, ty + th + 11, tw * 0.32, 4, `${k}q`));
        } else if (b.caption === "lines") {
          els.push(bar(tx, ty + th + 5, tw * 0.75, 3, `${k}p`));
          els.push(bar(tx, ty + th + 11, tw * 0.45, 3, `${k}q`));
        }
      };
      if (b.masonry) {
        const patterns = [[0.58, 0.42], [0.34, 0.66], [0.5, 0.5], [0.7, 0.3]];
        for (let c = 0; c < cols; c++) {
          let ty = y;
          const pat = patterns[c % patterns.length];
          pat.forEach((f, i) => {
            const th = (h - g) * f;
            draw(x + c * (cw + g), ty, cw, th, `m${c}-${i}`);
            ty += th + g;
          });
        }
      } else {
        const th = (h - (rows - 1) * g - rows * cap) / rows;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) draw(x + c * (cw + g), y + r * (th + cap + g), cw, th, `t${r}-${c}`);
        }
      }
      return els;
    }

    case "steps": {
      const rowH = h / b.count;
      return Array.from({ length: b.count }, (_, i) => {
        const rc = y + i * rowH + 14;
        return (
          <g key={i}>
            <circle cx={x + 9} cy={rc} r={9} {...LINE} className={S1} />
            {text(ctx, String(i + 1), x + 9, rc + 4.5, 13, "middle")}
            {i < b.count - 1 && line(`M${x + 9} ${rc + 9}V${rc + rowH - 9}`)}
            {bar(x + 28, rc - 5, w * 0.36, 4)}
            {bar(x + 28, rc + 3, w * 0.26, 3)}
            {bar(x + 28, rc + 10, w * 0.32, 3)}
            {xbox(x + w - 40, rc - 9, 40, Math.min(rowH - 12, 34))}
          </g>
        );
      });
    }

    case "radar": {
      const cx = x + w / 2;
      const R0 = Math.min(w, h) / 2 - 4;
      const a = (-40 * Math.PI) / 180;
      return (
        <>
          {[1, 0.68, 0.36].map((f) => (
            <circle key={f} cx={cx} cy={cy} r={R0 * f} {...LINE} className={f === 1 ? S1 : S2} />
          ))}
          {line(`M${cx - R0} ${cy}H${cx + R0}M${cx} ${cy - R0}V${cy + R0}`)}
          {line(`M${cx} ${cy}L${cx + R0 * Math.cos(a)} ${cy + R0 * Math.sin(a)}`, S1)}
          <circle cx={cx} cy={cy} r={2} className="fill-muted" />
          <circle cx={cx + R0 * 0.48} cy={cy - R0 * 0.42} r={9} {...LINE} className={S2} strokeDasharray="2 2" />
          {glyph("phone", cx + R0 * 0.48, cy - R0 * 0.42, 12)}
        </>
      );
    }

    case "swap": {
      const bw = (w - 34) / 2;
      const gs = Math.min(h * 0.42, 36);
      const card = (bx: number, g: Glyph, k: string) => (
        <g key={k}>
          {rect(bx, y, bw, h, 6)}
          {glyph(g, bx + bw / 2, y + h * 0.4, gs)}
          {bar(bx + 8, y + h - 20, bw * 0.62, 3)}
          {bar(bx + 8, y + h - 13, bw * 0.38, 3)}
        </g>
      );
      return (
        <>
          {card(x, b.left, "l")}
          {card(x + w - bw, b.right, "r")}
          <circle cx={x + w / 2} cy={y + h * 0.4} r={12} {...LINE} className={S1} />
          {glyph("swap", x + w / 2, y + h * 0.4, 15)}
        </>
      );
    }

    case "button":
      return (
        <>
          {rect(x, cy - h / 2, w, h, h / 2, S1)}
          {b.glyph && glyph(b.glyph, x + w / 2 - 26, cy, h * 0.5)}
          {bar(x + w / 2 - 14, cy - 2, 40, 4)}
        </>
      );

    case "tabbar": {
      const n = b.glyphs.length;
      return (
        <>
          {line(`M${x - 12} ${y}H${x + w + 12}`)}
          {b.glyphs.map((g, i) => {
            const gx = x + (w * (i + 0.5)) / n;
            return (
              <g key={i}>
                {glyph(g, gx, y + h / 2, 13, i === 0 ? S1 : S2)}
                {i === 0 && bar(gx - 5, y + h - 2, 10, 2)}
              </g>
            );
          })}
        </>
      );
    }

    case "hero": {
      const image = b.image ?? "side";
      const actions = b.actions ?? 1;
      const headH = b.big ? 13 : 8;
      if (image === "full") {
        const ox = x + 14;
        const oy = y + h - 54;
        return (
          <>
            {photo(x, y, w, h)}
            <rect x={ox - 8} y={oy - 8} width={w * 0.5} height={50} className="fill-bg-raised" />
            {rect(ox - 8, oy - 8, w * 0.5, 50, 0, S2)}
            {bar(ox, oy, w * 0.36, 7)}
            {bar(ox, oy + 12, w * 0.24, 7)}
            {actions > 0 && pill(ox, oy + 26, 36, 12, S1)}
          </>
        );
      }
      const center = b.align === "center";
      const tw = image === "none" ? w : w * 0.5;
      if (headH * 2 + 28 + (actions ? 20 : 0) > h) {
        // A short intro band: one heading, one line, the action at the end.
        const hh = Math.min(8, h * 0.28);
        return (
          <>
            {bar(x, cy - hh - 2, tw * 0.46, hh)}
            {bar(x, cy + 4, tw * 0.62, 3)}
            {actions > 0 && pill(x + w - 40, cy - 6.5, 40, 13, S1)}
          </>
        );
      }
      const tx = center ? x + w / 2 : x;
      const blockH = headH * 2 + 6 + 22 + (actions ? 20 : 0);
      const ty = cy - blockH / 2;
      const bx = (bw: number) => (center ? tx - bw / 2 : tx);
      const w1 = tw * (b.big ? 0.82 : 0.7);
      const w2 = tw * (b.big ? 0.6 : 0.5);
      return (
        <>
          {bar(bx(w1), ty, w1, headH)}
          {bar(bx(w2), ty + headH + 6, w2, headH)}
          {bar(bx(tw * 0.62), ty + headH * 2 + 14, tw * 0.62, 3)}
          {bar(bx(tw * 0.46), ty + headH * 2 + 21, tw * 0.46, 3)}
          {Array.from({ length: actions }, (_, i) => {
            const total = actions * 38 + (actions - 1) * 8;
            const px = (center ? tx - total / 2 : tx) + i * 46;
            return pill(px, ty + headH * 2 + 32, 38, 13, i === 0 ? S1 : S2, i);
          })}
          {image === "side" && xbox(x + w * 0.56, y, w * 0.44, h)}
          {image === "ring" && (
            <g>
              {[1, 0.7, 0.4].map((f) => (
                <circle key={f} cx={x + w * 0.78} cy={cy} r={(h / 2 - 4) * f} {...LINE} className={f === 1 ? S1 : S2} />
              ))}
              {line(`M${x + w * 0.78 - h / 2} ${cy}H${x + w * 0.78 + h / 2}M${x + w * 0.78} ${y}V${y + h}`)}
            </g>
          )}
        </>
      );
    }

    case "cards": {
      const n = b.glyphs.length;
      const cw = (w - (n - 1) * 8) / n;
      return b.glyphs.map((g, i) => {
        const cx = x + i * (cw + 8);
        return (
          <g key={i}>
            {rect(cx, y, cw, h, 4)}
            {rect(cx + 8, y + 8, 20, 20, 4, S1)}
            {glyph(g, cx + 18, y + 18, 13)}
            {bar(cx + 8, y + 36, cw * 0.55, 4)}
            {h > 50 && bar(cx + 8, y + 46, cw * 0.75, 3)}
            {h > 58 && bar(cx + 8, y + 53, cw * 0.5, 3)}
          </g>
        );
      });
    }

    case "stats": {
      const n = b.values?.length ?? b.count ?? 3;
      const cw = w / n;
      return Array.from({ length: n }, (_, i) => {
        const sx = x + i * cw;
        const v = b.values?.[i];
        return (
          <g key={i}>
            {i > 0 ? line(`M${sx} ${y + 4}V${y + h - 4}`) : rect(x, y, w, h, 6)}
            {v ? text(ctx, v, sx + 12, y + h * 0.55, 20) : bar(sx + 12, y + h * 0.3, cw * 0.42, 12)}
            {bar(sx + 12, y + h * 0.72, cw * 0.48, 3)}
          </g>
        );
      });
    }

    case "booking": {
      const fh = 20;
      const g = 8;
      return (
        <>
          {bar(x, y + 2, w * 0.5, 6)}
          {[0, 1].map((i) => {
            const fy = y + 16 + i * (fh + g);
            return (
              <g key={i}>
                {rect(x, fy, w, fh, 3)}
                {i === 0 ? (
                  <circle cx={x + 11} cy={fy + fh / 2} r={3.5} {...LINE} className={S1} />
                ) : (
                  glyph("pin", x + 11, fy + fh / 2, 12)
                )}
                {bar(x + 24, fy + fh / 2 - 1.5, w * 0.48, 3)}
              </g>
            );
          })}
          {line(`M${x + 11} ${y + 16 + fh / 2 + 4}V${y + 16 + fh + g + 4}`, S1, "ab", "2 2")}
          {(["calendar", "clock"] as const).map((gl, i) => {
            const fw = (w - g) / 2;
            const fx = x + i * (fw + g);
            const fy = y + 16 + 2 * (fh + g);
            return (
              <g key={gl}>
                {rect(fx, fy, fw, fh, 3)}
                {glyph(gl, fx + 11, fy + fh / 2, 11)}
                {bar(fx + 22, fy + fh / 2 - 1.5, fw * 0.4, 3)}
              </g>
            );
          })}
          {pill(x, y + h - 22, w, 20, S1)}
        </>
      );
    }

    case "text":
      return [1, 0.92, 0.96, 0.7, 0.84].slice(0, b.lines).map((f, i) => {
        const lw = w * 0.62 * f;
        return bar(b.align === "right" ? x + w - lw : x, y + 6 + i * 10, lw, 4, i);
      });

    case "split": {
      const iw = w * 0.44;
      const left = b.imageSide === "left";
      const ix = left ? x : x + w - iw;
      const tx = left ? x + iw + 16 : x;
      const tw = w - iw - 16;
      return (
        <>
          {photo(ix, y, iw, h)}
          {bar(tx, y + 8, tw * 0.6, 7)}
          {[0.9, 0.82, 0.7].map((f, i) => bar(tx, y + 24 + i * 8, tw * f, 3, i))}
          {h > 60 && pill(tx, y + h - 18, 38, 13, S1)}
        </>
      );
    }

    case "logos": {
      const g = 10;
      const lw = (w - (b.count - 1) * g) / b.count;
      return Array.from({ length: b.count }, (_, i) => {
        const lx = x + i * (lw + g);
        const shape = i % 3;
        return (
          <g key={i}>
            {shape === 0 && <circle cx={lx + 8} cy={cy} r={5} {...LINE} className={S2} />}
            {shape === 2 && rect(lx + 3, cy - 5, 10, 10, 1)}
            {bar(shape === 1 ? lx + 4 : lx + 17, cy - 2.5, shape === 1 ? lw - 8 : lw - 22, 5)}
          </g>
        );
      });
    }

    case "post": {
      const imgH = h - 74;
      return (
        <>
          {rect(x, y, w, h, 6)}
          <circle cx={x + 16} cy={y + 16} r={8} {...LINE} className={S1} />
          {bar(x + 30, y + 10, 48, 4)}
          {bar(x + 30, y + 18, 28, 3)}
          {bar(x + 10, y + 34, w - 26, 3)}
          {bar(x + 10, y + 41, w * 0.5, 3)}
          {photo(x + 10, y + 50, w - 20, imgH)}
          {glyph("heart", x + 18, y + h - 12, 12, S1)}
          {glyph("chat", x + 38, y + h - 12, 12, S1)}
          {bar(x + w - 34, y + h - 13, 24, 3)}
        </>
      );
    }

    case "quiz": {
      const ow = (w - 28) / 2;
      const oh = (h - 40) / 2;
      return (
        <>
          {rect(x, y, w, h, 6)}
          {glyph("trophy", x + 14, y + 13, 12)}
          {bar(x + 26, y + 10, w * 0.5, 4)}
          {bar(x + 26, y + 18, w * 0.3, 3)}
          {[0, 1, 2, 3].map((i) => {
            const ox = x + 10 + (i % 2) * (ow + 8);
            const oy = y + 30 + Math.floor(i / 2) * (oh + 4);
            return (
              <g key={i}>
                {rect(ox, oy, ow, oh, oh / 2, i === 1 ? S1 : S2)}
                <circle cx={ox + oh / 2} cy={oy + oh / 2} r={oh / 2 - 3} {...LINE} className={S2} />
                {bar(ox + oh + 2, oy + oh / 2 - 1.5, ow - oh - 10, 3)}
              </g>
            );
          })}
        </>
      );
    }

    case "beforeAfter": {
      const mid = x + w * 0.5;
      const clip = `${ctx.uid}-ba`;
      let hatch = "";
      for (let k = 0; k < w * 0.5 + h; k += 6) hatch += `M${x + k} ${y}L${x + k - h} ${y + h}`;
      return (
        <>
          <clipPath id={clip}>
            <rect x={x} y={y} width={w * 0.5} height={h} />
          </clipPath>
          {photo(x, y, w, h)}
          <g clipPath={`url(#${clip})`}>{line(hatch)}</g>
          {line(`M${mid} ${y}V${y + h}`, S1)}
          <circle cx={mid} cy={cy} r={8} {...LINE} className={S1} />
          {line(`M${mid - 2} ${cy - 3}l-3 3 3 3M${mid + 2} ${cy - 3}l3 3-3 3`, S1)}
        </>
      );
    }

    case "frames": {
      const fw = w * 0.36;
      const fh = h;
      const lw = w * 0.36;
      const lh = h * 0.62;
      const ax = x + fw + lw + 16;
      const aw = w - fw - lw - 16;
      const frame = (fx: number, fy: number, ww: number, hh: number, k: string) => (
        <g key={k}>
          {rect(fx, fy, ww, hh, 0, S1)}
          {rect(fx + 4, fy + 4, ww - 8, hh - 8, 0)}
          {photo(fx + 9, fy + 9, ww - 18, hh - 18)}
        </g>
      );
      return (
        <>
          {frame(x, y, fw, fh, "p")}
          {frame(x + fw + 8, y + h - lh, lw, lh, "l")}
          {rect(ax, y + h * 0.3, aw, h * 0.7, 1, S1)}
          {line(`M${ax + 6} ${y + h * 0.3}V${y + h}`, S1)}
          {bar(ax + 10, y + h * 0.3 + 10, aw - 16, 3)}
        </>
      );
    }

    case "numbered": {
      const rowH = h / b.rows;
      return Array.from({ length: b.rows }, (_, i) => {
        const ry = y + i * rowH;
        const rc = ry + rowH / 2;
        return (
          <g key={i}>
            {line(`M${x} ${ry}H${x + w}`)}
            {text(ctx, `0${i + 1}`, x, rc + 6, 18)}
            {bar(x + 52, rc - 6, w * 0.38, 7)}
            {bar(x + 52, rc + 6, w * 0.26, 3)}
            {line(`M${x + w - 22} ${rc}h16m-5-5l5 5-5 5`, S1)}
            {i === b.rows - 1 && line(`M${x} ${ry + rowH}H${x + w}`)}
          </g>
        );
      });
    }

    case "vitals": {
      const n = b.values.length;
      const tw = (w - (n - 1) * 8) / n;
      const shapes = [
        [0.5, 0.5, 0.2, 0.9, 0.1, 0.5, 0.5],
        [0.6, 0.4, 0.55, 0.35, 0.5, 0.3],
        [0.7, 0.62, 0.5, 0.56, 0.4, 0.44],
        [0.3, 0.32, 0.28, 0.3, 0.26, 0.3],
      ];
      return b.values.map((v, i) => {
        const tx = x + i * (tw + 8);
        const s = shapes[i % shapes.length];
        const sy0 = y + h - 22;
        const pts = s.map((f, j) => `${tx + 8 + ((tw - 16) * j) / (s.length - 1)},${sy0 + 14 * f}`).join(" ");
        return (
          <g key={i}>
            {rect(tx, y, tw, h, 4)}
            {bar(tx + 8, y + 8, tw * 0.35, 3)}
            {text(ctx, v, tx + 8, y + 31, 18)}
            <polyline points={pts} {...LINE} className={S1} />
          </g>
        );
      });
    }

    case "vehicles": {
      const n = b.glyphs.length;
      const cw = (w - (n - 1) * 8) / n;
      return b.glyphs.map((g, i) => {
        const cx = x + i * (cw + 8);
        return (
          <g key={i}>
            {rect(cx, y, cw, h, 4, i === 0 ? S1 : S2)}
            {glyph(g, cx + cw * 0.36, y + h * 0.42, Math.min(h * 0.62, cw * 0.5))}
            {bar(cx + cw * 0.68, y + h * 0.3, cw * 0.22, 4)}
            {bar(cx + cw * 0.68, y + h * 0.3 + 9, cw * 0.14, 3)}
            {bar(cx + 10, y + h - 14, cw * 0.4, 3)}
          </g>
        );
      });
    }

    case "filters": {
      const rowH = (h - 56) / b.rows;
      return (
        <>
          {line(`M${x + w} ${y}V${y + h}`)}
          {bar(x, y + 4, w * 0.5, 5)}
          {Array.from({ length: b.rows }, (_, i) => {
            const ry = y + 22 + i * rowH;
            return (
              <g key={i}>
                {rect(x, ry, 8, 8, 1, i < 2 ? S1 : S2)}
                {i < 2 && line(`M${x + 1.5} ${ry + 4}l2 2 3-4`, S1)}
                {bar(x + 14, ry + 2.5, (w - 30) * (0.9 - (i % 3) * 0.18), 3)}
              </g>
            );
          })}
          {line(`M${x} ${y + h - 18}H${x + w - 12}`, S1)}
          <circle cx={x + 6} cy={y + h - 18} r={4} {...LINE} className={S1} />
          <circle cx={x + (w - 12) * 0.7} cy={y + h - 18} r={4} {...LINE} className={S1} />
        </>
      );
    }

    case "calendar": {
      const gx = x + 10;
      const gy = y + 22;
      const cw = (w - 20) / 7;
      const ch = (h - 30) / 3;
      const dots: ReactNode[] = [];
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 7; c++)
          dots.push(<circle key={`${r}-${c}`} cx={gx + cw * (c + 0.5)} cy={gy + ch * (r + 0.5)} r={1.2} className="fill-subtle" />);
      return (
        <>
          {rect(x, y, w, h, 4)}
          {bar(x + 10, y + 8, w * 0.36, 4)}
          {dots}
          <circle cx={gx + cw * 3.5} cy={gy + ch * 1.5} r={Math.min(cw, ch) * 0.42} {...LINE} className={S1} />
          <circle cx={gx + cw * 5.5} cy={gy + ch * 0.5} r={Math.min(cw, ch) * 0.42} {...LINE} className={S2} />
        </>
      );
    }

    case "band":
      return (
        <>
          {rect(x, y, w, h, 4)}
          {glyph("chat", x + 14, cy, 12)}
          {bar(x + 28, cy - 2, w * 0.34, 4)}
          {pill(x + w - 56, cy - 7, 46, 14, S1)}
        </>
      );

    case "footer":
      return (
        <>
          {line(`M${x} ${y + 2}H${x + w}`)}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {bar(x + i * (w / 4), y + 10, w * 0.1, 4)}
              {bar(x + i * (w / 4), y + 18, w * 0.14, 3)}
            </g>
          ))}
        </>
      );

    case "topics": {
      const tw = (w - 8) / 2;
      const th = (h - 8) / 2;
      return b.glyphs.slice(0, 4).map((g, i) => {
        const tx = x + (i % 2) * (tw + 8);
        const ty = y + Math.floor(i / 2) * (th + 8);
        return (
          <g key={i}>
            {rect(tx, ty, tw, th, 6)}
            {glyph(g, tx + tw / 2, ty + th * 0.42, Math.min(th * 0.42, 22))}
            {bar(tx + tw * 0.2, ty + th - 12, tw * 0.6, 3)}
          </g>
        );
      });
    }

    case "row":
      return null; // laid out by the drawing, never drawn as one block
  }
}
