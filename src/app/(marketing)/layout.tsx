import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/layout/StickyCta";

/**
 * Marketing chrome — nav, main landmark, footer, and the mobile sticky CTA.
 *
 * Scoped to the `(marketing)` route group so the legal pages cannot inherit a
 * conversion CTA bar. The route group is a URL-invisible folder, so
 * `(marketing)/pricing/page.tsx` still serves `/pricing`.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {/* id="main" is the skip link's target. One <main> per document. */}
      <main id="main">{children}</main>
      <Footer />
      <StickyCta />
      {/* Reserves room for the sticky bar so it never covers the footer's last
          row on mobile. A fixed bar without this eats real content. */}
      <div aria-hidden="true" className="h-16 lg:hidden" />
    </>
  );
}
