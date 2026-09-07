import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Invited Speakers",
  description: "Distinguished invited speakers and keynote delegates for Malwa Chemical Conclave 2026.",
};

const FEATURED_SPEAKERS_2026 = [
  {
    name: "Zahid Hussain",
    role: "Head, Technology Development & Design",
    organization: "DCM Nouvelle Specialty Chemicals Limited",
    image: "/speakers/zahid-hussain.jpeg",
    badge: "Keynote Speaker",
    focus: "Specialty Chemicals, Process Innovation & Technology Design",
  },
];


const PREVIOUS_SPEAKERS = [
  {
    name: "Meghdeep Agrawal",
    role: "Vice President",
    organization: "Safeflex",
    image: "/speakers/meghdeep-agrawal.jpeg",
  },
  {
    name: "Kapil Jat",
    role: "Senior General Manager",
    organization: "Moira Sariya",
    image: "/speakers/kapil-jat.jpeg",
  },
  {
    name: "Arpit Jain",
    role: "Director",
    organization: "Fenton Chemicals",
    image: "/speakers/arpit-jain.webp",
  },
  {
    name: "Shubhanjali Umrao",
    role: "Deputy Director",
    organization: "Bureau of Indian Standards",
    image: "/speakers/shubhanjali-umrao.jpeg",
  },
];

export default function SpeakersPage() {
  return (
    <>
      <PageHero
        title="Invited Speakers"
        subtitle="Eminent scholars, industry leaders, and regulatory officials delivering plenary keynotes and technical talks."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── 2026 Featured Keynote Speakers ─────────────────────── */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-navy">
            Conclave 2026 Line-Up
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
            Distinguished Keynote Speakers
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Eminent chemical pioneers, corporate technology leaders, and academic dignitaries delivering keynote talks at Malwa Chemical Conclave 2026.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {FEATURED_SPEAKERS_2026.map((speaker, i) => (
            <Reveal key={speaker.name} delay={i * 0.05}>
              <div className="institutional-card overflow-hidden bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between h-full hover:border-navy">
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="rounded-full bg-navy-950/90 text-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs border border-gold/30">
                        {speaker.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-950 tracking-tight group-hover:text-navy transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-gold-900">
                      {speaker.role}
                    </p>
                    <p className="mt-1 text-xs font-medium text-navy-950">
                      {speaker.organization}
                    </p>
                    <p className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3 leading-relaxed">
                      {speaker.focus}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50/80 px-6 py-3 border-t border-gray-100 text-xs text-navy font-semibold flex items-center justify-between">
                  <span>Distinguished Keynote &bull; 2026</span>
                  <Award size={14} className="text-gold" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>


        {/* ── Previous Speakers Section ────────────────────────────── */}
        <div className="mt-20 pt-12 border-t border-[#E5E7EB]">
          <div className="text-center sm:text-left mb-10">
            <span className="inline-block rounded bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900">
              Distinguished Legacy
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-navy-950">
              Previous Speakers
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Eminent industry pioneers and regulatory dignitaries who have addressed past editions of the conclave.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREVIOUS_SPEAKERS.map((speaker, i) => (
              <Reveal key={speaker.name} delay={i * 0.05}>
                <div className="institutional-card p-6 flex flex-col items-center text-center bg-white h-full group hover:border-navy transition-all duration-300">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-2 border-gold/40 p-1 bg-gradient-to-br from-gold/20 to-navy/10 shadow-sm group-hover:scale-105 group-hover:border-navy transition-all duration-300 shrink-0">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-full w-full rounded-full object-cover object-top"
                    />
                  </div>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-navy-950 tracking-tight group-hover:text-navy transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-gold-900">
                    {speaker.role}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {speaker.organization}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
