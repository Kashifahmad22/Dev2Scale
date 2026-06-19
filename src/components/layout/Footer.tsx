import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail, Calendar, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, footerContent } from "@/config/site";

/**
 * Site footer — a dark anchor band beneath the light page. Four columns
 * (Brand, Services, Company, Contact) plus a bottom bar with copyright and
 * legal links. Every link and value is sourced from siteConfig / footerContent;
 * empty contact/social values are omitted.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { social, contact, legal, name } = siteConfig;

  const socials = [
    { href: social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: social.instagram, icon: Instagram, label: "Instagram" },
    { href: social.twitter, icon: Twitter, label: "Twitter / X" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-background-dark text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo tone="inverse" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {footerContent.positioning}
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/35 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <FooterColumn
            heading={footerContent.columns.services.heading}
            links={footerContent.columns.services.links}
          />

          {/* Company */}
          <FooterColumn
            heading={footerContent.columns.company.heading}
            links={footerContent.columns.company.links}
          />

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                  >
                    <Mail size={15} /> {contact.email}
                  </a>
                </li>
              )}
              {contact.calendly && (
                <li>
                  <a
                    href={contact.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                  >
                    <Calendar size={15} /> Book a Call
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row">
          <p>
            © {year} {name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={legal.privacyPolicy}
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href={legal.terms}
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  heading: string;
  links: { label: string; href: string }[];
}

/** Renders a labelled column of links; external links open in a new tab. */
function FooterColumn({ heading, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-white/45">
        {heading}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
