"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { categories, type Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const PAGE_SIZE = 9;

// Reads ?type= and ?industry= (the links in the Our work and Solutions
// menus). Kept in its own Suspense boundary so the grid itself is still
// rendered into the static HTML.
function FiltersFromUrl({ onChange }: { onChange: (type: string | null, industry: string | null) => void }) {
  const params = useSearchParams();
  const type = params.get("type");
  const industry = params.get("industry");
  useEffect(() => {
    onChange(type, industry);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, industry]);
  return null;
}

export function PortfolioBrowser({ projects, industries }: { projects: Project[]; industries: string[] }) {
  const [category, setCategory] = useState<string>("All");
  const [industry, setIndustry] = useState("All");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const chips = ["All", ...categories]
    .map((label) => ({
      label,
      count: label === "All" ? projects.length : projects.filter((p) => p.category === label).length,
    }))
    .filter((c) => c.count > 0);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (industry !== "All" && p.industry !== industry) return false;
      if (!q) return true;
      const text = [p.name, p.category, p.industry, p.summary, ...(p.tech ?? [])].join(" ").toLowerCase();
      return text.includes(q);
    });
  }, [projects, category, industry, query]);

  const shown = matches.slice(0, limit);

  const reset = () => {
    setCategory("All");
    setIndustry("All");
    setQuery("");
    setLimit(PAGE_SIZE);
  };

  return (
    <>
      <Suspense fallback={null}>
        <FiltersFromUrl
          onChange={(t, i) => {
            if (t && chips.some((c) => c.label === t)) setCategory(t);
            else if (t === null && i) setCategory("All");
            if (i && industries.includes(i)) setIndustry(i);
            else if (i === null && t) setIndustry("All");
            setLimit(PAGE_SIZE);
          }}
        />
      </Suspense>

      {/* Sticky from a tablet up. On a phone the bar wraps to three rows
          (about 200px) and, under the 72px header, would cover a third of
          the screen while scrolling the grid. */}
      <div className="z-20 border-b border-line bg-paper md:sticky md:top-[108px]">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-4 py-5">
          <div role="group" aria-label="Filter by type" className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto px-1">
            {chips.map((c) => {
              const active = c.label === category;
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setCategory(c.label);
                    setLimit(PAGE_SIZE);
                  }}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 px-4 text-[15px] font-semibold transition-colors ${
                    active ? "bg-ink text-white" : "bg-stone text-ink hover:bg-stone-2"
                  }`}
                >
                  {c.label} <span className={`text-[13px] tabular-nums ${active ? "text-white/70" : "text-subtle"}`}>{c.count}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
            <label className="flex min-h-11 w-full items-center border-b-2 border-ink/40 bg-stone px-3 focus-within:border-signal sm:w-[320px]">
              <span className="sr-only">Search projects</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18" className="mr-2 shrink-0 text-muted">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m13 13 4.5 4.5" stroke="currentColor" strokeWidth="2" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(PAGE_SIZE);
                }}
                placeholder="Search projects"
                className="w-full bg-transparent py-2.5 text-[16px] text-ink outline-none placeholder:text-subtle"
              />
            </label>
            <label className="inline-flex w-full items-center gap-3 text-[15px] font-semibold sm:w-auto">
              <span className="shrink-0">Industry</span>
              <select
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  setLimit(PAGE_SIZE);
                }}
                className="min-h-11 w-full border-b-2 border-ink/40 bg-stone px-3 text-[15px] font-normal text-ink sm:w-auto"
              >
                <option value="All">All industries</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="shell pb-24 pt-10 lg:pb-32">
        <p className="text-[16px] text-muted" aria-live="polite">
          Showing <span className="font-semibold tabular-nums text-ink">{shown.length}</span> of{" "}
          <span className="tabular-nums">{matches.length}</span> projects
        </p>

        {shown.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className="mt-8 bg-stone px-6 py-16 sm:px-10">
            <p className="title">No projects match your search</p>
            <button type="button" onClick={reset} className="btn btn-dark mt-8">
              Clear filters
            </button>
          </div>
        )}

        {matches.length > shown.length && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn btn-outline">
              Load more projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}
