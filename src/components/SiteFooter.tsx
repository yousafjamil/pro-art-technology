import Link from "next/link";
import { site } from "@/config/site";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  github: "GitHub",
};

const linkClass = "text-[15px] text-muted transition-colors hover:text-ink";

export function SiteFooter() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);

  return (
    <footer className="border-t border-line bg-bg">
      <div className="shell grid gap-10 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="text-[17px] font-medium text-ink">{site.name}</div>
          <p className="mt-3 max-w-[26rem] text-[15px] leading-[1.6] text-muted">{site.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="mb-1 text-[14px] text-subtle">Solutions</p>
          <Link href="/#solutions" className={linkClass}>Mobile apps</Link>
          <Link href="/#solutions" className={linkClass}>Web platforms</Link>
          <Link href="/#solutions" className={linkClass}>Custom software</Link>
          <Link href="/#solutions" className={linkClass}>UI/UX design</Link>
        </div>
        <div className="flex flex-col gap-3">
          <p className="mb-1 text-[14px] text-subtle">Company</p>
          <Link href="/work" className={linkClass}>Our work</Link>
          <Link href="/#process" className={linkClass}>How we work</Link>
          <Link href="/contact" className={linkClass}>Contact</Link>
        </div>
      </div>
      <div className="shell flex flex-col gap-6 border-t border-line py-8">
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          {site.email && (
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
          )}
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`${linkClass} tabular-nums`}>
              {site.phone}
            </a>
          )}
          {site.address && <span className="text-[15px] text-muted">{site.address}</span>}
          {socials.map((k) => (
            <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {socialLabels[k]}
            </a>
          ))}
        </div>
        <div className="meta flex flex-wrap items-center justify-between gap-3 text-subtle">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Built in Abu Dhabi</span>
        </div>
      </div>
    </footer>
  );
}
