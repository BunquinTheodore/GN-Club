"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ClientLogos } from "./ClientLogos";
import { CountUpValue } from "./CountUpValue";
import { site } from "@/lib/site";
import { stats } from "@/lib/stats";

const HEADLINE = "We Build the Events Tech and Web3 Brands Are Remembered For.";

const headlineContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.02, delayChildren: 0.1 },
  },
};

const wordUp: Variants = {
  hidden: { opacity: 0, y: 14, rotateX: -25 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative pt-16 md:pt-0">
      {/* Mobile keeps a small top clearance (pt-16) so the photo starts below
          the fixed, opaque mobile top bar instead of hiding under it. Desktop
          now has a persistent left sidebar instead of a floating transparent
          header, so the photo goes fully edge-to-edge from the top of the
          content column (md:pt-0) — that reads as intentional since nothing
          used to occupy that space, rather than a header-bleed trick.

          GN Club logo is baked into the source image already centered
          (~50% horizontally); "center" keeps it centered in the crop
          regardless of viewport width. Sized generously but well short of a
          full-viewport hero — the page is meant to scroll, not be crammed
          into one screen. */}
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden sm:h-[52vh] md:h-[58vh] lg:h-[62vh] lg:max-h-[640px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [1.05, 1, 1.09] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 1, ease: [0.16, 1, 0.3, 1] }
              : {
                  opacity: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  scale: {
                    duration: 26,
                    times: [0, 0.045, 1],
                    ease: ["easeOut", "easeOut", "easeInOut"],
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }
          }
          className="absolute inset-0"
        >
          <Image
            src="/hero-cover.png"
            alt="GN Club team at an activation, GN Club logo centered"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
        </motion.div>
        {/* Thin bottom fade only, so the photo reads edge-to-edge and clean —
            just enough to settle the seam into the section below. */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 text-center lg:px-10 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm font-medium text-fog-dim"
          >
            {site.tagline}
          </motion.p>

          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            style={{ perspective: 600 }}
            className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-fog sm:text-4xl md:text-5xl"
          >
            {/* Same 11 words, same copy — forced onto exactly 2 lines. Break
                after "Web3" (word 7 of 11): line 2 ("Brands Are Remembered
                For.") has fewer, mostly-short words so it reliably fits on
                one line without wrapping again, even though line 1 carries
                more words — line 1's words are individually shorter. */}
            {HEADLINE.split(" ").map((word, i) => (
              <span key={`${word}-${i}`}>
                <motion.span
                  variants={wordUp}
                  className="mr-[0.28em] inline-block"
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word}
                </motion.span>
                {i === 6 ? <br /> : null}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-5 max-w-xl text-sm text-fog-dim sm:whitespace-nowrap sm:text-base"
          >
            {site.bioShort}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="/contact">Start a project</MagneticButton>
            <MagneticButton href="/work" variant="outline">
              See our work
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center gap-14 border-t border-glass-border/60 pt-8"
        >
          <div className="flex w-full items-baseline justify-between gap-x-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <CountUpValue
                  value={stat.value}
                  className="font-display text-3xl tabular-nums text-fog sm:text-4xl md:text-5xl"
                />
                <p className="mt-1 text-xs text-fog-dim">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="w-full">
            <ClientLogos />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
