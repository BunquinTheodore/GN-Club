# GN Club site — decisions & request log

A running guide to what's been asked for and decided on this site, so future work stays consistent with what the client actually wants. Not auto-generated — update it by hand when a new decision gets made.

## Brand assets & content sourcing

- Source of real GN Club media: the Google Drive export folder (`1 Q3 2026-.../1 Q3 2026/...`), gitignored (`/1 Q3*/` in `.gitignore`) so raw exports never get committed — pull only the specific files you need into `public/images/`.
- GN Club's own logo and the GN Media / GN Ventures / Mazal partner logos already match the official Drive assets exactly — no need to re-source these.
- WOCEE 2026 (World of Consumer Electronics Expo) event photography is real GN Club photography, curated into a case study at `/work/wocee-2026`. `lib/media.ts` slots `wocee.1`–`wocee.8`.
- "GN Club Lifestyle: Pickleball Edition" (an LBank Academy–branded community activation): raw drone footage from the Drive folder is **~1.9GB and explicitly excluded from the repo** — too large to commit or serve. A handful of still frames were pulled from the footage instead (`public/images/pickleball/`) and used to build a draft case study at `/work/pickleball-edition`.
  - **Still needs real copy** — `lib/portfolio.ts`'s `pickleball-edition` entry has `description`/`challenge`/`approach`/results marked `PLACEHOLDER`, since the actual client relationship/brief with LBank Academy isn't known. Replace with real details when available.

## Branding

