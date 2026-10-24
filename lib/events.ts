import type { CaseStudy } from "./portfolio";

export type TimelineEvent = {
  /** Matches a `portfolio.ts` slug when a full case study exists for this
   * event, so the timeline can link straight to `/work/[slug]`. `null` for
   * events (like Coinfest Bali) that don't have one yet. */
  slug: string | null;
  title: string;
  tag: string;
  /** Human display date, or `"TODO"` when not yet confirmed. Never invent
   * a date here, leave "TODO" until GN Club provides the real one. */
  date: string;
  /** ISO date (YYYY-MM-DD) used only for ordering, `null` when there is no
   * single confirmed date. Multi day events use their final day, matching
   * the date column of GN Club's events sheet. */
  isoDate: string | null;
  /** Short, event-specific line for the timeline card. Kept separate from
   * `portfolio.ts`'s longer case-study `description` so this can stay a
   * one- or two-sentence summary even once a full write-up exists. */
  summary: string;
  /** "confirmed" events are real GN Club work (may still have TODO fields
   * that need filling in). "todo" events are real events that don't have
   * write-up copy yet, so the card renders visibly as a stub. */
  status: "confirmed" | "todo";
  /** `lib/media.ts` slot for the timeline thumbnail, or `null` when no real
   * photo exists yet (renders a styled placeholder instead of a stock photo,
   * per the no-fake-imagery rule). */
  slot: string | null;
};

/**
 * Events-focused view of the real work in `lib/portfolio.ts`, plus real
 * events from GN Club's events sheet that don't have a case study yet.
 * Deliberately excludes the placeholder/sample entries flagged as such in
 * that file's own comments (Founders Summit, Chainlink Meetup Manila, Neon
 * Rooftop Launch, Founders Summit Afterparty, Studio Livestream, Regional
 * Roadshow): those are seed content, not real GN Club events, and don't
 * belong in a section meant to showcase confirmed work.
 *
 * Ordered newest first by `isoDate`, with undated entries (Join Mazal, an
 * ongoing program) last. Web3 On Campus at NU Lipa and Coinfest Bali are on
 * the sheet with no description, so they appear as explicit "todo" stubs
 * rather than being left out silently or padded with guessed copy.
 */
