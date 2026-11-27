// ─────────────────────────────────────────────────────────────
//  PORTFOLIO PROJECTS
//
//  To add a new project, copy one block below, paste it at the
//  top of the list and change the details.
//
//  Pictures: put screenshots in  public/projects/<slug>/
//  and list them in `images`, e.g.
//      images: ["/projects/quick-swapper/1.png", "/projects/quick-swapper/2.png"],
//  Website screenshots are  public/projects/<slug>/site.jpg  (1440 x 900).
//  The first image is used as the cover. Without images, the card and
//  the project page show a geometric composition described by `art`
//  (the kinds are in src/components/GeoArt.tsx). Give each project
//  without images its own kind and colours, so no two cards look alike.
// ─────────────────────────────────────────────────────────────

import type { ArtSpec } from "@/components/GeoArt";

export type ProjectCategory = "Mobile App" | "Web Platform" | "Website" | "Software";

export type ProjectLinkKind = "play-store" | "app-store" | "website";

export type ProjectLink = {
  kind: ProjectLinkKind;
  url: string;
};

export type Project = {
  slug: string; // used in the page address: /work/<slug>
  name: string;
  category: ProjectCategory;
  industry: string;
  summary: string; // one sentence shown on cards
  description?: string; // longer text shown on the project page
  links: ProjectLink[];
  images?: string[];
  // How `images` are framed: "phone" (app screens) or "browser" (website
  // screenshots). Default: "phone" for a Mobile App, "browser" for the rest.
  imageFrame?: "phone" | "browser";
  tech?: string[];
  featured?: boolean; // show on the homepage
  // The composition drawn when there is no screenshot (or it fails to load).
  art?: ArtSpec;
};

