"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Receipt,
  Check,
  Building,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileCheck,
  Calendar,
  Hotel,
  Info,
  Clock,
  BookOpen,
  Award,
  Coffee,
  ShieldCheck,
  Send,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

type CategoryId = "iiti" | "external_student" | "academia" | "industry";
type DurationId = "1day" | "2days";

interface DurationOption {
  id: DurationId;
  label: string;
  sublabel: string;
  amount: number;
}

interface AccommodationOption {
  id: string;
  label: string;
  sublabel?: string;
  amount: number;
  note?: string;
}

interface CategoryTier {
  id: CategoryId;
  name: string;
  badge: string;
  description: string;
  durations: DurationOption[];
  accommodationType: "none" | "checkbox" | "options";
  accommodationOptions?: AccommodationOption[];
}

const CATEGORIES: CategoryTier[] = [
  {
    id: "iiti",
    name: "IIT Indore Student/Researcher/Faculty",
    badge: "IIT Indore",
    description: "Registered students, PhD research scholars, and faculty members of IIT Indore.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to technical sessions & exhibitions", amount: 0 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 200 },
    ],
    accommodationType: "none",
  },
  {
    id: "external_student",
    name: "External Student/PhD Scholar",
    badge: "External Scholar",
    description: "Students, postgraduates, and doctoral researchers from external universities and institutes.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to technical sessions & exhibitions", amount: 200 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 400 },
    ],
    accommodationType: "checkbox",
    accommodationOptions: [
      {
        id: "on_campus_900",
        label: "On-Campus Accommodation",
        sublabel: "Subsidized hostel / guest room on Simrol campus",
        amount: 900,
      },
    ],
  },
  {
    id: "academia",
    name: "Academia/Faculty",
    badge: "Faculty / Academic",
    description: "Professors, scientists, and researchers from universities and national research labs.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day access to keynote addresses & technical talks", amount: 400 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Hands-on masterclasses", amount: 1000 },
    ],
    accommodationType: "checkbox",
    accommodationOptions: [
      {
        id: "on_campus_900",
        label: "On-Campus Accommodation",
        sublabel: "IIT Indore campus guest house accommodation",
        amount: 900,
      },
    ],
  },
  {
    id: "industry",
    name: "Industrial Delegate and Others",
    badge: "Industry / Corporate",
    description: "Corporate executives, chemical manufacturers, R&D leaders, and standardisation officials.",
    durations: [
      { id: "1day", label: "1 Day", sublabel: "Single-day executive dialogue & technical sessions", amount: 1000 },
      { id: "2days", label: "2 Days [with Workshop]", sublabel: "Full 2-day conclave access + Matchmaking & Masterclasses", amount: 2000 },
    ],
    accommodationType: "options",
    accommodationOptions: [
      {
        id: "none",
        label: "No Accommodation Needed",
        sublabel: "Self-arranged daily commute",
        amount: 0,
      },
      {
        id: "on_campus_1300",
        label: "Accommodation on campus",
        sublabel: "IIT Indore Executive Guest House / VIP Suite",
        amount: 1300,
      },
      {
        id: "outside_sky_imperial",
        label: "Accommodation outside — Sky Imperial",
        sublabel: "Partner hotel (Book on your own / 0 Rs. added)",
        amount: 0,
        note: "Partner booking guidance & contact will be provided upon confirmation.",
      },
    ],
  },
];

const PASS_PERKS = [
  {
    icon: Award,
    title: "Official Certification",
    desc: "Certificate of Participation jointly issued by IIT Indore & BIS Student Chapter.",
  },
  {
    icon: BookOpen,
    title: "Hands-on Masterclasses",
    desc: "Interactive workshops on chemical safety, standards, and advanced modeling.",
  },
  {
    icon: FileCheck,
    title: "Delegate Kit & Collaterals",
    desc: "Conference bag, stationery, published abstracts, and standardisation guidelines.",
  },
  {
    icon: Coffee,
    title: "Networking & Hospitality",
    desc: "Networking lunches, high-tea sessions, and direct interactions with domain experts.",
  },
];

