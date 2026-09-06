"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { Menu, X, ChevronRight, Mail, Phone, MapPin, ExternalLink, Calendar, UserCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/* ── Social SVG icons ─────────────────────────────────────────── */

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ── Visible Navigation links (Contact removed from top bar) ────── */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Speakers", href: "/speakers" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Organizers", href: "/organizers" },
  { label: "Venue", href: "/accommodation-venue" },
  { label: "Registration", href: "/registration" },
];

/* ── All Navigation Links for Pop-out Drawer ────────────────────── */
const DRAWER_NAV_LINKS = [
  ...NAV_LINKS,
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "site-header transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled && "scrolled",
        !isHome ? "header-inner" : "header-home"
      )}
    >
      {/* ── Squircle Clip Definition for 3D Social Icons ─────────── */}
      <svg width="0" height="0" className="absolute pointer-events-none" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <LayoutGroup id="header-nav-group">
        {/* ── Tier 1: Top utility bar ──────────────────────────────── */}
        <div className={cn(
          "top-bar flex w-full items-center justify-between px-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 lg:px-8",
          !isHome ? "py-1 text-[11px]" : "py-1.5 text-xs sm:text-sm"
        )}>
          <div className="flex items-center gap-3">
            {/* 3D Animated Social Dock (Instagram, LinkedIn, X) */}
            <div className="relative inline-flex items-center">
              <div className="absolute inset-0 bg-black/25 backdrop-blur-xl rounded-xl border border-white/10 shadow-sm pointer-events-none" />
              <div className="relative flex items-center gap-x-1 p-0.5 sm:p-1">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/bis-chem-iiti/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="relative group block"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-6.5 h-6.5 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <LinkedInIcon />
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/bis_chem_iiti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="relative group block"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-6.5 h-6.5 sm:w-7 sm:h-7 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-lg flex items-center justify-center shadow-md border border-pink-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <InstagramIcon />
                  </div>
                </a>

                {/* X (Twitter) */}
                <a
                  href="https://x.com/IITIOfficial?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="relative group block"
                >
                  <div
                    style={{ clipPath: "url(#squircleClip)" }}
                    className="w-6.5 h-6.5 sm:w-7 sm:h-7 bg-gradient-to-br from-gray-700 to-gray-950 rounded-lg flex items-center justify-center shadow-md border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-115 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <TwitterIcon />
                  </div>
                </a>
              </div>
            </div>

            <span className="divider" />

            <a
              href="https://www.iiti.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-gold transition-colors"
            >
              IIT Indore
            </a>

            <span className="divider hidden sm:inline" />

            <a
              href="https://chemical.iiti.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline hover:text-gold transition-colors"
            >
              Chemical Engineering
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="lang-toggle">
              <span className="lang-btn active">en</span>
            </div>
          </div>
        </div>

        {/* ── Tier 2: Dynamic Sizing Logo + Title on Left, Pill Nav on Right ── */}
        <div className={cn(
          "flex w-full items-center justify-between px-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-6 lg:px-8",
          isHome ? "py-3 sm:py-4 lg:py-4.5" : "py-1.5 sm:py-2.5"
        )}>
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-3.5 shrink-0"
            onClick={() => setMenuOpen(false)}
          >
            {/* IIT Indore Logo with Smooth Scale */}
            <Image
              src="/logos/iit-indore-logo.png"
              alt="IIT Indore emblem"
              width={140}
              height={100}
              unoptimized
              className={cn(
                "w-auto shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] object-contain",
                isHome ? "h-12 sm:h-14 lg:h-16" : "h-9 sm:h-11 lg:h-12"
              )}
              priority
            />
            <div className={cn(
              "w-px bg-white/30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isHome ? "h-10 sm:h-12" : "h-7 sm:h-8"
            )} />

            {/* Prominent Title on Home, Smoothly Reduced on Inner Pages */}
            <span className="flex min-w-0 flex-col leading-tight transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span className={cn(
                "font-extrabold tracking-wide text-white transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap drop-shadow-xs",
                isHome ? "text-base sm:text-xl lg:text-2xl" : "text-xs sm:text-sm lg:text-base font-bold"
              )}>
                Malwa Chemical Conclave 2026
              </span>
              <span className={cn(
                "font-medium text-white/80 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap",
                isHome ? "text-xs sm:text-sm lg:text-base" : "text-[9px] sm:text-xs text-white/70"
              )}>
                Dept. of Chemical Engineering, IIT Indore
              </span>
            </span>
          </Link>

          {/* Right side: Desktop Pill Nav (without Contact) + 3-Line Menu Trigger */}
          <div className="flex items-center gap-3">
            <nav className="hidden xl:flex items-center">
              <div className="pill-nav pill-nav-compact transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      data-active={active}
                      className="transition-all duration-500 ease-in-out"
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 3-Line Pop-out Menu Trigger */}
            <button
              type="button"
              aria-label="Toggle navigation and contact menu"
              className={cn(
                "flex items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white backdrop-blur-xl transition-all duration-300 hover:bg-gold hover:border-gold hover:text-white cursor-pointer shadow-md",
                isHome ? "h-9 w-9" : "h-8.5 w-8.5"
              )}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={isHome ? 19 : 17} /> : <Menu size={isHome ? 19 : 17} />}
            </button>
          </div>
        </div>
      </LayoutGroup>

      {/* ── Pop-Out Transparent Glassmorphism Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/25 bg-black/45 backdrop-blur-3xl overflow-hidden shadow-2xl"
            style={{
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Column 1: Primary Navigation Links (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/15 pb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold drop-shadow-xs">
                      Conference Navigation
                    </span>
                    <span className="text-[11px] text-white/60 font-medium">October 11–12, 2026</span>
                  </div>

                  <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {DRAWER_NAV_LINKS.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3.5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 border backdrop-blur-md",
                            active
                              ? "bg-gold text-white border-gold shadow-md font-bold"
                              : "bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:border-white/30 hover:text-white"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronRight size={14} className={active ? "text-white" : "text-white/40"} />
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Register CTA Banner */}
                  <div className="pt-2">
                    <Link
                      href="/registration"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3.5 text-sm font-bold text-white shadow-xl hover:bg-gold-700 transition-all duration-300 uppercase tracking-wider hover:scale-[1.01]"
                    >
                      <UserCheck size={18} />
                      <span>Register for Malwa Chemical Conclave 2026</span>
                    </Link>
                  </div>
                </div>

                {/* Column 2: Glassmorphic Contact & Secretariat Section (5 cols) */}
                <div className="lg:col-span-5 space-y-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-lg">
                  <div className="border-b border-white/15 pb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold drop-shadow-xs">
                      Secretariat &amp; Contact
                    </span>
                    <span className="text-[10px] text-white/70 font-semibold">IIT Indore</span>
                  </div>

                  <div className="space-y-3.5 text-xs text-white/90">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span>
                        Department of Chemical Engineering, IIT Indore, Simrol Campus, Khandwa Road, Indore, MP – 453552
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail size={16} className="shrink-0 text-gold" />
                      <a
                        href="mailto:chemenggoffice@iiti.ac.in"
                        className="text-white hover:text-gold transition-colors font-medium underline underline-offset-2"
                      >
                        chemenggoffice@iiti.ac.in
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone size={16} className="shrink-0 text-gold" />
                      <span>+91 731 2438 700</span>
                    </div>
                  </div>

                  {/* External Portal Links */}
                  <div className="pt-3 border-t border-white/15">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-2">
                      External Portals
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <a
                        href="https://www.iiti.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-lg bg-white/10 border border-white/15 p-2 text-center text-white/90 hover:bg-white/20 hover:text-gold transition-colors"
                      >
                        <span>IIT Indore Portal</span>
                        <ExternalLink size={12} />
                      </a>
                      <a
                        href="https://chemical.iiti.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 rounded-lg bg-white/10 border border-white/15 p-2 text-center text-white/90 hover:bg-white/20 hover:text-gold transition-colors"
                      >
                        <span>Chemical Engg Dept</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-2 flex items-center justify-between border-t border-white/15 text-white/80">
                    <span className="text-[10px] uppercase font-bold text-white/60">Follow Us</span>
                    <div className="flex items-center gap-4">
                      <a
                        href="https://www.linkedin.com/company/bis-chem-iiti/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="hover:text-gold transition-colors p-1"
                      >
                        <LinkedInIcon />
                      </a>
                      <a
                        href="https://www.instagram.com/bis_chem_iiti/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="hover:text-gold transition-colors p-1"
                      >
                        <InstagramIcon />
                      </a>
                      <a
                        href="https://x.com/IITIOfficial?lang=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="hover:text-gold transition-colors p-1"
                      >
                        <TwitterIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
