"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

export function PortfolioGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const activeItem = selected !== null ? items[selected] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[145px]">
        {items.map((item, i) => (
          <motion.div
            key={item.slot}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-2xl border border-glass-border ${spans[i]}`}
          >
            <button
              type="button"
              onClick={() => setSelected(i)}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              aria-label={`View ${item.title}`}
            >
              <span className="sr-only">{item.title}</span>
            </button>
            <DuotoneImage
              src={getMedia(item.slot)}
              alt={item.title}
              position={slotPosition[item.slot]}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-xs text-lime">{item.tag}</p>
              <p className="font-display text-lg text-fog">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="sm:max-w-lg">
          {activeItem && (
            <>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
                className="mt-2 w-full bg-lime text-ink hover:bg-lime sm:w-auto"
              >
                View full case study
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
