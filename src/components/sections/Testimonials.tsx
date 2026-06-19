"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  testimonialsContent,
  socialProofContent,
  siteConfig,
  type Testimonial,
} from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Social proof. Honest by default: until a real, verified testimonial exists
 * (testimonialsContent.items with isReal: true), this renders a founding-client
 * credibility block instead of empty "coming soon" cards. The moment real
 * testimonials are added, it switches to a proper testimonial grid — no code
 * change required.
 */
export function Testimonials({ className }: { className?: string }) {
  const realOnes = testimonialsContent.items.filter((t) => t.isReal);

  return realOnes.length > 0 ? (
    <TestimonialGrid items={realOnes} className={className} />
  ) : (
    <FoundingCredibility className={className} />
  );
}

/* -------------------------------------------------------------------------- */
/* Founding-client credibility (default, pre-testimonials)                    */
/* -------------------------------------------------------------------------- */

function FoundingCredibility({ className }: { className?: string }) {
  const { eyebrow, heading, foundingNote, trustedTools } = socialProofContent;

  return (
    <Section id="testimonials" className={className}>
      <SectionHeading eyebrow={eyebrow} title={heading} />

      <Reveal className="mx-auto mt-12 max-w-4xl" delay={0.05}>
        <Card highlighted className="overflow-hidden p-8 sm:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            {/* Invitation */}
            <div>
              <span
                aria-hidden
                className="block font-display text-6xl leading-none text-accent/30"
              >
                &ldquo;
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-content sm:text-[1.7rem]">
                {foundingNote.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-content-secondary">
                {foundingNote.body}
              </p>
              <Button
                href={siteConfig.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="mt-7"
              >
                {foundingNote.cta}
                <ArrowRight size={16} />
              </Button>
            </div>

            {/* What founding clients get */}
            <ul className="space-y-3 rounded-card border bg-background/40 p-6">
              {foundingNote.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-content">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>

      <TrustedTools label={trustedTools.label} items={trustedTools.items} />
    </Section>
  );
}

/** Honest "built on" strip — real tooling, rendered as refined wordmark pills. */
function TrustedTools({ label, items }: { label: string; items: string[] }) {
  const reduce = useReducedMotion();

  return (
    <Reveal className="mt-14" delay={0.1}>
      <p className="text-center text-xs uppercase tracking-[0.16em] text-content-muted">
        {label}
      </p>
      <motion.ul
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
      >
        {items.map((item) => (
          <motion.li
            key={item}
            variants={staggerItem}
            className="rounded-lg border px-3.5 py-1.5 text-sm text-content-secondary transition-colors hover:border-strong hover:text-content"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Real testimonial grid (auto-activates once isReal entries exist)           */
/* -------------------------------------------------------------------------- */

function TestimonialGrid({
  items,
  className,
}: {
  items: Testimonial[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <Section id="testimonials" className={className}>
      <SectionHeading eyebrow="Testimonials" title={testimonialsContent.heading} />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 md:grid-cols-3"
      >
        {items.map((t, i) => (
          <motion.div key={i} variants={staggerItem}>
            <Card className="flex h-full flex-col p-7">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={15}
                    className={
                      s < t.rating
                        ? "fill-accent text-accent"
                        : "text-content-muted"
                    }
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-lg leading-relaxed text-content">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border bg-content/[0.04] font-mono text-xs font-semibold text-content-secondary">
                  {t.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-content">{t.name}</p>
                  <p className="truncate text-xs text-content-muted">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
