"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Kind = "mobile" | "web" | "software" | "design" | "cloud";

const solutions: { label: string; kind: Kind; title: string; desc: string; items: string[] }[] = [
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

function Visual({ kind }: { kind: Kind }) {
  if (kind === "mobile") {
    return (
      <div className="flex items-center gap-4">
        <div className="h-[300px] w-[150px] rounded-[26px] border border-line-strong bg-bg-raised-2 p-[7px]">
          <div className="flex h-full flex-col gap-2 rounded-[20px] bg-bg px-2.5 py-3.5">
            <div className="h-20 rounded-lg border border-accent-line bg-accent-soft" />
            <div className="h-[7px] w-[70%] rounded bg-ink/70" />
            <div className="h-1.5 w-1/2 rounded bg-line-strong" />
            <div className="h-10 rounded-md border border-line bg-bg-raised" />
            <div className="h-10 rounded-md border border-line bg-bg-raised" />
          </div>
        </div>
        <div className="mt-12 h-[300px] w-[150px] rounded-[26px] border border-line-strong bg-bg-raised-2 p-[7px]">
          <div className="flex h-full flex-col gap-2 rounded-[20px] bg-bg px-2.5 py-3.5">
            <div className="h-[7px] w-[60%] rounded bg-ink/70" />
            <div className="h-[120px] rounded-lg border border-line bg-bg-raised" />
            <div className="h-8 rounded-[6px] bg-accent" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "web") {
    return (
      <div className="flex h-[300px] w-[86%] flex-col overflow-hidden rounded-[14px] border border-line">
        <div className="flex h-[34px] items-center gap-1.5 border-b border-line px-3.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5 p-5">
          <div className="h-3.5 w-[55%] rounded-md bg-ink/70" />
          <div className="h-2 w-2/5 rounded bg-line-strong" />
          <div className="grid flex-1 grid-cols-3 gap-3">
            <span className="rounded-xl border border-accent-line bg-accent-soft" />
            <span className="rounded-xl border border-line bg-bg-raised" />
            <span className="rounded-xl border border-line bg-bg-raised" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "software") {
    const rows = [
      ["80%", "Active", "border-accent-line bg-accent-soft text-accent"],
      ["65%", "Pending", "border-line-strong bg-bg-raised text-muted"],
      ["75%", "Active", "border-accent-line bg-accent-soft text-accent"],
      ["55%", "Low", "border-line-strong bg-bg-raised text-subtle"],
    ];
    return (
      <div className="w-[86%] overflow-hidden rounded-[14px] border border-line">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 bg-bg-raised-2 px-4 py-3.5 text-[13px] font-semibold text-muted">
          <span>Item</span>
          <span>Status</span>
          <span>Qty</span>
        </div>
        {rows.map(([w, s, c], i) => (
          <div key={i} className="grid grid-cols-[2fr_1fr_1fr] items-center gap-3 border-t border-line px-4 py-4">
            <span className="h-2 rounded bg-ink/70" style={{ width: w }} />
            <span className={`justify-self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold ${c}`}>{s}</span>
            <span className="h-2 w-2/5 rounded bg-line-strong" />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "design") {
    return (
      <div className="grid w-[80%] grid-cols-2 gap-4">
        <div className="flex gap-2 rounded-[16px] border border-line bg-bg-raised p-4">
          <span className="size-9 rounded-full bg-accent" />
          <span className="size-9 rounded-full bg-tone-blue" />
          <span className="size-9 rounded-full bg-ink/80" />
          <span className="size-9 rounded-full bg-tone-green" />
        </div>
        <div className="rounded-[16px] border border-line bg-bg-raised p-4 font-display text-4xl font-semibold leading-none text-ink">
          Aa
        </div>
        <div className="col-span-2 flex flex-wrap gap-2.5 rounded-[16px] border border-line bg-bg-raised p-4">
          <span className="rounded-[6px] bg-accent px-4 py-2 text-sm font-semibold text-accent-ink">Primary</span>
          <span className="rounded-[6px] border border-line-strong px-4 py-2 text-sm font-semibold text-ink">Secondary</span>
          <span className="rounded-[6px] border border-accent-line bg-accent-soft px-3.5 py-2 text-sm font-semibold text-accent">Chip</span>
        </div>
        <div className="col-span-2 flex h-[90px] flex-col gap-2.5 rounded-[16px] border border-line bg-bg-raised p-4">
          <span className="h-2.5 w-1/2 rounded bg-ink/70" />
          <span className="h-2 w-4/5 rounded bg-line-strong" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-[80%] flex-col items-center gap-3.5">
      <div className="rounded-[14px] border border-accent-line bg-accent-soft px-5 py-3.5 font-semibold text-accent">Your users</div>
      <span aria-hidden="true" className="h-5 w-0.5 bg-line-strong" />
      <div className="rounded-[14px] border border-line bg-bg-raised px-5 py-3.5 font-semibold text-ink">Load balancer · CDN</div>
      <span aria-hidden="true" className="h-5 w-0.5 bg-line-strong" />
      <div className="grid w-full grid-cols-3 gap-3 text-center text-sm font-semibold text-ink">
        <span className="rounded-[14px] border border-line bg-bg-raised p-3">API</span>
        <span className="rounded-[14px] border border-line bg-bg-raised p-3">Workers</span>
        <span className="rounded-[14px] border border-line bg-bg-raised p-3">Database</span>
      </div>
      <span className="label text-subtle">Monitored 24/7 · Automated backups</span>
    </div>
  );
}

export function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const cur = solutions[active];

  return (
    <>
      <div role="tablist" aria-label="Solutions" className="mt-12 flex flex-wrap justify-center gap-1 border-b border-line">
        {solutions.map((s, i) => (
          <button
            key={s.kind}
            id={`tab-${s.kind}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="solutions-panel"
            onClick={() => setActive(i)}
            className={`label relative min-h-12 px-5 pb-4 pt-3 transition-colors ${
              i === active ? "text-ink" : "text-subtle hover:text-muted"
            }`}
          >
            {s.label}
            {i === active && (
              <motion.span
                layoutId="solutions-underline"
                className="absolute inset-x-3 bottom-0 h-[2px] bg-accent"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        id="solutions-panel"
        role="tabpanel"
        aria-labelledby={`tab-${cur.kind}`}
        className="relative mt-8 flex flex-wrap items-center gap-12 overflow-hidden rounded-[28px] border border-line bg-bg-raised p-7 sm:p-12 lg:p-[72px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.kind}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-w-0 flex-1 flex-wrap items-center gap-12"
          >
            <div className="min-w-0 flex-[1_1_380px]">
              <h3 className="text-balance font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.15] tracking-[-0.01em]">
                {cur.title}
              </h3>
              <p className="mt-4 text-lg text-muted">{cur.desc}</p>
              <ul className="mt-7 flex flex-col gap-3.5">
                {cur.items.map((it) => (
                  <li key={it} className="flex items-center gap-3 text-[16px] text-ink">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="label mt-8 inline-block rounded-[8px] bg-accent px-6.5 py-3.5 text-accent-ink hover:bg-ink"
              >
                Talk to a specialist
              </Link>
            </div>
            <div className="flex h-[400px] min-w-0 flex-[1_1_420px] items-center justify-center overflow-hidden rounded-[20px] border border-line bg-bg">
              <Visual kind={cur.kind} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
