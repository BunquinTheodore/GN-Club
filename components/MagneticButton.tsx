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
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium outline-none transition-[filter,box-shadow,transform] duration-300 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
  const styles =
    variant === "solid"
      ? "bg-lime text-ink hover:brightness-110 hover:shadow-[0_14px_32px_-10px_rgba(198,242,78,0.55)] focus-visible:shadow-[0_14px_32px_-10px_rgba(198,242,78,0.55)] active:brightness-95 active:shadow-[0_6px_16px_-10px_rgba(198,242,78,0.4)]"
      : "border border-glass-border text-fog hover:border-lime/60 hover:text-lime hover:shadow-[0_14px_28px_-12px_rgba(198,242,78,0.25)] focus-visible:border-lime/60 focus-visible:text-lime focus-visible:shadow-[0_14px_28px_-12px_rgba(198,242,78,0.25)] active:shadow-[0_6px_14px_-10px_rgba(198,242,78,0.18)]";

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
