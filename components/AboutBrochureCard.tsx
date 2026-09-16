"use client";

import { useState } from "react";
import { FileText, Eye, Download, ExternalLink, Sparkles } from "lucide-react";
import { BrochureModal } from "@/components/BrochureModal";

export function AboutBrochureCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="institutional-card overflow-hidden border-2 border-navy/20 bg-gradient-to-br from-navy-50/80 via-white to-gold-50/40 p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                <FileText size={13} /> Official Prospectus
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gold-900 bg-gold-100/70 px-2 py-0.5 rounded-full">
                <Sparkles size={11} /> 2026 Edition
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
              Malwa Chemical Conclave Brochure
            </h3>

            <p className="text-xs sm:text-sm font-medium text-gray-700 leading-relaxed">
              Read and download the comprehensive conclave guide — covering the 7 strategic verticals, keynote schedules, BIS standardisation frameworks, sponsorship tiers, and academic participation details.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-navy hover:bg-navy-900 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <Eye size={16} />
              <span>View Brochure</span>
            </button>

            <a
              href="/mcc-2026-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-navy/30 bg-white hover:bg-navy-50 px-4 py-3 text-xs sm:text-sm font-bold text-navy shadow-xs transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <ExternalLink size={15} />
              <span>Open PDF</span>
            </a>

            <a
              href="/mcc-2026-brochure.pdf"
              download="MCC 2026 Brochure.pdf"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-100 p-3 text-gray-700 shadow-xs transition-all duration-300 cursor-pointer"
              title="Download Brochure PDF"
            >
              <Download size={16} />
            </a>
          </div>
        </div>
      </div>

      <BrochureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
