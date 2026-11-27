import type { Metadata } from "next";
import Link from "next/link";
import { GeoArt } from "@/components/GeoArt";
import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { categories, getIndustries, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our work",
  description: "Mobile apps, web platforms and websites designed and built by ProArt Technology.",
};

export default function WorkPage() {
  const counts = categories
    .map((c) => ({ c, n: projects.filter((p) => p.category === c).length }))
    .filter((x) => x.n > 0);

  return (
    <>
      <section className="on-night overflow-hidden">
        <div className="shell grid gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end lg:pb-20">
          <Reveal className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="dash" aria-hidden="true" />
              <p className="eyebrow text-on-night-muted">Portfolio</p>
            </div>
            <h1 className="display mt-8">Our work</h1>
            <p className="lede mt-8 max-w-[36rem] text-on-night-muted">
              Apps, platforms and websites we&apos;ve designed and built for our clients.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <dl className="grid grid-cols-2 gap-px bg-night-line">
              <div className="bg-signal p-5 text-ink">
                <dt className="text-[14px] font-semibold">Projects</dt>
                <dd className="mt-6 text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">{projects.length}</dd>
              </div>
              {counts.map(({ c, n }) => (
                <div key={c} className="bg-night-2 p-5">
                  <dt className="text-[14px] font-semibold text-on-night-muted">{c}</dt>
                  <dd className="mt-6 text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">{n}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <PortfolioBrowser projects={projects} industries={getIndustries()} />

      <section className="on-signal">
        <div className="shell grid items-center gap-10 py-20 md:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:py-24">
          <Reveal className="min-w-0">
            <h2 className="headline text-balance">Have a project like these?</h2>
            <p className="lede mt-5 max-w-[34rem]">Tell us your idea and get a free consultation within one business day.</p>
            <Link href="/contact" className="btn btn-dark mt-10">
              Start a project <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <div className="hidden aspect-square w-full max-w-[320px] justify-self-end md:block" aria-hidden="true">
            <GeoArt seed="work-cta" tone="signal" />
          </div>
        </div>
      </section>
    </>
  );
}
