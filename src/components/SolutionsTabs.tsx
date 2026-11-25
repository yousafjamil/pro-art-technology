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

const EASE = [0.22, 1, 0.36, 1] as const;

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-1.5 rounded-[2px] bg-line-strong ${className}`} style={{ width: w }} />;
}

// Each solution drawn as a hairline wireframe in the neutral ramp.
function Visual({ kind }: { kind: Kind }) {
  if (kind === "mobile") {
    return (
      <div className="flex items-center gap-4">
        {[0, 1].map((n) => (
          <div
            key={n}
            className={`h-[300px] w-[150px] rounded-[24px] border border-line-strong bg-bg-raised p-[6px] ${n === 1 ? "mt-12" : ""}`}
          >
            <div className="flex h-full flex-col gap-2 rounded-[18px] border border-line bg-bg px-3 py-4">
              {n === 0 ? (
                <>
                  <span className="h-20 rounded-[4px] border border-line-strong" />
                  <Bar w="70%" className="mt-1" />
                  <Bar w="50%" />
                  <span className="h-10 rounded-[4px] border border-line" />
                  <span className="h-10 rounded-[4px] border border-line" />
                </>
              ) : (
                <>
                  <Bar w="60%" />
                  <span className="h-[120px] rounded-[4px] border border-line-strong" />
                  <span className="mt-auto h-8 rounded-[4px] bg-ink/80" />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "web") {
    return (
      <div className="flex h-[300px] w-[86%] flex-col overflow-hidden rounded-[6px] border border-line-strong bg-bg-raised">
        <div className="flex h-8 items-center gap-1.5 border-b border-line px-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full border border-line-strong" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="h-3 w-[55%] rounded-[2px] bg-ink/70" />
          <Bar w="40%" />
          <div className="mt-2 grid flex-1 grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="rounded-[4px] border border-line-strong" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === "software") {
    const rows = [
      ["80%", "Active"],
      ["65%", "Pending"],
      ["75%", "Active"],
      ["55%", "Low"],
    ];
    return (
      <div className="w-[86%] overflow-hidden rounded-[6px] border border-line-strong bg-bg-raised">
        <div className="meta grid grid-cols-[2fr_1fr_1fr] gap-3 border-b border-line px-4 py-3 text-subtle">
          <span>Item</span>
          <span>Status</span>
          <span>Qty</span>
        </div>
        {rows.map(([w, s], i) => (
          <div key={i} className="grid grid-cols-[2fr_1fr_1fr] items-center gap-3 border-t border-line px-4 py-4 first:border-t-0">
            <Bar w={w} className="bg-ink/50" />
            <span className="meta text-muted">{s}</span>
            <Bar w="40%" />
          </div>
        ))}
      </div>
    );
  }
  if (kind === "design") {
    return (
      <div className="grid w-[80%] grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-[6px] border border-line-strong bg-bg-raised p-4">
          <span className="size-9 rounded-full bg-ink" />
          <span className="size-9 rounded-full bg-muted" />
          <span className="size-9 rounded-full bg-subtle" />
          <span className="size-9 rounded-full bg-accent" />
        </div>
        <div className="rounded-[6px] border border-line-strong bg-bg-raised p-4 text-[36px] font-normal leading-none text-ink">Aa</div>
        <div className="col-span-2 flex flex-wrap gap-2 rounded-[6px] border border-line-strong bg-bg-raised p-4">
          <span className="rounded-[4px] bg-ink px-4 py-2 text-[14px] font-medium text-bg">Primary</span>
          <span className="rounded-[4px] border border-line-strong px-4 py-2 text-[14px] font-medium text-ink">Secondary</span>
          <span className="meta rounded-[4px] border border-line px-3 py-2.5 text-muted">Chip</span>
        </div>
        <div className="col-span-2 flex h-[88px] flex-col gap-2.5 rounded-[6px] border border-line-strong bg-bg-raised p-4">
          <span className="h-2.5 w-1/2 rounded-[2px] bg-ink/70" />
          <Bar w="80%" />
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-[80%] flex-col items-center gap-3">
      <div className="rounded-[6px] border border-line-strong bg-bg-raised px-5 py-3 text-[15px] font-medium text-ink">Your users</div>
      <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
      <div className="rounded-[6px] border border-line-strong bg-bg-raised px-5 py-3 text-[15px] font-medium text-ink">
        Load balancer · CDN
      </div>
      <span aria-hidden="true" className="h-5 w-px bg-line-strong" />
      <div className="grid w-full grid-cols-3 gap-3 text-center text-[14px] font-medium text-ink">
        <span className="rounded-[6px] border border-line-strong bg-bg-raised p-3">API</span>
        <span className="rounded-[6px] border border-line-strong bg-bg-raised p-3">Workers</span>
        <span className="rounded-[6px] border border-line-strong bg-bg-raised p-3">Database</span>
      </div>
      <span className="meta mt-1 text-subtle">Monitored 24/7 · Automated backups</span>
    </div>
  );
}

export function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const cur = solutions[active];

  return (
    <>
      <div role="tablist" aria-label="Solutions" className="mt-12 flex flex-wrap gap-x-1 border-b border-line">
        {solutions.map((s, i) => (
          <button
            key={s.kind}
            id={`tab-${s.kind}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="solutions-panel"
            onClick={() => setActive(i)}
            className={`relative min-h-12 shrink-0 px-4 text-[15px] transition-colors ${
              i === active ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            {s.label}
            {i === active && (
              <motion.span
                layoutId="solutions-underline"
                className="absolute inset-x-4 bottom-[-1px] h-px bg-ink"
                transition={{ duration: 0.2, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        id="solutions-panel"
        role="tabpanel"
        aria-labelledby={`tab-${cur.kind}`}
        className="mt-8 overflow-hidden rounded-[8px] border border-line bg-bg-raised"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur.kind}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div className="min-w-0 p-6 sm:p-10 lg:p-12">
              <h3 className="text-balance text-[clamp(24px,2.4vw,32px)] font-normal leading-[1.2] tracking-[-0.01em]">{cur.title}</h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">{cur.desc}</p>
              <ul className="mt-8 border-t border-line">
                {cur.items.map((it) => (
                  <li key={it} className="flex min-h-12 items-center border-b border-line text-[16px] text-ink">
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-line mt-8">
                Talk to a specialist
              </Link>
            </div>
            <div className="flex h-[400px] min-w-0 items-center justify-center overflow-hidden border-t border-line bg-bg lg:h-auto lg:min-h-[440px] lg:border-l lg:border-t-0">
              <Visual kind={cur.kind} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
