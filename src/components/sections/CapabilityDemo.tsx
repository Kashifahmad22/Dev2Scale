"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { fadeIn } from "@/lib/animations";
import { capabilityDemo, type CapabilityDemoTab } from "@/content/capability-demo";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

function FlowPanel({ tab }: { tab: Extract<CapabilityDemoTab, { kind: "flow" }> }) {
  const accent = phaseAccent(tab.id);
  return (
    <ol className="space-y-5">
      {tab.steps.map((step, index) => (
        <li key={step.title} className="flex gap-4">
          <span
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-pill text-body-sm font-semibold",
              accent.tint,
              accent.text,
            )}
          >
            {index + 1}
          </span>
          <div>
            <p className="font-semibold text-ink">{step.title}</p>
            <p className="mt-1 text-body-sm text-ink-secondary">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ChatPanel({ tab }: { tab: Extract<CapabilityDemoTab, { kind: "chat" }> }) {
  const accent = phaseAccent(tab.id);
  return (
    <div className="space-y-3">
      {tab.messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex",
            message.from === "visitor" ? "justify-start" : "justify-end",
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-tile px-4 py-2.5 text-body-sm",
              message.from === "visitor"
                ? "rounded-bl-sm border border-line bg-paper-alt text-ink-secondary"
                : cn(
                    "rounded-br-sm font-medium",
                    message.isConfirmation ? accent.fill : accent.tint,
                    message.isConfirmation ? accent.onFill : accent.text,
                  ),
            )}
          >
            {message.isConfirmation ? (
              <span className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-4 w-4" />
                {message.text}
              </span>
            ) : (
              message.text
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * CapabilityDemo — "see the mechanism," an illustrative walkthrough of how
 * the three phases hand off to each other. Mechanically the dormant
 * `SystemDemos`/`DemoFlow`/`WhatsAppChat` tab-and-transcript pattern
 * (tab state + cross-fade + `layoutId` indicator), rewritten generic and
 * repointed at Build → Automate → Grow instead of WhatsApp-only lead ops.
 *
 * Explicitly labelled illustrative in its own copy (`content/capability-demo`)
 * — the real, sourced numbers live in Selected Work, not here.
 */
export function CapabilityDemo() {
  const [activeId, setActiveId] = useState(capabilityDemo.tabs[0].id);
  const reduce = useReducedMotion();
  const activeTab = capabilityDemo.tabs.find((tab) => tab.id === activeId)!;
  const accent = phaseAccent(activeId);

  return (
    <Section
      tone="paper"
      heading={{
        eyebrow: capabilityDemo.eyebrow,
        title: capabilityDemo.heading,
        description: capabilityDemo.description,
      }}
    >
      <div
        role="tablist"
        aria-label="Phase"
        className="flex gap-1 border-b border-line"
      >
        {capabilityDemo.tabs.map((tab) => {
          const isActive = tab.id === activeId;
          const tabAccent = phaseAccent(tab.id);
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "relative px-4 py-3 text-body-sm font-semibold transition-colors duration-fast ease-clean",
                isActive ? tabAccent.text : "text-ink-muted hover:text-ink",
              )}
            >
              {tab.label}
              {isActive ? (
                <motion.span
                  layoutId="capabilityDemoIndicator"
                  className={cn("absolute inset-x-0 -bottom-px h-0.5", tabAccent.fill)}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <Card
        tone="sunk"
        className={cn(
          "mt-8 overflow-hidden border-t-2 p-6 sm:p-8",
          accent.border,
        )}
      >
        {/* AnimatePresence key-swap, not a scroll reveal, so this sets
            initial/animate/exit directly off `fadeIn` rather than routing
            through `getMotionProps` (which is `whileInView`-based — the
            wrong trigger for a tab switch that's already on screen). Still
            the one sanctioned variant, no inline easing or duration. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={fadeIn}
            initial={reduce ? false : "hidden"}
            animate="show"
            exit={reduce ? undefined : "hidden"}
          >
            <p className="meta-label mb-6 text-ink-muted">
              {activeTab.caption}
            </p>
            {activeTab.kind === "flow" ? (
              <FlowPanel tab={activeTab} />
            ) : (
              <ChatPanel tab={activeTab} />
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </Section>
  );
}
