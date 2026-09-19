import type { CaseStudy } from "./portfolio";

export type TimelineEvent = {
  /** Matches a `portfolio.ts` slug when a full case study exists for this
   * event, so the timeline can link straight to `/work/[slug]`. `null` for
   * events (like CJC Race Soft Launch) that don't have one yet. */
  slug: string | null;
  title: string;
  tag: string;
  /** Calendar date string, or `"TODO"` when not yet confirmed. Never invent
   * a date here — leave "TODO" until GN Club provides the real one. */
  date: string;
  /** Short, event-specific line for the timeline card. Kept separate from
   * `portfolio.ts`'s longer case-study `description` so this can stay a
   * one- or two-sentence summary even once a full write-up exists. */
  summary: string;
  /** "confirmed" events are real GN Club work (may still have TODO fields
   * that need filling in). "todo" events are real bookings/activations that
   * don't have write-up copy yet — the card renders visibly as a stub. */
  status: "confirmed" | "todo";
  /** `lib/media.ts` slot for the timeline thumbnail, or `null` when no real
   * photo exists yet (renders a styled placeholder instead of a stock photo,
   * per the no-fake-imagery rule). */
  slot: string | null;
};

/**
 * Events-focused view of the real work already in `lib/portfolio.ts`.
 * Deliberately excludes the placeholder/sample entries flagged as such in
 * that file's own comments (Founders Summit, Chainlink Meetup Manila, Neon
 * Rooftop Launch, Founders Summit Afterparty, Studio Livestream, Regional
 * Roadshow) — those are seed content, not real GN Club events, and don't
 * belong in a section meant to showcase confirmed work.
 *
 * CJC Race Soft Launch has a real assets folder (Drive export) but no
 * case-study copy or confirmed date yet — included here as an explicit
 * "coming soon" stub rather than left out silently, since the booking
 * itself is real even though the write-up isn't ready.
 */
export const events: TimelineEvent[] = [
  {
    slug: "wocee-2026",
    title: "WOCEE 2026",
    tag: "Consumer Electronics Expo",
    date: "TODO",
    summary:
      "GN Club produced and ran \"The Nexus Stage\": a fully branded stage environment with back to back programming across a multi day convention floor.",
    status: "confirmed",
    slot: "wocee.1",
  },
  {
    slug: "pickleball-edition",
    title: "GN Club Lifestyle: Pickleball Edition",
    tag: "Community Activation",
    date: "TODO",
    summary:
      "An on court community activation for LBank Academy: branded pop up, player giveaways, and on site content capture.",
    status: "confirmed",
    slot: "pickleball.1",
  },
  {
    slug: "join-mazal-activation",
    title: "Join Mazal",
    tag: "Community Marketing & Activation",
    date: "TODO",
    summary:
      "Recurring campaign system and community programming for Mazal, a free Philippine trading community: weekly content, an onboarding and QR campaign, and in person co working sessions.",
    status: "confirmed",
    slot: "mazal.1",
  },
  {
    slug: null,
    title: "CJC Race Soft Launch",
    tag: "Soft Launch",
    date: "TODO",
    summary:
      "TODO: case study copy has not been written yet for this event. Real assets exist in GN Club's Drive export, not yet published to the site.",
    status: "todo",
    slot: null,
  },
];

/** Looks up a `portfolio.ts` case study for a timeline event that has one. */
export function getEventCaseStudy(
  event: TimelineEvent,
  portfolio: CaseStudy[]
): CaseStudy | undefined {
  if (!event.slug) return undefined;
  return portfolio.find((p) => p.slug === event.slug);
}
