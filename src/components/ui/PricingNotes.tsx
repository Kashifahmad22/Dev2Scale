"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { paymentTerms } from "@/content/agency";
import { cn } from "@/lib/utils";

interface PricingNotesProps {
  className?: string;
}

/** Compact commercial transparency: payment, support, and exclusions without a wall of copy. */
export function PricingNotes({ className }: PricingNotesProps) {
  const [open, setOpen] = useState(false);
  return (
    <section
      className={cn(
        "rounded-lg border bg-background-secondary/60 p-5 sm:p-6",
        className,
      )}
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Note title="Website payment">
          <ol className="space-y-1.5">
            {paymentTerms.website.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ol>
        </Note>
        <Note title="Performance marketing">
          <p>{paymentTerms.performance}</p>
          <p className="mt-2">{paymentTerms.advertising}</p>
        </Note>
        <Note title="Support">
          <p>{paymentTerms.support.website}</p>
          <p className="mt-2">{paymentTerms.support.performance}</p>
        </Note>
      </div>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-6 flex min-h-11 items-center gap-2 border-t pt-5 text-sm font-semibold text-content"
      >
        Important pricing notes{" "}
        <ChevronDown
          size={16}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <ul className="grid gap-x-8 gap-y-2 pb-1 text-sm leading-relaxed text-content-secondary sm:grid-cols-2">
          {paymentTerms.exclusions.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-content-muted" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function Note({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="meta-label text-accent">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-content-secondary">
        {children}
      </div>
    </div>
  );
}
