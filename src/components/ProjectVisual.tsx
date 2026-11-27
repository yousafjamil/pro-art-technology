"use client";

import { useEffect, useRef, useState } from "react";
import { projectArt, type Project } from "@/data/projects";
import { ProjectArt } from "./GeoArt";

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

// A project's picture, filling its box edge to edge: the first screenshot in
// public/projects/<slug>/ cropped from the top, or, without one (or if it
// fails to load), the project's own geometric composition (`art`). Phone
// screens are shown whole on that composition instead of cropped.
export function ProjectVisual({
  project,
  eager = false,
  className = "",
}: {
  project: Project;
  eager?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const fail = useRef(() => setFailed(true)).current;
  const src = project.images?.[0];
  const frame = project.imageFrame ?? (project.category === "Mobile App" ? "phone" : "browser");
  const art = projectArt(project);

  if (!src || failed) {
    return <ProjectArt spec={art} className={className} />;
  }

  if (frame === "phone") {
    return (
      <div className={`relative size-full ${className}`}>
        <ProjectArt spec={art} />
        <SafeImg
          src={src}
          alt={`${project.name} app screen`}
          loading={eager ? "eager" : "lazy"}
          className="absolute inset-y-[8%] left-1/2 h-[84%] w-auto -translate-x-1/2 object-contain"
          onFail={fail}
        />
      </div>
    );
  }

  return (
    <SafeImg
      src={src}
      alt={`${project.name} website`}
      loading={eager ? "eager" : "lazy"}
      className={`block size-full object-cover object-top ${className}`}
      onFail={fail}
    />
  );
}
