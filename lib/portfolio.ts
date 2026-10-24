export type CaseStudy = {
  slug: string;
  /** `lib/media.ts` key for the cover photo, or `null` when no confirmed
   * photo exists yet. `null` must render `EventPhotoPlaceholder`, never a
   * `getMedia` call (its unknown-slot fallback is the homepage hero photo). */
  slot: string | null;
  title: string;
  tag: string;
  /** Human display date, e.g. "Nov 15, 2025". Set on real GN Club events,
   * omitted on the seed entries and on Join Mazal (an ongoing program with
   * no single date). Never invent one. */
  date?: string;
  /** The original hand-picked set shown on the homepage grid and in the
   * Sidebar's Work submenu. /work itself shows every entry. */
  featured?: boolean;
  description: string;
  challenge: string;
  approach: string;
  results: { label: string; value: string }[];
  /** `lib/media.ts` keys, `[]` when no confirmed photos exist yet. */
  gallery: string[];
};

/**
 * Case study content for /work and /work/[slug]. `slot`/`gallery` reference
 * keys in lib/media.ts, so real event photography can be swapped in there
 * any time.
 *
 * Order: the three original real events, then every other event from GN
 * Club's own events sheet (newest first), then the six seed entries.
 *
 * The sheet events carry only facts stated in that sheet: no attendance
 * numbers, outcomes, or quotes. Where the sheet gives no basis for a
 * challenge or approach, the copy says the write up is in progress rather
 * than guessing. None of them have confirmed photos yet (`slot: null`,
 * `gallery: []`), and existing photos must not be reused for them.
 *
 * The six seed entries (Founders Summit through Regional Roadshow) are
 * placeholder sample content, not real GN Club events: their copy and
 * numbers should be replaced or removed once real write-ups exist.
 */
