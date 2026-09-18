"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HorizontalScrollViewportContext } from "@/components/HorizontalScroll";

export type ScrollJackPanel = {
  /** Shown as the pagination dot's aria-label — keep it short. */
  label: string;
  content: ReactNode;
};

const PAGINATION_DOT_COLOR_ACTIVE = "var(--lime)";

function emptySubscribe() {
  return () => {};
}

/** True once mounted on the client, false during SSR/first render — avoids a hydration mismatch. */
function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type ScrollJackTrackProps = {
  panels: ScrollJackPanel[];
  className?: string;
};

/**
 * Pins the viewport and pans a row of full-width panels horizontally as the
 * page scrolls vertically — "scroll down" reads as "pan right". Panels are
 * `overflow-hidden` (not scrollable) by design — an `overflow-y-auto` panel
 * captures the mouse wheel the instant it has even a few px of overflow,
 * which stalls the horizontal pan. Keep each panel's content sized to fit
 * one viewport instead of relying on inner scroll.
 *
 * Falls back to a plain vertical stack on mobile, reduced-motion, or a
 * single panel, so touch scrolling and screen readers never fight a
 * transform-driven track. Scoped to whichever page renders it — this does
 * not affect the shared <HorizontalScroll> (used elsewhere as a plain
 * vertical stack).
 */
export function ScrollJackTrack({ panels, className = "" }: ScrollJackTrackProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  const mounted = useIsMounted();

  const useJack = mounted && isDesktop && !prefersReducedMotion && panels.length > 1;

  if (!useJack) {
    return (
      <div className={`flex flex-col ${className}`}>
        {panels.map((panel, i) => (
          <div key={i} className="w-full">
            {panel.content}
          </div>
        ))}
      </div>
    );
  }

  return <Track panels={panels} className={className} />;
}

// Extra scroll distance appended after the last panel's nominal position,
// in vh. The spring below trails the raw scroll input by design (that's
// what makes it feel smooth) — but with zero slack at the end, the sticky
// pin released at the exact scroll position the spring was still catching
// up to, so a fast scroll left the final panel (typically the gallery)
// visibly mid-pan and cropped, with no way to scroll back to a settled
// view. This buffer gives the spring real time to reach the last panel
// before the pin actually releases.
const END_BUFFER_VH = 45;

function Track({ panels, className }: { panels: ScrollJackPanel[]; className: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const panelsVh = panels.length * 100;
  const trackVh = panelsVh + END_BUFFER_VH;
  // Fraction of the track's total scroll distance during which the panel
  // position actually advances — the remaining END_BUFFER_VH worth of
  // scroll holds scrollYProgress (and so rawProgress, clamped below) at its
  // max while still pinned, purely to let the spring settle.
  const panelsFraction = panelsVh / trackVh;

  // Vertical scroll of the tall track is the single source of truth —
  // wheel, trackpad, and the browser's own scrollbar all drive
  // scrollYProgress natively. We spring a numeric "panel position"
  // (0..panels.length-1) rather than the CSS percentage string directly,
  // both for a smoother glide (tuned closer to critical damping than the
  // previous heavily-overdamped spring, which lagged noticeably behind
  // fast scroll input) and so each panel can derive its own opacity/scale
  // from that same value below — panels ease in as they approach the
  // active position instead of popping to full opacity the instant the
  // math rounds to "active".
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(scrollYProgress, [0, panelsFraction], [0, panels.length - 1]);
  const progress = useSpring(rawProgress, { stiffness: 170, damping: 26, mass: 0.5 });
  const x = useTransform(progress, (v) => `${-v * 100}%`);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const panelProgress = Math.min(1, latest / panelsFraction) * (panels.length - 1);
    const idx = Math.min(panels.length - 1, Math.max(0, Math.round(panelProgress)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (["ArrowRight", "PageDown", "ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === "ArrowRight" || event.key === "PageDown" ? 1 : -1;
      window.scrollBy({ top: direction * window.innerHeight, behavior: "smooth" });
    }
  }

  function goToIndex(i: number) {
    const el = trackRef.current;
    if (!el || panels.length <= 1) return;
    const targetProgress = (i / (panels.length - 1)) * panelsFraction;
    const top = el.offsetTop + targetProgress * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: `${trackVh}vh` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Horizontal scroll section"
    >
      {/* Sticky pinned viewport: stays fixed on screen for the whole tall
          track below, while `x` pans its contents horizontally as the user
          scrolls vertically past the track. */}
      <div ref={viewportRef} className="sticky top-0 h-screen overflow-hidden">
        <HorizontalScrollViewportContext.Provider value={viewportRef}>
          <motion.div className="flex h-full" style={{ x, willChange: "transform" }}>
            {panels.map((panel, i) => (
              <PanelFrame key={i} index={i} progress={progress}>
                {panel.content}
              </PanelFrame>
            ))}
          </motion.div>
        </HorizontalScrollViewportContext.Provider>
      </div>

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        {panels.map((panel, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Go to ${panel.label}`}
            className="pointer-events-auto h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? "1.5rem" : "0.375rem",
              background: i === activeIndex ? PAGINATION_DOT_COLOR_ACTIVE : "rgba(255,255,255,0.25)",
              boxShadow: i === activeIndex ? "0 0 12px var(--lime)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * One panel's slot in the track. Derives its own opacity/scale from the
 * shared spring value (`progress`) instead of just sitting at flat 1/1 —
 * the panel currently under focus reads as sharp and full-strength while
 * its neighbors recede slightly, so the horizontal pan reads as a designed
 * transition between panels rather than a flat filmstrip being dragged
 * sideways.
 */
function PanelFrame({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  const distance = useTransform(progress, (v) => Math.abs(v - index));
  const opacity = useTransform(distance, [0, 1], [1, 0.45]);
  const scale = useTransform(distance, [0, 1], [1, 0.96]);

  return (
    <motion.div
      // w-full (not w-screen) so each panel's actual rendered width matches
      // the pinned viewport's real width — the viewport is a normal block
      // box inside the sidebar-padded body, not the full window, so it's
      // narrower than 100vw by the sidebar's width on desktop. A w-screen
      // panel used to overflow that box; translateX(-N * 100%), a
      // percentage of the row's own (correctly-sized) box, then undershot
      // by the difference on every step, worse with each panel — by the
      // last panel on a page with several, it was visibly cropped.
      className="h-full w-full flex-shrink-0 overflow-hidden"
      style={{ opacity, scale, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
