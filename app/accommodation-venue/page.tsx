import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CampusMap } from "@/components/CampusMap";
import { PlacesToVisit } from "@/components/PlacesToVisit";
import { Plane, Train, Bus, Hotel, Compass, ArrowDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Accommodation & Venue",
  description: "Campus location, transport directions, accommodation guidance, and local attractions for IIT Indore.",
};

export default function AccommodationVenuePage() {
  return (
    <>
      <PageHero
        title="Accommodation & Venue"
        subtitle="Campus directions, transport links, guest house accommodation guidance, and tourist destinations for delegates visiting IIT Indore."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          {/* ── Left Column: Venue & Map ── */}
          <div className="space-y-8">
            <Reveal>
              <div className="institutional-card p-6 sm:p-8 flex flex-col justify-between bg-white border border-[#E5E7EB]">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-navy mb-2">
                    Conference Location
                  </span>
                  <h2 className="text-2xl font-bold text-navy-950">IIT Indore Campus</h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Indian Institute of Technology Indore, Khandwa Road, Simrol, Indore, Madhya Pradesh &ndash; 453552.
                  </p>
                  <div className="mt-6 rounded-lg overflow-hidden border border-[#E5E7EB]">
                    <CampusMap className="aspect-[4/3] w-full border-0" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Accommodation Guidance */}
            <Reveal delay={0.08}>
              <div className="institutional-card p-6 sm:p-8 border-l-4 border-l-gold bg-white">
                <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2 mb-3">
                  <Hotel size={18} className="text-gold-900" /> Accommodation Guidance
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Limited on-campus guest house accommodation is reserved for keynote speakers and session chairs. For outstation participants and student delegates, subsidized hostel rooms and a curated list of recommended partner hotels in Indore city will be shared upon registration confirmation.
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Guest House &bull; Hostel Allotment</span>
                  <span className="font-semibold text-navy">Simrol Campus</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Transit Info ── */}
          <div className="space-y-8">
            {/* How to Reach IIT Indore */}
            <Reveal delay={0.05}>
              <div className="institutional-card p-6 sm:p-8 border-l-4 border-l-navy bg-white">
                <h3 className="text-lg font-bold text-navy-950 flex items-center gap-2 mb-4">
                  <Plane size={18} className="text-navy" /> How to Reach IIT Indore
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  {/* Flight / Aeroplane */}
                  <div className="group/transit flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 hover:bg-navy-50/70 hover:shadow-sm border border-transparent hover:border-navy/15 cursor-default">
                    <div className="transit-stage relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy border border-navy/15 shrink-0 transition-all duration-300 group-hover/transit:bg-navy group-hover/transit:text-white group-hover/transit:shadow-md">
                      {/* 3D Flying Aeroplane */}
                      <div className="relative z-10 transition-transform duration-300 group-hover/transit:animate-plane-fly">
                        <Plane size={22} className="transform -rotate-6 transition-transform" />
                      </div>

                      {/* Smoke / Contrail Puffs emitted on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/transit:opacity-100 transition-opacity duration-150 overflow-visible">
                        <span className="smoke-cloud h-3 w-3 bottom-1.5 left-2" style={{ animation: "planeSmokePuff1 0.9s ease-out infinite" }} />
                        <span className="smoke-cloud h-2.5 w-2.5 bottom-2 left-1.5" style={{ animation: "planeSmokePuff2 1.2s ease-out infinite 0.25s" }} />
                        <span className="smoke-cloud h-2 w-2 bottom-1 left-2.5" style={{ animation: "planeSmokePuff3 0.7s ease-out infinite 0.45s" }} />
                      </div>
                    </div>
                    <div>
                      <strong className="text-navy-950 block transition-colors group-hover/transit:text-navy">
                        By Air (Devi Ahilyabai Holkar Airport):
                      </strong>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Located ~35 km from campus. Pre-paid airport taxis and app-based cabs (Ola/Uber) are readily available directly to the Simrol campus.
                      </span>
                    </div>
                  </div>

                  {/* Train */}
                  <div className="group/transit flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 hover:bg-navy-50/70 hover:shadow-sm border border-transparent hover:border-navy/15 cursor-default">
                    <div className="transit-stage relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy border border-navy/15 shrink-0 transition-all duration-300 group-hover/transit:bg-navy group-hover/transit:text-white group-hover/transit:shadow-md">
                      {/* 3D Chugging Train */}
                      <div className="relative z-10 transition-transform duration-300 group-hover/transit:animate-train-chug">
                        <Train size={22} className="transition-transform" />
                      </div>

                      {/* Steam Locomotive Smoke Puffs */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/transit:opacity-100 transition-opacity duration-150 overflow-visible">
                        <span className="smoke-cloud h-3.5 w-3.5 top-1.5 left-3" style={{ animation: "trainSteamPuff1 0.85s ease-out infinite" }} />
                        <span className="smoke-cloud h-3 w-3 top-1 left-3.5" style={{ animation: "trainSteamPuff2 1.1s ease-out infinite 0.2s" }} />
                        <span className="smoke-cloud h-2.5 w-2.5 top-2 left-2.5" style={{ animation: "trainSteamPuff3 0.7s ease-out infinite 0.4s" }} />
                      </div>
                    </div>
                    <div>
                      <strong className="text-navy-950 block transition-colors group-hover/transit:text-navy">
                        By Train (Indore Junction Station):
                      </strong>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Located ~24 km from campus. Regular city buses, shared transit, and pre-booked taxis connect from the railway station to IIT Indore main gate.
                      </span>
                    </div>
                  </div>

                  {/* Bus / Road */}
                  <div className="group/transit flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 hover:bg-navy-50/70 hover:shadow-sm border border-transparent hover:border-navy/15 cursor-default">
                    <div className="transit-stage relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy border border-navy/15 shrink-0 transition-all duration-300 group-hover/transit:bg-navy group-hover/transit:text-white group-hover/transit:shadow-md">
                      {/* 3D Driving Bus */}
                      <div className="relative z-10 transition-transform duration-300 group-hover/transit:animate-bus-drive">
                        <Bus size={22} className="transition-transform" />
                      </div>

                      {/* Exhaust Smoke Puffs */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/transit:opacity-100 transition-opacity duration-150 overflow-visible">
                        <span className="smoke-cloud h-3 w-3 bottom-2 left-2" style={{ animation: "busExhaustPuff1 0.8s ease-out infinite" }} />
                        <span className="smoke-cloud h-3.5 w-3.5 bottom-1.5 left-1.5" style={{ animation: "busExhaustPuff2 1.15s ease-out infinite 0.25s" }} />
                        <span className="smoke-cloud h-2.5 w-2.5 bottom-2.5 left-2.5" style={{ animation: "busExhaustPuff3 0.65s ease-out infinite 0.45s" }} />
                      </div>
                    </div>
                    <div>
                      <strong className="text-navy-950 block transition-colors group-hover/transit:text-navy">
                        By Road (State Highway &amp; Express Bus Routes):
                      </strong>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Situated conveniently on the Indore–Khandwa State Highway, well-connected by express bus routes and highway corridors.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Quick Sightseeing Overview Card */}
            <Reveal delay={0.1}>
              <div className="institutional-card p-6 sm:p-8 border-l-4 border-l-gold bg-white shadow-xs">
                <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                    <Compass size={13} className="text-navy" /> Tourism & Heritage
                  </span>
                  <span className="text-xs text-gold-900 font-semibold">12 Key Attractions</span>
                </div>

                <h3 className="text-lg font-bold text-navy-950 mb-2">
                  Explore Indore & Malwa Heritage
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Delegates visiting IIT Indore can explore famous pilgrimage destinations like Ujjain and Omkareshwar, architectural wonders like Mandu Jahaz Mahal, Rajwada, and Lalbagh Palace, or scenic nature spots like Pataalpani, Tincha Falls, and Choral Dam.
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a
                    href="#places-to-visit"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-navy-900 hover:underline"
                  >
                    <span>View all attractions & Google Maps links</span>
                    <ArrowDown size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── Dedicated Places to Visit Near Indore Section ── */}
        <PlacesToVisit />
      </div>
    </>
  );
}
