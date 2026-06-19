"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppChat } from "@/components/sections/WhatsAppChat";
import { DemoFlow } from "@/components/sections/DemoFlow";
import { demosContent } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";
import { SELECT_DEMO_EVENT, cn } from "@/lib/utils";

/**
 * System Demos — a tabbed showcase. Tab 1 is a live mock WhatsApp conversation;
 * tabs 2–5 are animated architecture flows. The active tab has an animated
 * underline indicator. Listens for the cross-component "select demo" event so
 * Solutions cards can deep-link to a specific demo.
 */
export function SystemDemos({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { demos, heading, subheading } = demosContent;
  const [activeId, setActiveId] = useState(demos[0].id);

  // Allow other sections (Solutions) to activate a specific tab.
  useEffect(() => {
    const handler = (e: Event): void => {
      const id = (e as CustomEvent<string>).detail;
      if (demos.some((d) => d.id === id)) setActiveId(id);
    };
    window.addEventListener(SELECT_DEMO_EVENT, handler);
    return () => window.removeEventListener(SELECT_DEMO_EVENT, handler);
  }, [demos]);

  const active = demos.find((d) => d.id === activeId) ?? demos[0];

  return (
    <Section id="demos" className={className}>
      <SectionHeading
        eyebrow="Live demos"
        title={heading}
        subtitle={subheading}
        maxWidthClass="max-w-3xl"
      />

      {/* Tab rail */}
      <Reveal className="mt-12">
        <div className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:justify-center">
          {demos.map((demo) => {
            const isActive = demo.id === activeId;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveId(demo.id)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap rounded px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-content"
                    : "text-content-muted hover:text-content-secondary",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="demoTabIndicator"
                    className="absolute inset-0 -z-10 rounded border border-strong bg-content/[0.04]"
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.25, ease: EASE_CLEAN }
                    }
                  />
                )}
                {demo.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Active panel */}
      <Reveal className="mt-8" delay={0.05}>
        <div className="panel rounded-lg p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE_CLEAN }}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              {/* Left: context */}
              <div className="order-2 md:order-1">
                <Badge tone="accent">
                  {active.type === "chat" ? "Live Conversation" : "Automation Flow"}
                </Badge>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-content">
                  {active.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-secondary">
                  {active.caption}
                </p>
                <p className="mt-6 font-mono text-xs text-content-muted">
                  Built and deployed in 5–7 days.
                </p>
              </div>

              {/* Right: the visual (keyed for replay on tab switch) */}
              <div className="order-1 md:order-2">
                {active.type === "chat" ? (
                  <WhatsAppChat key={active.id} messages={active.messages} />
                ) : (
                  <DemoFlow key={active.id} steps={active.steps} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
