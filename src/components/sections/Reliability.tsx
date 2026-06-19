"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { reliabilityContent, type ReliabilityPoint } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Security & reliability — four concrete, verifiable assurances. A trust
 * mechanism that doesn't rely on testimonials or invented results.
 */
export function Reliability({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="security" tone="secondary" className={className}>
      <SectionHeading
        eyebrow={reliabilityContent.eyebrow}
        title={reliabilityContent.heading}
      />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {reliabilityContent.items.map((point) => (
          <motion.div key={point.title} variants={staggerItem}>
            <PointCard point={point} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function PointCard({ point }: { point: ReliabilityPoint }) {
  const Icon = point.icon;
  return (
    <Card interactive className="flex h-full flex-col p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/25 bg-accent-soft text-accent">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 text-base font-semibold text-content">{point.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-content-secondary">
        {point.description}
      </p>
    </Card>
  );
}
