"use client";

// A project drawn as a technical elevation: the device, its screen built
// from the project's blocks (src/data/drawings.ts), a dimension line, and
// numbered balloons on leader lines pointing at the parts that make the
// product what it is. Same language as the hero sheet: hairlines in the
// neutral ramp, IBM Plex Mono annotations, no accent, no fills.
//
// The screen is drawn once into <defs> and placed with <use>, so the two
// card widths and the sheet's "Detail A" share one copy of it.
//
//   ProjectCardDrawing  — the card plate, at 1:1 pixels (labels at 11px).
//                         Two widths, chosen by a container query on the
//                         plate: 280 for narrow cards, 400 for wide ones.
//   ProjectSheet        — the project page: a full drawing sheet with a
//                         parts list, Detail A and a title block from lg
//                         up, and a cropped sheet below lg.

import { useId } from "react";
import { drawingFor, type Block, type Drawing } from "@/data/drawings";
import { projectNumber, projects, type Project } from "@/data/projects";
import { drawBlock, glyph, LINE, S1, S2, type Box, type Ctx } from "./blocks";

const TEXT = "font-mono fill-subtle";
const LABEL = "font-mono fill-muted";
const GAP = 8;

const DEVICES = {
  phone: { w: 180, h: 390, content: { x: 20, y: 36, w: 140, h: 340 } },
  browser: { w: 400, h: 300, content: { x: 16, y: 30, w: 368, h: 260 } },
} as const;

type Anchor = { n: number; x: number; y: number };
// col: position of a row item ([index, count]), so side-by-side callouts
// point at different heights and their leaders never run on top of each other.
type Placed = { block: Block; box: Box; col?: [number, number] };

function layout(d: Drawing) {
  const dev = DEVICES[d.frame];
  const c = d.frame === "browser" && d.sidebar ? { x: 68, y: 30, w: 316, h: 260 } : { ...dev.content };
  const fixed = d.blocks.reduce((s, b) => s + (b.h ?? 0), 0);
  const autos = d.blocks.filter((b) => !b.h).length;
  const autoH = autos ? (c.h - fixed - GAP * (d.blocks.length - 1)) / autos : 0;
  const placed: Placed[] = [];
  let y = c.y;
  for (const b of d.blocks) {
    const h = b.h ?? autoH;
    if (b.kind === "row") {
      const total = b.cols.reduce((a, v) => a + v, 0);
      const avail = c.w - GAP * (b.cols.length - 1);
      let x = c.x;
      b.items.forEach((it, i) => {
        const w = (avail * b.cols[i]) / total;
        placed.push({ block: it, box: { x, y, w, h }, col: [i, b.items.length] });
        x += w + GAP;
      });
    } else {
      placed.push({ block: b, box: { x: c.x, y, w: c.w, h } });
    }
    y += h + GAP;
  }
  const anchors: Anchor[] = [];
  for (const { block, box, col } of placed) {
    const ay = col ? box.y + box.h * (0.3 + (0.4 * col[0]) / Math.max(1, col[1] - 1)) : box.y + Math.min(box.h / 2, 20);
    if (block.n) anchors.push({ n: block.n, x: box.x + box.w - 3, y: ay });
    for (const [n, fx, fy] of block.at ?? []) {
      const ax = block.rtl ? box.x + box.w * (1 - fx) : box.x + box.w * fx;
      anchors.push({ n, x: ax, y: box.y + box.h * fy });
    }
  }
  anchors.sort((a, b) => a.n - b.n);

  let detail: { x: number; y: number } | undefined;
  if (d.detail) {
    const hit = placed.find((p) => p.block.n === d.detail!.n || p.block.at?.some(([n]) => n === d.detail!.n));
    if (hit) {
      const fx = hit.block.rtl ? 1 - (d.detail.fx ?? 0.5) : (d.detail.fx ?? 0.5);
      detail = { x: hit.box.x + hit.box.w * fx, y: hit.box.y + hit.box.h * (d.detail.fy ?? 0.5) };
    }
  }
  return { placed, anchors, detail };
}

