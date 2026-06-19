"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { integrationsContent, type Integration } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Integration ecosystem — real brand logos rendered as CSS masks so they're
 * uniformly monochrome (grey → brand-blue on hover) regardless of each SVG's
 * own colors. SVGs live in /public/logos/{slug}.svg (Simple Icons).
 */
export function Integrations({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="integrations" className={className}>
      <SectionHeading
        eyebrow={integrationsContent.eyebrow}
        title={integrationsContent.heading}
        subtitle={integrationsContent.subheading}
        maxWidthClass="max-w-3xl"
      />

      <motion.ul
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
      >
        {integrationsContent.items.map((item) => (
          <motion.li key={item.slug} variants={staggerItem}>
            <div className="group flex h-full flex-col items-center justify-center gap-3.5 rounded-card border bg-background-card px-4 py-8 shadow-card transition-shadow duration-200 hover:shadow-cardHover">
              <LogoMark integration={item} />
              <span className="text-xs font-medium text-content-secondary">
                {item.name}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
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
      className="h-8 w-8 bg-content-muted transition-colors duration-200 group-hover:bg-accent"
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
