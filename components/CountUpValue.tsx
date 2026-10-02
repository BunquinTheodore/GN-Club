"use client";

import { useEffect, useRef, useState } from "react";

// Splits "150+" -> { prefix: "", number: 150, suffix: "+" } so only the
// numeric part animates while any leading/trailing characters stay static.
function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return { prefix: "", number: null as number | null, suffix: value };
  const [, prefix, digits, suffix] = match;
  return { prefix, number: Number(digits), suffix };
}

const DURATION_MS = 1400;
// Same curve the framer version used: cubic-bezier(0.16, 1, 0.3, 1).
const BEZIER = { x1: 0.16, y1: 1, x2: 0.3, y2: 1 } as const;

function bezierAxis(t: number, p1: number, p2: number) {
  const u = 1 - t;
  return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
}

/** Eased progress (0..1) for linear time progress `x`, solving the bezier's x(t) by bisection. */
function easeOut(x: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    if (bezierAxis(mid, BEZIER.x1, BEZIER.x2) < x) lo = mid;
    else hi = mid;
  }
  return bezierAxis((lo + hi) / 2, BEZIER.y1, BEZIER.y2);
}

type CountUpValueProps = {
  value: string;
  className?: string;
};

/**
 * Renders a stat value that counts up from 0 to its target number once it
 * scrolls into view. Shared by StatsBar and Hero so both animate the same
 * way. Values with no leading digits (e.g. "TBD") just render as-is.
 *
 * Uses IntersectionObserver and requestAnimationFrame directly rather than framer-motion's
 * animate/useInView, which kept the full animation engine in the first-load bundle for one counter.
 */
export function CountUpValue({ value, className }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, number, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (number === null || !node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const run = () => {
      if (reduceMotion) {
        setDisplay(number);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        setDisplay(Math.round(number * easeOut(progress)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // A small positive margin lets the value resolve as soon as it is laid out on screen instead
    // of requiring an extra scroll past the viewport edge (stats above the fold in the Hero).
    observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        run();
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    observer.observe(node);

    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [number]);

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
