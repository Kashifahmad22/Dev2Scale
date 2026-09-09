import type { LeadFieldErrors } from "@/lib/validation/lead";

/**
 * Split out from `submitLead.ts` because a `"use server"` file may only
 * export async functions (a plain `const` export there fails the Next.js
 * build) — `initialSubmitLeadState` is a real runtime value, not an action.
 */
export interface SubmitLeadState {
  status: "idle" | "error" | "rate_limited";
  message?: string;
  fieldErrors?: LeadFieldErrors;
  values?: Record<string, string>;
}

export const initialSubmitLeadState: SubmitLeadState = { status: "idle" };
