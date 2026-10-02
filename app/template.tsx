import type { ReactNode } from "react";

/**
 * Next.js re-mounts template.tsx (unlike layout.tsx, which persists) on
 * every navigation, so this is the lightweight way to give route changes a
 * soft fade-in instead of a hard cut, with no AnimatePresence/exit-animation
 * plumbing needed for that. Kept short (0.35s) so it reads as a polish
 * detail on every click, not a loading delay.
 *
 * The fade is a CSS animation (.gn-page-enter in globals.css), not framer-motion: a JS-driven
 * initial opacity of 0 left the whole page invisible in the server HTML until hydration, which
 * pushed LCP out to the hydration time and hid the page entirely without JavaScript. A CSS
 * animation is running from the first paint and needs no JS. Reduced motion skips it.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="gn-page-enter">{children}</div>;
}
