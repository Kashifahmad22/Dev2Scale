import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/layout/LegalShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Dev2Scale",
  description: "How Dev2Scale collects, uses, and protects your information.",
  robots: { index: true, follow: true },
};

/**
 * Privacy Policy. This is a clear, professional starting template — review it
 * with legal counsel and tailor it to your jurisdiction before launch.
 */
export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 2026">
      <p className="text-sm leading-relaxed text-content-secondary">
        This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects, uses, and safeguards information when you
        visit our website or engage our services. By using our site, you agree
        to the practices described here.
      </p>

      <LegalSection heading="Information We Collect">
        <p>
          We collect information you provide directly — such as your name,
          email address, phone number, and business details — when you book a
          call, complete a form, or contact us. We also collect limited
          technical data (such as device and usage information) automatically
          to operate and improve the site.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>
          We use your information to respond to enquiries, schedule and deliver
          services, send relevant communications, and improve our offering. We
          do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="WhatsApp & Messaging">
        <p>
          Where you interact with our automated WhatsApp systems, message
          content is processed to qualify enquiries and book appointments.
          Messaging runs on the official WhatsApp Business API and is subject to
          WhatsApp&rsquo;s own terms and privacy practices.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Services">
        <p>
          We rely on trusted third-party providers (for example, scheduling,
          messaging, and analytics platforms) to deliver our services. These
          providers process data on our behalf under their respective terms.
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention & Security">
        <p>
          We retain information only as long as necessary for the purposes set
          out in this policy and apply reasonable safeguards to protect it. No
          method of transmission or storage is completely secure.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, or
          delete your personal information. To exercise these rights, contact us
          using the details below.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy? Email us at{" "}
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
