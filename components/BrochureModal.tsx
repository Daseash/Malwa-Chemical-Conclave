"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROCHURE_PAGES = [
  { page: 1, title: "Cover & Overview", src: "/brochure/page-1.jpg" },
  { page: 2, title: "Conclave Structure & Verticals", src: "/brochure/page-2.jpg" },
  { page: 3, title: "Sponsors & Contact", src: "/brochure/page-3.jpg" },
];

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Floating Top Controls */}
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
            <a
              href="/mcc-2026-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy/90 hover:bg-navy text-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-lg border border-white/20 backdrop-blur-md transition-all hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} /> Open PDF
            </a>
            <a
              href="/mcc-2026-brochure.pdf"
              download="MCC 2026 Brochure.pdf"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-950/90 hover:bg-navy-900 text-gold px-3.5 py-2 text-xs font-bold uppercase tracking-wider shadow-lg border border-gold/40 backdrop-blur-md transition-all hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={14} /> Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white shadow-lg border border-white/30 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Container (Outside clicks close, outside scrolling scrolls brochure) */}
          <div
            className="min-h-full w-full flex flex-col items-center py-10 sm:py-16 px-3 sm:px-6 cursor-pointer"
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 15 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl flex flex-col gap-6 sm:gap-8 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {BROCHURE_PAGES.map((page) => (
                <div
                  key={page.page}
                  className="rounded-xl overflow-hidden shadow-2xl bg-white border border-white/20"
                >
                  <img
                    src={page.src}
                    alt={`MCC 2026 Brochure Page ${page.page}`}
                    className="w-full h-auto object-contain block select-none"
                    loading="eager"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
