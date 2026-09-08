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
