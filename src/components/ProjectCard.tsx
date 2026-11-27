import Link from "next/link";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

// A case-study card: type and industry, the name and one line on a solid
// panel, the project's picture filling the lower part edge to edge.
// "stone" for white pages, "night" for black blocks.
export function ProjectCard({
  project,
  headingLevel = "h3",
  tone = "stone",
}: {
  project: Project;
  headingLevel?: "h2" | "h3";
  tone?: "stone" | "night";
}) {
  const Heading = headingLevel;
  const panel = tone === "night" ? "bg-night-2 text-white" : "bg-stone text-ink";
  const sub = tone === "night" ? "text-on-night-muted" : "text-muted";

  return (
    <Link href={`/work/${project.slug}`} className={`group flex h-full flex-col ${panel}`}>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className={`eyebrow ${sub}`}>
          {project.category} · {project.industry}
        </p>
        <Heading className="mt-4 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] decoration-signal decoration-[3px] underline-offset-[6px] group-hover:underline">
          {project.name}
        </Heading>
        <p className={`mt-3 line-clamp-3 text-[16px] leading-[1.55] ${sub}`}>{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold">
          View case study
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProjectVisual project={project} className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
      </div>
    </Link>
  );
}
