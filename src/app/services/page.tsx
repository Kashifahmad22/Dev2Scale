import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { servicePillars } from "@/content/agency";

export const metadata: Metadata = {
  title: "Services | Dev2Scale",
  description:
    "Websites, ecommerce systems, AI automation, and performance marketing built to help businesses grow.",
};

const routeMap = {
  build: "/services/websites",
  automate: "/services/ai-systems",
  grow: "/services/performance-marketing",
} as const;

export default function ServicesPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Services",
          title: "Everything your business needs to build, automate and grow.",
          description:
            "We do not sell disconnected services. We build connected systems that support the growth engine behind your business.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePillars.map((pillar) => (
            <article
              key={pillar.id}
              className="surface-elevated flex h-full flex-col rounded-lg p-6 sm:p-7"
            >
              <p className="meta-label text-accent">{pillar.number}</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-content">
                {pillar.label}
              </h2>
              <p className="mt-3 text-xl font-semibold text-content">
                {pillar.title}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                {pillar.description}
              </p>
              <div className="mt-auto pt-6">
                <Button href={routeMap[pillar.id]} className="w-full">
                  {pillar.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Connected model",
          title: "Build the foundation. Automate the work. Grow the outcome.",
          description:
            "The strongest growth systems combine digital presence, operational automation, and commercial acquisition into one loop.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Build",
              text: "Websites, stores and digital infrastructure that turn attention into trust and action.",
            },
            {
              title: "Automate",
              text: "AI systems, workflows, CRM connectivity, and lead handling that reduce friction and improve response quality.",
            },
            {
              title: "Grow",
              text: "Performance marketing strategy, reporting and conversion optimization aimed at commercial outcomes.",
            },
          ].map((pill) => (
            <div
              key={pill.title}
              className="rounded-card border bg-background-card p-6"
            >
              <p className="meta-label text-accent">{pill.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">
                {pill.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Start with the right layer",
          title: "Choose the service that matches your business problem.",
          description:
            "You do not need the whole system at once. Most businesses start with one layer and build from there.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-col gap-4 rounded-card border bg-background-secondary/60 p-6 sm:p-7">
          <p className="text-lg font-semibold text-content">
            Need a partner across the full stack?
          </p>
          <p className="text-sm leading-relaxed text-content-secondary">
            We usually begin with a business conversation, map the current funnel and operational constraints, and then build the right mix of website, automation, and acquisition work.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/contact">Discuss your growth</Button>
            <Button href="/pricing" variant="secondary">
              View pricing <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
