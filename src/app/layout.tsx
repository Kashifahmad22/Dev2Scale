import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Body sans, serif display, and monospace — exposed as CSS variables for Tailwind.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Plus Jakarta Sans: a confident geometric sans for bold, trustworthy headlines.
// Variable font — omit `weight` to load the full range (CSS uses up to 800).
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Dev2Scale | AI-Powered Lead Conversion Systems",
  description:
    "Turn more leads into booked calls through AI-powered WhatsApp automation. Instant lead response, AI qualification, and automated booking — deployed in 5–7 days.",
  keywords: [
    "WhatsApp automation",
    "lead qualification",
    "appointment booking automation",
    "AI lead follow-up",
    "business automation",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    title: "Dev2Scale | Turn More Leads Into Booked Calls",
    description:
      "AI-powered WhatsApp systems that respond in under 90 seconds, qualify leads automatically, and book discovery calls — deployed in 5–7 days.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    // Add public/og-image.png (1200×630) to enable rich link previews.
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev2Scale | Turn More Leads Into Booked Calls",
    description:
      "AI-powered WhatsApp systems that respond in under 90 seconds, qualify leads, and book calls automatically.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Organization structured data (JSON-LD) for richer search results.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  email: siteConfig.contact.email,
  areaServed: siteConfig.company.serviceArea,
  foundingDate: siteConfig.company.foundedYear,
  sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram, siteConfig.social.twitter].filter(
    Boolean,
  ),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-background font-sans text-content antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
