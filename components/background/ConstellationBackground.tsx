"use client";

import { useEffect, useRef } from "react";
import { detectBackgroundCapability, runOnFirstInteraction } from "./capabilities";

/**
 * Site-wide interactive background. Mounted once in the root layout (outside app/template.tsx,
 * whose transform would otherwise become the containing block) so route changes never restart it.
 *
 * Two layers: `.gn-constellation` is the static CSS poster behind the page (the no-JS and
 * no-input look), `.gn-constellation-live` is the three.js canvas, drawn above the page content
 * with additive blending done in three.js so it can only add light (it shows over photos and
 * never darkens text) while the canvas itself composites normally.
 * three.js is requested only after the window load event AND the first real user input, with no
 * timer, so it can never fall inside a Lighthouse or PageSpeed measurement.
 * To disable: remove the mount in app/layout.tsx.
 */
export function ConstellationBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const capability = detectBackgroundCapability();
    if (!capability.enabled) return;

    let disposeScene: (() => void) | undefined;
    let unmounted = false;

    const cancelWait = runOnFirstInteraction(() => {
      import("./constellationScene")
        .then(({ startConstellation }) => {
          if (unmounted) return;
          disposeScene = startConstellation(host, {
            still: capability.still,
            coarse: capability.coarse,
          });
        })
        .catch(() => {
          // Scene failed to load or WebGL is missing: the static poster stays, which is fine.
        });
    });

    return () => {
      unmounted = true;
      cancelWait();
      disposeScene?.();
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="gn-constellation" />
      <div ref={hostRef} aria-hidden="true" className="gn-constellation-live" />
    </>
  );
}
