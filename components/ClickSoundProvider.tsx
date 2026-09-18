"use client";

import { useEffect } from "react";
import { playClickSound } from "@/lib/clickSound";

const INTERACTIVE_SELECTOR = 'button, a, [role="button"], input[type="submit"], input[type="button"]';

/**
 * Site-wide click sound. Buttons here are a mix of real <button>s, <Link>s
 * styled as pills (MagneticButton, "Explore more", nav CTAs), and
 * [role="button"] (HoverCardTrigger's render prop in TeamGrid) — rather
 * than wiring a sound handler into every one of those call sites, one
 * capture-phase listener on the document covers all of them by construction
 * (any future button automatically gets the sound too, no opt-in needed).
 */
export function ClickSoundProvider() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest(INTERACTIVE_SELECTOR);
      if (!trigger) return;
      if (trigger.hasAttribute("disabled") || trigger.getAttribute("aria-disabled") === "true") return;

      playClickSound();
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
