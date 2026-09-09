import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollStory } from "@/components/ui/ScrollStory";
import { phases, systemStatement, type Phase } from "@/content/growth-model";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * PhaseTile — an abstract, illustrative product tile per phase: a browser
 * window for Build, a chat/workflow for Automate, a bar chart for Grow.
 * Pure CSS shapes, no images, no numbers — the same honesty posture as
 * `SystemDiagram`/`HeroDiagram` (illustrative mechanism, never a claimed
 * screenshot of real client work; real work lives in Selected Work instead).
 */
function PhaseTile({ phase }: { phase: Phase }) {
  const accent = phaseAccent(phase.id);

  if (phase.id === "build") {
    return (
      <div className="card w-full max-w-sm overflow-hidden">
        <div className="flex items-center gap-1.5 border-b border-line bg-paper-alt px-3 py-2.5">
          <span className="h-2 w-2 rounded-pill bg-line-strong" />
          <span className="h-2 w-2 rounded-pill bg-line-strong" />
          <span className="h-2 w-2 rounded-pill bg-line-strong" />
          <span className="ml-2 h-4 flex-1 rounded-pill bg-paper-sunk" />
        </div>
        <div className="space-y-3 p-5">
          <div className={cn("h-16 rounded", accent.tint)} />
          <div className="h-2.5 w-4/5 rounded-pill bg-paper-sunk" />
          <div className="h-2.5 w-3/5 rounded-pill bg-paper-sunk" />
          <div className={cn("mt-4 h-8 w-28 rounded", accent.fill)} />
        </div>
      </div>
    );
  }

  if (phase.id === "automate") {
    return (
      <div className="card flex w-full max-w-sm flex-col gap-3 p-5">
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-tile rounded-bl-sm border border-line bg-paper-alt px-4 py-2.5 text-body-sm text-ink-secondary">
            New enquiry received
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className={cn(
              "max-w-[70%] rounded-tile rounded-br-sm px-4 py-2.5 text-body-sm font-medium",
              accent.tint,
              accent.text,
            )}
          >
            Qualifying automatically…
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-tile rounded-bl-sm border border-line bg-paper-alt px-4 py-2.5 text-body-sm text-ink-secondary">
            Call booked ✓
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-sm p-5">
      <div className="flex h-32 items-end gap-2.5">
        {[38, 56, 44, 72, 64, 88].map((height, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-t",
              i === 5 ? accent.fill : "bg-paper-sunk",
            )}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-4 h-2.5 w-2/3 rounded-pill bg-paper-sunk" />
    </div>
  );
}

function PhaseSceneContent({ phase }: { phase: Phase }) {
  const accent = phaseAccent(phase.id);
  const Icon = phase.icon;

  return (
    <Container width="wide">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded",
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
          <h3 className="mt-6 text-display-3 font-extrabold text-ink">
            {phase.title}
          </h3>
          <p className="mt-4 max-w-lg text-body-lg text-ink-secondary">
            {phase.description}
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {phase.capabilities.map((capability) => (
              <li
                key={capability.label}
                className="rounded-pill border border-line bg-paper px-3.5 py-1.5 text-body-sm text-ink-secondary"
              >
                {capability.label}
              </li>
            ))}
          </ul>
          <Link
            href={phase.href}
            className={cn(
              "mt-8 inline-flex items-center gap-1.5 text-body-sm font-semibold uppercase tracking-cta underline-offset-4 hover:underline",
              accent.text,
            )}
          >
            {phase.cta}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PhaseTile phase={phase} />
        </div>
      </div>
    </Container>
  );
}

/**
 * The plain, ordinarily-scrolling fallback — mobile, coarse pointer, reduced
 * motion. Each card gets its own independent `Reveal` rather than one
 * `StaggerGroup` spanning all three: stacked vertically, the three cards
 * combined run to ~2500px, and a single shared viewport trigger needs 25% of
 * that whole height visible at once — nearly the full container, an easy
 * threshold to never actually hit while scrolling normally. Cards revealing
 * independently as each scrolls into view is also the more honest read of
 * "ordinarily scrolling" anyway.
 */
function PhaseStack() {
  return (
    <ul className="space-y-10">
      {phases.map((phase) => (
        <Reveal key={phase.id} as="li">
          <Card phase={phase.id} className="p-6 sm:p-8">
            <PhaseSceneContent phase={phase} />
          </Card>
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * PhaseStory — "Build. Automate. Grow.", told progressively.
 *
 * The one flagship pinned/scroll-linked sequence on the homepage (see
 * `ScrollStory` for the mechanism and the docs/06 addendum it ships with).
 * On a capable viewport, the three phases stage through the same fixed
 * frame — Build recedes left as Automate takes the centre, Automate recedes
 * as Grow arrives — instead of three cards read in one glance and forgotten.
 * Same `phases` data as `PhaseTriad` (still used verbatim on `/services`);
 * this is a homepage-only, richer presentation of it, not a second source
 * of truth.
 */
export function PhaseStory() {
  const scenes = phases.map((phase) => (
    <PhaseSceneContent key={phase.id} phase={phase} />
  ));

  return (
    <Section
      id="the-system"
      tone="alt"
      spacing="none"
      heading={{
        eyebrow: "One system, three phases",
        title: "Build the foundation. Automate the work. Grow the revenue.",
        description: systemStatement,
      }}
    >
      <ScrollStory
        scenes={scenes}
        fallback={
          <div className="py-section-y-tight">
            <PhaseStack />
          </div>
        }
      />
    </Section>
  );
}