function Screen({ d, placed, ctx }: { d: Drawing; placed: Placed[]; ctx: Ctx }) {
  return (
    <>
      {d.sidebar && (
        <g>
          <rect x={18} y={30} width={20} height={12} rx={2} {...LINE} className={S1} />
          {d.sidebar.map((g, i) => (
            <g key={g}>
              {i === 0 && <rect x={10} y={58} width={36} height={22} rx={4} {...LINE} className={S2} />}
              {glyph(g, 28, 69 + i * 30, 13, i === 0 ? S1 : S2)}
            </g>
          ))}
        </g>
      )}
      {placed.map(({ block, box }, i) => drawBlock(block, box, ctx, i))}
    </>
  );
}

function Frame({ d, height, open }: { d: Drawing; height?: number; open?: boolean }) {
  if (d.frame === "phone") {
    return (
      <g>
        <rect x="0.5" y="0.5" width="179" height="389" rx="24" {...LINE} className={S1} />
        <rect x="8" y="8" width="164" height="374" rx="17" {...LINE} className={S2} />
        <rect x="66" y="16" width="48" height="8" rx="4" {...LINE} className={S2} />
      </g>
    );
  }
  const H = height ?? DEVICES.browser.h;
  return (
    <g>
      {open ? (
        <path d={`M0.5 ${H}V6.5a6 6 0 0 1 6-6h387a6 6 0 0 1 6 6V${H}`} {...LINE} className={S1} />
      ) : (
        <rect x="0.5" y="0.5" width="399" height={H - 1} rx="6" {...LINE} className={S1} />
      )}
      <path d="M0 20H400" {...LINE} className={S2} />
      {[12, 23, 34].map((cx) => (
        <circle key={cx} cx={cx} cy="10" r="3" {...LINE} className={S2} />
      ))}
      <rect x="130" y="5" width="140" height="10" rx="5" {...LINE} className={S2} />
      {d.sidebar && <path d={`M56 20V${H}`} {...LINE} className={S2} />}
    </g>
  );
}

function Balloon({ x, y, n, r = 10, fs = 11 }: { x: number; y: number; n: number; r?: number; fs?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} {...LINE} className="stroke-muted" />
      <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} className={TEXT}>
        {n}
      </text>
    </g>
  );
}

// A leader: a dot on the part, out horizontally past the device, then to the balloon.
function Leader({ x1, y1, knee, x2, y2 }: { x1: number; y1: number; knee: number; x2: number; y2: number }) {
  return (
    <g>
      <circle cx={x1} cy={y1} r={1.6} className="fill-subtle" />
      <path d={`M${x1} ${y1}H${knee}L${x2} ${y2}`} {...LINE} className="stroke-subtle" />
    </g>
  );
}

function DimH({ x1, x2, y, value }: { x1: number; x2: number; y: number; value: string }) {
  return (
    <g>
      <path
        d={`M${x1} ${y - 6} V${y + 10} M${x2} ${y - 6} V${y + 10} M${x1} ${y} H${x2} M${x1 - 4} ${y + 4} L${x1 + 4} ${y - 4} M${x2 - 4} ${y + 4} L${x2 + 4} ${y - 4}`}
        {...LINE}
        className="stroke-subtle"
      />
      <text x={(x1 + x2) / 2} y={y - 5} textAnchor="middle" fontSize="11" className={TEXT}>
        {value}
      </text>
    </g>
  );
}

function DimV({ y1, y2, x, value }: { y1: number; y2: number; x: number; value: string }) {
  const cy = (y1 + y2) / 2;
  return (
    <g>
      <path
        d={`M${x - 10} ${y1} H${x + 6} M${x - 10} ${y2} H${x + 6} M${x} ${y1} V${y2} M${x - 4} ${y1 + 4} L${x + 4} ${y1 - 4} M${x - 4} ${y2 + 4} L${x + 4} ${y2 - 4}`}
        {...LINE}
        className="stroke-subtle"
      />
      <text x={x - 5} y={cy} textAnchor="middle" fontSize="11" transform={`rotate(-90 ${x - 5} ${cy})`} className={TEXT}>
        {value}
      </text>
    </g>
  );
}

