"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type AiOffer, type Package } from "@/content/agency";
import { cn } from "@/lib/utils";

type PricedOffer = Package | AiOffer;

interface PricingCardProps {
  offer: PricedOffer;
  href: string;
  secondaryAction?: { label: string; href: string };
  className?: string;
}

function isPackage(offer: PricedOffer): offer is Package {
  return "audience" in offer;
}

/**
 * Agency-oriented pricing card. Package detail is progressively disclosed so
 * the price and commercial fit remain legible before the inclusion list.
 */
export function PricingCard({
  offer,
  href,
  secondaryAction,
  className,
}: PricingCardProps) {
  const [expanded, setExpanded] = useState(false);
  const packageOffer = isPackage(offer);
  const recommended = packageOffer && offer.badge === "Recommended";
  const audience = packageOffer
    ? offer.audience
    : ["Businesses needing a system scoped to their workflow"];
  const includes = packageOffer ? offer.includes : offer.systems;
  const note = packageOffer
    ? offer.notes?.[0]
    : "Scope depends on workflows, integrations, voice usage, CRM, telephony, and system complexity.";

  return (
    <article
      className={cn(
        "surface-elevated relative flex h-full flex-col rounded-lg p-6 sm:p-7",
        recommended && "border-accent/35 ring-1 ring-accent/15",
        className,
      )}
    >
      {recommended ? (
        <Badge tone="accent" className="absolute right-5 top-5">
          Recommended
        </Badge>
      ) : null}
      <p className="meta-label text-accent">{offer.pillar}</p>
      <h3 className="mt-4 pr-24 text-2xl font-bold tracking-tight text-content">
        {offer.name}
      </h3>
      <p className="mt-5 text-3xl font-extrabold tracking-tight text-content sm:text-[2.1rem]">
        {offer.price}
      </p>
      <p className="mt-1 text-sm text-content-secondary">
        {packageOffer ? offer.billing : "Consultation-based pricing"}
      </p>
      <p className="mt-5 text-sm font-medium leading-relaxed text-content">
        {packageOffer ? offer.outcome : offer.description}
      </p>
      <div className="mt-6 border-y py-5">
        <p className="meta-label text-content-muted">Best for</p>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          {audience.join(" · ")}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="mt-5 flex min-h-11 w-full items-center justify-between gap-4 text-left text-sm font-semibold text-content"
      >
        {expanded ? "Hide what’s included" : "View what’s included"}
        <ChevronDown
          size={17}
          className={cn(
            "shrink-0 transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>
      {expanded ? (
        <ul className="mt-2 space-y-2 border-b pb-5 text-sm leading-relaxed text-content-secondary">
          {includes.map((item) => (
            <li key={item} className="flex gap-2">
              <Check size={15} className="mt-1 shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {note ? (
        <p className="mt-5 text-xs leading-relaxed text-content-muted">
          {note}
        </p>
      ) : null}
      <div className="mt-auto flex flex-col gap-3 pt-7">
        <Button href={href} className="w-full">
          {offer.cta}
        </Button>
        {secondaryAction ? (
          <Button
            href={secondaryAction.href}
            variant="secondary"
            className="w-full"
          >
            {secondaryAction.label}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
