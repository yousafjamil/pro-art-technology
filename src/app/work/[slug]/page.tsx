import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getProject, linkLabels, projects, tones } from "@/data/projects";

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

  const tone = tones[project.tone ?? "blue"];
  const index = projects.indexOf(project);
  const more = [1, 2, 3].map((n) => projects[(index + n) % projects.length]).filter((p) => p.slug !== project.slug);
  const isApp = project.category === "Mobile App";
  const gallery = (project.images ?? []).slice(1);

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pt-12 sm:px-7">
        <Link href="/work" className="label text-muted transition-colors hover:text-accent">
          ← All projects
        </Link>
        <Reveal className="mt-8 flex flex-wrap items-end justify-between gap-8" delay={0.05}>
          <div className="min-w-0 flex-[1_1_560px]">
            <div className="flex flex-wrap gap-2">
              <span className={`label rounded-[6px] border px-3 py-1.5 ${tone.line} ${tone.ink}`}>{project.category}</span>
              <span className="label rounded-[6px] border border-line px-3 py-1.5 text-muted">{project.industry}</span>
            </div>
            <h1 className="mt-5 text-balance font-display text-[clamp(42px,6vw,78px)] font-medium leading-[1.04] tracking-[-0.03em] text-ink">
              {project.name}
            </h1>
            <p className="mt-5 max-w-[720px] text-[clamp(17px,1.6vw,21px)] leading-relaxed text-muted">{project.summary}</p>
          </div>
          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {project.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    i === 0
                      ? "label rounded-[8px] bg-accent px-6 py-3.5 text-accent-ink hover:bg-ink"
                      : "label rounded-[8px] border border-line-strong px-6 py-[13px] text-ink hover:border-accent-line hover:text-accent"
                  }
                >
                  {linkLabels[l.kind]} ↗
                </a>
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <Reveal delay={0.1} className="mx-auto max-w-[1280px] px-5 pt-12 sm:px-7">
        <div className="grid-field flex items-end justify-center overflow-hidden rounded-[32px] border border-line bg-bg-raised px-4 pt-10 sm:px-12 sm:pt-16">
          <ProjectVisual project={project} large />
        </div>
      </Reveal>

      <section className="mx-auto grid max-w-[1280px] gap-16 px-5 pt-[100px] sm:px-7 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] tracking-[-0.015em] text-ink">About the project</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.description ?? project.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="grid content-start gap-4">
            <div className="rounded-[16px] border border-line bg-bg-raised px-6 py-5">
              <dt className="label text-subtle">Type</dt>
              <dd className="mt-1.5 text-lg font-semibold text-ink">{project.category}</dd>
            </div>
            <div className="rounded-[16px] border border-line bg-bg-raised px-6 py-5">
              <dt className="label text-subtle">Industry</dt>
              <dd className="mt-1.5 text-lg font-semibold text-ink">{project.industry}</dd>
            </div>
            {project.tech && project.tech.length > 0 && (
              <div className="rounded-[16px] border border-line bg-bg-raised px-6 py-5">
                <dt className="label text-subtle">Built with</dt>
                <dd className="mt-1.5 text-lg font-semibold text-ink">{project.tech.join(", ")}</dd>
              </div>
            )}
          </dl>
        </Reveal>
      </section>

      {gallery.length > 0 && (
        <section aria-label="Screens" className="mx-auto max-w-[1280px] px-5 pt-[100px] sm:px-7">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] tracking-[-0.015em] text-ink">Screens</h2>
          <RevealGroup className={`mt-10 grid gap-4 ${isApp ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
            {gallery.map((src, i) => (
              <RevealItem key={src} className="overflow-hidden rounded-[20px] border border-line bg-bg-raised">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${project.name} screen ${i + 2}`} loading="lazy" className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {more.length > 0 && (
        <section aria-label="More projects" className="mx-auto max-w-[1280px] px-5 pt-[100px] sm:px-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] tracking-[-0.015em] text-ink">More projects</h2>
            <Link href="/work" className="label rounded-[8px] border border-line-strong px-6 py-3 text-ink hover:border-accent-line hover:text-accent">
              View all
            </Link>
          </div>
          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
        <Reveal className="grid-field flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[28px] border border-line bg-bg-raised p-9 sm:p-14 lg:p-20">
          <div className="max-w-[640px]">
            <h2 className="text-balance font-display text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">Want a product like this?</h2>
            <p className="mt-4 text-[18px] text-muted">Tell us about your idea and get a free consultation.</p>
          </div>
          <Link href="/contact" className="label rounded-[8px] bg-accent px-8 py-4 text-accent-ink hover:bg-ink">
            Start a project
          </Link>
        </Reveal>
      </section>
    </>
  );
}
