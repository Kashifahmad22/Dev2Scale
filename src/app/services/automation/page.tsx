import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Business Automation | Dev2Scale",
  description:
    "Workflow automation for CRM, WhatsApp, email, notifications, lead routing and internal processes — built to remove operational friction.",
};

const workflowAreas = [
  "Workflow automation",
  "CRM integration",
  "WhatsApp and email flows",
  "Lead routing and notifications",
  "Internal process handoffs",
  "Data movement across tools",
  "Status tracking and updates",
  "Customer follow-up systems",
];

export default function AutomationPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Business automation",
          title: "Automation that removes repetitive work without making the business feel robotic.",
          description:
            "The point of automation is to keep work moving, reduce dropped balls, and give your team the right context at the right time.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {workflowAreas.map((item) => (
            <div key={item} className="rounded-card border bg-background-secondary/70 p-5 text-sm font-medium text-content-secondary">
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="secondary"
        heading={{
          eyebrow: "Where automation helps most",
          title: "Less admin. More clarity. Better customer handling.",
          description:
            "From lead routing to internal handoff, automation keeps the operation coherent and reduces the cost of inefficient processes.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              title: "Lead flow",
              text: "Capture, qualify, route and notify the right team or owner without manual copying or searching.",
            },
            {
              title: "Customer communication",
              text: "Use WhatsApp, email and notifications to keep prospects informed and your team aligned.",
            },
            {
              title: "Operational visibility",
              text: "Keep data synchronized and reduce missed follow-up, repeated tasks and disconnected system states.",
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
          eyebrow: "Build with business logic",
          title: "Strong automation begins with the actual workflow, not the tool first.",
          description:
            "We map the real process, define the key approvals and triggers, and then automate what should happen consistently in the background.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Discuss workflow automation</Button>
          <Button href="/services" variant="secondary">
            Explore service stack <ArrowRight size={16} />
          </Button>
        </div>
      </Section>
    </main>
  );
}
