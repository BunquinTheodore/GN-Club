"use client";

import { motion } from "framer-motion";
import { useContext, type ReactNode } from "react";
import { HorizontalScrollViewportContext } from "@/components/HorizontalScroll";

type PanelRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
};

const offsets = {
  up: { x: 0, y: 32 },
  left: { x: -32, y: 0 },
  right: { x: 32, y: 0 },
};

/**
 * Drop-in replacement for <Reveal> for content living inside a
 * <HorizontalScroll> panel. Same fade + slide-in visuals as Reveal, but
 * points whileInView's viewport root at the pinned, overflow-hidden
 * viewport element HorizontalScroll provides via context - the default
 * (window) IntersectionObserver root doesn't reliably fire once content is
 * being panned horizontally via a transform inside overflow:hidden.
 *
 * Outside of a HorizontalScroll (e.g. the mobile vertical-stack fallback,
 * or anywhere else in the app) the context is null and this behaves
 * exactly like Reveal, checking visibility against the window.
 */
export function PanelReveal({ children, delay = 0, className = "", from = "up" }: PanelRevealProps) {
  const viewportRef = useContext(HorizontalScrollViewportContext);
  const offset = offsets[from];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once: true,
        margin: "-10% 0px",
        ...(viewportRef ? { root: viewportRef } : {}),
      }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
