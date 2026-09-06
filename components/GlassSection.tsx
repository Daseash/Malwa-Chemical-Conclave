import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Clean institutional section wrapper without AI blur blobs.
 */
export function GlassSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative py-12 sm:py-16", className)}>
      {children}
    </section>
  );
}

/**
 * Clean institutional white card with crisp 1px border and soft shadow.
 */
export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "institutional-card rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_25px_-5px_rgba(0,35,80,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-[0_20px_35px_-8px_rgba(0,47,108,0.16)]",
        className
      )}
    >
      {children}
    </div>
  );
}

