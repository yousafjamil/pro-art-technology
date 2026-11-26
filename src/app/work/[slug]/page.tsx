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

const h2 = "text-[clamp(26px,2.6vw,34px)] font-normal leading-[1.2] tracking-[-0.015em] text-ink";

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const more = [1, 2, 3].map((n) => projects[(index + n) % projects.length]).filter((p) => p.slug !== project.slug);
  const isApp = project.category === "Mobile App";
  const gallery = (project.images ?? []).slice(1);

  return (
    <>
      <section className="shell pt-10">
        <Link href="/work" className="inline-flex min-h-11 items-center text-[14px] text-muted transition-colors hover:text-ink">
          ← All projects
        </Link>
        <Reveal className="mt-6 flex flex-wrap items-end justify-between gap-8" delay={0.04}>
          <div className="min-w-0 max-w-[800px]">
            <p className="text-[14px] text-subtle">
              {project.category} · {project.industry}
            </p>
            <h1 className="mt-5 text-balance text-[clamp(40px,5vw,68px)] font-normal leading-[1.04] tracking-[-0.03em] text-ink">
              {project.name}
            </h1>
            <p className="mt-5 max-w-[40rem] text-[clamp(17px,1.4vw,19px)] leading-[1.6] text-muted">{project.summary}</p>
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${i === 0 ? "btn-solid" : "btn-line"}`}
                >
                  {linkLabels[l.kind]} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <Reveal delay={0.08} className="shell pt-12">
        {project.images?.length ? (
          <div className="grid-field flex items-end justify-center overflow-hidden rounded-[8px] border border-line bg-bg-raised px-4 pt-10 sm:px-12 sm:pt-16">
            <ProjectVisual project={project} large />
          </div>
        ) : (
          // No screenshots yet: the project's drawing sheet, which carries its own frame.
          <ProjectVisual project={project} large />
        )}
      </Reveal>

      <section className="shell grid gap-12 pt-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <h2 className={h2}>About the project</h2>
          <p className="mt-5 max-w-[44rem] text-[18px] leading-[1.65] text-muted">{project.description ?? project.summary}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <dl className="border-t border-line">
            <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="meta text-subtle">Type</dt>
              <dd className="text-right text-[16px] text-ink">{project.category}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
              <dt className="meta text-subtle">Industry</dt>
              <dd className="text-right text-[16px] text-ink">{project.industry}</dd>
            </div>
            {project.tech && project.tech.length > 0 && (
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-subtle">Built with</dt>
                <dd className="text-right text-[16px] text-ink">{project.tech.join(", ")}</dd>
              </div>
            )}
          </dl>
        </Reveal>
      </section>

      {gallery.length > 0 && (
        <section aria-label="Screens" className="shell pt-24">
          <h2 className={h2}>Screens</h2>
          <RevealGroup className={`mt-10 grid gap-4 ${isApp ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
            {gallery.map((src, i) => (
              <RevealItem key={src} className="overflow-hidden rounded-[8px] border border-line bg-bg-raised">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${project.name} screen ${i + 2}`} loading="lazy" className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {more.length > 0 && (
        <section aria-label="More projects" className="shell pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
            <h2 className={h2}>More projects</h2>
            <Link href="/work" className="btn btn-line">
              View all
            </Link>
          </div>
          {/* Plain grid, same as /work: these cards must always be visible,
              not gated behind a scroll-triggered reveal. */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="shell py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-8 rounded-[8px] border border-line bg-bg-raised p-6 sm:p-10 lg:p-16">
          <div className="max-w-[640px]">
            <h2 className="text-balance text-[clamp(30px,3.4vw,44px)] font-normal leading-[1.12] tracking-[-0.02em] text-ink">
              Want a product like this?
            </h2>
            <p className="mt-4 text-[18px] leading-[1.6] text-muted">Tell us about your idea and get a free consultation.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
        </Reveal>
      </section>
    </>
  );
}
