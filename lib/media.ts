/**
 * Named image slots -> source. Every slot below is a stock placeholder —
 * curated free-license Unsplash photography standing in for GN Club's own
 * event photography — except "hero.cover" (a real Facebook cover photo) and
 * the wocee, pickleball, and brand slots (real GN Club assets, see below).
 * Swap any URL here to replace imagery site-wide without touching component
 * code.
 */
export const media: Record<string, string> = {
  "hero.cover": "/hero-cover.png",

  "services.activations":
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600&auto=format&fit=crop",
  "services.online":
    "https://images.unsplash.com/photo-1764664035176-8e92ff4f128e?q=80&w=1200&auto=format&fit=crop",
  "services.digital":
    "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?q=80&w=1200&auto=format&fit=crop",
  "services.video":
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
  "services.logistics":
    "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
  "services.others":
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop",

  "about.team":
    "https://images.unsplash.com/photo-1612544409025-e1f6a56c1152?q=80&w=1600&auto=format&fit=crop",
  "about.stage":
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop",

  "work.1":
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  "work.2":
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1200&auto=format&fit=crop",
  "work.3":
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop",
  "work.4":
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
  "work.5":
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1200&auto=format&fit=crop",
  "work.6":
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200&auto=format&fit=crop",

  "contact.backdrop":
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600&auto=format&fit=crop",

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

  // Sister-brand marks for the "trusted by" strip.
  "brand.gnMedia": "/images/brands/gn-media-logo.jpg",
  "brand.gnVentures": "/images/brands/gn-ventures-logo.jpg",
  "brand.mazal": "/images/brands/mazal-logo.jpg",
};

export function getMedia(slot: string): string {
  return media[slot] ?? media["hero.cover"];
}
