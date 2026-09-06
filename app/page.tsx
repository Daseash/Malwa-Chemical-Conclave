import Link from "next/link";
import {
  ArrowRight,
  Mic,
  Handshake,
  Lightbulb,
  MessagesSquare,
  Wrench,
  Newspaper,
  Trophy,
  MapPin,
  Calendar,
  Building,
  CheckCircle,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CampusMap } from "@/components/CampusMap";
import { Button } from "@/components/Button";
import { AnnouncementTicker } from "@/components/AnnouncementTicker";
import { CountUpStat } from "@/components/CountUpStat";
import { HeroCarousel } from "@/components/HeroCarousel";

const STATS = [
  { value: 7, suffix: "", label: "Integrated Verticals" },
  { value: 400, suffix: "+", label: "Prospective Footfall" },
  { value: 5, suffix: "+", label: "Industry Leaders" },
  { value: 5, suffix: "+", label: "Collaborations" },
];

const VERTICALS = [
  {
    icon: Mic,
    title: "Industry Talks",
    category: "Keynotes",
    description: "Plenary addresses from leading chemical and process industry pioneers.",
  },
  {
    icon: Handshake,
    title: "Industry Matchmaking",
    category: "Networking",
    description: "20-minute dedicated faculty–company meetings plus expert technical counselling sessions.",
  },
  {
    icon: Lightbulb,
    title: "Student Innovation Expo",
    category: "Exhibition",
    description: "Prototypes, research posters, startup ideas, patents, and process simulations.",
  },
  {
    icon: MessagesSquare,
    title: "Interactive BIS Panel",
    category: "Policy",
    description:
      "Policy discussions with the Bureau of Indian Standards on standardisation and quality assurance.",
  },
  {
    icon: Wrench,
    title: "Hands-on Workshops",
    category: "Workshops",
    description: "Practical masterclasses on modern tools used across chemical process engineering.",
  },
  {
    icon: Newspaper,
    title: "Annual Outlook",
    category: "Publication",
    description:
      "The Malwa Chemical Outlook — industry benchmarks, research trends, and sustainable tech.",
  },
  {
    icon: Trophy,
    title: "Awards Programme",
    category: "Recognition",
    description: "Recognitions across sustainable manufacturing, innovation, and paper presentations.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO: Full-viewport background image carousel ────────── */}
      <section className="hero-wrapper">
        <HeroCarousel />
      </section>

      {/* ── ANNOUNCEMENTS TICKER ──────────────────────────────────── */}
      <div id="announcements">
        <AnnouncementTicker />
      </div>

      {/* ── IMPACT & STATEMENT ────────────────────────────────────── */}
      <section className="border-b border-[#E5E7EB] bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
                IIT Indore &bull; October 11&ndash;12, 2026
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl lg:text-5xl leading-tight">
                Bringing academia, industry, and regulators onto one stage.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                Hosted by the Department of Chemical Engineering at IIT Indore in association with the Bureau of Indian Standards, the Malwa Chemical Conclave connects researchers, manufacturers, and policy leaders.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="hover-underline inline-flex items-center gap-1.5 text-base font-semibold text-navy"
                >
                  About the Conclave <ArrowRight size={16} />
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/schedule"
                  className="hover-underline inline-flex items-center gap-1.5 text-base font-semibold text-navy"
                >
                  View Schedule <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="institutional-card p-6 border-l-4 border-l-navy"
                  >
                    <div className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                      <CountUpStat value={s.value} suffix={s.suffix} label="" />
                    </div>
                    <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 VERTICALS (Clean Hover Slide-In Cards) ─────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-block rounded bg-gold-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-900">
              Conclave Structure
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              7 Integrated Verticals
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Structured across a dedicated workshop day and a flagship conclave day to ensure maximum practical takeaway and institutional dialogue.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((vertical, i) => {
              const Icon = vertical.icon;
              const trackNumber = `0${i + 1}`;
              return (
                <Reveal key={vertical.title} delay={i * 0.03}>
                  <div
                    tabIndex={0}
                    className="group relative h-[210px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:border-navy focus:outline-none flex flex-col justify-between cursor-pointer"
                  >
                    {/* ── Default View: Icon + Category + Title ──── */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-900 text-white transition-colors group-hover:bg-navy shadow-sm">
                        <Icon size={24} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-400">
                          {trackNumber}
                        </span>
                        <span className="rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                          {vertical.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-navy-900 block mb-1">
                        Vertical {trackNumber}
                      </span>
                      <h3 className="text-xl font-bold text-navy-950 tracking-tight leading-snug transition-colors group-hover:text-navy">
                        {vertical.title}
                      </h3>
                    </div>

                    {/* ── Slide-in Overlay: White Background with Navy Details on Hover ──────── */}
                    <div className="absolute inset-0 flex flex-col justify-between bg-white p-6 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 z-10">
                      <div>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
                          <span className="rounded bg-navy-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900">
                            {vertical.category}
                          </span>
                          <span className="text-xs font-mono font-bold text-navy">
                            Track {trackNumber}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-navy-950 leading-snug">
                          {vertical.title}
                        </h4>
                        <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-gray-600">
                          {vertical.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <Link
                          href="/schedule"
                          className="inline-flex items-center text-xs font-bold text-navy hover:text-navy-900 transition-colors"
                        >
                          Explore Track Schedule <ArrowRight size={13} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE ───────────────────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="institutional-card p-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-900">
                <MapPin size={15} /> Venue
              </p>
              <p className="mt-2 text-lg font-bold text-navy-950">
                Indian Institute of Technology Indore
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Simrol, Khandwa Road, Madhya Pradesh 453552
              </p>
            </div>

            <div className="institutional-card p-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-900">
                <Calendar size={15} /> Dates
              </p>
              <p className="mt-2 text-lg font-bold text-navy-950">
                October 11&ndash;12, 2026
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Day 1 (Oct 11): Workshops &bull; Day 2 (Oct 12): Main Conclave
              </p>
            </div>

            <div className="institutional-card p-6">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-900">
                <Building size={15} /> Organizing Body
              </p>
              <p className="mt-2 text-sm font-semibold text-navy-950 leading-relaxed">
                BIS Student Chapter, Department of Chemical Engineering, IIT Indore, in association with the Bureau of Indian Standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIND US & LOCATION ────────────────────────────────────── */}
      <section className="border-t border-[#E5E7EB] bg-[#F8F9FA] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
              Campus &amp; Location
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Find Us at IIT Indore
            </h2>
            <p className="mt-2 max-w-2xl text-base text-gray-600">
              Department of Chemical Engineering, Indian Institute of Technology Indore, Simrol, Indore&ndash;Khandwa Road, Madhya Pradesh 453552.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Campus Photo (Image 3) - Full picture visible without cropping */}
            <div className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 p-3 flex flex-col justify-between lg:col-span-4 min-h-[420px]">
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl bg-gray-50 min-h-[340px]">
                <img
                  src="/campus-image-3.jpg"
                  alt="IIT Indore campus"
                  className="h-full w-full max-h-[460px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs text-gray-500">
                <span className="font-semibold text-navy-950">IIT Indore Campus</span>
                <span>Simrol, Madhya Pradesh</span>
              </div>
            </div>

            {/* Venue Details */}
            <div className="institutional-card p-6 sm:p-8 flex flex-col justify-between lg:col-span-4 bg-white">
              <div>
                <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900">
                  Campus Venue
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy-950">
                  Academic Complex &amp; Lecture Halls
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Keynote sessions, interactive panel discussions, and student research exhibitions will be held across the central academic complexes.
                </p>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-4 text-xs sm:text-sm text-gray-600">
                  <p><strong className="text-navy-950">Indore Junction:</strong> 24 km</p>
                  <p><strong className="text-navy-950">Devi Ahilyabai Airport:</strong> 35 km</p>
                </div>
              </div>

              <Link
                href="/accommodation-venue"
                className="hover-underline mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy"
              >
                Accommodation &amp; Travel Guide <ArrowRight size={15} />
              </Link>
            </div>

            {/* Live Interactive Map */}
            <div className="rounded-2xl border border-[#E5E7EB] overflow-hidden p-3 bg-white shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 lg:col-span-4 flex flex-col justify-between min-h-[420px]">
              <div className="relative flex-1 w-full min-h-[340px] rounded-xl overflow-hidden border border-gray-100">
                <CampusMap className="h-full w-full border-0 shadow-none min-h-[340px]" />
              </div>
              <div className="pt-3 px-1 flex items-center justify-end text-xs text-gray-500">
                <a
                  href="https://maps.google.com/?q=Indian+Institute+of+Technology+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-navy hover:underline inline-flex items-center gap-1"
                >
                  Open in Maps <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION CTA ──────────────────────────────────────── */}
      <section className="border-t-2 border-gold bg-[#001B3D] text-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-gold-300">
            Registrations Opening Soon
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Be Part of Malwa Chemical Conclave 2026
          </h2>
          <p className="max-w-2xl text-base text-white/80 leading-relaxed">
            Reserve your place for keynote sessions, hands-on masterclasses, industry networking, and technical exhibitions.
          </p>
          <div className="mt-4">
            <Button href="/registration">
              Get Notified &amp; Register Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

