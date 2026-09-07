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

  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "solid"
      ? "bg-lime text-ink hover:bg-fog"
      : "border border-glass-border text-fog hover:border-lime/60 hover:text-lime";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="inline-block"
    >
      <Link href={href} className={`${base} ${styles}`}>
        {children}
      </Link>
    </motion.div>
  );
}
