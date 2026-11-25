"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";

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

function initials(name: string) {
  return name
    .split(/[\s—-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
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

// Drawn fallback for a project with no screenshot yet: the screen as a
// hairline wireframe with the project's own name in it, in the neutral ramp.
// No live screenshot service is used, so nothing ever sits on a
// "generating preview" placeholder.
function DrawnApp({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className="flex items-end gap-3 sm:gap-4">
      <PhoneFrame large={large}>
        <div className={`flex h-full flex-col ${large ? "gap-3 p-4 pt-8" : "gap-1.5 p-2 pt-4"}`}>
          <div
            className={`flex items-center justify-center rounded-[4px] border border-line-strong font-mono text-ink ${
              large ? "h-28 text-[28px]" : "h-12 text-[14px]"
            }`}
          >
            {initials(project.name)}
          </div>
          <div className={`truncate font-medium text-ink ${large ? "text-[15px]" : "text-[11px]"}`}>{project.name}</div>
          <div className={`rounded-[2px] bg-line-strong ${large ? "h-1.5 w-4/5" : "h-1 w-4/5"}`} />
          <div className={`rounded-[2px] bg-line-strong ${large ? "h-1.5 w-3/5" : "h-1 w-3/5"}`} />
          <div className={`rounded-[4px] border border-line ${large ? "h-14" : "h-6"}`} />
          {large && <div className="h-14 rounded-[4px] border border-line" />}
        </div>
      </PhoneFrame>
      <div className={large ? "hidden sm:block" : ""}>
        <PhoneFrame large={large} short>
          <div className={`flex h-full flex-col ${large ? "gap-3 p-4 pt-8" : "gap-1.5 p-2 pt-4"}`}>
            <div className={`rounded-[2px] bg-line-strong ${large ? "h-2 w-3/5" : "h-1 w-3/5"}`} />
            <div className={`relative overflow-hidden rounded-[4px] border border-line-strong ${large ? "h-36" : "h-14"}`}>
              <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 10 10">
                <path d="M0 0 L10 10 M10 0 L0 10" className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className={`mt-auto rounded-[4px] bg-ink/80 ${large ? "h-10" : "h-4"}`} />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}

function DrawnSite({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className={`flex h-full flex-col ${large ? "gap-6 p-8 sm:p-12" : "gap-3 p-4"}`}>
      <div className="flex items-center justify-between">
        <span className={`font-mono text-ink ${large ? "text-[14px]" : "text-[11px]"}`}>{initials(project.name)}</span>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`rounded-[2px] bg-line-strong ${large ? "h-1.5 w-8" : "h-1 w-5"}`} />
          ))}
        </span>
      </div>
      <div className={`grid flex-1 ${large ? "grid-cols-[3fr_2fr] gap-8" : "grid-cols-[3fr_2fr] gap-3"}`}>
        <div className="flex min-w-0 flex-col justify-center gap-2">
          <span
            className={`truncate font-medium leading-tight tracking-[-0.01em] text-ink ${
              large ? "text-[clamp(28px,3.6vw,48px)]" : "text-[16px]"
            }`}
          >
            {project.name}
          </span>
          <span className={`rounded-[2px] bg-line-strong ${large ? "h-2 w-4/5" : "h-1 w-4/5"}`} />
          <span className={`rounded-[2px] bg-line-strong ${large ? "h-2 w-3/5" : "h-1 w-3/5"}`} />
        </div>
        <div className="relative overflow-hidden rounded-[4px] border border-line-strong">
          <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 10 10">
            <path d="M0 0 L10 10 M10 0 L0 10" className="stroke-line" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
      <div className={`grid grid-cols-3 ${large ? "h-24 gap-4" : "h-8 gap-2"}`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="rounded-[4px] border border-line" />
        ))}
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

  if (isApp) return <DrawnApp project={project} large={large} />;

  if (project.images?.length && !failed) {
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

  return (
    <BrowserFrame large={large}>
      <DrawnSite project={project} large={large} />
    </BrowserFrame>
  );
}
