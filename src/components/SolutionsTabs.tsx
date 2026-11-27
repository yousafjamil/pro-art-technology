"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { solutions, type SolutionKind } from "@/data/solutions";
import { GeoArt, type GeoTone } from "./GeoArt";

const EASE = [0.22, 1, 0.36, 1] as const;

const toneOf: Record<SolutionKind, GeoTone> = {
  mobile: "signal",
  web: "petrol",
  software: "night",
  design: "stone",
  cloud: "petrol",
};

export function SolutionsTabs() {
  const [active, setActive] = useState(0);
  const cur = solutions[active];

  // /#solution-<kind> (from the menu and the footer) opens that tab.
  useEffect(() => {
    const fromHash = () => {
      const kind = window.location.hash.replace("#solution-", "");
      const i = solutions.findIndex((s) => s.kind === kind);
      if (i >= 0) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
      <div role="tablist" aria-label="Solutions" aria-orientation="vertical" className="relative border-t-2 border-ink">
        {/* Targets for the /#solution-<kind> links: the page scrolls here */}
        {solutions.map((s) => (
          <span key={s.kind} id={`solution-${s.kind}`} className="absolute -top-36 left-0" aria-hidden="true" />
        ))}
        {solutions.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.kind}
              id={`tab-${s.kind}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="solutions-panel"
              onClick={() => setActive(i)}
              className={`group relative flex min-h-16 w-full items-center justify-between gap-4 border-b border-line-strong text-left text-[clamp(20px,1.9vw,26px)] font-semibold tracking-[-0.02em] transition-colors ${
                on ? "text-ink" : "text-subtle hover:text-ink"
              }`}
            >
              <span className="flex items-center gap-4">
                <span className={`text-[14px] font-semibold tabular-nums ${on ? "text-ink" : "text-subtle"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </span>
              <span
                aria-hidden="true"
                className={`flex size-8 shrink-0 items-center justify-center text-[16px] transition-colors ${
                  on ? "bg-signal text-ink" : "bg-transparent text-subtle"
                }`}
              >
                →
              </span>
              {on && (
                <motion.span
                  layoutId="solutions-bar"
                  className="absolute bottom-[-1px] left-0 h-[3px] w-full bg-ink"
                  transition={{ duration: 0.25, ease: EASE }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div id="solutions-panel" role="tabpanel" aria-labelledby={`tab-${cur.kind}`} className="min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={cur.kind}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="grid bg-stone md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          >
            <div className="flex min-w-0 flex-col p-6 sm:p-10">
              <h3 className="title text-balance">{cur.title}</h3>
              <p className="mt-4 text-[17px] leading-[1.6] text-muted">{cur.desc}</p>
              <ul className="mt-8 grid border-t border-line-strong sm:grid-cols-2 sm:gap-x-8">
                {cur.items.map((it) => (
                  <li key={it} className="flex min-h-14 items-center gap-3 border-b border-line-strong text-[16px] font-medium">
                    <span aria-hidden="true" className="size-2 shrink-0 bg-signal" />
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-dark mt-10 self-start">
                Talk to a specialist <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="relative h-[220px] md:h-auto md:min-h-[420px]">
              <GeoArt seed={cur.kind + "-solution"} tone={toneOf[cur.kind]} />
              <span
                aria-hidden="true"
                className={`absolute bottom-5 left-6 text-[64px] font-bold leading-none tracking-[-0.05em] ${
                  toneOf[cur.kind] === "stone" || toneOf[cur.kind] === "signal" ? "text-ink" : "text-white"
                }`}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
