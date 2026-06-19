"use client";

import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCtaContent, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Final CTA — a full-width brand-gradient band with white type and a white
 * (inverse) button, echoing the trust bar. One decisive call to action plus
 * three inline trust signals.
 */
export function FinalCTA({ className }: { className?: string }) {
  return (
    <section
      id="final-cta"
      className={cn(
        "relative w-full overflow-hidden bg-band-gradient py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {finalCtaContent.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            {finalCtaContent.subheading}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-9 flex justify-center">
          <Button
            href={siteConfig.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            variant="inverse"
            size="lg"
          >
            {finalCtaContent.cta}
            <ArrowRight size={18} />
          </Button>
        </Reveal>

        <Reveal
          delay={0.18}
          className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/85 sm:flex-row sm:gap-7"
        >
          {finalCtaContent.trustSignals.map((signal) => (
            <span key={signal} className="inline-flex items-center gap-2">
              <Check size={15} className="text-white" />
              {signal}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
