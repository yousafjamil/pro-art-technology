import Link from "next/link";
import { tones, type Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const tone = tones[project.tone ?? "blue"];
  const Heading = headingLevel;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[28px] ${tone.bg} transition-transform duration-300 hover:-translate-y-1 hover:text-ink`}
    >
      <div className="flex h-[230px] items-end justify-center px-6 pt-7">
        <ProjectVisual project={project} />
      </div>
      <div className="m-2 mt-0 flex flex-1 flex-col gap-1 rounded-[22px] bg-white px-5 py-5">
        <Heading className="text-[20px] font-semibold tracking-tight">{project.name}</Heading>
        <span className="text-sm text-muted">
          {project.category} · {project.industry}
        </span>
        <p className="mt-1.5 text-[15px] text-muted">{project.summary}</p>
        <span className="mt-auto pt-3 text-[15px] font-semibold text-brand group-hover:underline">View project →</span>
      </div>
    </Link>
  );
}
