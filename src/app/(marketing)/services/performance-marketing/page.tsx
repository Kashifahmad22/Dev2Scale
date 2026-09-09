import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/services/performance-marketing");

export default function PerformanceMarketingPage() {
  return (
    <ServicePageTemplate
      path="/services/performance-marketing"
      phase="grow"
      headline="Advertising measured in revenue, not impressions."
      intro="Reach and engagement don't pay salaries. We run Meta and Google campaigns against the numbers that matter — calls, leads, sales, cost per acquisition — and we show you the account so you can check the maths yourself."
      deliverables={[
        {
          title: "Business and customer research first",
          body: "What you sell, who buys it, what they compare you against, and what makes them choose. Campaigns built without this are guesses with a budget.",
        },
        {
          title: "Campaign setup, properly structured",
          body: "Meta or Google, with audiences, budget allocation and objectives set for the outcome you need rather than the default the platform suggests.",
        },
        {
          title: "Full-funnel strategy",
          body: "Cold traffic, warm audiences, and retargeting the people who nearly bought — with the message each stage actually needs.",
        },
        {
          title: "Systematic testing",
          body: "Creative, copy, audience and offer tested one variable at a time, so a result tells you something you can use again.",
        },
        {
          title: "Conversion tracking you can trust",
          body: "Events wired and verified, so reported conversions match real business. Most accounts we inherit are measuring the wrong thing.",
        },
        {
          title: "Monthly reporting in plain language",
          body: "What we spent, what it produced, what we learned, what changes next month. Not a dashboard screenshot with no interpretation.",
        },
      ]}
      audience={[
        "You have a website that converts and want more people reaching it.",
        "You've run ads yourself and can't tell whether they worked.",
        "An agency ran your account and you never got access to it.",
        "You can handle more customers right now if they showed up.",
      ]}
      priceNote="Management fees run ₹12,000–₹30,000 per month depending on scope. Advertising spend is separate and goes directly to Meta or Google — never through us."
    />
  );
}
