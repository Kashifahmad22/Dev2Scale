"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trustMetrics } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Full-width brand band (the signature cyan→indigo gradient) presenting four
 * honest capability claims in white. Promises we make — not fabricated totals.
 */
export function TrustBar({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("w-full bg-band-gradient shadow-band", className)}>
      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-5 py-12 sm:px-8 md:grid-cols-4 md:gap-y-0 lg:px-10"
      >
        {trustMetrics.map((metric) => (
          <motion.div
            key={metric.label}
            variants={staggerItem}
            className="flex flex-col items-center px-4 text-center md:border-r md:border-white/20 md:last:border-r-0"
          >
            <span className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {metric.value}
            </span>
            <span className="mt-2 text-xs uppercase tracking-[0.14em] text-white/75 sm:text-[13px]">
              {metric.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
