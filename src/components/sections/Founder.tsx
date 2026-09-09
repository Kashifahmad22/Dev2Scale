import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { founderContent } from "@/config/site";

/**
 * Founder note — a candid, human trust signal, not a testimonial. Content
 * lives in `founderContent` (`config/site.ts`) and is written in the
 * founder's own voice.
 *
 * Retheme note: rebuilt on current tokens (`text-content*` → `text-ink*`,
 * `bg-accent-gradient` → `grad-system` is reserved for `SystemDiagram` alone
 * per ADR 0002, so the signature chip uses a solid phase-neutral fill
 * instead) and remounted (docs/adr/0003).
 */
export function Founder() {
  return (
    <Section
      id="founder"
      tone="paper"
      heading={{
        eyebrow: founderContent.eyebrow,
        title: founderContent.heading,
      }}
    >
      <Reveal className="mx-auto max-w-3xl">
        <Card className="p-8 sm:p-10">
          <div className="space-y-4">
            {founderContent.body.map((paragraph, i) => (
              <p key={i} className="text-body-lg leading-relaxed text-ink-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-line pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-pill bg-ink font-mono text-body-sm font-semibold text-ink-inverse">
              {founderContent.signature.initials}
            </span>
            <div>
              <p className="text-body-sm font-semibold text-ink">
                {founderContent.signature.name}
              </p>
              <p className="text-body-sm text-ink-muted">
                {founderContent.signature.role}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
