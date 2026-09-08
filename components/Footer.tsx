"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="shrink-0"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="shrink-0"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="shrink-0"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Schedule", href: "/schedule" },
  { label: "Invited Speakers", href: "/speakers" },
  { label: "Registration", href: "/registration" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Organizers", href: "/organizers" },
  { label: "Venue", href: "/accommodation-venue" },
  { label: "Contact", href: "/contact" },
  { label: "Secretariat Portal", href: "/admin" },
];

const DEPT_LINKS = [
  { label: "IIT Indore Home", href: "https://www.iiti.ac.in/", external: true },
  { label: "Dept. of Chemical Engineering", href: "https://chemical.iiti.ac.in/", external: true },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/bis-chem-iiti/?viewAsMember=true",
    icon: LinkedInIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/bis_chem_iiti/",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "https://x.com/IITIOfficial?lang=en",
    icon: TwitterIcon,
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t-2 border-gold bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Column 1: Logo + event info */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <a
              href="https://www.iiti.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/logos/iit-indore-logo.png"
                alt="IIT Indore emblem"
                width={80}
                height={60}
                unoptimized
                className="h-11 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              />
            </a>
            <div className="h-8 w-px bg-white/20" />
            <a
              href="https://chemical.iiti.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform duration-300 hover:scale-105"
            >
              <Image
                src="/logos/chemical-engineering-logo.png"
                alt="IIT Indore Chemical Engineering logo"
                width={48}
                height={48}
                unoptimized
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              />
            </a>
          </div>
          <p className="mt-4 text-sm font-semibold text-gold">
            Malwa Chemical Conclave 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            An initiative of the BIS Student Chapter, Department of Chemical
            Engineering, IIT Indore, in association with the Bureau of Indian
            Standards.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Affiliations */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Affiliations
          </p>
          <ul className="mt-4 space-y-2">
            {DEPT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                  {link.external && <ExternalLink size={12} />}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Contact &amp; Connect
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="group/item flex items-start gap-2.5 transition-colors hover:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0 text-gold transition-all duration-300 group-hover/item:bg-gold/20 group-hover/item:border-gold/50 group-hover/item:scale-110 group-hover/item:text-gold-400 shadow-xs">
                <MapPin size={14} className="shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
              </span>
              <span className="text-xs leading-relaxed">
                Department of Chemical Engineering, IIT Indore, Simrol, 453552,
                Indore–Khandwa Road, Indore, MP
              </span>
            </li>
            <li className="group/item flex items-center gap-2.5 transition-colors hover:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0 text-gold transition-all duration-300 group-hover/item:bg-gold/20 group-hover/item:border-gold/50 group-hover/item:scale-110 group-hover/item:text-gold-400 shadow-xs">
                <Mail size={14} className="shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
              </span>
              <a
                href="mailto:chemenggoffice@iiti.ac.in"
                className="text-xs transition-colors hover:text-gold"
              >
                chemenggoffice@iiti.ac.in
              </a>
            </li>
            <li className="group/item flex items-center gap-2.5 transition-colors hover:text-white">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10 shrink-0 text-gold transition-all duration-300 group-hover/item:bg-gold/20 group-hover/item:border-gold/50 group-hover/item:scale-110 group-hover/item:text-gold-400 shadow-xs">
                <Phone size={14} className="shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
              </span>
              <a
                href="tel:+917312438700"
                className="text-xs transition-colors hover:text-gold"
              >
                +91 731 2438 700
              </a>
            </li>
          </ul>

          {/* Social links */}
          <div className="mt-5 flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-xs transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-md"
                >
                  <span className="transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6">
                    <Icon />
                  </span>
                  <span>{social.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar with Designed by Attribution */}
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
        <span>&copy; 2026 Department of Chemical Engineering, IIT Indore.</span>
        <span className="hidden sm:inline">&bull;</span>
        <span className="text-white/60">Designed &amp; Developed by</span>
        <a
          href="https://www.linkedin.com/in/eashwar-das-428002397/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-white/80 hover:text-gold transition-colors font-medium"
        >
          <span>Eashwar Chandra Das</span>
          <LinkedInIcon />
        </a>
        <span className="hidden sm:inline">&bull;</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
