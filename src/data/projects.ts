// ─────────────────────────────────────────────────────────────
//  PORTFOLIO PROJECTS
//
//  To add a new project, copy one block below, paste it at the
//  top of the list and change the details.
//
//  Pictures: put screenshots in  public/projects/<slug>/
//  and list them in `images`, e.g.
//      images: ["/projects/quick-swapper/1.png", "/projects/quick-swapper/2.png"],
//  The first image is used as the cover. Without images, websites
//  show a live screenshot of the site and apps show a phone preview.
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
  tone?: "blue" | "green" | "gray" | "peach"; // card background colour
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
    tone: "blue",
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
    tone: "gray",
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
    tone: "green",
  },
  {
    slug: "lms-solutions",
    name: "LMS Solutions",
    category: "Web Platform",
    industry: "Education",
    summary: "A learning management system for managing courses and training.",
    description:
      "LMS Solutions is an e-learning platform (Learning Management System) that helps organisations create, manage and deliver courses and training.",
    links: [{ kind: "website", url: "https://lms-solutions.com/" }],
    featured: true,
    tone: "peach",
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
    tone: "blue",
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
    tone: "peach",
  },
  {
    slug: "quick-swapper",
    name: "Quick Swapper",
    category: "Mobile App",
    industry: "Utilities",
    summary: "Swap and transfer files between devices quickly and easily.",
    description:
      "Quick Swapper is a mobile app for quickly swapping and transferring files between devices with ease.",
    links: [{ kind: "play-store", url: "https://play.google.com/store/apps/details?id=com.noman.quickSwapper" }],
    tone: "green",
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
    tone: "gray",
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
    tone: "blue",
  },
  {
    slug: "build-hub",
    name: "Build Hub",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://build-hub.net/" }],
    tone: "gray",
  },
  {
    slug: "al-ashjar-al-raqiah",
    name: "Al Ashjar Al Raqiah",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://alashjaralraqiah.com/" }],
    tone: "green",
  },
  {
    slug: "sadad",
    name: "Sadad",
    category: "Website",
    industry: "Business",
    summary: "Business website designed and developed by ProArt Technology.",
    links: [{ kind: "website", url: "https://sadadad.com/en" }],
    tone: "peach",
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

export const tones = {
  blue: { bg: "bg-brand-soft", ink: "text-brand", fill: "bg-brand" },
  green: { bg: "bg-green-soft", ink: "text-green-ink", fill: "bg-green-ink" },
  gray: { bg: "bg-gray-soft", ink: "text-ink", fill: "bg-ink" },
  peach: { bg: "bg-peach-soft", ink: "text-peach-ink", fill: "bg-peach-ink" },
} as const;
