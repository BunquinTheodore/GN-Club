# GN Club — Marketing Site

## 1. Overview

This is the public marketing website for **GN Club**, an event-activation and full-production company based in the Philippines that builds activations, conferences, product launches, livestreams, and community events for tech and Web3 brands, in the Philippines and globally. The site pitches GN Club's in-house, one-team production model (strategy, build, staffing, video, digital, and merch all run internally, not brokered out) to prospective enterprise/Web3 clients, and funnels them to a contact form. It is a single-brand site (not a multi-tenant or CMS-driven platform) — all content is currently hardcoded in TypeScript data files under `lib/`.

## 2. Stack

- **Framework**: Next.js `16.3.4` (App Router), React `19.2.8`, TypeScript `^5`.
  - `AGENTS.md`/`CLAUDE.md` explicitly warn that this Next.js version has breaking changes vs. training-data knowledge — check `node_modules/next/dist/docs/` before making framework-level changes.
- **Styling**: Tailwind CSS v4 (`@theme inline` token system in `app/globals.css`), `tw-animate-css`, a hand-rolled dark "glass panel" / neon design system (lime `#c6f24e` primary accent, cyan/amber used sparingly for a signature gradient).
- **UI components**: shadcn/ui (Base UI primitives, not Radix — see `docs/shadcn-mcp.md` for API gotchas), plus bespoke components (`GlassPanel`, `DuotoneImage`, `MagneticButton`, etc.).
- **Animation**: Framer Motion (`framer-motion` — note: package.json pins `^13.2.0`, an unusually low major for a Next 16/React 19 project; worth double-checking this is intentional and not a stale/typo'd version).
- **Carousel**: `embla-carousel-react` + `embla-carousel-autoplay` (client logos, testimonials on narrow viewports).
- **Toasts**: `sonner`.
- **Fonts**: `next/font/google` — Inter (body), Space Grotesk (display/headings), Geist (loaded but its CSS variable isn't wired into any Tailwind font utility — see Gaps).
- **Backend / CMS / forms**: **No CMS.** All copy and media references live in `lib/*.ts` data files, edited directly in code. There **is** a working contact form (`components/ContactForm.tsx`) that POSTs to a real API route (`app/api/contact/route.ts`), but that route only `console.log`s the submission — it is **not wired to any email/CRM provider** (see Gaps). No database, no auth.
- **Images**: `next/image`, mostly Unsplash stock URLs (via `lib/media.ts`) plus a growing set of real GN Club photography under `public/images/`.
- **Tooling**: shadcn MCP server configured (`.mcp.json`) for AI-assisted component installs; ESLint 9 flat config.

## 3. Structure

### Route map

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home — hero (photo band + headline + stats + client logos), "What we do" services teaser, "Recent work" case-study grid, testimonials, closing CTA. |
| `/services` | `app/services/page.tsx` | All 9 services in a bento grid (`ServiceBento full`) plus an FAQ accordion. |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | One detail page per service (`ServiceDetailPanels`): overview, "what's included" list, optional long-form overview/process sections, gallery, and a closing CTA — driven by `lib/services.ts`. |
| `/work` | `app/work/page.tsx` | Portfolio grid (9 case studies, tag-filterable, click-to-preview dialog) + an events timeline below it. |
| `/work/[slug]` | `app/work/[slug]/page.tsx` | One case-study detail page per portfolio entry (`CaseStudyPanels`): overview/stats, challenge & approach, photo gallery — driven by `lib/portfolio.ts`. |
| `/about` | `app/about/page.tsx` | Company intro, "how we work" / "virtual production" alternating photo+text rows, company timeline, team grid, closing CTA. |
| `/contact` | `app/contact/page.tsx` | Contact form, direct email/social links, a 3-step "how it works" mini-timeline. |
| `/api/contact` | `app/api/contact/route.ts` | POST-only API route backing the contact form; validates required fields and logs the payload server-side (no persistence, no outbound email/CRM call). |

There is no `/404`, `/privacy`, or `/terms` page (Next's default not-found is used via `notFound()` calls in the two `[slug]` routes).

### Key directories

- `components/` — all page-level and shared UI components (hero, sidebar/nav, footer, forms, animated reveal wrappers, the horizontal-scroll-jack track, image treatment components).
- `components/ui/` — shadcn/ui primitives (accordion, avatar, badge, button, card, carousel, dialog, hover-card, input, label, select, sonner/toaster, textarea).
- `lib/` — all site content as typed data: `site.ts` (nav/contact/socials), `services.ts`, `portfolio.ts`, `events.ts`, `team.ts`, `timeline.ts`, `testimonials.ts`, `clients.ts`, `faq.ts`, `stats.ts`, `media.ts` (the single image-slot → URL map), `utils.ts`.
- `hooks/useMediaQuery.ts` — the one custom hook, used to gate the desktop-only horizontal scroll-jack behavior.
- `public/images/{wocee,pickleball,mazal,brands}/` — real GN Club photography and partner logos; everything else referenced from `lib/media.ts` is a remote Unsplash URL.
- `PROJECT_NOTES.md` — a hand-maintained running log of client decisions and past redesign passes; read it before making any layout/interaction/brand change, since several major changes (horizontal scroll-jack, single-viewport, top header) have been tried, reverted, and re-confirmed multiple times.
- `PREMIUM_AUDIT.md` — a prior design audit with prioritized findings; several are still open (see Gaps).

## 4. What exists

- A full 4-page site (Home, Services, Work, About) plus Contact, each with real, GN-Club-specific copy (not generic Lorem-ipsum placeholder text) and 9 real services / 9 real case studies defined in `lib/services.ts` / `lib/portfolio.ts`.
- Working, validated contact form (`ContactForm.tsx`) with required-field validation, loading/success/error states, and toast feedback, posting to a real (if unfinished — see Gaps) API route.
- Real GN Club event photography for 2 of 9 case studies (WOCEE 2026 — 8 photos; Pickleball Edition — 4 photos) and real marketing-collateral graphics for a 3rd (Join Mazal — 9 images), all under `public/images/`. The other 6 case studies and all 9 service tiles still use curated Unsplash stock (see Gaps).
- A working events timeline on `/work` (`EventsTimeline.tsx` / `lib/events.ts`) reusing the 3 real portfolio entries plus one explicit "coming soon" stub (CJC Race Soft Launch) with no fabricated data.
- A desktop-only "scroll-jack" horizontal panel-panning interaction (`ScrollJackTrack.tsx`) still actively used on About, Contact, every service detail page, and every case-study detail page — it falls back to a plain vertical stack on mobile, reduced-motion, or single-panel content. (Note: `PROJECT_NOTES.md` documents a *different*, now-retired component, `HorizontalScroll.tsx`, being converted to plain vertical stacking; `ScrollJackTrack.tsx` is a separate, still-live component — see Gaps for why this is worth flagging.)
- A persistent left sidebar nav (desktop) with hover-expandable submenus for Services/Work, and a slim top bar + slide-down menu on mobile (`Sidebar.tsx`).
- Site-wide animation pass: entrance reveals (`Reveal`/`PanelReveal`), count-up stat numbers (`CountUpValue`), a custom scrollbar, a `prefers-reduced-motion`-aware click sound (`ClickSoundProvider`), and a print-media CSS fallback that forces reveal-gated content visible for print/PDF export.
- A custom GN-mascot cursor image, a duotone/grayscale photo-grading treatment (`DuotoneImage.tsx`) applied to most backdrop and gallery photography, and a shared `GlassPanel` component used for cards/stat tiles/steps throughout.
- Accessible-by-default alt text on most decorative overlays (`alt=""` on pure backdrops) and visible focus rings (`:focus-visible` global fallback in `app/globals.css`).

## 5. What's missing / known gaps

**Backend / data wiring**
- `app/api/contact/route.ts:10` — explicit `// TODO: wire up to an email/CRM provider (e.g. Resend, SendGrid, HubSpot)`. Right now a submitted contact form only logs to the server console (`console.log("New GN Club inquiry:", data)`, line 12) — **no email is actually sent to GN Club**, despite the UI promising "we reply within one business day." This is the single most consequential functional gap on the site.

**Placeholder / unfinished content (explicitly flagged in code comments)**
- `lib/stats.ts:7` — the four homepage hero stats ("150+ Events produced," "40+ Brand partners," "3 Countries covered," "12 Years running") are explicitly commented as placeholder numbers, not confirmed GN Club figures, yet render as real, animated facts.
- `lib/portfolio.ts:16,44-48` — the "GN Club Lifestyle: Pickleball Edition" case study's `challenge`/`approach` fields read as unfinished ("Full case study write up in progress... A full breakdown of the production scope is coming soon"), not final client copy.
- `lib/team.ts:8` — team member roles are explicitly commented as "placeholder titles carried over from the previous roster."
- `lib/testimonials.ts:8` and `lib/faq.ts:7` — testimonial quotes and FAQ answers are explicitly commented as placeholder copy awaiting real client quotes / real pricing-and-policy answers.
- `lib/timeline.ts:8` — the About page's company history timeline is explicitly commented as placeholder, not GN Club's real founding date/milestones.
- `lib/events.ts:45,55,65,75-78` — 4 of the timeline's dates are literal `"TODO"` strings (rendered as "Date TBC" in the UI, `components/EventsTimeline.tsx:42`), and the 4th event ("CJC Race Soft Launch") has no case-study entry in `lib/portfolio.ts` at all and no photos in `public/images/` — it renders a styled "Photos coming soon" placeholder tile instead of a photo (`components/EventsTimeline.tsx:64`).
- `lib/media.ts:2-4` — every image slot except `hero.cover`, the `wocee.*`/`pickleball.*`/`mazal.*` slots, and the `brand.*` logos is explicitly commented as a "stock placeholder... standing in for GN Club's own event photography," covering all 8 service-category photos, both About page photos, and 6 of 9 case-study photo sets (`work.1`–`work.6`).

**Missing pages implied by the nav / content**
- No `/privacy` or `/terms` page, despite the contact form collecting name/email/phone/company (routine for a form like this, but worth a decision either way before public launch).
- No dedicated `/404` page beyond Next's default (only reachable via the two `notFound()` calls in the `[slug]` routes).

**Interaction/architecture inconsistency worth a decision**
- `PROJECT_NOTES.md` documents `components/HorizontalScroll.tsx` being explicitly converted from a pinned horizontal scroll-jack into a plain vertical-stack wrapper. But a **second, separate** component, `components/ScrollJackTrack.tsx`, still implements the full pinned/panned horizontal-scroll-jack behavior (sticky viewport, spring-driven `x` transform, pagination dots, keyboard left/right paging) and is actively used on `/about`, `/contact`, every `/services/[slug]`, and every `/work/[slug]` page. It's unclear from the notes whether this is intentional (a second, deliberately-kept interaction pattern) or a stale component that should also have been retired — worth confirming with whoever made that "removed scroll-jacking" decision, since right now the site has both a vertical-scrolling Home/Work/Services and a horizontal-panning About/Contact/every detail page.

**Small/loose ends**
- `package.json:17` — `framer-motion: "^13.2.0"` is a notably old major version to pair with Next 16 / React 19; worth confirming this isn't a stale pin (the animation code otherwise uses modern APIs like `useReducedMotion`/`whileInView`).
- `Geist` is imported and given a CSS variable in `app/layout.tsx:10` (`--font-sans`) but that variable is never referenced by any Tailwind font utility in `app/globals.css`'s `@theme` block (`--font-sans: var(--font-sans)` is a self-reference, not a mapping to the Geist variable) — likely dead/no-op font loading.
- `components/Footer.tsx` only renders on mobile (`md:hidden`); on desktop, footer-equivalent content (copyright, email, socials) lives inside `Sidebar.tsx` instead. That's a legitimate layout choice (sidebar replaces the footer's job on desktop) but isn't documented anywhere as intentional, so it can look like a bug at first glance.
- Accessibility: `ScrollJackTrack.tsx`'s pagination dots (`components/ScrollJackTrack.tsx:196-212`) have `aria-label`s but no indication of the *current* panel to assistive tech (no `aria-current`), and its keyboard handler (`handleKeyDown`) only supports Arrow/Page keys when the track `<div>` itself has focus — there's no visible focus indicator on that tabbable track wrapper.
- The Contact page's optional-field labeling is inconsistent: Phone's placeholder says "Phone (optional)" (`components/ContactForm.tsx:91`) while Company says "Company / brand (optional)" (line 100) — both are fine on their own, but neither is marked with a consistent visual convention (e.g., asterisk on required fields) distinguishing them from the required Name/Email/Service/Message fields.
- `PREMIUM_AUDIT.md` (kept in the repo as a past audit) still lists several P1–P3 findings whose fix status isn't obvious from a plain code read — e.g., whether the "Others" service tile was fully renamed (it was, to "Fabrication & Build," confirmed in `lib/services.ts:223`) versus whether the reveal-animation robustness fix and the double-opacity client-logo issue were fully applied everywhere the audit flagged. Worth a fresh pass to close out or explicitly re-open each numbered item.

## 6. Dev

```bash
npm install
npm run dev      # next dev — starts the dev server
npm run build     # next build
npm run start     # next start (serves the production build)
npm run lint      # eslint
```

No custom port is configured anywhere in the repo (`package.json`, `next.config.ts`, and `PROJECT_NOTES.md`/`PREMIUM_AUDIT.md` all confirm this) — `npm run dev` uses Next's default, **http://localhost:3000**. `PROJECT_NOTES.md` does note that this project's own `localhost` dev server is only reachable from a headless Chrome running *inside* the same sandbox (`chrome-devtools-mcp`), not from a separately-launched browser session (`claude-in-chrome`) — relevant only for anyone doing automated browser verification of local changes, not for normal `npm run dev` usage.

---

## Background/section treatment audit (focus task)

Every background-image and background-color/gradient treatment on the site was read component-by-component. The core photographic treatment tool, `DuotoneImage` (`components/DuotoneImage.tsx:29-51`), is used consistently everywhere it's invoked: `fill` + `object-cover`, a fixed grayscale/contrast/brightness filter stack (`grayscale contrast-110 brightness-[0.85]`), plus two built-in overlay layers (a cyan→ink `mix-blend-color` duotone tint, and a bottom-anchored `from-ink via-ink/10 to-transparent` gradient). Aspect handling is uniform (always an absolutely-positioned fill inside a `relative` ancestor with an explicit height) — no page uses a different crop/fit strategy for the same kind of slot. The inconsistencies below are all about *which pages get this treatment, at what opacity, and with what extra scrim layered on top* — not about the underlying image component itself.

### Confirmed inconsistent

1. **Home page's hero photo is full-color, not duotone-graded — every other page's backdrop photo is desaturated.** `components/Hero.tsx:71-78` renders `/hero-cover.png` through a plain `next/image` with `className="object-cover"` — no grayscale/contrast filter, no duotone tint. Every other "hero" or section backdrop on the site (`app/about/page.tsx:34`, `app/contact/page.tsx:28`, `components/CTASection.tsx:11`, `components/PersistentPanelBackground.tsx:22-24` used by both `CaseStudyPanels.tsx:202-206` and `ServiceDetailPanels.tsx:219`) goes through `DuotoneImage` and gets the same cool grayscale/cyan-tint look. This is the largest, most visible photo on the site being the one exception to the site's own signature "duotone photography" identity described in `PROJECT_NOTES.md`.

2. **Home page's mid-page sections have no background photo/wash at all, while every other page's equivalent sections do.** `app/page.tsx`'s "What we do" (line 17), "Recent work" (line 42), and "Testimonials" (line 67) sections are plain `bg-ink` with zero background image or gradient — only `ServiceBento`/`PortfolioGrid`'s own card-level photos provide any imagery. By contrast, About (`app/about/page.tsx`), Contact (`app/contact/page.tsx`), every `/services/[slug]` (`ServiceDetailPanels.tsx`), and every `/work/[slug]` (`CaseStudyPanels.tsx`) give *every* panel a moody photographic backdrop wash. Home is the only page whose non-hero content sits on flat, unphotographed background.

3. **About and Contact page hero panels bypass `PersistentPanelBackground` and duplicate its logic inline, with a different/extra overlay.** `CaseStudyPanels.tsx:198-207` and `ServiceDetailPanels.tsx:216-220` both pass a `background={<PersistentPanelBackground .../>}` prop into `ScrollJackTrack`, so the backdrop photo renders once behind the whole panel track (single `DuotoneImage` call, opacity baked in at `className="opacity-30"` inside `PersistentPanelBackground.tsx:23`). About's intro panel (`app/about/page.tsx:34`) and Contact's single panel (`app/contact/page.tsx:28`) instead call `DuotoneImage` **directly inside their own panel content**, each with its own explicit `className="opacity-30"`, and — About only — an *additional* explicit scrim div on top (`app/about/page.tsx:35`, `bg-gradient-to-b from-ink/60 via-ink/30 to-ink`) that CaseStudyPanels/ServiceDetailPanels don't stack on their Overview panels. Net effect: About's hero image is darkened by three stacked overlays (DuotoneImage's own two + the extra explicit one) versus Contact's one extra overlay and the case-study/service-detail pattern's none-beyond-DuotoneImage-itself. Functionally these end up visually close (same 0.30 opacity input), but the *pattern* — direct `DuotoneImage` call vs. shared `background` prop — is inconsistent across four otherwise-identical "photo-backed `ScrollJackTrack` hero panel" implementations, and only About and Contact are missing the reusable `PersistentPanelBackground` component that exists specifically to standardize this.

4. **`DuotoneImage` opacity values are a different, seemingly ad hoc number on every call site with no documented scale.** Observed values: `opacity-30` (About hero, Contact hero, `PersistentPanelBackground` used by case studies/service details), `opacity-40` (`CTASection.tsx:11`), `opacity-70` (`ServiceDetailPanels.tsx:74`, the "What's included" panel's own product photo — a different *kind* of image, not a full-bleed backdrop, so this one is arguably justified), and full/no-opacity-class card photography in `ServiceBento.tsx:62-66` and `PortfolioGrid.tsx:100-107` (cards rely on their own separate scrim divs instead of `DuotoneImage`'s opacity prop). There's no code comment or shared constant explaining why backdrops are 30% in some places and 40% in `CTASection`, and `CTASection` renders on Home, on the closing panel of About, and as the last panel of every service-detail page — meaning the *same component* looks correctly consistent with itself, but sits at a different backdrop opacity than the page content immediately around it in About/service-detail pages (see #5).

5. **`CTASection`'s self-contained background photo gets double-scrimmed when embedded inside `ScrollJackTrack` pages, unlike on Home.** On Home (`app/page.tsx:81`) and the standalone Contact/About pages, `CTASection` renders with just its own `opacity-40` `DuotoneImage` (`components/CTASection.tsx:11`). But when the same component is nested as the closing panel inside `app/about/page.tsx:120-126` and `components/ServiceDetailPanels.tsx:200-213`, an **additional** wrapping `bg-ink/50` scrim div is placed around it (`ServiceDetailPanels.tsx:208`, comment at line 204-207 acknowledges this is deliberate "so it doesn't fully occlude the shared persistent background") — so the CTA band's visual darkness differs depending on which page it's embedded in, purely because of an extra div at the call site, not a prop on `CTASection` itself.

### Already consistent (no action needed)

- **Card-level photography** (`ServiceBento.tsx`, `PortfolioGrid.tsx`, the gallery grids in `CaseStudyPanels.tsx:170-190` and `ServiceDetailPanels.tsx:177-193`) is fully consistent: same `DuotoneImage` component, same `absolute inset-0` + hover-zoom wrapper pattern, same two-stop scrim (`bg-ink/15` flat wash + `bg-gradient-to-t from-ink ... to-ink/10`), same `card-shine` sweep overlay, same object-position override pattern (a small per-slot `Record<string, string>` lookup) used identically across all four components.
- **`GlassPanel`** (`components/GlassPanel.tsx`) — the one shared translucent-card background (`--glass` / `--glass-border` tokens, `backdrop-blur(20px) saturate(140%)`) is used with zero variation across `ContactForm`'s wrapper, stat tiles in `CaseStudyPanels`/`ServiceDetailPanels`, service-item chips, FAQ, and the Contact page's mini-timeline steps — always the same CSS custom properties from `app/globals.css:170-175`, no page overrides the glass recipe.
- **Sidebar/nav background** (`components/Sidebar.tsx:28-51`) is a single, self-consistent treatment (fixed `bg-ink-deep/60` + `backdrop-blur-md` + a low-opacity radial-gradient "surface wash" + a signature cyan→lime→amber right-edge hairline) that doesn't vary between pages, since the sidebar is rendered once in the shared `app/layout.tsx` rather than per-page.
- **Aspect/crop handling** is uniform site-wide: every backdrop and every card photo is `fill` + `object-cover` inside an explicitly-sized `relative` ancestor, with a documented, opt-in `position` prop (`DuotoneImage.tsx:9-11`) used only where a specific photo's subject needs art-direction (e.g. `pickleball.1`, `work.1`) — no page uses `object-contain`/letterboxing or a different fit strategy.

**Actionable summary for a developer**: to make backgrounds fully consistent, (a) decide whether the Home hero photo should also go through `DuotoneImage`'s duotone treatment or whether Home is meant to be the deliberate full-color exception; (b) decide whether Home's three flat mid-page sections should get a photo wash like every other page's sections, or whether that's Home's deliberate "breathing room" contrast; (c) refactor About's and Contact's hero panels to use `PersistentPanelBackground` via the `background` prop (matching `CaseStudyPanels`/`ServiceDetailPanels`) instead of an inline `DuotoneImage` call, and drop About's extra third overlay div to match the other three pages' single-scrim pattern; (d) either document a fixed opacity scale for `DuotoneImage` backdrops (e.g. "0.30 for hero panels, 0.40 for CTA bands") in a code comment, or standardize on one value; (e) move `CTASection`'s "am I nested inside another persistent background" scrim logic into a prop on `CTASection` itself (e.g. `dimmed?: boolean`) instead of an ad hoc wrapper div duplicated at two call sites.
