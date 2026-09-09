import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { phases, systemStatement } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * PhaseTriad — the three phases, presented as one system.
 *
 * A server component: static markup with a client `StaggerGroup` for the
 * reveal. That is the boundary discipline the architecture asks for — push
 * `"use client"` down to the leaf that needs it rather than wrapping a whole
 * section in it (docs/04 §3).
 *
 * Each card gets its phase's top-edge accent via `Card`'s `phase` prop, so the
 * three stay visually connected to the hero diagram, the mega-menu and the
 * service pages without any of them agreeing by coincidence.
 *
 * The card is NOT one big link, so the whole surface is not `interactive`:
 * it holds a heading, a capability list and a link, and making the container
 * clickable would either swallow the inner link or produce a nested
 * interactive element. One explicit link at the bottom instead.
 */
export function PhaseTriad() {
  return (
    <Section
      id="the-system"
      tone="alt"
      heading={{
        eyebrow: "One system, three phases",
        title: "Build the foundation. Automate the work. Grow the revenue.",
        description: systemStatement,
      }}
    >
      <StaggerGroup
        as="ul"
        childCount={phases.length}
        className="grid gap-gap-grid md:grid-cols-3"
      >
        {phases.map((phase) => {
          const accent = phaseAccent(phase.id);
          const Icon = phase.icon;
          return (
            <StaggerGroupItem as="li" key={phase.id} className="h-full">
              <Card phase={phase.id} className="flex h-full flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded",
                      accent.tint,
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn("h-5 w-5", accent.text)}
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className={cn("meta-label", accent.text)}>
                    {phase.number} · {phase.name}
                  </span>
                </div>

                <h3 className="mt-5 text-title font-semibold text-ink">
                  {phase.title}
                </h3>
                <p className="mt-3 text-body-sm text-ink-secondary">
                  {phase.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {phase.capabilities.map((capability) => {
                    const CapIcon = capability.icon;
                    return (
                      <li
                        key={capability.label}
                        className="flex items-center gap-2.5 text-body-sm text-ink-secondary"
                      >
                        <CapIcon
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-ink-muted"
                          strokeWidth={1.5}
                        />
                        {capability.label}
                      </li>
                    );
                  })}
                </ul>

                {/* mt-auto pins the link to the bottom so the three cards'
                    links align regardless of description length. */}
                <Link
                  href={phase.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-body-sm font-semibold uppercase tracking-cta text-signal underline-offset-4 hover:underline"
                >
                  {phase.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </Card>
            </StaggerGroupItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
