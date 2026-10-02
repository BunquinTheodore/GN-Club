# Events section — build notes

Extended `/work` with an Events timeline built from the real case studies already in code. `/services` was left untouched (see "Services PDF instruction" below).

## Files created

- `lib/events.ts` — new `TimelineEvent` type and `events` array. Events-specific fields (`date`, `summary`, `status`, `slot`) derived from the real `lib/portfolio.ts` entries, not duplicated content.
- `components/EventsTimeline.tsx` — the new timeline section. Built entirely with `GlassPanel` (imported from `@/components/GlassPanel`, no bespoke glass CSS) and `Reveal` for entrance motion, matching `Reveal.tsx`'s existing fade/slide-up pattern used elsewhere on the site.

## Files changed

- `app/work/page.tsx` — added the `EventsTimeline` import and rendered it in a new section below the existing `PortfolioGrid`, inside the same `max-w-7xl` content column. No existing content was removed or reordered.

## Files explicitly NOT touched

- `lib/services.ts`
- `app/services/page.tsx`
- `lib/portfolio.ts` (including the 6 explicitly-flagged placeholder entries: Founders Summit, Chainlink Meetup Manila, Neon Rooftop Launch, Founders Summit Afterparty, Studio Livestream, Regional Roadshow — left exactly as-is)

## Events included

Only the 3 confirmed-real portfolio entries, plus CJC Race Soft Launch as an explicit stub:

