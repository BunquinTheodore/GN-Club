"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useContext, useRef, type ReactNode } from "react";
import { DuotoneImage } from "./DuotoneImage";
import { HorizontalScrollViewportContext } from "./HorizontalScroll";

type AlternatingRowProps = {
  image: string;
  alt: string;
  reverse?: boolean;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  imagePosition?: string;
};

export function AlternatingRow({
  image,
  alt,
  reverse,
  eyebrow,
  title,
  children,
  imagePosition,
}: AlternatingRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  // When rendered inside a HorizontalScroll panel, this row sits inside the
  // sticky-pinned, overflow-hidden viewport that HorizontalScroll pans via
  // `transform: translateX`. Position:sticky keeps the row's vertical
  // bounding rect frozen relative to the window for the entire scroll-jack
  // duration (translateX only moves it horizontally), so a
  // getBoundingClientRect-based useScroll (the default, target-only mode)
  // never progresses - the parallax would freeze instead of animating,
  // which reads as broken/desynced. Detect that case via context and fall
  // back to a static (no parallax) position; entrance motion in that case
  // is instead handled by PanelReveal at the call site. Outside of a
  // HorizontalScroll panel (context is null - normal vertical flow) the
  // scroll-linked parallax below works exactly as before.
  const insideHorizontalPanel = useContext(HorizontalScrollViewportContext) !== null;
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageYScroll = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const panelYScroll = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const parallaxDisabled = insideHorizontalPanel || prefersReducedMotion;
  const imageY = parallaxDisabled ? 0 : imageYScroll;
  const panelY = parallaxDisabled ? 0 : panelYScroll;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div
        style={{ y: imageY }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-72 overflow-hidden rounded-2xl shadow-none transition-shadow duration-500 ease-out hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] md:h-[420px]"
      >
        <DuotoneImage src={image} alt={alt} position={imagePosition} />
      </motion.div>

      <motion.div style={{ y: panelY }}>
        {eyebrow ? <p className="text-sm font-medium text-fog-dim">{eyebrow}</p> : null}
        <h2 className="text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">{title}</h2>
        <div className="mt-4 max-w-[62ch] space-y-4 text-base leading-relaxed text-fog-dim">{children}</div>
      </motion.div>
    </div>
  );
}