export default function RegistrationPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryTier>(CATEGORIES[0]);
  const [selectedDurationId, setSelectedDurationId] = useState<DurationId>("2days");
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string>("none");
  const [isAccommodationChecked, setIsAccommodationChecked] = useState<boolean>(false);

  // Notify Me State
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyName, setNotifyName] = useState("");
  const [notified, setNotified] = useState(false);

  // Handle Category Change
  const handleCategorySelect = (category: CategoryTier) => {
    setSelectedCategory(category);
    setSelectedDurationId("2days");
    setIsAccommodationChecked(false);
    setSelectedAccommodationId("none");
  };

  // Find active duration option
  const activeDuration =
    selectedCategory.durations.find((d) => d.id === selectedDurationId) ??
    selectedCategory.durations[0];

  // Calculate Accommodation fee
  let accommodationFee = 0;
  let accommodationLabel = "None";

  if (selectedCategory.accommodationType === "checkbox") {
    if (isAccommodationChecked && selectedCategory.accommodationOptions?.[0]) {
      accommodationFee = selectedCategory.accommodationOptions[0].amount;
      accommodationLabel = `${selectedCategory.accommodationOptions[0].label} (₹${accommodationFee})`;
    } else {
      accommodationLabel = "Not Selected (Self-arranged)";
    }
  } else if (selectedCategory.accommodationType === "options") {
    const opt = selectedCategory.accommodationOptions?.find((o) => o.id === selectedAccommodationId);
    if (opt) {
      accommodationFee = opt.amount;
      accommodationLabel = opt.label;
    }
  } else {
    accommodationLabel = "IIT Indore Campus Resident";
  }

  // Calculate Total Sum
  const basePassFee = activeDuration.amount;
  const totalAmount = basePassFee + accommodationFee;

  // Countdown Timer & Launch Date (October 9, 2026 at 10:00 AM IST)
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    const target = new Date("2026-10-09T10:00:00+05:30").getTime();

    const updateTimer = () => {
      // Support ?preview=true query parameter for developer/organizer preview
      const isPreview =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("preview") === "true";

      const now = Date.now();
      const diff = target - now;

      if (diff <= 0 || isPreview) {
        setIsOpen(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsOpen(false);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleNotifySubmit(e: FormEvent) {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
    }
  }

  return (
    <>
      <PageHero
        title="Registration"
        subtitle={
          isOpen
            ? "Explore delegate tiers, workshop passes, and accommodation options to complete your registration."
            : "Registrations for Malwa Chemical Conclave 2026 will start soon! Portal opens on October 9 at 10:00 AM."
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        
        {/* ── PLAIN WHITE COUNTDOWN SECTION: "REGISTRATION WILL START SOON!" ── */}
        {!isOpen && (
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#E5E7EB] bg-white p-8 sm:p-14 text-center shadow-xs mb-10">
              {/* Big plain text in navy */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-navy-950 tracking-tight">
                Registration Will Start Soon!
              </h2>

              <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                Official registrations for <strong className="text-navy font-bold">Malwa Chemical Conclave 2026</strong> will open on <strong className="text-navy font-bold">October 9 at 10:00 AM</strong>. Enter your email below to receive an instant notification when the portal goes live.
              </p>

              {/* Email Notify Pill Bar (styled after user reference image) */}
              <div className="mt-8 max-w-md mx-auto">
                {notified ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-full bg-green-50 border border-green-200 py-3.5 px-6 text-xs sm:text-sm text-green-900 font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                    <span>You will be notified at <strong>{notifyEmail}</strong> when registrations open!</span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleNotifySubmit}
                    className="flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl sm:rounded-full bg-gray-50 border border-gray-300 focus-within:border-navy focus-within:ring-2 focus-within:ring-navy/15 transition-all shadow-inner"
                  >
                    <input
                      type="email"
                      required
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full sm:flex-1 bg-transparent px-5 py-2.5 text-xs sm:text-sm text-navy-950 placeholder:text-gray-400 outline-none text-center sm:text-left"
                    />
                    <button
                      type="submit"
                      className="w-full sm:w-auto rounded-xl sm:rounded-full bg-navy hover:bg-navy-900 text-white font-bold text-xs sm:text-sm px-7 py-3 transition-all shadow-md cursor-pointer shrink-0"
                    >
                      Notify Me
                    </button>
                  </form>
                )}
                <p className="mt-2.5 text-[11px] text-gray-400">
                  Official IIT Indore Registration Portal &bull; Privacy Protected
                </p>
              </div>

              {/* Countdown Timer Circles (Directly matching user image layout) */}
              <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center gap-4 sm:gap-7">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-navy text-white shadow-md transition-transform hover:scale-105">
                    <span className="font-mono text-2xl sm:text-3xl font-bold">
                      {isMounted ? String(timeLeft.days).padStart(2, "0") : "00"}
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy">
                    Days
                  </span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-navy text-white shadow-md transition-transform hover:scale-105">
                    <span className="font-mono text-2xl sm:text-3xl font-bold">
                      {isMounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy">
                    Hours
                  </span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-navy text-white shadow-md transition-transform hover:scale-105">
                    <span className="font-mono text-2xl sm:text-3xl font-bold">
                      {isMounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy">
                    Minutes
                  </span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-navy text-white shadow-md transition-transform hover:scale-105">
                    <span className="font-mono text-2xl sm:text-3xl font-bold">
                      {isMounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-navy">
                    Seconds
                  </span>
                </div>
              </div>

            </div>
          </Reveal>
        )}

        {/* ── REGISTRATION DETAILS & TIER EXPLORER (Shown after October 9, 2026 at 10:00 AM) ── */}
        {isOpen && (
          <>
            {/* ── Top Section Header ── */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
              <div>
                <span className="inline-block rounded bg-gold/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-900 border border-gold/40">
                  Interactive Fee &amp; Category Explorer
                </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
              Preview Delegate Categories &amp; Pricing
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Select your category below to calculate your estimated delegate pass fee and view accommodation options.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Registrations Starting Soon</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
              <ShieldCheck size={16} className="text-navy" />
              <span>Official IIT Indore Portal</span>
            </div>
          </div>
        </div>

        {/* ── Two-Column Layout: Interactive Tier Explorer & Calculated Sum ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          
          {/* ── LEFT COLUMN: Category & Option Selection ── */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 bg-white shadow-sm transition-all duration-300 hover:border-navy/40 hover:shadow-lg">
                
                {/* Step 1: 4 Categories Selection */}
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                        1
                      </span>
                      <h4 className="text-base font-bold text-navy-950">
                        Choose Participant Category
                      </h4>
                    </div>
                    <span className="text-xs text-navy font-semibold">Click to preview tier</span>
                  </div>

                  {/* 4 Category Cards */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory.id === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat)}
                          className={cn(
                            "cursor-pointer rounded-xl border p-4 transition-all duration-300 text-left flex flex-col justify-between bg-white",
                            isSelected
                              ? "border-navy shadow-md ring-2 ring-navy/20 bg-blue-50/20"
                              : "border-gray-200 hover:border-navy hover:shadow-xs"
                          )}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={cn(
                                  "rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                  isSelected
                                    ? "bg-navy-900 text-white"
                                    : "bg-gray-100 text-gray-700"
                                )}
                              >
                                {cat.badge}
                              </span>
                              <span className="text-xs font-semibold text-navy">
                                {isSelected ? "Active Preview" : "Select"}
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-navy-950 leading-snug">
                              {cat.name}
                            </h5>
                            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
                              {cat.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                            <span className="text-gray-500 font-normal">
                              {isSelected ? "Tier Selected" : "Click to view options"}
                            </span>
                            <div
                              className={cn(
                                "flex h-4 w-4 items-center justify-center rounded-full border",
                                isSelected
                                  ? "border-navy bg-navy text-white"
                                  : "border-gray-300 bg-white"
                              )}
                            >
                              {isSelected && <Check size={10} strokeWidth={3} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ── Sub-options Box ── */}
                  <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-gray-50/60 p-5 space-y-5 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                        <Calendar size={14} className="text-navy" />
                        Participation Duration: <span className="text-navy font-extrabold">{selectedCategory.name}</span>
                      </span>
                    </div>

                    {/* Duration Radio Options */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedCategory.durations.map((duration) => {
                        const isDurationSelected = selectedDurationId === duration.id;
                        return (
                          <div
                            key={duration.id}
                            onClick={() => setSelectedDurationId(duration.id)}
                            className={cn(
                              "cursor-pointer rounded-lg border p-4 transition-all duration-200 text-left flex flex-col justify-between bg-white",
                              isDurationSelected
                                ? "border-navy shadow-sm ring-1 ring-navy"
                                : "border-gray-200 hover:border-navy hover:shadow-xs"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h6 className="text-sm font-bold text-navy-950">
                                {duration.label}
                              </h6>
                              <span className="font-mono text-base font-extrabold text-navy-950">
                                ₹{duration.amount}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {duration.sublabel}
                            </p>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-navy">
                              <div
                                className={cn(
                                  "flex h-3.5 w-3.5 items-center justify-center rounded-full border",
                                  isDurationSelected
                                    ? "border-navy bg-navy text-white"
                                    : "border-gray-300 bg-white"
                                )}
                              >
                                {isDurationSelected && <Check size={8} strokeWidth={3} />}
                              </div>
                              <span className={isDurationSelected ? "text-navy font-bold" : "text-gray-400"}>
                                {isDurationSelected ? "Selected Option" : "Choose this option"}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ── Accommodation Section ── */}
                    {selectedCategory.accommodationType === "checkbox" && selectedCategory.accommodationOptions?.[0] && (
                      <div className="pt-4 border-t border-gray-200">
                        <label
                          onClick={() => setIsAccommodationChecked(!isAccommodationChecked)}
                          className={cn(
                            "cursor-pointer rounded-lg border p-4 transition-all duration-200 flex items-start justify-between gap-4 bg-white",
                            isAccommodationChecked
                                ? "border-navy shadow-sm ring-1 ring-navy"
                                : "border-gray-200 hover:border-navy hover:shadow-xs"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={isAccommodationChecked}
                              onChange={(e) => setIsAccommodationChecked(e.target.checked)}
                              className="mt-1 h-4 w-4 rounded border-gray-300 text-navy focus:ring-navy cursor-pointer"
                            />
                            <div>
                              <span className="text-sm font-bold text-navy-950 flex items-center gap-1.5">
                                <Hotel size={15} className="text-navy" />
                                {selectedCategory.accommodationOptions[0].label}
                              </span>
                              <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">
                                {selectedCategory.accommodationOptions[0].sublabel}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-extrabold text-navy-950 shrink-0">
                            +₹{selectedCategory.accommodationOptions[0].amount}
                          </span>
                        </label>
                      </div>
                    )}

                    {/* Industry Accommodation Options */}
                    {selectedCategory.accommodationType === "options" && selectedCategory.accommodationOptions && (
                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                          <Hotel size={14} className="text-navy" />
                          Accommodation Preference
                        </span>
                        <div className="space-y-2">
                          {selectedCategory.accommodationOptions.map((opt) => {
                            const isOptSelected = selectedAccommodationId === opt.id;
                            return (
                              <div
                                key={opt.id}
                                onClick={() => setSelectedAccommodationId(opt.id)}
                                className={cn(
                                  "cursor-pointer rounded-lg border p-3.5 transition-all duration-200 flex items-start justify-between gap-3 bg-white",
                                  isOptSelected
                                    ? "border-navy shadow-sm ring-1 ring-navy"
                                    : "border-gray-200 hover:border-navy hover:shadow-xs"
                                )}
                              >
                                <div className="flex items-start gap-2.5">
                                  <div
                                    className={cn(
                                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                                      isOptSelected ? "border-navy bg-navy text-white" : "border-gray-300 bg-white"
                                    )}
                                  >
                                    {isOptSelected && <Check size={10} strokeWidth={3} />}
                                  </div>
                                  <div>
                                    <span className="text-xs sm:text-sm font-bold text-navy-950">
                                      {opt.label}
                                    </span>
                                    <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                                      {opt.sublabel}
                                    </p>
                                    {opt.note && (
                                      <p className="mt-1 text-[11px] text-gray-600 italic">
                                        {opt.note}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <span className="font-mono text-xs sm:text-sm font-extrabold text-navy-950 shrink-0">
                                  {opt.amount > 0 ? `+₹${opt.amount}` : "₹0"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* IIT Indore note */}
                    {selectedCategory.accommodationType === "none" && (
                      <div className="pt-2 text-xs text-gray-600 flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200">
                        <Info size={14} className="text-navy shrink-0" />
                        <span>Campus resident pass — on-campus housing not applicable.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── PRE-REGISTER / GET NOTIFIED FORM ── */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="rounded-xl border border-gold/40 bg-gradient-to-br from-gold-50/50 to-white p-5 sm:p-6 shadow-xs">
                    <div className="flex items-center gap-2 text-gold-900 font-bold text-sm uppercase tracking-wider mb-2">
                      <Mail size={16} />
                      <span>Get Notified on Launch</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-navy-950">
                      Want priority access when registrations open?
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                      Leave your details below. We will send you an official alert as soon as the registration &amp; payment gateway goes live.
                    </p>

                    {notified ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-900 flex items-center gap-3"
                      >
                        <CheckCircle2 size={24} className="text-green-600 shrink-0" />
                        <div>
                          <p className="font-bold text-green-950">You&apos;re on the priority list!</p>
                          <p className="text-xs text-green-700 mt-0.5">
                            We will email <strong>{notifyEmail}</strong> immediately when registrations open.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleNotifySubmit} className="mt-4 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            type="text"
                            required
                            value={notifyName}
                            onChange={(e) => setNotifyName(e.target.value)}
                            placeholder="Your Full Name"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                          />
                          <input
                            type="email"
                            required
                            value={notifyEmail}
                            onChange={(e) => setNotifyEmail(e.target.value)}
                            placeholder="Your Official Email Address"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-navy-950 hover:bg-navy py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-md transition-all cursor-pointer hover:scale-[1.01]"
                        >
                          <Send size={15} />
                          <span>Notify Me When Registrations Start</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </Reveal>

            {/* ── WHAT'S INCLUDED IN THE PASS ── */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-[#E5E7EB] p-6 bg-white shadow-sm space-y-4">
                <h4 className="text-base font-bold text-navy-950 flex items-center gap-2">
                  <Award size={18} className="text-gold-700" />
                  What Every Delegate Pass Includes
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {PASS_PERKS.map((perk) => {
                    const Icon = perk.icon;
                    return (
                      <div key={perk.title} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <div className="p-2 rounded-md bg-white border border-gray-200 text-navy shrink-0 shadow-2xs">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-navy-950">{perk.title}</h5>
                          <p className="mt-0.5 text-[11px] text-gray-600 leading-relaxed">{perk.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>

          </div>

          {/* ── RIGHT COLUMN: Calculated Summary Assessment (5 cols) ── */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <Reveal delay={0.1}>
              <div className="group rounded-2xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-navy hover:shadow-lg">
                
                {/* Header Band */}
                <div className="bg-white p-5 text-navy-950 border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-900 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                      <Receipt size={14} className="text-gold-900" /> Pass Estimation
                    </span>
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-mono font-bold text-gray-700 border border-gray-200">
                      MCC-2026-FEE
                    </span>
                  </div>
                  <h4 className="mt-2 text-xl font-bold text-navy-950 tracking-tight">
                    Estimated Registration Fee
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Indian Institute of Technology Indore
                  </p>
                </div>

                {/* Body with Dynamic Calculations */}
                <div className="p-6 space-y-5 bg-white">
                  {/* Selected Tier Banner */}
                  <div className="rounded-xl bg-gray-50 p-4 border border-[#E5E7EB] flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-0.5">
                        Selected Participant Tier
                      </span>
                      <h5 className="text-sm font-bold text-navy-950">
                        {selectedCategory.name}
                      </h5>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {activeDuration.label}
                      </p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-navy-950">
                      ₹{basePassFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Itemized Line Items */}
                  <div className="space-y-3 pt-2 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                      Fee Breakdown &amp; Inclusions
                    </span>

                    {/* Participation Pass */}
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Check size={14} className="text-green-600 shrink-0" />
                        <span>Conference Pass ({activeDuration.label})</span>
                      </span>
                      <span className="font-mono font-bold text-gray-900">
                        ₹{basePassFee.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Accommodation Option */}
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="flex items-center gap-2">
                        <Hotel size={14} className="text-navy shrink-0" />
                        <span className="truncate max-w-[200px]" title={accommodationLabel}>
                          {accommodationLabel}
                        </span>
                      </span>
                      <span className="font-mono font-bold text-gray-900">
                        ₹{accommodationFee.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Grand Total Amount Sum */}
                  <div className="rounded-xl bg-white p-4 text-navy-950 flex items-center justify-between border-2 border-navy shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-navy-900 block">
                        Estimated Total Amount
                      </span>
                      <span className="text-xs text-gray-500">
                        Pass Fee + Accommodation
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-amber-950">
                      <Clock size={16} className="text-amber-700 shrink-0" />
                      <span>Registration Portal Opening Soon</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      Payment links and official registration forms will be enabled here shortly.
                    </p>
                  </div>

                  {/* Tax Invoice Note */}
                  <div className="space-y-3 pt-2 text-xs text-gray-500">
                    <div className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <FileCheck size={16} className="text-navy shrink-0 mt-0.5" />
                      <span>
                        Official receipts and GST invoices will be issued under the Department of Chemical Engineering, IIT Indore.
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                      <span>• Safe &amp; Direct Bank Gateway</span>
                      <span>• Official IIT Indore Portal</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Support box */}
            <div className="rounded-2xl border border-[#E5E7EB] p-4 bg-gray-50/70 text-xs text-gray-600 flex items-center gap-3 transition-all duration-300 hover:border-navy hover:shadow-md hover:bg-white">
              <HelpCircle size={22} className="text-navy shrink-0" />
              <div>
                <span className="font-bold text-navy-950 block">Need assistance or group registration?</span>
                <p className="mt-0.5">
                  Contact the Secretariat at{" "}
                  <a href="mailto:chemenggoffice@iiti.ac.in" className="text-navy font-semibold hover:underline">
                    chemenggoffice@iiti.ac.in
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/schedule"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-200 bg-white hover:border-navy text-xs font-semibold text-navy hover:shadow-xs transition-all text-center"
              >
                <span>View Schedule</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-200 bg-white hover:border-navy text-xs font-semibold text-navy hover:shadow-xs transition-all text-center"
              >
                <span>Contact Us</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
        </>
      )}

      </div>
    </>
  );
}