export const events: TimelineEvent[] = [
  {
    slug: "fundedxyz-online-trading-competition",
    title: "FundedXYZ Online Trading Competition",
    tag: "Trading & Esports",
    date: "Oct 9, 2026",
    isoDate: "2026-10-09",
    summary:
      "A virtual trading tournament led by GN Club and Mazal in partnership with FundedXYZ, with community traders competing online for the top rankings.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "coffee-consensus-aster",
    title: "LBank Coffee Consensus: Aster Business Center",
    tag: "Community & Meetup",
    date: "Sep 27, 2026",
    isoDate: "2026-09-27",
    summary:
      "An intimate community gathering with LBank at the Aster Business Center: live chart analysis and networking over coffee.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "bsu-lipa-web3-seminar",
    title: "BSU Lipa Web3 Seminar",
    tag: "Educational & Campus",
    date: "Sep 26, 2026",
    isoDate: "2026-09-26",
    summary:
      "Campus outreach at Batangas State University Lipa covering blockchain fundamentals and Web3 career paths.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "cryptita-showcase",
    title: "Cryptita Showcase",
    tag: "Conferences & Expos",
    date: "Sep 23, 2026",
    isoDate: "2026-09-23",
    summary:
      "A Builder Highlight session co-led with CrypTita Plays and Mazal in Mandaluyong: live game testing, founder presentations, and an open Q&A for local Web3 builders.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "cjc-race-launch",
    title: "CJC Race Launch",
    tag: "Product Launch",
    date: "Aug 29, 2026",
    isoDate: "2026-08-29",
    summary:
      "The CJC Race Philippines Grand Launch at the NAOS Esports Arena, led with CrypTita Plays for CJC Race Philippines: live gameplay demos, race brackets, and community meetups for the NFT horse racing platform.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "pickleball-edition",
    title: "GN Club Lifestyle: Pickleball Edition",
    tag: "Community Activation",
    date: "Aug 15, 2026",
    isoDate: "2026-08-15",
    summary:
      "An on court community activation for LBank Academy: branded pop up, player giveaways, and on site content capture.",
    status: "confirmed",
    slot: "pickleball.1",
  },
  {
    slug: "wocee-2026",
    title: "WOCEE 2026",
    tag: "Consumer Electronics Expo",
    date: "Aug 5 to 8, 2026",
    isoDate: "2026-08-08",
    summary:
      "GN Club produced and ran \"The Nexus Stage\": a fully branded stage environment with back to back programming across a multi day convention floor.",
    status: "confirmed",
    slot: "wocee.1",
  },
  {
    slug: null,
    title: "Coinfest Bali",
    tag: "Event",
    date: "Aug 5, 2026",
    isoDate: "2026-08-05",
    summary:
      "Coinfest in Bali. The write up for this event is still pending, so no details have been added yet.",
    status: "todo",
    slot: null,
  },
  {
    slug: "coffee-consensus-alabang",
    title: "LBank Coffee Consensus: Alabang",
    tag: "Community & Meetup",
    date: "Aug 2, 2026",
    isoDate: "2026-08-02",
    summary:
      "An in person Web3 trading workshop with LBank and Mazal at Coffee Syndicate, Alabang: live chart reading, risk management, and an open Q&A over free coffee.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "traderfest-2026",
    title: "TraderFest 2026",
    tag: "Conferences & Expos",
    date: "Jul 30, 2026",
    isoDate: "2026-07-30",
    summary:
      "An esports style live trading tournament at Brooklyn Warehouse, with GN Club as Industry Partner.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "wocee-2026-radio-guesting",
    title: "WOCEE 2026 Radio Guesting",
    tag: "Media & PR",
    date: "Jul 29, 2026",
    isoDate: "2026-07-29",
    summary:
      "A live broadcast from the Magic 89.9 studio, co-organized with Worldbex and Museigen.io, kicking off the countdown to WOCEE 2026.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "coffee-consensus-las-pinas",
    title: "LBank Coffee Consensus: Las Piñas",
    tag: "Community & Meetup",
    date: "Jun 13, 2026",
    isoDate: "2026-06-13",
    summary:
      "An in person Web3 trading workshop with LBank Academy at Unlikely Coffee, Las Piñas: live chart reading, risk management, and an open Q&A over free coffee.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "global-pizza-party-2026",
    title: "2026 Global Pizza Party",
    tag: "Community & Meetup",
    date: "May 22, 2026",
    isoDate: "2026-05-22",
    summary:
      "GN Club led a hub of PizzaDAO's worldwide celebration of the first commercial Bitcoin transaction, held across 460+ cities.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: null,
    title: "Web3 On Campus at NU Lipa",
    tag: "Educational & Campus",
    date: "May 5, 2026",
    isoDate: "2026-05-05",
    summary:
      "A Web3 campus event at National University Lipa. The write up for this event is still pending, so no further details have been added yet.",
    status: "todo",
    slot: null,
  },
  {
    slug: "blockforge-code-camp",
    title: "BlockForge Code Camp",
    tag: "Educational & Campus",
    date: "Apr 18, 2026",
    isoDate: "2026-04-18",
    summary:
      "A hands on blockchain boot camp by Cryptita Plays at PHINMA-St. Jude College, Dasmariñas, with code labs on blockchain fundamentals and smart contracts.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "bitcon-2026",
    title: "BITCON 2026",
    tag: "Event",
    date: "Mar 28, 2026",
    isoDate: "2026-03-28",
    summary:
      "A regional technology convention by the Batangas Information Technology Society in Lipa City, focused on AI and blockchain for smart cities, business, and governance.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "gate-campus-talk-web3-simplified",
    title: "GATE Campus Talk: Web3 Simplified",
    tag: "Educational & Campus",
    date: "Mar 18, 2026",
    isoDate: "2026-03-18",
    summary:
      "An educational blockchain seminar at the University of the East Manila covering blockchain fundamentals, DeFi, and digital security, with GN Club as partner.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "okx-wallet-trading-battlegrounds",
    title: "OKX Wallet Trading Battlegrounds",
    tag: "Trading & Esports",
    date: "Jan 30, 2026",
    isoDate: "2026-01-30",
    summary:
      "A live crypto trading tournament hosted with OKX Wallet, from virtual qualifiers to on stage finals at High Grounds Cafe, Quezon City.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "bull-vs-bear-run",
    title: "Bull vs Bear Run",
    tag: "Trading & Esports",
    date: "Nov 15, 2025",
    isoDate: "2025-11-15",
    summary:
      "The inaugural live, real money crypto trading esports competition, co-hosted with Trade Paradex in Makati, with local trading teams competing for a 1,000 USDC prize pool.",
    status: "confirmed",
    slot: null,
  },
  {
    slug: "join-mazal-activation",
    title: "Join Mazal",
    tag: "Community Marketing & Activation",
    date: "TODO",
    isoDate: null,
    summary:
      "Recurring campaign system and community programming for Mazal, a free Philippine trading community: weekly content, an onboarding and QR campaign, and in person co working sessions.",
    status: "confirmed",
    slot: "mazal.1",
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
