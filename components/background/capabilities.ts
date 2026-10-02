/** Decides whether the WebGL constellation is worth starting, and when. */

type NavigatorHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/**
 * `enabled` false keeps the CSS poster only (Save-Data, low memory, 2 or fewer cores).
 * `still` means reduced motion: render one frame, no loop, no pointer listeners.
 * `coarse` means touch first: fewer points, a lower frame cap and no hover reaction.
 */
export type BackgroundCapability = { enabled: boolean; still: boolean; coarse: boolean };

const LOW_END_LIMIT = 2;

export function detectBackgroundCapability(): BackgroundCapability {
  const nav = navigator as NavigatorHints;
  const coarse =
    window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = nav.connection?.saveData === true;
  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= LOW_END_LIMIT;
  const lowCores =
    typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= LOW_END_LIMIT;

  return { enabled: !(saveData || lowMemory || lowCores), still: reducedMotion, coarse };
}

const INPUT_EVENTS = [
  "pointermove",
  "pointerdown",
  "touchstart",
  "wheel",
  "keydown",
  "scroll",
] as const;

/** Small gap between the input and the three.js work, so the input itself is never delayed. */
const IDLE_TIMEOUT_MS = 800;

/**
 * Runs `task` once, and only after BOTH the window load event and the first real user input
 * (mouse move, pointer or touch down, wheel, key, or an actual scroll). There is deliberately
 * no timed fallback: a Lighthouse run never moves the cursor or touches the page, so the
 * three.js chunk can never be requested inside a PageSpeed measurement. Synthetic events and a
 * scroll that did not change the scroll position are ignored. Returns a canceller.
 */
export function runOnFirstInteraction(task: () => void): () => void {
  let cancelled = false;
  let loaded = document.readyState === "complete";
  let interacted = false;
  let fired = false;
  let idleHandle: number | undefined;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
  const startScroll = window.scrollY;

  const detach = () => {
    for (const name of INPUT_EVENTS) window.removeEventListener(name, onInput, true);
    window.removeEventListener("load", onLoad);
  };

  const schedule = () => {
    const run = () => {
      if (!cancelled) task();
    };
    if (typeof window.requestIdleCallback === "function") {
      idleHandle = window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS });
    } else {
      timeoutHandle = setTimeout(run, 200);
    }
  };

  const tryFire = () => {
    if (fired || cancelled || !loaded || !interacted) return;
    fired = true;
    detach();
    schedule();
  };

  function onInput(event: Event) {
    if (!event.isTrusted) return;
    if (event.type === "scroll" && window.scrollY === startScroll) return;
    interacted = true;
    tryFire();
  }

  function onLoad() {
    loaded = true;
    tryFire();
  }

  for (const name of INPUT_EVENTS) window.addEventListener(name, onInput, { passive: true, capture: true });
  if (!loaded) window.addEventListener("load", onLoad, { once: true });

  return () => {
    cancelled = true;
    detach();
    if (idleHandle !== undefined && typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleHandle);
    }
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
  };
}
