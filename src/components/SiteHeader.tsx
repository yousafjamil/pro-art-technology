"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/config/site";
import { categories, getIndustries, projects } from "@/data/projects";
import { solutions } from "@/data/solutions";
import { Logo } from "./Logo";

type Panel = "solutions" | "work" | null;

const panelLink = "flex min-h-10 items-center text-[16px] text-white/85 transition-colors hover:text-white";
const panelHead = "eyebrow mb-3 text-on-night-muted";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" width="12" height="12" className={`transition-transform ${open ? "rotate-180" : ""}`}>
      <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SolutionsPanel({ close }: { close: () => void }) {
  const industries = getIndustries();
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,3fr)]">
      <div>
        <Link href="/#solutions" onClick={close} className="group inline-flex items-center gap-3 text-[32px] font-semibold tracking-[-0.02em]">
          Solutions
          <span aria-hidden="true" className="arrow flex size-7 items-center justify-center bg-signal text-[16px] text-ink">
            →
          </span>
        </Link>
        <p className="mt-4 max-w-[22rem] text-[16px] leading-[1.6] text-on-night-muted">
          One team for strategy, design, engineering and support.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className={panelHead}>Capabilities</p>
          <ul>
            {solutions.map((s) => (
              <li key={s.kind}>
                <Link href={`/#solution-${s.kind}`} onClick={close} className={panelLink}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={panelHead}>Industries</p>
          <ul>
            {industries.map((i) => (
              <li key={i}>
                <Link href={`/work?industry=${encodeURIComponent(i)}`} onClick={close} className={panelLink}>
                  {i}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link href="/contact" onClick={close} className="group flex flex-col justify-between bg-signal p-6 text-ink">
        <span className="eyebrow">Free consultation</span>
        <span className="mt-10 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em]">
          Tell us about your idea. We reply within one business day.
        </span>
        <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold">
          Start a project <span aria-hidden="true" className="arrow">→</span>
        </span>
      </Link>
    </div>
  );
}

function WorkPanel({ close }: { close: () => void }) {
  const featured = projects.filter((p) => p.featured);
  const spotlight = featured.find((p) => p.images?.length) ?? projects[0];
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,3fr)]">
      <div>
        <Link href="/work" onClick={close} className="group inline-flex items-center gap-3 text-[32px] font-semibold tracking-[-0.02em]">
          Our work
          <span aria-hidden="true" className="arrow flex size-7 items-center justify-center bg-signal text-[16px] text-ink">
            →
          </span>
        </Link>
        <p className="mt-4 max-w-[22rem] text-[16px] leading-[1.6] text-on-night-muted">
          {projects.length} apps, platforms and websites we&apos;ve designed and built.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className={panelHead}>By type</p>
          <ul>
            {categories
              .map((c) => ({ c, n: projects.filter((p) => p.category === c).length }))
              .filter((x) => x.n > 0)
              .map(({ c, n }) => (
                <li key={c}>
                  <Link href={`/work?type=${encodeURIComponent(c)}`} onClick={close} className={`${panelLink} gap-2`}>
                    {c} <span className="text-[14px] text-on-night-muted tabular-nums">{n}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p className={panelHead}>Featured</p>
          <ul>
            {featured.slice(0, 7).map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} onClick={close} className={panelLink}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link href={`/work/${spotlight.slug}`} onClick={close} className="group flex flex-col bg-night-3">
        <span className="relative block aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={spotlight.images?.[0]} alt="" className="size-full object-cover object-top" />
        </span>
        <span className="p-5">
          <span className="eyebrow block text-on-night-muted">Case study</span>
          <span className="mt-2 block text-[20px] font-semibold">{spotlight.name}</span>
        </span>
      </Link>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const close = () => {
    setPanel(null);
    setMobileOpen(false);
  };

  // Close on navigation, Escape, and a click outside the header.
  useEffect(() => {
    setPanel(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!panel && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [panel, mobileOpen]);

  const toggle = (p: Exclude<Panel, null>) => setPanel((cur) => (cur === p ? null : p));
  const topLink = "flex h-full items-center gap-2 border-b-2 px-3 text-[15px] font-medium transition-colors";
  const state = (active: boolean) => (active ? "border-signal text-white" : "border-transparent text-white/80 hover:text-white");

  return (
    <header ref={headerRef} className="on-night sticky top-0 z-40">
      {/* Utility row */}
      <div className="hidden border-b border-night-line md:block">
        <div className="shell flex h-9 items-center justify-end gap-6 text-[13px] text-on-night-muted">
          {site.address && <span>{site.address}</span>}
          {site.email && (
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tabular-nums hover:text-white">
              {site.phone}
            </a>
          )}
        </div>
      </div>

      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Logo onClick={close} />

        <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
          <button
            type="button"
            aria-expanded={panel === "solutions"}
            aria-controls="panel-solutions"
            onClick={() => toggle("solutions")}
            className={`${topLink} ${state(panel === "solutions")}`}
          >
            Solutions <Chevron open={panel === "solutions"} />
          </button>
          <button
            type="button"
            aria-expanded={panel === "work"}
            aria-controls="panel-work"
            onClick={() => toggle("work")}
            className={`${topLink} ${state(panel === "work" || pathname.startsWith("/work"))}`}
          >
            Our work <Chevron open={panel === "work"} />
          </button>
          <Link href="/#process" className={`${topLink} ${state(false)}`}>
            How we work
          </Link>
          <Link href="/#models" className={`${topLink} ${state(false)}`}>
            Pricing models
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`${topLink} ${state(pathname === "/contact")}`}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Start a project
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex min-h-11 items-center gap-3 px-1 text-[15px] font-semibold lg:hidden"
          >
            <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
              <span className={`h-[2px] bg-white transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`h-[2px] bg-white ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`h-[2px] bg-white transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Desktop mega panels */}
      {panel && (
        <div
          id={`panel-${panel}`}
          className="absolute inset-x-0 top-full hidden border-t border-night-line bg-night-2 shadow-[0_24px_48px_rgba(0,0,0,0.35)] lg:block"
        >
          <div className="shell py-12">
            {panel === "solutions" ? <SolutionsPanel close={close} /> : <WorkPanel close={close} />}
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-t border-night-line bg-night lg:hidden"
        >
          <div className="shell pb-10 pt-4">
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={close}
                    className="flex min-h-16 items-center justify-between border-b border-night-line text-[24px] font-semibold tracking-[-0.02em]"
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-signal">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-on-night-muted">Capabilities</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {solutions.map((s) => (
                <li key={s.kind}>
                  <Link href={`/#solution-${s.kind}`} onClick={close} className="flex min-h-11 items-center text-[16px] text-white/85">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" onClick={close} className="btn btn-primary mt-10 w-full">
              Start a project
            </Link>
            <div className="mt-8 flex flex-col gap-2 text-[15px] text-on-night-muted">
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="tabular-nums">
                  {site.phone}
                </a>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
