"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, MapPin, Compass, Landmark, Sparkles, Trees } from "lucide-react";
import { Reveal } from "./Reveal";

export interface Attraction {
  id: string;
  name: string;
  category: "Spiritual & Pilgrimage" | "Heritage & Architecture" | "Nature & Adventure";
  location: string;
  mapUrl: string;
  image: string;
  description: string;
}

export const ATTRACTIONS_DATA: Attraction[] = [
  {
    id: "mahakaleshwar",
    name: "Mahakaleshwar Temple (Ujjain)",
    category: "Spiritual & Pilgrimage",
    location: "Ujjain (~55 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Mahakaleshwar+Jyotirlinga+Temple+Ujjain",
    image: "/photos/attractions/mahakaleshwar.jpg",
    description: "One of the twelve sacred Jyotirlingas of Lord Shiva, situated on the holy banks of River Shipra.",
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar Jyotirlinga",
    category: "Spiritual & Pilgrimage",
    location: "Mandhata Island (~75 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Omkareshwar+Jyotirlinga+Temple+Khandwa",
    image: "/photos/attractions/omkareshwar.jpg",
    description: "Sacred island Jyotirlinga temple on the Narmada River, naturally shaped like the Hindu 'Om' symbol.",
  },
  {
    id: "kanch-mandir",
    name: "Kanch Mandir",
    category: "Spiritual & Pilgrimage",
    location: "Indore City (~24 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kanch+Mandir+Indore",
    image: "/photos/attractions/kanch-mandir.jpg",
    description: "Exquisite 20th-century Jain temple constructed entirely of mirror mosaics, Belgian glass, and crystal.",
  },
  {
    id: "rajwada",
    name: "Rajwada Palace",
    category: "Heritage & Architecture",
    location: "Indore City (~24 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Rajwada+Palace+Indore",
    image: "/photos/attractions/rajwada.jpg",
    description: "Historic 7-story royal palace of the Holkars, showcasing a blend of Maratha, Mughal, and French architecture.",
  },
  {
    id: "lalbagh",
    name: "Lalbagh Palace",
    category: "Heritage & Architecture",
    location: "Indore (~23 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Lal+Bagh+Palace+Indore",
    image: "/photos/attractions/lalbagh.jpg",
    description: "Grand 19th-century European-style palace estate set in 28-acre gardens with replica gates of Buckingham Palace.",
  },
  {
    id: "jahaz-mahal",
    name: "Mandu (Jahaz Mahal)",
    category: "Heritage & Architecture",
    location: "Mandu (~90 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Jahaz+Mahal+Mandu",
    image: "/photos/attractions/jahaz-mahal.jpg",
    description: "Iconic 15th-century Afghan 'Ship Palace' floating between two artificial lakes in the ancient citadel of Mandu.",
  },
  {
    id: "gandhi-hall",
    name: "Gandhi Hall",
    category: "Heritage & Architecture",
    location: "Indore City (~24 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Gandhi+Hall+Indore",
    image: "/photos/attractions/gandhi-hall.jpg",
    description: "Historic 1904 Indo-Gothic landmark constructed in red and white Seoni stone with an iconic central clock tower.",
  },
  {
    id: "white-church",
    name: "White Church",
    category: "Heritage & Architecture",
    location: "Indore (~22 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=White+Church+Indore",
    image: "/photos/attractions/white-church.jpg",
    description: "Oldest church in Central India built in 1858, exhibiting European colonial architecture and stained glass windows.",
  },
  {
    id: "pataalpani",
    name: "Pataalpani Waterfalls",
    category: "Nature & Adventure",
    location: "Mhow (~20 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Patalpani+Waterfalls+Indore",
    image: "/photos/attractions/pataalpani.jpg",
    description: "Breathtaking 300-foot waterfall cascading down a steep rocky gorge surrounded by dense green forest valleys.",
  },
  {
    id: "tincha-fall",
    name: "Tincha Fall",
    category: "Nature & Adventure",
    location: "Near Simrol (~18 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Tincha+Falls+Indore",
    image: "/photos/attractions/tincha-fall.jpg",
    description: "Scenic 300-foot cascade and canyon gorge near IIT Indore, featuring natural springs and picturesque trails.",
  },
  {
    id: "choral-dam",
    name: "Choral Dam",
    category: "Nature & Adventure",
    location: "Mhow / Simrol (~16 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Choral+Dam+Indore",
    image: "/photos/attractions/choral-dam.jpg",
    description: "Tranquil freshwater reservoir in the Vindhya range, popular for scenic lake views, boating, and nature retreats.",
  },
  {
    id: "ralamandal",
    name: "Ralamandal Wildlife Sanctuary",
    category: "Nature & Adventure",
    location: "Indore (~15 km)",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ralamandal+Wildlife+Sanctuary+Indore",
    image: "/photos/attractions/ralamandal.jpg",
    description: "Oldest wildlife sanctuary in MP, featuring hilltop nature trails, rich flora and fauna, and a historic Shikargah.",
  },
];

