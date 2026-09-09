"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollStory — the site's one pinned, scroll-linked scene sequence.
 *
 * docs/06-motion-system.md bans "scroll-jacking, snap-scroll sections, pinned
 * horizontal scroll" outright, with no carve-out for a vertical staged
 * sequence — see the addendum this component ships alongside (docs/06 §3.1)
 * for the full reasoning. The short version: this is scroll-LINKED, not
 * scroll-jacked. Native scroll position drives `scrollYProgress` 1:1 —
 * nothing auto-advances, no wheel/touch interception, no smooth-scroll
 * override, find-in-page and deep links are untouched. It differs from
 * ordinary scroll-reveal only in that the stage is visually pinned while its
 * content changes, the same mechanism `position: sticky` already uses for
 * the nav bar and the mobile CTA, extended to a content region.
 *
 * Progressive enhancement, not a fork in the content: below 1024px, on a
 * coarse pointer, or under `prefers-reduced-motion`, `fallback` renders
 * instead — a complete, ordinarily-scrolling presentation of the same
 * information, not a degraded stub. `useCanPin` defaults to `false` for the
 * server render and the first client paint, so there is never a hydration
 * mismatch; the pinned stage only switches on after the media query resolves
 * client-side.
 *
 * Deliberately one instance on the site — see PhaseStory, the only caller.
 */

function useCanPin(): boolean {
  const reduce = useReducedMotion();
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return matches && !reduce;
}

/** Padding, as a fraction of total progress, either side of a scene's active window. */
const EDGE_PAD = 0.1;

function sceneRange(
  index: number,
  count: number,
): [number, number, number, number] {
  const start = index / count;
  const end = (index + 1) / count;
  const pad = EDGE_PAD / count;
  const points: [number, number, number, number] = [
    Math.max(0, start - pad),
    start,
    end,
    Math.min(1, end + pad),
  ];
  // Guarantee strictly increasing input for useTransform — matters at the
  // very first/last scene, where clamping to 0 or 1 can collide two points.
  for (let i = 1; i < points.length; i += 1) {
    if (points[i] <= points[i - 1]) points[i] = points[i - 1] + 0.0001;
  }
  return points;
}

function Scene({
  index,
  count,
  progress,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const [fadeInStart, start, end, fadeOutEnd] = sceneRange(index, count);
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // Incoming: slides in from the right and settles centred. Outgoing: drifts
  // left and dims to a resting 32% — "previous content remains part of the
  // composition" rather than disappearing outright.
  const opacity = useTransform(
    progress,
    [fadeInStart, start, end, fadeOutEnd],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0.32],
  );
  const x = useTransform(
    progress,
    [fadeInStart, start, end, fadeOutEnd],
    [isFirst ? 0 : 32, 0, 0, isLast ? 0 : -56],
  );
  const scale = useTransform(
    progress,
    [fadeInStart, start, end, fadeOutEnd],
    [isFirst ? 1 : 0.97, 1, 1, isLast ? 1 : 0.94],
  );

  // Plain state (not a motion value) so non-active scenes leave the a11y
  // tree and can't eat a Tab press while dimmed — the concrete answer to
  // doc 06's keyboard-navigation concern about non-standard scroll patterns.
  const [active, setActive] = useState(isFirst);
  useMotionValueEvent(progress, "change", (value) => {
    setActive(value >= start - 0.001 && value <= end + 0.001);
  });

  return (
    <motion.div
      style={{ opacity, x, scale }}
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 flex items-center",
        !active && "pointer-events-none",
      )}
    >
      {children}
    </motion.div>
  );
}

function ProgressDots({
  count,
  progress,
}: {
  count: number;
  progress: MotionValue<number>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(progress, "change", (value) => {
    setActiveIndex(Math.min(count - 1, Math.floor(value * count)));
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center gap-2"
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-pill transition-[width,background-color] duration-slow ease-clean",
            i === activeIndex ? "w-8 bg-ink" : "w-1.5 bg-line-strong",
          )}
        />
      ))}
    </div>
  );
}

interface ScrollStoryProps {
  /** One element per scene, in order. */
  scenes: React.ReactNode[];
  /**
   * The non-pinned rendering. Mobile, coarse-pointer and reduced-motion
   * viewports all get this instead — a complete presentation, not a fork.
   */
  fallback: React.ReactNode;
  className?: string;
}

/**
 * The actual pinned stage. Split out from `ScrollStory` deliberately: Framer
 * Motion's `useScroll` sets up its scroll-offset measurement in an effect
 * that runs exactly once per mount and never re-measures after (its effect
 * dependencies are the ref objects themselves, which never change identity —
 * see `use-scroll.mjs`). If this lived in the same component instance as the
 * `canPin`-false fallback, the wrapper would mount once at its small
 * fallback size, get measured then, and only *afterwards* resize to its true
 * `{n × 100vh}` pinned height when `canPin` flipped true — a resize Framer
 * never finds out about, leaving `scrollYProgress` permanently stuck. Giving
 * `PinnedStage` its own component identity means it only ever mounts once
 * `canPin` is already true, so its first (only) measurement is against the
 * real, final layout.
 */
function PinnedStage({
  scenes,
  className,
}: {
  scenes: React.ReactNode[];
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", className)}
      style={{ height: `${scenes.length * 100}vh` }}
    >
      {/* Offset by the sticky nav's own height — it renders above this in
          the DOM and wins the top of the viewport, so pinning at a bare
          `top-0` would tuck the first ~4rem of every scene behind it. */}
      <div
        className="sticky overflow-hidden"
        style={{ top: "var(--nav-h)", height: "calc(100vh - var(--nav-h))" }}
      >
        {scenes.map((scene, index) => (
          <Scene
            key={index}
            index={index}
            count={scenes.length}
            progress={scrollYProgress}
          >
            {scene}
          </Scene>
        ))}
        <ProgressDots count={scenes.length} progress={scrollYProgress} />
      </div>
    </div>
  );
}

export function ScrollStory({ scenes, fallback, className }: ScrollStoryProps) {
  const canPin = useCanPin();

  return canPin ? (
    <PinnedStage scenes={scenes} className={className} />
  ) : (
    <div className={className}>{fallback}</div>
  );
}
