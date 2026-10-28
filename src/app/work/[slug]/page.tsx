import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVisual } from "@/components/ProjectVisual";
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
        <Link href="/work" className="font-semibold text-brand hover:underline">
          ← All projects
        </Link>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-[1_1_560px]">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-lg bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-ink">{project.category}</span>
              <span className="rounded-lg bg-surface px-3 py-1 text-sm font-medium text-muted">{project.industry}</span>
            </div>
            <h1 className="mt-5 text-[clamp(42px,6vw,80px)] font-medium leading-[1.04] tracking-[-0.035em]">{project.name}</h1>
            <p className="mt-5 max-w-[720px] text-[clamp(18px,1.6vw,22px)] leading-normal text-muted">{project.summary}</p>
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
                      ? "rounded-full bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-ink hover:text-white"
                      : "rounded-full border border-outline px-6 py-[13px] font-semibold text-brand hover:bg-surface"
                  }
                >
                  {linkLabels[l.kind]} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-label="Project preview" className="mx-auto max-w-[1280px] px-5 pt-12 sm:px-7">
        <div className={`flex items-end justify-center overflow-hidden rounded-[40px] px-4 pt-10 sm:px-12 sm:pt-16 ${tone.bg}`}>
          <ProjectVisual project={project} large />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-16 px-5 pt-[100px] sm:px-7 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-[clamp(28px,3vw,40px)] font-medium leading-[1.15] tracking-[-0.02em]">About the project</h2>
          <p className="mt-5 text-lg text-muted">{project.description ?? project.summary}</p>
        </div>
        <dl className="grid content-start gap-4">
          <div className="rounded-[20px] bg-surface px-6 py-5">
            <dt className="text-sm text-muted">Type</dt>
            <dd className="mt-1 text-lg font-semibold">{project.category}</dd>
          </div>
          <div className="rounded-[20px] bg-surface px-6 py-5">
            <dt className="text-sm text-muted">Industry</dt>
            <dd className="mt-1 text-lg font-semibold">{project.industry}</dd>
          </div>
          {project.tech && project.tech.length > 0 && (
            <div className="rounded-[20px] bg-surface px-6 py-5">
              <dt className="text-sm text-muted">Built with</dt>
              <dd className="mt-1 text-lg font-semibold">{project.tech.join(", ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {gallery.length > 0 && (
        <section aria-label="Screens" className="mx-auto max-w-[1280px] px-5 pt-[100px] sm:px-7">
          <h2 className="text-[clamp(28px,3vw,40px)] font-medium leading-[1.15] tracking-[-0.02em]">Screens</h2>
          <div className={`mt-10 grid gap-4 ${isApp ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2"}`}>
            {gallery.map((src, i) => (
              <div key={src} className="overflow-hidden rounded-[28px] bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${project.name} screen ${i + 2}`} loading="lazy" className="w-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section aria-label="More projects" className="mx-auto max-w-[1280px] px-5 pt-[100px] sm:px-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(28px,3vw,40px)] font-medium leading-[1.15] tracking-[-0.02em]">More projects</h2>
            <Link href="/work" className="rounded-full border border-outline px-6 py-3 font-semibold text-brand hover:bg-surface">
              View all
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] sm:px-7">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-[40px] bg-brand p-9 text-white sm:p-14 lg:p-20">
          <div className="max-w-[640px]">
            <h2 className="text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-[-0.03em]">Want a product like this?</h2>
            <p className="mt-4 text-[19px] text-brand-soft">Tell us about your idea and get a free consultation.</p>
          </div>
          <Link href="/contact" className="rounded-full bg-white px-8 py-4 text-[17px] font-semibold text-brand hover:text-brand-ink">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
