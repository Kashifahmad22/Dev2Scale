"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqContent } from "@/config/site";
import { DUR_SLOW, EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * FAQ — an animated single-open accordion. Smooth height + opacity
 * transitions, with an icon that rotates 45° to an ×. Fully
 * keyboard-accessible via native buttons and `aria-expanded`.
 *
 * Retheme note: rebuilt on current tokens and remounted on the homepage —
 * there's no dedicated `/faq` route, so this is the full FAQ, not a teaser
 * (docs/adr/0003).
 */
export function FAQ() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      tone="alt"
      heading={{ eyebrow: "FAQ", title: faqContent.heading }}
    >
      <Reveal className="mx-auto max-w-3xl">
        <div className="divide-y divide-line rounded-card border border-line bg-paper">
          {faqContent.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={cn(
                      "text-body font-medium transition-colors duration-fast ease-clean",
                      isOpen ? "text-ink" : "text-ink-secondary",
                    )}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.2, ease: EASE_CLEAN }
                    }
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-pill border border-line",
                      isOpen ? "text-signal" : "text-ink-muted",
                    )}
                  >
                    <Plus aria-hidden="true" size={15} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: DUR_SLOW, ease: EASE_CLEAN }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pr-12 text-body-sm leading-relaxed text-ink-secondary sm:px-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
