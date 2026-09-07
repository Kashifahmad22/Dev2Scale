import { AgencyHero } from "@/components/sections/AgencyHero";
import { ConsultationForm } from "@/components/sections/ConsultationForm";
import { SystemDemos } from "@/components/sections/SystemDemos";
import { LoomDemos } from "@/components/sections/LoomDemos";
import { FAQ } from "@/components/sections/FAQ";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { ClientLogoGrid } from "@/components/ui/ClientLogoGrid";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { PillarCard } from "@/components/ui/PillarCard";
import { PricingCard } from "@/components/ui/PricingCard";
import { PricingNotes } from "@/components/ui/PricingNotes";
import { ProcessTimeline } from "@/components/ui/ProcessTimeline";
import { Section } from "@/components/ui/Section";
import {
  aiOffer,
  growthProcess,
  performancePackages,
  servicePillars,
  websitePackages,
  workItems,
} from "@/content/agency";
import { siteConfig } from "@/config/site";

const pillarDetails = [
  [
    "build",
    [
      "Business websites",
      "Landing pages and e-commerce",
      "Tracking foundations",
    ],
  ],
  [
    "automate",
    [
      "AI agents and voice systems",
      "Lead follow-up and booking",
      "CRM and workflow automation",
    ],
  ],
  [
    "grow",
    [
      "Meta and Google Ads",
      "Acquisition and retargeting",
      "Conversion optimisation",
    ],
  ],
] as const;

