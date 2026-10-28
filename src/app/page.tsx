import Link from "next/link";
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

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const heroWeb = projects.find((p) => p.featured && p.category !== "Mobile App") ?? projects[0];
  const heroApp = projects.find((p) => p.category === "Mobile App");
  const clientNames = projects.slice(0, 8).map((p) => p.name);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-20 text-center sm:px-7 sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-[15px] font-medium text-muted">
          <span className="size-2 rounded-full bg-green-ink" />
          Now accepting new projects
        </p>
        <h1 className="mx-auto mt-7 max-w-[980px] text-[clamp(42px,6.4vw,88px)] font-medium leading-[1.04] tracking-[-0.035em]">
          Build apps and software <span className="text-brand">your customers love</span>
        </h1>
        <p className="mx-auto mt-7 max-w-[680px] text-[clamp(18px,1.6vw,22px)] leading-normal text-muted">
          {site.name} designs, builds and scales mobile apps, web platforms and custom software — for startups and
          businesses around the world.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-brand px-8 py-4 text-[17px] font-semibold text-white hover:bg-brand-ink hover:text-white">
            Start a project
          </Link>
          <Link href="/work" className="rounded-full border border-outline px-8 py-[15px] text-[17px] font-semibold text-brand hover:bg-surface">
            See our work
          </Link>
        </div>

        <div className="mt-[72px] overflow-hidden rounded-[40px] bg-surface px-4 pt-8 sm:px-12 sm:pt-14">
          <div className="flex items-end justify-center gap-8">
            {heroApp && (
              <div className="hidden shrink-0 lg:block">
                <ProjectVisual project={heroApp} large />
              </div>
            )}
            <div className="flex min-w-0 flex-1 justify-center">
              <ProjectVisual project={heroWeb} large />
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section aria-label="Clients" className="mx-auto max-w-[1280px] px-5 pb-6 pt-[72px] sm:px-7">
        <p className="text-center text-[15px] text-muted">Products we've built for</p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[20px] font-semibold text-subtle">
          {clientNames.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </section>

      {/* Solutions */}
      <section id="solutions" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading
          title="Everything you need to build, launch and grow"
          intro="One team for strategy, design, engineering and support."
        />
        <SolutionsTabs />
      </section>

      {/* Stats (shown when filled in src/config/site.ts) */}
      {site.stats.length > 0 && (
        <section aria-label="Key numbers" className="mx-auto max-w-[1280px] px-5 pt-[120px] sm:px-7">
          <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label}>
                <div className="text-[clamp(48px,5.4vw,72px)] font-medium leading-none tracking-[-0.04em] text-brand">{s.value}</div>
                <p className="mt-3 text-[17px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work */}
      <section id="work" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center={false}
            title="Work that speaks for itself"
            intro="A selection of apps and platforms we've designed and built."
          />
          <Link href="/work" className="rounded-full border border-outline px-7 py-3.5 font-semibold text-brand hover:bg-surface">
            View all {projects.length} projects
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading title="A simple, transparent process" intro="You see working software every two weeks — no surprises." />
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li
                key={s.title}
                className={`flex min-h-[240px] flex-col justify-between rounded-[28px] p-8 ${last ? "bg-brand text-white" : "bg-surface"}`}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-brand">{i + 1}</span>
                <div>
                  <h3 className="text-[22px] font-semibold">{s.title}</h3>
                  <p className={`mt-2 ${last ? "text-brand-soft" : "text-muted"}`}>{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Engagement models */}
      <section id="models" className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pt-[120px] sm:px-7">
        <SectionHeading title="Work with us your way" />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col rounded-[28px] border border-[#dde3ea] p-9">
            <h3 className="text-2xl font-semibold">Fixed price</h3>
            <p className="mt-2.5 flex-1 text-muted">A clear scope, fixed budget and agreed timeline. Ideal for MVPs and well-defined projects.</p>
            <Link href="/contact" className="mt-7 self-start rounded-full border border-outline px-5.5 py-3 font-semibold text-brand hover:bg-surface">
              Get a quote
            </Link>
          </div>
          <div className="flex flex-col rounded-[28px] bg-brand-soft p-9">
            <span className="mb-4 self-start rounded-full bg-white px-3 py-1 text-[13px] font-semibold text-brand-ink">Best for growing products</span>
            <h3 className="text-2xl font-semibold text-brand-ink">Dedicated team</h3>
            <p className="mt-2.5 flex-1 text-[#1f3760]">Developers, designers and QA working only on your product, scaling with your needs.</p>
            <Link href="/contact" className="mt-7 self-start rounded-full bg-brand px-5.5 py-3 font-semibold text-white hover:bg-brand-ink hover:text-white">
              Build your team
            </Link>
          </div>
          <div className="flex flex-col rounded-[28px] border border-[#dde3ea] p-9">
            <h3 className="text-2xl font-semibold">Time &amp; material</h3>
            <p className="mt-2.5 flex-1 text-muted">Flexible scope, billed for actual hours. Ideal when requirements evolve.</p>
            <Link href="/contact" className="mt-7 self-start rounded-full border border-outline px-5.5 py-3 font-semibold text-brand hover:bg-surface">
              Discuss your needs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (shown when filled in src/config/site.ts) */}
      {site.testimonials.length > 0 && (
        <section aria-label="Client reviews" className="mx-auto max-w-[1280px] px-5 pt-[120px] sm:px-7">
          <div className="grid gap-4 md:grid-cols-2">
            {site.testimonials.map((t) => (
              <figure key={t.name} className="rounded-[40px] bg-surface p-10">
                <blockquote className="text-[clamp(20px,2vw,26px)] font-medium leading-[1.4]">“{t.quote}”</blockquote>
                <figcaption className="mt-7">
                  <strong className="block font-semibold">{t.name}</strong>
                  <span className="text-[15px] text-muted">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <FaqSection />
      <ContactSection />
    </>
  );
}