// Spread balloon positions so they keep a minimum gap, in target order.
function spread(ys: number[], gap: number, lo: number, hi: number) {
  const out = ys.map((y) => Math.max(lo, Math.min(hi, y)));
  for (let i = 1; i < out.length; i++) out[i] = Math.max(out[i], out[i - 1] + gap);
  for (let i = out.length - 1; i >= 0; i--) {
    out[i] = Math.min(out[i], i === out.length - 1 ? hi : out[i + 1] - gap);
  }
  return out;
}

function callouts(anchors: Anchor[], toPx: (a: Anchor) => { x: number; y: number }, gap: number, lo: number, hi: number) {
  const pts = anchors.map((a) => ({ n: a.n, ...toPx(a) })).sort((a, b) => a.y - b.y);
  const ys = spread(
    pts.map((p) => p.y),
    gap,
    lo,
    hi,
  );
  return pts.map((p, i) => ({ ...p, by: ys[i] }));
}

function useSafeId(prefix: string) {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
}

const dimValue = (d: Drawing) => d.dim ?? (d.frame === "phone" ? "390" : "1440");

// ── Card ────────────────────────────────────────────────────

const CARD_H = 184;
const CARD_TOP = 32;

function cardGeometry(d: Drawing, W: number, maxS: number) {
  const dev = DEVICES[d.frame];
  const labelW = Math.max(...d.callouts.map(([s]) => s.length)) * 6.6;
  const s = Math.min(maxS, (W - 12 - 34 - labelW) / dev.w);
  const dw = dev.w * s;
  const ox = Math.max(6, (W - (dw + 34 + labelW)) / 2);
  return { s, dw, ox };
}

