import { Calendar, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { TrackLeadSuccess } from "./TrackLeadSuccess";

export const metadata = createMetadata("/contact/thank-you");

/**
 * /contact/thank-you — a real, separate route rather than a client-side
 * "submitted" state on `/contact` (F26, docs/10 §2). That's deliberate: a URL
 * that only loads after a successful server-side submission is what makes a
 * GA4 destination conversion and a Meta `Lead` event verifiable, and it's
 * `noindex` (registered `indexable: false` in `src/config/routes.ts`) so a
 * conversion doesn't leak into search or pollute goal tracking with organic
 * landings.
 */
export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const interest = Array.isArray(searchParams.interest)
    ? searchParams.interest[0]
    : searchParams.interest;

  return (
    <section className="bg-paper py-section-y">
      <Container width="narrow">
        <TrackLeadSuccess interest={interest} />
        <p className="meta-label text-signal">Enquiry received</p>
        <h1 className="mt-5 text-display-1 text-ink">
          Got it. We&rsquo;ll reply within one business day.
        </h1>
        <p className="mt-6 text-body-lg text-ink-secondary">
          Someone from the team reads every enquiry personally — you&rsquo;ll
          hear from a person, not an autoresponder loop. If it&rsquo;s urgent,
          use WhatsApp or grab a slot on the calendar below and skip the wait.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            href={siteConfig.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            analytics={{ location: "thank-you", label: "Book a call" }}
          >
            <Calendar aria-hidden="true" className="h-4 w-4" /> Book a call
          </Button>
          <Button
            href={siteConfig.contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            analytics={{ location: "thank-you", label: "WhatsApp us" }}
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp us
          </Button>
        </div>

        <p className="mt-10 text-body-sm text-ink-muted">
          Want to keep exploring in the meantime?{" "}
          <a href="/work" className="underline underline-offset-4">
            See our work
          </a>{" "}
          or{" "}
          <a href="/pricing" className="underline underline-offset-4">
            check pricing
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
