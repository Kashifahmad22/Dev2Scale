import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/services/websites");

export default function WebsitesPage() {
  return (
    <ServicePageTemplate
      path="/services/websites"
      phase="build"
      headline="A website that does the selling, not just the looking."
      intro="Most business websites are brochures with a contact form. We build the version that has a job: guide the visitor to one clear next step, capture the enquiry, and tell you where people drop off."
      deliverables={[
        {
          title: "Structure built around the decision",
          body: "Pages ordered the way your customer actually decides — what you do, proof it works, what it costs, how to start. Not an About page in position two.",
        },
        {
          title: "Multiple enquiry paths",
          body: "Form, WhatsApp, click-to-call, and a booking link. People contact you the way they prefer, not the way your form insists on.",
        },
        {
          title: "Responsive from 320px up",
          body: "Designed at mobile width first, because that is where most of your traffic reads it. Not a desktop layout squeezed narrow.",
        },
        {
          title: "Tracking that works from day one",
          body: "Analytics, Meta Pixel and conversion events wired at launch, so the first month of traffic is measurable instead of lost.",
        },
        {
          title: "Speed and SEO structure",
          body: "Compressed assets, SSL, clean heading hierarchy, real metadata and a sitemap. The basics, done rather than promised.",
        },
        {
          title: "30 days of post-launch support",
          body: "Bug fixes, technical issues, minor corrections and deployment help after you go live — the period when problems actually surface.",
        },
      ]}
      audience={[
        "You have no website, or one you're embarrassed to send to a prospect.",
        "You get enquiries by phone and WhatsApp but nothing captures them.",
        "You're about to spend on ads and have nowhere credible to send the traffic.",
        "Your current site can't be edited without calling whoever built it.",
      ]}
      priceNote="Website projects run ₹15,000–₹50,000 as a one-time cost, depending on scope."
    />
  );
}
