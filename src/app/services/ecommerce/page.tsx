import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { Section } from "@/components/ui/Section";
import { websitePackages } from "@/content/agency";

export const metadata: Metadata = {
  title: "Ecommerce Development | Dev2Scale",
  description:
    "Ecommerce systems for product discovery, conversion, checkout, and growth — built as a commercial storefront, not just a catalog.",
};

const flow = [
  "Discovery",
  "Product",
  "Store",
  "Checkout",
  "Tracking",
  "Marketing",
  "Optimization",
  "Growth",
];

export default function EcommercePage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Ecommerce",
          title: "The complete ecommerce ecosystem from discovery to repeat purchase.",
          description:
            "A good storefront is not enough. The buying journey has to be clear, tracked, optimized, and connected to acquisition and retention.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {websitePackages
            .filter((offer) => offer.id === "ecommerce-growth")
            .map((offer) => (
              <PricingCard
                key={offer.id}
                offer={offer}
                href="/contact"
                secondaryAction={{ label: "Discuss store scope", href: "/contact" }}
              />
            ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Growth system",
          title: "From product discovery to checkout and beyond.",
          description:
            "The strongest ecommerce storefronts handle product presentation, trust, offer clarity, and conversion data in one connected flow.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map((step) => (
            <div key={step} className="rounded-card border bg-background-card p-4 text-center text-sm font-semibold text-content">
              {step}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "What we build",
          title: "A storefront engineered for conversion.",
          description:
            "We design ecommerce systems that support clear product storytelling, trust signals, smooth checkout, and performance tracking before the campaign starts.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Premium storefront, collections and product discovery",
            "Catalog management, variants and stock visibility",
            "Checkout, payment and shipping configuration",
            "Analytics, tracking and conversion optimization",
          ].map((item) => (
            <div key={item} className="rounded-card border bg-background-secondary/70 p-5 text-sm text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Ready to scale",
          title: "Build a store that supports both sales and future growth.",
          description:
            "For D2C brands, lifestyle products, and online-first businesses, the store should support both customer experience and measurable performance.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Book a project conversation</Button>
          <Button href="/pricing" variant="secondary">
            View pricing <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
