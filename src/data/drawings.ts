// ─────────────────────────────────────────────────────────────
//  PROJECT DRAWINGS
//
//  Each project is drawn as a technical elevation of its main screen:
//  a phone or a browser, the screen built from the blocks below, and
//  numbered callouts that point at the parts that make the product what
//  it is. The drawing component (src/components/drawing/) renders the
//  same spec on the project card and, larger, on the project page.
//
//  To draw a new project, add an entry under its slug. Blocks stack top
//  to bottom inside the screen; `h` is the height in screen units (the
//  phone screen is 140 x 340, the browser 368 x 260, or 316 wide with a
//  sidebar). A block without `h` takes the space that is left. `n` puts
//  callout n on a block; `at` puts callouts on points inside it, as
//  fractions of its width and height. Callout labels are [short, long]:
//  the short one (12 characters at most) is drawn on the card, the long
//  one (30 at most) in the parts list on the project page.
//  A project without an entry gets a plain drawing for its category.
// ─────────────────────────────────────────────────────────────

import type { Project } from "./projects";

export type Glyph =
  | "cross" | "drop" | "heart" | "flame" | "bolt" | "car" | "suv" | "van" | "phone" | "sofa" | "capsule"
  | "bell" | "torch" | "vibrate" | "pin" | "clock" | "calendar" | "bag" | "server" | "code" | "shield"
  | "box" | "truck" | "user" | "globe" | "chat" | "menu" | "back" | "search" | "frame" | "swap" | "spark"
  | "home" | "briefcase" | "trophy" | "watch" | "pulse" | "pill" | "store";

type Base = { h?: number; n?: number; at?: [n: number, fx: number, fy: number][]; rtl?: boolean };

export type Block = Base &
  (
    | { kind: "appbar"; lead?: "menu" | "back" | "cross" | "logo"; icons?: Glyph[]; ai?: boolean }
    | { kind: "topbar" }
    | { kind: "nav"; links?: number; cta?: boolean; lang?: boolean; search?: boolean; cart?: boolean }
    | { kind: "figure"; value: string; action?: boolean }
    | {
        kind: "list";
        rows: number;
        lead?: "circle" | "square" | "capsule" | "glyph";
        glyphs?: Glyph[];
        trail?: "badge" | "meter" | "toggle" | "chevron";
        values?: string[];
        fills?: number[];
      }
    | { kind: "chips"; count?: number; glyphs?: Glyph[] }
    | { kind: "search" }
    | { kind: "lineChart"; points: number[] }
    | { kind: "map"; route: [number, number][] }
    | { kind: "floorplan"; racks?: number; docks?: number }
    | { kind: "tiles"; cols: number; rows?: number; caption?: "price" | "lines"; crop?: boolean; masonry?: boolean; photo?: boolean }
    | { kind: "steps"; count: number }
    | { kind: "radar" }
    | { kind: "swap"; left: Glyph; right: Glyph }
    | { kind: "button"; glyph?: Glyph }
    | { kind: "tabbar"; glyphs: Glyph[] }
    | { kind: "hero"; align?: "left" | "center"; image?: "side" | "full" | "ring" | "none"; actions?: number; big?: boolean }
    | { kind: "cards"; glyphs: Glyph[] }
    | { kind: "stats"; values?: string[]; count?: number }
    | { kind: "booking" }
    | { kind: "text"; lines: number; align?: "left" | "right" }
    | { kind: "split"; imageSide: "left" | "right" }
    | { kind: "logos"; count: number }
    | { kind: "post" }
    | { kind: "quiz" }
    | { kind: "beforeAfter" }
    | { kind: "frames" }
    | { kind: "numbered"; rows: number }
    | { kind: "vitals"; values: string[] }
    | { kind: "vehicles"; glyphs: Glyph[] }
    | { kind: "filters"; rows: number }
    | { kind: "calendar" }
    | { kind: "band" }
    | { kind: "footer" }
    | { kind: "topics"; glyphs: Glyph[] }
    | { kind: "row"; cols: number[]; items: Block[] }
  );

export type Drawing = {
  frame: "phone" | "browser";
  sidebar?: Glyph[]; // browser only: an app sidebar with these icons
  dim?: string; // the width written on the dimension line (default 390 / 1440)
  blocks: Block[];
  callouts: [short: string, long: string][];
  detail?: { n: number; fx?: number; fy?: number }; // the enlarged "Detail A" on the project page
};

