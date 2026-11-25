import Link from "next/link";
import { projectNumber, projects, type Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { SpecMark } from "./SpecMark";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-line bg-bg-raised transition-colors hover:border-line-strong"
    >
      <div className="grid-field relative flex h-[232px] items-end justify-center overflow-hidden border-b border-line bg-bg px-6 pt-12">
        <span className="absolute left-4 top-4">
          <SpecMark index={projectNumber(project)} total={projects.length} />
        </span>
        <ProjectVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <Heading className="text-[19px] font-medium leading-tight text-ink">{project.name}</Heading>
          <span className="shrink-0 text-[14px] text-subtle">{project.industry}</span>
        </div>
        <span className="mt-1 text-[14px] text-subtle">{project.category}</span>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-medium text-ink">
          View project
          <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
