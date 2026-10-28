import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/contact"].map((path) => ({ url: `${site.url}${path}` }));
  const work = projects.map((p) => ({ url: `${site.url}/work/${p.slug}` }));
  return [...pages, ...work];
}
