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
      <section className="shell pt-16 sm:pt-20">
        <Reveal className="max-w-[720px]">
          <p className="text-[14px] text-subtle">Portfolio</p>
          <h1 className="mt-5 text-[clamp(40px,5vw,64px)] font-normal leading-[1.05] tracking-[-0.03em]">Our work</h1>
          <p className="mt-5 max-w-[36rem] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-muted">
            Apps, platforms and websites we&apos;ve designed and built for our clients.
          </p>
        </Reveal>
      </section>

      <PortfolioBrowser projects={projects} industries={getIndustries()} />

      <section className="shell py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 rounded-[8px] border border-line bg-bg-raised p-6 sm:p-10 lg:p-16">
          <div className="max-w-[640px]">
            <h2 className="text-balance text-[clamp(30px,3.4vw,44px)] font-normal leading-[1.12] tracking-[-0.02em]">
              Have a project like these?
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-muted">
              Tell us your idea and get a free consultation within one business day.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </Reveal>
      </section>
    </>
  );
}
