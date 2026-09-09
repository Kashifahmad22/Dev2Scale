"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import {
  entryTracks,
  getTrackPhases,
  type TrackId,
} from "@/content/growth-model";
import { track } from "@/lib/analytics/track";
import { phaseAccent } from "@/lib/pillars";
import { cn } from "@/lib/utils";

/**
 * EntryPointSelector — "Start where you are." The site's signature interaction.
 *
 * The visitor picks their own situation, which does three jobs at once: it
 * pre-qualifies the lead, it routes them to the proof that resembles them, and
 * it carries a `track` value into the lead form so every enquiry arrives
 * pre-segmented (docs/PROJECT-TRACKER §0). It is our answer to the benchmark's
 * "Show me clients who…" control (docs/01 P5).
 *
 * ACCESSIBILITY — this is a tab set, so it implements the tab pattern properly
 * rather than approximating it with three divs and an onClick:
 *
 *  • `role="tablist"` / `tab` / `tabpanel`, wired with `aria-selected` and
 *    `aria-controls`.
 *  • Roving tabindex: only the selected tab is in the tab order, so Tab moves
 *    *past* the group rather than through three items, and arrow keys move
 *    within it — which is what a screen-reader user expects from a tablist.
 *  • Arrow keys wrap, and Home/End jump to the ends.
 *
 * The panel content cross-fades and never slides: a horizontal slide on tab
 * change fights the reading direction and makes the height change obvious
 * (docs/06 §4).
 */
export function EntryPointSelector() {
  const [selected, setSelected] = useState<TrackId>(entryTracks[0].id);
  const baseId = useId();

  const activeTrack =
    entryTracks.find((entry) => entry.id === selected) ?? entryTracks[0];
  const activePhases = getTrackPhases(activeTrack);

  const selectTrack = (id: TrackId): void => {
    setSelected(id);
    track({ name: "entry_track_select", track: id });
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number): void => {
    const last = entryTracks.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    if (next === null) return;
    event.preventDefault();
    const target = entryTracks[next];
    selectTrack(target.id);
    // Move focus with selection, which is the expected behaviour for an
    // automatic-activation tablist.
    document.getElementById(`${baseId}-tab-${target.id}`)?.focus();
  };

  return (
    <Section
      id="start-where-you-are"
      tone="paper"
      heading={{
        eyebrow: "Start where you are",
        title: "Where are you today?",
        description:
          "You don't have to buy the whole system. Pick the line that sounds like your business and we'll show you the part that actually applies.",
      }}
    >
      <div
        role="tablist"
        aria-label="Your current situation"
        className="grid gap-3 md:grid-cols-3"
      >
        {entryTracks.map((entry, index) => {
          const isSelected = entry.id === selected;
          return (
            <button
              key={entry.id}
              id={`${baseId}-tab-${entry.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              // Roving tabindex — see the component note above.
              tabIndex={isSelected ? 0 : -1}
              onClick={() => selectTrack(entry.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "rounded-card border p-5 text-left transition-colors duration-fast ease-clean",
                isSelected
                  ? "border-ink bg-ink text-ink-inverse"
                  : "border-line bg-paper text-ink hover:border-line-strong hover:bg-paper-alt",
              )}
            >
              <span
                className={cn(
                  "meta-label block",
                  isSelected ? "text-paper-alt/60" : "text-ink-muted",
                )}
              >
                {entry.name}
              </span>
              <span className="mt-2 block text-title font-semibold">
                “{entry.situation}”
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeTrack.id}`}
        tabIndex={0}
        className="mt-8 rounded-card border border-line bg-paper-alt p-6 md:p-9"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="meta-label text-ink-muted">Who this is</p>
            <p className="mt-2.5 text-body text-ink-secondary">
              {activeTrack.audience}
            </p>

            <p className="meta-label mt-7 text-ink-muted">What we do</p>
            <p className="mt-2.5 text-body-lg text-ink">
              {activeTrack.provides}
            </p>

            <div className="mt-8">
              <Button
                href={activeTrack.href}
                analytics={{
                  location: "entry-selector",
                  label: activeTrack.cta,
                }}
              >
                {activeTrack.cta}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <p className="meta-label text-ink-muted">The phases this engages</p>
            {/* Ordered list, because for this track the order is the
                recommendation — it is the sequence of work, not a menu. */}
            <ol className="mt-4 space-y-3">
              {activePhases.map((phase, index) => {
                const accent = phaseAccent(phase.id);
                return (
                  <li
                    key={phase.id}
                    className="flex items-start gap-3 rounded border border-line bg-paper p-3.5"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm",
                        accent.fill,
                        accent.onFill,
                      )}
                    >
                      <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className={cn("meta-label block", accent.text)}>
                        Step {index + 1} · {phase.name}
                      </span>
                      <Link
                        href={phase.href}
                        className="mt-0.5 block text-body-sm font-semibold text-ink underline-offset-4 hover:underline"
                      >
                        {phase.role}
                      </Link>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