- The GN Ventures logo (`brand.gnVentures` in `lib/media.ts`) was removed from the "trusted by" client strip (`lib/clients.ts`) — its source file has a white background that visually clashes with the rest of the dark-themed strip (GN Media/Mazal are transparent/black-friendly). If a better-cropped version becomes available, it can go back in.
- Hero background (`public/hero-cover.png`, GN Club's real Facebook cover photo) has the GN Club logo baked into the image itself. The dark gradient overlays in `components/Hero.tsx` were tuned down (roughly halved) so the logo reads crisp instead of washed out.

## Navigation

- The nav bar (`components/Header.tsx`) is **fixed/pinned on every page** — this was tried differently once (making it pan away with the horizontal-scroll content on the About page, so it wasn't visible after the first section) and explicitly reverted on request. Don't resurrect that pattern without asking again.

## Visual design ("more premium, more professional")

Direction confirmed: **refine the existing dark/neon identity, don't replace it** — keep the lime/cyan/amber accent system and glass-panel look, just tighter and more disciplined. Applied site-wide (all pages, not just the homepage).

- **Photography**: placeholders are curated free-license Unsplash photos standing in for real GN Club photography — there is no AI image-generation tool available in this environment, so "AI stock" in practice means hand-picked, mood-matched stock. Three specifically mismatched/generic ones were swapped (Services→Online Events, Services→Digital, About→Team) for better-fitting, moodier shots. All placeholder slots are commented in `lib/media.ts` as swap-out points for real photography later.
- **Color discipline**: lime is the single primary accent now. The old cyan→amber gradient treatment (was on every service bullet point and every Contact form field's focus ring — busy/"rainbow" at rest) was replaced with plain lime. The tri-color gradient is kept only for a few sparse signature spots (e.g. stat callouts, hero card border).
- **Typography**: tighter line-height (`leading-[1.05]`) on every page's H1 and on the closing CTA heading, matching the Hero's original polish.
- **Buttons**: primary-button hover changed from a white flash to a lime glow/brighten, consistent with the neon accent.

## Contact info

- The placeholder phone number (`0999 000 0000`) is removed everywhere — Contact page copy, Footer, and `lib/site.ts`. Only the real email (`gnclub.contactus@gmail.com`) is shown. Add a real phone number back in `lib/site.ts` + the two call sites if/when GN Club wants one listed.

## Image cropping — reversed back to `object-cover` (superseded the earlier "never crop" fix)

An earlier round switched every photo to `object-contain` (never crop, letterbox instead) per an explicit "don't crop anything" request. That was **reversed** after a follow-up "redesign every picture+text combo, make it premium" request — research confirmed `object-cover` (crop to fill, art-directed via `object-position`) is the standard for card/hero photography on premium sites; `contain` is only right when cropping would destroy real information (a logo, on-screen text), which isn't the case for the site's photography.

`components/DuotoneImage.tsx` is back to `object-cover` by default, and now accepts an optional `position?: string` prop (CSS `object-position`) so any caller can art-direct which part of a photo survives the crop. Use it wherever the default center-crop loses the actual subject — e.g. a group photo whose heads sit near the top of the frame. Several components already carry per-image position overrides (see below) — check those for the pattern (a small `Record<string, string>` lookup keyed by media slot, applied at every call site that renders that slot) before adding new ones.

The Hero background (`public/hero-cover.png`) was also re-cropped: it used to include a baked-in caption band ("ACTIVATIONS · EVENTS · ...") at the bottom that duplicated text already shown live on the page — cropped that off (still has the GN Club logo composited into the crowd shot, which reads fine as a centerpiece now that it's not fighting a letterbox).

## Horizontal scroll-jack layout — kept, and every panel now fits on screen

The site's signature interaction (`components/HorizontalScroll.tsx`) is confirmed to stay: on desktop, each page's sections pan **left to right** as you scroll vertically, one section pinned per full screen, with pagination dots at the bottom. This was explicitly re-confirmed after a session where it was removed (in favor of normal continuous vertical scrolling) and then explicitly asked to be put back.

**The panel-clipping problem is fixed.** Every panel was pinned to exactly one screen height with hidden overflow, so any panel whose content was taller than one viewport had its excess silently clipped with no way to scroll to it — this was the real cause of what looked like "cropped, upwards" content (the homepage's "Recent work" grid losing its bottom row, About's timeline being hidden in a mini inner-scrollbar, etc). Every page and case study was audited panel-by-panel (via a script measuring each panel's real content height against the pinned viewport height) and every overflowing one was resized to fit:
- `ServiceBento.tsx` and `PortfolioGrid.tsx`: shorter grid rows (`auto-rows`), tighter gaps/padding.
- `CompanyTimeline.tsx` (About): tighter entry spacing; the inner `overflow-y-auto` scrollbox that used to hide it is gone — the whole timeline is genuinely visible now, not just scrollable-within-a-box.
- `CTASection.tsx`: reduced its own vertical padding (it's reused inside several already-tall combined panels).
- `CaseStudyPanels.tsx`: tighter intro-panel spacing and smaller gallery images/heading.
- Section-level `py-*`/`mt-*`/`mb-*` trimmed on `app/page.tsx`, `app/work/page.tsx`, `app/about/page.tsx` wherever a panel was overflowing.
- Added a stronger dark gradient scrim behind card text in `ServiceBento`/`PortfolioGrid` — the shorter cards put text closer to bright images, so contrast needed reinforcing.

Verified via direct DOM measurement (each panel's `scrollHeight` vs. the pinned viewport's height) at the browser's real rendered viewport (~1536×730 in this environment) — **zero overflow on every panel across Home, Services, Work, About, and every case study** (including the 8-image WOCEE gallery and the 4-image Pickleball one). If new sections/content get added later, re-run this kind of check — a panel that fit today can overflow again if it gains more content, since the layout is still hard-pinned to one viewport height per panel.

## Tooling: shadcn MCP

Installed and configured (`npx shadcn@latest mcp init --client claude`, project-scoped `.mcp.json`). Lets an AI assistant search/browse/install shadcn components and blocks directly instead of copy-pasting. See `docs/shadcn-mcp.md` for the full rundown, including gotchas (this project's Base UI accordion API differs from the Radix examples the tool sometimes surfaces).

First real use, via the MCP tools:
- **Sonner (toast)** — Contact form now shows a toast on send success/error instead of taking over the form with a static "Message sent." panel; `next-themes` (auto-added by the installer) was removed again since this site has no theme toggle.
- **Avatar** — About page's team initials-circles are now a real `Avatar`/`AvatarFallback`, same look today, ready for real headshots later.
- **Accordion** — new FAQ section (`components/FAQSection.tsx`, content in `lib/faq.ts` — placeholder copy, same as team/timeline) added as its own panel on `/services`.

All three were confirmed fitting within one screen using the same panel-measurement approach as the horizontal-scroll fix above — a new FAQ panel was added and still came out at zero overflow.

## Image+text alignment redesign

Following the object-cover reversal above, every photo+text section got a real pass for composition/alignment, not just the crop-mode fix:

- **`components/AlternatingRow.tsx`** had a dead prop — `eyebrow` was declared in the type but never rendered, the only heading on the site missing the small eyebrow label every other section uses. Fixed, and wired an `imagePosition` passthrough prop. All 3 call sites (`app/page.tsx`, `app/about/page.tsx` ×2) now pass a real eyebrow ("About GN Club" / "How we work" / "Virtual production").
- **`about.team`** (`lib/media.ts`) was swapped again — the previous photo was portrait-oriented, which produced a thin, badly-unbalanced sliver once `AlternatingRow`'s landscape box cropped it. Replaced with a genuinely landscape production-crew-on-set photo (distinct from the crowd photography used everywhere else on the site, which "team" was accidentally duplicating before).
- **`ServiceBento.tsx`**: the "Digital" service's image is portrait (code-on-monitors), so it gets `position="center 25%"` to keep the screens in frame instead of the desk below them. The other 5 services' images center-crop fine as-is.
- **`PortfolioGrid.tsx`** and **`CaseStudyPanels.tsx`**: both now have a small per-slot `position` lookup for the couple of images whose subject isn't centered (notably `pickleball.1`, a group photo packed into the top of the frame — needs `center 15-20%` so the crop doesn't clip heads and show empty court instead).
- **`CTASection.tsx`** / **`app/contact/page.tsx`**: share the same `contact.backdrop` image and were checked for consistency — center-crop already worked at both this section's shorter height and Contact's much taller one, so no override was needed there.

If a new photo gets added anywhere, check it against its container's actual aspect ratio before assuming a blind center-crop works — that's what caused the original "not well aligned" complaint.

## Join Mazal case study, promoted services, and catalog gap-fill

Cross-checked the site against the GN Ventures Service Catalog PDF (the group-wide catalog covering all seven GN Ventures companies) and made three changes:

- **New case study: `/work/join-mazal-activation`** — GN Club previously only appeared alongside Mazal as a client logo in the "trusted by" strip (`lib/clients.ts`). It's now a full case study using **real assets**: 9 branded social/marketing graphics from `mazal.zip` (weekly trading-schedule posts, GN Club co-work session posts, the "Join Mazal" onboarding/QR campaign), copied into `public/images/mazal/` and slotted as `mazal.1`–`mazal.9` in `lib/media.ts`. These are **content-design/marketing collateral, not on-ground event photography** — the case study is deliberately framed as GN Club's marketing-agency/community-activation work for Mazal, not as event production. If real on-ground activation photos or confirmed metrics (member counts, engagement numbers) become available later, add them alongside the existing gallery in `public/images/mazal/`, `lib/media.ts`, and the `join-mazal-activation` entry in `lib/portfolio.ts` (its `results` array currently uses honest qualitative values rather than invented numbers).
- **Two services promoted out of hover-only bullets**: "Studio Shoot & Podcast Photoshoot" and "Brand Merchandising & Shirt Printing" used to be buried inside the "Video Production" and "Others" tiles' hover-reveal bullet lists. They're now their own top-level tiles in `lib/services.ts` — `studio-and-podcast` (icon `Podcast`) and `brand-merchandising` (icon `Shirt`), both `span: "md"`, filling a new row in the bento grid. Don't re-bury these back into another tile's bullet list without asking again.
- **Catalog gap-fill**: added several GN-Club-relevant line items from the catalog that weren't listed on the site yet — Trading Competitions, Running Events, Flagship Tech Events (→ "Activations and Events"); Booth Fabrication, Permits & LGU Coordination, Speaker Booking (→ "Others"); Photo Ops, Same-Day Edit (→ "Video Production"). No new top-level categories were created for these — they fit into existing tiles' bullet lists.

Also fixed a latent bug found while adding the 9th portfolio entry: `components/PortfolioGrid.tsx`'s `spans` array was hard-indexed and shorter than the `portfolio` array (6 entries for what was already 8 case studies), so items past index 5 silently got an `undefined` row-span class. Extended it to 9 entries — if more case studies get added later, extend this array too.

## Horizontal scroll-jack layout — removed in favor of normal top-to-bottom scrolling

Supersedes the "Horizontal scroll-jack layout — kept" section above. Explicitly requested: the site's signature left-to-right panel-panning interaction is gone. Every page now scrolls top-to-bottom in normal document flow, using the smooth scrolling already set globally (`scroll-behavior: smooth` in `app/globals.css`).

`components/HorizontalScroll.tsx` was rewritten to always render its old mobile-fallback vertical stack (the pinned/sticky/transform-panning `ScrollJackTrack` code, the spring-driven horizontal `x` motion value, the keyboard left/right panner, and the bottom pagination dots are all gone). `HorizontalScroll` / `HorizontalScroll.Panel` are kept as thin wrapper components (so call sites and `PanelReveal`/`AlternatingRow`'s viewport-context fallback didn't need touching) but a panel's `width` prop is now inert — every panel is simply full-width in flow.

If this needs to be reverted, note it was deliberately un-reverted once already (see the section above) — confirm intent again before restoring scroll-jacking.

## Post-vertical-scroll design polish pass

Converting to plain vertical scroll surfaced real layout debt: every page's sections still used the old panel-per-viewport pattern (`flex h-full flex-col justify-center` with near-zero `py-2`–`py-8` padding, meant to vertically center content within an exact `100vh` pinned panel). In normal flow that produced cramped, inconsistent gaps between sections. Fixed site-wide (`app/page.tsx`, `app/services/page.tsx`, `app/work/page.tsx`, `app/about/page.tsx`, `components/CaseStudyPanels.tsx`): standardized on generous `py-20 sm:py-28` section rhythm (taller `pt-28 lg:pt-36` under the fixed header for each page's first section), dropped the now-meaningless `h-full`/`justify-center` flex classes, and removed the `HorizontalScroll.Panel width="150vw"` (etc.) wrappers that were only ever there to widen a panel for the old horizontal track.

`CTASection` has its own full-bleed background image and internal padding — it must render as a direct child of the page/`HorizontalScroll`, never nested inside a `max-w-*`/`px-6` container, or its background gets double-padded and no longer bleeds edge-to-edge. Watch for this if adding more `CTASection` placements.

`components/CaseStudyPanels.tsx`'s gallery used to be chunked into groups of 4 images, each its own artificially-widened horizontal panel (a pure scroll-jack accommodation) — a 9-image gallery like Join Mazal's rendered as 3 separate mini-sections, only the first labeled "Gallery". Flattened into one natural responsive grid (`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`, `aspect-[4/3]` tiles) under a single heading.

`components/PortfolioGrid.tsx`: the grid tiles' title/tag caption was entirely hover-gated (`opacity-0` until `group-hover`), meaning touch/mobile visitors never saw a case study's title on the grid — the only way to identify a project without hovering was opening its dialog. Made the caption always visible (existing scrim also switched from hover-triggered to always-on) with only a subtle lift-on-hover.

Removed a stale dev-facing note on `/work` ("Placeholder imagery below — swap in GN Club's own event photography any time via `lib/media.ts`") — leftover from before the site had real photography; reads as unfinished/broken copy to an actual visitor.

## Full visual redesign attempted and reverted — brand guidelines (lime/cyan/amber, Space Grotesk, glass-panel, eyebrow labels) confirmed to stay

A full ground-up redesign ("Protocol Spec": mint/indigo palette, Instrument Sans + IBM Plex Mono, flat panels instead of glass-blur, eyebrow labels removed in favor of a `SectionHeading`/`SpecBlock` system) was built end-to-end via a multi-agent workflow after an explicit "redesign it from scratch" request. It built cleanly (`npm run build`/`lint`/impeccable detect all passed), but was **rejected on review** — "stick to our brand guidelines" — and fully reverted. All redesign-only files/changes (`components/SpecBlock.tsx`, `components/SectionHeading.tsx`, the new palette/font values in `app/globals.css`/`app/layout.tsx`, the rewritten `Hero`/`Header`/`Footer`/`ServiceBento`/case-study-intro treatment) were discarded back to this commit's state; only the unrelated vertical-scroll-conversion and spacing/gallery/caption fixes above (never in dispute) were reapplied on top.

**Takeaway for future work**: the existing dark/lime-primary/cyan-amber-gradient-sparingly/glass-panel/eyebrow-label identity documented throughout this file (see "Visual design" and "Image cropping" sections above) is the confirmed, standing brand system. Don't propose a different palette, type system, or eyebrow removal again without the client asking for it first — "make it appealing" / "improve the design" requests should stay inside this identity (spacing, hierarchy, copy, photography, motion polish), not replace it.

## Hero rebuilt as a clean photo + content stack (no overlay box)

Explicitly requested: the hero's glass-panel text box sitting on top of the group photo was removed. `components/Hero.tsx` is now two parts in normal flow — a full-bleed, unobstructed photo banner first (the group shot with the GN Club logo, which is baked into `/hero-cover.png` already roughly centered in the source image — the crop previously used `object-position: 38% center` in a very tall container, which is what pushed the logo toward the bottom-right on screen; switched to `center` so the crop keeps it centered), then the headline/tagline/CTA/stats stacked below the photo on plain background, not layered over it.

Also removed the "gn CLUB" wordmark next to the logo mark in `components/Header.tsx` — nav now shows just the logo image.

## ServiceBento layout pass ("Six disciplines" homepage/services grid)

The bento grid's row height (140px compact / 190px full) was too tight for icon+title+blurb, causing cramped text and low contrast against brighter photos in some tiles. Fixed in `components/ServiceBento.tsx`: bumped row heights (168px/210px), added a two-stop scrim (`bg-ink/15` flat wash + a stronger gradient) so text stays legible regardless of the underlying photo's brightness, gave the icon its own chip treatment (small bordered/blurred badge instead of a bare line icon floating on the photo) sized to the tile, scaled heading size by tile importance (`lg`/`md`/`sm` — the flagship "Activations and Events" tile now reads as the lead of the grid), and clamped the blurb to 2 lines so it can't overflow a tile. Grid gap bumped from `gap-3` to `gap-4` for a touch more separation. No structural/palette changes — same 8 services, same `lg`/`md`/`sm` span assignments from `lib/services.ts`.

## shadcn component pass + site-wide animation pass

Two explicit requests: use the shadcn MCP to add more real shadcn/ui components, and add generous animation across the site ("a ton of animations on everything"). Built via an ultracode multi-agent workflow (1 shadcn agent + 3 parallel animation agents split by area), verified after with `npm run build`/`lint`/impeccable detect and three real lint errors fixed by hand (a ref read during render in the new `ClientLogos.tsx` autoplay carousel, a synchronous `setState` in an effect in the new `StatsBar.tsx` count-up, and one in shadcn's own generated `components/ui/carousel.tsx` template — silenced with a scoped eslint-disable since it's vendor code matching shadcn's stock pattern).

**New shadcn components**: `carousel` (Base UI, via `embla-carousel-react` + `embla-carousel-autoplay`) and `hover-card`. Used in:
- `components/ClientLogos.tsx` — the "trusted by" logo strip is now a slow autoplaying carousel (pauses on hover/interaction) instead of a static row; drops the autoplay plugin entirely under `prefers-reduced-motion`.
- `components/Testimonials.tsx` — still a 3-column grid at `md:` and up; narrow viewports get a swipeable carousel of the same quote cards instead of a cramped stack.
- `components/TeamGrid.tsx` — each member now has a `HoverCard` revealing a one-line bio on hover/focus, in addition to (not replacing) the always-visible name/role.

**Animation**: touched `PanelReveal`/`Reveal` (shared entrance primitives, same public API), `Hero` (slow ken-burns photo drift, staggered per-word headline reveal), `Header`/`Footer` (nav hover/underline motion, animated mobile menu, hover micro-interactions), `MagneticButton` (tap feedback), `AlternatingRow` (scroll parallax + hover), `ServiceBento` (hover lift), `StatsBar` (numbers count up from 0 when scrolled into view), `CTASection`/`FAQSection`/`CompanyTimeline` (staggered entrances, a "drawing" timeline connector line), `PortfolioGrid`/`CaseStudyPanels` (image hover-zoom, smoother dialog transitions, case-study result values count up), `ContactForm` (focus/submit motion). Every new non-trivial or looping animation (marquee, parallax, count-up, ken-burns) checks `useReducedMotion()` and simplifies/skips itself accordingly, on top of the existing global CSS `prefers-reduced-motion` override for plain transitions.

## Real photography still needed (as of this point in the project)

Tracked here so it's easy to check what's still a stock Unsplash stand-in — every slot below swaps in `lib/media.ts` with no component changes needed:
- All 8 service category photos (`services.*` in `lib/media.ts`)
- Both About page photos (`about.team`, `about.stage`)
- Founders Summit, Chainlink Meetup Manila, Neon Rooftop Launch, and Founders Summit Afterparty case studies (`work.1`–`work.6`) — these also need real attendee/viewer numbers or an honest "TBD" framing like the Pickleball case study, since their current stats are unverified seed content (see "Full redesign" section above and `lib/stats.ts`/`lib/testimonials.ts`'s own PLACEHOLDER comments for the same caveat on the homepage stat bar and testimonial quotes)
- Contact page backdrop (`contact.backdrop`)

## Hero content centered + stat numbers now count up

`components/Hero.tsx`'s text column (tagline, headline, body, buttons) and the stats/client-logos row below it are now center-aligned instead of left-aligned. The stat numbers ("150+", "40+", "3", "12") now animate counting up from 0 when scrolled into view instead of rendering as static text — extracted the count-up logic (previously only in `components/StatsBar.tsx`) into a shared `components/CountUpValue.tsx` component so both `StatsBar` and `Hero` use the same animation instead of duplicating it. Respects `prefers-reduced-motion` (duration 0, jumps straight to the final value).

## Premium-polish pass (site-wide craft floor)

Built via an ultracode 4-agent workflow (shell/hero; homepage content; Services+About; Work+Contact), grounded in a shared brief: elevation only on interactive states (never a shadow under a static flat-bordered card — that's the "ghost card" anti-pattern), real offset+blur shadows replacing zero-offset "halo" glows, type discipline (`tracking-tight` everywhere it was missing, `text-balance` on wrapping headings, `text-pretty`/measured `max-w-prose`/`max-w-[Nch]` on body copy that ran past ~75 characters per line, `tabular-nums` on every animated/counting number), a themed custom scrollbar and a global `:focus-visible` fallback (both new in `app/globals.css`), and a consistency sweep (card radii unified to the existing 12–16px scale, one shared hover-shadow recipe reused across `ServiceBento`/`PortfolioGrid`/`Testimonials`/`AlternatingRow`/`CaseStudyPanels` instead of each inventing its own).

Real defects found and fixed along the way: `ContactForm.tsx`'s submit button had no error state (a failed send silently reverted to "Send message" with only a toast) — added a proper error state to the button itself. `TeamGrid.tsx`'s new hover-card (from the shadcn pass) had `focus-visible:outline-none` with no replacement ring — a real keyboard-accessibility gap — and was leaking shadcn's stock `ring-1 ring-foreground/10` doubled up against the brand's own border. `app/contact/page.tsx` had one card using a bespoke 26px radius instead of the shared `GlassPanel` component's 21.6px `rounded-2xl` — swapped to the shared component.

**Caught in review after the workflow, not by the agents**: the new global `:focus-visible` rule in `app/globals.css` originally included `border-radius: 2px` — since that's a plain box property (not outline-specific), it would have forced every focused element's actual corners to 2px, snapping pill-shaped buttons (`rounded-full`) to near-square while focused. Removed — modern browsers already curve the outline to match an element's own border-radius automatically, so the extra rule was both wrong and unnecessary. Worth remembering: a focus-ring rule that sets border-radius directly (rather than relying on outline-following-the-box) is a red flag to re-check on any future global focus-style change.

## Screenshot → judge → document → improve pipeline (`PREMIUM_AUDIT.md`)

Explicitly requested: real full-page screenshots of every page, reviewed by independent "judge" agents against the live source code, consolidated into a written audit (`PREMIUM_AUDIT.md`, kept in the repo), then implemented by a further set of agents. Ultracode: 4 judge agents → 1 document agent → 4 improve agents, 9 total.

**Tooling note for future sessions**: the `claude-in-chrome` browser tools connect to the *user's own* Chrome (their Windows/macOS devices), which can never reach this sandbox's `localhost` — every attempt to screenshot via it failed all session with a generic "frame showing error page." Switched to `chrome-devtools-mcp`, which runs a local headless-capable Chrome *inside the sandbox* — that reached `localhost:3000` immediately. Use `chrome-devtools-mcp` for any future local dev-server screenshot/verification work on this project; `claude-in-chrome` is only useful for auditing a page the user themselves has open.

**Real, high-value findings from the audit that got fixed:**
- `app/page.tsx`'s "Six disciplines" headline contradicted the actual 8-service catalog (`lib/services.ts`) — fixed to "One production team, zero handoffs."
- `components/ClientLogos.tsx`'s "trusted by" strip was double-dimmed (an `opacity-70` wrapper in `Hero.tsx` stacked on the carousel's own `opacity-80`) — removed the duplicate.
- `lib/services.ts`'s "Others" service tile renamed to "Fabrication & Build" — every other tile is specifically named, "Others" read as an unfinished taxonomy.
- `lib/media.ts`'s `contact.backdrop` (the CTA background image on every page, and the Contact page hero) was a stock Unsplash photo with unrelated text baked into the image itself ("ALL I AM IS YOURS") — swapped for a real WOCEE 2026 photo.
- `lib/portfolio.ts`'s WOCEE stat "Fully branded build" was wrapping to two lines and unbalancing its row — shortened to "Custom."
- `lib/portfolio.ts`'s Pickleball Edition case study shipped literal internal dev instructions as live copy ("PLACEHOLDER — describe what the sponsor needed...", results reading "TBD") — rewritten to honest copy using only the facts already established (LBank Academy sponsor, on-court community pop-up) plus a plain "full write-up in progress" line, instead of either fabricating specifics or leaving raw TODO text live. No numbers were invented.
- A central reveal-robustness fix in `components/Reveal.tsx` / `components/PanelReveal.tsx` / `components/CTASection.tsx`: `viewport={{ margin: "-10%"/"-15%" }}` required scrolling well past an element's edge before it appeared, and there was no fallback for contexts where the IntersectionObserver never fires (print/PDF export, crawlers, very fast scrolls). Changed to `amount: 0` (fires the instant any pixel is on-screen) and added a shared `.reveal-el` class with an `@media print` override forcing visibility in `app/globals.css`.
- Several instances of the same margin issue that the improve agents missed (`ServiceBento.tsx`'s compact-mode grid, two spots in `CaseStudyPanels.tsx`) were caught and fixed by hand afterward.
- `components/PortfolioGrid.tsx` and `components/DuotoneImage.tsx` — first-row grid images now get `priority` so the flagship WOCEE tile doesn't lazy-load in as a blank black card.

**Workflow design gap worth remembering**: none of the 4 improve agents were given `components/Reveal.tsx`, `components/PanelReveal.tsx`, `components/DuotoneImage.tsx`, or any `lib/*.ts` data file in their file-ownership lists, even though the audit's own P0 findings pointed at exactly those files (the central reveal-robustness root cause, and every content/data fix). Caught and fixed by hand after verifying the merged result. Next time: when an audit calls out a shared/foundational file as a root cause, give at least one agent explicit ownership of it rather than assuming it falls under a page-area split.

**Still open — needs real input, not something to fix in code:** `lib/stats.ts`'s four hero stats ("150+ Events produced," "40+ Brand partners," "3 Countries covered," "12 Years running") are explicitly commented in the code as placeholder numbers and have been flagged in this file since early in the project. They're real, animated, prominently-displayed claims on the first thing a visitor sees. Needs GN Club's actual figures, or a decision to swap them for qualitative proof instead — not something to invent.

## Single-viewport "dashboard" redesign — every page fits one screen, no page scroll on desktop

Explicitly requested: "I want everything visible in a single glance." Clarified with the client first (given how radical and layout/identity-affecting this is) — confirmed as a true single-viewport target (not just "less scrolling," not a return to the old horizontal scroll-jack), structure/layout only, brand identity (palette, fonts, cards, eyebrows) untouched.

Built via an ultracode 7-agent workflow: 1 shell agent (compressed `Footer.tsx` to a single ~45px row, `CTASection.tsx` to a single ~80px banner) → 6 parallel page-owning agents (Home; Services; Work index; About; Contact; the `[slug]` case-study template), each required to self-verify via `chrome-devtools-mcp` that `document.documentElement.scrollHeight` doesn't exceed `window.innerHeight` at 1440×900, before reporting done.

**How each page hit the target** (all real content preserved, none deleted — reorganized or moved behind one click):
- **Home**: hero condensed to a slim photo band + short bio; the old four full stacked sections (services grid, about blurb, portfolio grid, testimonials) replaced by one compact 3-column teaser row (services list / work thumbnails / one testimonial), each linking to its full page.
- **Services**: all 8 services in a dense 4-column grid (icon + title + 1-line blurb + offering count); the full item list per service now opens in a shadcn Dialog on click. FAQ moved from an inline accordion section to a small trigger button that opens a Dialog containing the existing Accordion.
- **Work index**: all 9 case studies in a 3×3 grid (dropped the previous variable row-span layout); the existing click-to-open Dialog preview is unchanged. Bonus: the work agent added tag-filter pills above the grid (unprompted, but matches a P2 suggestion from the earlier `PREMIUM_AUDIT.md` pass).
- **About**: two-column layout — story text on the left (the old large-photo `AlternatingRow` sections replaced with compact text-only blocks), team + a horizontally-scrollable timeline filmstrip on the right.
- **Contact**: mostly just padding/backdrop-height trimming — was already close to fitting.
- **Case-study template**: intro + spec-stat row + two-column challenge/approach, with the photo gallery (up to 8 images on WOCEE 2026) converted from a multi-row grid into a horizontally-scrollable filmstrip within a fixed-height row.
- **Mobile (<768px)**: deliberately exempted from the zero-scroll target and falls back to normal vertical stacking at readable sizes — cramming this much real content into a phone screen at zero-scroll isn't realistic or accessible. Confirmed working (Home: 1272px content in an 844px viewport, scrolls normally).

**Independently re-verified after the workflow** (don't just trust agents' self-reported numbers — see the `resize_page` gotcha below): confirmed `scrollHeight === innerHeight` (zero overflow) at true 1440×900 on all 6 pages (Home, Services, Work, About, Contact, WOCEE 2026 case study — the one with the most gallery images, per the workflow's own instruction to spot-check the worst case).

**Tooling gotcha worth remembering**: `chrome-devtools-mcp`'s `resize_page` tool does NOT reliably set a true CDP viewport override — on some tabs it only resized the real OS window (capped at this sandbox's actual screen height, ~732px here), silently giving false low measurements. The `emulate` tool with a `viewport: "1440x900x1"` string reliably triggers real device-metrics emulation (prints "Emulating viewport: {...}" in its response — that confirmation is the signal it actually took). Use `emulate`, not `resize_page`, for any future viewport-dependent verification (single-viewport checks, responsive breakpoint testing, etc.) on this project.

## Single-viewport constraint reverted — "scrollable in one screen," not "fit all in one screen"

The single-viewport redesign above was a misread of the client's intent. Immediate correction: **"I want it to be scrollable in one screen, not fit all in one screen."** Every page is back to normal, spacious, fully-scrollable layout — the zero-scroll constraint is gone entirely.

Built via a second ultracode 7-agent workflow (same shell + 6-page split as the single-viewport pass), instructed to undo the density/fit-to-viewport changes specifically while **keeping every other fix** from every prior pass (honest copy rewrites, real photo swaps, premium-polish shadows/type/focus-rings, reveal-animation robustness, shadcn additions, the client-logo fix). Independently re-verified after the workflow (build/lint clean, real browser check via `chrome-devtools-mcp`) — every page now has a normal `scrollHeight` well past `innerHeight` again, e.g. Home ~4578px, Work ~grows past one screen with all 9 tiles at proper size, the WOCEE case study ~1666px with full unclamped text and a real gallery grid.

Specifics restored:
- Hero: back to a proportionate photo band (chosen a middle ground — not the old 72vh full-screen hero, not the ~22vh sliver from the zero-scroll pass) with full-size headline/type.
- Home: three genuine full sections (Services/Work/Testimonials, each with real `ServiceBento`/`PortfolioGrid`/`Testimonials` components) instead of one cramped 3-column teaser row.
- Services: ServiceBento's dense click-to-open-dialog tile grid removed — back to the asymmetric photo-bento layout with full item lists inline. FAQ back to an inline accordion section, not gated behind a dialog trigger.
- Work: PortfolioGrid's flagship row-span hierarchy restored (WOCEE/Founders Summit get taller tiles again), grid rows/gaps loosened back up. Kept the tag-filter pills and the click-to-open case-study-preview dialog — those were genuine improvements, not zero-scroll artifacts.
- About: `AlternatingRow` (photo + text) sections restored for the two story blocks — no longer text-only.
- Case-study template: the forced `md:h-[calc(100svh-6.25rem)]` height lock removed entirely; challenge/approach paragraphs un-clamped; gallery back to a normal grid.

**Takeaway for future ambiguous layout requests**: even after an explicit clarifying question ("single-viewport dashboard" vs. other options), a literal zero-scroll interpretation can still be wrong in practice for a content-rich marketing site — when a request could mean either "compact" or "literally no scrolling," lean toward compact/generous-but-scrollable as the safer default for this project, and treat "single viewport" literally only if the client reconfirms it after seeing a concrete example.

## Nav restructured to a persistent left sidebar (site-wide)

Explicitly requested, referencing a personal-portfolio site with a left sidebar nav. Clarified scope first: site-wide (every page), navigation only — no extras like the reference's live-viewer-count/chat/keyboard-shortcuts widgets.

Built via an ultracode 7-agent workflow (1 shell agent + 6 page agents fixing now-obsolete top-header-clearance spacing). `components/Header.tsx` is gone, replaced by `components/Sidebar.tsx`:
- **Desktop (md: and up)**: a fixed 260px-wide left column (`fixed inset-y-0 left-0`, flat `bg-ink-deep/60` + `backdrop-blur-md`, hairline `border-r`) — logo, the same `site.nav` links (Services/Work/About/Contact) as a vertical list with a small vertical accent bar marking the active page (adapted from the old header's horizontal underline), and the "Start a project" CTA lower in the column. `app/layout.tsx`'s `<body>` carries `md:pl-[260px]` to offset the content column — pages themselves don't handle that horizontal offset.
- **Mobile (below md:)**: falls back to the same slim fixed top bar + hamburger-opened nav overlay the old header already had — that code was carried over essentially unchanged, just relocated into `Sidebar.tsx`'s `MobileTopBar`.
- **`components/Footer.tsx`** simplified: dropped the logo/wordmark row (redundant with the sidebar's own logo) but kept the copyright, email, and all three social links.
- **Every page's old top padding** (sized to clear the previous *fixed top* header) was split into mobile-only clearance (kept, since mobile still has a top bar) and desktop clearance (zeroed on most pages, since the sidebar takes no vertical space at all — content starts at the top of its column). The case-study template kept a modest `md:pt-16` rather than zero, a deliberate choice for its photo-backdrop hero section, not a leftover bug.

Verified: `npm run build`/`npm run lint` clean, source-reviewed the new `Sidebar.tsx`/`layout.tsx`/`Footer.tsx` and every page's padding diff by hand (the `chrome-devtools-mcp` browser tool had disconnected from this session at verification time, so this pass relied on code review rather than a live screenshot check — worth a visual pass next session to confirm).
