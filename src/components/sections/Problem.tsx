"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { problemContent, type ComparisonColumn } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * The Problem — frames speed-to-lead as the core stakes, with a side-by-side
 * "Without / With Dev2Scale" comparison and a single hard-hitting statistic.
 */
export function Problem({ className }: { className?: string }) {
  return (
    <Section id="problem" tone="secondary" className={className}>
      <SectionHeading
        eyebrow="The problem"
        title={problemContent.heading}
        subtitle={problemContent.body}
        maxWidthClass="max-w-3xl"
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {problemContent.columns.map((col, i) => (
          <ComparisonCard key={col.heading} column={col} delay={i * 0.08} />
        ))}
      </div>

      <Reveal className="mx-auto mt-10 max-w-3xl text-center" delay={0.1}>
        <blockquote className="text-pretty text-lg font-medium italic leading-relaxed text-content sm:text-xl">
          “{problemContent.statistic.quote}”
        </blockquote>
        <cite className="mt-3 block text-sm not-italic text-content-muted">
          — {problemContent.statistic.source}
        </cite>
      </Reveal>
    </Section>
  );
}

interface ComparisonCardProps {
  column: ComparisonColumn;
  delay: number;
}

/** A single comparison column with a timeline and a set of marked points. */
function ComparisonCard({ column, delay }: ComparisonCardProps) {
  const reduce = useReducedMotion();
  const positive = column.tone === "positive";

  return (
    <Reveal delay={delay}>
      <Card
        className={cn(
          "h-full p-7",
          positive && "border-accent/25 bg-accent/[0.03]",
        )}
      >
        <h3
          className={cn(
            "text-sm font-semibold uppercase tracking-wider",
            positive ? "text-accent" : "text-content-muted",
          )}
        >
          {column.heading}
        </h3>

        {/* Timeline */}
        <ol className="mt-5 space-y-3 border-l pl-5">
          {column.timeline.map((entry) => (
            <li key={entry} className="relative text-sm text-content-secondary">
              <span
                className={cn(
                  "absolute -left-[1.4rem] top-1.5 h-2 w-2 rounded-full",
                  positive ? "bg-accent" : "bg-content-muted",
                )}
              />
              {entry}
            </li>
          ))}
        </ol>

        {/* Points */}
        <motion.ul
          {...getMotionProps(reduce, staggerContainer)}
          className="mt-6 space-y-2.5 border-t pt-5"
        >
          {column.points.map((point) => (
            <motion.li
              key={point}
              variants={staggerItem}
              className="flex items-start gap-2.5 text-sm"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                  positive
                    ? "bg-accent/15 text-accent"
                    : "bg-content/[0.05] text-content-muted",
                )}
              >
                {positive ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
              </span>
              <span className={positive ? "text-content" : "text-content-secondary"}>
                {point}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </Reveal>
  );
}
