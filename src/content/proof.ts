/**
 * ProofBand copy — the dense credibility strip immediately after the hero
 * (homepage redesign brief §7: proof belongs right after the claim). The
 * capability numbers and their honesty note already live in `content/home.ts`
 * (`capabilityClaims` / `trustStrip`); this file holds only what's new to the
 * band — the integrations lead-in and the pointer to the one real, verified
 * result. The result's actual number is read from `content/agency.ts`
 * `workItems` at render time, not restated here, so there is exactly one
 * place that number can go stale.
 */
export const proofStrip = {
  integrationsLead: "Built on the infrastructure you already run on.",
  resultChip: {
    eyebrow: "One verified result, so far",
    cta: "See the campaign",
    href: "/work",
  },
} as const;
