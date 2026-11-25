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
      <div className="shell">
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
          <label className="flex min-h-11 w-full max-w-[440px] items-center rounded-[4px] border border-line-strong bg-bg-raised px-3 focus-within:border-muted">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder="Search by project, industry or technology"
              className="w-full bg-transparent py-2.5 text-[16px] text-ink outline-none placeholder:text-subtle"
            />
          </label>

          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
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
                  className={`inline-flex min-h-11 items-center gap-2 rounded-[4px] border px-3 text-[14px] transition-colors ${
                    active
                      ? "border-line-strong bg-bg-raised-2 text-ink"
                      : "border-line text-muted hover:border-line-strong hover:text-ink"
                  }`}
                >
                  {c.label} <span className="meta text-subtle">{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-muted" aria-live="polite">
            Showing <span className="tabular-nums text-ink">{shown.length}</span> of{" "}
            <span className="tabular-nums">{matches.length}</span> projects
          </p>
          <label className="inline-flex items-center gap-3 text-[15px] text-muted">
            Industry
            <select
              value={industry}
              onChange={(e) => {
                setIndustry(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              className="min-h-11 rounded-[4px] border border-line-strong bg-bg-raised px-3 text-[15px] text-ink"
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

      <div className="shell pt-8">
        {shown.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {shown.map((p) => (
              <ProjectCard key={p.slug} project={p} headingLevel="h2" />
            ))}
          </div>
        ) : (
          <div className="rounded-[8px] border border-line bg-bg-raised px-6 py-16">
            <p className="text-[20px] text-ink">No projects match your search</p>
            <button type="button" onClick={reset} className="btn btn-line mt-6">
              Clear filters
            </button>
          </div>
        )}

        {matches.length > shown.length && (
          <div className="mt-10">
            <button type="button" onClick={() => setLimit((l) => l + PAGE_SIZE)} className="btn btn-line">
              Load more projects
            </button>
          </div>
        )}
      </div>
    </>
  );
}
