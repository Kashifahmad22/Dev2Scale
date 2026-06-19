import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalShellProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

/**
 * Shared layout for legal pages (Privacy, Terms). Provides the page heading,
 * a back link, and consistent prose styling tuned to the dark theme. Sits
 * below the global Navbar with top padding to clear it.
 */
export function LegalShell({ title, updated, children }: LegalShellProps) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-content-secondary transition-colors hover:text-content"
      >
        <ArrowLeft size={15} /> Back to home
      </Link>

      <h1 className="mt-8 text-4xl font-bold tracking-tight text-content">
        {title}
      </h1>
      <p className="mt-3 text-sm text-content-muted">Last updated: {updated}</p>

      <div className="legal-prose mt-10 space-y-8">{children}</div>
    </main>
  );
}

interface LegalSectionProps {
  heading: string;
  children: React.ReactNode;
}

/** A titled section block within a legal page. */
export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-content">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-content-secondary">
        {children}
      </div>
    </section>
  );
}
