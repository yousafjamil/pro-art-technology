"use client";

import { useEffect, useRef } from "react";

// The hero's background: a system diagram that draws itself. Nodes sit on a
// faint engineering grid; orthogonal links between them are drawn in, held,
// and faded out on their own slow timelines, a few small packets travel along
// the links, and a handful of grid cells fill with petrol for a while. The
// whole sheet drifts a few pixels on a slow loop. Almost everything is white
// at 4-20% opacity; orange marks a few nodes and links, petrol a few more.
//
// Cheap on purpose: a few dozen shapes, 30 frames a second, the pixel ratio
// capped at 2, nothing drawn while the hero is off screen or the tab hidden.
// With "reduce motion" set it draws one still frame of the full diagram.
// Deterministic: the same seed and size always give the same layout.

type Tone = "white" | "signal" | "petrol";
type Pt = { x: number; y: number };
type GridNode = Pt & { hub: boolean; tone: Tone; phase: number };
type Link = {
  pts: Pt[];
  segs: number[];
  len: number;
  tone: Tone;
  grow: number;
  hold: number;
  fade: number;
  cycle: number;
  offset: number;
};
type Cell = { x: number; y: number; size: number; period: number; phase: number };
type Packet = { link: number; d: number; speed: number; dir: 1 | -1; tone: Tone };
type Rect = { x: number; y: number; w: number; h: number };
type Scene = { key: string; quiet: Rect | null; w: number; h: number; cell: number; nodes: GridNode[]; links: Link[]; cells: Cell[] };

const FRAME_MS = 1000 / 30;
const DRIFT = 14; // px, the largest offset of the slow drift

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function color(tone: Tone, a: number) {
  if (tone === "signal") return `rgba(255,91,20,${a})`;
  if (tone === "petrol") return `rgba(11,88,100,${a})`; // the lighter petrol of the palette; #063f48 vanishes on black
  return `rgba(255,255,255,${a})`;
}

const inside = (p: Pt, r: Rect | null) => !!r && p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
const overlaps = (a: Rect, r: Rect | null) =>
  !!r && a.x < r.x + r.w && r.x < a.x + a.w && a.y < r.y + r.h && r.y < a.y + a.h;

// `quiet` is the box of the headline column: behind it the diagram stays
// plain white (no orange or petrol hubs, links or filled cells).
function buildScene(w: number, h: number, quiet: Rect | null, key: string): Scene {
  const rand = rng(0x50a17 + Math.round(w / 40));
  const cell = w >= 1024 ? 64 : w >= 640 ? 56 : 44;
  // Intersections over the canvas plus a margin, so the drift never shows an edge.
  const cols = Math.ceil((w + DRIFT * 2) / cell) + 1;
  const rows = Math.ceil((h + DRIFT * 2) / cell) + 1;
  const ox = -DRIFT - ((cols * cell - w - DRIFT * 2) % cell) / 2;
  const oy = -DRIFT;

  // Sparse nodes: one per ~11 cells (fewer on a phone), never two within two cells.
  const target = Math.round((cols * rows) / (w < 640 ? 15 : 11));
  const taken: { c: number; r: number }[] = [];
  const nodes: GridNode[] = [];
  for (let tries = 0; nodes.length < target && tries < target * 40; tries++) {
    const c = Math.floor(rand() * cols);
    const r = Math.floor(rand() * rows);
    if (taken.some((t) => Math.max(Math.abs(t.c - c), Math.abs(t.r - r)) < 2)) continue;
    taken.push({ c, r });
    const roll = rand();
    const calm = inside({ x: ox + c * cell, y: oy + r * cell }, quiet);
    const hub = !calm && roll < 0.22;
    nodes.push({
      x: ox + c * cell,
      y: oy + r * cell,
      hub,
      tone: calm ? "white" : hub && roll < 0.08 ? "signal" : roll > 0.85 ? "petrol" : "white",
      phase: rand() * Math.PI * 2,
    });
  }

  // Each node links to its nearest one or two neighbours with an L-shaped,
  // grid-aligned path, like a wire in an architecture diagram.
  const links: Link[] = [];
  const seen = new Set<string>();
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: Math.abs(a.x - b.x) + Math.abs(a.y - b.y) }))
      .filter((n) => n.j !== i && n.d <= cell * 7)
      .sort((p, q) => p.d - q.d)
      .slice(0, rand() < 0.4 ? 2 : 1);
    for (const { j } of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const b = nodes[j];
      const corner = rand() < 0.5 ? { x: b.x, y: a.y } : { x: a.x, y: b.y };
      const pts = [a, corner, b].filter((p, k, arr) => k === 0 || p.x !== arr[k - 1].x || p.y !== arr[k - 1].y);
      const segs = pts.slice(1).map((p, k) => Math.abs(p.x - pts[k].x) + Math.abs(p.y - pts[k].y));
      const len = segs.reduce((s, x) => s + x, 0);
      const roll = pts.some((p) => inside(p, quiet)) ? 1 : rand();
      const grow = 2 + rand() * 2;
      const hold = 7 + rand() * 9;
      const fade = 2 + rand() * 1.5;
      const rest = 1.5 + rand() * 5;
      const cycle = grow + hold + fade + rest;
      // Most links start part-way through their hold, so the first frame
      // (and the still frame for reduced motion) is already a full diagram.
      const offset = rand() < 0.75 ? grow + rand() * hold * 0.8 : rand() * cycle;
      links.push({
        pts,
        segs,
        len,
        tone: roll < 0.1 ? "signal" : roll < 0.25 ? "petrol" : "white",
        grow,
        hold,
        fade,
        cycle,
        offset,
      });
    }
  });

  // A few petrol cells that fill and empty very slowly.
  const cells: Cell[] = [];
  for (let tries = 0; cells.length < (w < 640 ? 2 : 4) && tries < 60; tries++) {
    const size = cell * (rand() < 0.5 ? 1 : 2);
    const x = ox + Math.floor(rand() * (cols - 1)) * cell;
    const y = oy + Math.floor(rand() * (rows - 1)) * cell;
    if (overlaps({ x, y, w: size, h: size }, quiet)) continue;
    cells.push({ x, y, size, period: 14 + rand() * 10, phase: rand() * Math.PI * 2 });
  }

  return { key, quiet, w, h, cell, nodes, links, cells };
}

