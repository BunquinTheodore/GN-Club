"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
};

const offsets = {
  up: { x: 0, y: 40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export function Reveal({ children, delay = 0, className = "", from = "up" }: RevealProps) {
  const offset = offsets[from];
  return (
    <motion.div
      className={`reveal-el ${className}`}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      // amount: 0 fires as soon as any part of the element is on-screen,
      // instead of requiring a further ~10% scroll past its edge — content
      // was sitting invisible-but-occupying-space for longer than it needed
      // to. The .reveal-el class also gets a CSS print fallback (see
      // app/globals.css) since a JS-gated whileInView never fires when the
      // page is rendered for print/PDF rather than scrolled.
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
