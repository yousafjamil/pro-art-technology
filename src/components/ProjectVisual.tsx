"use client";

import { useEffect, useRef, useState } from "react";
import { coverImage, tones, type Project } from "@/data/projects";

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
      className={`flex w-[92%] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_1px_3px_rgba(60,64,67,0.15)] ${
        large ? "h-[min(520px,52vw)] min-h-[260px] max-w-[980px]" : "h-[190px]"
      }`}
    >
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line px-3">
        <span className="size-2 rounded-full bg-[#e3e3e3]" />
        <span className="size-2 rounded-full bg-[#e3e3e3]" />
        <span className="size-2 rounded-full bg-[#e3e3e3]" />
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
    <div className={`${size} shrink-0 rounded-t-[26px] bg-ink px-1.5 pt-1.5 ${large ? "rounded-t-[38px] px-2 pt-2" : ""}`}>
      <div className={`h-full overflow-hidden rounded-t-[20px] bg-white ${large ? "rounded-t-[30px]" : ""}`}>{children}</div>
    </div>
  );
}

function DrawnApp({ project, large }: { project: Project; large?: boolean }) {
  const tone = tones[project.tone ?? "blue"];
  return (
    <div className="flex items-end gap-3 sm:gap-5">
      <PhoneFrame large={large}>
        <div className={`flex h-full flex-col ${large ? "gap-3 p-4" : "gap-1.5 p-2.5"}`}>
          <div className={`flex items-center justify-center rounded-xl ${tone.bg} ${large ? "h-28" : "h-12"}`}>
            <span className={`font-bold ${tone.ink} ${large ? "text-4xl" : "text-lg"}`}>{initials(project.name)}</span>
          </div>
          <div className={`truncate font-semibold ${large ? "text-[15px]" : "text-[9px]"}`}>{project.name}</div>
          <div className={`rounded-lg bg-surface ${large ? "h-12" : "h-6"}`} />
          <div className={`rounded-lg bg-surface ${large ? "h-12" : "h-6"}`} />
          {large && <div className="h-12 rounded-lg bg-surface" />}
        </div>
      </PhoneFrame>
      <PhoneFrame large={large} short>
        <div className={`flex h-full flex-col ${large ? "gap-3 p-4" : "gap-1.5 p-2.5"}`}>
          <div className={`rounded bg-ink ${large ? "h-2.5 w-3/5" : "h-1.5 w-3/5"}`} />
          <div className={`rounded-xl bg-surface ${large ? "h-36" : "h-14"}`} />
          <div className={`mt-auto rounded-full ${tone.fill} ${large ? "h-10" : "h-5"}`} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function DrawnSite({ project }: { project: Project }) {
  const tone = tones[project.tone ?? "blue"];
  return (
    <div className="flex h-full flex-col gap-2.5 p-4">
      <div className="h-2.5 w-2/5 rounded bg-ink" />
      <div className={`flex flex-1 items-center justify-center rounded-xl ${tone.bg}`}>
        <span className={`px-3 text-center text-lg font-semibold ${tone.ink}`}>{project.name}</span>
      </div>
      <div className="grid h-1/4 grid-cols-3 gap-2">
        <span className="rounded-lg bg-surface" />
        <span className="rounded-lg bg-surface" />
        <span className="rounded-lg bg-surface" />
      </div>
    </div>
  );
}

export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const fail = useRef(() => setFailed(true)).current;
  const isApp = project.category === "Mobile App";
  const cover = coverImage(project);

  // Mobile app with real screenshots → show them in phone frames.
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

  return (
    <BrowserFrame large={large}>
      {cover && !failed ? (
        <SafeImg
          src={cover}
          alt={`${project.name} website`}
          loading="lazy"
          className="size-full object-cover object-top"
          onFail={fail}
        />
      ) : (
        <DrawnSite project={project} />
      )}
    </BrowserFrame>
  );
}
