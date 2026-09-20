/**
 * Fullscreen intro splash shown on real page loads / hard refreshes only.
 *
 * Rendered once from the root layout (which persists across client-side
 * `next/link` navigation, unlike app/template.tsx which remounts every
 * route change), so it naturally never re-plays on internal navigation and
 * only appears on a fresh document load. Pure CSS animation with a delay
 * (see `.gn-splash` in globals.css) drives the hold + fade/scale-out, so it
 * shows up in the server-rendered HTML immediately with no dependency on
 * JS hydration. `aria-hidden` and the `pointer-events: none` end state on
 * the animation keep it out of the accessibility tree and out of the way
 * of the real page once it has played.
 */
export function SplashScreen() {
  return (
    <div className="gn-splash" aria-hidden="true">
      <span className="gn-splash__title">GN Club</span>
    </div>
  );
}
