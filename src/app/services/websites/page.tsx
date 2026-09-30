import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PricingCard } from "@/components/ui/PricingCard";
import { Section } from "@/components/ui/Section";
import { websitePackages, workItems } from "@/content/agency";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
  title: "Website Development | Dev2Scale",
  description:
    "Premium digital presence, ecommerce-ready websites, and conversion-focused web experiences built around business growth.",
};

const processSteps = [
  "Discovery and positioning",
  "Content structure and wireframes",
  "Design, build and messaging",
  "Launch, tracking and optimization",
];

export default function WebsitesPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Websites",
          title: "Digital experiences built to turn attention into action.",
          description:
            "A strong website is not just a presence. It becomes a trust layer, a sales channel, and a conversion engine.",
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
          eyebrow: "Why businesses need stronger web infrastructure",
          title: "Your website should do more than look polished.",
          description:
            "The best-performing websites explain value clearly, route attention to the right action, and help the rest of the business convert interest into revenue.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            "Clear positioning for the offer",
            "Trust-building proof and conversion paths",
            "Lead capture through calls, WhatsApp and forms",
            "Tracking that supports future advertising and optimization",
          ].map((item) => (
            <div key={item} className="rounded-card border bg-background-card p-5 text-sm text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Process",
          title: "How a website project moves from clarity to launch.",
          description:
            "The process keeps strategy and execution tightly aligned. We design for clarity before we build for scale.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-card border bg-background-secondary/60 p-5">
              <p className="meta-label text-accent">0{index + 1}</p>
              <p className="mt-4 text-base font-semibold text-content">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Proof",
          title: "Systems and websites that have a commercial purpose.",
          description:
            "Real work matters more than a generic portfolio. We focus on outcomes, clarity of intent, and the business context behind the design.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {workItems.slice(0, 2).map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Ready to build?",
          title: "Let’s design your next digital growth foundation.",
          description:
            "We will scope a site around your actual sales process, offer, and next growth stage.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Start a project</Button>
          <Button href="/pricing" variant="secondary">
            View pricing <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
