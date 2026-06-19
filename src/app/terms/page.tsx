import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/layout/LegalShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service | Dev2Scale",
  description: "The terms governing your use of Dev2Scale's website and services.",
  robots: { index: true, follow: true },
};

/**
 * Terms of Service. A professional starting template — review it with legal
 * counsel and adapt it to your jurisdiction and engagement model before launch.
 */
export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 2026">
      <p className="text-sm leading-relaxed text-content-secondary">
        These Terms of Service govern your access to and use of the{" "}
        {siteConfig.name} website and services. By using our site or engaging
        our services, you agree to these terms.
      </p>

      <LegalSection heading="Services">
        <p>
          {siteConfig.name} designs and deploys automation systems for lead
          response, qualification, and appointment booking. The specific scope,
          deliverables, and timelines for any engagement are defined in a
          separate agreement or statement of work.
        </p>
      </LegalSection>

      <LegalSection heading="Engagements & Payment">
        <p>
          Pricing is presented in USD. One-time fees and monthly retainers are
          billed as described at the point of sale or in your agreement.
          Third-party platform costs (for example, messaging and AI providers)
          are billed directly to your own accounts.
        </p>
      </LegalSection>

      <LegalSection heading="Cancellation">
        <p>
          Monthly retainers may be cancelled with 30 days&rsquo; written notice.
          You retain ownership of the systems we build for you, as set out in
          your agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Client Responsibilities">
        <p>
          You are responsible for providing accurate onboarding information,
          necessary access and credentials, and for ensuring your use of the
          systems complies with applicable laws and platform policies, including
          messaging and consent requirements.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers">
        <p>
          Any performance figures or example outcomes shown on this site are
          illustrative and not guarantees. Actual results depend on factors
          including lead volume, offer quality, and market conditions. Services
          are provided on an &ldquo;as is&rdquo; basis to the fullest extent
          permitted by law.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, {siteConfig.name} shall not be
          liable for indirect, incidental, or consequential damages arising from
          your use of the site or services.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email us at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-accent underline-offset-4 hover:underline"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