// Progress (how much of the link is drawn) and opacity at time t.
function linkState(l: Link, t: number, still: boolean) {
  if (still) return { p: 1, a: 1 };
  const local = (t + l.offset) % l.cycle;
  if (local < l.grow) {
    const x = local / l.grow;
    return { p: 1 - Math.pow(1 - x, 3), a: 1 };
  }
  if (local < l.grow + l.hold) return { p: 1, a: 1 };
  if (local < l.grow + l.hold + l.fade) return { p: 1, a: 1 - (local - l.grow - l.hold) / l.fade };
  return { p: 0, a: 0 };
}

function pointAt(l: Link, d: number): Pt {
  let rest = d;
  for (let k = 0; k < l.segs.length; k++) {
    const s = l.segs[k];
    if (rest <= s || k === l.segs.length - 1) {
      const a = l.pts[k];
      const b = l.pts[k + 1];
      const f = s === 0 ? 0 : Math.min(rest / s, 1);
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
    rest -= s;
  }
  return l.pts[l.pts.length - 1];
}

function draw(ctx: CanvasRenderingContext2D, s: Scene, t: number, packets: Packet[], still: boolean) {
  const { w, h, cell } = s;
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  const dx = still ? 0 : Math.sin(t * 0.031) * DRIFT;
  const dy = still ? 0 : Math.sin(t * 0.023 + 1.3) * DRIFT * 0.7;
  ctx.translate(dx, dy);

  // Grid: minor lines every cell, a slightly stronger line every fourth.
  const x0 = -DRIFT - cell;
  const y0 = -DRIFT - cell;
  ctx.lineWidth = 1;
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let x = Math.floor(x0 / cell) * cell; x <= w + DRIFT + cell; x += cell) {
      const major = Math.round(x / cell) % 4 === 0;
      if (major === (pass === 1)) {
        ctx.moveTo(x + 0.5, y0);
        ctx.lineTo(x + 0.5, h + DRIFT + cell);
      }
    }
    for (let y = Math.floor(y0 / cell) * cell; y <= h + DRIFT + cell; y += cell) {
      const major = Math.round(y / cell) % 4 === 0;
      if (major === (pass === 1)) {
        ctx.moveTo(x0, y + 0.5);
        ctx.lineTo(w + DRIFT + cell, y + 0.5);
      }
    }
    ctx.strokeStyle = color("white", pass === 1 ? 0.055 : 0.03);
    ctx.stroke();
  }

  // Petrol cells
  for (const c of s.cells) {
    const v = still ? 0.6 : 0.5 + 0.5 * Math.sin((t / c.period) * Math.PI * 2 + c.phase);
    ctx.fillStyle = `rgba(6,63,72,${(0.45 * v * v).toFixed(3)})`;
    ctx.fillRect(c.x + 1, c.y + 1, c.size - 1, c.size - 1);
  }

  // Links, drawn in up to their progress
  const states = s.links.map((l) => linkState(l, t, still));
  s.links.forEach((l, i) => {
    const { p, a } = states[i];
    if (p <= 0 || a <= 0) return;
    const base = l.tone === "signal" ? 0.2 : l.tone === "petrol" ? 0.7 : 0.11;
    let remaining = l.len * p;
    ctx.beginPath();
    ctx.moveTo(l.pts[0].x + 0.5, l.pts[0].y + 0.5);
    for (let k = 0; k < l.segs.length && remaining > 0; k++) {
      const f = Math.min(remaining / l.segs[k], 1);
      const a0 = l.pts[k];
      const b0 = l.pts[k + 1];
      ctx.lineTo(a0.x + (b0.x - a0.x) * f + 0.5, a0.y + (b0.y - a0.y) * f + 0.5);
      remaining -= l.segs[k];
    }
    ctx.strokeStyle = color(l.tone, base * a);
    ctx.stroke();
  });

  // Packets travel only on links that are fully drawn.
  for (const pk of packets) {
    const l = s.links[pk.link];
    const { p, a } = states[pk.link];
    if (p < 1 || a <= 0) continue;
    const pt = pointAt(l, pk.dir === 1 ? pk.d : l.len - pk.d);
    // Behind the headline a packet turns into a faint white dot.
    const calm = inside(pt, s.quiet);
    ctx.fillStyle = calm ? color("white", 0.12 * a) : color(pk.tone, (pk.tone === "signal" ? 0.55 : 0.38) * a);
    ctx.fillRect(Math.round(pt.x) - 1, Math.round(pt.y) - 1, 3, 3);
  }

  // Nodes: small squares; hubs are outlined squares with a filled centre.
  for (const n of s.nodes) {
    const breathe = still ? 1 : 0.7 + 0.3 * Math.sin(t * 0.5 + n.phase);
    if (n.hub) {
      const strong = n.tone === "signal" ? 0.5 : n.tone === "petrol" ? 0.9 : 0.24;
      ctx.strokeStyle = color(n.tone, strong * breathe);
      ctx.strokeRect(n.x - 4.5, n.y - 4.5, 10, 10);
      ctx.fillStyle = color(n.tone, strong * 0.8 * breathe);
      ctx.fillRect(n.x - 1, n.y - 1, 3, 3);
    } else {
      ctx.fillStyle = color(n.tone, (n.tone === "petrol" ? 0.8 : inside(n, s.quiet) ? 0.14 : 0.22) * breathe);
      ctx.fillRect(n.x - 1, n.y - 1, 3, 3);
    }
  }
  ctx.restore();
}

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scene: Scene | null = null;
    let packets: Packet[] = [];
    let raf = 0;
    let last = 0;
    let lastSpawn = 0;
    let inView = true;
    const start = performance.now();
    const rand = rng(7);

    const still = () => motionQuery.matches;
    const now = () => (performance.now() - start) / 1000;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // The headline column (the h1's parent) is the quiet box, padded a little.
      const copy = canvas.parentElement?.querySelector("h1")?.parentElement;
      const c = copy?.getBoundingClientRect();
      const quiet = c ? { x: c.left - rect.left - 24, y: c.top - rect.top - 24, w: c.width + 48, h: c.height + 48 } : null;
      const key = [w, h, quiet && [quiet.x, quiet.y, quiet.w, quiet.h].map(Math.round)].join();
      if (!scene || scene.key !== key) {
        scene = buildScene(w, h, quiet, key);
        packets = [];
      }
      draw(ctx, scene, now(), packets, still());
      canvas.style.opacity = "1";
    };

    const step = (time: number) => {
      raf = requestAnimationFrame(step);
      if (time - last < FRAME_MS || !scene) return;
      const dt = last ? Math.min((time - last) / 1000, 0.1) : 0;
      last = time;
      const t = now();

      // Move packets, drop the finished ones, start a new one now and then.
      packets = packets.filter((pk) => {
        pk.d += pk.speed * dt;
        return pk.d < scene!.links[pk.link].len;
      });
      const maxPackets = scene.w < 640 ? 3 : 7;
      if (t - lastSpawn > 0.7 && packets.length < maxPackets && scene.links.length) {
        lastSpawn = t;
        const i = Math.floor(rand() * scene.links.length);
        const l = scene.links[i];
        const st = linkState(l, t, false);
        // Only on a drawn link with time left in its hold for the trip.
        const local = (t + l.offset) % l.cycle;
        const speed = 34 + rand() * 30;
        if (st.p === 1 && st.a === 1 && l.len >= scene.cell * 2 && local + l.len / speed < l.grow + l.hold) {
          packets.push({ link: i, d: 0, speed, dir: rand() < 0.5 ? 1 : -1, tone: rand() < 0.25 ? "signal" : "white" });
        }
      }
      draw(ctx, scene, t, packets, false);
    };

    const run = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      if (scene) draw(ctx, scene, now(), packets, still());
      if (!still() && inView && document.visibilityState === "visible") raf = requestAnimationFrame(step);
    };

    resize();
    run();

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      run();
    });
    io.observe(canvas);
    const onVisibility = () => run();
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", run);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", run);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 ${className ?? ""}`}
    />
  );
}
