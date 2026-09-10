# shadcn MCP server

## What it is

The shadcn MCP (Model Context Protocol) server lets an AI coding assistant (Claude Code, in this
repo) talk directly to the shadcn registry system instead of the assistant guessing at component
code from training data or the user copy-pasting from ui.shadcn.com. Concretely, it exposes the
shadcn CLI's registry operations as MCP tools, so an assistant can, in-session:

- **Search/browse** the shadcn registry (and any additional registries configured in
  `components.json` → `registries`) for components, blocks, hooks, pages, and themes.
- **View/fetch details** for a specific registry item (its files, dependencies, required Tailwind
  config, CSS variables) before installing it, so the assistant can decide if it fits.
- **Fetch docs/usage examples** for a component (props, API surface, composition patterns) without
  needing an outdated snapshot from training data — important because this project pins shadcn's
  newer `base-nova` style (see below), which differs from the older "New York"/"Default" styles
  most training data assumes.
- **Install ("add") components on demand**, writing the generated source directly into this
  project's `components/ui/` (per the aliases in `components.json`), pulling in whatever npm
  dependencies (e.g. Radix/Base UI primitives) that component needs.

In short: it turns "add a Tabs component" from a manual "open browser, copy code, paste, fix
imports" chore into something the assistant can do directly and correctly, respecting this
project's existing style/config rather than shadcn's generic defaults.

These are the underlying shadcn CLI commands the MCP server wraps (from `npx shadcn@latest --help`):

```
docs [options] <components...>         get docs, api references and usage examples for components
view [options] <items...>              view items from the registry
search|list [options] [registries...]  search items from registries
add [options] [components...]          add a component to your project
```

## How it's configured for this project

- **Client:** Claude Code (`--client claude`).
- **Install command run:** `npx shadcn@latest mcp init --client claude`, executed in the repo
  root (`C:\GN Club`).
- **Config location:** the command generated `C:\GN Club\.mcp.json` (project-scoped, not user
  global), containing:

  ```json
  {
    "mcpServers": {
      "shadcn": {
        "command": "npx",
        "args": ["shadcn@latest", "mcp"]
      }
    }
  }
  ```

  This means Claude Code launches the MCP server on demand via `npx shadcn@latest mcp` — no global
  install or extra service to run. Because `.mcp.json` lives in the repo, anyone who opens this
  project with Claude Code (and approves the project MCP server) gets the same tool automatically;
  it is not tied to one machine's user config.
- `components.json` was **not** modified by this install — it was already correctly set up (style
  `base-nova`, `cssVariables: true`, `baseColor: neutral`, aliases pointing at `@/components`,
  `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`). The MCP server reads this file to know
  where to place new components and which style/registry to pull from.
- Prior to this setup, there was no `.mcp.json` and no shadcn entry in `claude mcp list`, so this
  was a fresh install, not a reconfiguration.

## Already-installed shadcn components (`components/ui/`)

This project currently has:

