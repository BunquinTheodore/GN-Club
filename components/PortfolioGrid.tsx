"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";
import { portfolio } from "@/lib/portfolio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const items = portfolio;
const spans = ["md:row-span-2", "", "", "md:row-span-2", "", "", "", "", ""];

// object-cover art-direction overrides, keyed by lib/media.ts slot. Only
// slots where a blind center crop loses the subject at both the short/wide
// grid-tile shape and the wider aspect-video dialog shape need an entry —
// most of these are wide concert/crowd photos that center-crop fine as-is.
const slotPosition: Record<string, string> = {
  // Group photo: heads (including the back row, flush with the top edge)
  // sit in the top ~60% of a 16:9 frame. The grid tile is much wider than
  // 16:9, so a center crop trims enough off the top to cut into hair/heads.
  "pickleball.1": "center 20%",
};

const tags = Array.from(new Set(items.map((item) => item.tag)));

export function PortfolioGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
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
          className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:text-xs ${
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
            className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime md:text-xs ${
              activeTag === tag
                ? "border-lime/50 bg-lime/10 text-lime"
                : "border-glass-border text-fog-dim hover:border-lime/30 hover:text-fog"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[220px] md:gap-4">
        {visible.map(({ item, i }) => (
          <motion.div
            key={item.slot}
            initial={{ opacity: 0.4, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-glass-border transition-[border-color,box-shadow] duration-300 hover:border-lime/40 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] sm:aspect-auto md:h-full md:rounded-2xl ${spans[i]}`}
          >
            <button
              type="button"
              onClick={() => setSelected(i)}
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
                priority={i < 3}
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/50 to-transparent transition-opacity duration-300" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 group-hover:-translate-y-1 md:p-4">
              <p className="text-[10px] text-lime opacity-90 transition-opacity duration-300 group-hover:opacity-100 md:text-xs">{item.tag}</p>
              <p className="font-display text-sm tracking-tight text-fog md:text-base">{item.title}</p>
            </div>
            <span
              aria-hidden="true"
              className="card-shine"
              style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
            />
          </motion.div>
        ))}
      </div>

      <Dialog
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent
          className="duration-300 ease-out sm:max-w-lg data-open:zoom-in-95 data-open:slide-in-from-bottom-2 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-1"
        >
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <DuotoneImage
                    src={getMedia(activeItem.slot)}
                    alt={activeItem.title}
                    position={slotPosition[activeItem.slot]}
                  />
                </div>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{activeItem.tag}</Badge>
                  </div>
                  <DialogTitle>{activeItem.title}</DialogTitle>
                  <DialogDescription>{activeItem.description}</DialogDescription>
                </DialogHeader>
                <Button
                  render={<Link href={`/work/${activeItem.slug}`} />}
                  className="mt-2 w-full bg-lime text-ink transition-transform duration-200 hover:scale-[1.02] hover:bg-lime sm:w-auto"
                >
                  View full case study
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
