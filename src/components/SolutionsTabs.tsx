"use client";

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
        <div className="h-[300px] w-[150px] rounded-[30px] bg-ink p-[7px]">
          <div className="flex h-full flex-col gap-2 rounded-[24px] bg-white px-2.5 py-3.5">
            <div className="h-20 rounded-2xl bg-brand-soft" />
            <div className="h-[7px] w-[70%] rounded bg-ink" />
            <div className="h-1.5 w-1/2 rounded bg-[#dde3ea]" />
            <div className="h-10 rounded-xl bg-surface" />
            <div className="h-10 rounded-xl bg-surface" />
          </div>
        </div>
        <div className="mt-12 h-[300px] w-[150px] rounded-[30px] bg-ink p-[7px]">
          <div className="flex h-full flex-col gap-2 rounded-[24px] bg-white px-2.5 py-3.5">
            <div className="h-[7px] w-[60%] rounded bg-ink" />
            <div className="h-[120px] rounded-2xl bg-green-soft" />
            <div className="h-8 rounded-full bg-brand" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "web") {
    return (
      <div className="flex h-[300px] w-[86%] flex-col overflow-hidden rounded-[18px] border border-line">
        <div className="flex h-[34px] items-center gap-1.5 border-b border-line px-3.5">
          <span className="size-2 rounded-full bg-[#e3e3e3]" />
          <span className="size-2 rounded-full bg-[#e3e3e3]" />
          <span className="size-2 rounded-full bg-[#e3e3e3]" />
        </div>
        <div className="flex flex-1 flex-col gap-3.5 p-5">
          <div className="h-3.5 w-[55%] rounded-md bg-ink" />
          <div className="h-2 w-2/5 rounded bg-[#dde3ea]" />
          <div className="grid flex-1 grid-cols-3 gap-3">
            <span className="rounded-2xl bg-brand-soft" />
            <span className="rounded-2xl bg-surface" />
            <span className="rounded-2xl bg-surface" />
          </div>
        </div>
      </div>
    );
  }
  if (kind === "software") {
    const rows = [
      ["80%", "Active", "bg-green-soft text-[#072711]"],
      ["65%", "Pending", "bg-brand-soft text-brand-ink"],
      ["75%", "Active", "bg-green-soft text-[#072711]"],
      ["55%", "Low", "bg-[#ffdad6] text-[#410002]"],
    ];
    return (
      <div className="w-[86%] overflow-hidden rounded-[18px] border border-line">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-3 bg-surface px-4 py-3.5 text-[13px] font-semibold text-muted">
          <span>Item</span>
          <span>Status</span>
          <span>Qty</span>
        </div>
        {rows.map(([w, s, c], i) => (
          <div key={i} className="grid grid-cols-[2fr_1fr_1fr] items-center gap-3 border-t border-line px-4 py-4">
            <span className="h-2 rounded bg-ink" style={{ width: w }} />
            <span className={`justify-self-start rounded-full px-2.5 py-0.5 text-xs font-semibold ${c}`}>{s}</span>
            <span className="h-2 w-2/5 rounded bg-[#dde3ea]" />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "design") {
    return (
      <div className="grid w-[80%] grid-cols-2 gap-4">
        <div className="flex gap-2 rounded-[20px] bg-surface p-4">
          <span className="size-9 rounded-full bg-brand" />
          <span className="size-9 rounded-full bg-brand-tint" />
          <span className="size-9 rounded-full bg-ink" />
          <span className="size-9 rounded-full bg-green-soft" />
        </div>
        <div className="rounded-[20px] bg-surface p-4 text-4xl font-semibold leading-none">Aa</div>
        <div className="col-span-2 flex flex-wrap gap-2.5 rounded-[20px] bg-surface p-4">
          <span className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">Primary</span>
          <span className="rounded-full border border-outline px-4 py-2 text-sm font-semibold text-brand">Secondary</span>
          <span className="rounded-lg bg-brand-soft px-3.5 py-2 text-sm font-semibold text-brand-ink">Chip</span>
        </div>
        <div className="col-span-2 flex h-[90px] flex-col gap-2.5 rounded-[20px] bg-surface p-4">
          <span className="h-2.5 w-1/2 rounded bg-ink" />
          <span className="h-2 w-4/5 rounded bg-[#dde3ea]" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-[80%] flex-col items-center gap-3.5">
      <div className="rounded-2xl bg-brand-soft px-5 py-3.5 font-semibold text-brand-ink">Your users</div>
      <span aria-hidden="true" className="h-5 w-0.5 bg-brand-tint" />
      <div className="rounded-2xl bg-surface px-5 py-3.5 font-semibold">Load balancer · CDN</div>
      <span aria-hidden="true" className="h-5 w-0.5 bg-brand-tint" />
      <div className="grid w-full grid-cols-3 gap-3 text-center text-sm font-semibold">
        <span className="rounded-2xl bg-surface p-3">API</span>
        <span className="rounded-2xl bg-surface p-3">Workers</span>
        <span className="rounded-2xl bg-surface p-3">Database</span>
      </div>
      <span className="text-[13px] text-muted">Monitored 24/7 · Automated backups</span>
    </div>
  );
}

export function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const cur = solutions[active];

  return (
    <>
      <div role="tablist" aria-label="Solutions" className="mt-12 flex flex-wrap justify-center gap-2">
        {solutions.map((s, i) => (
          <button
            key={s.kind}
            id={`tab-${s.kind}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="solutions-panel"
            onClick={() => setActive(i)}
            className={
              i === active
                ? "min-h-12 rounded-full border border-brand bg-brand-soft px-5.5 text-base font-semibold text-brand-ink"
                : "min-h-12 rounded-full border border-outline bg-white px-5.5 text-base font-medium text-muted hover:bg-surface"
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        id="solutions-panel"
        role="tabpanel"
        aria-labelledby={`tab-${cur.kind}`}
        className="mt-8 flex flex-wrap items-center gap-12 rounded-[40px] bg-surface p-7 sm:p-12 lg:p-[72px]"
      >
        <div className="min-w-0 flex-[1_1_380px]">
          <h3 className="text-[clamp(28px,3vw,40px)] font-medium leading-[1.15] tracking-[-0.02em]">{cur.title}</h3>
          <p className="mt-4 text-lg text-muted">{cur.desc}</p>
          <ul className="mt-7 flex flex-col gap-3.5">
            {cur.items.map((it) => (
              <li key={it} className="flex items-center gap-3 text-[17px]">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-brand" />
                {it}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-brand px-6.5 py-3.5 font-semibold text-white hover:bg-brand-ink hover:text-white"
          >
            Talk to a specialist
          </Link>
        </div>
        <div className="flex h-[400px] min-w-0 flex-[1_1_420px] items-center justify-center overflow-hidden rounded-[28px] bg-white">
          <Visual kind={cur.kind} />
        </div>
      </div>
    </>
  );
}
