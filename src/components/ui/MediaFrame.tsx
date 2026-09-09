import { ImageIcon, Play } from "lucide-react";
import { type MediaKind, type WorkMedia } from "@/content/agency";
import type { PhaseId } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

const mediaLabels: Record<MediaKind, string> = {
  campaign: "Campaign evidence",
  analytics: "Analytics evidence",
  website: "Website project",
  crm: "CRM workflow",
  "ai-conversation": "AI conversation",
  video: "Video walkthrough",
  dashboard: "Dashboard evidence",
};

interface MediaFrameProps {
  media?: WorkMedia;
  kind?: MediaKind;
  /** Tints the empty-state chip and top rule in the phase's colour — the
   * logo's own palette (ember/gold/signal) rather than a generic accent. */
  phase?: PhaseId;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A consistent evidence container. It only renders supplied media; otherwise
 * it communicates the intended evidence type without faking a screenshot.
 *
 * Retheme note: this component predates ADR 0002 and previously referenced
 * dead pre-retheme classes (`bg-background-card`, `text-accent`, `dot-grid`,
 * `bg-accent-gradient`) that don't exist in the current token set. Rebuilt on
 * the live `.card`/`.surface-sunk`/`.grid-lines`/`phaseAccent()` primitives.
 */
export function MediaFrame({
  media,
  kind = "website",
  phase,
  className,
  children,
}: MediaFrameProps) {
  const activeKind = media?.kind ?? kind;
  const label = mediaLabels[activeKind];
  const accent = phase ? phaseAccent(phase) : undefined;

  if (children) {
    return (
      <div className={cn("card overflow-hidden", className)}>{children}</div>
    );
  }

  if (media?.src) {
    return (
      <figure className={cn("card overflow-hidden", className)}>
        {/* object-contain, not object-cover: this is evidence (an ad-account
            screenshot, a campaign graphic), and cropping it to fill an
            arbitrary frame risks cutting off the exact number the caption is
            vouching for. A neutral backdrop absorbs whatever letterboxing
            the source image's aspect ratio needs. */}
        <div className="flex h-full w-full items-center justify-center bg-paper-sunk">
          <img
            src={media.src}
            alt={media.alt}
            className="h-full w-full object-contain"
          />
        </div>
        {media.caption ? (
          <figcaption className="border-t border-line px-4 py-3 text-caption text-ink-secondary">
            {media.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={cn(
        "grid-lines surface-sunk relative flex min-h-52 items-end overflow-hidden p-5",
        className,
      )}
    >
      {/* Solid phase fill, never the gradient — `--grad-system` is reserved
          for `SystemDiagram` alone, so it reads as the brand signature and
          not decoration repeated across the page (ADR 0002). */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          accent ? accent.fill : "bg-ink-muted",
        )}
      />
      <div className="relative">
        <span
          className={cn(
            "card flex h-10 w-10 items-center justify-center",
            accent ? accent.text : "text-ink-muted",
          )}
        >
          {activeKind === "video" ? (
            <Play size={17} className="translate-x-px fill-current" />
          ) : (
            <ImageIcon size={18} />
          )}
        </span>
        <p
          className={cn(
            "meta-label mt-5",
            accent ? accent.text : "text-ink-muted",
          )}
        >
          {label}
        </p>
        <p className="mt-2 max-w-xs text-body-sm leading-relaxed text-ink-secondary">
          Evidence will be added when it can be shared with the right context.
        </p>
      </div>
    </div>
  );
}
