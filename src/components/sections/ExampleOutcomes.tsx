"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingUp, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { outcomesContent, siteConfig, type ExampleOutcome } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Example System Outcomes — explicitly illustrative system walkthroughs (NOT
 * case studies), with a clear disclaimer. Each card is an <OutcomeCard> whose
 * isRealCaseStudy flag (from config) switches it to a real case-study layout
 * once attributable client data is available.
 */
export function ExampleOutcomes({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="outcomes" tone="secondary" className={className}>
      <SectionHeading
        eyebrow="System walkthroughs"
        title={outcomesContent.heading}
        subtitle={outcomesContent.disclaimer}
        maxWidthClass="max-w-3xl"
      />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 md:grid-cols-3"
      >
        {outcomesContent.items.map((item) => (
          <motion.div key={item.industry} variants={staggerItem}>
            <OutcomeCard outcome={item} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mt-12 text-center" delay={0.1}>
        <a
          href={siteConfig.contact.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-base font-medium text-content transition-colors hover:text-accent"
        >
          {outcomesContent.cta}{" "}
          <span className="text-accent">Book a strategy call</span>
          <ArrowRight size={17} />
        </a>
      </Reveal>
    </Section>
  );
}

/**
 * Renders an outcome either as an illustrative system walkthrough
 * (isRealCaseStudy=false) or a real, attributable case study (true).
 */
export function OutcomeCard({ outcome }: { outcome: ExampleOutcome }) {
  if (outcome.isRealCaseStudy) {
    return (
      <Card interactive className="flex h-full flex-col p-7">
        <Badge tone="positive" className="self-start">
          Verified Case Study
        </Badge>
        <Quote size={22} className="mt-5 text-accent" />
        <p className="mt-3 flex-1 text-base leading-relaxed text-content">
          {outcome.quote ?? outcome.result}
        </p>
        <div className="mt-6 border-t pt-5">
          <p className="text-sm font-semibold text-content">
            {outcome.clientName ?? outcome.industry}
          </p>
          <p className="text-sm text-content-muted">
            {outcome.clientCompany ?? outcome.system}
          </p>
        </div>
        <MetricFooter metric={outcome.metric} />
      </Card>
    );
  }

  // Illustrative walkthrough layout
  return (
    <Card interactive className="flex h-full flex-col p-7">
      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
        {outcome.industry}
      </span>
      <h3 className="mt-1 text-lg font-semibold text-content">{outcome.system}</h3>

      <div className="mt-5 space-y-4 text-sm leading-relaxed">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-content-muted">
            Problem
          </p>
          <p className="mt-1 text-content-secondary">{outcome.scenario}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-content-muted">
            Automation
          </p>
          <p className="mt-1 text-content-secondary">{outcome.result}</p>
        </div>
      </div>

      <MetricFooter metric={outcome.metric} />
    </Card>
  );
}

/** Highlighted "Outcome" metric pinned to the bottom of the card. */
function MetricFooter({ metric }: { metric: string }) {
  return (
    <div className="mt-6 rounded-card border border-accent/20 bg-accent/[0.05] p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
        Outcome
      </p>
      <div className="mt-1.5 flex items-start gap-2.5">
        <TrendingUp size={17} className="mt-0.5 shrink-0 text-accent" />
        <p className="text-sm font-medium text-content">{metric}</p>
      </div>
    </div>
  );
}
