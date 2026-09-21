"use client";

import {
  useEffect,
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

/**
 * Guards a fresh visit to this page against landing mid-track instead of at
 * the top.
 *
 * Case-study/service pages are opened from a preview Dialog (see
 * PortfolioGrid) that applies Base UI's scroll lock while it's open. That
 * lock restores the *document's* scroll position — captured when the dialog
 * opened, from whatever the referring page (home, /work) was scrolled to —
 * once the dialog finishes its close transition. Because the whole previous
 * page (including the dialog) unmounts as part of navigating away, that
 * restore doesn't fire until after Next.js has already committed the new
 * route and reset scroll to 0, so it silently snaps the *new* page back down
 * to the old page's scroll offset a couple hundred ms later. On a normal
 * page that's a small, easy-to-miss jump; on a tall pinned ScrollJackTrack
 * (2-4x viewport height) that same offset lands mid-pan, typically on the
 * gallery panel, looking like the link ignored the "go to top" expectation
 * entirely.
 *
 * We can't fix the timing of a third-party scroll lock we don't own, so
 * instead we watch for it: force scroll to 0 on mount, then keep watching
 * for just over a second. If scroll drifts away from 0 *and* the visitor
 * hasn't actually scrolled/panned themselves in the meantime, that drift can
 * only be the stray restore landing late — snap it back. A visitor who
 * genuinely scrolled is left alone. The reset is an instant `scrollTop`
 * assignment rather than `scrollTo`, since this site sets a global
 * `scroll-behavior: smooth` on <html> — animating "back" to the top a beat
 * after landing mid-page would look worse than the bug it's fixing.
 */
function useLandOnTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let interacted = false;
    const markInteracted = () => {
      interacted = true;
    };
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("wheel", markInteracted, opts);
    window.addEventListener("touchmove", markInteracted, opts);
    window.addEventListener("keydown", markInteracted);
    // Dragging the native scrollbar thumb doesn't fire wheel/touchmove/
    // keydown, so without this the poll below fights a legitimate
    // scrollbar drag for up to 1.2s. pointerdown only fires from a real
    // input device, never from our own programmatic `snapToTop()` scroll,
    // so it's safe to treat as genuine interaction.
    window.addEventListener("pointerdown", markInteracted);

    function snapToTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    snapToTop();

    // Poll for ~3s rather than checking once at a fixed delay — the exact
    // timing of the stray restore isn't something we control, and 1.2s
    // measured too tight in practice: instrumenting window.scrollY across
    // repeated real navigations showed the restore sometimes landing after
    // that cutoff (worse under dev-mode/HMR overhead), which let it slip
    // through the old window and land the track mid-pan. A visitor who
    // actually wants to scroll within 3s of arriving cancels this via the
    // `interacted` flag on their first wheel/touch/key/pointerdown, so the
    // wider margin costs nothing for a genuine scroll.
    const start = performance.now();
    let frameId = requestAnimationFrame(function tick() {
      if (!interacted && window.scrollY !== 0) {
        snapToTop();
      }
      if (!interacted && performance.now() - start < 3000) {
        frameId = requestAnimationFrame(tick);
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("wheel", markInteracted);
      window.removeEventListener("touchmove", markInteracted);
      window.removeEventListener("keydown", markInteracted);
      window.removeEventListener("pointerdown", markInteracted);
    };
  }, []);
}

type ScrollJackTrackProps = {
  panels: ScrollJackPanel[];
  className?: string;
  /**
   * Rendered once behind the whole pinned viewport (desktop) or behind the
   * stacked fallback (mobile/reduced-motion), instead of each panel
   * re-rendering its own copy of the hero image at a different opacity.
   * Typically a <PersistentPanelBackground />. Panels layer their own
   * scrim on top of this for text legibility — they no longer own the
   * photo itself.
   */
  background?: ReactNode;
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
export function ScrollJackTrack({ panels, className = "", background }: ScrollJackTrackProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = useReducedMotion();
  const mounted = useIsMounted();

  useLandOnTop();

  const useJack = mounted && isDesktop && !prefersReducedMotion && panels.length > 1;

  if (!useJack) {
    return (
      <div className={`relative flex flex-col ${className}`}>
        {background && <div className="absolute inset-0 z-0">{background}</div>}
        <div className="relative z-10 flex flex-col">
          {panels.map((panel, i) => (
            <div key={i} className="w-full">
              {panel.content}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <Track panels={panels} className={className} background={background} />;
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

function Track({
  panels,
  className,
  background,
}: {
  panels: ScrollJackPanel[];
  className: string;
  background?: ReactNode;
}) {
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
        {/* Single persistent background layer for the whole pinned viewport
            — sits behind every panel so the hero photo stays visually
            continuous as the track pans, instead of each panel re-rendering
            its own copy at a different (fading) opacity. */}
        {background && <div className="absolute inset-0 z-0">{background}</div>}
        <HorizontalScrollViewportContext.Provider value={viewportRef}>
          <motion.div className="relative z-10 flex h-full" style={{ x, willChange: "transform" }}>
            {panels.map((panel, i) => (
              <PanelFrame key={i}>{panel.content}</PanelFrame>
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
 * One panel's slot in the track.
 *
 * This used to derive its own opacity/scale from the shared spring value
 * (fading/shrinking neighbors as they receded from focus), so the pan read
 * as a designed transition rather than a flat filmstrip being dragged
 * sideways. But every panel here sits on top of one shared, non-moving
 * `PersistentPanelBackground` layer specifically so the hero photo reads as
 * continuous across the whole track — and each panel additionally paints
 * its own local scrim (an `ink/NN` wash) over that shared layer for text
 * contrast. Fading a panel's opacity faded its scrim along with it, and
 * during a transition *two* adjacent panels are simultaneously below full
 * opacity/scale at once, both under-scrimmed at the same moment — which let
 * the brighter, un-scrimmed shared background bleed through right at the
 * seam between them (worse still, the scale-down physically pulled each
 * panel's edge inward, opening a real gap onto that raw background). That
 * showed up as a visible lighter band exactly at the panel boundary while
 * panning — the opposite of the "one continuous background" effect this
 * whole component exists for. Removed; panels now stay flush at opacity 1
 * so nothing exposes the shared background layer between them.
 */
function PanelFrame({ children }: { children: ReactNode }) {
  return (
    // w-full (not w-screen) so each panel's actual rendered width matches
    // the pinned viewport's real width — the viewport is a normal block
    // box inside the sidebar-padded body, not the full window, so it's
    // narrower than 100vw by the sidebar's width on desktop. A w-screen
    // panel used to overflow that box; translateX(-N * 100%), a
    // percentage of the row's own (correctly-sized) box, then undershot
    // by the difference on every step, worse with each panel — by the
    // last panel on a page with several, it was visibly cropped.
    <div className="h-full w-full flex-shrink-0 overflow-hidden">{children}</div>
  );
}
