import { ImageIcon, Play } from "lucide-react";
import { type MediaKind, type WorkMedia } from "@/content/agency";
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
  className?: string;
  children?: React.ReactNode;
}

/**
 * A consistent evidence container. It only renders supplied media; otherwise
 * it communicates the intended evidence type without faking a screenshot.
 */
export function MediaFrame({
  media,
  kind = "website",
  className,
  children,
}: MediaFrameProps) {
  const activeKind = media?.kind ?? kind;
  const label = mediaLabels[activeKind];

  if (children) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-card border bg-background-card",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  if (media?.src) {
    return (
      <figure
        className={cn(
          "relative overflow-hidden rounded-card border bg-background-card",
          className,
        )}
      >
        {/* Native img keeps this flexible for externally supplied or local proof assets. */}
        <img
          src={media.src}
          alt={media.alt}
          className="h-full w-full object-cover"
        />
        {media.caption ? (
          <figcaption className="border-t px-4 py-3 text-xs text-content-secondary">
            {media.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      className={cn(
        "dot-grid relative flex min-h-52 items-end overflow-hidden rounded-card border bg-accent-soft/45 p-5",
        className,
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 bg-accent-gradient"
        aria-hidden
      />
      <div className="relative">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-white text-accent shadow-card">
          {activeKind === "video" ? (
            <Play size={17} className="translate-x-px fill-current" />
          ) : (
            <ImageIcon size={18} />
          )}
        </span>
        <p className="meta-label mt-5 text-accent">{label}</p>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-content-secondary">
          Evidence will be added when it can be shared with the right context.
        </p>
      </div>
    </div>
  );
}