function CardVariant({
  d,
  anchors,
  defId,
  W,
  maxS,
  className,
}: {
  d: Drawing;
  anchors: Anchor[];
  defId: string;
  W: number;
  maxS: number;
  className: string;
}) {
  const { s, dw, ox } = cardGeometry(d, W, maxS);
  const visible = anchors.filter((a) => CARD_TOP + a.y * s <= CARD_H - 10).slice(0, 3);
  const cx = ox + dw + 20;
  const cs = callouts(visible, (a) => ({ x: ox + a.x * s, y: CARD_TOP + a.y * s }), 26, CARD_TOP + 8, CARD_H - 12);
  const frameH = (CARD_H - CARD_TOP) / s + 8;
  return (
    <svg width={W} height={CARD_H} viewBox={`0 0 ${W} ${CARD_H}`} className={`shrink-0 ${className}`} aria-hidden="true">
      <DimH x1={ox} x2={ox + dw} y={CARD_TOP - 14} value={dimValue(d)} />
      <g transform={`translate(${ox} ${CARD_TOP}) scale(${s})`}>
        <Frame d={d} height={frameH} open />
        <use href={`#${defId}`} />
      </g>
      {cs.map((c) => (
        <g key={c.n}>
          <Leader x1={c.x} y1={c.y} knee={ox + dw + 5} x2={cx - 9} y2={c.by} />
          <Balloon x={cx} y={c.by} n={c.n} r={9} />
          <text x={cx + 14} y={c.by + 4} fontSize="11" className={LABEL}>
            {d.callouts[c.n - 1]?.[0]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function ProjectCardDrawing({ project }: { project: Project }) {
  const d = drawingFor(project);
  const defId = useSafeId("pd");
  const { placed, anchors } = layout(d);
  const narrow = cardGeometry(d, 280, d.frame === "phone" ? 0.54 : 0.52);
  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <g id={defId}>
            <Screen d={d} placed={placed} ctx={{ minScale: narrow.s, uid: defId }} />
          </g>
        </defs>
      </svg>
      <CardVariant d={d} anchors={anchors} defId={defId} W={280} maxS={d.frame === "phone" ? 0.54 : 0.52} className="block @min-[380px]:hidden" />
      <CardVariant d={d} anchors={anchors} defId={defId} W={400} maxS={d.frame === "phone" ? 0.58 : 0.52} className="hidden @min-[380px]:block" />
    </>
  );
}

// ── Sheet (project page) ────────────────────────────────────

function RegMark({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={3.25} {...LINE} className="stroke-subtle" />
      <path d={`M${x} ${y - 6}V${y + 6}M${x - 6} ${y}H${x + 6}`} {...LINE} className="stroke-subtle" />
    </g>
  );
}

function FullSheet({ project, d, defId, anchors, detail }: SheetProps) {
  const num = projectNumber(project);
  const pad = (n: number) => String(n).padStart(2, "0");
  const phone = d.frame === "phone";
  const s = phone ? 1 : 1.15;
  const dev = DEVICES[d.frame];
  const ox = phone ? 196 : 44;
  const oy = 84;
  const dw = dev.w * s;
  const bx = ox + dw + (phone ? 44 : 26);
  const cs = callouts(anchors, (a) => ({ x: ox + a.x * s, y: oy + a.y * s }), 30, oy + 4, phone ? 470 : 424);
  const zonesX = ["A", "B", "C", "D", "E", "F"];
  const zonesY = ["1", "2", "3", "4"];
  const zw = 840 / 6;
  const zh = 480 / 4;
  const clip = `${defId}-dc`;
  const DX = 700;
  const DY = 264;
  const DR = 70;
  const SRC = 35;

  return (
    <svg viewBox="0 0 880 520" className="block h-auto w-full" aria-hidden="true">
      <rect x="0.5" y="0.5" width="879" height="519" {...LINE} className={S2} />
      <rect x="20.5" y="20.5" width="839" height="479" {...LINE} className={S2} />
      {zonesX.map((z, i) => (
        <g key={z}>
          {i > 0 && <path d={`M${20 + i * zw} 0V20M${20 + i * zw} 500V520`} {...LINE} className={S2} />}
          <text x={20 + i * zw + zw / 2} y="14" textAnchor="middle" fontSize="11" className={TEXT}>
            {z}
          </text>
          <text x={20 + i * zw + zw / 2} y="514" textAnchor="middle" fontSize="11" className={TEXT}>
            {z}
          </text>
        </g>
      ))}
      {zonesY.map((z, i) => (
        <g key={z}>
          {i > 0 && <path d={`M0 ${20 + i * zh}H20M860 ${20 + i * zh}H880`} {...LINE} className={S2} />}
          <text x="10" y={20 + i * zh + zh / 2 + 4} textAnchor="middle" fontSize="11" className={TEXT}>
            {z}
          </text>
          <text x="870" y={20 + i * zh + zh / 2 + 4} textAnchor="middle" fontSize="11" className={TEXT}>
            {z}
          </text>
        </g>
      ))}
      <RegMark x={40} y={40} />
      <RegMark x={540} y={40} />

      {/* Elevation */}
      <DimH x1={ox} x2={ox + dw} y={oy - 20} value={dimValue(d)} />
      {phone && <DimV y1={oy} y2={oy + dev.h * s} x={ox - 28} value="844" />}
      <g transform={`translate(${ox} ${oy}) scale(${s})`}>
        <Frame d={d} />
        <use href={`#${defId}`} />
      </g>
      {cs.map((c) => (
        <g key={c.n}>
          <Leader x1={c.x} y1={c.y} knee={ox + dw + 10} x2={bx - 10} y2={c.by} />
          <Balloon x={bx} y={c.by} n={c.n} />
        </g>
      ))}

      {/* Detail A: the source circle on the elevation, enlarged 2:1 on the right */}
      {detail && (
        <g>
          <circle cx={ox + detail.x * s} cy={oy + detail.y * s} r={SRC * s} {...LINE} className={S1} strokeDasharray="4 3" />
          <text x={ox + detail.x * s - SRC * s * 0.72 - 12} y={oy + detail.y * s + SRC * s * 0.72 + 14} fontSize="12" className={LABEL}>
            A
          </text>
          <clipPath id={clip}>
            <circle cx={DX} cy={DY} r={DR} />
          </clipPath>
          <g clipPath={`url(#${clip})`}>
            <g transform={`translate(${DX - detail.x * (DR / SRC)} ${DY - detail.y * (DR / SRC)}) scale(${DR / SRC})`}>
              <Frame d={d} />
              <use href={`#${defId}`} />
            </g>
          </g>
          <circle cx={DX} cy={DY} r={DR} {...LINE} className={S1} />
          <path
            d={`M${DX} ${DY - DR - 10}v6M${DX} ${DY + DR + 4}v6M${DX - DR - 10} ${DY}h6M${DX + DR + 4} ${DY}h6`}
            {...LINE}
            className="stroke-subtle"
          />
          <text x={DX} y={DY + DR + 28} textAnchor="middle" fontSize="11" className={TEXT}>
            Detail A · 2:1
          </text>
        </g>
      )}

      {/* Parts list */}
      <g>
        <rect x="560.5" y="40.5" width="279" height={24 + d.callouts.length * 24} {...LINE} className={S2} />
        <path d={`M600 40V${64 + d.callouts.length * 24}`} {...LINE} className={S2} />
        {d.callouts.map((_, i) => (
          <path key={i} d={`M560 ${64 + i * 24}H840`} {...LINE} className={S2} />
        ))}
        <text x="572" y="56" fontSize="11" className={TEXT}>
          Item
        </text>
        <text x="612" y="56" fontSize="11" className={TEXT}>
          Part
        </text>
        {d.callouts.map(([, long], i) => (
          <g key={long}>
            <text x="572" y={80 + i * 24} fontSize="12" className={TEXT}>
              {i + 1}
            </text>
            <text x="612" y={80 + i * 24} fontSize="12" className={LABEL}>
              {long}
            </text>
          </g>
        ))}
      </g>

      {/* Title block */}
      <g>
        <rect x="560.5" y="380.5" width="279" height="103" {...LINE} className={S2} />
        <path d="M560 406H840M560 432H840M560 458H840" {...LINE} className={S2} />
        <text x="572" y="398" fontSize="12" className={LABEL}>
          Fig. {pad(num)} — {project.name}
        </text>
        <text x="572" y="424" fontSize="11" className={TEXT}>
          {project.category} · {project.industry}
        </text>
        <text x="572" y="450" fontSize="11" className={TEXT}>
          ProArt Technology · Abu Dhabi
        </text>
        <text x="572" y="476" fontSize="11" className={TEXT}>
          Sheet {pad(num)} / {pad(projects.length)}
        </text>
        <text x="828" y="476" fontSize="11" textAnchor="end" className={TEXT}>
          Rev. 2026
        </text>
      </g>
    </svg>
  );
}

function CroppedSheet({ project, d, defId, anchors }: SheetProps) {
  const num = projectNumber(project);
  const pad = (n: number) => String(n).padStart(2, "0");
  const phone = d.frame === "phone";
  const dev = DEVICES[d.frame];
  const s = phone ? 0.8 : 0.68;
  const ox = phone ? 44 : 24;
  const oy = 60;
  const dw = dev.w * s;
  const dh = dev.h * s;
  const W = 340;

  if (phone) {
    const bx = 214;
    const cs = callouts(anchors, (a) => ({ x: ox + a.x * s, y: oy + a.y * s }), 26, oy + 6, oy + dh - 12);
    const H = oy + dh + 84;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
        <rect x="0.5" y="0.5" width={W - 1} height={H - 1} {...LINE} className={S2} />
        <rect x="12.5" y="12.5" width={W - 25} height={H - 25} {...LINE} className={S2} />
        <DimH x1={ox} x2={ox + dw} y={oy - 16} value={dimValue(d)} />
        <DimV y1={oy} y2={oy + dh} x={ox - 18} value="844" />
        <g transform={`translate(${ox} ${oy}) scale(${s})`}>
          <Frame d={d} />
          <use href={`#${defId}`} />
        </g>
        {cs.map((c) => (
          <g key={c.n}>
            <Leader x1={c.x} y1={c.y} knee={ox + dw + 6} x2={bx - 10} y2={c.by} />
            <Balloon x={bx} y={c.by} n={c.n} />
            <text x={bx + 16} y={c.by + 4} fontSize="12" className={LABEL}>
              {d.callouts[c.n - 1]?.[0]}
            </text>
          </g>
        ))}
        <path d={`M12 ${oy + dh + 20}H${W - 12}`} {...LINE} className={S2} />
        <text x="24" y={oy + dh + 42} fontSize="12" className={LABEL}>
          Fig. {pad(num)} — {project.name}
        </text>
        <text x="24" y={oy + dh + 62} fontSize="11" className={TEXT}>
          {project.category} · {project.industry}
        </text>
        <text x={W - 24} y={oy + dh + 62} fontSize="11" textAnchor="end" className={TEXT}>
          Rev. 2026
        </text>
      </svg>
    );
  }

  const bx = ox + dw + 20;
  const cs = callouts(anchors, (a) => ({ x: ox + a.x * s, y: oy + a.y * s }), 22, oy + 10, oy + dh - 8);
  const listY = oy + dh + 26;
  const H = listY + d.callouts.length * 26 + 70;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} {...LINE} className={S2} />
      <rect x="12.5" y="12.5" width={W - 25} height={H - 25} {...LINE} className={S2} />
      <DimH x1={ox} x2={ox + dw} y={oy - 16} value={dimValue(d)} />
      <g transform={`translate(${ox} ${oy}) scale(${s})`}>
        <Frame d={d} />
        <use href={`#${defId}`} />
      </g>
      {cs.map((c) => (
        <g key={c.n}>
          <Leader x1={c.x} y1={c.y} knee={ox + dw + 3} x2={bx - 9} y2={c.by} />
          <Balloon x={bx} y={c.by} n={c.n} r={9} />
        </g>
      ))}
      {d.callouts.map(([, long], i) => (
        <g key={long}>
          <Balloon x={34} y={listY + i * 26} n={i + 1} r={9} />
          <text x="52" y={listY + i * 26 + 4} fontSize="12" className={LABEL}>
            {long}
          </text>
        </g>
      ))}
      <path d={`M12 ${H - 58}H${W - 12}`} {...LINE} className={S2} />
      <text x="24" y={H - 38} fontSize="12" className={LABEL}>
        Fig. {pad(num)} — {project.name}
      </text>
      <text x="24" y={H - 20} fontSize="11" className={TEXT}>
        {project.category} · {project.industry}
      </text>
      <text x={W - 24} y={H - 20} fontSize="11" textAnchor="end" className={TEXT}>
        Rev. 2026
      </text>
    </svg>
  );
}

type SheetProps = {
  project: Project;
  d: Drawing;
  defId: string;
  anchors: Anchor[];
  detail?: { x: number; y: number };
};

export function ProjectSheet({ project }: { project: Project }) {
  const d = drawingFor(project);
  const defId = useSafeId("ps");
  const { placed, anchors, detail } = layout(d);
  const parts = d.callouts.map(([, long]) => long.toLowerCase()).join("; ");
  return (
    <figure
      className="m-0"
      role="img"
      aria-label={`${project.name}, drawn as a technical sheet with numbered parts: ${parts}`}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <g id={defId}>
            <Screen d={d} placed={placed} ctx={{ minScale: d.frame === "phone" ? 0.8 : 0.68, uid: defId }} />
          </g>
        </defs>
      </svg>
      <div className="grid-field mx-auto hidden max-w-[1120px] bg-bg-raised lg:block">
        <FullSheet project={project} d={d} defId={defId} anchors={anchors} detail={detail} />
      </div>
      <div className="grid-field mx-auto max-w-[480px] bg-bg-raised lg:hidden">
        <CroppedSheet project={project} d={d} defId={defId} anchors={anchors} />
      </div>
    </figure>
  );
}
