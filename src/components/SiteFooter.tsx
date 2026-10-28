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
    <footer className="border-t border-line bg-surface-2">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 pb-8 pt-14 text-[15px] sm:grid-cols-2 sm:px-7 lg:grid-cols-4">
        <div>
          <div className="text-[19px] font-semibold">{site.name}</div>
          <p className="mt-2.5 text-muted">Mobile apps, web platforms and custom software.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          <strong className="font-semibold">Solutions</strong>
          <Link href="/#solutions" className="text-muted">Mobile apps</Link>
          <Link href="/#solutions" className="text-muted">Web platforms</Link>
          <Link href="/#solutions" className="text-muted">Custom software</Link>
          <Link href="/#solutions" className="text-muted">UI/UX design</Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <strong className="font-semibold">Company</strong>
          <Link href="/work" className="text-muted">Our work</Link>
          <Link href="/#process" className="text-muted">How we work</Link>
          <Link href="/contact" className="text-muted">Contact</Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <strong className="font-semibold">Get in touch</strong>
          {site.email && <a href={`mailto:${site.email}`} className="text-muted">{site.email}</a>}
          {site.phone && <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-muted">{site.phone}</a>}
          {site.address && <span className="text-muted">{site.address}</span>}
          {socials.map((k) => (
            <a key={k} href={site.social[k]} target="_blank" rel="noopener noreferrer" className="text-muted">
              {socialLabels[k]}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 border-t border-line px-5 py-6 text-sm text-muted sm:px-7">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
