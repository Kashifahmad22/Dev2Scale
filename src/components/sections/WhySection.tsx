import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { whyPoints } from "@/content/home";

/**
 * WhySection — close the objection.
 *
 * Deliberately last before the final CTA, and deliberately plain. Each point
 * answers a question a sceptical buyer is already holding: who actually does
 * the work, what does it cost, what happens if we leave, and can I trust the
 * numbers. No icons and no cards — at this point in the page the visitor is
 * reading, not scanning.
 */
export function WhySection() {
  return (
    <Section
      id="why-dev2scale"
      tone="alt"
      heading={{
        eyebrow: "Why Dev2Scale",
        title: "What you're actually signing up for.",
      }}
    >
      <StaggerGroup
        as="ul"
        childCount={whyPoints.length}
        className="grid gap-x-12 gap-y-9 md:grid-cols-2"
      >
        {whyPoints.map((point, index) => (
          <StaggerGroupItem as="li" key={point.title}>
            <div className="flex gap-5">
              <span
                aria-hidden="true"
                className="meta-label pt-1 text-ink-muted"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-title font-semibold text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-body-sm text-ink-secondary">
                  {point.body}
                </p>
              </div>
            </div>
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
