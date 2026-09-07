"use client";

import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { type ServicePillar } from "@/content/agency";
import { EASE_CLEAN } from "@/lib/animations";
import { cn } from "@/lib/utils";

type PillarIcon = "build" | "automate" | "grow";

interface PillarCardProps {
  pillar: ServicePillar;
  icon: PillarIcon;
  services?: readonly string[];
  featured?: boolean;
  className?: string;
}

const pillarIcons: Record<PillarIcon, LucideIcon> = {
  build: Code2,
  automate: Bot,
  grow: ChartNoAxesCombined,
};

/** A connected agency-pillar card: number, intent, capabilities, and action. */
export function PillarCard({
  pillar,
  icon,
  services = [],
  featured = false,
  className,
}: PillarCardProps) {
  const reduce = useReducedMotion();
  const Icon = pillarIcons[icon];

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: EASE_CLEAN }}
      className={cn(
        "surface-elevated group relative flex h-full flex-col overflow-hidden rounded-lg p-6 sm:p-7",
        featured && "border-accent/30 bg-accent-soft/35",
        className,
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-gradient transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <span className="meta-label text-content-muted">
          {pillar.number} / {pillar.label}
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.07] text-accent">
          <Icon size={19} />
        </span>
      </div>

      <h3 className="mt-10 text-2xl font-bold tracking-tight text-content">
        {pillar.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
        {pillar.description}
      </p>

      {services.length ? (
        <ul className="mt-6 space-y-2 border-t pt-5 text-sm text-content-secondary">
          {services.map((service) => (
            <li key={service} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {service}
            </li>
          ))}
        </ul>
      ) : null}

      <Button
        href={pillar.href}
        variant="ghost"
        className="mt-auto !px-0 pt-7 text-sm font-semibold text-content"
      >
        {pillar.cta}
        <ArrowUpRight size={16} />
      </Button>
    </motion.article>
  );
}