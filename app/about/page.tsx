import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AboutHeroVideo } from "@/components/AboutHeroVideo";
import { AboutBrochureCard } from "@/components/AboutBrochureCard";
import { MapPinned, ClipboardCheck, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About Malwa Chemical Conclave 2026 at IIT Indore.",
};

const HIGHLIGHTS = [
  {
    icon: MapPinned,
    title: "Regional Relevance",
    description:
      "Directly connecting chemical engineering research to the flourishing industrial landscape of the Malwa region.",
  },
  {
    icon: ClipboardCheck,
    title: "BIS Standardisation",
    description:
      "Practical insight into national quality benchmarks, regulatory adherence, and safety standard compliance.",
  },
  {
    icon: TrendingUp,
    title: "The Malwa Consortium",
    description:
      "Formally creating a sustainable academia–industry consortium for long-term technical synergy and development.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Page Header (About the Conclave) ────────────────── */}
      <PageHero
        title="About the Conclave"
        subtitle="A premier academic and industrial symposium fostering sustainable process innovation and standardisation in Central India."
      />

      {/* ── 2. Full-Viewport Right-to-Left Reveal Background Video ─ */}
      <AboutHeroVideo />

      {/* ── 3. Conclave Details & Sections ─────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <Reveal>
          <div className="institutional-card p-8 sm:p-10 border-l-4 border-l-navy bg-white">
            <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
              Vision &amp; Objective
            </span>
            <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl mb-4">
              Bridging Research, Manufacturing, and National Standards
            </h2>
            <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
              The <strong className="text-navy-950 font-bold">Malwa Chemical Conclave</strong> is an initiative organized by the Department of Chemical Engineering at IIT Indore in association with the Bureau of Indian Standards (BIS). The conclave serves as a premier technical platform bringing together global scholars, industry executives, policymakers, and innovative students.
            </p>
          </div>
        </Reveal>

        {/* Milestone Progression */}
        <Reveal delay={0.05}>
          <div className="mt-8 institutional-card p-6 sm:p-8 bg-gradient-to-r from-navy-50/70 via-white to-gold-50/30 border border-gray-200 hover:border-navy/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
                <TrendingUp size={15} className="text-navy" />
                <span>Conclave Evolution</span>
              </h3>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Growth &amp; Trajectory
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
              {/* Box 1: 2025 Pilot Edition */}
              <div className="group/pilot flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-navy hover:shadow-[0_12px_24px_-8px_rgba(0,47,108,0.18)] relative overflow-hidden cursor-pointer">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 transition-colors duration-300 group-hover/pilot:bg-navy" />
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-gray-500 group-hover/pilot:text-navy transition-colors">
                  2025 Pilot Edition
                </span>
                <p className="mt-1.5 text-base font-bold text-navy-900 group-hover/pilot:text-navy transition-colors">
                  4 Plenary Industry Talks
                </p>
                <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                  Foundation of the BIS Student Chapter collaborative series with inaugural symposium tracks.
                </p>
              </div>

              {/* Connector Arrow */}
              <div className="flex items-center justify-center text-navy px-1 py-1 sm:py-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-navy font-bold transition-all duration-300 hover:scale-110 hover:bg-navy hover:text-white shadow-2xs">
                  <ArrowRight size={16} />
                </div>
              </div>

              {/* Box 2: 2026 Flagship Conclave */}
              <div className="group/flagship flex-1 rounded-xl border-2 border-navy bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-600 hover:shadow-[0_14px_28px_-8px_rgba(0,74,173,0.28)] relative overflow-hidden cursor-pointer ring-1 ring-navy/10">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-navy to-gold" />
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-gold-900">
                  2026 Flagship Conclave
                </span>
                <p className="mt-1.5 text-base font-bold text-navy-950 group-hover/flagship:text-navy transition-colors">
                  7 Integrated Strategic Verticals
                </p>
                <p className="text-xs font-medium text-gray-600 mt-1 leading-relaxed">
                  Workshops, Matchmaking, Student Expo, and BIS Policy Panel with nationwide institutional participation.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Strategic Pillars */}
        <div className="mt-12">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-navy-950">Core Pillars of MCC 2026</h3>
            <p className="text-sm font-medium text-gray-700 mt-1">Key drivers that guide each track and technical deliberation.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="institutional-card h-full p-6 flex flex-col justify-between bg-white hover:border-navy transition-all duration-300">
                    <div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white mb-4">
                        <Icon size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-navy-950">{item.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed font-medium text-gray-700">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ── Official Brochure Section ── */}
        <div className="mt-14">
          <Reveal delay={0.1}>
            <AboutBrochureCard />
          </Reveal>
        </div>
      </div>
    </>
  );
}
