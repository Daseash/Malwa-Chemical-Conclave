"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AboutHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Strictly enforce muted property for full browser autoplay compliance
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Fallback catch if browser enforces user interaction
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[85vh] min-h-[380px] overflow-hidden bg-navy-950 border-b border-[#002F6C] shadow-md">
      {/* ── Smooth Horizontal Slide-in / Reveal Animation (Right to Left) ── */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <video
          ref={videoRef}
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{
            transform: "translate3d(0, 0, 0)",
            WebkitTransform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/20 pointer-events-none" />
      </motion.div>
    </section>
  );
}
