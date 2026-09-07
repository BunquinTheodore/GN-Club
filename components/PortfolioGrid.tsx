"use client";

import { motion } from "framer-motion";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";

const items = [
  { slot: "work.1", title: "Founders Summit", tag: "Conference" },
  { slot: "work.2", title: "Chainlink Meetup Manila", tag: "Web3 Activation" },
  { slot: "work.3", title: "Neon Rooftop Launch", tag: "Product Launch" },
  { slot: "work.4", title: "Founders Summit Afterparty", tag: "Party" },
  { slot: "work.5", title: "Studio Livestream", tag: "Online Event" },
  { slot: "work.6", title: "Regional Roadshow", tag: "Trade Show" },
];

const spans = ["md:row-span-2", "", "", "md:row-span-2", "", ""];

export function PortfolioGrid() {
  return (
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
          <DuotoneImage src={getMedia(item.slot)} alt={item.title}  />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-xs text-lime">{item.tag}</p>
            <p className="font-display text-lg text-fog">{item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
