import type { MetadataRoute } from "next";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Served at /robots.txt, derived from the route registry.
 *
 * Any route marked `indexable: false` is disallowed here as well as excluded
 * from the sitemap, so the two can never disagree about a page.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = routes
    .filter((route) => !route.indexable)
    .map((route) => route.path);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      ...(disallow.length > 0 ? { disallow } : {}),
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
