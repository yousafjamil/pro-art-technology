// ─────────────────────────────────────────────────────────────
//  PORTFOLIO PROJECTS
//
//  To add a new project, copy one block below, paste it at the
//  top of the list and change the details.
//
//  Pictures: put screenshots in  public/projects/<slug>/
//  and list them in `images`, e.g.
//      images: ["/projects/quick-swapper/1.png", "/projects/quick-swapper/2.png"],
//  The first image is used as the cover. Without images, the card and
//  the project page show the project's technical drawing, set up in
//  src/data/drawings.ts (a new project without one gets a plain drawing).
// ─────────────────────────────────────────────────────────────

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
  tech?: string[];
  featured?: boolean; // show on the homepage
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
  },
  {
    slug: "build-hub",
    name: "Build Hub",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://build-hub.net/" }],
  },
  {
    slug: "al-ashjar-al-raqiah",
    name: "Al Ashjar Al Raqiah",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://alashjaralraqiah.com/" }],
  },
  {
    slug: "sadad",
    name: "Sadad",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://sadadad.com/en" }],
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
    featured: true,
  },
  {
    slug: "kingdom-of-projects",
    name: "Kingdom of Projects",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://kingdomofprojects.com/" }],
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

// Live screenshot of a website, used when a project has no images yet.
export function websiteShot(url: string) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`;
}

export function coverImage(project: Project) {
  if (project.images?.length) return project.images[0];
  const site = project.links.find((l) => l.kind === "website");
  return site ? websiteShot(site.url) : undefined;
}

// Sheet number of a project in the full list ("03 / 16"), used by the card's
// spec mark so the same project keeps the same number on every page.
export function projectNumber(project: Project) {
  // By slug, not by object: client components receive serialized copies.
  return projects.findIndex((p) => p.slug === project.slug) + 1;
}
