import Link from "next/link";
import { site } from "@/config/site";
import { solutions } from "@/data/solutions";
import { Logo } from "./Logo";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  github: "GitHub",
};

const linkClass = "flex min-h-9 items-center text-[15px] text-white/80 transition-colors hover:text-white";
const head = "eyebrow mb-3 text-on-night-muted";

export function SiteFooter() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);

  return (
    <footer className="on-night border-t-4 border-signal">
      <div className="shell grid gap-12 pb-14 pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Logo />
          <p className="mt-6 max-w-[28rem] text-[16px] leading-[1.6] text-on-night-muted">{site.description}</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className={head}>Solutions</p>
            {solutions.map((s) => (
              <Link key={s.kind} href={`/#solution-${s.kind}`} className={linkClass}>
                {s.label}
              </Link>
            ))}
          </div>
          <div>
            <p className={head}>Company</p>
            <Link href="/work" className={linkClass}>Our work</Link>
            <Link href="/#process" className={linkClass}>How we work</Link>
            <Link href="/#models" className={linkClass}>Pricing models</Link>
            <Link href="/#faq" className={linkClass}>Questions</Link>
            <Link href="/contact" className={linkClass}>Contact</Link>
          </div>
          <div>
            <p className={head}>Get in touch</p>
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
            {site.whatsapp && (
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp
              </a>
            )}
            {site.address && <span className="flex min-h-9 items-center text-[15px] text-white/80">{site.address}</span>}
            {socials.map((k) => (
              <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {socialLabels[k]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-night-line py-6 text-[14px] text-on-night-muted">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <span>Built in Abu Dhabi</span>
      </div>
    </footer>
  );
}
