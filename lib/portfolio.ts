export type CaseStudy = {
  slug: string;
  slot: string;
  title: string;
  tag: string;
  description: string;
  challenge: string;
  approach: string;
  results: { label: string; value: string }[];
  gallery: string[];
};

/**
 * Case study content for /work and /work/[slug]. `slot`/`gallery` reference
 * keys in lib/media.ts — swap in real event photography there any time.
 * Challenge/approach/results copy is placeholder — replace per project once
 * GN Club has real write-ups.
 */
export const portfolio: CaseStudy[] = [
  {
    slug: "wocee-2026",
    slot: "wocee.1",
    title: "WOCEE 2026",
    tag: "Consumer Electronics Expo",
    description:
      "GN Club produced and activated \"The Nexus Stage\" for the World of Consumer Electronics Expo — programming, branded staging, and on-ground crew for a multi-day convention floor.",
    challenge:
      "A convention-scale expo needed a dedicated stage that could carry back-to-back programming — panels, product reveals, and awarding ceremonies — without ever feeling like a generic breakout room.",
    approach:
      "Designed and built \"The Nexus Stage\" as a fully branded environment (custom signage, lighting rig, LED backdrop), then staffed and ran it end-to-end across the entire expo run: hosting, AV, speaker management, and crowd flow.",
    results: [
      { label: "Programming days", value: "Multi-day" },
      { label: "Sessions hosted", value: "20+" },
      { label: "Stage build", value: "Custom" },
    ],
    gallery: ["wocee.1", "wocee.2", "wocee.3", "wocee.4", "wocee.5", "wocee.6", "wocee.7", "wocee.8"],
  },
  {
    slug: "pickleball-edition",
    slot: "pickleball.1",
    title: "GN Club Lifestyle: Pickleball Edition",
    tag: "Community Activation",
    description:
      "GN Club ran a community pickleball activation on-court for LBank Academy — a branded pop-up, player giveaways, and on-site content capture.",
    challenge:
      "Full case-study write-up in progress — check back soon for the brief behind this activation.",
    approach:
      "GN Club handled on-site branding, giveaways, hosting, and content capture for the activation. A full breakdown of the production scope is coming soon.",
    results: [
      { label: "Format", value: "On-court activation" },
      { label: "Activation type", value: "Community pop-up" },
      { label: "Sponsor", value: "LBank Academy" },
    ],
    gallery: ["pickleball.1", "pickleball.2", "pickleball.3", "pickleball.4"],
  },
  {
    slug: "join-mazal-activation",
    slot: "mazal.1",
    title: "Join Mazal",
    tag: "Community Marketing & Activation",
    description:
      "GN Club is the events activation and marketing agency behind Mazal, a free Philippine trading community — designing the campaign creative and community programming that turns followers into active members.",
    challenge:
      "Mazal needed to convert social followers into a genuinely active trading community without any paywall or hard sell — the brand runs entirely on free education, so growth has to come from content and community experience alone, not a funnel of paid offers.",
    approach:
      "GN Club designed and produced Mazal's recurring campaign system: weekly trading-schedule graphics that give members a reason to check in every day, a \"Join Mazal\" onboarding and QR campaign to convert social reach into Discord members, and in-person GN Club co-work sessions that give the online community a physical touchpoint.",
    results: [
      { label: "Weekly content cadence", value: "Recurring" },
      { label: "Programs shipped", value: "Onboarding + co-work + schedule series" },
      { label: "Partner", value: "Mazal (powered by GN Ventures)" },
    ],
    gallery: [
      "mazal.1",
      "mazal.2",
      "mazal.3",
      "mazal.4",
      "mazal.5",
      "mazal.6",
      "mazal.7",
      "mazal.8",
      "mazal.9",
    ],
  },
  {
    slug: "founders-summit",
    slot: "work.1",
    title: "Founders Summit",
    tag: "Conference",
    description: "GN Club brought founders and operators together for a day of talks and networking.",
    challenge:
      "A 350-person, single-day conference needed to feel premium on a tight production window, with a livestream that matched the in-room quality.",
    approach:
      "Ran the full stack ourselves — stage build, AV, speaker management, and simultaneous streaming — so the online and in-room audiences got the same show.",
    results: [
      { label: "Attendees", value: "350+" },
      { label: "Livestream peak viewers", value: "2,400" },
      { label: "Setup-to-strike", value: "3 days" },
    ],
    gallery: ["work.1", "work.4"],
  },
  {
    slug: "chainlink-meetup-manila",
    slot: "work.2",
    title: "Chainlink Meetup Manila",
    tag: "Web3 Activation",
    description: "A GN Club activation for the Chainlink community in Manila.",
    challenge:
      "A Web3-native community expected a different bar for production polish than a typical corporate meetup, on a community-events budget.",
    approach:
      "Designed a branded venue activation with on-site content capture, so the community got shareable moments alongside the talks.",
    results: [
      { label: "Attendees", value: "220" },
      { label: "Social posts generated", value: "180+" },
      { label: "Repeat booking", value: "Yes" },
    ],
    gallery: ["work.2", "work.5"],
  },
  {
    slug: "neon-rooftop-launch",
    slot: "work.3",
    title: "Neon Rooftop Launch",
    tag: "Product Launch",
    description: "A rooftop product launch produced end-to-end by GN Club.",
    challenge:
      "Launching a physical product needed a venue and mood that outside vendors don't offer as a package — lighting, sound, and staging all had to feel custom.",
    approach:
      "Sourced and built out a rooftop venue from scratch: lighting design, staging, and a run-of-show built around the product reveal moment.",
    results: [
      { label: "Attendees", value: "180" },
      { label: "Press mentions", value: "6" },
      { label: "Build time", value: "36 hrs" },
    ],
    gallery: ["work.3", "work.6"],
  },
  {
    slug: "founders-summit-afterparty",
    slot: "work.4",
    title: "Founders Summit Afterparty",
    tag: "Party",
    description: "The after-hours celebration capping off GN Club's Founders Summit.",
    challenge:
      "Turning the same-day conference crowd over into a party without losing energy or blowing the production schedule.",
    approach:
      "Pre-built the party layout during the conference's final session, so turnover from stage to dance floor took under an hour.",
    results: [
      { label: "Turnover time", value: "48 min" },
      { label: "Attendees", value: "300+" },
      { label: "Vendors coordinated", value: "9" },
    ],
    gallery: ["work.4", "work.1"],
  },
  {
    slug: "studio-livestream",
    slot: "work.5",
    title: "Studio Livestream",
    tag: "Online Event",
    description: "A studio-produced livestream event hosted by GN Club.",
    challenge:
      "An online-only audience with no physical venue still needed a broadcast-quality show, not a webinar.",
    approach:
      "Built the segment entirely in GN Club's virtual production studio — multi-camera, live graphics, and real-time audience interaction.",
    results: [
      { label: "Peak concurrent viewers", value: "3,100" },
      { label: "Watch time", value: "42 min avg" },
      { label: "Countries reached", value: "14" },
    ],
    gallery: ["work.5", "work.2"],
  },
  {
    slug: "regional-roadshow",
    slot: "work.6",
    title: "Regional Roadshow",
    tag: "Trade Show",
    description: "GN Club's trade show presence on a multi-city regional roadshow.",
    challenge:
      "The same brand activation had to travel across multiple cities without the setup, quality, or messaging drifting between stops.",
    approach:
      "Built a modular booth system and a traveling production crew so every stop launched at the same standard on a repeatable timeline.",
    results: [
      { label: "Cities", value: "5" },
      { label: "Total attendees", value: "6,000+" },
      { label: "Avg. setup time", value: "5 hrs" },
    ],
    gallery: ["work.6", "work.3"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return portfolio.find((p) => p.slug === slug);
}
