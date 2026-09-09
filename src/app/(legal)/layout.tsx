import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/**
 * Legal chrome — nav and footer, and pointedly no sticky CTA.
 *
 * Someone reading a privacy policy is not in a buying moment, and a pinned
 * "Let's Build & Scale" bar over the data-retention section reads badly. The
 * route group exists so that exclusion is structural rather than a thing
 * somebody has to remember (docs/04 §4).
 */
export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
