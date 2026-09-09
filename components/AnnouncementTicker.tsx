import Link from "next/link";
import { Megaphone } from "lucide-react";

const ANNOUNCEMENTS: { label: string; href: string }[] = [
  { label: "Registrations opening September 9, 2026 — Malwa Chemical Conclave", href: "/registration" },
  { label: "Conclave dates: October 11–12, 2026 at IIT Indore", href: "/schedule" },
  { label: "Call for Student Innovation Expo entries & prototype presentations", href: "/about" },
  { label: "Sponsorship & Industry Collaboration opportunities open", href: "/sponsors" },
];

export function AnnouncementTicker() {
  return (
    <section className="border-y border-[#002F6C] bg-[#001B3D] text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shrink-0">
          <Megaphone size={14} /> Announcements
        </div>

        <div className="group relative flex-1 overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-10" aria-hidden={copy === 1}>
                {ANNOUNCEMENTS.map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="whitespace-nowrap text-xs sm:text-sm font-medium text-white/90 transition-colors hover:text-gold"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

