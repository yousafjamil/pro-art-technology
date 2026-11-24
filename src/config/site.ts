// Company details used across the whole website.
// Leave a value empty ("") to hide it on the site.

export const site = {
  name: "ProArt Technology",
  shortName: "ProArt",
  url: "https://proarttechnology.com",
  description:
    "Elite tech house building production-grade software from Abu Dhabi. Strategy, design, and engineering operating as one system from first brief to production launch.",

  // Contact — copied from the live proarttechnology.com (2026-11-25)
  email: "hello@proart.tech",
  phone: "+971 56 587 5034",
  whatsapp: "971565875034",
  address: "Abu Dhabi, UAE", // the site's own footer; the privacy policy's legal entity (Pro Art Technology FZE) gives Sharjah, UAE instead — worth confirming which is right

  // Social links: the old site lists LinkedIn, GitHub, X/Twitter and Dribbble in its footer,
  // but none of them are real hrefs there (plain unlinked labels) — leave empty until given the real profile URLs.
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    github: "",
  },

  // Headline numbers, copied from the live site's "The Studio" section (2026-11-25).
  stats: [
    { value: "12", label: "Specialists" },
    { value: "62", label: "Projects shipped" },
    { value: "24h", label: "Response SLA" },
    { value: "83%", label: "Repeat clients" },
  ] as { value: string; label: string }[],

  // Client reviews, copied from the live site (2026-11-25).
  testimonials: [
    {
      quote: "ProArt transformed our vision into a product that exceeded every benchmark we set. Exceptional precision.",
      name: "Sarah Al-Mansoori",
      role: "CTO, Fintrack",
    },
    {
      quote: "The level of engineering precision is rare. They ship fast without cutting corners on quality.",
      name: "James Chen",
      role: "Founder, Yotto",
    },
    {
      quote: "Working with ProArt felt like having a world-class in-house team from day one. Seamless delivery.",
      name: "Maria Rodriguez",
      role: "VP Product, MedConnect",
    },
  ] as { quote: string; name: string; role: string }[],
};

export const navLinks = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/work", label: "Our work" },
  { href: "/#process", label: "How we work" },
  { href: "/#models", label: "Pricing models" },
  { href: "/contact", label: "Contact" },
];
