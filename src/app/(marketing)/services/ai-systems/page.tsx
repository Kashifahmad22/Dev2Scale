import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/services/ai-systems");

export default function AiSystemsPage() {
  return (
    <ServicePageTemplate
      path="/services/ai-systems"
      phase="automate"
      headline="AI that answers in seconds, every time, at 2am."
      intro="Most AI projects fail because they're scoped as a demo rather than as a job. We pick one thing that costs you money — unanswered leads, missed calls, follow-up nobody does — and build a system that handles it reliably."
      deliverables={[
        {
          title: "AI voice receptionist",
          body: "Answers the calls you miss, takes the details, books the appointment, and sends you the summary. Missed calls are the most expensive silence in a service business.",
        },
        {
          title: "Lead qualification",
          body: "Every enquiry gets a reply in under 90 seconds, gets asked the questions you'd ask, and arrives at your desk already sorted into worth-calling and not.",
        },
        {
          title: "Follow-up that actually happens",
          body: "The second, third and fourth touch that converts most deals and that nobody has time to send manually.",
        },
        {
          title: "Booking and CRM automation",
          body: "Qualified leads land in your calendar and your CRM with their context attached — no copy-paste between four tabs.",
        },
        {
          title: "Custom workflows",
          body: "The repetitive internal process specific to your business. We map it first, then automate the parts that genuinely cost time.",
        },
        {
          title: "Handover and guardrails",
          body: "You see what the system says before it goes live, you can change it, and it escalates to a human when it should. An agent that improvises with customers is a liability.",
        },
      ]}
      audience={[
        "You lose business because nobody answered fast enough.",
        "Your team spends its day on replies that follow a predictable script.",
        "Enquiries come in overnight or at weekends and sit until Monday.",
        "You've tried a chatbot and it embarrassed you in front of a customer.",
      ]}
      priceNote="AI systems are scoped per engagement, because the work depends entirely on the process being automated."
    />
  );
}
