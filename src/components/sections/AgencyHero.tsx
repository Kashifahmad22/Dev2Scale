"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EASE_CLEAN } from "@/lib/animations";
import { smoothScrollToId } from "@/lib/utils";

const systemSteps: {
  label: string;
  title: string;
  detail: string;
  icon: LucideIcon;
}[] = [
  {
    label: "Build",
    title: "Digital foundation",
    detail: "Website + tracking",
    icon: Globe2,
  },
  {
    label: "Automate",
    title: "Operating layer",
    detail: "AI + workflows",
    icon: Bot,
  },
  {
    label: "Grow",
    title: "Acquisition layer",
    detail: "Campaigns + conversion",
    icon: BarChart3,
  },
];

/** The homepage hero's system diagram uses UI, not generic AI imagery. */
export function AgencyHero() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.55, ease: EASE_CLEAN },
  });

  return (
    <section className="relative isolate overflow-hidden bg-background pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-32">
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(72%_68%_at_55%_26%,#000,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(55%_65%_at_52%_0%,rgba(47,87,226,0.1),transparent_72%)]"
      />
      <div className="relative mx-auto grid max-w-[var(--container-width)] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:px-10">
        <div>
          <motion.div {...reveal(0)}>
            <Badge tone="accent" withDot>
              Build. Automate. Grow.
            </Badge>
          </motion.div>
          <motion.h1
            {...reveal(0.08)}
            className="mt-7 max-w-3xl text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-content sm:text-5xl lg:text-6xl"
          >
            We build the systems that help businesses grow.
          </motion.h1>
          <motion.p
            {...reveal(0.18)}
            className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-content-secondary sm:text-lg"
          >
            Dev2Scale combines website development, AI systems, and performance
            marketing to build your digital foundation, automate operations, and
            acquire customers.
          </motion.p>
          <motion.div
            {...reveal(0.28)}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="#contact" size="lg">
              Let’s Build &amp; Scale <ArrowRight size={18} />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => smoothScrollToId("#work")}
            >
              See Our Work
            </Button>
          </motion.div>
          <motion.p
            {...reveal(0.36)}
            className="mt-6 font-mono text-xs text-content-muted"
          >
            Working with ambitious businesses in India, the U.S. and beyond.
          </motion.p>
        </div>
        <motion.div
          {...reveal(0.18)}
          className="surface-elevated relative overflow-hidden rounded-lg p-5 sm:p-7"
        >
          <div
            className="absolute inset-x-0 top-0 h-1 bg-accent-gradient"
            aria-hidden
          />
          <div className="flex items-center justify-between">
            <span className="meta-label text-content-muted">
              Dev2Scale growth system
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success" /> Connected
            </span>
          </div>
          <div className="mt-7 space-y-3">
            {systemSteps.map((step, index) => (
              <SystemStep
                key={step.label}
                step={step}
                last={index === systemSteps.length - 1}
              />
            ))}
          </div>
          <div className="mt-5 rounded-card border border-accent/20 bg-accent-soft/55 px-4 py-3">
            <p className="meta-label text-accent">Measure → optimise → scale</p>
            <p className="mt-1 text-sm text-content-secondary">
              The information from every layer makes the next decision clearer.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SystemStep({
  step,
  last,
}: {
  step: (typeof systemSteps)[number];
  last: boolean;
}) {
  const Icon = step.icon;
  return (
    <div>
      <div className="flex items-center gap-4 rounded-card border bg-background-card p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/[0.08] text-accent">
          <Icon size={19} />
        </span>
        <div>
          <p className="meta-label text-accent">{step.label}</p>
          <p className="mt-1 text-sm font-semibold text-content">
            {step.title}
          </p>
          <p className="text-xs text-content-secondary">{step.detail}</p>
        </div>
      </div>
      {!last ? (
        <div className="ml-9 h-3 w-px bg-accent/30" aria-hidden />
      ) : null}
    </div>
  );
}
