"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { solutionsContent, type Solution } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";
import { selectDemo } from "@/lib/utils";

/**
 * Solutions — six outcome-led system cards in a 3×2 grid (single column on
 * mobile, two on tablet). Each card's arrow jumps to the related demo tab.
 */
export function Solutions({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="solutions" tone="secondary" className={className}>
      <SectionHeading
        eyebrow="What we build"
        title={solutionsContent.heading}
        maxWidthClass="max-w-3xl"
      />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {solutionsContent.items.map((item) => (
          <motion.div key={item.title} variants={staggerItem}>
            <SolutionCard solution={item} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/** A single solution card: icon, title, one-line outcome, description, demo link. */
function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;

  return (
    <Card interactive className="group flex h-full flex-col p-7">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.07] text-accent">
        <Icon size={20} strokeWidth={1.75} />
      </span>

      <h3 className="mt-5 text-lg font-semibold text-content">{solution.title}</h3>
      <p className="mt-1.5 text-sm font-medium text-accent">
        {solution.outcome}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
        {solution.description}
      </p>

      <button
        onClick={() => selectDemo(solution.demoId)}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-content-secondary transition-colors hover:text-accent"
      >
        See the demo
        <ArrowRight
          size={15}
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      </button>
    </Card>
  );
}
