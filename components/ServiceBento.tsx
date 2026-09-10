"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/services";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "./DuotoneImage";

const spanClasses: Record<string, string> = {
  lg: "md:col-span-4 md:row-span-2",
  md: "md:col-span-4 md:row-span-1",
  sm: "md:col-span-2 md:row-span-1",
};

export function ServiceBento({ full = false }: { full?: boolean }) {
  const listClasses = full
    ? "mt-2"
    : "mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100";

  return (
    <div className={`grid grid-cols-1 gap-3 md:grid-cols-8 ${full ? "md:auto-rows-[190px]" : "md:auto-rows-[140px]"}`}>
      {services.map((service, i) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-2xl border border-glass-border ${
              full ? "md:h-auto md:min-h-[210px]" : ""
            } ${spanClasses[service.span]}`}
          >
            <DuotoneImage
              src={getMedia(service.media)}
              alt={service.title}
              position={service.slug === "digital" ? "center 25%" : undefined}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

            <div className={`relative flex h-full flex-col justify-end ${full ? "p-5" : "p-6"}`}>
              <Icon className="mb-2 h-6 w-6 text-lime" strokeWidth={1.5} />
              <h3 className="font-display text-xl text-fog">{service.title}</h3>
              <p className="mt-1 text-sm text-fog-dim">{service.blurb}</p>

              <ul className={listClasses}>
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 py-px text-xs leading-tight text-fog-dim">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-lime/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.div>
        );
      })}

      {!full && (
        <Link
          href="/services"
          className="flex items-center justify-center rounded-2xl border border-dashed border-glass-border py-6 text-sm text-fog-dim transition-colors hover:border-lime/50 hover:text-lime md:col-span-8"
        >
          View full services breakdown
        </Link>
      )}
    </div>
  );
}
