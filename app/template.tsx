"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Next.js re-mounts template.tsx (unlike layout.tsx, which persists) on
 * every navigation, so this is the lightweight way to give route changes a
 * soft fade-in instead of a hard cut — no AnimatePresence/exit-animation
 * plumbing needed for that. Kept short (0.35s) so it reads as a polish
 * detail on every click, not a loading delay.
 */
export default function Template({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
