import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getProject, linkLabels, projects } from "@/data/projects";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const more = [1, 2, 3].map((n) => projects[(index + n) % projects.length]).filter((p) => p.slug !== project.slug);
  const isApp = project.category === "Mobile App";
  const gallery = (project.images ?? []).slice(1);
  const hasImage = Boolean(project.images?.length);

  const facts = [
    { k: "Type", v: project.category },
    { k: "Industry", v: project.industry },
    ...(project.tech?.length ? [{ k: "Built with", v: project.tech.join(", ") }] : []),
  ];

  return (
    <>
      {/* Title block on black; the picture overlaps into the white below */}
      <section className="on-night">
        <div className="shell pb-44 pt-8 sm:pb-52 lg:pb-60">
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-on-night-muted transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span> All projects
          </Link>
          <Reveal className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end" delay={0.04}>
            <div className="min-w-0">
              <div className="flex items-center gap-4">
                <span className="dash" aria-hidden="true" />
                <p className="eyebrow text-on-night-muted">
                  Case study · {project.category} · {project.industry}
                </p>
              </div>
              <h1 className="display mt-8 text-balance break-words">{project.name}</h1>
              <p className="lede mt-8 max-w-[40rem] text-on-night-muted">{project.summary}</p>
            </div>
            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-3 lg:justify-end">
                {project.links.map((l, i) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${i === 0 ? "btn-primary" : "btn-outline"}`}
                  >
                    {linkLabels[l.kind]} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <div className="shell -mt-32 sm:-mt-40 lg:-mt-48">
        {/* A screenshot keeps its own 16:10; the colour block of a project
            without one is a wider band, since it carries no detail. */}
        <Reveal
          delay={0.08}
          className={`relative overflow-hidden bg-stone shadow-[0_30px_60px_rgba(0,0,0,0.18)] ${
            hasImage ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[21/9]"
          }`}
        >
          <ProjectVisual project={project} eager />
        </Reveal>
      </div>

      <section className="shell grid gap-12 pt-20 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-16 lg:pt-28">
        <Reveal className="min-w-0">
          <div className="flex items-center gap-4">
            <span className="dash" aria-hidden="true" />
            <p className="eyebrow text-muted">Overview</p>
          </div>
          <h2 className="headline mt-6">About the project</h2>
          <p className="mt-8 max-w-[44rem] text-[clamp(19px,1.6vw,23px)] leading-[1.55]">{project.description ?? project.summary}</p>
        </Reveal>
        <Reveal delay={0.05} className="min-w-0">
          <dl className="on-stone p-7">
            {facts.map((f, i) => (
              <div key={f.k} className={`py-4 ${i > 0 ? "border-t border-line-strong" : ""}`}>
                <dt className="eyebrow text-muted">{f.k}</dt>
                <dd className="mt-2 text-[20px] font-semibold tracking-[-0.01em]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {gallery.length > 0 && (
        <section aria-label="Screens" className="shell pt-24">
          <h2 className="title">Screens</h2>
          <RevealGroup className={`mt-10 grid gap-6 ${isApp ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
            {gallery.map((src, i) => (
              <RevealItem key={src} className="overflow-hidden bg-stone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${project.name} screen ${i + 2}`} loading="lazy" className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {more.length > 0 && (
        <section aria-label="More projects" className="shell pb-24 pt-24 lg:pb-32 lg:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <span className="dash" aria-hidden="true" />
                <p className="eyebrow text-muted">Case studies</p>
              </div>
              <h2 className="headline mt-6">More projects</h2>
            </div>
            <Link href="/work" className="btn btn-outline">
              View all
            </Link>
          </div>
          {/* Plain grid, same as /work: these cards must always be visible,
              not gated behind a scroll-triggered reveal. */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="on-signal">
        <div className="shell flex flex-wrap items-end justify-between gap-10 py-20 lg:py-24">
          <div className="max-w-[760px]">
            <h2 className="headline text-balance">Want a product like this?</h2>
            <p className="lede mt-5">Tell us about your idea and get a free consultation.</p>
          </div>
          <Link href="/contact" className="btn btn-dark">
            Start a project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
