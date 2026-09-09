import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** When false, renders the mark without wrapping it in a link to home. */
  asLink?: boolean;
  /** `inverse` for the dark footer band. */
  tone?: "default" | "inverse";
}

/**
 * Config-driven logo. `siteConfig.logo.type` selects the mode, so swapping in
 * the real asset is an edit to `config/site.ts` and nothing else.
 *
 * ASSET GAP — read before "fixing" this. The supplied brand files are raster
 * only, `public/logos/logo.svg` is 0 bytes, and the real wordmark sets `dev`
 * in **white**, which is invisible on this theme's white canvas. So the text
 * mode below is not a placeholder for a missing file — it is the only version
 * that currently works on paper, and the vector redraw is launch-blocking
 * (ADR 0002 consequences).
 *
 * The interim mark is derived from the logo rather than invented: an ember `<`,
 * three rising bars warming ember → gold, and a blue `>`. That is the same
 * left-to-right reading the phase colours come from, so it stays truthful to
 * the brand while being legible at 28px on white.
 */
export function Logo({
  className,
  asLink = true,
  tone = "default",
}: LogoProps) {
  const { logo, name } = siteConfig;
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
    mark = logo.svgComponent as React.ReactNode;
  } else {
    mark = (
      <span className="inline-flex items-center gap-2">
        <svg
          width="26"
          height="20"
          viewBox="0 0 26 20"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* ember `<` */}
          <path
            d="M5.5 4 L1.5 10 L5.5 16"
            stroke="var(--ember)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* three rising bars, ember → gold */}
          <rect
            x="8.5"
            y="11.5"
            width="2.2"
            height="4.5"
            rx="0.6"
            fill="var(--ember)"
          />
          <rect
            x="12"
            y="8.5"
            width="2.2"
            height="7.5"
            rx="0.6"
            fill="var(--action)"
          />
          <rect
            x="15.5"
            y="5"
            width="2.2"
            height="11"
            rx="0.6"
            fill="var(--gold)"
          />
          {/* blue `>` */}
          <path
            d="M20.5 4 L24.5 10 L20.5 16"
            stroke="var(--signal)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={cn(
            "font-display text-body font-extrabold tracking-eyebrow",
            tone === "inverse" ? "text-ink-inverse" : "text-ink",
          )}
        >
          DEV
          <span className="text-signal">2SCALE</span>
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
      className={cn(
        wrapperClass,
        "rounded transition-opacity hover:opacity-80",
      )}
    >
      {mark}
    </Link>
  );
}