const CATEGORIES = ["All Places", "Spiritual & Pilgrimage", "Heritage & Architecture", "Nature & Adventure"] as const;

export function PlacesToVisit() {
  const [activeCategory, setActiveCategory] = useState<string>("All Places");

  const filteredAttractions =
    activeCategory === "All Places"
      ? ATTRACTIONS_DATA
      : ATTRACTIONS_DATA.filter((a) => a.category === activeCategory);

  return (
    <section className="mt-16 pt-12 border-t border-gray-200" id="places-to-visit">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy inline-flex items-center gap-1.5">
                <Compass size={14} className="text-navy" /> Regional Tourism & Sightseeing
              </span>
              <span className="text-xs font-semibold text-gold-900">Malwa Region</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-navy-950 flex items-center gap-2.5">
              <Landmark className="text-navy shrink-0" size={28} /> Places to Visit Near Indore
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-3xl leading-relaxed">
              Explore renowned spiritual centers, historic Holkar and Mughal heritage landmarks, and scenic natural waterfalls across the Malwa region. Click any destination name to open its Google Maps location.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Category Filter Tabs */}
      <Reveal delay={0.05}>
        <div className="flex flex-wrap gap-2 mb-8 pb-2 border-b border-gray-100">
          {CATEGORIES.map((category) => {
            const count =
              category === "All Places"
                ? ATTRACTIONS_DATA.length
                : ATTRACTIONS_DATA.filter((a) => a.category === category).length;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 bg-white ${
                  isActive
                    ? "text-navy border-2 border-navy shadow-xs font-bold"
                    : "text-navy-950 border border-gray-200 hover:border-navy hover:text-navy hover:shadow-xs"
                }`}
              >
                <span>{category}</span>
                <span
                  className="text-[11px] px-1.5 py-0.5 rounded-full font-bold bg-gray-100 text-navy"
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Attractions Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAttractions.map((attraction, index) => (
          <Reveal key={attraction.id} delay={(index % 4) * 0.05}>
            <div className="institutional-card group flex flex-col justify-between h-full bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16),0_10px_15px_-5px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-navy hover:-translate-y-1">
              <div>
                {/* Image Box */}
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Distance Tag */}
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-white">
                    <MapPin size={12} className="text-gold" />
                    {attraction.location}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-bold text-navy-950 leading-snug group-hover:text-navy transition-colors">
                    <a
                      href={attraction.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-navy hover:underline text-navy-950 group/link"
                      title={`Open ${attraction.name} in Google Maps`}
                    >
                      <span>{attraction.name}</span>
                      <ExternalLink
                        size={15}
                        className="text-navy group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0"
                      />
                    </a>
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {attraction.description}
                  </p>
                </div>
              </div>

              {/* Action Button Link */}
              <div className="px-4 sm:px-5 pb-4 pt-1">
                <a
                  href={attraction.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-navy/20 bg-white hover:bg-white hover:border-navy px-3 py-2 text-xs font-semibold text-navy transition-all duration-200 shadow-2xs hover:shadow-xs group/btn"
                >
                  <MapPin size={13} className="text-navy group-hover/btn:text-navy-900 transition-colors" />
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
