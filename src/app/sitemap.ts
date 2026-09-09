import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Served at /sitemap.xml, derived from the route registry.
 *
 * Nothing is listed by hand: a new page in `config/routes.ts` appears here the
 * moment it is registered, and a route marked `indexable: false` (the
 * thank-you page) is excluded from both this file and robots. That coupling is
 * the point — a hand-maintained sitemap drifts within a week.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return indexableRoutes.map((route) => ({
    url: new URL(route.path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
