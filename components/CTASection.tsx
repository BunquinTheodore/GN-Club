"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";

export function CTASection() {
  return (
    <section className="relative overflow-hidden border-y border-glass-border">
      <DuotoneImage
        src={getMedia("contact.backdrop")}
        alt=""
        className="opacity-40"
        position="center 25%"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-12 text-center sm:flex-row sm:gap-6 sm:py-16 sm:text-left lg:px-10"
      >
        <div>
          <h2 className="font-display text-2xl leading-tight tracking-tight text-fog sm:text-3xl">
            Have an event that needs to move a community?
          </h2>
          <p className="mt-2 text-sm text-fog-dim">
            Tell us the brief. We&apos;ll tell you what it takes to pull it off.
          </p>
        </div>
        <MagneticButton href="/contact">Start a project</MagneticButton>
      </motion.div>
    </section>
  );
}
