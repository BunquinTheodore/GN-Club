"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
};

export function MagneticButton({ href, children, variant = "solid" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  // Elevation lives on interactive state only — never at rest, per the
  // brand's flat-card language. A real pixel offset + blur (not a
  // zero-offset halo) so hover/focus reads as the button lifting off the
  // page, while keeping the lime tint the glow used before.
  //
  // Bright glassmorphism, not murky glass: color-mix against the site's own
  // brand tokens (never a flat hex) for the translucent fill, blur +
  // saturate + brightness so the surface behind actually shows through, and
  // a soft top-edge inset highlight standing in for a light source above
  // the page. `relative overflow-hidden` pairs with the `.card-shine`
  // sweep span below — that overlay is oversized (inset: -60%/-30%) on
  // purpose, so it needs clipping or it bleeds out past the pill.
  const base =
    "relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium outline-none backdrop-blur-md backdrop-saturate-150 backdrop-brightness-110 transition-[filter,box-shadow,transform,background-color,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const styles =
    variant === "solid"
      ? "border border-lime/50 bg-[color-mix(in_srgb,var(--lime)_32%,transparent)] text-fog shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_10px_28px_-10px_rgba(198,242,78,0.55)] hover:border-lime/70 hover:bg-[color-mix(in_srgb,var(--lime)_42%,transparent)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_16px_36px_-10px_rgba(198,242,78,0.6)] focus-visible:border-lime/70 focus-visible:bg-[color-mix(in_srgb,var(--lime)_42%,transparent)] focus-visible:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_16px_36px_-10px_rgba(198,242,78,0.6)] active:bg-[color-mix(in_srgb,var(--lime)_48%,transparent)] active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]"
      : "border border-glass-border bg-[color-mix(in_srgb,var(--fog)_12%,transparent)] text-fog shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)] hover:border-lime/50 hover:bg-[color-mix(in_srgb,var(--fog)_18%,transparent)] hover:text-lime hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_14px_28px_-12px_rgba(198,242,78,0.3)] focus-visible:border-lime/50 focus-visible:bg-[color-mix(in_srgb,var(--fog)_18%,transparent)] focus-visible:text-lime focus-visible:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_14px_28px_-12px_rgba(198,242,78,0.3)] active:bg-[color-mix(in_srgb,var(--fog)_22%,transparent)] active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${styles}`}>
        <span className="card-shine" style={{ "--shine-delay": "0s" } as React.CSSProperties} />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </Link>
    </motion.div>
  );
}
