import type { Metadata } from "next";
import Link from "next/link";
import { PortfolioBrowser } from "@/components/PortfolioBrowser";
import { getIndustries, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Our work",
  description: "Mobile apps, web platforms and websites designed and built by ProArt Technology.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7">
        <h1 className="text-[clamp(44px,6vw,80px)] font-medium leading-[1.05] tracking-[-0.035em]">Our work</h1>
        <p className="mx-auto mt-5 max-w-[620px] text-[clamp(18px,1.6vw,21px)] text-muted">
          Apps, platforms and websites we've designed and built for our clients.
        </p>
      </section>

      <PortfolioBrowser projects={projects} industries={getIndustries()} />

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[40px] bg-brand p-9 text-white sm:p-14 lg:p-20">
          <div className="max-w-[640px]">
            <h2 className="text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-[-0.03em]">Have a project like these?</h2>
            <p className="mt-4 text-[19px] text-brand-soft">Tell us your idea and get a free consultation within one business day.</p>
          </div>
          <Link href="/contact" className="rounded-full bg-white px-8 py-4 text-[17px] font-semibold text-brand hover:text-brand-ink">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
