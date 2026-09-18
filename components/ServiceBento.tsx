"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "./DuotoneImage";

const spanClasses: Record<string, string> = {
  lg: "md:col-span-6 md:row-span-2",
  md: "md:col-span-6 md:row-span-1",
  // Three "sm" tiles fall consecutively (Video Production, Logistics,
  // Fabrication & Build) and need to fill a row exactly — col-span-4 on a
  // 12-column grid (below) makes 3 x 33% = 100%, no leftover gap.
  sm: "md:col-span-4 md:row-span-1",
};

// Title/blurb scale follows tile size, so the flagship tile reads as the
// lead of the grid instead of every card competing at the same weight.
const titleClasses: Record<string, string> = {
  lg: "text-2xl sm:text-3xl",
  md: "text-xl",
  sm: "text-lg",
};

// Icon chip size follows tile size too — small tiles get a slightly
// smaller mark so it doesn't crowd a two-line title.
const iconChipClasses: Record<string, string> = {
  lg: "h-11 w-11",
  md: "h-10 w-10",
  sm: "h-9 w-9",
};

export function ServiceBento({ full = false }: { full?: boolean }) {
  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-12 ${
        full ? "md:auto-rows-[minmax(230px,auto)]" : "md:auto-rows-[minmax(210px,auto)]"
      }`}
    >
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            style={{ willChange: "transform" }}
            className={spanClasses[service.span]}
          >
            <Link
              href={`/services/${service.slug}`}
              aria-label={`View details for ${service.title}`}
              className={`group relative block h-full overflow-hidden rounded-2xl border border-glass-border transition-shadow duration-300 ease-out hover:border-lime/30 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]`}
            >
            <DuotoneImage
              src={getMedia(service.media)}
              alt={service.title}
              position={service.slug === "digital" ? "center 25%" : undefined}
            />
            {/* Two-stop scrim guarantees legible text regardless of how
                bright the underlying photo is, instead of relying on one
                soft gradient that can leave mid-tone photos low-contrast. */}
            <div className="pointer-events-none absolute inset-0 bg-ink/15" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />

            <div
              className={`relative flex h-full flex-col justify-end ${
                service.span === "lg" ? "p-7" : "p-5"
              }`}
            >
              <span
                className={`mb-3 inline-flex items-center justify-center rounded-lg border border-white/10 bg-ink/50 backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-lime/40 group-hover:bg-ink/70 group-hover:shadow-[0_0_20px_rgba(198,242,78,0.25)] ${iconChipClasses[service.span]}`}
              >
                <Icon
                  className="h-[46%] w-[46%] text-lime transition-transform duration-300 ease-out group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </span>
              <h3 className={`font-display leading-tight tracking-tight text-fog ${titleClasses[service.span]}`}>
                {service.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-fog-dim">
                {service.blurb}
              </p>

              <span className="mt-4 inline-flex w-fit items-center gap-1.5 self-start rounded-full border border-lime/40 bg-ink/50 px-3.5 py-1.5 text-xs font-medium text-lime backdrop-blur-sm transition-colors duration-300 ease-out group-hover:bg-lime group-hover:text-ink">
                Explore more
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5" strokeWidth={2} />
              </span>
            </div>

            <span
              aria-hidden="true"
              className="card-shine"
              style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
            />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
