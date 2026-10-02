"use client";

import { useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";
import { portfolio } from "@/lib/portfolio";
import { slotPosition } from "./portfolioSlots";

// The preview dialog (and the Base UI primitives behind it) only matters after a click, so it is
// requested on first interaction with the grid instead of shipping with the page.
const loadDialog = () => import("./PortfolioDialog");
const PortfolioDialog = dynamic(loadDialog);

const items = portfolio;
const spans = ["lg:row-span-2", "", "", "lg:row-span-2", "", "", "", "", ""];

const tags = Array.from(new Set(items.map((item) => item.tag)));

type PortfolioGridProps = {
  /** Eager-load the first N tiles' images. Only true when the grid itself
   * renders above the fold (e.g. /work) — on the homepage it sits below
   * Hero/stats/ClientLogos, so eager-loading here would compete with the
   * real LCP image for early network priority. */
  priorityCount?: number;
};

export function PortfolioGrid({ priorityCount = 0 }: PortfolioGridProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [dialogRequested, setDialogRequested] = useState(false);
  const activeItem = selected !== null ? items[selected] : null;

  // Filter client-side but keep each card's original index (for `spans`,
  // stagger delay, and the dialog lookup) so filtering never reflows the
  // curated row-span layout or desyncs the "View full case study" link.
  const visible = items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !activeTag || item.tag === activeTag);

  return (
    <>
      <div className="mb-3 flex flex-wrap gap-1.5 md:mb-2.5">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`rounded-full border px-3 py-2 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:py-1 md:text-xs ${
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
            className={`rounded-full border px-3 py-2 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:py-1 md:text-xs ${
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
            key={item.slot}
            // Tiles that render above the fold (priority) play the same fade and rise as a CSS
            // animation from first paint; the JS-driven version only started after hydration, which
            // held the largest image on /work back from being painted for about a second.
            initial={i < priorityCount ? false : { opacity: 0.4, y: 12 }}
            whileInView={i < priorityCount ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-glass-border transition-[border-color,box-shadow] duration-300 hover:border-lime/40 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] md:rounded-2xl lg:aspect-auto lg:h-full ${spans[i]} ${i < priorityCount ? "gn-tile-in" : ""}`}
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
              <DuotoneImage
                src={getMedia(item.slot)}
                alt={item.title}
                position={slotPosition[item.slot]}
                priority={i < priorityCount}
                // Single column on phones: the tile is the viewport minus the 24px page padding on each side.
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, calc(100vw - 48px)"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink via-ink/80 to-transparent transition-opacity duration-300" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 group-hover:-translate-y-1 md:p-4">
              <p className="text-[10px] text-lime opacity-90 [text-shadow:0_1px_6px_rgb(0_0_0/0.7)] transition-opacity duration-300 group-hover:opacity-100 md:text-xs">{item.tag}</p>
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
