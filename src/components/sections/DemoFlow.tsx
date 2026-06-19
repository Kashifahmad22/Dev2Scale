"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { type FlowStep } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";

/**
 * Renders a system architecture as a numbered, animated step sequence. Steps
 * reveal one after another with a connector arrow between them. Keyed by demo
 * id upstream so the sequence replays whenever its tab is selected.
 */
export function DemoFlow({ steps }: { steps: FlowStep[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-md">
      <ol className="space-y-1">
        {steps.map((step, i) => (
          <li key={step.title}>
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.4, duration: 0.4, ease: EASE_CLEAN }}
              className="flex items-start gap-4 rounded-card border bg-background-card p-4 shadow-card"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.08] font-mono text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-content">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.4, duration: 0.3 }}
                className="flex justify-center py-1.5 text-content-muted"
                aria-hidden
              >
                <ArrowDown size={16} />
              </motion.div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
