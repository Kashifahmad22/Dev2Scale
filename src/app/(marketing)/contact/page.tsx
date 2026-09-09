import { Calendar, Clock, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { submitLeadFormAction } from "@/actions/submitLead";
import { INTERESTS, type Interest } from "@/lib/validation/lead";
import { siteConfig } from "@/config/site";
import { env } from "@/env";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata("/contact");

const TRACK_IDS = ["launch", "demand", "scale"] as const;
type TrackId = (typeof TRACK_IDS)[number];

function parseTrack(value: string | string[] | undefined): TrackId | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return (TRACK_IDS as readonly string[]).includes(v ?? "")
    ? (v as TrackId)
    : undefined;
}

function parseInterest(
  value: string | string[] | undefined,
): Interest | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return (INTERESTS as readonly string[]).includes(v ?? "")
    ? (v as Interest)
    : undefined;
}

/**
 * /contact — the conversion destination every CTA on the site points at
 * (F26; `primaryCta.href` in `src/config/nav.ts`). Everything above this page
 * educates, demonstrates and qualifies; this is the one place that converts
 * (docs/10 §1 "conversion ladder").
 *
 * `?track=` arrives from the homepage entry-point selector so an enquiry
 * that started with "I'm starting from scratch" reaches here pre-segmented;
 * `?interest=` allows a service page to pre-select the right option. Both are
 * optional — the page is a complete, correct destination with neither.
 */
export default function ContactPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialTrack = parseTrack(searchParams.track);
  const initialInterest = parseInterest(searchParams.interest);

  return (
    <>
      <section className="border-b border-line bg-paper">
        <Container className="py-section-y">
          <Eyebrow withRule>Contact</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display-1 text-ink">
            Tell us where you are. We&rsquo;ll tell you what we&rsquo;d build.
          </h1>
          <p className="mt-7 max-w-container-narrow text-body-lg text-ink-secondary">
            One form, three ways to reach us. We reply to every enquiry within
            one business day — most within a few hours.
          </p>
        </Container>
      </section>

      <section className="bg-paper-alt py-section-y">
        <Container width="narrow">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
            <ContactForm
              initialTrack={initialTrack}
              initialInterest={initialInterest}
              turnstileSiteKey={env.client.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              formAction={submitLeadFormAction}
            />

            <aside className="space-y-8">
              <div>
                <p className="meta-label text-ink-muted">Response time</p>
                <p className="mt-2 flex items-center gap-2 text-body-sm text-ink-secondary">
                  <Clock aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Within one business day, usually faster.
                </p>
              </div>

              <div>
                <p className="meta-label text-ink-muted">
                  Or reach us directly
                </p>
                <ul className="mt-3 space-y-3 text-body-sm">
                  <li>
                    <a
                      href={siteConfig.contact.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink-secondary underline decoration-line-strong underline-offset-4 hover:text-ink"
                    >
                      <Calendar
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                      Book a 20-minute call
                    </a>
                  </li>
                  <li>
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink-secondary underline decoration-line-strong underline-offset-4 hover:text-ink"
                    >
                      <MessageCircle
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0"
                      />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="inline-flex items-center gap-2 text-ink-secondary underline decoration-line-strong underline-offset-4 hover:text-ink"
                    >
                      <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {siteConfig.contact.email}
                    </a>
                  </li>
                </ul>
              </div>

              <p className="text-caption text-ink-muted">
                Published pricing, no discovery-call gate. See{" "}
                <a href="/pricing" className="underline underline-offset-4">
                  pricing
                </a>{" "}
                before you talk to us if you&rsquo;d rather.
              </p>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
