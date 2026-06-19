"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Final numeric value to count up to. */
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
}

// Ease-out-expo curve matching the design-system clean easing, for the count.
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts up from 0 to `target` once it scrolls into view, using a
 * requestAnimationFrame loop. Honors reduced motion by rendering the final
 * value immediately. Numbers are locale-formatted with optional decimals.
 */
export function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1600,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;

    const tick = (now: number): void => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(target * easeOut(progress));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(value, decimals)}
      {suffix}
    </span>
  );
}
