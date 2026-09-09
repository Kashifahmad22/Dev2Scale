import type { PhaseId } from "@/content/growth-model";

/**
 * PHASE ACCENT RESOLVER.
 *
 * Content carries `phase.id`; only this file knows what colour that is. So a
 * component takes a `phase` prop and asks here — it never writes `text-ember`
 * itself. Recolouring a phase is then one edit, and there is no component that
 * silently disagrees with the others about which colour Automate is.
 *
 * The legality rules on a light canvas (ADR 0002 / docs/05 §2.3): `--ember`
 * (3.0:1), `--azure` (2.4:1) and `--gold` (1.6:1) are FILLS and fail as text,
 * so each phase carries a separate text-safe token. `--signal` (6.3:1) is the
 * one accent that is legal as both.
 */
export interface PhaseAccent {
  /** Text-safe colour. Always AA on paper and on the alternating band. */
  text: string;
  /** Solid fill — bars, dots, the card's top edge. Never carries text. */
  fill: string;
  /** Border in the phase colour, for a selected or active state. */
  border: string;
  /** Faint wash for a chip background. Pairs with `text`. */
  tint: string;
  /** Ink colour to use ON the solid fill. */
  onFill: string;
}

const ACCENTS: Record<PhaseId, PhaseAccent> = {
  // Phase 01 Build — the logo's left `<` chevron.
  build: {
    text: "text-ember-ink",
    fill: "bg-ember",
    border: "border-ember",
    tint: "bg-action-tint",
    onFill: "text-ink",
  },
  // Phase 02 Automate — the rising centre bars.
  automate: {
    text: "text-gold-ink",
    fill: "bg-gold",
    border: "border-gold",
    tint: "bg-warning-bg",
    onFill: "text-ink",
  },
  // Phase 03 Grow — the right `>` chevron and the `2scale` wordmark.
  grow: {
    text: "text-signal",
    fill: "bg-signal",
    border: "border-signal",
    tint: "bg-paper-sunk",
    onFill: "text-ink-inverse",
  },
};

export function phaseAccent(phase: PhaseId): PhaseAccent {
  return ACCENTS[phase];
}
