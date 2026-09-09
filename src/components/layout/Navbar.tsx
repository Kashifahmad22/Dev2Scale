"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { megaMenuColumns, navItems, primaryCta } from "@/config/nav";
import { backdrop, slideOver } from "@/lib/animations";
import { phaseAccent } from "@/lib/pillars";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { cn } from "@/lib/utils";

const MEGA_MENU_ID = "services-menu";
const DRAWER_ID = "mobile-menu";

/**
 * Navbar — sticky header, five destinations plus one CTA (PRD §8).
 *
 * On this light theme the bar is opaque from the first paint; only the bottom
 * hairline and shadow fade in after 24px of scroll. Deliberately **no height
 * change on scroll** — a resizing nav reflows the page under the visitor's
 * cursor and is a direct CLS regression (docs/06 §4).
 *
 * Keyboard contracts, which are the actual substance of this component:
 *
 *  • Mega-menu: opens on click (not hover — a hover-only menu is unreachable by
 *    keyboard and hostile on touch), closes on Escape with focus returned to
 *    the trigger, and closes when focus leaves the wrapper entirely. Hover
 *    opens it too, on fine pointers, as a convenience layered on top.
 *  • Drawer: focus trap, scroll lock, Escape to close, focus restored to the
 *    toggle, and the CTA pinned at the bottom within thumb reach.
 *  • Route change closes both, otherwise the panel survives the navigation and
 *    covers the page the visitor just asked for.
 */
export function Navbar() {
  const scrolled = useScrollDetection(24);
  const pathname = usePathname();

  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const megaWrapRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerToggleRef = useRef<HTMLButtonElement>(null);

  const closeMega = useCallback((returnFocus = false) => {
    setMegaOpen(false);
    if (returnFocus) megaTriggerRef.current?.focus();
  }, []);

  const closeDrawer = useCallback((returnFocus = false) => {
    setDrawerOpen(false);
    if (returnFocus) drawerToggleRef.current?.focus();
  }, []);

  // Close on navigation. Without this the panel stays open over the new page.
  useEffect(() => {
    setMegaOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes whichever layer is open, innermost first.
  useEffect(() => {
    if (!megaOpen && !drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") return;
      if (drawerOpen) closeDrawer(true);
      else if (megaOpen) closeMega(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, drawerOpen, closeMega, closeDrawer]);

  // Scroll lock while the drawer is open. Restores the previous value rather
  // than clearing it, so it composes with anything else that locks scroll.
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [drawerOpen]);

  // Focus trap for the drawer. A drawer that lets focus escape to the page
  // behind it is worse than no drawer — the user tabs into content they cannot
  // see and has no way back.
  useEffect(() => {
    if (!drawerOpen) return;
    const node = drawerRef.current;
    if (!node) return;

    const focusables = (): HTMLElement[] =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  const isActive = (path: string): boolean =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-paper transition-shadow duration-fast ease-clean",
        scrolled
          ? "border-b border-line shadow-nav"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-nav w-full max-w-container items-center justify-between gap-6 px-gutter"
      >
        {/* Logo owns its own link to home, so it must not be nested inside
            another anchor here — nested <a> is invalid HTML and browsers
            recover from it unpredictably. */}
        <Logo className="shrink-0" />

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ route, hasMegaMenu }) =>
            hasMegaMenu ? (
              <div
                key={route.path}
                ref={megaWrapRef}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  ) {
                    setMegaOpen(false);
                  }
                }}
              >
                <button
                  ref={megaTriggerRef}
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls={MEGA_MENU_ID}
                  onClick={() => setMegaOpen((open) => !open)}
                  className={cn(
                    "flex items-center gap-1.5 rounded px-3 py-2 text-body-sm font-semibold transition-colors duration-fast ease-clean",
                    isActive(route.path)
                      ? "text-ink"
                      : "text-ink-secondary hover:text-ink",
                  )}
                >
                  {route.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 transition-transform duration-fast ease-clean",
                      megaOpen && "rotate-180",
                    )}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "rounded px-3 py-2 text-body-sm font-semibold transition-colors duration-fast ease-clean",
                  isActive(route.path)
                    ? "text-ink"
                    : "text-ink-secondary hover:text-ink",
                )}
              >
                {route.label}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            href={primaryCta.href}
            size="sm"
            className="hidden lg:inline-flex"
            analytics={{ location: "nav", label: primaryCta.label }}
          >
            {primaryCta.label}
          </Button>

          <button
            ref={drawerToggleRef}
            type="button"
            aria-expanded={drawerOpen}
            aria-controls={DRAWER_ID}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((open) => !open)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-ink lg:hidden"
          >
            {drawerOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {megaOpen ? (
          <div
            className="absolute left-0 right-0 top-full hidden lg:block"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <MegaMenu id={MEGA_MENU_ID} onNavigate={() => closeMega()} />
          </div>
        ) : null}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen ? (
          <>
            <motion.div
              variants={backdrop}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => closeDrawer()}
              className="bg-ink/40 fixed inset-0 z-40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              id={DRAWER_ID}
              ref={drawerRef}
              variants={slideOver}
              initial="hidden"
              animate="show"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-paper lg:hidden"
            >
              <div className="flex h-nav shrink-0 items-center justify-between px-gutter">
                <span className="meta-label text-ink-muted">Menu</span>
                <button
                  type="button"
                  onClick={() => closeDrawer(true)}
                  aria-label="Close menu"
                  className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded text-ink"
                >
                  <X aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-gutter pb-6">
                {/* Services are expanded inline rather than nested behind an
                    accordion: on mobile an extra tap to reach a service page
                    costs more than the vertical space it saves. */}
                {megaMenuColumns.map(({ phase, services }) => {
                  const accent = phaseAccent(phase.id);
                  return (
                    <div key={phase.id} className="border-b border-line py-5">
                      <div className="mb-3 flex items-baseline gap-2">
                        <span className={cn("meta-label", accent.text)}>
                          {phase.number} {phase.name}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {services.map((service) => (
                          <li key={service.path}>
                            <Link
                              href={service.path}
                              onClick={() => closeDrawer()}
                              className="block py-2 text-title font-semibold text-ink"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}

                <ul className="py-5">
                  {navItems
                    .filter(({ hasMegaMenu }) => !hasMegaMenu)
                    .map(({ route }) => (
                      <li key={route.path}>
                        <Link
                          href={route.path}
                          onClick={() => closeDrawer()}
                          className="block py-2.5 text-title font-semibold text-ink"
                        >
                          {route.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div
                className="shrink-0 border-t border-line px-gutter py-4"
                style={{
                  paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
                }}
              >
                <Button
                  href={primaryCta.href}
                  size="md"
                  className="w-full"
                  analytics={{ location: "drawer", label: primaryCta.label }}
                >
                  {primaryCta.label}
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
