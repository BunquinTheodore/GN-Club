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
