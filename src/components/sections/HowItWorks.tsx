"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorksContent, type ProcessStep } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * How It Works — a three-step process timeline. Renders horizontally on
 * desktop (icons linked by a connecting rail) and vertically on mobile. The
 * step bodies are shared between both layouts to stay DRY.
 */
export function HowItWorks({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { steps, heading, footnote } = howItWorksContent;

  return (
    <Section id="how-it-works" className={className}>
      <SectionHeading eyebrow="How it works" title={heading} />

      {/* Desktop: horizontal timeline */}
      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-16 hidden md:grid md:grid-cols-3 md:gap-6"
      >
        {steps.map((step, i) => (
          <motion.div key={step.title} variants={staggerItem} className="relative">
            {/* Connecting rail between icons (not after the last step) */}
            {i < steps.length - 1 && (
              <span className="absolute left-[calc(50%+2rem)] right-[-1.5rem] top-7 h-px bg-gradient-to-r from-accent/40 to-white/[0.04]" />
            )}
            <StepBody step={step} index={i} align="center" />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: vertical timeline */}
      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-12 space-y-8 md:hidden"
      >
        {steps.map((step, i) => (
          <motion.div key={step.title} variants={staggerItem} className="relative pl-2">
            {i < steps.length - 1 && (
              <span className="absolute bottom-[-2rem] left-7 top-14 w-px bg-gradient-to-b from-accent/40 to-white/[0.04]" />
            )}
            <StepBody step={step} index={i} align="left" />
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-14 text-center" delay={0.1}>
        <p className="inline-block rounded-lg border px-4 py-2 font-mono text-xs text-content-secondary">
          {footnote}
        </p>
      </Reveal>
    </Section>
  );
}

interface StepBodyProps {
  step: ProcessStep;
  index: number;
  align: "center" | "left";
}

/** Icon chip + step label + title + description, used by both layouts. */
function StepBody({ step, index, align }: StepBodyProps) {
  const Icon = step.icon;
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "flex flex-col items-center text-center"
          : "flex items-start gap-5 text-left"
      }
    >
      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-background-card text-accent">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div className={centered ? "mt-5" : "pt-1"}>
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {step.step}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-content">{step.title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-content-secondary">
          {step.description}
        </p>
      </div>
      {/* index reserved for future numbered styling */}
      <span className="sr-only">Step {index + 1}</span>
    </div>
  );
}
