"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Wrench,
  Sparkles,
  Presentation,
  Coffee,
  MessagesSquare,
  Lightbulb,
  Handshake,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

interface ScheduleItem {
  time: string;
  duration: string;
  title: string;
  track: string;
  category: string;
  badgeColor: "navy" | "gold" | "green" | "purple" | "blue" | "orange";
  description: string;
  location: string;
  icon: typeof Wrench;
}

interface DaySchedule {
  id: string;
  dayNumber: string;
  date: string;
  dayName: string;
  title: string;
  focus: string;
  badge: string;
  items: ScheduleItem[];
}

const SCHEDULE_DAYS: DaySchedule[] = [
  {
    id: "day-1",
    dayNumber: "Day 1",
    date: "October 11, 2026",
    dayName: "Sunday",
    title: "Technical Masterclasses & Applied Workshops",
    focus: "Intensive hands-on computational tools, process engineering simulations, and laboratory workflows.",
    badge: "Workshop Day",
    items: [
      {
        time: "11:00 AM – 12:00 PM",
        duration: "60 mins",
        title: "Hands-on Workshop 1",
        track: "Vertical 05: Practical Masterclass",
        category: "Workshop",
        badgeColor: "blue",
        description:
          "Practical computational masterclass covering chemical process simulation, digital twins, and fluid property modeling with modern engineering software.",
        location: "Department Computing Facility & CAD Labs",
        icon: Wrench,
      },
      {
        time: "02:00 PM – 03:00 PM",
        duration: "60 mins",
        title: "Hands-on Workshop 2",
        track: "Vertical 05: Technical Masterclass",
        category: "Workshop",
        badgeColor: "blue",
        description:
          "Advanced session on industrial standardisation frameworks, quality assurance testing protocols, and applied chemical safety workflows conducted in association with BIS.",
        location: "Department Seminar Hall & Research Labs",
        icon: Wrench,
      },
    ],
  },
  {
    id: "day-2",
    dayNumber: "Day 2",
    date: "October 12, 2026",
    dayName: "Monday",
    title: "Flagship Conclave & Industry Dialogue",
    focus: "Keynotes, BIS panel discussions, student innovation exposition, matchmaking, and awards.",
    badge: "Main Conclave Day",
    items: [
      {
        time: "10:30 AM – 11:00 AM",
        duration: "30 mins",
        title: "Opening Ceremony",
        track: "Inauguration",
        category: "Plenary",
        badgeColor: "gold",
        description:
          "Formal inaugural address, ceremonial lamp lighting, and welcome remarks by dignitaries from IIT Indore leadership, Department of Chemical Engineering, and Bureau of Indian Standards.",
        location: "Main Auditorium, Academic Complex",
        icon: Sparkles,
      },
      {
        time: "11:00 AM – 01:00 PM",
        duration: "120 mins",
        title: "Keynote & Technical Presentations",
        track: "Vertical 01: Keynotes & Research",
        category: "Presentations",
        badgeColor: "navy",
        description:
          "Plenary keynotes by eminent industry executives and faculty, followed by selected oral presentations on cutting-edge research across sustainable and green chemical technologies.",
        location: "Main Auditorium & Lecture Hall Complex",
        icon: Presentation,
      },
      {
        time: "01:00 PM – 02:00 PM",
        duration: "60 mins",
        title: "Lunch & Networking Break",
        track: "Delegate Dining",
        category: "Networking",
        badgeColor: "green",
        description:
          "Hosted luncheon for all registered delegates, speakers, faculty members, corporate representatives, and student scholars in the institute dining pavilion.",
        location: "Institute Dining Pavilion & Guest Complex",
        icon: Coffee,
      },
      {
        time: "02:00 PM – 03:00 PM",
        duration: "60 mins",
        title: "Interactive Panel Discussion",
        track: "Vertical 04: Regulatory & Industry Policy",
        category: "Panel Discussion",
        badgeColor: "purple",
        description:
          "High-level policy and technical dialogue with Bureau of Indian Standards (BIS) officials and industry captains focusing on quality standards, green transition, and national benchmarks.",
        location: "Main Auditorium",
        icon: MessagesSquare,
      },
      {
        time: "03:00 PM – 04:00 PM",
        duration: "60 mins",
        title: "Poster Presentation & Student Innovation Expo",
        track: "Vertical 03: Exhibition & Innovation",
        category: "Exhibition",
        badgeColor: "orange",
        description:
          "Interactive exhibition of student innovations, physical prototypes, research posters, process models, and startup concepts evaluated by an expert jury.",
        location: "Central Academic Foyer & Exhibition Hall",
        icon: Lightbulb,
      },
      {
        time: "04:00 PM – 05:00 PM",
        duration: "60 mins",
        title: "Industry Matchmaking & Networking",
        track: "Vertical 02: Academic–Industry Connect",
        category: "Matchmaking",
        badgeColor: "navy",
        description:
          "Dedicated one-on-one matchmaking sessions pairing chemical industry delegates with IIT Indore faculty for sponsored R&D, student internships, and technical consultancy.",
        location: "Executive Conference Rooms & Matchmaking Lounge",
        icon: Handshake,
      },
      {
        time: "05:00 PM – 05:30 PM",
        duration: "30 mins",
        title: "Awards & Closing Ceremony",
        track: "Vertical 07: Recognition & Valedictory",
        category: "Valedictory",
        badgeColor: "gold",
        description:
          "Presentation of Best Innovation Expo Awards, Best Poster Honours, token of mementos to guests, release of the Malwa Chemical Outlook, and official vote of thanks.",
        location: "Main Auditorium",
        icon: Trophy,
      },
    ],
  },
];

