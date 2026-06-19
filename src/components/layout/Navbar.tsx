"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { useScrollDetection } from "@/hooks/useScrollDetection";
import { navLinks, siteConfig } from "@/config/site";
import { EASE_CLEAN } from "@/lib/animations";
import { cn, smoothScrollToId } from "@/lib/utils";

/**
 * Sticky navigation. Transparent over the hero, then switches to a dark-glass
 * bar with a hairline border once the user scrolls. Includes an animated
 * mobile drawer. All links and the CTA come from siteConfig.
 */
export function Navbar() {
  const scrolled = useScrollDetection(24);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Scroll-progress bar across the top of the nav.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const handleNav = (href: string): void => {
    setOpen(false);
    if (href.startsWith("#")) smoothScrollToId(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-clean",
        scrolled
          ? "glass border-b shadow-nav"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Scroll-progress indicator */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent-gradient"
      />

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm text-content-secondary transition-colors duration-150 hover:text-content"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            href={siteConfig.contact.calendly}
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            size="sm"
          >
            Book a Strategy Call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded text-content md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_CLEAN }}
            className="glass overflow-hidden border-b md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="block w-full rounded px-2 py-2.5 text-left text-sm text-content-secondary transition-colors hover:bg-content/[0.04] hover:text-content"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href={siteConfig.contact.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="w-full"
                >
                  Book a Strategy Call
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
