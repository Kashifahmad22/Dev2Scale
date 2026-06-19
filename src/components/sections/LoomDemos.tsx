"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { loomDemosContent, type LoomDemo } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";

/**
 * Converts a Loom share URL to its embeddable form. Returns null when the URL
 * is empty or unrecognised (so the card shows a branded placeholder instead).
 */
function toLoomEmbed(url: string): string | null {
  const match = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9-]+)/);
  return match ? `https://www.loom.com/embed/${match[1]}` : null;
}

/**
 * Loom demo library — a data-driven grid (loomDemosContent in site.ts). Each
 * card shows a branded, on-brand thumbnail with a play button until a Loom
 * share URL is added to config, at which point it embeds the video (sandboxed,
 * lazy-loaded). No video data is hardcoded into the component.
 */
export function LoomDemos({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="walkthroughs" tone="secondary" className={className}>
      <SectionHeading
        eyebrow={loomDemosContent.eyebrow}
        title={loomDemosContent.heading}
        subtitle={loomDemosContent.subheading}
        maxWidthClass="max-w-3xl"
      />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {loomDemosContent.items.map((demo) => (
          <motion.div key={demo.id} variants={staggerItem}>
            <DemoCard demo={demo} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function DemoCard({ demo }: { demo: LoomDemo }) {
  const embed = toLoomEmbed(demo.loomUrl);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card border bg-background-card shadow-card transition-shadow duration-200 hover:shadow-cardHover">
      <div className="relative aspect-video w-full overflow-hidden border-b">
        {embed ? (
          <iframe
            src={embed}
            title={demo.title}
            loading="lazy"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <Thumbnail title={demo.title} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-semibold text-content">{demo.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          {demo.description}
        </p>
      </div>
    </div>
  );
}

/**
 * Branded placeholder shown until a Loom URL is provided — a subtle dotted-grid
 * panel with a play button. On-brand (no stock imagery).
 */
function Thumbnail({ title }: { title: string }) {
  return (
    <div className="dot-grid absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent-soft/60">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-gradient text-white shadow-[0_12px_30px_-12px_rgba(47,87,226,0.6)] transition-transform duration-200 group-hover:scale-105">
        <Play size={22} className="translate-x-0.5 fill-current" />
      </span>
      <span className="px-6 text-center text-xs font-medium uppercase tracking-wider text-content-muted">
        {title} · walkthrough coming soon
      </span>
    </div>
  );
}