export const projects: Project[] = [
  {
    slug: "yotto-health",
    name: "Yotto Health",
    category: "Web Platform",
    industry: "Healthcare",
    summary: "A digital health platform for health monitoring and condition management.",
    description:
      "Yotto Health is a digital health platform that offers health monitoring services and helps users manage their health conditions in one place.",
    links: [{ kind: "website", url: "https://yotto.health/" }],
    featured: true,
    // A field of readings with a heartbeat traced through it.
    art: {
      kind: "dots",
      bg: "petrol",
      dot: "petrol2",
      cols: 12,
      rows: 7,
      size: 0.4,
      hi: [36, 37, 38, 39, 28, 17, 66, 55, 44, 45, 46, 47],
      hiColor: "signal",
      hi2: [10, 11, 22, 23],
      hi2Color: "stone",
    },
  },
  {
    slug: "ride-chauffeur",
    name: "Ride Chauffeur",
    category: "Web Platform",
    industry: "Transportation",
    summary: "A platform for booking professional chauffeurs and transport services.",
    description:
      "Ride Chauffeur makes it simple to book professional drivers and transport services online, with a smooth booking experience for every customer.",
    links: [{ kind: "website", url: "https://ridechauffeur.com/" }],
    featured: true,
    // One diagonal cut, like a road crossing the frame.
    art: { kind: "diagonal", bg: "stone", cut: "ink", band: "signal", mark: "ink" },
  },
  {
    slug: "apopou-cashback",
    name: "Apopou Cashback",
    category: "Mobile App",
    industry: "Fintech",
    summary: "A cashback app that rewards users with cash-back offers and deals.",
    description:
      "Apopou is a mobile app that gives users a cashback system and cash-back offers, rewarding them every time they shop.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.cashback.apopou" }],
    featured: true,
    // A rising bar chart under a large cropped disc, like a coin.
    art: {
      kind: "bars",
      bg: "signal",
      bar: "ink",
      accent: "stone",
      heights: [0.22, 0.34, 0.28, 0.44, 0.38, 0.56],
      accentIndex: 5,
      coin: "signal2",
    },
  },
  {
    slug: "lms-solutions",
    name: "LMS Logistics Solutions",
    category: "Web Platform",
    industry: "Logistics",
    summary: "A corporate platform presenting LMS's logistics services.",
    description:
      "A corporate web platform presenting LMS's logistics services — multi-client warehousing, dedicated warehousing, e-commerce fulfillment, and value-added services.",
    links: [{ kind: "website", url: "https://lms-solutions.com/" }],
    images: ["/projects/lms-solutions/site.jpg"],
    featured: true,
  },
  {
    slug: "uno-luxury",
    name: "Uno Luxury",
    category: "Website",
    industry: "E-commerce / Luxury",
    summary: "A direct-to-consumer luxury marketplace with 100,000+ products.",
    description:
      "Direct-to-consumer luxury marketplace — 100,000+ premium items at factory-direct pricing, with secure checkout and verified delivery across the United States.",
    links: [],
    images: ["/projects/uno-luxury/site.jpg"],
    featured: true,
  },
  {
    slug: "binops-pharma",
    name: "BinOps Pharma",
    category: "Mobile App",
    industry: "Healthcare",
    summary: "An app for managing pharmaceutical services and products.",
    description:
      "BinOps Pharma is a specialised mobile app for managing pharmaceutical services and products.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.binops.pharma.pk" }],
    // Stacked capsules, one of them two-coloured like a pill.
    art: {
      kind: "pills",
      bg: "ink",
      rows: [
        { x: -20, w: 96, c: "petrol2" },
        { x: 46, w: 128, c: "signal", c2: "stone" },
        { x: -12, w: 70, c: "stone" },
        { x: 72, w: 100, c: "petrol2" },
        { x: 20, w: 92, c: "signal2" },
      ],
    },
  },
  {
    slug: "ward-guide-first-aid",
    name: "Ward Guide — First Aid",
    category: "Mobile App",
    industry: "Healthcare",
    summary: "A first-aid guide that helps people respond in emergencies.",
    description:
      "Ward Guide is a first-aid guide app that helps people take the right steps quickly in emergency situations.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.firstaid.wardguide" }],
    // A mosaic of square tiles with quarter and half discs in all four colours.
    art: {
      kind: "mosaic",
      tiles: [
        ["signal", "ink", "q2"], ["stone", "signal", "h3"], ["ink", "stone", "q3"], ["petrol", "signal", "c"],
        ["ink", "signal", "q1"], ["signal", "stone", "c"], ["stone", "ink", "h0"], ["signal", "ink", "q3"],
        ["petrol", "stone", "q0"], ["ink", "signal", "h2"], ["signal", "ink", "q1"], ["stone", "petrol", "q2"],
      ],
    },
  },
  {
    slug: "quick-swapper",
    name: "Quick Swappers",
    category: "Mobile App",
    industry: "Marketplace",
    summary: "A peer-to-peer swap marketplace for cars, phones, furniture and more.",
    description:
      "A peer-to-peer swap marketplace where users exchange items across categories like vehicles, mobiles, furniture, and home goods.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.noman.quickSwapper" }],
    images: ["/projects/quick-swapper/site.jpg"],
    imageFrame: "browser", // a single marketing banner from the old site, not individual app screens
    featured: true,
  },
  {
    slug: "find-my-phone",
    name: "Find My Phone",
    category: "Mobile App",
    industry: "Utilities",
    summary: "Locate a lost phone with advanced alert tools.",
    description:
      "Find My Phone is a smart app that helps users find their lost phone using advanced alert tools.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.restmind.findmyphone" }],
    // Concentric rings around one point, like a locator's ping.
    art: { kind: "rings", bg: "stone", cx: 112, cy: 54, step: 13, colors: ["petrol", "stone", "petrol", "stone", "petrol", "signal"], mark: "ink" },
  },
  {
    slug: "itec-experts",
    name: "ITEC Experts",
    category: "Website",
    industry: "IT Services",
    summary: "A professional website for IT services and digital solutions.",
    description:
      "A professional website for ITEC Experts, presenting their IT services and digital solutions to new clients.",
    links: [{ kind: "website", url: "https://itecexperts.com/" }],
    images: ["/projects/itec-experts/site.jpg"],
  },
  {
    slug: "build-hub",
    name: "Build Hub",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://build-hub.net/" }],
    images: ["/projects/build-hub/site.jpg"],
  },
  {
    slug: "al-ashjar-al-raqiah",
    name: "Al Ashjar Al Raqiah",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://alashjaralraqiah.com/" }],
    images: ["/projects/al-ashjar-al-raqiah/site.jpg"],
  },
  {
    slug: "sadad",
    name: "Sadad",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://sadadad.com/en" }],
    images: ["/projects/sadad/site.jpg"],
  },
  {
    slug: "luckie",
    name: "LUCKIE",
    category: "Mobile App",
    industry: "Community",
    summary: "A community app for expatriates and locals, with news, jobs, challenges and AI.",
    description:
      "LUCKIE is a community mobile app for expatriates and local community members, starting in Saudi Arabia. Five areas: Home (news, posts, jobs and a shared map), Challenges (quizzes and a leaderboard), AI (chatbot and photo/video tools), Inbox (chat and invitations) and Profile.",
    links: [{ kind: "website", url: "https://luckieapp.com/" }],
    images: ["/projects/luckie/site.jpg"],
    imageFrame: "browser", // a screenshot of the website, not of the app
    featured: true,
  },
  {
    slug: "kingdom-of-projects",
    name: "Kingdom of Projects",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://kingdomofprojects.com/" }],
    images: ["/projects/kingdom-of-projects/site.jpg"],
  },
  {
    slug: "zoom-zamani",
    name: "Zoom Zamani Studio",
    category: "Website",
    industry: "Photography",
    summary: "A photography studio in Riyadh with over 50 years in business.",
    description:
      "A business website for Zoom Zamani Studio, a Riyadh photography studio — photo printing and restoration, commercial and product photography, event photography, and an art workshop for frames and photo albums.",
    links: [{ kind: "website", url: "https://zoomzamani.com/" }],
    images: ["/projects/zoom-zamani/site.jpg"],
  },
];

export const categories: ProjectCategory[] = ["Mobile App", "Web Platform", "Website", "Software"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getIndustries() {
  return Array.from(new Set(projects.map((p) => p.industry))).sort();
}

export const linkLabels: Record<ProjectLinkKind, string> = {
  "play-store": "Google Play",
  "app-store": "App Store",
  website: "Visit website",
};

// Used when a project with screenshots has no `art` and its image fails to
// load (or behind a phone screenshot): one of these, chosen by the slug.
const fallbackArt: ArtSpec[] = [
  { kind: "arches", bg: "petrol", cx: 80, step: 17, colors: ["signal", "stone", "ink", "signal2"] },
  { kind: "dots", bg: "ink", dot: "night3", cols: 10, rows: 6, size: 0.55, square: true, hi: [12, 13, 22, 23, 34, 35, 44, 45], hiColor: "signal" },
  { kind: "arches", bg: "stone", cx: 136, step: 20, colors: ["ink", "signal", "stone", "petrol"] },
];

function slugHash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function projectArt(project: Project): ArtSpec {
  return project.art ?? fallbackArt[slugHash(project.slug) % fallbackArt.length];
}
