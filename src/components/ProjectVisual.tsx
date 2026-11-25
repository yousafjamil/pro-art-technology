"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCardDrawing, ProjectSheet } from "./drawing/ProjectDrawing";

// An <img> that reports failure even if it failed before the page became interactive.
function SafeImg({ onFail, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { onFail: () => void }) {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) onFail();
  }, [onFail]);
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img ref={ref} {...props} onError={onFail} />;
}

function BrowserFrame({ children, large }: { children: React.ReactNode; large?: boolean }) {
  return (
    <div
      className={`flex w-[92%] flex-col overflow-hidden rounded-t-[6px] border border-b-0 border-line-strong bg-bg-raised ${
        large ? "h-[min(520px,52vw)] min-h-[260px] max-w-[980px]" : "h-[184px]"
      }`}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line px-3">
        <span className="size-2 rounded-full border border-line-strong" />
        <span className="size-2 rounded-full border border-line-strong" />
        <span className="size-2 rounded-full border border-line-strong" />
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function PhoneFrame({ children, large, short }: { children: React.ReactNode; large?: boolean; short?: boolean }) {
  const size = large
    ? short
      ? "h-[380px] w-[188px] rounded-t-[36px] p-2"
      : "h-[440px] w-[220px] rounded-t-[36px] p-2"
    : short
      ? "h-[156px] w-[96px] rounded-t-[20px] p-1.5"
      : "h-[184px] w-[96px] rounded-t-[20px] p-1.5";
  return (
    <div className={`${size} shrink-0 border border-b-0 border-line-strong bg-bg-raised`}>
      <div className={`h-full overflow-hidden border border-b-0 border-line bg-bg ${large ? "rounded-t-[28px]" : "rounded-t-[14px]"}`}>
        {children}
      </div>
    </div>
  );
}

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const fail = useRef(() => setFailed(true)).current;
  const isApp = project.category === "Mobile App";

  // Only ever show a screenshot when a real one has been added by hand to
  // public/projects/<slug>/ — no live/auto screenshot service, so there is
  // never a "generating preview" state stuck on screen.
  if (isApp && project.images?.length && !failed) {
    return (
      <div className="flex items-end gap-3 sm:gap-4">
        {project.images.slice(0, large ? 3 : 2).map((src, i) => (
          <div key={src} className={large && i > 0 ? "hidden sm:block" : ""}>
            <PhoneFrame large={large} short={i % 2 === 1}>
              <SafeImg src={src} alt={`${project.name} screen ${i + 1}`} className="size-full object-cover object-top" onFail={fail} />
            </PhoneFrame>
          </div>
        ))}
      </div>
    );
  }

  // No screenshot: the project's own technical drawing (src/data/drawings.ts).
  if (!project.images?.length || failed) {
    return large ? <ProjectSheet project={project} /> : <ProjectCardDrawing project={project} />;
  }

  return (
    <BrowserFrame large={large}>
      <SafeImg
        src={project.images[0]}
        alt={`${project.name} website`}
        loading="lazy"
        className="size-full object-cover object-top"
        onFail={fail}
      />
    </BrowserFrame>
  );
}
