"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroContent } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";

/**
 * The hero's "live" workflow diagram, built entirely from CSS / Framer Motion
 * (no images). Four nodes — Lead Enquires → AI Responds → Qualifies → Books —
 * connected by lines that draw in left-to-right on load. Each node pulses
 * subtly. Layout is horizontal on desktop and vertical on mobile. All motion
 * collapses under reduced motion.
 */
export function HeroDiagram() {
  const reduce = useReducedMotion();
  const nodes = heroContent.diagramNodes;

  return (
    <div className="panel rounded-lg p-5 sm:p-7">
      <div className="flex flex-col items-stretch gap-1 lg:flex-row lg:items-center">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isLast = i === nodes.length - 1;
          return (
            <Fragment key={node.label}>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.25, duration: 0.5, ease: EASE_CLEAN }}
                className="flex flex-1 flex-col items-center gap-3 py-2"
              >
                <div className="relative">
                  {/* Soft accent halo */}
                  <span className="absolute inset-0 -z-10 rounded-lg bg-accent/20 blur-xl" />
                  <span className="flex h-12 w-12 animate-pulse-node items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.08] text-accent">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                </div>
                <span className="text-center font-mono text-xs tracking-tight text-content-secondary">
                  {node.label}
                </span>
              </motion.div>

              {!isLast && <Connector index={i} reduce={!!reduce} />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface ConnectorProps {
  index: number;
  reduce: boolean;
}

/**
 * Animated connector between two nodes. Draws left-to-right on desktop
 * (scaleX) and top-to-bottom on mobile (scaleY), staggered by node index.
 */
function Connector({ index, reduce }: ConnectorProps) {
  const delay = 0.35 + index * 0.25;

  return (
    <div className="flex items-center justify-center lg:flex-1">
      {/* Vertical track (mobile) */}
      <div className="relative h-6 w-px overflow-hidden bg-content/[0.06] lg:hidden">
        <motion.div
          initial={reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay, duration: 0.4, ease: EASE_CLEAN }}
          style={{ originY: 0 }}
          className="h-full w-full bg-gradient-to-b from-accent to-accent/30"
        />
      </div>
      {/* Horizontal track (desktop) */}
      <div className="relative hidden h-px w-full overflow-hidden bg-content/[0.06] lg:block">
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay, duration: 0.4, ease: EASE_CLEAN }}
          style={{ originX: 0 }}
          className="h-full w-full bg-gradient-to-r from-accent to-accent/30"
        />
      </div>
    </div>
  );
}
