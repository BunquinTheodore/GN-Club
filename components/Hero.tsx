import Image from "next/image";
import type { CSSProperties } from "react";
import { MagneticButton } from "./MagneticButton";
import { ClientLogos } from "./ClientLogos";
import { CountUpValue } from "./CountUpValue";
import { site } from "@/lib/site";
import { stats } from "@/lib/stats";

const HEADLINE = "We Build the Events Tech and Web3 Brands Are Remembered For.";

/** Entrance timing as CSS custom properties; the keyframes live in globals.css (.gn-rise, .gn-word).
 * CSS keeps the text visible from the first paint instead of waiting on JS hydration. */
function riseStyle(delay: number, distance: number, duration = 0.5): CSSProperties {
  return {
    "--gn-delay": `${delay}s`,
    "--gn-rise-y": `${distance}px`,
    "--gn-rise-d": `${duration}s`,
  } as CSSProperties;
}

const WORD_STAGGER_S = 0.02;
const WORD_DELAY_S = 0.1;

export function Hero() {
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
        {/* Slow zoom drift runs as a CSS animation on the compositor (see .gn-hero-drift) instead of an
            infinite JS-driven framer-motion loop, which kept the main thread busy for the whole visit. */}
        <div className="gn-hero-drift absolute inset-0">
          <Image
            src="/hero-cover.jpg"
            alt="GN Club team at an activation, GN Club logo centered"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) calc(100vw - 260px), 100vw"
            className="object-cover"
            style={{ objectPosition: "center" }}
          />
        </div>
        {/* Thin bottom fade only, so the photo reads edge-to-edge and clean —
            just enough to settle the seam into the section below. */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pt-4 pb-16 text-center lg:px-10 md:pt-6 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <p className="gn-rise text-sm font-medium text-fog-dim" style={riseStyle(0, 8)}>
            {site.tagline}
          </p>

          <h1
            style={{ perspective: 600 }}
            className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-balance text-fog sm:text-4xl md:text-5xl"
          >
            {/* Same 11 words, same copy. The wrap is left to the browser with
                text-balance: the Josefin caps are wide, so a forced break after
                "Web3" left that word alone on a line at desktop widths. */}
            {HEADLINE.split(" ").map((word, i) => (
              <span key={`${word}-${i}`}>
                <span
                  className="gn-word mr-[0.28em] inline-block"
                  style={{ "--gn-delay": `${WORD_DELAY_S + i * WORD_STAGGER_S}s` } as CSSProperties}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="gn-rise mx-auto mt-5 max-w-xl text-sm text-fog-dim sm:whitespace-nowrap sm:text-base"
            style={riseStyle(0.35, 10)}
          >
            {site.bioShort}
          </p>

          <div
            className="gn-rise mt-8 flex flex-wrap items-center justify-center gap-4"
            style={riseStyle(0.45, 10)}
          >
            <MagneticButton href="/contact">Start a project</MagneticButton>
            <MagneticButton href="/work" variant="outline">
              See our work
            </MagneticButton>
          </div>
        </div>

        <div
          className="gn-rise mx-auto mt-12 flex w-full max-w-4xl flex-col items-center gap-14 border-t border-glass-border/60 pt-8"
          style={riseStyle(0.55, 12, 0.6)}
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
        </div>
      </div>
    </section>
  );
}
