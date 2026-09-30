import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { Section } from "@/components/ui/Section";
import { performancePackages } from "@/content/agency";

export const metadata: Metadata = {
  title: "Performance Marketing | Dev2Scale",
  description:
    "Performance marketing strategy and acquisition systems focused on customers, conversion and measurable commercial outcomes.",
};

const journey = ["Ad", "Visit", "Lead / Call", "Qualification", "Customer", "Revenue"];

export default function PerformanceMarketingPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Performance marketing",
          title: "Don’t optimise for clicks. Optimise for customers.",
          description:
            "The real metric is whether growth becomes measurable revenue, not whether a campaign looks busy on the surface.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {performancePackages.map((offer) => (
            <PricingCard
              key={offer.id}
              offer={offer}
              href="/contact"
              secondaryAction={{ label: "Discuss growth", href: "/contact" }}
            />
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Commercial path",
          title: "From campaign to customer to revenue.",
          description:
            "High-performing acquisition systems reduce friction at every step so the marketing investment creates more qualified demand, not just more activity.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {journey.map((step) => (
            <div key={step} className="rounded-card border bg-background-card p-4 text-center text-sm font-semibold text-content">
              {step}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "How we work",
          title: "Strategy, testing and conversion improvement built around the real funnel.",
          description:
            "We look at customer acquisition from the offer to the offer, landing-page quality, tracking, and conversion path that determines whether ad spend becomes revenue.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Campaign strategy and targeting",
            "Audience and creative testing",
            "Landing page and conversion review",
            "Reporting, optimization and retargeting",
          ].map((item) => (
            <div key={item} className="rounded-card border bg-background-secondary/70 p-5 text-sm text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Performance-focused",
          title: "The goal is sustainable, measurable growth.",
          description:
            "We do not trade vanity metrics for business outcomes. We monitor the signals that matter and optimize around what drives revenue.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Discuss your growth plan</Button>
          <Button href="/pricing" variant="secondary">
            View pricing <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
