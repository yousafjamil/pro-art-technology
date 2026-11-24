import Link from "next/link";
import { tones, type Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const tone = tones[project.tone ?? "blue"];
  const Heading = headingLevel;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[20px] border border-line bg-bg-raised transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:text-ink`}
    >
      <div className="flex h-[230px] items-end justify-center overflow-hidden border-b border-line bg-bg px-6 pt-7">
        <ProjectVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-6 py-6">
        <div className="flex items-center justify-between gap-3">
          <Heading className="font-display text-[19px] font-semibold tracking-tight">{project.name}</Heading>
          <span className={`label shrink-0 ${tone.ink}`}>{project.industry}</span>
        </div>
        <span className="text-sm text-subtle">{project.category}</span>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-ink">
          View project
          <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
