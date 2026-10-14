"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

type PulsingDotProps = {
  className?: string;
  /** Diameter in px (also drives the halo spread). Default 6. */
  size?: number;
};

/**
 * Small brand dot whose halo breathes (expands & contracts) via GSAP.
 * Used at 4px in the eyebrows (hero + "Nuestros clientes") and the navbar
 * dropdown cards. Respects prefers-reduced-motion.
 *
 * The halo is a child disc animated with transform/opacity (compositable)
 * instead of the original box-shadow spread, which forced a repaint on every
 * frame of the infinite loop (Lighthouse "non-composited animations", 31-ago).
 * Equivalence: a spread of S px with alpha A equals the disc scaled to
 * 1 + 2S/size at opacity A — same ring, zero paint work.
 */
export default function PulsingDot({ className, size = 6 }: PulsingDotProps) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduce || !dotRef.current || !haloRef.current) return;

      const breath = {
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      } as const;
      gsap.to(dotRef.current, { scale: 1.35, ...breath });
      gsap.to(haloRef.current, { scale: 3, opacity: 0, ...breath });
    },
    { scope: dotRef, dependencies: [size] },
  );

  return (
    <span
      ref={dotRef}
      aria-hidden
      className={`relative inline-block ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <span
        ref={haloRef}
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(67, 27, 68, 0.35)" }}
      />
      <span className="absolute inset-0 rounded-full bg-plum" />
    </span>
  );
}
