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
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium outline-none backdrop-blur-md backdrop-saturate-150 transition-[filter,box-shadow,transform,background-color,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const styles =
    variant === "solid"
      ? "border border-lime/40 bg-lime/25 text-fog shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] hover:border-lime/60 hover:bg-lime/35 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(198,242,78,0.45)] focus-visible:border-lime/60 focus-visible:bg-lime/35 focus-visible:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_14px_32px_-10px_rgba(198,242,78,0.45)] active:bg-lime/40 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
      : "border border-glass-border bg-glass text-fog shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-lime/50 hover:bg-glass-strong hover:text-lime hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_14px_28px_-12px_rgba(198,242,78,0.25)] focus-visible:border-lime/50 focus-visible:bg-glass-strong focus-visible:text-lime focus-visible:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_14px_28px_-12px_rgba(198,242,78,0.25)] active:bg-glass-strong active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]";

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
        {children}
      </Link>
    </motion.div>
  );
}
