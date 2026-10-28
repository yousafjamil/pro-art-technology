"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/config/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-7">
        <div className="flex items-center gap-9">
          <Logo />
          <nav aria-label="Main" className="hidden gap-1 text-[15px] font-medium lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  isActive(l.href)
                    ? "rounded-full bg-brand-soft px-3.5 py-2.5 font-semibold text-brand-ink"
                    : "rounded-full px-3.5 py-2.5 text-muted hover:bg-surface hover:text-ink"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/contact" className="rounded-full px-5 py-2.5 text-[15px] font-semibold text-brand hover:bg-surface">
            Contact us
          </Link>
          <Link href="/contact" className="rounded-full bg-brand px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-ink hover:text-white">
            Start a project
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="min-h-11 rounded-full border border-outline px-5 text-[15px] font-semibold lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-[17px] font-medium"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-brand py-3.5 text-center font-semibold text-white hover:text-white"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
