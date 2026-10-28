"use client";

import { useMemo, useState } from "react";
import { categories, type Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const PAGE_SIZE = 9;

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
      <div className="mx-auto max-w-[1280px] px-5 sm:px-7">
        <label className="mx-auto mt-10 flex min-h-[60px] max-w-[620px] items-center rounded-full bg-surface px-6">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Search by project, industry or technology"
            className="w-full bg-transparent py-4 text-[17px] outline-none placeholder:text-subtle"
          />
        </label>

        <div role="group" aria-label="Filter by type" className="mt-9 flex flex-wrap justify-center gap-2">
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
                className={
                  active
                    ? "min-h-11 rounded-[10px] border border-brand-soft bg-brand-soft px-4.5 text-[15px] font-semibold text-brand-ink"
                    : "min-h-11 rounded-[10px] border border-outline bg-white px-4.5 text-[15px] font-medium text-muted hover:bg-surface"
                }
              >
                {c.label} <span className={active ? "font-medium" : "text-subtle"}>{c.count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="text-[15px] text-muted" aria-live="polite">
            Showing <strong className="font-semibold text-ink">{shown.length}</strong> of {matches.length} projects
          </p>
          <label className="inline-flex items-center gap-2.5 text-[15px] text-muted">
            Industry
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              className="rounded-[10px] border border-outline bg-white px-3.5 py-2.5 text-[15px] text-ink"
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

      <div className="mx-auto max-w-[1280px] px-5 pt-8 sm:px-7">
        {shown.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-surface px-6 py-16 text-center">
            <p className="text-xl font-medium">No projects match your search</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 rounded-full border border-outline bg-white px-6 py-3 font-semibold text-brand"
            >
              Clear filters
            </button>
          </div>
        )}

        {matches.length > shown.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className="rounded-full border border-outline bg-white px-8 py-3.5 font-semibold text-brand hover:bg-surface"
            >
              Load more projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}
