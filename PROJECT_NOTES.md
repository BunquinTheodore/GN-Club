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
