import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface CtaPanelProps {
  eyebrow?: string;
  heading: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  supportingText?: string;
  treatment?: "band" | "surface";
  className?: string;
}

/** Contextual conversion panel, suitable for service-specific or general CTAs. */
export function CtaPanel({
  eyebrow,
  heading,
  description,
  primary,
  secondary,
  supportingText,
  treatment = "band",
  className,
}: CtaPanelProps) {
  const inverse = treatment === "band";
  return (
    <section
      className={cn(
        "overflow-hidden rounded-lg p-7 sm:p-10 lg:p-12",
        inverse
          ? "bg-band-gradient text-white shadow-band"
          : "surface-elevated text-content",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "meta-label",
            inverse ? "text-white/65" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className="mt-5 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <p
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed",
            inverse ? "text-white/78" : "text-content-secondary",
          )}
        >
          {description}
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={primary.href} variant={inverse ? "inverse" : "primary"}>
          {primary.label}
          <ArrowRight size={17} />
        </Button>
        {secondary ? (
          <Button
            href={secondary.href}
            variant={inverse ? "secondary" : "ghost"}
            className={
              inverse
                ? "border-white/25 bg-white/0 text-white hover:border-white/45 hover:bg-white/10"
                : ""
            }
          >
            {secondary.label}
          </Button>
        ) : null}
      </div>
      {supportingText ? (
        <p
          className={cn(
            "mt-6 text-xs",
            inverse ? "text-white/60" : "text-content-muted",
          )}
        >
          {supportingText}
        </p>
      ) : null}
    </section>
  );
}
