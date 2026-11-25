import Link from "next/link";
import { ClientList } from "@/components/ClientList";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HeroVisual } from "@/components/HeroVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactSection, FaqSection, SECTION_GRID, SectionHeading, SHEETS } from "@/components/Sections";
import { SolutionsTabs } from "@/components/SolutionsTabs";
import { SpecMark } from "@/components/SpecMark";
import { site } from "@/config/site";
import { projects } from "@/data/projects";

const steps = [
  { title: "Discover", text: "We learn your goals and define scope, budget and timeline." },
  { title: "Design", text: "Wireframes and a clickable prototype you approve." },
  { title: "Build & test", text: "Two-week sprints, live demos and testing on real devices." },
  { title: "Launch & grow", text: "Store release, monitoring and ongoing improvements." },
];

const models = [
  {
    title: "Fixed price",
    text: "A clear scope, fixed budget and agreed timeline. Ideal for MVPs and well-defined projects.",
    cta: "Get a quote",
  },
  {
    title: "Dedicated team",
    text: "Developers, designers and QA working only on your product, scaling with your needs.",
    cta: "Build your team",
    note: "Best for growing products",
  },
  {
    title: "Time & material",
    text: "Flexible scope, billed for actual hours. Ideal when requirements evolve.",
    cta: "Discuss your needs",
  },
];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const clientNames = projects.slice(0, 8).map((p) => p.name);

  return (
    <>
      {/* Hero: text column on the left, the drawing sheet on the right */}
      <section className="shell pb-16 pt-12 sm:pt-16 xl:pb-24 xl:pt-20">
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] xl:gap-16">
          <Reveal className="max-w-[600px]">
            <SpecMark index={0} total={SHEETS}>
              Elite tech house · Abu Dhabi
            </SpecMark>
            <h1 className="text-balance mt-8 text-[clamp(40px,5vw,68px)] font-normal leading-[1.04] tracking-[-0.03em] text-ink">
              Build apps and software your customers love
            </h1>
            <p className="mt-6 max-w-[36rem] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-muted">
              {site.name} designs, builds and scales mobile apps, web platforms and custom software — for startups and
              businesses around the world.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project
              </Link>
              <Link href="/work" className="btn btn-line">
                See our work
              </Link>
            </div>
            <p className="mt-8 text-[14px] text-subtle">Built for founders, operators and ambitious teams</p>
          </Reveal>

          <Reveal delay={0.08}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="shell pt-8">
        <div className={SECTION_GRID}>
          <p className="text-[14px] text-subtle lg:pt-5">Products we&apos;ve built for</p>
          <ClientList names={clientNames} />
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="shell scroll-mt-20 pt-32">
        <SectionHeading
          index={1}
          kicker="Solutions"
          title="Everything you need to build, launch and grow"
          intro="One team for strategy, design, engineering and support."
        />
        <SolutionsTabs />
      </section>

      {/* Stats (shown when filled in src/config/site.ts) */}
      {site.stats.length > 0 && (
        <section aria-label="Key numbers" className="shell pt-32">
          <RevealGroup className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
            {site.stats.map((s, i) => (
              <RevealItem
                key={s.label}
                className={`border-line px-4 py-8 sm:px-6 sm:py-10 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${
                  i === 2 ? "lg:border-l" : ""
                }`}
              >
                <div className="text-[clamp(40px,4.4vw,56px)] font-normal leading-none tracking-[-0.02em] tabular-nums text-ink">
                  <Counter value={s.value} />
                </div>
                <p className="mt-3 text-[14px] text-subtle">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Work */}
      <section id="work" className="shell scroll-mt-20 pt-32">
        <SectionHeading
          index={2}
          kicker="Our work"
          title="Work that speaks for itself"
          intro="A selection of apps and platforms we've designed and built."
          action={
            <Link href="/work" className="btn btn-line">
              View all {projects.length} projects
            </Link>
          }
        />
        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
          {featured.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Process */}
      <section id="process" className="shell scroll-mt-20 pt-32">
        <SectionHeading
          index={3}
          kicker="Our process"
          title="A simple, transparent process"
          intro="You see working software every two weeks — no surprises."
        />
        <div className={`${SECTION_GRID} mt-12`}>
          <p className="text-[14px] text-subtle">Strategy · Design · Engineering · Production</p>
          <RevealGroup className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="flex flex-col border-t border-line-strong pb-8 pt-5">
                <span className="meta text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-[20px] font-medium text-ink">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Engagement models */}
      <section id="models" className="shell scroll-mt-20 pt-32">
        <SectionHeading index={4} kicker="Pricing models" title="Work with us your way" />
        <RevealGroup className="mt-12 grid overflow-hidden rounded-[8px] border border-line md:grid-cols-3">
          {models.map((m, i) => (
            <RevealItem
              key={m.title}
              className={`flex flex-col p-6 sm:p-8 lg:p-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : ""} ${
                m.note ? "bg-bg-raised" : ""
              }`}
            >
              {m.note ? (
                <div className="mb-6 flex min-h-7 items-start">
                  <span className="meta rounded-[4px] border border-line-strong px-2 py-1 text-muted">{m.note}</span>
                </div>
              ) : (
                <div aria-hidden="true" className="hidden min-h-7 md:mb-6 md:block" />
              )}
              <h3 className="text-[24px] font-normal tracking-[-0.01em] text-ink">{m.title}</h3>
              <p className="mt-3 flex-1 text-[16px] leading-[1.6] text-muted">{m.text}</p>
              <Link href="/contact" className={`btn mt-8 self-start ${m.note ? "btn-solid" : "btn-line"}`}>
                {m.cta}
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Testimonials (shown when filled in src/config/site.ts) */}
      {site.testimonials.length > 0 && (
        <section aria-label="Client reviews" className="shell pt-32">
          <RevealGroup className="grid gap-x-6 gap-y-10 md:grid-cols-3">
            {site.testimonials.map((t) => (
              <RevealItem key={t.name}>
                <figure className="flex h-full flex-col border-t border-line-strong pt-6">
                  <blockquote className="flex-1 text-[19px] leading-[1.5] text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-8">
                    <span className="block text-[15px] font-medium text-ink">{t.name}</span>
                    <span className="text-[14px] text-subtle">{t.role}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      <FaqSection index={5} />
      <ContactSection index={6} />
    </>
  );
}
