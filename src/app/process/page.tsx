import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Process | Dev2Scale",
  description:
    "The Dev2Scale process: understand, build, launch, measure and scale digital growth systems with a clear commercial objective.",
};

const steps = [
  {
    title: "Understand",
    text: "We begin with the business, audience, offer, friction points and growth goals. The right solution starts with context, not assumptions.",
  },
  {
    title: "Build",
    text: "We create the digital foundation, system logic, workflow, or acquisition setup required to support the growth effort.",
  },
  {
    title: "Launch",
    text: "We deploy, integrate and hand over a working foundation connected to the business operations and customer journey.",
  },
  {
    title: "Measure",
    text: "We monitor the signals that matter — form quality, response speed, leads, conversion, and commercial performance.",
  },
  {
    title: "Optimize",
    text: "We improve based on actual data, not guesswork, tightening the funnel and reducing friction over time.",
  },
  {
    title: "Scale",
    text: "Once the system is working, we double down on the channels, offers and processes that create repeatable growth.",
  },
];

export default function ProcessPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Process",
          title: "A clear operating system for growth.",
          description:
            "The process is intentionally simple: understand the business, build the systems, measure the commercial signals, then improve what is actually working.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-card border bg-background-secondary/60 p-6">
              <p className="meta-label text-accent">0{index + 1}</p>
              <p className="mt-4 text-xl font-semibold text-content">{step.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-content-secondary">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Working approach",
          title: "The goal is not more tools. It is a better operating model.",
          description:
            "We look at the business model, customer journey and growth constraints together so the system is aligned with the commercial reality.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Start with a conversation</Button>
          <Button href="/services" variant="secondary">
            Explore services <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
