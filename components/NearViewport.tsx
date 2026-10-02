"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// Before any input only the area just below the first screen counts, so the first paint is not
// sharing bandwidth with photos nobody can see yet. After the first scroll, touch, key or mouse
// input the margin opens up to roughly what native lazy loading uses, so scrolling stays seamless.
const IDLE_MARGIN = "200px";
const ACTIVE_MARGIN = "1200px";
const INPUT_EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

let interacted = false;
const listeners = new Set<() => void>();

function onFirstInput() {
  if (interacted) return;
  interacted = true;
  INPUT_EVENTS.forEach((name) => window.removeEventListener(name, onFirstInput));
  listeners.forEach((notify) => notify());
}

function subscribeToInput(notify: () => void) {
  listeners.add(notify);
  if (!interacted && listeners.size === 1) {
    INPUT_EVENTS.forEach((name) => window.addEventListener(name, onFirstInput, { passive: true }));
  }
  return () => {
    listeners.delete(notify);
    if (!interacted && listeners.size === 0) {
      INPUT_EVENTS.forEach((name) => window.removeEventListener(name, onFirstInput));
    }
  };
}

/**
 * Renders its children only once the placeholder is within about a screen of the viewport.
 *
 * Native `loading="lazy"` already defers images, but Chrome's threshold is 1250px to 2500px below the
 * fold, so on a phone a long page still pulls several hundred KB of below-the-fold photos in the same
 * moment as the hero, competing with it for bandwidth. This keeps those requests until they are close
 * to being seen. The server output carries the real markup inside <noscript>, so nothing is lost
 * without JavaScript, and the placeholder has no size of its own (the card that owns the image already
 * reserves the space), so there is no layout shift.
 */
export function NearViewport({ children }: { children: ReactNode }) {
  const [near, setNear] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);
  const hasInteracted = useSyncExternalStore(subscribeToInput, () => interacted, () => false);
  const margin = hasInteracted ? ACTIVE_MARGIN : IDLE_MARGIN;

  useEffect(() => {
    const node = marker.current;
    if (!node || near) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setNear(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [near, margin]);

  if (near) return <>{children}</>;
  return (
    <>
      <span ref={marker} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      <noscript>{children}</noscript>
    </>
  );
}
