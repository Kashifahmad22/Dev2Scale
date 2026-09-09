"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/track";

/**
 * Fires the conversion event once the thank-you page actually renders —
 * this route existing as a real, separately-loadable URL (rather than a
 * client-side "submitted" state on `/contact`) is what makes it usable as a
 * GA4 destination conversion / Meta `Lead` event target (docs/10 §2 "Success
 * and failure states").
 */
export function TrackLeadSuccess({ interest }: { interest?: string }) {
  useEffect(() => {
    track({ name: "lead_submit", track: interest, status: "success" });
  }, [interest]);

  return null;
}
