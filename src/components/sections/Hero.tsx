"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroDiagram } from "@/components/sections/HeroDiagram";
import { heroContent } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";
import { cn, smoothScrollToId } from "@/lib/utils";

/**
 * Hero — full-viewport, centered, with the single permitted subtle radial
 * gradient anchored at top-center. Headline animates word-by-word on mount;
 * supporting elements fade up in sequence. The live workflow diagram and a
 * "system active" status indicator sit below the copy.
 */
export function Hero({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Subtle parallax: the diagram drifts slightly as the hero scrolls away.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const diagramY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 72]);

  // Delayed fade-up for elements beneath the word-animated headline.
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: EASE_CLEAN },
  });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative flex min-h-screen w-full items-center overflow-hidden bg-background",
        className,
      )}
    >
      {/* Subtle dotted grid, masked to fade toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(70%_60%_at_50%_28%,#000,transparent_78%)]"
      />
      {/* Soft blue glow at the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(47,87,226,0.10),transparent_72%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-20 pt-32 text-center sm:px-8 lg:pt-36">
        <motion.div {...rise(0)} className="flex justify-center">
          <Badge tone="accent" withDot>
            {heroContent.eyebrow}
          </Badge>
        </motion.div>

        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-content sm:text-5xl lg:text-6xl">
          <AnimatedText
            text={heroContent.headline}
            stagger={0.05}
            animateOnMount
          />
        </h1>

        <motion.p
          {...rise(0.5)}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-content-secondary sm:text-lg"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          {...rise(0.65)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            href={heroContent.primaryCta.href}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="w-full sm:w-auto"
          >
            {heroContent.primaryCta.label}
            <ArrowRight size={18} />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => smoothScrollToId(heroContent.secondaryCta.href)}
          >
            {heroContent.secondaryCta.label}
          </Button>
        </motion.div>

        <motion.div {...rise(0.85)} className="mx-auto mt-14 max-w-3xl">
          <motion.div style={{ y: diagramY }}>
            <HeroDiagram />
            <StatusIndicator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Honest, static status line beneath the diagram. States a real capability
 * (always-on, sub-90-second first response) rather than simulating a live feed.
 */
function StatusIndicator() {
  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-1.5 text-xs text-content-muted sm:flex-row sm:gap-2">
      <span className="inline-flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-accent" />
        <span className="font-medium uppercase tracking-[0.14em] text-content-secondary">
          {heroContent.status.label}
        </span>
      </span>
      <span className="hidden text-content-muted sm:inline">·</span>
      <span>{heroContent.status.note}</span>
    </div>
  );
}
