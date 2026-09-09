"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { growthProcess } from "@/content/agency";
import { EASE_CLEAN } from "@/lib/animations";

/**
 * ProcessPreview — the homepage teaser for `/process` (tracker F17).
 *
 * Same vertical-rail mechanic as `SystemDiagram`'s mobile layout (a
 * `scaleY` line draw at the same 900ms/EASE_CLEAN the connector already
 * uses, rather than routing through the SVG-shaped `drawLine` variant,
 * which doesn't fit a plain div rail). Condensed to the five stages
 * `growthProcess` already defines — no new content, a richer presentation
 * of the same real process the full page walks through in depth.
 */
export function ProcessPreview() {
  const reduce = useReducedMotion();

  return (
    <Section
      tone="alt"
      heading={{
        eyebrow: "How we work",
        title: "Five stages, the same for every engagement.",
        description:
          "No lengthy discovery phase and no surprise scope. Every engagement moves through the same five stages, whichever phase you start at.",
      }}
      headerAside={
        <Button
          href="/process"
          variant="secondary"
          analytics={{ location: "home-process" }}
        >
          See the full process
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <StaggerGroup
        as="ol"
        childCount={growthProcess.length}
        className="relative max-w-2xl space-y-8"
      >
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-6 top-6 w-0.5 overflow-hidden"
        >
          <motion.div
            className="h-full w-full bg-line-strong"
            initial={reduce ? undefined : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE_CLEAN }}
            style={{ transformOrigin: "top" }}
          />
        </div>
        {growthProcess.map((stage) => (
          <StaggerGroupItem
            as="li"
            key={stage.number}
            className="relative flex gap-4"
          >
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-tile border-2 border-line-strong bg-paper text-body-sm font-semibold text-ink">
              {stage.number}
            </span>
            <div className="pt-1.5">
              <p className="font-semibold text-ink">{stage.title}</p>
              <p className="mt-1 text-body-sm text-ink-secondary">
                {stage.description}
              </p>
            </div>
          </StaggerGroupItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
