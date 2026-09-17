"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { timeline } from "@/lib/timeline";

export function CompanyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div ref={ref} className="relative space-y-10 pl-8 sm:space-y-12">
      <div className="absolute top-0 left-0 h-full border-l border-glass-border" />
      <motion.div
        className="absolute top-0 left-0 w-px origin-top bg-lime/70"
        style={{ height: "100%", scaleY: reduceMotion ? 1 : lineProgress }}
      />
      {timeline.map((milestone, i) => (
        <motion.div
          key={milestone.year}
          initial={reduceMotion ? false : { opacity: 0.5, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-[10px] w-[10px] rounded-full bg-lime" />
          <p className="font-display text-sm tabular-nums text-lime">{milestone.year}</p>
          <p className="mt-1.5 font-display text-xl text-fog sm:text-2xl">{milestone.title}</p>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-fog-dim">
            {milestone.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