const BADGE_STYLES = {
  navy: "bg-navy-50 text-navy-900 border-navy-200",
  gold: "bg-gold-50 text-gold-900 border-gold-200",
  green: "bg-emerald-50 text-emerald-800 border-emerald-200",
  purple: "bg-purple-50 text-purple-900 border-purple-200",
  blue: "bg-blue-50 text-blue-900 border-blue-200",
  orange: "bg-amber-50 text-amber-900 border-amber-200",
};

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "day-1" | "day-2">("all");

  const filteredDays =
    activeFilter === "all"
      ? SCHEDULE_DAYS
      : SCHEDULE_DAYS.filter((d) => d.id === activeFilter);

  return (
    <>
      <PageHero
        title="Programme Schedule"
        subtitle="Two-day comprehensive roadmap covering applied industrial workshops and flagship conclave sessions at IIT Indore."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        {/* ── Top Summary & Filter Controls ───────────────────────── */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5E7EB] pb-8">
          <div>
            <span className="inline-block rounded bg-navy-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900">
              IIT Indore &bull; October 11&ndash;12, 2026
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Conference Agenda &amp; Timings
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Department of Chemical Engineering in association with Bureau of Indian Standards
            </p>
          </div>

          {/* Day Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-gray-100 border border-gray-200 shadow-2xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                activeFilter === "all"
                  ? "bg-white text-navy-950 shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-navy-950"
              )}
            >
              All Days (2)
            </button>
            <button
              onClick={() => setActiveFilter("day-1")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                activeFilter === "day-1"
                  ? "bg-white text-navy-950 shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-navy-950"
              )}
            >
              Day 1 &bull; Oct 11
            </button>
            <button
              onClick={() => setActiveFilter("day-2")}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer",
                activeFilter === "day-2"
                  ? "bg-white text-navy-950 shadow-sm ring-1 ring-black/5"
                  : "text-gray-600 hover:text-navy-950"
              )}
            >
              Day 2 &bull; Oct 12
            </button>
          </div>
        </div>

        {/* ── Days Grid / Timeline ─────────────────────────────────── */}
        <div className="space-y-14">
          {filteredDays.map((day, dayIndex) => (
            <div key={day.id} className="space-y-6">
              {/* Day Header Banner: Clean White Background with Blue Hover Border */}
              <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] border-l-4 border-l-navy transition-all duration-300 ease-in-out hover:border-navy hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16)] hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-900 font-mono text-base font-extrabold text-white shadow-xs">
                      0{dayIndex + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-navy-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-navy-900 border border-navy-100">
                          {day.badge}
                        </span>
                        <span className="text-xs text-gray-500 font-medium">
                          {day.dayName}, {day.date}
                        </span>
                      </div>
                      <h3 className="mt-1 text-xl sm:text-2xl font-bold text-navy-950 tracking-tight">
                        {day.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-navy font-semibold bg-navy-50/80 px-3 py-1.5 rounded-lg border border-navy-100 w-fit">
                    <Clock size={14} className="text-navy" />
                    <span>{day.items.length} Scheduled Sessions</span>
                  </div>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-3 leading-relaxed">
                  {day.focus}
                </p>
              </div>

              {/* Day Timeline List */}
              <div className="relative pl-4 sm:pl-6 space-y-4 before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
                {day.items.map((session, sessionIdx) => {
                  const IconComponent = session.icon;
                  return (
                    <Reveal key={session.title + session.time} delay={sessionIdx * 0.04}>
                      <div className="relative flex items-start gap-4 sm:gap-6 group">
                        {/* Timeline Bullet Node with smooth hover transition */}
                        <div
                          className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-navy-900 group-hover:border-navy group-hover:bg-navy-50 group-hover:text-navy transition-all duration-300 ease-in-out shadow-xs"
                        >
                          <IconComponent size={15} />
                        </div>

                        {/* Session Card: White Background, Smooth Blue Border Transition on Hover */}
                        <div
                          className="flex-1 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:border-navy hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16)] hover:-translate-y-0.5 cursor-pointer"
                        >
                          {/* Card Header: Category + Time Badge */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3 mb-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={cn(
                                  "rounded border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                                  BADGE_STYLES[session.badgeColor]
                                )}
                              >
                                {session.category}
                              </span>
                              <span className="text-xs text-gray-500 font-medium">
                                {session.track}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-navy-950 bg-navy-50/80 px-2.5 py-1 rounded-md border border-navy-100 group-hover:border-navy/40 transition-colors duration-300">
                                <Clock size={12} className="text-navy" />
                                {session.time}
                              </span>
                              <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                                {session.duration}
                              </span>
                            </div>
                          </div>

                          {/* Session Title & Description */}
                          <h4 className="text-base sm:text-lg font-bold text-navy-950 tracking-tight group-hover:text-navy transition-colors duration-300">
                            {session.title}
                          </h4>
                          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-gray-600">
                            {session.description}
                          </p>

                          {/* Session Location Footer */}
                          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
                            <span className="flex items-center gap-1.5 font-medium text-gray-700 group-hover:text-navy transition-colors duration-300">
                              <MapPin size={13} className="text-navy" />
                              {session.location}
                            </span>
                            <span className="text-[11px] text-gray-400">
                              IIT Indore Simrol Campus
                            </span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom Information & Actions Card ────────────────────── */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 ease-in-out hover:border-navy hover:shadow-md hover:ring-1 hover:ring-navy/15">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <span className="inline-block rounded bg-gold-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-gold-900 mb-2 border border-gold-200">
                  Delegate Information
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-navy-950">
                  Join All Sessions with a Delegate Pass
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Delegate registration includes entry to Day 1 hands-on workshops, Day 2 plenary addresses, BIS policy panel discussions, innovation expo, and networking lunch.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-green-600" /> Certificate of Participation
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-green-600" /> Delegate Kit &amp; Lunch Included
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Button href="/registration" className="w-full text-center font-bold">
                  Register for Conclave
                </Button>
                <Link
                  href="/accommodation-venue"
                  className="hover-underline inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-navy py-2"
                >
                  Venue &amp; Campus Map <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
