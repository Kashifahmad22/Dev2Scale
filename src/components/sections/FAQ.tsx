"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqContent } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * FAQ — an animated single-open accordion covering all 15 questions. Smooth
 * height + opacity transitions, with an icon that rotates 45° to an ×. Fully
 * keyboard-accessible via native buttons and aria-expanded.
 */
export function FAQ({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="secondary" className={className}>
      <SectionHeading eyebrow="FAQ" title={faqContent.heading} />

      <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.05}>
        <div className="divide-y rounded-card border">
          {faqContent.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={cn(
                      "text-base font-medium transition-colors",
                      isOpen ? "text-content" : "text-content-secondary",
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
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                      isOpen ? "text-accent" : "text-content-muted",
                    )}
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_CLEAN }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pr-12 text-sm leading-relaxed text-content-secondary sm:px-6">
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
