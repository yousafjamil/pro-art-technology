import Link from "next/link";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HeroVisual } from "@/components/HeroVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactSection, FaqSection, SectionHeading } from "@/components/Sections";
import { SolutionsTabs } from "@/components/SolutionsTabs";
import { site } from "@/config/site";
import { projects } from "@/data/projects";

const steps = [
  { title: "Discover", text: "We learn your goals and define scope, budget and timeline." },
  { title: "Design", text: "Wireframes and a clickable prototype you approve." },
  { title: "Build & test", text: "Two-week sprints, live demos and testing on real devices." },
  { title: "Launch & grow", text: "Store release, monitoring and ongoing improvements." },
];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const heroWeb = projects.find((p) => p.featured && p.category !== "Mobile App") ?? projects[0];
  const heroApp = projects.find((p) => p.category === "Mobile App");
  const clientNames = projects.slice(0, 8).map((p) => p.name);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7 sm:pt-28">
        <Reveal>
          <p className="label inline-flex items-center gap-2 text-accent">
            <span className="size-1.5 rounded-full bg-accent" />
            Elite tech house · Abu Dhabi
          </p>
          <h1 className="text-balance mx-auto mt-7 max-w-[980px] font-display text-[clamp(42px,6.4vw,86px)] font-medium leading-[1.04] tracking-[-0.03em]">
            Build apps and software <span className="text-accent">your customers love</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[680px] text-[clamp(17px,1.6vw,21px)] leading-relaxed text-muted">
            {site.name} designs, builds and scales mobile apps, web platforms and custom software — for startups and
            businesses around the world.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="label rounded-[8px] bg-accent px-8 py-4 text-accent-ink transition-colors hover:bg-ink"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="label rounded-[8px] border border-line-strong px-8 py-[15px] text-ink transition-colors hover:border-accent-line hover:text-accent"
            >
              See our work
            </Link>
          </div>
          <p className="label mt-9 text-subtle">Built for founders, operators and ambitious teams</p>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroVisual heroApp={heroApp} heroWeb={heroWeb} />
        </Reveal>
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="mx-auto max-w-[1280px] px-5 pb-6 pt-[72px] sm:px-7">
        <p className="label text-center text-subtle">Products we&apos;ve built for</p>
        <ClientMarquee names={clientNames} />
      </section>

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading
          kicker="Solutions"
          title="Everything you need to build, launch and grow"
          intro="One team for strategy, design, engineering and support."
        />
        <SolutionsTabs />
      </section>

      {/* Stats (shown when filled in src/config/site.ts) */}
      {site.stats.length > 0 && (
        <section aria-label="Key numbers" className="mx-auto max-w-[1280px] px-5 pt-[120px] sm:px-7">
          <RevealGroup className="grid gap-10 border-y border-line py-14 text-center sm:grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s) => (
              <RevealItem key={s.label}>
                <div className="font-display text-[clamp(46px,5.2vw,68px)] font-medium leading-none tracking-[-0.03em] text-ink">
                  <Counter value={s.value} />
                </div>
                <p className="label mt-3 text-subtle">{s.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* Work */}
      <section id="work" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            kicker="Our work"
            title="Work that speaks for itself"
            intro="A selection of apps and platforms we've designed and built."
          />
          <Link
            href="/work"
            className="label rounded-[8px] border border-line-strong px-7 py-3.5 text-ink hover:border-accent-line hover:text-accent"
          >
            View all {projects.length} projects
          </Link>
        </div>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <RevealItem key={p.slug}>
              <ProjectCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading kicker="Our process" title="A simple, transparent process" intro="You see working software every two weeks — no surprises." />
        <Reveal delay={0.1}>
          <p className="label mt-9 text-center text-subtle">Strategy · Design · Engineering · Production</p>
        </Reveal>
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <RevealItem key={s.title}>
                <li
                  className={`flex min-h-[240px] list-none flex-col justify-between rounded-[20px] border p-8 ${
                    last ? "border-accent-line bg-accent-soft" : "border-line bg-bg-raised"
                  }`}
                >
                  <span
                    className={`flex size-11 items-center justify-center rounded-[8px] font-display text-lg font-bold ${
                      last ? "bg-accent text-accent-ink" : "border border-line-strong text-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[21px] font-semibold text-ink">{s.title}</h3>
                    <p className={`mt-2 ${last ? "text-ink/70" : "text-muted"}`}>{s.text}</p>
                  </div>
                </li>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* Engagement models */}
      <section id="models" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading kicker="Pricing models" title="Work with us your way" />
        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
          <RevealItem>
            <div className="flex h-full flex-col rounded-[20px] border border-line p-9">
              <h3 className="font-display text-2xl font-semibold text-ink">Fixed price</h3>
              <p className="mt-2.5 flex-1 text-muted">A clear scope, fixed budget and agreed timeline. Ideal for MVPs and well-defined projects.</p>
              <Link href="/contact" className="label mt-7 self-start rounded-[8px] border border-line-strong px-5.5 py-3 text-ink hover:border-accent-line hover:text-accent">
                Get a quote
              </Link>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex h-full flex-col rounded-[20px] border border-accent-line bg-accent-soft p-9">
              <span className="label mb-4 self-start rounded-full bg-accent px-3 py-1 text-accent-ink">Best for growing products</span>
              <h3 className="font-display text-2xl font-semibold text-ink">Dedicated team</h3>
              <p className="mt-2.5 flex-1 text-muted">Developers, designers and QA working only on your product, scaling with your needs.</p>
              <Link href="/contact" className="label mt-7 self-start rounded-[8px] bg-accent px-5.5 py-3 text-accent-ink hover:bg-ink">
                Build your team
              </Link>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex h-full flex-col rounded-[20px] border border-line p-9">
              <h3 className="font-display text-2xl font-semibold text-ink">Time &amp; material</h3>
              <p className="mt-2.5 flex-1 text-muted">Flexible scope, billed for actual hours. Ideal when requirements evolve.</p>
              <Link href="/contact" className="label mt-7 self-start rounded-[8px] border border-line-strong px-5.5 py-3 text-ink hover:border-accent-line hover:text-accent">
                Discuss your needs
              </Link>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Testimonials (shown when filled in src/config/site.ts) */}
      {site.testimonials.length > 0 && (
        <section aria-label="Client reviews" className="mx-auto max-w-[1280px] px-5 pt-[120px] sm:px-7">
          <RevealGroup className="grid gap-4 md:grid-cols-2">
            {site.testimonials.map((t) => (
              <RevealItem key={t.name}>
                <figure className="flex h-full flex-col rounded-[28px] border border-line bg-bg-raised p-10">
                  <span aria-hidden="true" className="font-display text-5xl leading-none text-accent">“</span>
                  <blockquote className="mt-2 flex-1 text-[clamp(19px,2vw,24px)] font-medium leading-[1.4] text-ink">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-7">
                    <strong className="block font-display font-semibold text-ink">{t.name}</strong>
                    <span className="text-[15px] text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      <FaqSection />
      <ContactSection />
    </>
  );
}
