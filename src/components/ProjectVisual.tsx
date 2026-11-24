"use client";

import { useEffect, useRef, useState } from "react";
import { tones, type Project } from "@/data/projects";

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
      className={`flex w-[92%] flex-col overflow-hidden rounded-t-xl border border-line bg-bg-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${
        large ? "h-[min(520px,52vw)] min-h-[260px] max-w-[980px]" : "h-[190px]"
      }`}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line px-3">
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function PhoneFrame({ children, large, short }: { children: React.ReactNode; large?: boolean; short?: boolean }) {
  const size = large
    ? short
      ? "h-[380px] w-[190px]"
      : "h-[440px] w-[220px]"
    : short
      ? "h-[160px] w-[100px]"
      : "h-[192px] w-[100px]";
  return (
    <div
      className={`${size} shrink-0 rounded-t-[26px] border border-line-strong bg-bg-raised-2 p-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ${large ? "rounded-t-[38px] p-2" : ""}`}
    >
      <div className={`h-full overflow-hidden rounded-t-[20px] bg-bg-raised ${large ? "rounded-t-[30px]" : ""}`}>{children}</div>
    </div>
  );
}

// Designed fallback for a project with no real screenshot yet: a quiet
// typographic mark over a faint engineering grid, not a loading spinner that
// never resolves. Used instead of any live third-party screenshot service —
// those return a "generating preview" placeholder that can sit broken for a
// long time, which is not acceptable on a client-facing portfolio.
function DrawnApp({ project, large }: { project: Project; large?: boolean }) {
  const tone = tones[project.tone ?? "blue"];
  return (
    <div className="flex items-end gap-3 sm:gap-5">
      <PhoneFrame large={large}>
        <div className={`grid-field flex h-full flex-col justify-between ${large ? "gap-3 p-4" : "gap-1.5 p-2.5"}`}>
          <div className={`flex items-center justify-center rounded-md border ${tone.line} ${tone.bg} ${large ? "h-28" : "h-12"}`}>
            <span className={`font-display font-semibold ${tone.ink} ${large ? "text-4xl" : "text-lg"}`}>{initials(project.name)}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className={`truncate font-display font-medium text-ink ${large ? "text-[15px]" : "text-[9px]"}`}>{project.name}</div>
            <div className={`rounded border border-line bg-bg-raised-2 ${large ? "h-12" : "h-6"}`} />
            {large && <div className="h-12 rounded border border-line bg-bg-raised-2" />}
          </div>
        </div>
      </PhoneFrame>
      <PhoneFrame large={large} short>
        <div className={`grid-field flex h-full flex-col ${large ? "gap-3 p-4" : "gap-1.5 p-2.5"}`}>
          <div className={`rounded bg-ink/70 ${large ? "h-2.5 w-3/5" : "h-1.5 w-3/5"}`} />
          <div className={`rounded border border-line bg-bg-raised-2 ${large ? "h-36" : "h-14"}`} />
          <div className={`mt-auto rounded-[6px] ${tone.fill} ${large ? "h-10" : "h-5"}`} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function DrawnSite({ project, large }: { project: Project; large?: boolean }) {
  const tone = tones[project.tone ?? "blue"];
  return (
    <div className="grid-field relative flex h-full flex-col items-center justify-center gap-5 overflow-hidden p-6">
      <span
        aria-hidden="true"
        className={`absolute inset-x-10 top-1/2 h-px -translate-y-1/2 opacity-50 ${tone.ink}`}
        style={{ background: "linear-gradient(to right, transparent, currentColor, transparent)" }}
      />
      <span className={`label rounded-full border ${tone.line} px-3 py-1 ${tone.ink}`}>{project.category}</span>
      <span
        className={`font-display font-semibold tracking-tight text-ink/90 ${large ? "text-[clamp(32px,4vw,56px)]" : "text-2xl"}`}
      >
        {initials(project.name)}
      </span>
      <span className={`max-w-[80%] text-center text-muted ${large ? "text-base" : "text-xs"}`}>{project.name}</span>
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
      <div className="flex items-end gap-3 sm:gap-5">
        {project.images.slice(0, large ? 3 : 2).map((src, i) => (
          <PhoneFrame key={src} large={large} short={i % 2 === 1}>
            <SafeImg src={src} alt={`${project.name} screen ${i + 1}`} className="size-full object-cover object-top" onFail={fail} />
          </PhoneFrame>
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
