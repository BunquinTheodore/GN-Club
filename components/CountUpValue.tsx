"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";

// Splits "150+" -> { prefix: "", number: 150, suffix: "+" } so only the
// numeric part animates while any leading/trailing characters stay static.
function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { prefix: "", number: null as number | null, suffix: value };
  const [, prefix, digits, suffix] = match;
  return { prefix, number: Number(digits), suffix };
}

type CountUpValueProps = {
  value: string;
  className?: string;
};

/**
 * Renders a stat value that counts up from 0 to its target number once it
 * scrolls into view. Shared by StatsBar and Hero so both animate the same
 * way. Values with no leading digits (e.g. "TBD") just render as-is.
 */
export function CountUpValue({ value, className }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // A small positive margin (rather than a negative one) lets the value
  // resolve as soon as it's laid out on screen instead of requiring an
  // extra scroll past the viewport edge — otherwise stats above the fold
  // (e.g. in the Hero) can sit at "0" through a slow/janky mobile scroll,
  // a fast anchor jump, or a full-page capture that doesn't replay scroll.
  const isInView = useInView(ref, { once: true, margin: "0px 0px 200px 0px" });
  const reduceMotion = useReducedMotion();
  const { prefix, number, suffix } = parseValue(value);
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (number === null || !isInView) return;

    const controls = animate(motionValue, number, {
      duration: reduceMotion ? 0 : 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, number, motionValue, reduceMotion]);

  // Tabular numerals so digits occupy a fixed width as they count up —
  // without this, proportional digits (e.g. "1" vs "8") shift the whole
  // string's width every frame, which reads as jittery instead of premium.
  const numericClassName = `tabular-nums ${className ?? ""}`.trim();

  if (number === null) {
    return (
      <span ref={ref} className={className}>
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={numericClassName}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
