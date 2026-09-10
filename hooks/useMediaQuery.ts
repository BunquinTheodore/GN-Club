"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks whether a CSS media query currently matches. Returns `false` during
 * SSR and the first client render (no window yet), then updates reactively
 * as the viewport crosses the query's breakpoint.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
