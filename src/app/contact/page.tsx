import type { Metadata } from "next";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact | Dev2Scale",
  description:
    "Start a conversation about your website, ecommerce, AI systems, automation or performance marketing needs.",
};

export default function ContactPage() {
  return (
    <main className="pt-28">
      <Section
        heading={{
          eyebrow: "Contact",
          title: "Have a growth problem? Let’s solve it.",
          description:
            "Share your business, the challenge, and what you want to improve. We will start with the problem, not a generic pitch.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <CtaPanel
            heading="Build. Automate. Grow."
            description="If a quick conversation is the easiest place to start, we can talk through the current challenge, the opportunity, and the best next step."
            primary={{ label: "Book a call", href: siteConfig.contact.calendly }}
            secondary={{ label: "WhatsApp us", href: siteConfig.contact.whatsapp }}
            supportingText="No obligation. We want to understand the real business problem first."
          />
          <ConsultationForm />
        </div>
      </Section>
    </main>
  );
}
