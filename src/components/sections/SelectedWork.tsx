import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { StaggerGroup, StaggerGroupItem } from "@/components/ui/StaggerGroup";
import { workItems, type CaseStudy } from "@/content/agency";
import { cn } from "@/lib/utils";

function PendingCard({ item }: { item: CaseStudy }) {
  return (
    <Card tone="sunk" className="flex h-full flex-col p-6">
      <FileText
        aria-hidden="true"
        className="h-5 w-5 text-ink-muted"
        strokeWidth={1.5}
      />
      <h3 className="mt-4 text-title font-semibold text-ink-secondary">
        {item.placeholderTitle ?? "Being documented"}
      </h3>
      <p className="mt-2 text-body-sm text-ink-muted">
        {item.placeholderDescription ??
          "This project is being written up with its real numbers and the source behind each one."}
      </p>
      <Badge tone="directional" className="mt-5 self-start">
        In progress
      </Badge>
    </Card>
  );
}

/**
 * SelectedWork — the heaviest trust section on the page.
 *
 * It renders `workItems` exactly as the data describes them, which is the
 * whole design. Right now that means **one** published case study — Patna
 * Fashion, corroborated by the actual Meta Ads Manager screenshot embedded in
 * its `media` — and three honest "being documented" states, because one
 * verified result is what actually exists.
 *
 * The empty state is a real designed state, not a gap: it is going to ship,
 * and a visitor reading "this is being documented" trusts the site more than
 * one reading a plausible invented number. When real work lands, flipping
 * `status` to `published` is the only change needed here.
 *
 * Published cards render through the shared `CaseStudyCard` (not a second,
 * inline card implementation) — the one place a case study's media, metrics
 * and copy are laid out.
 *
 * Mobile gets the horizontal snap rail docs/07 §2 specifies (`.snap-rail`,
 * already defined in globals.css but never wired to a component until now);
 * desktop keeps the two-column grid, since a vertical stack of four tall
 * cards is four screens of scrolling before the next section.
 */
export function SelectedWork() {
  return (
    <Section
      id="work"
      tone="paper"
      width="wide"
      heading={{
        eyebrow: "Selected work",
        title: "Results with a source attached.",
        description:
          "One verified campaign so far, shown with the numbers behind it. The rest of these slots stay honest until there's something real to put in them.",
      }}
      headerAside={
        <Button
          href="/work"
          variant="secondary"
          analytics={{ location: "home-work" }}
        >
          View all work
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      <StaggerGroup
        as="ul"
        childCount={workItems.length}
        className="snap-rail no-scrollbar -mx-gutter flex gap-gap-grid overflow-x-auto px-gutter md:mx-0 md:grid md:gap-gap-grid md:overflow-visible md:px-0 md:grid-cols-2"
      >
        {workItems.map((item) => (
          <StaggerGroupItem
            as="li"
            key={item.id}
            className={cn(
              "h-full w-[88vw] shrink-0 md:w-auto",
              item.featured && "md:col-span-2",
            )}
          >
            {item.status === "published" ? (
              // No `href` yet — there's no case-study detail route until F24
              // ships. CaseStudyCard omits the "See case study" link when
              // href is absent, which is the correct state today.
              <CaseStudyCard study={item} />
            ) : (
              <PendingCard item={item} />
            )}
          </StaggerGroupItem>
        ))}
      </StaggerGroup>

      <p className="mt-8 text-caption text-ink-muted">
        Ask us for the account screenshot behind any number on this page and
        we&rsquo;ll send it.{" "}
        <Link
          href="/contact"
          className="font-semibold text-signal underline-offset-4 hover:underline"
        >
          Get in touch
        </Link>
        .
      </p>
    </Section>
  );
}
