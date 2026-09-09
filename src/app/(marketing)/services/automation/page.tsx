import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { createMetadata } from "@/lib/seo/metadata";

export default function AutomationPage() {
  return (
    <ServicePageTemplate
      path="/services/automation"
      phase="automate"
      headline="Stop doing the same six things every day."
      intro="Automation is not software you buy, it's a process you fix. We map how work actually moves through your business, find the handoffs where things stall or get retyped, and automate those."
      deliverables={[
        {
          title: "Process mapping first",
          body: "We document the real workflow, including the undocumented parts. Automating a broken process just breaks it faster.",
        },
        {
          title: "Booking and calendar flows",
          body: "Enquiry to confirmed appointment without anyone checking availability by hand, plus reminders that cut no-shows.",
        },
        {
          title: "CRM and data hygiene",
          body: "Records created and updated automatically, so your pipeline reflects reality instead of whoever remembered to log it.",
        },
        {
          title: "Notifications that matter",
          body: "The right person told about the right thing, and nothing else. An automation that notifies everyone gets muted within a week.",
        },
        {
          title: "Tool integration",
          body: "The systems you already pay for, connected — instead of a person acting as the integration between them.",
        },
        {
          title: "Documentation you keep",
          body: "A written record of what runs, when, and how to change it. An automation nobody understands is a future outage.",
        },
      ]}
      audience={[
        "Someone on your team retypes the same information into two systems.",
        "Your tools don't talk to each other and a person fills the gap.",
        "Work stalls at a specific handoff and you know exactly which one.",
        "Growth currently means hiring someone to do more manual steps.",
      ]}
      priceNote="Automation work is scoped per engagement, based on the processes involved."
    />
  );
}

export const metadata = createMetadata("/services/automation");
