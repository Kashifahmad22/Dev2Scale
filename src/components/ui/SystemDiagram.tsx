"use client";

import { motion, useReducedMotion } from "framer-motion";
import { phases } from "@/content/growth-model";
import { getMotionProps, scaleIn } from "@/lib/animations";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * SystemDiagram — Build → Automate → Grow, drawn as one connected thing.
 *
 * This is the hero's visual, and it exists because of a principle rather than
 * for decoration: make the claim visual and interactive instead of writing it
 * (docs/01 P6). "Three services that work together" is a sentence a visitor
 * skims; three connected nodes is a thing they understand at a glance.
 *
 * It is also the **only** place `--grad-system` appears on a page. That
 * gradient is the logo read left to right, and using it twice turns the brand
 * signature into decoration (ADR 0002).
 *
 * Recomposition, not shrinking: horizontal rail with the gradient connector on
 * desktop, vertical rail with a left spine on mobile. A scaled-down horizontal
 * diagram at 375px is unreadable, so the mobile version is a different layout
 * of the same data (docs/07).
 */
export function SystemDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      {/* ---- Desktop: horizontal rail ---- */}
      <div className="hidden md:block">
        {/* The connector sits behind the nodes. aria-hidden because the
            relationship it draws is already stated in the visible labels. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[12%] top-7 h-0.5 overflow-hidden"
        >
          <motion.div
            className="h-full w-full bg-grad-system"
            initial={reduce ? undefined : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        <ol className="relative grid grid-cols-3 gap-6">
          {phases.map((phase, index) => {
            const accent = phaseAccent(phase.id);
            const Icon = phase.icon;
            return (
              <motion.li
                key={phase.id}
                {...getMotionProps(reduce, scaleIn)}
                transition={
                  reduce
                    ? undefined
                    : {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 * index,
                      }
                }
                className="flex flex-col items-center text-center"
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-tile border-2 bg-paper",
                    accent.border,
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn("h-6 w-6", accent.text)}
                    strokeWidth={1.5}
                  />
                </span>
                <span className={cn("meta-label mt-4", accent.text)}>
                  {phase.number} {phase.name}
                </span>
                <span className="mt-1.5 text-body-sm font-semibold text-ink">
                  {phase.role}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>

      {/* ---- Mobile: vertical rail ---- */}
      <ol className="relative space-y-6 md:hidden">
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-0.5 bg-grad-system"
        />
        {phases.map((phase) => {
          const accent = phaseAccent(phase.id);
          const Icon = phase.icon;
          return (
            <li key={phase.id} className="relative flex items-center gap-4">
              <span
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-tile border-2 bg-paper",
                  accent.border,
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={cn("h-5 w-5", accent.text)}
                  strokeWidth={1.5}
                />
              </span>
              <span>
                <span className={cn("meta-label block", accent.text)}>
                  {phase.number} {phase.name}
                </span>
                <span className="text-body-sm font-semibold text-ink">
                  {phase.role}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
