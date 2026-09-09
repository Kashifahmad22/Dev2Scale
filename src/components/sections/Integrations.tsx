import { Section } from "@/components/ui/Section";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { integrationsContent, type Integration } from "@/config/site";

/**
 * Integration ecosystem — real, honest tool logos rendered as CSS masks so
 * they're uniformly monochrome regardless of each SVG's own colours. SVGs
 * live in `/public/logos/{slug}.svg` (Simple Icons).
 *
 * Retheme note: this section predates ADR 0002 and previously referenced
 * dead pre-retheme classes (`bg-background-card`, `text-content-secondary`,
 * `hover:shadow-cardHover`) that don't exist in the current token set, which
 * left it dormant. Rebuilt on the live `.card`/`Section`/`StaggerGroup`
 * primitives and remounted (docs/adr/0003).
 */
export function Integrations() {
  return (
    <Section
      id="integrations"
      tone="alt"
      heading={{
        eyebrow: integrationsContent.eyebrow,
        title: integrationsContent.heading,
        description: integrationsContent.subheading,
      }}
    >
      <StaggerGroup
        as="ul"
        childCount={integrationsContent.items.length}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {integrationsContent.items.map((item) => (
          <StaggerGroupItem as="li" key={item.slug}>
            <div className="card group flex h-full flex-col items-center justify-center gap-3.5 px-4 py-8 transition-shadow duration-fast ease-clean hover:card-hover">
              <LogoMark integration={item} />
              <span className="text-caption font-medium text-ink-secondary">
                {item.name}
              </span>
            </div>
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}

/** Monochrome, tintable brand logo via CSS mask. */
function LogoMark({ integration }: { integration: Integration }) {
  const url = `/logos/${integration.slug}.svg`;
  return (
    <span
      role="img"
      aria-label={integration.name}
      className="h-8 w-8 bg-ink-muted transition-colors duration-fast ease-clean group-hover:bg-signal"
      style={{
        maskImage: `url(${url})`,
        WebkitMaskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
