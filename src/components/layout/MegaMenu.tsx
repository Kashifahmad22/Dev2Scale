"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { megaMenuColumns } from "@/config/nav";
import { menuPanel } from "@/lib/animations";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * MegaMenu — the Services panel, grouped Build / Automate / Grow.
 *
 * The grouping is the point. The nav teaches the three-phase model before the
 * visitor has scrolled anything, which means the homepage doesn't have to do
 * all of that work itself. Columns are derived from `megaMenuColumns`, so
 * registering a service route with a `phase` puts it in the right column
 * automatically.
 *
 * Keyboard contract (owned by the parent `Navbar`, which manages focus):
 * Escape closes and returns focus to the trigger, Tab moves through the links
 * in reading order, and the panel closes on blur-out. This component renders;
 * it does not own the open state.
 */
interface MegaMenuProps {
  onNavigate: () => void;
  id: string;
}

export function MegaMenu({ onNavigate, id }: MegaMenuProps) {
  return (
    <motion.div
      id={id}
      variants={menuPanel}
      initial="hidden"
      animate="show"
      exit="exit"
      className="absolute left-0 right-0 top-full border-b border-line bg-paper shadow-nav"
    >
      <div className="mx-auto grid w-full max-w-container gap-8 px-gutter py-10 md:grid-cols-3">
        {megaMenuColumns.map(({ phase, services }) => {
          const accent = phaseAccent(phase.id);
          return (
            <div key={phase.id}>
              <div className="mb-4 flex items-baseline gap-2">
                <span className={cn("meta-label", accent.text)}>
                  {phase.number}
                </span>
                <span className={cn("meta-label", accent.text)}>
                  {phase.name}
                </span>
              </div>
              <p className="mb-5 text-body-sm text-ink-secondary">
                {phase.role} — {phase.title}
              </p>
              <ul className="space-y-1">
                {services.map((service) => (
                  <li key={service.path}>
                    <Link
                      href={service.path}
                      onClick={onNavigate}
                      className="group flex items-center justify-between rounded px-3 py-2.5 text-body-sm font-semibold text-ink transition-colors duration-fast ease-clean hover:bg-paper-alt"
                    >
                      {service.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-ink-muted opacity-0 transition-opacity duration-fast group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
