"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DuotoneImage } from "./DuotoneImage";

type AlternatingRowProps = {
  image: string;
  alt: string;
  reverse?: boolean;
  eyebrow?: string;
  title: string;
  children: ReactNode;
};

export function AlternatingRow({ image, alt, reverse, title, children }: AlternatingRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const panelY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div style={{ y: imageY }} className="relative h-72 overflow-hidden rounded-3xl md:h-[420px]">
        <DuotoneImage src={image} alt={alt}  />
      </motion.div>

      <motion.div style={{ y: panelY }}>
        <h2 className="font-display text-3xl tracking-tight text-fog sm:text-4xl">{title}</h2>
        <div className="mt-4 space-y-4 text-base leading-relaxed text-fog-dim">{children}</div>
      </motion.div>
    </div>
  );
}
