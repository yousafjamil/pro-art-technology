// The five solutions: the homepage tabs and the Solutions menu read this list.
// A solution's tab opens directly at /#solution-<kind>.

export type SolutionKind = "mobile" | "web" | "software" | "design" | "cloud";

export type Solution = {
  kind: SolutionKind;
  label: string;
  title: string;
  desc: string;
  items: string[];
};

export const solutions: Solution[] = [
  {
    label: "Mobile apps",
    kind: "mobile",
    title: "Mobile apps for iOS and Android",
    desc: "Fast, beautiful apps built with Flutter, React Native, Swift and Kotlin — ready for the App Store and Google Play.",
    items: ["Cross-platform & native", "Payments, maps & notifications", "Offline-ready & secure", "Store launch & updates"],
  },
  {
    label: "Web platforms",
    kind: "web",
    title: "Web platforms that scale",
    desc: "Websites, portals and SaaS products built on modern frameworks for speed, SEO and reliability.",
    items: ["Next.js & React", "E-commerce & marketplaces", "Customer & admin portals", "Performance & SEO"],
  },
  {
    label: "Custom software",
    kind: "software",
    title: "Software built around your business",
    desc: "ERP, CRM, POS and internal tools that replace spreadsheets and connect your teams.",
    items: ["ERP, CRM & POS", "Inventory & HR", "Reports & dashboards", "Integrations & APIs"],
  },
  {
    label: "UI/UX design",
    kind: "design",
    title: "Design people understand instantly",
    desc: "Research-led interfaces and design systems that make complex products feel simple.",
    items: ["User research", "Wireframes & prototypes", "Design systems", "Usability testing"],
  },
  {
    label: "Cloud & support",
    kind: "cloud",
    title: "Cloud infrastructure and care",
    desc: "Secure, scalable hosting and a team that keeps your product healthy long after launch.",
    items: ["AWS, Azure & Google Cloud", "CI/CD & monitoring", "Security updates", "Monthly support plans"],
  },
];
