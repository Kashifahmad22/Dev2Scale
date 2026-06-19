"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { offersContent, siteConfig, type Offer } from "@/config/site";
import { staggerContainer, staggerItem, getMotionProps } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Offers — presented as consulting engagement cards (clear scope + outcome),
 * deliberately NOT SaaS pricing boxes. The Growth System is highlighted as the
 * most popular. CTAs resolve to siteConfig links.
 */
export function Offers({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <Section id="offers" tone="secondary" className={className}>
      <SectionHeading
        eyebrow="Engagements"
        title={offersContent.heading}
        subtitle={offersContent.subheading}
      />

      <motion.div
        {...getMotionProps(reduce, staggerContainer)}
        className="mt-14 grid items-start gap-5 lg:grid-cols-3"
      >
        {offersContent.items.map((offer) => (
          <motion.div key={offer.name} variants={staggerItem} className="h-full">
            <OfferCard offer={offer} />
          </motion.div>
        ))}
      </motion.div>

      <Reveal className="mx-auto mt-10 max-w-2xl text-center" delay={0.1}>
        <p className="text-xs leading-relaxed text-content-muted">
          {offersContent.footnote}
        </p>
      </Reveal>
    </Section>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const href =
    offer.ctaTarget === "calendly"
      ? siteConfig.contact.calendly
      : siteConfig.contact.calendly; // "pilot" routes through the same booking flow

  return (
    <Card
      highlighted={offer.highlighted}
      interactive
      className={cn("flex h-full flex-col p-7", offer.highlighted && "lg:py-9")}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-content">{offer.name}</h3>
        {offer.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-white">
            <Star size={12} className="fill-current" />
            {offer.badge}
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold tracking-tight text-content">
          {offer.price}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wider text-content-muted">
          {offer.cadence}
        </p>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-content-secondary">
        {offer.description}
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t pt-6">
        {offer.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="text-content-secondary">{item}</span>
          </li>
        ))}
      </ul>

      <Button
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={offer.highlighted ? "primary" : "secondary"}
        size="md"
        className="mt-7 w-full"
      >
        {offer.cta}
        <ArrowRight size={16} />
      </Button>
    </Card>
  );
}
