"use client";

import {
  Children,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Context that exposes the pinned, overflow-hidden "viewport" element that
 * panels are panned inside of on desktop. PanelReveal reads this and, when
 * present, points framer-motion's `whileInView` at it instead of the window
 * (whileInView's default IntersectionObserver root doesn't reliably fire for
 * content that is being panned via a transform inside an overflow:hidden
 * ancestor). On mobile / reduced-motion this context is never provided, so
 * PanelReveal falls back to the window viewport, which works natively for
 * the plain vertical stack.
 */
export const HorizontalScrollViewportContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

type PanelProps = {
  /**
   * Panel width as a CSS length, e.g. "150vw" for a wide panel (default is
   * "100vw"). Only meaningful on desktop/scroll-jack mode - on the mobile
   * vertical-stack fallback every panel is simply full-width in normal flow.
   */
  width?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Per-panel width override.
 *
 * Convention: wrap any direct child of <HorizontalScroll> in
 * <HorizontalScroll.Panel width="150vw"> ... </HorizontalScroll.Panel> to
 * make that one panel wider than the default 100vw (e.g. a portfolio grid
 * that needs more horizontal room). Children of <HorizontalScroll> that are
 * NOT wrapped in Panel are treated as ordinary 100vw-wide panels.
 */
function Panel({ children }: PanelProps) {
  // Marker component - HorizontalScroll inspects child.type === Panel to
  // read the `width` prop back out. It never renders directly on its own.
  return <>{children}</>;
}

function isPanelElement(node: unknown): node is ReactElement<PanelProps> {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node as ReactElement).type === Panel
  );
}

const PAGINATION_DOT_COLOR_ACTIVE = "var(--lime)";

function emptySubscribe() {
  return () => {};
}

/**
 * True once the component has committed on the client, false during SSR and
 * the first client render (so hydration output matches). Implemented via
 * useSyncExternalStore instead of a setState-in-effect so React doesn't
 * schedule an extra cascading render for this bit of state.
 */
function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  // Avoid a hydration flash: only commit to the scroll-jack layout once
  // we're mounted on the client and know both media query results.
  const mounted = useIsMounted();

  const panels = useMemo(() => Children.toArray(children), [children]);

  const useScrollJack = mounted && isDesktop && !prefersReducedMotion && panels.length > 1;

  if (!useScrollJack) {
    // Mobile, reduced-motion, or a single panel: plain vertical stack, no
    // tall track / sticky / transform in the DOM at all.
    return (
      <div className={`flex flex-col ${className}`}>
        {panels.map((panel, i) => (
          <div key={i} className="w-full">
            {isPanelElement(panel) ? panel.props.children : panel}
          </div>
        ))}
      </div>
    );
  }

  return <ScrollJackTrack panels={panels} className={className} />;
}

function ScrollJackTrack({
  panels,
  className,
}: {
  panels: ReactNode[];
  className: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const [travel, setTravel] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Vertical scroll of the tall track (below) is the single source of
  // truth: mouse wheel, trackpad two-finger scroll (vertical), and the
  // browser's own scrollbar all drive scrollYProgress natively - no manual
  // wheel-event capture needed. We just map that progress to a horizontal
  // translateX, so "scrolling down" reads as "panning right".
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 260, damping: 40, mass: 0.6 });

  useEffect(() => {
    function measure() {
      const row = rowRef.current;
      const viewport = viewportRef.current;
      if (!row || !viewport) return;
      setTravel(Math.max(0, row.scrollWidth - viewport.clientWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [panels.length]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(panels.length - 1, Math.max(0, Math.round(latest * (panels.length - 1))));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.key === "ArrowRight" ||
      event.key === "PageDown" ||
      event.key === "ArrowLeft" ||
      event.key === "PageUp"
    ) {
      event.preventDefault();
      const direction = event.key === "ArrowRight" || event.key === "PageDown" ? 1 : -1;
      window.scrollBy({ top: direction * window.innerHeight, behavior: "smooth" });
    }
  }

  function goToIndex(i: number) {
    const el = trackRef.current;
    if (!el || panels.length <= 1) return;
    const targetProgress = i / (panels.length - 1);
    const top = el.offsetTop + targetProgress * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div
      ref={trackRef}
      className={`relative ${className}`}
      style={{ height: `${panels.length * 100}vh` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Horizontal scroll section"
    >
      {/* Sticky pinned viewport: stays fixed on screen for the whole tall
          track below, while `x` pans its contents horizontally as the user
          scrolls vertically past the track. overflow-hidden clips panels
          that haven't been scrolled into view yet - there is no native
          horizontal scrollbar/draggable element here by design. */}
      <div ref={viewportRef} className="sticky top-0 h-screen overflow-hidden">
        <HorizontalScrollViewportContext.Provider value={viewportRef}>
          <motion.div ref={rowRef} className="flex h-full" style={{ x }}>
            {panels.map((panel, i) => {
              const width = isPanelElement(panel) ? (panel.props.width ?? "100vw") : "100vw";
              const content = isPanelElement(panel) ? panel.props.children : panel;
              const panelClassName = isPanelElement(panel) ? (panel.props.className ?? "") : "";
              return (
                <div
                  key={i}
                  className={`h-full flex-shrink-0 ${panelClassName}`}
                  style={{ width }}
                >
                  {content}
                </div>
              );
            })}
          </motion.div>
        </HorizontalScrollViewportContext.Provider>
      </div>

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 gap-2">
        {panels.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Go to panel ${i + 1}`}
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

HorizontalScroll.Panel = Panel;
