"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  getMotionProps,
  staggerContainerFor,
  staggerItem,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * StaggerGroup — orchestrates a grid or list so children arrive in sequence.
 *
 * Wrap the container, then wrap each child in `StaggerGroupItem`. The interval
 * is computed from the child count: above six children it compresses so the
 * whole group still lands inside the 420ms budget, rather than making the
 * visitor watch the twelfth card arrive most of a second late (docs/06 §1).
 *
 * `childCount` has to be passed because the interval is baked into the
 * container's variant, and reading `React.Children.count` would miss children
 * produced by a `.map()` inside a fragment.
 *
 * `StaggerGroupItem` is a sibling named export, not `StaggerGroup.Item`. A
 * property assigned onto a "use client" component after the fact isn't a real
 * export the React Server Components bundler can see, so the client reference
 * manifest can't resolve it — that shipped as a static-export-breaking bug
 * (every prerendered page failed with "Could not find the module … in the
 * React Client Manifest"). Two plain exports from the same module are what
 * the bundler can actually track.
 */
type GroupTag = "div" | "ul" | "ol";
type ItemTag = "div" | "li";

interface StaggerGroupProps {
  children: React.ReactNode;
  /** Number of direct children, used to compute the stagger interval. */
  childCount: number;
  as?: GroupTag;
  className?: string;
}

export function StaggerGroup({
  children,
  childCount,
  as = "div",
  className,
}: StaggerGroupProps) {
  const reduce = useReducedMotion();
  const Motion = motion[as];
  const motionProps = getMotionProps(reduce, staggerContainerFor(childCount));

  return (
    <Motion {...motionProps} className={cn(className)}>
      {children}
    </Motion>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  as?: ItemTag;
  className?: string;
}

/**
 * A child of `StaggerGroup`. It carries no `initial`/`whileInView` of its own —
 * the parent drives it through variant propagation, and adding a viewport
 * trigger here would make each child wait for its own intersection and destroy
 * the sequence.
 */
export function StaggerGroupItem({
  children,
  as = "div",
  className,
}: StaggerItemProps) {
  const Motion = motion[as];
  return (
    <Motion variants={staggerItem} className={cn(className)}>
      {children}
    </Motion>
  );
}
