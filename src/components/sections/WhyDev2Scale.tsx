"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { whyContent, type ValueProp } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Why Dev2Scale — four differentiators in a 2×2 grid. Reinforces the
 * revenue-first, business-outcome positioning (not technology).
 */
export function WhyDev2Scale({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="why" className={className}>
      <SectionHeading eyebrow="Why Dev2Scale" title={whyContent.heading} />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 sm:grid-cols-2"
      >
        {whyContent.items.map((item) => (
          <motion.div key={item.title} variants={staggerItem}>
            <ValueCard value={item} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function ValueCard({ value }: { value: ValueProp }) {
  const Icon = value.icon;
  return (
    <Card interactive className="flex h-full gap-5 p-7">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.07] text-accent">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-content">{value.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          {value.description}
        </p>
      </div>
    </Card>
  );
}
