"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Lock,
  Mail,
  Calendar,
  MapPin,
  Building,
  ArrowRight,
  AlertCircle,
  Download,
  RotateCcw,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";

export default function RegistrationPage() {
  const [confirmedRegistrationId, setConfirmedRegistrationId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const draft = sessionStorage.getItem("mcc_reg_draft");
        if (draft) {
          const p = JSON.parse(draft);
          if (p.registrationId) {
            setConfirmedRegistrationId(p.registrationId);
          }
        }
      } catch (err) {
        console.error("Draft read error:", err);
      }
    }
  }, []);

  return (
    <>
      <PageHero
        title="Registration Closed"
        subtitle="Official delegate registration portal for Malwa Chemical Conclave 2026 at IIT Indore."
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        
        {/* If user has an existing confirmed registration */}
        {confirmedRegistrationId ? (
          <Reveal>
            <div className="mx-auto max-w-lg rounded-2xl border-2 border-navy bg-white p-6 sm:p-8 shadow-lg text-center space-y-5 mb-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-navy">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-navy-950">
                  Registration Confirmed
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
                  Your registration details have been securely recorded.
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Registration ID</span>
                  <span className="font-mono font-bold text-navy bg-white px-2.5 py-1 rounded border border-navy/20">
                    {confirmedRegistrationId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Event Dates</span>
                  <span className="font-medium text-gray-900">October 11–12, 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Venue</span>
                  <span className="font-medium text-gray-900">IIT Indore Campus</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-navy hover:bg-navy-900 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* ── REGISTRATION CLOSED MAIN NOTICE ── */}
        <Reveal>
          <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-gold to-navy" />

            <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700 shadow-2xs">
                <Lock size={13} className="text-red-600" />
                <span>Registration Status: Closed</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy-950 tracking-tight">
                Delegate Registrations Are Closed
              </h2>

              {/* Description */}
              <p className="text-sm sm:text-base font-medium text-gray-600 leading-relaxed">
                Registrations for <strong>Malwa Chemical Conclave 2026</strong> at <strong>IIT Indore</strong> have officially concluded. We express our sincere appreciation to all students, research scholars, faculty members, and chemical industry delegates for the tremendous interest and overwhelming response.
              </p>
            </div>

            {/* Informational Cards Grid */}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* Card 1: Registered Delegates */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 flex flex-col justify-between hover:border-gray-300 transition-all">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-950">
                    Already Registered?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    All registered participants will receive official conference passes, badge details, and workshop check-in guidelines via their registered email address.
                  </p>
                </div>
              </div>

              {/* Card 2: Spot Registrations Policy */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 flex flex-col justify-between hover:border-gray-300 transition-all">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20 text-gold-800">
                    <AlertCircle size={20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-950">
                    Spot Registrations
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    To maintain auditorium safety regulations and seating capacities, spot registrations will not be available at the venue unless announced by the committee.
                  </p>
                </div>
              </div>

              {/* Card 3: Secretariat & Inquiries */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-5 flex flex-col justify-between hover:border-gray-300 transition-all">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Mail size={20} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-navy-950">
                    Conclave Secretariat
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    For inquiries regarding existing registration details or institutional delegations, please email:
                  </p>
                  <a
                    href="mailto:mcc@iiti.ac.in"
                    className="inline-block text-xs sm:text-sm font-bold text-navy hover:text-gold transition-colors underline decoration-gold underline-offset-4"
                  >
                    mcc@iiti.ac.in
                  </a>
                </div>
              </div>
            </div>

            {/* Event Highlights & Quick Navigation */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar size={15} className="text-navy" />
                <span>October 11–12, 2026 • IIT Indore Campus</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button href="/schedule" variant="outline" className="text-xs sm:text-sm">
                  View Schedule
                </Button>
                <Button href="/accommodation-venue" className="text-xs sm:text-sm">
                  Venue &amp; Campus Map
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </>
  );
}
