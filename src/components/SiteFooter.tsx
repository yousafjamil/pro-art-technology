import Link from "next/link";
import { site } from "@/config/site";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  github: "GitHub",
};

export function SiteFooter() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 pb-10 pt-16 sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="font-display text-[20px] font-semibold tracking-tight text-ink">{site.name}</div>
          <p className="mt-3 max-w-[360px] text-[15px] leading-relaxed text-muted">{site.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="label text-subtle">Solutions</strong>
          <Link href="/#solutions" className="text-[15px] text-muted transition-colors hover:text-ink">Mobile apps</Link>
          <Link href="/#solutions" className="text-[15px] text-muted transition-colors hover:text-ink">Web platforms</Link>
          <Link href="/#solutions" className="text-[15px] text-muted transition-colors hover:text-ink">Custom software</Link>
          <Link href="/#solutions" className="text-[15px] text-muted transition-colors hover:text-ink">UI/UX design</Link>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="label text-subtle">Company</strong>
          <Link href="/work" className="text-[15px] text-muted transition-colors hover:text-ink">Our work</Link>
          <Link href="/#process" className="text-[15px] text-muted transition-colors hover:text-ink">How we work</Link>
          <Link href="/contact" className="text-[15px] text-muted transition-colors hover:text-ink">Contact</Link>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 border-t border-line px-5 py-7 sm:px-7">
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-muted">
          {site.email && (
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-ink">
              {site.phone}
            </a>
          )}
          {site.address && <span>{site.address}</span>}
          {socials.map((k) => (
            <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
              {socialLabels[k]}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 label text-subtle">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="text-accent">Built in Abu Dhabi</span>
        </div>
      </div>
    </footer>
  );
}
