"use client";

import { useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DuotoneImage } from "./DuotoneImage";
import { EventPhotoPlaceholder } from "./EventPhotoPlaceholder";
import { getMedia } from "@/lib/media";
import { portfolio, type CaseStudy } from "@/lib/portfolio";
import { slotPosition } from "./portfolioSlots";

// The preview dialog (and the Base UI primitives behind it) only matters after a click, so it is
// requested on first interaction with the grid instead of shipping with the page.
const loadDialog = () => import("./PortfolioDialog");
const PortfolioDialog = dynamic(loadDialog);

const allItems = portfolio;
const featuredItems = portfolio.filter((item) => item.featured);

// Curated row-span rhythm, stepped through by photo tiles only: a tall slot on
// a `slot: null` tile would just be a taller empty placeholder. The 9-tile
// featured set is all photos, so it keeps the original rhythm (fills 4 rows at
// lg); the full 24-tile list gets 3 tall photo tiles, 27 cells, 9 full rows.
// Re-check gap-free packing whenever the photo count or list length changes.
const spans = ["lg:row-span-2", "", "", "lg:row-span-2", "", "", "lg:row-span-2", "", "", "", "", ""];

function photoSpans(list: CaseStudy[]) {
  let photoIndex = 0;
  return list.map((item) => (item.slot ? spans[photoIndex++ % spans.length] : ""));
}

// Most-used categories first, ties kept in list order (Array.sort is stable),
// so the real event categories lead the chip row ahead of one-off tags.
function tagsByFrequency(list: CaseStudy[]) {
  const counts = new Map<string, number>();
  for (const item of list) counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1);
  return [...counts.keys()].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
}

const allTags = tagsByFrequency(allItems);
const featuredTags = tagsByFrequency(featuredItems);
const allSpans = photoSpans(allItems);
const featuredSpans = photoSpans(featuredItems);

type PortfolioGridProps = {
  /** Eager-load the first N tiles' images. Only true when the grid itself
   * renders above the fold (e.g. /work) — on the homepage it sits below
   * Hero/stats/ClientLogos, so eager-loading here would compete with the
   * real LCP image for early network priority. */
  priorityCount?: number;
  /** Show only the hand-picked `featured` entries (the homepage). /work
   * leaves this off and shows every case study. */
  featuredOnly?: boolean;
};

export function PortfolioGrid({ priorityCount = 0, featuredOnly = false }: PortfolioGridProps) {
  const items = featuredOnly ? featuredItems : allItems;
  const tags = featuredOnly ? featuredTags : allTags;
  const itemSpans = featuredOnly ? featuredSpans : allSpans;
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [dialogRequested, setDialogRequested] = useState(false);
  const activeItem = selected !== null ? items[selected] : null;

  // Filter client-side but keep each card's original index (for stagger
  // delay, shine delay, and the dialog lookup) so filtering never desyncs the
  // "View full case study" link. Row spans only apply to the unfiltered list:
  // a filtered subset would pick up arbitrary spans and leave holes, so it
  // falls back to a uniform grid instead.
  const visible = items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !activeTag || item.tag === activeTag);

  return (
    <>
      {/* One swipeable strip on phones (15+ tags would wrap into a tall wall), wrapping from md up.
          The small padding keeps the chips' focus rings from being clipped by the scroll container. */}
      <div className="no-scrollbar mb-2 flex flex-nowrap gap-1.5 overflow-x-auto px-0.5 py-1 md:mb-2.5 md:flex-wrap md:overflow-visible md:p-0">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:py-1 md:text-xs ${
            activeTag === null
              ? "border-lime/50 bg-lime/10 text-lime"
              : "border-glass-border text-fog-dim hover:border-lime/30 hover:text-fog"
          }`}
        >
          All work
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:py-1 md:text-xs ${
              activeTag === tag
                ? "border-lime/50 bg-lime/10 text-lime"
                : "border-glass-border text-fog-dim hover:border-lime/30 hover:text-fog"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(220px,auto)] lg:gap-4">
        {visible.map(({ item, i }) => (
          <m.div
            key={item.slug}
            // Tiles that render above the fold (priority) play the same fade and rise as a CSS
            // animation from first paint; the JS-driven version only started after hydration, which
            // held the largest image on /work back from being painted for about a second.
            initial={i < priorityCount ? false : { opacity: 0.4, y: 12 }}
            whileInView={i < priorityCount ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-glass-border transition-[border-color,box-shadow] duration-300 hover:border-lime/40 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] md:rounded-2xl lg:aspect-auto lg:h-full ${activeTag ? "" : itemSpans[i]} ${i < priorityCount ? "gn-tile-in" : ""}`}
          >
            <button
              type="button"
              onClick={() => {
                setDialogRequested(true);
                setSelected(i);
              }}
              onPointerEnter={() => void loadDialog()}
              onFocus={() => void loadDialog()}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              aria-label={`View ${item.title}`}
            >
              <span className="sr-only">{item.title}</span>
            </button>
            {/* Scaled independently of the tile so the border/radius stays crisp */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
              {item.slot ? (
                <DuotoneImage
                  src={getMedia(item.slot)}
                  alt={item.title}
                  position={slotPosition[item.slot]}
                  priority={i < priorityCount}
                  // Single column on phones: the tile is the viewport minus the 24px page padding on each side.
                  sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, calc(100vw - 48px)"
                />
              ) : (
                // No confirmed photo: never fall back to getMedia's hero image. The label is lifted into
                // the top of the tile so it clears the tag/title/pill block along the bottom edge.
                <EventPhotoPlaceholder size="sm" className="[&>div:last-child]:bottom-[40%]" />
              )}
            </div>
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t transition-opacity duration-300 ${
                // Lighter scrim over the placeholder so its glow still reads; the text already sits on ink.
                item.slot ? "h-3/4 from-ink via-ink/80 to-transparent" : "h-1/2 from-ink/90 via-ink/50 to-transparent"
              }`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 group-hover:-translate-y-1 md:p-4">
              <p className="flex flex-wrap items-baseline gap-x-1.5 text-[10px] [text-shadow:0_1px_6px_rgb(0_0_0/0.7)] md:text-xs">
                <span className="text-lime opacity-90 transition-opacity duration-300 group-hover:opacity-100">{item.tag}</span>
                {item.date && (
                  <>
                    <span aria-hidden="true" className="text-fog-dim">·</span>
                    <span className="text-fog-dim">{item.date}</span>
                  </>
                )}
              </p>
              <p className="font-display text-sm tracking-tight text-fog [text-shadow:0_1px_8px_rgb(0_0_0/0.7)] md:text-base">{item.title}</p>
              <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-lime/40 bg-ink/50 px-2.5 py-1 text-[10px] font-medium text-lime backdrop-blur-sm transition-colors duration-300 ease-out group-hover:bg-lime group-hover:text-ink">
                View event
                <ArrowRight className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </div>
            <span
              aria-hidden="true"
              className="card-shine"
              style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
            />
          </m.div>
        ))}
      </div>

      {dialogRequested && <PortfolioDialog activeItem={activeItem} onClose={() => setSelected(null)} />}
    </>
  );
}
