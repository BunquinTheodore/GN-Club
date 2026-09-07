/**
 * Named image slots -> source. Every slot below is a stock placeholder except
 * "hero.cover", which is GN Club's real Facebook cover photo. Swap any URL
 * here to replace imagery site-wide without touching component code.
 */
export const media: Record<string, string> = {
  "hero.cover": "/hero-cover.png",

  "services.activations":
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1600&auto=format&fit=crop",
  "services.online":
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200&auto=format&fit=crop",
  "services.digital":
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  "services.video":
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
  "services.logistics":
    "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",
  "services.others":
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop",

  "about.team":
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
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
};

export function getMedia(slot: string): string {
  return media[slot] ?? media["hero.cover"];
}
