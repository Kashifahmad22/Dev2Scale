import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProcessTimelineStep {
  number: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface ProcessTimelineProps {
  steps: ProcessTimelineStep[];
  className?: string;
}

/** A responsive progression system: a rail on desktop and readable sequence on mobile. */
export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <ol
      className={cn(
        "grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0",
        className,
      )}
    >
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li
            key={step.number}
            className="surface-elevated relative rounded-card p-5 lg:rounded-none lg:border-l-0 lg:first:rounded-l-card lg:last:rounded-r-card"
          >
            {index < steps.length - 1 ? (
              <ArrowRight
                aria-hidden
                size={16}
                className="absolute -right-2 top-8 z-10 hidden rounded-full bg-accent p-0.5 text-white lg:block"
              />
            ) : null}
            <span className="meta-label text-accent">{step.number}</span>
            {Icon ? <Icon size={18} className="mt-5 text-content" /> : null}
            <h3 className="mt-5 text-lg font-semibold text-content">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              {step.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
