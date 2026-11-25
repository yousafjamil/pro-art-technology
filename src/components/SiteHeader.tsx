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
    <header className="sticky top-0 z-30 border-b border-line bg-bg">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-10">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-[4px] px-3 py-2 text-[14px] transition-colors ${
                  isActive(l.href) ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/contact" className="px-3 py-2 text-[14px] text-muted transition-colors hover:text-ink">
              Contact
            </Link>
            <Link href="/contact" className="btn btn-line btn-sm">
              Start a project
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="btn btn-line px-4 lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="shell border-t border-line bg-bg pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line text-[17px] text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full">
            Start a project
          </Link>
        </nav>
      )}
    </header>
  );
}
