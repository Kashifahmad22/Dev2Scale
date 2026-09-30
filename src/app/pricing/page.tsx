import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { Section } from "@/components/ui/Section";
import { performancePackages, websitePackages } from "@/content/agency";

export const metadata: Metadata = {
  title: "Pricing | Dev2Scale",
  description:
    "Transparent pricing for websites, ecommerce, AI systems and performance marketing with clear scope and payment terms.",
};

export default function PricingPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Pricing",
          title: "Transparent pricing that helps you decide the right next step.",
          description:
            "We keep pricing visible so the conversation can focus on fit, scope and business objectives rather than uncertainty.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {websitePackages.map((offer) => (
            <PricingCard
              key={offer.id}
              offer={offer}
              href="/contact"
              secondaryAction={{ label: "Talk through scope", href: "/contact" }}
            />
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Performance marketing",
          title: "Paid acquisition packages built for repeatable growth.",
          description:
            "Advertising spend is separate from the management fee. The goal is to create a transparent operating model around customer acquisition.",
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
        heading={{
          eyebrow: "AI systems",
          title: "Custom scope based on business requirements.",
          description:
            "AI systems are scoped around operations, workflows, customer journeys and integrations rather than listed as a one-size-fits-all package.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="rounded-card border bg-background-secondary/60 p-6 sm:p-7">
          <p className="meta-label text-accent">Custom scope</p>
          <p className="mt-4 text-xl font-semibold text-content">
            AI lead qualification, AI voice receptionist, WhatsApp automation, CRM workflows and internal operations support.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">Discuss your AI system</Button>
          </div>
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Payment terms and exclusions",
          title: "Clear commercial structure and realistic scope boundaries.",
          description:
            "Payment terms are set at proposal stage, and additional third-party costs may apply depending on the project scope and platform requirements.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border bg-background-card p-6">
            <p className="meta-label text-accent">Website projects</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-content-secondary">
              <li>50% advance</li>
              <li>30% after design approval</li>
              <li>20% before launch</li>
            </ul>
          </div>
          <div className="rounded-card border bg-background-card p-6">
            <p className="meta-label text-accent">Performance marketing</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-content-secondary">
              <li>Monthly retainer paid in advance</li>
              <li>Advertising spend separate</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 rounded-card border bg-background-card p-6">
          <p className="meta-label text-accent">Potential additions</p>
          <p className="mt-4 text-sm leading-relaxed text-content-secondary">
            Domain, hosting, Shopify subscription, premium themes, paid plugins and apps, payment gateway charges, shipping partner charges, advertising spend, photography, video production, additional product uploads, major new features, and requirements outside the agreed scope may be billed separately.
          </p>
        </div>
      </Section>
    </main>
  );
}
