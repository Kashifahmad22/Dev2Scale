import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { footerColumns } from "@/config/nav";
import { legalRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

/**
 * Footer — the one dark band on the page (ADR 0002).
 *
 * It closes the document rather than decorating it: full sitemap, the legal
 * routes, and the contact channels. Columns come from `config/nav.ts`, which
 * derives them from the route registry, so a new page appears here without a
 * second list to maintain.
 *
 * Empty `siteConfig` values are filtered rather than rendered — an unset social
 * handle disappears instead of shipping a link to nowhere. `siteConfig.social.twitter`
 * is currently empty, and that is why it is absent rather than broken.
 */
export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(
    ([, href]) => href.length > 0,
  );
  const year = new Date().getFullYear();

  return (
    <footer className="bg-band-dark py-section-y-tight text-ink-inverse">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo tone="inverse" />
            <p className="text-paper-alt/70 mt-4 max-w-xs text-body-sm">
              {siteConfig.description}
            </p>
            <p className="text-paper-alt/50 mt-6 text-caption">
              {siteConfig.company.serviceArea}
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="meta-label text-paper-alt/50 mb-4">
                {column.heading}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const isMail = link.href.startsWith("mailto:");
                  return (
                    <li key={`${column.heading}-${link.href}`}>
                      {isExternal || isMail ? (
                        <a
                          href={link.href}
                          {...(isExternal
                            ? {
                                target: "_blank",
                                rel: "noopener noreferrer",
                              }
                            : {})}
                          className="text-paper-alt/80 rounded text-body-sm transition-colors duration-fast ease-clean hover:text-ink-inverse"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-paper-alt/80 rounded text-body-sm transition-colors duration-fast ease-clean hover:text-ink-inverse"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-paper-alt/10 mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-paper-alt/50 text-caption">
            © {year} {siteConfig.company.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="text-paper-alt/60 rounded text-caption transition-colors duration-fast ease-clean hover:text-ink-inverse"
              >
                {route.label}
              </Link>
            ))}
            {socials.map(([network, href]) => (
              <a
                key={network}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-alt/60 rounded text-caption capitalize transition-colors duration-fast ease-clean hover:text-ink-inverse"
              >
                {network}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
