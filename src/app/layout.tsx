import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { SkipLink } from "@/components/layout/SkipLink";
import { siteConfig } from "@/config/site";
import { getRoute } from "@/config/routes";
import "./globals.css";

/**
 * Root layout — fonts, tokens, structured data, and the skip link.
 *
 * Deliberately does NOT render the Navbar or Footer. Those belong to the
 * `(marketing)` route group, so a legal page cannot inherit a conversion CTA
 * bar and the marketing chrome is defined exactly once (docs/04 §4).
 */

// Body sans. Self-hosted at build by next/font — no external font requests,
// which also means no render-blocking third-party origin on the critical path.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display face. Variable, so the 800 weight the theme needs costs no extra
// request (ADR 0002 — headlines are 800 on a light canvas).
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Mono, for eyebrows and data labels only. NOT preloaded: it must never
// compete with the LCP text for bandwidth (docs/04 §9).
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const home = getRoute("/");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  // Per-page titles come from `createMetadata`; this template appends the
  // brand so no page has to remember to.
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: home.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: { telephone: false },
};

/**
 * Organization + WebSite JSON-LD, built from `siteConfig` so the structured
 * data cannot drift from the visible content.
 */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      areaServed: siteConfig.company.serviceArea,
      foundingDate: siteConfig.company.foundedYear,
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.instagram,
        siteConfig.social.twitter,
      ].filter(Boolean),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper font-sans text-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
