import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "AI Systems | Dev2Scale",
  description:
    "AI systems for lead qualification, follow-up, voice reception, and internal operations — built to work inside the business.",
};

const useCases = [
  "AI lead qualification",
  "AI voice receptionist",
  "Appointment booking and reminders",
  "No-show recovery and follow-up",
  "WhatsApp automation",
  "CRM workflow automation",
  "Reactive customer communication",
  "Internal business workflow support",
];

export default function AISystemsPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "AI systems",
          title: "AI that works inside your business, not as a disconnected demo.",
          description:
            "The goal is not flashy automation. It is dependable system behavior that saves time, improves response quality, and keeps sales and service running smoothly.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <div key={item} className="rounded-card border bg-background-secondary/60 p-5 text-sm font-medium text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "How it fits in the operation",
          title: "AI touches the parts of the funnel where speed and consistency matter most.",
          description:
            "When lead response, qualification, and follow-up are handled at the right time, your team can spend more energy on the conversations that matter.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Inbound leads",
              text: "Qualify interest quickly, answer common objections, and route high-intent enquiries to the right next step.",
            },
            {
              title: "Booking flow",
              text: "Offer time slots, confirm calls, and automate reminders before a lead goes cold.",
            },
            {
              title: "Operational support",
              text: "Reduce internal admin by handling repetitive tasks, tracking updates, and keeping systems moving.",
            },
          ].map((step) => (
            <div key={step.title} className="rounded-card border bg-background-card p-6">
              <p className="meta-label text-accent">{step.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-content-secondary">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        heading={{
          eyebrow: "Scope",
          title: "AI systems are custom-scoped to your business requirements.",
          description:
            "The right shape depends on your goals, tools, operations and customer journey. We scope the system around the actual need, not a template package.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-col gap-4 rounded-card border bg-background-secondary/70 p-6 sm:p-7">
          <p className="text-lg font-semibold text-content">
            Typical scope includes workflow design, tool integrations, business logic, routing, messaging and launch support.
          </p>
          <p className="text-sm leading-relaxed text-content-secondary">
            We build solutions around the conversations, data and follow-up workflows your business already depends on.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/contact">Discuss your AI system</Button>
            <Button href="/services" variant="secondary">
              Explore all services <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
