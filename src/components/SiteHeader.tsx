"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/config/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => !href.startsWith("/#") && pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Main" className="hidden gap-1 label text-muted lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  isActive(l.href)
                    ? "rounded-[6px] px-3.5 py-2.5 text-ink"
                    : "rounded-[6px] px-3.5 py-2.5 text-muted transition-colors hover:text-ink"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/contact" className="label px-3 py-2.5 text-muted transition-colors hover:text-ink">
              Contact
            </Link>
            <Link
              href="/contact"
              className="label rounded-[6px] bg-accent px-5 py-2.5 text-accent-ink transition-colors hover:bg-ink"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="label min-h-11 rounded-[6px] border border-line-strong px-5 text-ink lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-bg px-5 pb-6 pt-3 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 font-display text-[17px] font-medium text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="label mt-5 block rounded-[6px] bg-accent py-3.5 text-center text-accent-ink"
          >
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
