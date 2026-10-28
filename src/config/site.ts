// Company details used across the whole website.
// Leave a value empty ("") to hide it on the site.

export const site = {
  name: "ProArt Technology",
  shortName: "ProArt",
  url: "https://proarttechnology.com",
  description:
    "ProArt Technology designs, builds and scales mobile apps, web platforms and custom software for startups and businesses worldwide.",

  // Contact
  email: "info@proarttechnology.com",
  phone: "", // e.g. "+92 300 0000000"
  whatsapp: "", // digits only with country code, e.g. "923000000000"
  address: "", // e.g. "Office 12, Business Center, Lahore, Pakistan"

  // Social links (leave empty to hide)
  social: {
    linkedin: "",
    facebook: "",
    instagram: "",
    github: "",
  },

  // Optional headline numbers. Leave the list empty to hide the section.
  stats: [] as { value: string; label: string }[],
  // Example:
  // stats: [
  //   { value: "120+", label: "Products launched" },
  //   { value: "25+", label: "Engineers & designers" },
  // ],

  // Optional client reviews. Leave empty to hide the section.
  testimonials: [] as { quote: string; name: string; role: string }[],
};

export const navLinks = [
  { href: "/#solutions", label: "Solutions" },
  { href: "/work", label: "Our work" },
  { href: "/#process", label: "How we work" },
  { href: "/#models", label: "Pricing models" },
  { href: "/contact", label: "Contact" },
];
