"use client";

import { m } from "framer-motion";
import { useContext, type CSSProperties, type ReactNode } from "react";
import { HorizontalScrollViewportContext } from "@/components/HorizontalScroll";

type PanelRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "up" | "left" | "right";
  /** Above-the-fold content: plays the same fade and slide as a CSS animation that runs from first
   * paint, instead of waiting for hydration to start it. Use for the first heading on a page. */
  eager?: boolean;
};

const offsets = {
  up: { x: 0, y: 40 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
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
export function PanelReveal({ children, delay = 0, className = "", from = "up", eager = false }: PanelRevealProps) {
  const viewportRef = useContext(HorizontalScrollViewportContext);
  const offset = offsets[from];

  if (eager) {
    return (
      <div
        className={`reveal-el gn-reveal-in ${className}`}
        style={
          {
            "--gn-x": `${offset.x}px`,
            "--gn-y": `${offset.y}px`,
            "--gn-delay": `${delay}s`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    );
  }

  return (
    <m.div
      className={`reveal-el ${className}`}
      initial={{ opacity: 0, x: offset.x, y: offset.y, scale: 0.97 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      // amount: 0 fires as soon as any part of the element is on-screen —
      // see the matching note in Reveal.tsx. .reveal-el also gets a CSS
      // print fallback in app/globals.css.
      viewport={{
        once: true,
        amount: 0,
        ...(viewportRef ? { root: viewportRef } : {}),
      }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}
