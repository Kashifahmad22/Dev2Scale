import type { Metadata } from "next";
import { getRoute } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * THE METADATA FACTORY — the only sanctioned way a route declares metadata.
 *
 * A route that hand-writes a `metadata` export bypasses the canonical URL, the
 * title template and the OG image, which is exactly the class of bug nobody
 * notices until a page is competing with itself in search results. So every
 * page calls this instead (docs/04 §8, docs/09).
 *
 * `path` must be registered in `config/routes.ts`; `getRoute` throws if it
 * isn't, which turns a missing registration into a build failure rather than a
 * silently uncanonicalised page. Title, description and robots directives all
 * default to the registry entry, so the common case is `createMetadata("/work")`.
 */
export interface CreateMetadataInput {
  /** Registered route path. */
  path: string;
  /** Override the registry title — for dynamic routes like `/work/[slug]`. */
  title?: string;
  /** Override the registry description. */
  description?: string;
  /** Absolute or root-relative OG image. Defaults to the site card. */
  image?: string;
  /** Force noindex regardless of the registry (drafts, previews). */
  noindex?: boolean;
  type?: "website" | "article";
}

const DEFAULT_OG_IMAGE = "/og-image.png";

export function createMetadata(input: CreateMetadataInput | string): Metadata {
  const opts: CreateMetadataInput =
    typeof input === "string" ? { path: input } : input;
  const route = getRoute(opts.path);

  const title = opts.title ?? route.title;
  const description = opts.description ?? route.description;
  const image = opts.image ?? DEFAULT_OG_IMAGE;
  const canonical = new URL(route.path, siteConfig.url).toString();
  const indexable = route.indexable && !opts.noindex;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: opts.type ?? "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}
