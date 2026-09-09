import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { problem, problemComparison } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * ProblemSection — name the visitor's pain in their words.
 *
 * A short band by design. Its job is recognition, not persuasion: if the
 * visitor reads one of these three and thinks "that's us", the rest of the
 * page has a reason to exist. So it uses `spacing="tight"` and carries no
 * imagery — this is the rest between the entry selector and the work grid
 * (docs/05 §4.1).
 */
export function ProblemSection() {
  return (
    <Section
      id="the-problem"
      tone="paper"
      spacing="tight"
      heading={{
        eyebrow: problem.eyebrow,
        title: problem.title,
        description: problem.description,
      }}
    >
      <StaggerGroup
        as="ul"
        childCount={problem.items.length}
        className="grid gap-gap-grid md:grid-cols-3"
      >
        {problem.items.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerGroupItem as="li" key={item.title}>
              {/* A left rule rather than a card. Three bordered boxes here
                  would compete with the phase triad directly below. */}
              <div className="border-l-2 border-line-ink pl-5">
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-ink-muted"
                  strokeWidth={1.5}
                />
                <h3 className="mt-3 text-title font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-body-sm text-ink-secondary">
                  {item.body}
                </p>
              </div>
            </StaggerGroupItem>
          );
        })}
      </StaggerGroup>

      {/* The without/with contrast — mined from the pre-rebuild homepage's
          problem section, generalized across all three phases rather than
          only "leads go cold" (docs/adr/0003). Kept to two plain cards, no
          icons on the headings, so it stays a quiet contrast rather than
          competing with the phase triad directly below. */}
      <StaggerGroup
        as="ul"
        childCount={problemComparison.length}
        className="mt-10 grid gap-5 md:grid-cols-2"
      >
        {problemComparison.map((column) => {
          const positive = column.tone === "positive";
          return (
            <StaggerGroupItem as="li" key={column.heading} className="h-full">
              <Card
                tone={positive ? "card" : "sunk"}
                highlighted={positive}
                className="h-full p-6"
              >
                <h3
                  className={cn(
                    "text-title font-semibold",
                    positive ? "text-ink" : "text-ink-secondary",
                  )}
                >
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-body-sm text-ink-secondary"
                    >
                      {positive ? (
                        <Check
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                          strokeWidth={2}
                        />
                      ) : (
                        <X
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted"
                          strokeWidth={2}
                        />
                      )}
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerGroupItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
}
