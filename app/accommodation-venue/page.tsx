import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CampusMap } from "@/components/CampusMap";
import { PlacesToVisit } from "@/components/PlacesToVisit";
import { Plane, Train, Car, Hotel, Compass, ArrowDown } from "lucide-react";

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
                  <div className="flex items-start gap-3.5">
                    <img
                      src="/transit/flight.jpg"
                      alt="Flight Transit Badge"
                      className="h-11 w-11 rounded-full object-cover shrink-0 shadow-md border-2 border-gold/40 mt-0.5 transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <strong className="text-navy-950 block">By Air (Devi Ahilyabai Holkar Airport):</strong>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Located ~35 km from campus. Pre-paid airport taxis and app-based cabs (Ola/Uber) are readily available directly to the Simrol campus.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <img
                      src="/transit/train.jpg"
                      alt="Train Transit Badge"
                      className="h-11 w-11 rounded-full object-cover shrink-0 shadow-md border-2 border-gold/40 mt-0.5 transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <strong className="text-navy-950 block">By Train (Indore Junction Station):</strong>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        Located ~24 km from campus. Regular city buses, shared transit, and pre-booked taxis connect from the railway station to IIT Indore main gate.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <img
                      src="/transit/bus.jpg"
                      alt="Bus Transit Badge"
                      className="h-11 w-11 rounded-full object-cover shrink-0 shadow-md border-2 border-gold/40 mt-0.5 transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <strong className="text-navy-950 block">By Road (State Highway &amp; Bus Routes):</strong>
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