export const portfolio: CaseStudy[] = [
  {
    slug: "wocee-2026",
    slot: "wocee.1",
    title: "WOCEE 2026",
    tag: "Consumer Electronics Expo",
    date: "Aug 5 to 8, 2026",
    description:
      "GN Club produced and activated \"The Nexus Stage\" for the World of Consumer Electronics Expo: programming, branded staging, and on ground crew for a multi day convention floor.",
    challenge:
      "A convention scale expo needed a dedicated stage that could carry back to back programming (panels, product reveals, and awarding ceremonies) without ever feeling like a generic breakout room.",
    approach:
      "Designed and built \"The Nexus Stage\" as a fully branded environment (custom signage, lighting rig, LED backdrop), then staffed and ran it end to end across the entire expo run: hosting, AV, speaker management, and crowd flow.",
    results: [
      { label: "Programming days", value: "Multi day" },
      { label: "Sessions hosted", value: "20+" },
      { label: "Stage build", value: "Custom" },
    ],
    featured: true,
    gallery: ["wocee.1", "wocee.2", "wocee.3", "wocee.4", "wocee.5", "wocee.6", "wocee.7", "wocee.8"],
  },
  {
    slug: "pickleball-edition",
    slot: "pickleball.1",
    title: "GN Club Lifestyle: Pickleball Edition",
    tag: "Community Activation",
    date: "Aug 15, 2026",
    description:
      "GN Club ran a community pickleball activation on court for LBank Academy: a branded pop up, player giveaways, and on site content capture.",
    challenge:
      "Full case study write up in progress. Check back soon for the brief behind this activation.",
    approach:
      "GN Club handled on site branding, giveaways, hosting, and content capture for the activation. A full breakdown of the production scope is coming soon.",
    results: [
      { label: "Format", value: "On court activation" },
      { label: "Activation type", value: "Community pop up" },
      { label: "Sponsor", value: "LBank Academy" },
    ],
    featured: true,
    gallery: ["pickleball.1", "pickleball.2", "pickleball.3", "pickleball.4"],
  },
  {
    slug: "join-mazal-activation",
    slot: "mazal.1",
    title: "Join Mazal",
    tag: "Community Marketing & Activation",
    description:
      "GN Club is the events activation and marketing agency behind Mazal, a free Philippine trading community: designing the campaign creative and community programming that turns followers into active members.",
    challenge:
      "Mazal needed to convert social followers into a genuinely active trading community without any paywall or hard sell. The brand runs entirely on free education, so growth has to come from content and community experience alone, not a funnel of paid offers.",
    approach:
      "GN Club designed and produced Mazal's recurring campaign system: weekly trading schedule graphics that give members a reason to check in every day, a \"Join Mazal\" onboarding and QR campaign to convert social reach into Discord members, and in person GN Club coworking sessions that give the online community a physical touchpoint.",
    results: [
      { label: "Weekly content cadence", value: "Recurring" },
      { label: "Programs shipped", value: "Onboarding + coworking + schedule series" },
      { label: "Partner", value: "Mazal (powered by GN Ventures)" },
    ],
    featured: true,
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
    slug: "fundedxyz-online-trading-competition",
    slot: null,
    title: "FundedXYZ Online Trading Competition",
    tag: "Trading & Esports",
    date: "Oct 9, 2026",
    description:
      "GN Club and Mazal led an online trading tournament in partnership with FundedXYZ, where community traders competed virtually for the top performance rankings.",
    challenge:
      "Full case study write up in progress. Check back soon for the brief behind this competition.",
    approach:
      "GN Club and Mazal led the competition with FundedXYZ, running it fully online for community traders. A full breakdown of the format is coming soon.",
    results: [
      { label: "Format", value: "Online" },
      { label: "Partner", value: "FundedXYZ" },
      { label: "Led by", value: "GN Club & Mazal" },
    ],
    gallery: [],
  },
  {
    slug: "coffee-consensus-aster",
    slot: null,
    title: "LBank Coffee Consensus: Aster Business Center",
    tag: "Community & Meetup",
    date: "Sep 27, 2026",
    description:
      "An intimate Coffee Consensus community gathering at the Aster Business Center in partnership with LBank, built around live chart analysis and networking over coffee.",
    challenge:
      "Full case study write up in progress. Check back soon for the brief behind this meetup.",
    approach:
      "The meetup paired live chart analysis with open networking over coffee, keeping the format small and conversational. A full breakdown is coming soon.",
    results: [
      { label: "Venue", value: "Aster Business Center" },
      { label: "Partner", value: "LBank" },
      { label: "Format", value: "Live chart analysis" },
    ],
    gallery: [],
  },
  {
    slug: "bsu-lipa-web3-seminar",
    slot: null,
    title: "BSU Lipa Web3 Seminar",
    tag: "Educational & Campus",
    date: "Sep 26, 2026",
    description:
      "An educational campus outreach seminar at Batangas State University Lipa covering blockchain fundamentals and the career paths opening up in Web3.",
    challenge:
      "Full case study write up in progress. Check back soon for the brief behind this seminar.",
    approach:
      "The seminar focused on blockchain fundamentals and Web3 career paths for BSU Lipa students. A full breakdown of the program is coming soon.",
    results: [
      { label: "Venue", value: "Batangas State University Lipa" },
      { label: "Partner", value: "BSU Lipa" },
      { label: "Focus", value: "Blockchain & Web3 careers" },
    ],
    gallery: [],
  },
  {
    slug: "cryptita-showcase",
    slot: null,
    title: "Cryptita Showcase",
    tag: "Conferences & Expos",
    date: "Sep 23, 2026",
    description:
      "GN Club and Mazal co-led the Cryptita Showcase with CrypTita Plays: a Builder Highlight session that brought the local Web3 ecosystem, software developers, and decentralized tech enthusiasts together to test emerging builds.",
    challenge:
      "Filipino builders needed a room where their work could meet the people it is built for, so the showcase set out to bridge local developers with local retail communities.",
    approach:
      "Held at the Aster Business Center in Mandala Park, Mandaluyong City, the session ran live game testing, founder presentations, and an open Q&A, with technical networking built around real time feedback on each build.",
    results: [
      { label: "Venue", value: "Aster Business Center, Mandaluyong" },
      { label: "Format", value: "Builder Highlight session" },
      { label: "Co-led by", value: "Cryptita, GN Club & Mazal" },
    ],
    gallery: [],
  },
  {
    slug: "cjc-race-launch",
    slot: null,
    title: "CJC Race Launch",
    tag: "Product Launch",
    date: "Aug 29, 2026",
    description:
      "GN Club and CrypTita Plays led the CJC Race Philippines Grand Launch in collaboration with host CJC Race Philippines: the on ground event marking the regional rollout of CJC Race, an Arbitrum based, play to earn NFT horse racing platform.",
    challenge:
      "A play to earn platform had to be introduced to a new regional audience in person, giving prospective digital stable owners a hands on first look at the game.",
    approach:
      "Ran a full day launch at the NAOS Esports Arena in DoubleDragon Plaza, Pasay City, built around live gameplay demonstrations, on site race brackets, community meetups for prospective stable owners, and physical rewards and mystery boxes.",
    results: [
      { label: "Venue", value: "NAOS Esports Arena, Pasay City" },
      { label: "Event hours", value: "11:00 AM to 7:00 PM" },
      { label: "Led by", value: "GN Club & CrypTita Plays" },
    ],
    gallery: [],
  },
  {
    slug: "coffee-consensus-alabang",
    slot: null,
    title: "LBank Coffee Consensus: Alabang",
    tag: "Community & Meetup",
    date: "Aug 2, 2026",
    description:
      "GN Club and Mazal hosted the LBank Coffee Consensus at Coffee Syndicate in Alabang alongside LBank Labs, LBank Academy, and the Mazal ecosystem: an in person educational workshop for Web3 traders and enthusiasts over artisan brews.",
    challenge:
      "Web3 traders in the regional community needed a local, in person space to learn, ask questions, and meet the builders and creators around them.",
    approach:
      "Hosted at Coffee Syndicate in Commerce Center, Alabang, Muntinlupa City, the workshop paired free coffee with live chart reading, risk management discussions, an open Q&A, and exclusive merchandise giveaways.",
    results: [
      { label: "Venue", value: "Coffee Syndicate, Alabang" },
      { label: "Partner", value: "LBank" },
      { label: "Led by", value: "GN Club & Mazal" },
    ],
    gallery: [],
  },
  {
    slug: "traderfest-2026",
    slot: null,
    title: "TraderFest 2026",
    tag: "Conferences & Expos",
    date: "Jul 30, 2026",
    description:
      "GN Club joined TraderFest 2026 as Industry Partner: an esports style live trading tournament that brought a competitive video game format to crypto and forex markets, presented by Ultima Markets and organized by Crypto Esports League PH.",
    challenge:
      "Typical financial seminars run in a rigid, corporate B2B setting. TraderFest set out to move completely away from that format and make live market execution feel like a competitive event.",
    approach:
      "The festival gamified live trading inside a loud, high energy physical arena at Brooklyn Warehouse, with GN Club partnering alongside Trade Paradex, Mazal, The Hideout, DV8 Ventures, and the Paragon trading community.",
    results: [
      { label: "Venue", value: "Brooklyn Warehouse" },
      { label: "GN Club role", value: "Industry Partner" },
      { label: "Main organizer", value: "Crypto Esports League PH" },
    ],
    gallery: [],
  },
  {
    slug: "wocee-2026-radio-guesting",
    slot: null,
    title: "WOCEE 2026 Radio Guesting",
    tag: "Media & PR",
    date: "Jul 29, 2026",
    description:
      "GN Club co-organized a live radio guesting from the Magic 89.9 studio with Worldbex and Museigen.io, kicking off the countdown to WOCEE 2026.",
    challenge:
      "WOCEE needed to reach a mainstream audience ahead of the expo, putting tech innovations, digital trends, and student builders in front of listeners beyond the usual tech crowd.",
    approach:
      "Broadcast live from the Magic 89.9 studio, the segment previewed the Cryptita Plays Builder Showcase and the expo's tech exhibitions, and invited listeners to claim free passes for the four day expo at the SMX Convention Center.",
    results: [
      { label: "Station", value: "Magic 89.9" },
      { label: "Format", value: "Live radio broadcast" },
      { label: "Co-organizers", value: "GN Club & Museigen.io" },
    ],
    gallery: [],
  },
  {
    slug: "coffee-consensus-las-pinas",
    slot: null,
    title: "LBank Coffee Consensus: Las Piñas",
    tag: "Community & Meetup",
    date: "Jun 13, 2026",
    description:
      "GN Club hosted the LBank Coffee Consensus at Unlikely Coffee in Las Piñas alongside LBank Academy, BUDI, and Tela Park Pickleball Center: an in person educational workshop for Web3 traders and enthusiasts over artisan brews.",
    challenge:
      "The regional Web3 community needed a local, in person space to learn together and meet the builders and creators around them.",
    approach:
      "Hosted at Unlikely Coffee in Las Piñas, Metro Manila, the workshop paired free coffee with live chart reading, risk management discussions, an open Q&A, and exclusive merchandise giveaways.",
    results: [
      { label: "Venue", value: "Unlikely Coffee, Las Piñas" },
      { label: "Partner", value: "LBank" },
      { label: "Hosted by", value: "GN Club" },
    ],
    gallery: [],
  },
  {
    slug: "global-pizza-party-2026",
    slot: null,
    title: "2026 Global Pizza Party",
    tag: "Community & Meetup",
    date: "May 22, 2026",
    description:
      "GN Club led a hub of PizzaDAO's 6th annual Global Pizza Party, the worldwide celebration marking the anniversary of the first commercial Bitcoin transaction.",
    challenge:
      "A decentralized celebration spanning 460+ cities had to come together locally, giving Web3 communities, builders, and creators a real reason to meet in person.",
    approach:
      "GN Club led its hub of the celebration with PizzaDAO, whose partners included Brave and Stand With Crypto, pairing free pizza from independent local pizzerias with a community meetup and a continuous 24 hour global live broadcast.",
    results: [
      { label: "Host", value: "PizzaDAO" },
      { label: "Cities worldwide", value: "460+" },
      { label: "Countries", value: "100+" },
    ],
    gallery: [],
  },
  {
    slug: "blockforge-code-camp",
    slot: null,
    title: "BlockForge Code Camp",
    tag: "Educational & Campus",
    date: "Apr 18, 2026",
    description:
      "GN Club partnered on BlockForge Code Camp, a hands on blockchain and Web3 boot camp organized by Cryptita Plays with local student organizations and supported by the MEXC SEA Foundation.",
    challenge:
      "Students needed more than theory: the camp set out to introduce decentralized technology, cryptography, and real world Web3 applications through practical work.",
    approach:
      "Held at the PHINMA-St. Jude College campus in Dasmariñas, Cavite, the camp ran practical code labs covering blockchain fundamentals alongside developing and testing smart contracts.",
    results: [
      { label: "Venue", value: "PHINMA-St. Jude College, Dasmariñas" },
      { label: "Organizer", value: "Cryptita Plays" },
      { label: "Supported by", value: "MEXC SEA Foundation" },
    ],
    gallery: [],
  },
  {
    slug: "bitcon-2026",
    slot: null,
    title: "BITCON 2026",
    tag: "Event",
    date: "Mar 28, 2026",
    description:
      "BITCON 2026 was a regional technology convention organized by the Batangas Information Technology Society (BITS), focused on putting AI and blockchain to practical use in smart cities, businesses, and governance.",
    challenge:
      "Full case study write up in progress. Check back soon for the brief behind GN Club's part in this convention.",
    approach:
      "Held at the LASCA Convention Center in Lipa City, Batangas, the convention ran plenary sessions, keynote speeches, networking exhibit booths, and a student tech pitching competition.",
    results: [
      { label: "Organizer", value: "BITS" },
      { label: "Venue", value: "LASCA Convention Center" },
      { label: "Location", value: "Lipa City, Batangas" },
    ],
    gallery: [],
  },
  {
    slug: "gate-campus-talk-web3-simplified",
    slot: null,
    title: "GATE Campus Talk: Web3 Simplified",
    tag: "Educational & Campus",
    date: "Mar 18, 2026",
    description:
      "GN Club partnered on GATE Campus Talk: Web3 Simplified, an educational blockchain seminar at the University of the East Manila organized by GATE Web3, Cryptita Plays, and the UE CCSS Student Council.",
    challenge:
      "Web3 can feel out of reach for students meeting it for the first time, so the talk set out to demystify the technology and highlight the career opportunities emerging around it.",
    approach:
      "Panel discussions and sessions walked university students through blockchain fundamentals, decentralized finance (DeFi), and digital security.",
    results: [
      { label: "Venue", value: "University of the East Manila" },
      { label: "Organizers", value: "GATE Web3, Cryptita Plays & UE CCSS" },
      { label: "GN Club role", value: "Partner" },
    ],
    gallery: [],
  },
  {
    slug: "okx-wallet-trading-battlegrounds",
    slot: null,
    title: "OKX Wallet Trading Battlegrounds",
    tag: "Trading & Esports",
    date: "Jan 30, 2026",
    description:
      "GN Club hosted the Trading Battlegrounds in partnership with OKX Wallet: a live crypto trading tournament where community traders showcased their strategies on stage.",
    challenge:
      "A trading tournament had to turn individual strategy into something an audience could watch, taking community traders from online qualifiers to live, on stage finals.",
    approach:
      "Virtual qualifiers ran on January 21, 2026, and the finalists traded live on stage at the in person finals at High Grounds Cafe in Quezon City, where Aldrin \"Crypto4chun\" Rabino was crowned champion.",
    results: [
      { label: "Champion", value: "Aldrin \"Crypto4chun\" Rabino" },
      { label: "Finals venue", value: "High Grounds Cafe, Quezon City" },
      { label: "Partner", value: "OKX Wallet" },
    ],
    gallery: [],
  },
  {
    slug: "bull-vs-bear-run",
    slot: null,
    title: "Bull vs Bear Run",
    tag: "Trading & Esports",
    date: "Nov 15, 2025",
    description:
      "GN Club co-hosted the inaugural Bull vs Bear Run with Trade Paradex: a live, real money crypto trading esports competition presented by Paradex.",
    challenge:
      "Live trading had to work as an esports event, with teams from top local trading groups competing on real money in real time.",
    approach:
      "GN Club and Trade Paradex brought the teams together at Zero-Ten Park, The Company Manila in Makati City, where they traded the live market for a portion of a 1,000 USDC prize pool.",
    results: [
      { label: "Prize pool", value: "1,000 USDC" },
      { label: "Format", value: "Live team trading" },
      { label: "Venue", value: "The Company Manila, Makati" },
    ],
    gallery: [],
  },
  {
    slug: "founders-summit",
    slot: "work.1",
    title: "Founders Summit",
    tag: "Conference",
    description: "GN Club brought founders and operators together for a day of talks and networking.",
    challenge:
      "A 350 person, single day conference needed to feel premium on a tight production window, with a livestream that matched the in room quality.",
    approach:
      "Ran the full stack ourselves, stage build, AV, speaker management, and simultaneous streaming, so the online and in room audiences got the same show.",
    results: [
      { label: "Attendees", value: "350+" },
      { label: "Livestream peak viewers", value: "2,400" },
      { label: "Setup to strike", value: "3 days" },
    ],
    featured: true,
    gallery: ["work.1", "work.4"],
  },
  {
    slug: "chainlink-meetup-manila",
    slot: "work.2",
    title: "Chainlink Meetup Manila",
    tag: "Web3 Activation",
    description: "A GN Club activation for the Chainlink community in Manila.",
    challenge:
      "A Web3 native community expected a different bar for production polish than a typical corporate meetup, on a community events budget.",
    approach:
      "Designed a branded venue activation with on site content capture, so the community got shareable moments alongside the talks.",
    results: [
      { label: "Attendees", value: "220" },
      { label: "Social posts generated", value: "180+" },
      { label: "Repeat booking", value: "Yes" },
    ],
    featured: true,
    gallery: ["work.2", "work.5"],
  },
  {
    slug: "neon-rooftop-launch",
    slot: "work.3",
    title: "Neon Rooftop Launch",
    tag: "Product Launch",
    description: "A rooftop product launch produced end to end by GN Club.",
    challenge:
      "Launching a physical product needed a venue and mood that outside vendors don't offer as a package: lighting, sound, and staging all had to feel custom.",
    approach:
      "Sourced and built out a rooftop venue from scratch: lighting design, staging, and a run of show built around the product reveal moment.",
    results: [
      { label: "Attendees", value: "180" },
      { label: "Press mentions", value: "6" },
      { label: "Build time", value: "36 hrs" },
    ],
    featured: true,
    gallery: ["work.3", "work.6"],
  },
  {
    slug: "founders-summit-afterparty",
    slot: "work.4",
    title: "Founders Summit Afterparty",
    tag: "Party",
    description: "The after hours celebration capping off GN Club's Founders Summit.",
    challenge:
      "Turning the same day conference crowd over into a party without losing energy or blowing the production schedule.",
    approach:
      "Prebuilt the party layout during the conference's final session, so turnover from stage to dance floor took under an hour.",
    results: [
      { label: "Turnover time", value: "48 min" },
      { label: "Attendees", value: "300+" },
      { label: "Vendors coordinated", value: "9" },
    ],
    featured: true,
    gallery: ["work.4", "work.1"],
  },
  {
    slug: "studio-livestream",
    slot: "work.5",
    title: "Studio Livestream",
    tag: "Online Event",
    description: "A studio produced livestream event hosted by GN Club.",
    challenge:
      "An online only audience with no physical venue still needed a broadcast quality show, not a webinar.",
    approach:
      "Built the segment entirely in GN Club's virtual production studio: multi camera, live graphics, and real time audience interaction.",
    results: [
      { label: "Peak concurrent viewers", value: "3,100" },
      { label: "Watch time", value: "42 min avg" },
      { label: "Countries reached", value: "14" },
    ],
    featured: true,
    gallery: ["work.5", "work.2"],
  },
  {
    slug: "regional-roadshow",
    slot: "work.6",
    title: "Regional Roadshow",
    tag: "Trade Show",
    description: "GN Club's trade show presence on a multi city regional roadshow.",
    challenge:
      "The same brand activation had to travel across multiple cities without the setup, quality, or messaging drifting between stops.",
    approach:
      "Built a modular booth system and a traveling production crew so every stop launched at the same standard on a repeatable timeline.",
    results: [
      { label: "Cities", value: "5" },
      { label: "Total attendees", value: "6,000+" },
      { label: "Avg. setup time", value: "5 hrs" },
    ],
    featured: true,
    gallery: ["work.6", "work.3"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return portfolio.find((p) => p.slug === slug);
}
