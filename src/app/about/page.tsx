import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "About | Dev2Scale",
  description:
    "About Dev2Scale: a premium digital growth partner building systems that connect websites, automation and performance marketing.",
};

const principles = [
  "Connected thinking over disconnected vendors",
  "Commercial clarity over vanity metrics",
  "Systems that fit the business, not the other way around",
  "Proof, not empty claims",
];

export default function AboutPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "About Dev2Scale",
          title: "We build the systems that help businesses grow.",
          description:
            "Dev2Scale sits at the intersection of website infrastructure, AI and automation, and performance marketing. We create connected growth systems rather than isolated deliverables.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-card border bg-background-secondary/60 p-6 sm:p-7">
            <p className="text-lg font-semibold text-content">
              Businesses do not need another generic vendor. They need a partner who understands how digital presence, operations and acquisition all work together.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-content-secondary">
              Dev2Scale focuses on the parts of the business that determine whether a website becomes a sales asset, whether a lead gets followed up with speed, and whether marketing turns into measurable commercial growth.
            </p>
          </div>
          <div className="rounded-card border bg-background-card p-6 sm:p-7">
            <p className="meta-label text-accent">Our approach</p>
            <div className="mt-5 space-y-3 text-sm text-content-secondary">
              <p>Understand</p>
              <p>Build</p>
              <p>Automate</p>
              <p>Launch</p>
              <p>Measure</p>
              <p>Scale</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Principles",
          title: "What drives the work.",
          description:
            "The work should always support the business objective — clarity, speed, conversion, and sustainable growth.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map((item) => (
            <div key={item} className="rounded-card border bg-background-card p-5 text-sm text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Ready to work together?",
          title: "A business problem is a good place to start.",
          description:
            "Whether you need a sharper website, a better funnel, or an operational system built around your customer journey, the conversation starts there.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Let’s talk</Button>
          <Button href="/work" variant="secondary">
            See our work <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
