import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { getIndustries, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our work",
  description: "Mobile apps, web platforms and websites designed and built by ProArt Technology.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7">
        <Reveal>
          <p className="label text-accent">Portfolio</p>
          <h1 className="mt-5 font-display text-[clamp(44px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.03em]">Our work</h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[clamp(17px,1.6vw,20px)] text-muted">
            Apps, platforms and websites we&apos;ve designed and built for our clients.
          </p>
        </Reveal>
      </section>

      <PortfolioBrowser projects={projects} industries={getIndustries()} />

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
        <Reveal className="grid-field flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[28px] border border-line bg-bg-raised p-9 sm:p-14 lg:p-20">
          <div className="max-w-[640px]">
            <h2 className="text-balance font-display text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-[-0.02em]">Have a project like these?</h2>
            <p className="mt-4 text-[18px] text-muted">Tell us your idea and get a free consultation within one business day.</p>
          </div>
          <Link href="/contact" className="label rounded-[8px] bg-accent px-8 py-4 text-accent-ink hover:bg-ink">
            Start a project
          </Link>
        </Reveal>
      </section>
    </>
  );
}
