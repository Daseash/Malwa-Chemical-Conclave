import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description: "Principal institutional partner and sponsorship tiers for Malwa Chemical Conclave 2026 at IIT Indore.",
};

const TIERS = [
  {
    name: "Title Partner",
    amount: "₹2,00,000+",
    accentHeader: "bg-[#001B3D] text-white",
    badge: "Exclusive Tier",
    badgeColor: "bg-gold-50 text-gold-900",
    benefits: [
      "Category exclusivity across all event marketing",
      "Prime branding on auditorium LED backdrop screens",
      "Prominent digital hoardings & high-traffic banners",
      "Dedicated standees & repeated announcement mentions",
      "Instagram reels (2) & promotional posts (4)",
      "Website home banner branding + direct hyperlink",
      "20–25 minute dedicated Industry Keynote slot",
      "Official award & workshop co-branding",
      "Stage felicitation + digital certificate of partnership",
    ],
  },
  {
    name: "Gold Partner",
    amount: "₹1,00,000",
    accentHeader: "bg-[#002F6C] text-white",
    badge: "Key Partner",
    badgeColor: "bg-navy-50 text-navy-900",
    benefits: [
      "Branding on LED screens and conference hall displays",
      "Digital hoardings & high-traffic entrance banners",
      "Digital standees & session announcement mentions",
      "Instagram reel (1) & promotional posts (2)",
      "Website branding + official company hyperlink",
      "Award association and felicitation on stage",
      "Digital acknowledgement across event collaterals",
    ],
  },
  {
    name: "Silver Partner",
    amount: "₹60,000",
    accentHeader: "bg-[#1462C4] text-white",
    badge: "Associate Tier",
    badgeColor: "bg-gray-100 text-gray-800",
    benefits: [
      "Branding on event screens and banners",
      "Main entrance big banner logo inclusion",
      "Announcement mentions during technical sessions",
      "Instagram promotional post (1)",
      "Website partner directory logo placement",
      "Digital acknowledgement in conference brochure",
    ],
  },
  {
    name: "Associate Partner",
    amount: "₹30,000",
    accentHeader: "bg-[#374151] text-white",
    badge: "Supporting Tier",
    badgeColor: "bg-gray-100 text-gray-800",
    benefits: [
      "Logo on event collaterals and registration kit",
      "Digital standee display in exhibition hallway",
      "Social media acknowledgement & tags",
      "Website logo placement on Sponsors page",
    ],
  },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsorship Opportunities"
        subtitle="Collaborate with IIT Indore and gain high-visibility brand alignment with researchers, students, and chemical industry leaders."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── 1. Our Principal Associate (Up) ─────────────────────── */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="inline-block rounded bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900 border border-gold-200">
              Institutional Partner &amp; Sponsor
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Our Principal Associate
            </h2>
            <p className="text-base text-gray-600 mt-1">
              National regulatory body and key institutional partner collaborating for the conclave.
            </p>
          </div>

          <Reveal>
            <div className="institutional-card p-6 sm:p-10 bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:border-navy hover:-translate-y-1 transition-all duration-300">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Logo container */}
                <div className="lg:col-span-5 flex items-center justify-center p-6 bg-gradient-to-br from-[#F8F9FA] to-navy-50/50 rounded-xl border border-gray-100">
                  <img
                    src="/logos/BIS.png"
                    alt="Bureau of Indian Standards logo"
                    className="max-h-28 w-auto object-contain"
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-navy-900 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                      Principal Partner
                    </span>
                    <span className="text-xs font-semibold text-gold-900 bg-gold-50 px-2.5 py-0.5 rounded">
                      National Standards Body
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
                    Bureau of Indian Standards (BIS)
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The Bureau of Indian Standards is the National Standards Body of India, operating under the Ministry of Consumer Affairs, Food &amp; Public Distribution. BIS collaborates closely with the Department of Chemical Engineering at IIT Indore to foster standardisation awareness, quality assurance, student chapters, and research-led regulatory policies across chemical engineering verticals.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.bis.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-navy-900 transition-colors uppercase tracking-wider"
                    >
                      Visit Official Portal <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── 2. Sponsorship Tiers & Deliverables (Down) ──────────── */}
        <div>
          <div className="mb-10">
            <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
              Partnership Packages
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Sponsorship Tiers &amp; Deliverables
            </h2>
            <p className="mt-1 text-base text-gray-600">
              Choose a tier tailored to your organization&apos;s visibility, recruitment, and industry engagement goals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.04}>
                <div className="institutional-card flex h-full flex-col overflow-hidden rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:border-navy hover:-translate-y-1 transition-all duration-300">
                  <div className={`p-5 ${tier.accentHeader}`}>
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white">{tier.name}</h3>
                    <p className="mt-1 text-2xl font-extrabold text-white">{tier.amount}</p>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 bg-white">
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                      {tier.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <Check size={15} className="mt-0.5 shrink-0 text-navy" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Button
                        href="/contact"
                        variant="outline"
                        className="w-full text-xs py-2"
                      >
                        Inquire Sponsorship
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
