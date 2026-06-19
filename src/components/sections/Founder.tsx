"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { founderContent } from "@/config/site";

/**
 * Founder note — a candid, human trust signal (not a testimonial). Content
 * lives in founderContent and is meant to be edited in the founder's own voice.
 */
export function Founder({ className }: { className?: string }) {
  return (
    <Section id="founder" className={className}>
      <SectionHeading
        eyebrow={founderContent.eyebrow}
        title={founderContent.heading}
      />

      <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.05}>
        <Card className="p-8 sm:p-10">
          <div className="space-y-4">
            {founderContent.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-content-secondary sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t pt-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-gradient font-mono text-sm font-semibold text-white">
              {founderContent.signature.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-content">
                {founderContent.signature.name}
              </p>
              <p className="text-sm text-content-muted">
                {founderContent.signature.role}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
