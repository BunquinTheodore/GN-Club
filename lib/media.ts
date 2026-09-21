/**
 * Named image slots -> source. Every slot below is a stock placeholder —
 * curated free-license Unsplash photography standing in for GN Club's own
 * event photography — except "hero.cover" (a real Facebook cover photo), the
 * wocee, pickleball, mazal, and brand slots (real GN Club assets, see below),
 * the about.stage, about.team, services.activations, services.studio,
 * and services.others slots (real GN Club community-event photos from the
 * Mazal Naos co-work, Aug 29, see naos/ below), and the work.1-6,
 * services.logistics, services.merch, services.digital, services.video,
 * services.online, and every listed .gallery.2/.gallery.3 slot (real GN
 * Club event photography sourced from the team's Google Drive — GN Club x
 * OKX "Trading Battlegrounds", CJC Race, and Gate Zone/Coinfest Asia — see
 * drive/ below). A few .gallery.3 slots (services.video, services.studio)
 * are still stock — no genuinely good real-photo match was found for those
 * specifically, so they were left rather than forced.
 * Swap any URL here to replace imagery site-wide without touching component
 * code.
 */
export const media: Record<string, string> = {
  "hero.cover": "/hero-cover.jpg",

  // Real GN Club community-event photography — Mazal Naos co-work (Aug 29),
  // replacing a stock Unsplash placeholder.
  "services.activations": "/images/naos/naos-activations.jpg",
  // Real GN Club event photography — Google Drive, WOCEE 2026 broadcast
  // desk, replacing a stock Unsplash placeholder.
  "services.online": "/images/drive/drive-online.jpg",
  // Real GN Club event photography — Google Drive, live event laptop/
  // trading-chart shot, replacing a stock Unsplash placeholder.
  "services.digital": "/images/drive/drive-digital.jpg",
  // Real GN Club event photography — Google Drive, WOCEE 2026 Expo Stage
  // (videographer filming the presenter interview), replacing a stock
  // Unsplash placeholder.
  "services.video": "/images/drive/drive-wocee-videographer.jpg",
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" (CEX vs DEX) activation, full stage/laptop-row setup,
  // replacing a stock Unsplash placeholder.
  "services.logistics": "/images/drive/drive-logistics.jpg",
  // Real GN Club community-event photography — Mazal Naos co-work (Aug 29),
  // replacing stock Unsplash placeholders.
  "services.others": "/images/naos/naos-others.jpg",
  "services.studio": "/images/naos/naos-studio.jpg",
  // Real GN Club event photography — Google Drive, CJC Race community
  // members holding branded event merchandise, replacing a stock Unsplash
  // placeholder.
  "services.merch": "/images/drive/drive-merch.jpg",

  // Additional gallery photos for each service's /services/[slug] detail
  // page — supplements the single hero photo above with 2 more stock shots
  // per service.
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" crowd/banner moments, replacing stock Unsplash placeholders.
  "services.activations.gallery.2": "/images/drive/drive-activations-gallery-2.jpg",
  "services.activations.gallery.3": "/images/drive/drive-activations-gallery-3.jpg",
  // Real GN Club event photography — Google Drive, WOCEE 2026 broadcast
  // desk, replacing a stock Unsplash placeholder.
  "services.online.gallery.2": "/images/drive/drive-online.jpg",
  // Real GN Club event photography — Google Drive, Gate Zone (Coinfest Asia
  // side event) panel/host moment, replacing a stock Unsplash placeholder.
  "services.online.gallery.3": "/images/drive/drive-online-gallery-3.jpg",
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" laptop-row shots, replacing stock Unsplash placeholders.
  "services.digital.gallery.2": "/images/drive/drive-digital-gallery-2.jpg",
  "services.digital.gallery.3": "/images/drive/drive-digital-gallery-3.jpg",
  // Real GN Club event photography — Google Drive, WOCEE 2026 gimbal camera
  // filming "The Nexus Stage", replacing a stock Unsplash placeholder.
  "services.video.gallery.2": "/images/drive/drive-video-gallery-2.jpg",
  "services.video.gallery.3":
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop",
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" activation setup, replacing stock Unsplash placeholders.
  "services.logistics.gallery.2": "/images/drive/drive-logistics-gallery-2.jpg",
  "services.logistics.gallery.3": "/images/drive/drive-logistics-gallery-3.jpg",
  // Real GN Club event photography — Google Drive, GN Club x OKX post-event
  // celebration dinner and a Gate Zone stage moment, replacing stock
  // Unsplash placeholders.
  "services.others.gallery.2": "/images/drive/drive-others-gallery-2.jpg",
  "services.others.gallery.3": "/images/drive/drive-others-gallery-3.jpg",
  // Real GN Club event photography — Google Drive, Gate Zone (Coinfest Asia
  // side event) panel discussion, seated interview-style format, replacing
  // a stock Unsplash placeholder.
  "services.studio.gallery.2": "/images/drive/drive-studio-gallery-2.jpg",
  "services.studio.gallery.3":
    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop",
  // Real GN Club event photography — Google Drive, CJC Race community
  // members holding branded event merchandise, replacing stock Unsplash
  // placeholders.
  "services.merch.gallery.2": "/images/drive/drive-merch-gallery-2.jpg",
  "services.merch.gallery.3": "/images/drive/drive-merch-gallery-3.jpg",

  // Real GN Club community-event photography — Mazal Naos co-work (Aug 29),
  // replacing stock Unsplash placeholders.
  "about.team": "/images/naos/naos-team.jpg",
  "about.stage": "/images/naos/naos-stage.jpg",

  // Real GN Club event photography — Google Drive, WOCEE 2026 Expo Stage
  // (videographer filming the presenter interview), replacing a stock
  // Unsplash placeholder.
  "work.1": "/images/drive/drive-wocee-videographer.jpg",
  // Real GN Club event photography — Google Drive, GN Club x Paradex event
  // group photo, replacing a stock Unsplash placeholder.
  "work.2": "/images/drive/drive-work-2.jpg",
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" full-crowd banner photo, replacing a stock Unsplash
  // placeholder.
  "work.3": "/images/drive/drive-work-3.jpg",
  // Real GN Club event photography — Google Drive, CJC Race community
  // group moments, replacing stock Unsplash placeholders.
  "work.4": "/images/drive/drive-work-4.jpg",
  "work.5": "/images/drive/drive-work-5.jpg",
  // Real GN Club event photography — Google Drive, GN Club x OKX "Trading
  // Battlegrounds" laptop-row shot, replacing a stock Unsplash placeholder.
  "work.6": "/images/drive/drive-work-6.jpg",

  // Real GN Club photography (WOCEE 2026 closing night) — replaces a stock
  // Unsplash crowd photo that had unrelated text ("ALL I AM IS YOURS")
  // baked into the image itself, visible behind the CTA/contact copy on
  // every page.
  "contact.backdrop": "/images/wocee/wocee-07-closing-night.jpg",

  // Real GN Club event photography — WOCEE 2026 (World of Consumer
  // Electronics Expo), "The Nexus Stage" activation.
  "wocee.1": "/images/wocee/wocee-01-nexus-stage.jpg",
  "wocee.2": "/images/wocee/wocee-02-activation-floor.jpg",
  "wocee.3": "/images/wocee/wocee-03-panel-discussion.jpg",
  "wocee.4": "/images/wocee/wocee-04-awarding.jpg",
  "wocee.5": "/images/wocee/wocee-05-presenter-qa.jpg",
  "wocee.6": "/images/wocee/wocee-06-group-awarding.jpg",
  "wocee.7": "/images/wocee/wocee-07-closing-night.jpg",
  "wocee.8": "/images/wocee/wocee-08-closing-crowd.jpg",

  // Real GN Club event photography — GN Club Lifestyle: Pickleball Edition,
  // an LBank Academy-branded community activation.
  "pickleball.1": "/images/pickleball/pickleball-01-group-photo.jpg",
  "pickleball.2": "/images/pickleball/pickleball-02-crowd-sponsors.jpg",
  "pickleball.3": "/images/pickleball/pickleball-03-lbank-banner.jpg",
  "pickleball.4": "/images/pickleball/pickleball-04-court-venue.jpg",

  // Real GN Club marketing/content-design work — branded social graphics
  // produced for Mazal (weekly trading schedules, community co-work posts,
  // "Join Mazal" onboarding/QR creative). Not on-ground event photography.
  "mazal.1": "/images/mazal/mazal-01-trade-before-after.png",
  "mazal.2": "/images/mazal/mazal-02-thursday-cowork.png",
  "mazal.3": "/images/mazal/mazal-03-wednesday-cowork.png",
  "mazal.4": "/images/mazal/mazal-04-trading-schedule-v1.png",
  "mazal.5": "/images/mazal/mazal-05-trading-schedule-v2.png",
  "mazal.6": "/images/mazal/mazal-06-why-partner-with-mazal.png",
  "mazal.7": "/images/mazal/mazal-07-free-trading-guide-qr.png",
  "mazal.8": "/images/mazal/mazal-08-join-mazal-qr.png",
  "mazal.9": "/images/mazal/mazal-09-beginner-trading-submit.png",

  // Sister-brand marks for the "trusted by" strip.
  "brand.gnMedia": "/images/brands/gn-media-logo.jpg",
  "brand.gnVentures": "/images/brands/gn-ventures-logo.jpg",
  "brand.mazal": "/images/brands/mazal-logo.jpg",
};

export function getMedia(slot: string): string {
  return media[slot] ?? media["hero.cover"];
}
