"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    slot: "work.1",
    title: "Founders Summit",
    tag: "Conference",
    description: "GN Club brought founders and operators together for a day of talks and networking.",
  },
  {
    slot: "work.2",
    title: "Chainlink Meetup Manila",
    tag: "Web3 Activation",
    description: "A GN Club activation for the Chainlink community in Manila.",
  },
  {
    slot: "work.3",
    title: "Neon Rooftop Launch",
    tag: "Product Launch",
    description: "A rooftop product launch produced end-to-end by GN Club.",
  },
  {
    slot: "work.4",
    title: "Founders Summit Afterparty",
    tag: "Party",
    description: "The after-hours celebration capping off GN Club's Founders Summit.",
  },
  {
    slot: "work.5",
    title: "Studio Livestream",
    tag: "Online Event",
    description: "A studio-produced livestream event hosted by GN Club.",
  },
  {
    slot: "work.6",
    title: "Regional Roadshow",
    tag: "Trade Show",
    description: "GN Club's trade show presence on a multi-city regional roadshow.",
  },
];

const spans = ["md:row-span-2", "", "", "md:row-span-2", "", ""];

export function PortfolioGrid() {
  const [selected, setSelected] = useState<number | null>(null);
  const activeItem = selected !== null ? items[selected] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[220px]">
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
            <DuotoneImage src={getMedia(item.slot)} alt={item.title} />
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
                <DuotoneImage src={getMedia(activeItem.slot)} alt={activeItem.title} />
              </div>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{activeItem.tag}</Badge>
                </div>
                <DialogTitle>{activeItem.title}</DialogTitle>
                <DialogDescription>{activeItem.description}</DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
