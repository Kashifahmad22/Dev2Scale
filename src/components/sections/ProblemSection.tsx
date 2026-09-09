import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { problem } from "@/content/home";

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
    </Section>
  );
}