export default function HomePage() {
  return (
    <main>
      <AgencyHero />
      <section className="border-y bg-background-secondary/70">
        <div className="mx-auto flex max-w-[var(--container-width)] flex-col gap-2 px-5 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left lg:px-10">
          <p className="meta-label text-accent">
            Web · AI · Automation · Performance
          </p>
          <p className="text-sm font-medium text-content">
            One partner across the growth stack.
          </p>
        </div>
      </section>

      <Section
        heading={{
          eyebrow: "The problem",
          title: "Growth breaks when the pieces don’t connect.",
          description:
            "A website can look good and still fail to convert. Ads can bring attention without bringing customers. Manual follow-up and scattered data make both harder to improve.",
          align: "left",
          maxWidthClass: "max-w-2xl",
        }}
        headerAside={
          <div className="rounded-card border bg-accent-soft/45 p-5 text-sm leading-relaxed text-content-secondary">
            <p className="meta-label text-accent">One connected system</p>
            <p className="mt-2 font-medium text-content">
              Website + marketing + automation + data
            </p>
            <p className="mt-2">
              → A clearer path from first visit to business growth.
            </p>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "A website that doesn’t convert",
            "Leads that don’t get followed up",
            "Ads that create clicks, not customers",
            "Data scattered across tools",
          ].map((problem, index) => (
            <div
              key={problem}
              className="rounded-card border bg-background-secondary/45 p-5"
            >
              <span className="meta-label text-content-muted">
                0{index + 1}
              </span>
              <p className="mt-5 text-base font-semibold text-content">
                {problem}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="services"
        tone="secondary"
        heading={{
          eyebrow: "The Dev2Scale system",
          title: "Build the foundation. Automate the work. Grow demand.",
          description:
            "Each layer is valuable on its own. Connected together, they make the business easier to run and easier to scale.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {servicePillars.map((pillar, index) => {
            const [icon, services] = pillarDetails[index];
            return (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                icon={icon}
                services={services}
                featured={pillar.id === "automate"}
              />
            );
          })}
        </div>
        <p className="mt-8 text-center font-mono text-xs text-content-muted">
          Build → the digital foundation &nbsp; / &nbsp; Automate → the
          operating layer &nbsp; / &nbsp; Grow → the acquisition layer &nbsp; /
          &nbsp; Measure → optimise → scale
        </p>
      </Section>

      <Section
        id="website-packages"
        heading={{
          eyebrow: "Website development",
          title: "Websites built for where your business is going.",
          description:
            "Choose the level of website your business actually needs. These are project investments—not subscriptions.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {websitePackages.map((offer) => (
            <PricingCard
              key={offer.id}
              offer={offer}
              href="#contact"
              secondaryAction={{
                label: "Talk through the scope",
                href: "#contact",
              }}
            />
          ))}
        </div>
      </Section>

      <Section
        id="ai-systems"
        tone="secondary"
        heading={{
          eyebrow: "AI systems & automation",
          title: "AI that works inside your business.",
          description:
            "The point is not to add AI for its own sake. It is to make customer and operational work happen consistently, with the right human handoff.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid items-stretch gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <div className="surface-elevated rounded-lg p-6 sm:p-7">
            <p className="meta-label text-accent">Custom AI systems</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-content">
              {aiOffer.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-content-secondary">
              {aiOffer.description}
            </p>
            <p className="mt-6 text-3xl font-extrabold tracking-tight text-content">
              {aiOffer.price}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex text-sm font-semibold text-accent hover:text-accent-hover"
            >
              {aiOffer.cta} →
            </a>
          </div>
          <WorkflowRail />
        </div>
      </Section>
      <SystemDemos />
      <LoomDemos />

      <Section
        id="marketing-packages"
        tone="secondary"
        heading={{
          eyebrow: "Performance marketing",
          title: "Don’t optimise for clicks. Optimise for customers.",
          description:
            "We look at the full path from campaign to customer—then improve the parts that affect business results.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <JourneyRail
          labels={[
            "Ad",
            "Visit",
            "Lead / Call",
            "Qualification",
            "Customer",
            "Revenue",
          ]}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {performancePackages.map((offer) => (
            <PricingCard
              key={offer.id}
              offer={offer}
              href="#contact"
              secondaryAction={{ label: "Discuss growth", href: "#contact" }}
            />
          ))}
        </div>
        <p className="mt-5 text-center text-sm font-medium text-content-secondary">
          Advertising spend is separate from Dev2Scale’s management fee.
        </p>
        <div className="mt-12">
          <JourneyRail
            eyebrow="How optimisation works"
            labels={["Launch", "Learn", "Optimise", "Scale"]}
          />
        </div>
      </Section>

      <Section
        id="work"
        heading={{
          eyebrow: "Selected work",
          title: "Work that proves the system.",
          description:
            "Systems, campaigns, and digital experiences we are building. We publish client evidence with the context behind it—not just a number.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {workItems.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </Section>
      <Section
        tone="secondary"
        heading={{
          eyebrow: "Businesses we work with",
          title: "Built with businesses ready to grow.",
          description:
            "Client logos will appear here as work is approved for public display.",
          maxWidthClass: "max-w-2xl",
        }}
      >
        <ClientLogoGrid clients={[]} placeholderCount={5} />
      </Section>
      <Section
        id="process"
        heading={{
          eyebrow: "How we work",
          title: "How we build for growth.",
          description:
            "A simple operating process that starts with the business problem and stays connected to what happens after launch.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <ProcessTimeline steps={[...growthProcess]} />
        <div className="mt-12">
          <PricingNotes />
        </div>
      </Section>
      <Section
        id="why-dev2scale"
        tone="secondary"
        heading={{
          eyebrow: "Why Dev2Scale",
          title: "One partner across the growth stack.",
          description:
            "Businesses do not always need another disconnected tool. Sometimes they need the pieces they already depend on to work together.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="surface-elevated grid overflow-hidden rounded-lg md:grid-cols-[.8fr_1.2fr]">
          <div className="bg-content p-7 text-white sm:p-9">
            <p className="meta-label text-white/55">
              Connected, not fragmented
            </p>
            <p className="mt-5 text-3xl font-bold leading-tight tracking-tight">
              Website
              <br />↓<br />
              AI / Automation
              <br />↓<br />
              Marketing
              <br />↓<br />
              Conversion
              <br />↓<br />
              Data
              <br />↓<br />
              Growth
            </p>
          </div>
          <div className="p-7 sm:p-9">
            <p className="text-xl font-semibold leading-relaxed text-content">
              Websites build trust. AI and automation remove operational
              friction. Performance marketing brings customers. Data tells us
              what to scale.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-content-secondary">
              That is the system Dev2Scale is built to connect—practically,
              transparently, and around the reality of the business.
            </p>
          </div>
        </div>
      </Section>
      <FAQ />
      <Section
        id="contact"
        heading={{
          eyebrow: "Let’s talk",
          title: "Have a growth problem? Let’s solve it.",
          description:
            "Tell us what you are trying to build, automate, or grow. We will start with the business problem, not a generic pitch.",
          maxWidthClass: "max-w-3xl",
        }}
      >
        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <CtaPanel
            heading="Build. Automate. Grow."
            description="If a call is the easiest place to start, book a consultation. Prefer WhatsApp? That works too."
            primary={{ label: "Let’s Talk", href: siteConfig.contact.calendly }}
            secondary={{
              label: "WhatsApp Us",
              href: siteConfig.contact.whatsapp,
            }}
            supportingText="No obligation. A clear conversation about the problem comes first."
          />
          <ConsultationForm />
        </div>
      </Section>
    </main>
  );
}

function WorkflowRail() {
  return (
    <div className="surface-elevated rounded-lg p-6 sm:p-7">
      <p className="meta-label text-accent">A system inside the operation</p>
      <JourneyRail
        className="mt-6"
        labels={[
          "Customer",
          "AI Agent",
          "Qualification",
          "CRM",
          "Follow-up",
          "Booking / human handoff",
        ]}
      />
    </div>
  );
}

function JourneyRail({
  labels,
  eyebrow,
  className = "",
}: {
  labels: string[];
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="meta-label mb-4 text-accent">{eyebrow}</p>
      ) : null}
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {labels.map((label, index) => (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-0">
            <span className="flex min-h-12 flex-1 items-center justify-center rounded-card border bg-background-card px-3 text-center text-sm font-semibold text-content sm:rounded-none sm:first:rounded-l-card sm:last:rounded-r-card">
              {label}
            </span>
            {index < labels.length - 1 ? (
              <span
                className="mx-auto hidden h-px w-3 shrink-0 bg-accent/35 sm:block"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