1. **WOCEE 2026** — `wocee-2026` slug, links to its existing case study. Thumbnail reuses the real `wocee.1` photo (`public/images/wocee/wocee-01-nexus-stage.jpg`).
2. **GN Club Lifestyle: Pickleball Edition** — `pickleball-edition` slug, links to its existing case study. Thumbnail reuses `pickleball.1` (`public/images/pickleball/pickleball-01-group-photo.jpg`).
3. **Join Mazal** — `join-mazal-activation` slug, links to its existing case study. Thumbnail reuses `mazal.1` (`public/images/mazal/mazal-01-trade-before-after.png`) — this is real GN Club marketing/content-design collateral, not on-ground event photography (per `lib/media.ts`'s own comment on the `mazal.*` slots).
4. **CJC Race Soft Launch** — no `lib/portfolio.ts` entry exists for this yet, so it has no case-study link. Card renders with a "Write up pending" badge, a `summary` that explicitly says the copy hasn't been written, and a styled gradient/text placeholder in place of a photo (`PHOTOS COMING SOON` on a `bg-ink-raised` tile, no stock or fabricated imagery) since `public/images/` has no folder for it — I checked and only `brands/`, `mazal/`, `pickleball/`, `wocee/` exist there. The source Drive export folder for CJC (`1 Q3 2026/.../CJC Race Soft Launch/`) is also empty in this environment, confirming there's no real photography to pull in yet.

**Dates**: every event shows `date: "TODO"` (rendered as "Date TBC" in the UI). I checked `PROJECT_NOTES.md`, `PREMIUM_AUDIT.md`, and the rest of the repo for any confirmed calendar dates for WOCEE 2026, Pickleball Edition, or Join Mazal and found none — only the "2026" in WOCEE's own title, which isn't a specific date. No dates were invented.

## Components reused (no new visual language introduced)

- `GlassPanel` (`components/GlassPanel.tsx`) — every event card is a `GlassPanel`, same `.glass-panel` blur/border treatment and `card-shine` sweep as the rest of the site.
- `Reveal` (`components/Reveal.tsx`) — entrance animation for the section heading and each card, same fade + slide-up + `viewport={{ once: true, amount: 0 }}` pattern already used site-wide (not `PanelReveal`, since this section isn't inside a `HorizontalScroll` panel).
- `DuotoneImage` — real thumbnails for WOCEE/Pickleball/Mazal use the existing duotone-graded image treatment, same as `PortfolioGrid`/`CaseStudyPanels`.
- `Badge` (shadcn/ui) — event tag and the amber "Write up pending" status badge.
- Existing color tokens only: `--lime` as the sole interactive accent (links, focus rings), `.gradient-ring-text` (cyan→lime→amber) used sparingly, just on the CJC placeholder's "Photos coming soon" label, matching the codebase's existing "used sparingly" convention.

## Verification

- `npm run build` — succeeds, zero TypeScript/JSX errors.
- `npm run lint` — clean (one `react/no-unescaped-entities` error was caught and fixed during the build).
- Checked in a real browser (`chrome-devtools-mcp`) at 375×812 (mobile) and 1440×900 (desktop): `document.documentElement.scrollWidth === window.innerWidth` at 375px (no horizontal overflow), all 4 event cards render correctly including the CJC placeholder state, `/services` still renders its full 8-service grid unchanged.

## Open items for the team

1. **CJC Race Soft Launch needs case-study copy.** No `lib/portfolio.ts` entry exists for it at all — description, challenge, approach, results, and a confirmed date are all needed before it can get a full case study page like the other three. The timeline card currently states plainly that the write-up is pending.
2. **Confirm whether Join Mazal Activation and CJC Race Soft Launch have real on-ground event photos.** Join Mazal currently only has branded marketing/content-design graphics (`mazal.1`–`mazal.9`, weekly trading schedules, onboarding/QR creative) — real activation/co-working photography, if it exists, isn't in `public/images/mazal/` yet. CJC has no images anywhere in `public/images/` and its Drive export folder (`1 Q3 2026/.../CJC Race Soft Launch/`) is empty in this environment — if real photos exist elsewhere, they need to be pulled into a new `public/images/cjc/` folder and slotted into `lib/media.ts` before the placeholder can be replaced.
3. **No confirmed dates exist for any of the 3 real events** (WOCEE 2026, Pickleball Edition, Join Mazal) anywhere in the codebase or its notes. All show "Date TBC" — real dates need to come from GN Club directly.
4. **"Services PDF" instruction**: the original brief mentioned reconciling a services PDF. There is no PDF anywhere in this project (confirmed via search) — `lib/services.ts` already lists all 8 real GN Club services (Activations and Events, Online Events, Digital, Video Production, Logistics, Fabrication and Build, Studio and Podcast Production, Brand Merchandising) and backs the complete `/services` page. Per the team decision, this is already the authoritative services list, so `/services` and `lib/services.ts` were left completely untouched — no PDF-reconciliation work was needed or performed.

## Session update (2026-09-20) — background seam fix

Client-reported bug, unrelated to the Events section above: a visible
lighter vertical seam appeared at panel boundaries when scrolling through
`ScrollJackTrack`-based pages (`/work/[slug]`, `/services/[slug]`), breaking
the illusion of one continuous background.

**Root cause, confirmed live in Chrome (not guessed):** every panel sits on
one shared, static `PersistentPanelBackground` layer plus its own local ink
scrim for text contrast. `PanelFrame` (in `components/ScrollJackTrack.tsx`)
faded a panel's entire box — content *and* its scrim — via
`opacity`/`scale` based on distance from the active panel, as a "focus"
effect. During any pan transition, two adjacent panels are simultaneously
below full opacity/scale, and the scale-down physically pulls each panel's
edges inward, opening a real sub-viewport gap at the boundary that exposes
the brighter, un-scrimmed shared background underneath.

**Fix:** removed the distance-based opacity/scale animation from
`PanelFrame` entirely — panels now render flush at flat `opacity: 1`, no
transform. Verified via re-measuring the same DOM nodes post-fix (all
panels: `opacity: 1`, `transform: none`, identical widths, flush
boundaries) and before/after screenshots on `/work/wocee-2026` and
`/services/activations-and-events`. Mobile's separate vertical-stack
fallback never used `PanelFrame` and was already unaffected.

Only file changed: `components/ScrollJackTrack.tsx`.

## Session update (2026-10-02) - type system and constellation background

**Type system.** Josefin Sans 300 (all caps via CSS, 0.04em tracking) for every
h1/h2 and the splash wordmark; Manrope (variable) for body, h3 and below, card
titles (`font-display` now maps to Manrope); Poppins 400/500/600 for buttons,
inputs, labels, badges, nav (`aside`, `header`), pill links and any element
carrying `uppercase`. Loaded with `next/font/google` in `app/layout.tsx`
(variables `--font-josefin`, `--font-manrope`, `--font-poppins` on `<html>`).
The title rule lives unlayered at the bottom of `app/globals.css` so it beats
Tailwind utilities. Opt out with `class="heading-plain"`. Geist, Inter and
Space Grotesk removed. Verified at 360px: no horizontal overflow, computed fonts
correct.

**Background.** `components/background/` (`ConstellationBackground.tsx` mounted
once in `app/layout.tsx`, `capabilities.ts`, `constellationSim.ts`,
`constellationScene.ts`). Static CSS poster `.gn-constellation` is the no-JS
look. three.js is a dynamic import (own chunk, about 540 KB raw) started only
after window load plus requestIdleCallback; skipped for reduced motion, saveData,
deviceMemory <= 2, hardwareConcurrency <= 2 or no WebGL. Pointer magnet pulls
nearby points and links them to the cursor in lime. Pauses when hidden or
off screen, 45 fps cap on coarse pointers, disposes on unmount. `html` stays
ink, `body` is transparent. To disable: remove `<ConstellationBackground />`
from `app/layout.tsx`. Lighthouse not run here (separate verifier).

### Round 1 fixes (2026-10-02) - background PageSpeed hardening

- three.js now starts only after window load, then the first user input
  (pointer, key, scroll, wheel) or a 6 s timer, then an idle callback. A
  throttled Lighthouse mobile run has no input and is a coarse device, so the
  chunk is never requested inside its TBT window.
- Coarse pointers and viewports under 768 px never load three.js (static poster
  only). Reduced motion now gets one still frame (loaded after the 6 s timer,
  no loop, no pointer listeners).
- Desktop loop capped at about 45 fps; link search uses a spatial hash (no
  all-pairs loop); only the used range of the line buffers is uploaded.
- Resize is rAF-coalesced and ignores height-only changes under 100 px.
- Node and link alpha raised slightly so the constellation reads over the dark
  gaps. To disable: remove `<ConstellationBackground />` from `app/layout.tsx`.
- Not re-measured with Lighthouse here; lint, tsc and build pass.

### Round 2 (2026-10-03) - first-interaction three.js, effect quality, PageSpeed

This supersedes the "6 s timer" and "coarse pointers never load three.js" lines above.

**Loading rule.** The three.js chunk is requested only after the window `load`
event AND the first trusted user input (pointermove, pointerdown, touchstart,
wheel, keydown, or a scroll that actually moved the page). No timer, no timed
fallback, so Lighthouse (which never moves the cursor) can never include it.
Until then the static `.gn-constellation` poster is the whole look. Verified in
Chrome: zero three.js bytes before input, chunk (about 132 KB gzip, 545 KB raw)
fetched after the first mouse move or the first tap/scroll, canvas fades in over
600 ms. Guards kept: reduced motion (one still frame), Save-Data, no WebGL,
deviceMemory or hardwareConcurrency of 2 or less, pause when hidden or
off-screen, dispose on unmount, webglcontextlost (and now restored), SSR safe.
Mounted in `app/layout.tsx`, outside `app/template.tsx`, so route changes never
restart it (checked: same canvas element after client navigation).

**Why the chunk stays about 545 KB.** `WebGLRenderer` itself pulls in the shader
chunk library and program cache, which is most of the bundle; named imports are
already tree-shaken (only the 11 classes we use are imported). A leaner path
would mean replacing three with hand-written WebGL, which was not the brief.
It never loads before input, so it costs PageSpeed nothing.

**Touch.** Coarse pointers now get the effect: 40 to 80 points (desktop 120 to
260), link distance 120, pixel ratio capped at 1.25, hard 30 fps cap, reach
150 px, triggered by the first touchstart or scroll, finger lift ends the
reaction.

**Effect quality.** Layering: the poster stays behind the page, the live canvas
is a second fixed layer at `z-index: 40` (below the sidebar z-50 and splash
z-100) with `mix-blend-mode: screen`, so it now shows over the full-bleed home
photo and through the sidebar blur and can only add light (text stays
readable). Cursor reaction: reach 240 px, stronger pull with a sideways swirl so
points orbit the cursor, brighter and thicker lime links (alpha 0.8), points
grow and turn lime, plus a soft lime halo under the cursor. Idle life: each
point has a slow sinusoidal wobble on top of its drift and a gentle twinkle, at
30 fps while the cursor is away (45 fps while it is near).

**Nav.** Sidebar nav, submenu and mobile menu links are now uppercase with
0.08 to 0.12em tracking (house rule 4). The header CTA button is unchanged.

**PageSpeed changes (each measured).**
- Root cause of the poor LCP: `app/template.tsx` wrapped every page in a framer
  `motion.div` with `initial opacity 0`, and the Hero text did the same, so the
  whole page was invisible in the server HTML until hydration (and with JS off).
  Template, hero entrance, hero photo zoom and the `/work` heading now use CSS
  animations (`.gn-page-enter`, `.gn-rise`, `.gn-word`, `.gn-hero-drift`,
  `.gn-reveal-in` in `globals.css`) that run from first paint. Same motion,
  same timings and easing. `Hero.tsx` and `template.tsx` are now server
  components. Reduced motion skips them.
- framer-motion moved to `LazyMotion` + `m` (`components/motion/`), features
  loaded as a separate chunk after hydration (domAnimation only, no drag or
  layout). The infinite 26 s hero zoom no longer runs on the JS main thread.
- Hero image: `fetchPriority="high"` and correct `sizes` for the sidebar layout.
- Below-the-fold home sections (ServiceBento, PortfolioGrid, Testimonials,
  CTASection) and Sidebar and Footer are `next/dynamic` (still server-rendered,
  no layout shift) so React hydrates them as separate time-sliced tasks instead
  of one long task. The case-study preview dialog and its Base UI code are
  fetched on first hover, focus or click of a card (`PortfolioDialog.tsx`).
- Poppins `preload: false` (buttons and nav only): first paint preloads 2 font
  files (Josefin, Manrope) instead of 5.
- `inlineCss` was tried and reverted: no measurable gain (median 79 both ways).
- `@types/three` moved to devDependencies.

**Measured** (production build, localhost, Lighthouse 13, 3 runs, median; the
machine was at 100% CPU from other work, so absolute numbers are pessimistic and
noisy, compare ratios): mobile `/` 65 to 78, `/work` 69 to 79; TBT `/` 638 to
184 ms, `/work` 333 to 77 ms; CLS 0; desktop `/` 94 to 98, `/work` 93 to 97.
Mobile LCP is still about 4.9 s in Lighthouse's simulation.
**What blocks mobile 90:** simulated LCP/TTI. Lantern charges the whole early
JS (React DOM 70 KB gzip, Next client 43 KB, framer and page chunks, about
200 KB gzip in the first 250 ms) at 4x CPU slowdown on a 1.6 Mbit link, plus
about 300 KB of lazy images that start loading within the 1250 px margin.
Getting under 2.5 s would need removing hydration (static HTML) or dropping
below-the-fold images, both design or architecture changes. Live PageSpeed on
real hosting (CDN, HTTP/2, compression) will differ from this localhost proxy.

**Open.** The home H1 in Josefin caps now wraps "WEB3" onto its own line at
1440 px (3 lines instead of the intended 2); this comes from the type system,
not this round. Other pages still use framer `Reveal` with initial opacity 0
below the fold (not an LCP issue); only the first heading on `/work` got the
eager CSS version.

### Round 3 (2026-10-03) - mobile LCP follow-up (measured)

**Root cause (from the Lighthouse JSON, not guessed).** Observed LCP was already 190 to 400 ms
(hero image, discoverable, `fetchpriority=high`). The 4.4 to 4.8 s was Lantern's
simulation: it charges every request that finished before the observed LCP against a 1.6 Mbit
link, so about 670 KB (270 KB JS, 310 KB of below-the-fold photos, fonts, CSS) shared the
bandwidth with the 20 KB hero. The photos were already `loading="lazy"`, but Chrome's lazy
threshold (1250 px and more below the fold) still pulled 9 of them in the first 350 ms. On
`/work` the largest card image also had a 1 s element render delay and three images were
marked priority although only one to two sit on a phone screen.

**Changes, each re-measured.**
- `components/NearViewport.tsx` (new), used by `DuotoneImage` for every non-priority photo:
  the `<img>` is rendered only when its card is within 200 px of the viewport (1200 px after the
  first scroll, touch, key or pointer input). Server HTML carries the real markup in
  `<noscript>`, the placeholder is absolute inside the card that already reserves its size, so no
  layout shift. Home photo bytes before LCP: about 310 KB to 0.
- `DuotoneImage`: priority images now carry `fetchPriority="high"`.
- `/work`: `priorityCount` 3 to 2 (cards 1 and 2 are the ones on a phone screen). The first
  cards use a CSS entrance (`.gn-tile-in`, same 0.4 to 1 fade and 12 px rise, 0.6 s, same
  easing) instead of the framer `initial`, which only started after hydration.
- `PortfolioGrid` image `sizes` on phones: `calc(100vw - 48px)` (the real tile width) so the 640 px
  file is picked instead of 750 px.
- `app/globals.css`: the mascot cursor PNG (12 KB at 2x) is now declared only under
  `(hover: hover) and (pointer: fine)`. Touch screens never draw it, desktop is unchanged.
- `app/icon.jpg` (favicon, in scope as a hygiene item): 648 px / 18.6 KB to 192 px / 4.5 KB, same
  artwork. Chrome fetches it at high priority right after load.

**Measured** (production build on localhost, Lighthouse 13 mobile, warm image cache, the first
run after a rebuild is always a cold-optimizer outlier and is listed): 
- `/` mobile: before 85 (85, 83, 90), LCP 4.4 s. After 5 runs: 93, 93, 86, 92, 92 (median 92),
  LCP 3.1 to 3.9 s, TBT 37 to 113 ms, CLS 0.
- `/work` mobile: before 82 (82, 82, 82), LCP 4.8 s. After: 88 (cold), 92, 92 (median 92), LCP
  3.3 s, TBT 34 to 40 ms, CLS 0.
- Desktop: `/` 100, 99, 99; `/work` 97, 99, 98. CLS 0 to 0.001, TBT 0.
- Lighthouse on localhost is a proxy (HTTP/1.1, 1.6 Mbit simulation); live PageSpeed over
  HTTP/2 or 3 and a CDN will differ. Run-to-run spread is about 6 points on a busy machine.

**Remaining.** About 200 KB gzip of framework and app JS (React DOM 72 KB, Next client 44 KB)
still loads before the hero paints in the simulation. Going lower needs removing hydration
from the above-the-fold tree, which is an architecture change. `CountUpValue` imports
framer's `animate`/`useMotionValue` outside `LazyMotion`; moving it to CSS or `m` would trim a
few KB more.

### Round 4 (2026-10-03) - mobile `/` LCP follow-up (measured)

**Root cause.** Observed LCP on `/` is about 330 ms (hero image, 20 KB, high priority). The
simulated 3.3 to 4.0 s is Lantern charging every request that starts before it (React 72 KB, Next
44 KB, about 130 KB of app chunks, 37 KB of fonts, 19 KB CSS) against the 1.6 Mbit link. Two
avoidable pieces were in that set: `app/page.tsx` was a client component (everything it imports,
including the dynamic sections' wrappers, shipped in the first-load graph), and `CountUpValue`
imported framer's `animate`, `useMotionValue` and `useInView` outside `LazyMotion`, which pulled
the animation engine into first load for one counter.

**Changes.**
- `app/page.tsx`: removed `"use client"`. It only composes server-renderable pieces and `dynamic`
  client sections, so it no longer needs to be a client module.
- `components/CountUpValue.tsx`: IntersectionObserver plus requestAnimationFrame with the same
  cubic-bezier(0.16, 1, 0.3, 1) curve and 1.4 s duration; reduced motion jumps to the final value.
  No framer import. Verified in Chrome: stats still resolve to 150+, 40+, 3, 12.

**Measured** (production build, localhost, Lighthouse mobile): `/` before 87, 93, 92 (median 92
this session, 86 median reported by the measurer); after 88 (cold first run), 93, 93, 94, 94, 94
(median 94), LCP 3.1 s, TBT 30 to 70 ms, CLS 0. `/work` 92, 92, 93, LCP 3.3 s. Desktop `/` 99, 99
(LCP 0.8 s). Lighthouse on localhost is a proxy; live PageSpeed will differ. The remaining weight
is React DOM and the Next client, which cannot be removed without dropping hydration.

### Round 3 (2026-10-03) - constellation loop and blend fixes

- `constellationScene.ts` loop is now adaptive: full rate (45 fps desktop, 30 touch) only while a finger is down or within 1.5 s of any input, then about 12 fps idle (wobble and twinkle stay alive), and after 20 s with no input the rAF loop stops entirely (no renderer calls) until the next pointermove, pointerdown, touchstart, scroll, wheel or keydown. Reduced motion still draws one still frame.
- Removed CSS `mix-blend-mode: screen` from `.gn-constellation-live`; the canvas now composites normally and the light-only look comes from additive three.js blending (custom blend, alpha channel left at 0, depthWrite false, gain 0.8 tuned against before/after screenshots). Verified in Chrome only; will-change stays off, pointer-events none.
