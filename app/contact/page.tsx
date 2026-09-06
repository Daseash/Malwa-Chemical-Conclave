import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CampusMap } from "@/components/CampusMap";
import { Mail, MapPin, Phone, UserCheck, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact the organizing committee and secretariat of Malwa Chemical Conclave 2026 at IIT Indore.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with the Malwa Chemical Conclave 2026 organizing committee and BIS Student Chapter secretariat."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="space-y-5">
              <div className="institutional-card p-6 border-l-4 border-l-navy">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900">
                  <MapPin size={16} /> Department Address
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-950">
                  Department of Chemical Engineering
                </h3>
                <p className="mt-1 text-sm text-gray-700 leading-relaxed">
                  Indian Institute of Technology Indore, Simrol, Khandwa Road, Indore, Madhya Pradesh &ndash; 453552, India.
                </p>
              </div>

              <div className="institutional-card p-6 border-l-4 border-l-gold">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-900">
                  <Mail size={16} /> Electronic Correspondence
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-950">
                  Conclave Secretariat Email
                </h3>
                <a
                  href="mailto:chemenggoffice@iiti.ac.in"
                  className="hover-underline mt-1.5 inline-block text-sm font-semibold text-navy"
                >
                  chemenggoffice@iiti.ac.in
                </a>
                <p className="mt-1 text-xs text-gray-500">
                  For sponsorship, speaker inquiries, registration support, and press inquiries.
                </p>
              </div>

              <div className="institutional-card p-6 border-l-4 border-l-gray-400">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700">
                  <Phone size={16} /> Telephone &amp; Helpdesk
                </p>
                <h3 className="mt-2 text-lg font-bold text-navy-950">
                  IIT Indore Main Line
                </h3>
                <p className="mt-1 text-sm text-gray-700">
                  +91 731 2438 700
                </p>
                <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> Office hours: Mon &ndash; Fri, 09:00 AM &ndash; 05:30 PM IST
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="institutional-card p-6 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded bg-navy-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                  Campus Location &amp; Venue
                </span>
                <h3 className="text-lg font-bold text-navy-950 mb-4">
                  IIT Indore Simrol Campus
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 items-stretch">
                  {/* Campus photo */}
                  <div className="group relative overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-xs min-h-[240px]">
                    <img
                      src="/image1.jpg"
                      alt="IIT Indore campus"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {/* Live Map */}
                  <div className="rounded-xl overflow-hidden border border-[#E5E7EB] shadow-xs">
                    <CampusMap className="h-full min-h-[240px] w-full border-0" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