export const drawings: Record<string, Drawing> = {
  "yotto-health": {
    frame: "browser",
    sidebar: ["home", "pulse", "pill", "calendar", "user"],
    blocks: [
      { kind: "topbar", h: 18 },
      { kind: "vitals", h: 60, n: 1, values: ["72", "118/76", "5.8", "98%"] },
      { kind: "lineChart", h: 96, n: 2, points: [0.55, 0.62, 0.48, 0.7, 0.58, 0.66, 0.42, 0.6, 0.52, 0.74, 0.64] },
      {
        kind: "row",
        cols: [3, 2],
        items: [
          { kind: "list", rows: 3, lead: "glyph", glyphs: ["pill", "heart", "drop"], trail: "chevron", n: 3 },
          { kind: "calendar", n: 4 },
        ],
      },
    ],
    callouts: [
      ["Vitals", "Live vitals"],
      ["Trend", "Monitoring trend"],
      ["Conditions", "Conditions and medication"],
      ["Reminders", "Check-in reminders"],
    ],
    detail: { n: 1, fx: 0.13, fy: 0.5 },
  },

  "ride-chauffeur": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 4, cta: true },
      {
        kind: "row",
        h: 150,
        cols: [2, 3],
        items: [
          { kind: "booking", n: 1 },
          {
            kind: "map",
            n: 2,
            route: [[0.14, 0.78], [0.3, 0.78], [0.3, 0.5], [0.58, 0.5], [0.58, 0.28], [0.84, 0.22]],
          },
        ],
      },
      { kind: "vehicles", n: 3, glyphs: ["car", "suv", "van"] },
    ],
    callouts: [
      ["Booking", "Pickup, drop-off, date, time"],
      ["Route", "Route preview"],
      ["Vehicles", "Vehicle classes"],
    ],
    detail: { n: 2, fx: 0.84, fy: 0.26 },
  },

  "apopou-cashback": {
    frame: "phone",
    blocks: [
      { kind: "appbar", h: 22, lead: "menu", icons: ["bell"] },
      { kind: "figure", h: 96, n: 1, value: "24.80", action: true },
      { kind: "chips", h: 18, n: 2, count: 4 },
      {
        kind: "list",
        n: 3,
        rows: 4,
        lead: "glyph",
        glyphs: ["store", "bag", "store", "bag"],
        trail: "badge",
        values: ["5%", "8%", "3%", "12%"],
      },
      { kind: "tabbar", h: 24, n: 4, glyphs: ["home", "store", "spark", "user"] },
    ],
    callouts: [
      ["Balance", "Cashback balance, withdraw"],
      ["Categories", "Shop categories"],
      ["Store offers", "Store offers, cashback rate"],
      ["Tab bar", "Tab bar"],
    ],
    detail: { n: 3, fx: 0.86, fy: 0.12 },
  },

  "lms-solutions": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 5, cta: true },
      { kind: "hero", h: 30, align: "left", image: "none", actions: 1 },
      { kind: "floorplan", h: 134, n: 1, at: [[2, 0.5, 0.97]], racks: 5, docks: 6 },
      { kind: "cards", n: 3, glyphs: ["box", "store", "truck", "bolt"] },
    ],
    callouts: [
      ["Racking", "Warehouse racking plan"],
      ["Docks", "Loading docks"],
      ["Services", "Four service lines"],
    ],
    detail: { n: 2, fx: 0.5, fy: 0.9 },
  },

  "uno-luxury": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 20, links: 3, search: true, cart: true, n: 4, at: [[1, 0.4, 0.5]] },
      {
        kind: "row",
        cols: [1, 3.2],
        items: [
          { kind: "filters", rows: 6, n: 2 },
          { kind: "tiles", cols: 4, rows: 2, caption: "price", n: 3 },
        ],
      },
    ],
    callouts: [
      ["Search", "Search, 100,000+ items"],
      ["Filters", "Filters"],
      ["Product grid", "Product grid with prices"],
      ["Bag", "Bag and secure checkout"],
    ],
    detail: { n: 3, fx: 0.12, fy: 0.42 },
  },

  "binops-pharma": {
    frame: "phone",
    blocks: [
      { kind: "appbar", h: 22, lead: "back", icons: ["bell"] },
      { kind: "search", h: 24, n: 1 },
      { kind: "stats", h: 52, n: 2, values: ["128", "14"] },
      {
        kind: "list",
        n: 3,
        at: [[4, 0.86, 0.1]],
        rows: 5,
        lead: "capsule",
        trail: "meter",
        fills: [0.82, 0.3, 0.64, 0.14, 0.5],
      },
      { kind: "tabbar", h: 24, glyphs: ["home", "pill", "box", "user"] },
    ],
    callouts: [
      ["Search", "Product search"],
      ["Stock", "Stock summary"],
      ["Products", "Product list"],
      ["Stock level", "Stock level per item"],
    ],
    detail: { n: 4, fx: 0.86, fy: 0.1 },
  },

  "ward-guide-first-aid": {
    frame: "phone",
    blocks: [
      { kind: "appbar", h: 22, lead: "cross", icons: ["search"] },
      { kind: "button", h: 30, n: 1, glyph: "phone" },
      { kind: "topics", h: 108, n: 2, glyphs: ["drop", "flame", "heart", "bolt"] },
      { kind: "steps", n: 3, count: 3 },
    ],
    callouts: [
      ["Emergency", "Emergency call"],
      ["Topics", "First-aid topics"],
      ["Steps", "Step-by-step guide"],
    ],
    detail: { n: 2, fx: 0.25, fy: 0.27 },
  },

  "quick-swapper": {
    frame: "phone",
    blocks: [
      { kind: "search", h: 24 },
      { kind: "chips", h: 24, n: 1, glyphs: ["car", "phone", "sofa", "box"] },
      { kind: "swap", h: 92, n: 2, left: "car", right: "phone" },
      { kind: "tiles", n: 3, cols: 2, rows: 2, caption: "lines" },
      { kind: "tabbar", h: 24, glyphs: ["home", "swap", "chat", "user"] },
    ],
    callouts: [
      ["Categories", "Categories"],
      ["Swap offer", "Swap offer, item for item"],
      ["Listings", "Listings"],
    ],
    detail: { n: 2, fx: 0.5, fy: 0.42 },
  },

  "find-my-phone": {
    frame: "phone",
    blocks: [
      { kind: "appbar", h: 22, lead: "menu", icons: ["globe"] },
      { kind: "radar", h: 104, n: 1 },
      { kind: "button", h: 30, n: 2, glyph: "bell" },
      {
        kind: "list",
        n: 3,
        rows: 3,
        lead: "glyph",
        glyphs: ["torch", "vibrate", "bell"],
        trail: "toggle",
      },
    ],
    callouts: [
      ["Locator", "Locator"],
      ["Alarm", "Alarm button"],
      ["Alert tools", "Alert tool switches"],
    ],
    detail: { n: 1, fx: 0.66, fy: 0.3 },
  },

  "itec-experts": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 4, cta: true },
      { kind: "hero", h: 84, n: 1, align: "center", image: "none", actions: 2 },
      { kind: "cards", h: 70, n: 2, glyphs: ["server", "code", "shield"] },
      { kind: "logos", h: 24, n: 3, count: 6 },
      { kind: "footer" },
    ],
    callouts: [
      ["Hero", "Centred hero, two actions"],
      ["Services", "IT service cards"],
      ["Clients", "Client logos"],
    ],
    detail: { n: 2, fx: 0.08, fy: 0.25 },
  },

  "build-hub": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 4, cta: true },
      { kind: "hero", h: 128, n: 1, image: "full", actions: 1 },
      { kind: "split", n: 2, imageSide: "left" },
      { kind: "band", h: 26, n: 3 },
    ],
    callouts: [
      ["Hero", "Full-width image hero"],
      ["About", "Image and text section"],
      ["Contact", "Contact band"],
    ],
    detail: { n: 1, fx: 0.15, fy: 0.78 },
  },

  "al-ashjar-al-raqiah": {
    frame: "browser",
    dim: "1440 · RTL",
    blocks: [
      { kind: "nav", h: 18, links: 4, cta: true, rtl: true, at: [[1, 0.1, 0.5]] },
      { kind: "hero", h: 108, n: 2, align: "left", image: "side", actions: 1, rtl: true },
      { kind: "cards", h: 66, n: 3, glyphs: ["globe", "briefcase", "shield"], rtl: true },
      { kind: "text", lines: 3, align: "right" },
    ],
    callouts: [
      ["RTL nav", "Right-to-left navigation"],
      ["Hero", "Mirrored hero"],
      ["Services", "Service cards"],
    ],
    detail: { n: 1, fx: 0.92, fy: 0.5 },
  },

  sadad: {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 3, cta: true, lang: true, at: [[1, 0.73, 0.5]] },
      { kind: "hero", h: 104, n: 2, align: "left", image: "ring", actions: 2 },
      { kind: "stats", h: 48, n: 3, count: 4 },
      { kind: "split", imageSide: "right" },
    ],
    callouts: [
      ["EN / AR", "English / Arabic switch"],
      ["Hero", "Hero"],
      ["Key figures", "Key figures"],
    ],
    detail: { n: 1, fx: 0.73, fy: 0.5 },
  },

  luckie: {
    frame: "phone",
    blocks: [
      { kind: "appbar", h: 24, lead: "logo", icons: ["bell"], ai: true, at: [[1, 0.73, 0.5]] },
      { kind: "chips", h: 18, n: 2, count: 4 },
      { kind: "post", n: 3 },
      { kind: "quiz", h: 76, n: 4 },
      { kind: "tabbar", h: 26, n: 5, glyphs: ["home", "briefcase", "trophy", "chat", "user"] },
    ],
    callouts: [
      ["AI button", "AI button, top bar"],
      ["Sections", "Sections: news, jobs, map"],
      ["Post card", "Community post"],
      ["Challenge", "Quiz challenge"],
      ["Tabs", "Five-tab bar"],
    ],
    detail: { n: 1, fx: 0.73, fy: 0.5 },
  },

  "kingdom-of-projects": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 4, cta: true },
      { kind: "hero", h: 70, n: 1, align: "left", image: "none", actions: 1, big: true },
      { kind: "numbered", h: 96, n: 2, rows: 3 },
      { kind: "tiles", n: 3, cols: 4, rows: 1, photo: true },
    ],
    callouts: [
      ["Hero", "Large-type hero"],
      ["Index", "Numbered section index"],
      ["Gallery", "Image strip"],
    ],
    detail: { n: 2, fx: 0.06, fy: 0.17 },
  },

  "zoom-zamani": {
    frame: "browser",
    blocks: [
      { kind: "nav", h: 18, links: 5, cta: true },
      { kind: "tiles", h: 146, n: 1, cols: 4, masonry: true, crop: true, photo: true },
      {
        kind: "row",
        cols: [1, 1],
        items: [
          { kind: "beforeAfter", n: 2 },
          { kind: "frames", n: 3 },
        ],
      },
    ],
    callouts: [
      ["Portfolio", "Portfolio grid, crop marks"],
      ["Restoration", "Before and after restoration"],
      ["Frames", "Frames and albums"],
    ],
    detail: { n: 1, fx: 0.25, fy: 0.02 },
  },
};

const plainApp: Drawing = {
  frame: "phone",
  blocks: [
    { kind: "appbar", h: 22, lead: "menu", icons: ["bell"] },
    { kind: "hero", h: 110, n: 1, image: "full", actions: 0 },
    { kind: "list", n: 2, rows: 4, lead: "square", trail: "chevron" },
    { kind: "tabbar", h: 24, n: 3, glyphs: ["home", "search", "chat", "user"] },
  ],
  callouts: [
    ["Content", "Content"],
    ["List", "List"],
    ["Tab bar", "Tab bar"],
  ],
};

const plainSite: Drawing = {
  frame: "browser",
  blocks: [
    { kind: "nav", h: 18, links: 4, cta: true, n: 1 },
    { kind: "hero", h: 110, n: 2, image: "side", actions: 1 },
    { kind: "cards", n: 3, glyphs: ["box", "globe", "shield"] },
  ],
  callouts: [
    ["Navigation", "Navigation"],
    ["Hero", "Hero"],
    ["Sections", "Sections"],
  ],
};

export function drawingFor(project: Project): Drawing {
  return drawings[project.slug] ?? (project.category === "Mobile App" ? plainApp : plainSite);
}
