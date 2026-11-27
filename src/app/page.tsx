import Link from "next/link";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { HeroArt } from "@/components/GeoArt";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
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
  const featured = projects.filter((p) => p.featured);
  const withImages = featured.filter((p) => p.images?.length);
  // The spotlight is the featured project with the most photographic cover;
  // the grid takes the other featured projects that have screenshots, and the
  // spotlight's side list the featured projects that don't. Each appears once.
  const spotlight = withImages.find((p) => p.slug === "lms-solutions") ?? withImages[0] ?? featured[0];
  const grid = withImages.filter((p) => p.slug !== spotlight.slug).slice(0, 3);
  const sideList = featured.filter((p) => p.slug !== spotlight.slug && !grid.includes(p)).slice(0, 4);
  const heroProject = projects.find((p) => p.slug === "luckie" && p.images?.length) ?? grid[0] ?? spotlight;
  const clientNames = projects.slice(0, 8).map((p) => p.name);

  return (
    <>
      {/* Hero */}
      <section className="on-night relative overflow-hidden">
        <div className="shell grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:pb-28 lg:pt-24">
          <Reveal className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="dash" aria-hidden="true" />
              <p className="eyebrow text-on-night-muted">Software engineering studio · Abu Dhabi</p>
            </div>
            <h1 className="display mt-8 text-balance">Build apps and software your customers love</h1>
            <p className="lede mt-8 max-w-[38rem] text-on-night-muted">
              {site.name} designs, builds and scales mobile apps, web platforms and custom software — for startups and
              businesses around the world.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                Start a project <span aria-hidden="true">→</span>
              </Link>
              <Link href="/work" className="btn btn-outline">
                See our work
              </Link>
            </div>
          </Reveal>

          {/* Composition: an orange block with a real project screenshot laid over it */}
          <Reveal delay={0.1} className="relative min-w-0">
            <div className="relative ml-auto aspect-[5/6] w-[78%] max-w-[460px]">
              <HeroArt />
            </div>
            <Link
              href={`/work/${heroProject.slug}`}
              className="group absolute bottom-[-8%] left-0 w-[86%] max-w-[500px] bg-night-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden">
                <ProjectVisual project={heroProject} eager className="transition-transform duration-500 group-hover:scale-[1.03]" />
              </span>
              <span className="flex items-center justify-between gap-4 px-5 py-4">
                <span>
                  <span className="eyebrow block text-on-night-muted">Case study</span>
                  <span className="mt-1 block text-[18px] font-semibold">{heroProject.name}</span>
                </span>
                <span aria-hidden="true" className="arrow flex size-9 items-center justify-center bg-signal text-ink">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="border-b border-line">
        <div className="shell grid gap-6 py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:items-center lg:py-14">
          <p className="eyebrow text-muted">Products we&apos;ve built for</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {clientNames.map((n) => (
              <li key={n} className="text-[clamp(17px,1.5vw,21px)] font-bold tracking-[-0.02em] text-ink">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="scroll-mt-28 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            kicker="Solutions"
            title="Everything you need to build, launch and grow"
            intro="One team for strategy, design, engineering and support."
          />
          <SolutionsTabs />
        </div>
      </section>

      {/* Stats: the orange block */}
      {site.stats.length > 0 && (
        <section aria-label="Key numbers" className="on-signal">
          <div className="shell grid gap-12 py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:py-28">
            <Reveal>
              <p className="eyebrow">The studio</p>
              <p className="title mt-5 max-w-[24rem] text-balance">
                Strategy, design and engineering operating as one system, from first brief to production launch.
              </p>
            </Reveal>
            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {site.stats.map((s) => (
                <RevealItem key={s.label} className="border-t-2 border-ink pt-5">
                  <div className="text-[clamp(52px,6vw,92px)] font-bold leading-none tracking-[-0.05em] tabular-nums">
                    <Counter value={s.value} />
                  </div>
                  <p className="mt-3 text-[16px] font-semibold">{s.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Work: client spotlight on black */}
      <section id="work" className="on-night scroll-mt-28 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            dark
            kicker="Client spotlight"
            title="Work that speaks for itself"
            intro="A selection of apps and platforms we've designed and built."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16">
            <Reveal className="min-w-0">
              <Link href={`/work/${spotlight.slug}`} className="group block">
                <span className="relative block aspect-[16/10] overflow-hidden bg-night-2">
                  <ProjectVisual project={spotlight} className="transition-transform duration-500 group-hover:scale-[1.02]" />
                </span>
                <span className="eyebrow mt-8 block text-on-night-muted">
                  {spotlight.category} · {spotlight.industry}
                </span>
                <span className="title mt-3 block decoration-signal decoration-[3px] underline-offset-[8px] group-hover:underline">
                  {spotlight.name}
                </span>
              </Link>
              <p className="mt-4 max-w-[44rem] text-[17px] leading-[1.6] text-on-night-muted">
                {spotlight.description ?? spotlight.summary}
              </p>
              <Link href={`/work/${spotlight.slug}`} className="arrow-link mt-4 underline decoration-signal decoration-2 underline-offset-[6px]">
                Read the case study <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </Reveal>
            <Reveal delay={0.06} className="min-w-0">
              <ul className="border-t border-night-line">
                {sideList.map((p) => (
                  <li key={p.slug} className="border-b border-night-line">
                    <Link href={`/work/${p.slug}`} className="group block py-6">
                      <span className="eyebrow block text-on-night-muted">{p.industry}</span>
                      <span className="mt-2 block text-[21px] font-semibold leading-tight tracking-[-0.015em]">{p.name}</span>
                      <span className="mt-2 block text-[15px] leading-[1.55] text-on-night-muted">{p.summary}</span>
                      <span className="mt-3 inline-flex items-center gap-2 text-[15px] font-semibold">
                        Explore <span aria-hidden="true" className="arrow text-signal">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work: case-study cards */}
      <section aria-label="Selected work" className="py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            kicker="Case studies"
            title="Selected work"
            action={
              <Link href="/work" className="btn btn-outline">
                View all {projects.length} projects
              </Link>
            }
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {grid.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} />
              </RevealItem>
            ))}
            <RevealItem>
              <Link href="/work" className="group on-signal flex h-full min-h-[360px] flex-col justify-between p-7">
                <span className="eyebrow">Portfolio</span>
                <span>
                  <span className="block text-[clamp(64px,6vw,96px)] font-bold leading-none tracking-[-0.05em] tabular-nums">
                    {projects.length}
                  </span>
                  <span className="mt-3 block text-[24px] font-semibold leading-[1.15] tracking-[-0.02em]">
                    apps, platforms and websites
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 text-[15px] font-semibold">
                  See all our work <span aria-hidden="true" className="arrow">→</span>
                </span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Process: the petrol block */}
      <section id="process" className="on-petrol scroll-mt-28 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading
            dark
            kicker="Our process"
            title="A simple, transparent process"
            intro="You see working software every two weeks — no surprises."
          />
          <RevealGroup className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="border-t-2 border-white/40 pt-6">
                <span className="block text-[72px] font-bold leading-none tracking-[-0.05em] text-signal tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-8 text-[24px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-3 text-[17px] leading-[1.6] text-white/80">{s.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Engagement models */}
      <section id="models" className="scroll-mt-28 py-24 lg:py-32">
        <div className="shell">
          <SectionHeading kicker="Pricing models" title="Work with us your way" />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {models.map((m) => (
              <RevealItem
                key={m.title}
                className={`flex h-full flex-col p-7 sm:p-9 ${m.note ? "on-night" : "border-t-4 border-ink bg-stone"}`}
              >
                <div className="flex min-h-8 items-start">
                  {m.note && <span className="eyebrow bg-signal px-2.5 py-1.5 text-ink">{m.note}</span>}
                </div>
                <h3 className="mt-8 text-[32px] font-bold leading-[1.05] tracking-[-0.03em]">{m.title}</h3>
                <p className={`mt-4 flex-1 text-[17px] leading-[1.6] ${m.note ? "text-on-night-muted" : "text-muted"}`}>{m.text}</p>
                <Link href="/contact" className={`btn mt-10 self-start ${m.note ? "btn-primary" : "btn-dark"}`}>
                  {m.cta} <span aria-hidden="true">→</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      {site.testimonials.length > 0 && (
        <section aria-label="Client reviews" className="on-stone py-24 lg:py-32">
          <div className="shell">
            <SectionHeading kicker="Client reviews" title="What our clients say" />
            <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
              {site.testimonials.map((t) => (
                <RevealItem key={t.name}>
                  <figure className="flex h-full flex-col bg-paper p-7 sm:p-9">
                    <span aria-hidden="true" className="text-[72px] font-bold leading-[0.6] text-signal">
                      “
                    </span>
                    <blockquote className="mt-6 flex-1 text-[21px] font-medium leading-[1.4] tracking-[-0.01em]">{t.quote}</blockquote>
                    <figcaption className="mt-10 border-t border-line-strong pt-5">
                      <span className="block text-[16px] font-semibold">{t.name}</span>
                      <span className="text-[15px] text-muted">{t.role}</span>
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <FaqSection />
      <ContactSection />
    </>
  );
}
