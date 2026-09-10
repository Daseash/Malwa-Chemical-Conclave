"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  Award,
  ShieldCheck,
  ArrowRight,
  Lock,
  ExternalLink,
  AlertCircle,
  Clock,
  Sparkles,
  Download,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { PhotoUpload } from "@/components/PhotoUpload";
import { PaymentScreenshotUpload } from "@/components/PaymentScreenshotUpload";

type CategoryId = "iiti" | "external_student" | "academia" | "industry";
type DurationId = "1day" | "2days";
type FormStep = "details" | "payment_proof" | "confirmed";

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
    icon: FileCheck,
    title: "Hands-on Masterclasses",
    desc: "Interactive workshops on chemical safety, standards, and advanced modeling.",
  },
  {
    icon: FileCheck,
    title: "Delegate Kit & Collaterals",
    desc: "Conference bag, stationery, published abstracts, and standardisation guidelines.",
  },
  {
    icon: Building,
    title: "Networking & Hospitality",
    desc: "Networking lunches, high-tea sessions, and direct interactions with domain experts.",
  },
];

const PAYU_PAYMENT_URL = "https://payu.in/web/EB3AF4CBC22FB4C90B5ABC9A52E5CAC3";

export default function RegistrationPage() {
  // Step State
  const [currentStep, setCurrentStep] = useState<FormStep>("details");

  // Category & Tier Selection
  const [selectedCategory, setSelectedCategory] = useState<CategoryTier>(CATEGORIES[1]);
  const [selectedDurationId, setSelectedDurationId] = useState<DurationId>("2days");
  const [selectedAccommodationId, setSelectedAccommodationId] = useState<string>("none");
  const [isAccommodationChecked, setIsAccommodationChecked] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [designation, setDesignation] = useState("");
  const [message, setMessage] = useState("");

  // Delegate Photo (Base64)
  const [photo, setPhoto] = useState<string | undefined>(undefined);

  // Payment Proof
  const [paymentScreenshot, setPaymentScreenshot] = useState<string | undefined>(undefined);
  const [transactionId, setTransactionId] = useState("");

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedRegistrationId, setConfirmedRegistrationId] = useState<string | null>(null);

  // Form Validation Error for Step 1
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reference to the active PayU tab/window so delegates can return to it
  const payuWindowRef = useRef<Window | null>(null);

  // Check URL query and restore draft state from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("step") === "proof") {
        setCurrentStep("payment_proof");
      }

      try {
        const draft = sessionStorage.getItem("mcc_reg_draft");
        if (draft) {
          const p = JSON.parse(draft);
          if (p.fullName) setFullName(p.fullName);
          if (p.email) setEmail(p.email);
          if (p.phone) setPhone(p.phone);
          if (p.organization) setOrganization(p.organization);
          if (p.designation) setDesignation(p.designation);
          if (p.message) setMessage(p.message);
          if (p.photo) setPhoto(p.photo);
          if (p.selectedCategoryId) {
            const cat = CATEGORIES.find((c) => c.id === p.selectedCategoryId);
            if (cat) setSelectedCategory(cat);
          }
          if (p.selectedDurationId) setSelectedDurationId(p.selectedDurationId);
          if (p.isAccommodationChecked !== undefined) setIsAccommodationChecked(p.isAccommodationChecked);
          // Only restore step 2 if phone is 10 digits and email is valid
          const cleanPhone = (p.phone || "").replace(/\D/g, "");
          const cleanEmail = (p.email || "").trim().toLowerCase();
          const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
          const isIITIValid =
            p.selectedCategoryId !== "iiti" ||
            cleanEmail.endsWith("@iiti.ac.in") ||
            cleanEmail.endsWith(".iiti.ac.in") ||
            cleanEmail.endsWith("@gmail.com");

          if (p.currentStep === "payment_proof" && cleanPhone.length === 10 && isEmailValid && isIITIValid) {
            setCurrentStep("payment_proof");
          } else {
            setCurrentStep("details");
          }
        }
      } catch (err) {
        console.error("Draft restore error:", err);
      }
    }
  }, []);

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

  // Step 1: Proceed to Pay
  const handleProceedToPay = (e: FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!fullName.trim()) {
      setValidationError("Please enter your full name.");
      return;
    }
    const lowerEmail = email.trim().toLowerCase();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!lowerEmail || !EMAIL_REGEX.test(lowerEmail)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (selectedCategory.id === "iiti") {
      const isIITIOrGmail =
        lowerEmail.endsWith("@iiti.ac.in") ||
        lowerEmail.endsWith(".iiti.ac.in") ||
        lowerEmail.endsWith("@gmail.com");

      if (!isIITIOrGmail) {
        setValidationError("For the IIT Indore category, email must be @iiti.ac.in or @gmail.com.");
        return;
      }
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phoneDigits) {
      setValidationError("Please enter your contact phone number.");
      return;
    }
    if (phoneDigits.length !== 10) {
      setValidationError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!organization.trim()) {
      setValidationError("Please provide your institute, university, or organization name.");
      return;
    }
    if (!photo) {
      setValidationError("Please attach your delegate photo (upload or take a photo) for your conference badge.");
      return;
    }

    // Save draft state in sessionStorage so entered details and photo are never lost
    try {
      sessionStorage.setItem(
        "mcc_reg_draft",
        JSON.stringify({
          fullName,
          email,
          phone,
          organization,
          designation,
          message,
          photo,
          selectedCategoryId: selectedCategory.id,
          selectedDurationId,
          isAccommodationChecked,
          selectedAccommodationId,
          currentStep: "payment_proof",
        })
      );
    } catch (err) {
      console.error("Draft save error:", err);
    }

    // Open PayU official payment gateway in a named tab and store ref so user can return to it
    const payuWin = window.open(PAYU_PAYMENT_URL, "mcc_payu_portal");
    payuWindowRef.current = payuWin;

    // Transition this form to the locked view where payment screenshot must be uploaded
    setCurrentStep("payment_proof");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Switch / return to the PayU tab where payment was made
  const handleOpenPayUTab = (e: React.MouseEvent) => {
    e.preventDefault();
    if (payuWindowRef.current && !payuWindowRef.current.closed) {
      try {
        payuWindowRef.current.focus();
        return;
      } catch (err) {
        console.warn("Could not focus existing PayU tab:", err);
      }
    }
    const win = window.open(PAYU_PAYMENT_URL, "mcc_payu_portal");
    payuWindowRef.current = win;
    win?.focus();
  };

  // Step 2: Final Submit with Payment Screenshot
  const handleFinalSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!paymentScreenshot) {
      setSubmitError("Please upload your transaction screenshot or payment confirmation receipt.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        category: selectedCategory.name,
        organization: organization.trim(),
        designation: designation.trim(),
        duration: activeDuration.label,
        accommodation: accommodationLabel,
        totalAmount,
        photo,
        paymentScreenshot,
        transactionId: transactionId.trim(),
        message: message.trim(),
      };

      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to submit registration.";
        // Never show email or phone number validation errors in step 2; redirect to step 1 where they can be fixed
        if (
          errorMsg.toLowerCase().includes("phone") ||
          errorMsg.toLowerCase().includes("email") ||
          errorMsg.toLowerCase().includes("name") ||
          errorMsg.toLowerCase().includes("iit indore")
        ) {
          setCurrentStep("details");
          setValidationError(errorMsg);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        throw new Error(errorMsg);
      }

      setConfirmedRegistrationId(data.registrationId || `MCC-2026-${Math.floor(100000 + Math.random() * 900000)}`);
      setCurrentStep("confirmed");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        title="Registration"
        subtitle="Official delegate registration portal for Malwa Chemical Conclave 2026 at IIT Indore."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        
        {/* ── STEP PROGRESS BAR ── */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {/* Step 1 Indicator / Tab */}
            <div
              onClick={() => {
                if (currentStep === "payment_proof") {
                  setCurrentStep("details");
                }
              }}
              className={cn(
                "rounded-xl border bg-white p-3 transition-all duration-200 hover:border-navy",
                currentStep === "payment_proof" && "cursor-pointer hover:shadow-xs",
                currentStep === "details"
                  ? "border-navy text-navy font-bold shadow-xs ring-1 ring-navy/20"
                  : "border-gray-200 text-gray-500 hover:text-navy"
              )}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    currentStep === "details"
                      ? "bg-navy text-white"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  1
                </span>
                <span className="hidden sm:inline">Details &amp; Photo</span>
                <span className="sm:hidden">Details</span>
              </div>
            </div>

            {/* Step 2 Indicator / Tab */}
            <div
              className={cn(
                "rounded-xl border bg-white p-3 transition-all duration-200 hover:border-navy",
                currentStep === "payment_proof"
                  ? "border-navy text-navy font-bold shadow-xs ring-1 ring-navy/20"
                  : "border-gray-200 text-gray-500 hover:text-navy"
              )}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    currentStep === "payment_proof"
                      ? "bg-navy text-white"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  2
                </span>
                <span className="hidden sm:inline">Payment Proof</span>
                <span className="sm:hidden">Payment</span>
              </div>
            </div>

            {/* Step 3 Indicator / Tab */}
            <div
              className={cn(
                "rounded-xl border bg-white p-3 transition-all duration-200 hover:border-navy",
                currentStep === "confirmed"
                  ? "border-green-600 text-green-700 font-bold shadow-xs ring-1 ring-green-600/20"
                  : "border-gray-200 text-gray-500 hover:text-navy"
              )}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold transition-colors",
                    currentStep === "confirmed"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  )}
                >
                  3
                </span>
                <span>Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            STEP 1: DETAILS & TIER SELECTION & PHOTO
        ════════════════════════════════════════════════════════════════════ */}
        {currentStep === "details" && (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            
            {/* Left Column: Tiers + Personal Info Form + Photo (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Category Tier Selector Card */}
              <Reveal>
                <div className="rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 bg-white shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                        1
                      </span>
                      <h4 className="text-base font-bold text-navy-950">
                        Select Participant Category
                      </h4>
                    </div>
                    <span className="text-xs text-navy font-semibold">Step 1 of 2</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory.id === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat)}
                          className={cn(
                            "cursor-pointer rounded-2xl border p-4 transition-all duration-200 text-left flex flex-col justify-between bg-white shadow-xs hover:shadow-md",
                            isSelected
                              ? "border-navy shadow-md ring-2 ring-navy/20 bg-blue-50/20"
                              : "border-gray-200 hover:border-navy"
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
                                {isSelected ? "Selected" : "Choose"}
                              </span>
                            </div>
                            <h5 className="text-sm font-bold text-navy-950 leading-snug">
                              {cat.name}
                            </h5>
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
                            <span className="text-gray-500 font-normal">
                              {isSelected ? "Tier Selected" : "Click to select"}
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

                  {/* Sub-options: Duration & Accommodation */}
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5 space-y-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                      <Calendar size={14} className="text-navy" />
                      Participation Duration: <span className="text-navy">{selectedCategory.name}</span>
                    </span>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedCategory.durations.map((duration) => {
                        const isDurationSelected = selectedDurationId === duration.id;
                        return (
                          <div
                            key={duration.id}
                            onClick={() => setSelectedDurationId(duration.id)}
                            className={cn(
                              "cursor-pointer rounded-xl border p-4 transition-all text-left flex flex-col justify-between bg-white",
                              isDurationSelected
                                ? "border-navy shadow-sm ring-1 ring-navy"
                                : "border-gray-200 hover:border-navy"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <h6 className="text-sm font-bold text-navy-950">{duration.label}</h6>
                              <span className="font-mono text-base font-extrabold text-navy-950">
                                ₹{duration.amount}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{duration.sublabel}</p>
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

                    {/* Accommodation Section */}
                    {selectedCategory.accommodationType === "checkbox" && selectedCategory.accommodationOptions?.[0] && (
                      <div className="pt-4 border-t border-gray-200">
                        <label
                          onClick={() => setIsAccommodationChecked(!isAccommodationChecked)}
                          className={cn(
                            "cursor-pointer rounded-xl border p-4 transition-all flex items-start justify-between gap-4 bg-white",
                            isAccommodationChecked
                              ? "border-navy shadow-sm ring-1 ring-navy"
                              : "border-gray-200 hover:border-navy"
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
                              <p className="mt-0.5 text-xs text-gray-500">
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

                    {selectedCategory.accommodationType === "options" && selectedCategory.accommodationOptions && (
                      <div className="pt-4 border-t border-gray-200 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-navy-950 flex items-center gap-1.5">
                          <Hotel size={14} className="text-navy" /> Accommodation Preference
                        </span>
                        <div className="space-y-2">
                          {selectedCategory.accommodationOptions.map((opt) => {
                            const isOptSelected = selectedAccommodationId === opt.id;
                            return (
                              <div
                                key={opt.id}
                                onClick={() => setSelectedAccommodationId(opt.id)}
                                className={cn(
                                  "cursor-pointer rounded-xl border p-3.5 transition-all flex items-start justify-between gap-3 bg-white",
                                  isOptSelected
                                    ? "border-navy shadow-sm ring-1 ring-navy"
                                    : "border-gray-200 hover:border-navy"
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
                                    <span className="text-xs sm:text-sm font-bold text-navy-950">{opt.label}</span>
                                    <p className="text-[11px] sm:text-xs text-gray-500">{opt.sublabel}</p>
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
                  </div>
                </div>
              </Reveal>

              {/* Delegate Information Form & Photo Upload Card */}
              <Reveal delay={0.1}>
                <form
                  onSubmit={handleProceedToPay}
                  className="rounded-3xl border border-[#E5E7EB] p-6 sm:p-8 bg-white shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                        2
                      </span>
                      <h4 className="text-base font-bold text-navy-950">
                        Delegate Information &amp; Photo
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">Required for badge</span>
                  </div>

                  {/* Photo Upload Section */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-2">
                      Official Identification Photo <span className="text-red-500">*</span>
                    </label>
                    <PhotoUpload value={photo} onChange={setPhoto} />
                  </div>

                  {/* Text Fields */}
                  <div className="grid gap-4 sm:grid-cols-2 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Dr. Rajesh Kumar"
                          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                        {selectedCategory.id === "iiti" && (
                          <span className="text-[11px] font-normal text-navy ml-1">
                            (@iiti.ac.in or @gmail.com)
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={
                            selectedCategory.id === "iiti"
                              ? "e.g. name@iiti.ac.in or name@gmail.com"
                              : "e.g. rajesh@university.ac.in"
                          }
                          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                        />
                      </div>
                      {selectedCategory.id === "iiti" && email && !(email.toLowerCase().endsWith("@iiti.ac.in") || email.toLowerCase().endsWith(".iiti.ac.in") || email.toLowerCase().endsWith("@gmail.com")) && (
                        <p className="mt-1 text-[11px] text-red-500 font-medium">
                          Must end with @iiti.ac.in or @gmail.com
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Contact Phone Number (10 Digits) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={10}
                          pattern="[0-9]{10}"
                          value={phone}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setPhone(digitsOnly);
                          }}
                          placeholder="e.g. 9876543210"
                          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none font-mono"
                        />
                      </div>
                      {phone.length > 0 && phone.length < 10 && (
                        <p className="mt-1 text-[11px] text-amber-600 font-medium font-mono">
                          {phone.length}/10 digits entered
                        </p>
                      )}
                      {phone.length === 10 && (
                        <p className="mt-1 text-[11px] text-green-600 font-medium">
                          10 digits complete ✓
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Organization / College / Company <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Building size={15} className="absolute left-3.5 top-3.5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={organization}
                          onChange={(e) => setOrganization(e.target.value)}
                          placeholder="e.g. IIT Indore / Reliance / CSIR"
                          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Designation / Roll Number / Department (Optional)
                      </label>
                      <input
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. PhD Scholar / Assistant Professor / R&D Manager"
                        className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Special Dietary / Accessibility Notes (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Any dietary preferences, mobility support, or specific requirements..."
                        className="w-full rounded-xl border border-gray-300 bg-white py-2 px-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:border-navy focus:ring-2 focus:ring-navy/20 outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Validation Error Message */}
                  {validationError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Action Button: Proceed to Pay */}
                  <div className="pt-3 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy-950 hover:bg-navy py-4 px-6 text-sm font-bold text-white shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Proceed to Pay ₹{totalAmount.toLocaleString("en-IN")}</span>
                      <ExternalLink size={16} />
                    </button>
                    <p className="mt-2 text-center text-[11px] text-gray-500 font-medium">
                      * Take the screenshot of your payment *
                    </p>
                  </div>
                </form>
              </Reveal>

            </div>

            {/* Right Column: Compact Fee Calculation (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="bg-navy-950 px-5 py-3.5 text-white flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400">
                      <Receipt size={14} /> Fee Calculation
                    </span>
                    <span className="text-xs font-semibold text-gray-300">
                      {selectedCategory.badge}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-start justify-between text-gray-700">
                        <div className="pr-3">
                          <span className="font-semibold text-navy-950 block">{selectedCategory.name}</span>
                          <span className="text-[11px] text-gray-500">{activeDuration.label}</span>
                        </div>
                        <span className="font-mono font-bold text-navy-950 shrink-0 pt-0.5">
                          ₹{basePassFee.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {accommodationFee > 0 && (
                        <div className="flex items-start justify-between text-gray-700 pt-2 border-t border-gray-100">
                          <div className="pr-3">
                            <span className="font-semibold text-navy-950 block">Accommodation</span>
                            <span className="text-[11px] text-gray-500 truncate max-w-[200px] block" title={accommodationLabel}>
                              {accommodationLabel}
                            </span>
                          </div>
                          <span className="font-mono font-bold text-navy-950 shrink-0 pt-0.5">
                            ₹{accommodationFee.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Total Amount */}
                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-navy-950">
                        Total Amount
                      </span>
                      <span className="font-mono text-2xl font-extrabold text-navy-950">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STEP 2: LOCKED REVIEW & PAYMENT PROOF UPLOAD
            "all will be visible like what he selected but cannot be changed
             there he need to upload that screenshot dont add limit"
        ════════════════════════════════════════════════════════════════════ */}
        {currentStep === "payment_proof" && (
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-8">
              
              {/* Payment Instructions Header */}
              <div className="rounded-2xl border border-navy/20 bg-blue-50/50 p-5 text-navy-950 shadow-sm space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm font-semibold text-navy-950">
                    Complete your pass &amp; accommodation payment (₹{totalAmount.toLocaleString("en-IN")}) and attach the screenshot
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenPayUTab}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-navy-900 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Open PayU Portal</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 font-medium">
                  * Take the screenshot of your payment *
                </p>
              </div>

              {/* ── LOCKED / READ-ONLY REVIEW SUMMARY ── */}
              <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Lock size={16} className="text-navy" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-navy-950">
                      Your Selected Registration Details (Locked)
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("details")}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-navy cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Edit Details</span>
                  </button>
                </div>

                {/* Delegate Details Card (Locked) */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  {/* Delegate Photo Preview */}
                  {photo && (
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-navy bg-white shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt="Delegate Photo"
                        className="h-full w-full object-cover object-center"
                      />
                      <span className="absolute bottom-1 right-1 rounded-full bg-navy p-1 text-white shadow-xs">
                        <Lock size={10} />
                      </span>
                    </div>
                  )}

                  {/* Read-only Data Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs w-full">
                    <div>
                      <span className="text-gray-400 block text-[11px]">Delegate Name</span>
                      <span className="font-bold text-navy-950 text-sm">{fullName}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Email Address</span>
                      <span className="font-medium text-gray-800">{email}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Phone Number</span>
                      <span className="font-medium text-gray-800">{phone}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Organization / Institute</span>
                      <span className="font-medium text-gray-800">{organization}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Participant Category</span>
                      <span className="font-bold text-navy">{selectedCategory.name}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Pass Duration</span>
                      <span className="font-medium text-gray-800">{activeDuration.label}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Accommodation</span>
                      <span className="font-medium text-gray-800">{accommodationLabel}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block text-[11px]">Amount to Verify</span>
                      <span className="font-mono font-extrabold text-navy-950 text-base">
                        ₹{totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── ATTACH PAYMENT SCREENSHOT ── */}
                <form onSubmit={handleFinalSubmit} className="space-y-6 pt-4 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-950 mb-2">
                      Upload Payment Screenshot / Transaction Slip <span className="text-red-500">*</span>
                    </label>
                    <PaymentScreenshotUpload
                      value={paymentScreenshot}
                      onChange={setPaymentScreenshot}
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-2.5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Complete Registration Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !paymentScreenshot}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 py-3.5 px-6 text-sm font-bold text-white shadow-lg transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
                        (!paymentScreenshot || isSubmitting) && "opacity-75 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Completing Registration...</span>
                        </>
                      ) : (
                        <span>Complete Registration</span>
                      )}
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </Reveal>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            STEP 3: REGISTRATION CONFIRMED
        ════════════════════════════════════════════════════════════════════ */}
        {currentStep === "confirmed" && (
          <Reveal>
            <div className="mx-auto max-w-lg rounded-2xl border-2 border-navy bg-white p-6 sm:p-7 shadow-lg text-center space-y-4">
              {/* Success Icon */}
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-navy">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-navy-950">
                  Registration Confirmed
                </h3>
                <p className="mt-1 text-xs text-gray-600">
                  Thank you, <strong className="text-navy">{fullName}</strong>. Your registration details and payment proof have been recorded.
                </p>
              </div>

              {/* Registration Reference Card */}
              <div className="rounded-xl bg-gray-50 p-3.5 border border-gray-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Registration ID</span>
                  <span className="font-mono font-bold text-navy bg-white px-2 py-0.5 rounded border border-navy/20">
                    {confirmedRegistrationId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{selectedCategory.name}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{activeDuration.label}</span>
                </div>

                {accommodationFee > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Accommodation</span>
                    <span className="font-medium text-gray-900">{accommodationLabel}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-200 font-bold">
                  <span className="text-gray-700">Total Amount Paid</span>
                  <span className="font-mono text-navy-950">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem("mcc_reg_draft");
                    } catch (e) {
                      console.error(e);
                    }
                    window.location.href = "/registration";
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-navy hover:bg-navy-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer"
                >
                  <RotateCcw size={13} />
                  <span>New Registration</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 shadow-2xs transition-all cursor-pointer"
                >
                  <Download size={13} />
                  <span>Print Slip</span>
                </button>
              </div>

            </div>
          </Reveal>
        )}

      </div>
    </>
  );
}
