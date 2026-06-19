import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** When false, renders the mark without wrapping it in a link to home. */
  asLink?: boolean;
  /** "inverse" renders the wordmark white for use on dark backgrounds. */
  tone?: "default" | "inverse";
}

/**
 * Config-driven logo. Renders one of three modes based on
 * `siteConfig.logo.type`:
 *  - "text": the wordmark (default, no asset required)
 *  - "image": an <Image> from `siteConfig.logo.imagePath`
 *  - "svg":   a React component supplied via `siteConfig.logo.svgComponent`
 *
 * Swap modes by editing src/config/site.ts only — no component changes needed.
 */
export function Logo({ className, asLink = true, tone = "default" }: LogoProps) {
  const { logo, name } = siteConfig;
  // Local cast keeps the union intact for comparisons regardless of how the
  // `as const` config resolves the nested type assertion on `logo.type`.
  const logoType = logo.type as "text" | "image" | "svg";

  let mark: React.ReactNode;

  if (logoType === "image") {
    mark = (
      <Image
        src={logo.imagePath}
        alt={name}
        width={140}
        height={28}
        priority
        className="h-7 w-auto"
      />
    );
  } else if (logoType === "svg" && logo.svgComponent) {
    // svgComponent is typed as a renderable node in config when provided.
    mark = logo.svgComponent as React.ReactNode;
  } else {
    // Text wordmark + a custom SVG brand mark (a rising "growth" path with an
    // end node). Swap the whole logo via siteConfig.logo — no edits here.
    mark = (
      <span className="inline-flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-gradient text-white shadow-[0_6px_16px_-9px_rgba(47,87,226,0.8)]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 16 L10 10 L14 14 L20 6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="6" r="2.3" fill="currentColor" />
          </svg>
        </span>
        <span
          className={cn(
            "font-mono text-base font-semibold tracking-[0.16em]",
            tone === "inverse" ? "text-white" : "text-content",
          )}
        >
          {logo.text}
        </span>
      </span>
    );
  }

  const wrapperClass = cn("inline-flex items-center", className);

  if (!asLink) {
    return <span className={wrapperClass}>{mark}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${name} — home`}
      className={cn(wrapperClass, "transition-opacity hover:opacity-80")}
    >
      {mark}
    </Link>
  );
}