- `badge.tsx`
- `button.tsx`
- `card.tsx`
- `dialog.tsx`
- `input.tsx`
- `label.tsx`
- `select.tsx`
- `textarea.tsx`
- `sonner.tsx` — toast notifications. Simplified after install: the generated file pulled in
  `next-themes` to pick light/dark automatically, but this site has no theme toggle (dark-only by
  design), so that dependency was removed and the toaster is pinned to `theme="dark"` directly.
  Wired up in `app/layout.tsx` (`<Toaster />`) and used in `components/ContactForm.tsx`
  (`toast.success(...)` / `toast.error(...)` on submit — replaced the old inline "Message sent."
  panel takeover, so the form resets and the confirmation doesn't require scrolling to see).
- `avatar.tsx` — used in `components/TeamGrid.tsx` in place of the old hand-rolled initials circle
  div. Same visual result today (`AvatarFallback` renders the initials with the existing
  `gradient-ring-border` treatment), but now ready for `<AvatarImage src={...} />` once real
  headshots exist, with no markup rewrite needed.
- `accordion.tsx` — used in the new `components/FAQSection.tsx`, rendered as its own panel on
  `/services` (content in `lib/faq.ts`, currently placeholder copy — same convention as
  `lib/team.ts`/`lib/timeline.ts`). Base UI's accordion API differs from Radix (the CLI's own demo
  examples show Radix's `type="single" collapsible` props) — this project's build uses `multiple`
  (boolean, default `false`) instead; check `node_modules/@base-ui/react/accordion/root/AccordionRoot.d.ts`
  if unsure rather than trusting a fetched Radix-style example verbatim.

These are used across the site (e.g. `ContactForm`, `PortfolioGrid`) and are built on `@base-ui/react`
primitives per the `base-nova` style.

## Commonly-useful components NOT yet installed

Still worth considering for future work (none of these currently exist in `components/ui/`):

- **Tabs** — switching between service categories, case-study views, or pricing tiers.
- **Carousel** — client logos, testimonials, or portfolio/case-study image galleries (an
  alternative/complement to the custom `HorizontalScroll`/`PanelReveal` components already in this
  repo).
- **Tooltip** — inline hints on service or pricing detail.
- **Sheet** — mobile nav drawer or a slide-in contact/quote panel.
- **Skeleton** — loading states for portfolio/work grid images.
- **Separator** — visual dividers between sections (may already be handled with custom CSS/borders
  — worth checking before adding).
- **Navigation Menu** — structured top nav with dropdowns, if the nav grows beyond simple links.
- **Marquee / logo-cloud style block** — for `ClientLogos.tsx`, which currently appears to be a
  hand-rolled component; a registry block could simplify or inspire it.
- **Popover** — filter controls on `app/work/page.tsx` or the portfolio grid.
- **Hover Card** — richer preview-on-hover for case study/work items.

These are suggestions to evaluate, not a mandate — check each against what the existing custom
components (`AlternatingRow`, `CaseStudyPanels`, `HorizontalScroll`, `PanelReveal`, `Hero`) already
do before adding a registry equivalent that might duplicate functionality. Also remember every new
panel added to a `HorizontalScroll` page must still fit one screen height — see the "every panel
now fits on screen" note in `PROJECT_NOTES.md` before adding tall new sections.

## How to use this going forward

- Ask Claude (in a Claude Code session against this repo) to add a component, e.g.: *"Add the
  shadcn Accordion component via the shadcn MCP server."* Claude Code will use the MCP tools to
  search/view the component, then run the install so it lands in `components/ui/` using this
  project's configured aliases and style.
- **Always adapt new components to this project's existing conventions, not shadcn's defaults:**
  - This project runs a **dark theme by default** via CSS custom properties defined in
    `app/globals.css` (`--ink`, `--fog`, `--lime`, `--cyan`, `--amber`, etc., mapped onto the
    standard shadcn tokens like `--background`, `--foreground`, `--primary`, `--ring`). A newly
    added component should consume these existing tokens (`bg-background`, `text-foreground`,
    `bg-primary`, etc.) rather than hardcoding shadcn's light-theme defaults or introducing new
    color literals.
  - Use the existing `--radius` token (`0.75rem`) and the `cn()` helper from `@/lib/utils`
    (re-exported from the `cn` package, see `lib/utils.ts`) for conditional class composition,
    matching the pattern already used in `components/ui/*`.
  - Respect the `base-nova` style and `@base-ui/react` primitive choice already locked in via
    `components.json` — don't mix in Radix-based variants of a component if a Base UI-based one is
    available, to keep the primitive layer consistent.
- Since MCP tool lists are loaded at session start, if the shadcn tools don't appear to be
  available in an active Claude Code session, start a **new** session after this `.mcp.json` is in
  place (and approve the project's MCP server if prompted) so the tools register.
