"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/lib/portfolio";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "@/components/DuotoneImage";
import { PersistentPanelBackground } from "@/components/PersistentPanelBackground";
import { GlassPanel } from "@/components/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { ScrollJackTrack, type ScrollJackPanel } from "@/components/ScrollJackTrack";
import { PanelReveal } from "@/components/PanelReveal";

type CaseStudyPanelsProps = {
  caseStudy: CaseStudy;
};

// object-cover art-direction, keyed by lib/media.ts slot. Tiles here (the
// full-bleed intro backdrop and the h-48/sm:h-64 gallery cells) are all
// short-and-wide, so a plain center crop loses any subject that sits far
// from the vertical middle of its source photo. Only slots that actually
// need a push get an entry — everything else is fine on the default center.
const positions: Record<string, string> = {
  // Founders Summit stock photo: the audience fills only the bottom ~55%
  // of the frame, with a near-empty decorative wall above — center-crop
  // wastes height on that wall and risks losing the crowd entirely.
  "work.1": "center 80%",
  // Pickleball group photo: everyone is packed into the top ~60% of the
  // frame, with empty court below — center-crop risks clipping the back
  // row of heads while keeping a slab of empty floor.
  "pickleball.1": "center 15%",
};

/**
 * Result value with a lightweight count-up: parses a leading numeric run
 * (allowing commas, e.g. "2,400") and animates it in once the tile scrolls
 * into view, preserving any surrounding text ("350+", "3 days"). Values
 * with no leading digits (e.g. "TBD", "Recurring") just render as-is.
 * Skips the animation under prefers-reduced-motion.
 */
function StatValue({ value, className }: { value: string; className?: string }) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion || !match ? value : `0${match[2]}`);
  const animated = useRef(false);

  if (!match) {
    return <p className={className}>{value}</p>;
  }

  const target = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2];

  return (
    <motion.p
      className={className}
      onViewportEnter={() => {
        if (animated.current || reducedMotion) return;
        animated.current = true;
        animate(0, target, {
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(`${Math.round(v).toLocaleString()}${suffix}`),
        });
      }}
      viewport={{ once: true, margin: "0px" }}
    >
      {display}
    </motion.p>
  );
}

export function CaseStudyPanels({ caseStudy }: CaseStudyPanelsProps) {
  const panels: ScrollJackPanel[] = [
    {
      label: "Overview",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          {/* Scrim over the shared persistent background — the hero backdrop
              often carries the event's own on-site signage (e.g.
              stage/session lettering) that competes with the H1 and stat
              tiles sitting on top of it. This darkens specifically behind
              the text/stat column without further flattening the photo
              itself. */}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
          <div className="relative mx-auto w-full max-w-6xl">
            <PanelReveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 text-sm text-fog-dim transition-colors hover:text-lime"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to work
              </Link>
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline">{caseStudy.tag}</Badge>
              </div>
              <h1 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">{caseStudy.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog-dim">{caseStudy.description}</p>
            </PanelReveal>

            <PanelReveal delay={0.08} className="mt-8">
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
                {caseStudy.results.map((result, i) => (
                  <motion.div
                    key={result.label}
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                  >
                    <GlassPanel
                      shineDelay={(i % 5) * 0.6}
                      className="p-6 text-center transition-[border-color,box-shadow] duration-300 hover:border-lime/30 hover:shadow-[0_16px_40px_-16px_rgba(198,242,78,0.35)]"
                    >
                      <StatValue value={result.value} className="gradient-ring-text font-display text-3xl tabular-nums" />
                      <p className="mt-1 text-sm text-fog-dim">{result.label}</p>
                    </GlassPanel>
                  </motion.div>
                ))}
              </div>
            </PanelReveal>
          </div>
        </section>
      ),
    },
    {
      // Full-bleed text panel, matching ServiceDetailPanels' "Details"
      // pattern: a faint background photo wash for visual weight, with the
      // two-column copy stretched across a max-w-7xl frame instead of a
      // narrower centered column, so it actually uses the 100vw slide.
      label: "Challenge & approach",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          {/* Darker than the Overview panel's scrim (this one is
              text-heavy, two columns of body copy), but no longer near-opaque
              — the persistent background behind the whole track stays
              visible through it instead of fading to nothing. */}
          <div className="absolute inset-0 bg-ink/55" />
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="grid gap-x-16 gap-y-10 md:grid-cols-2">
              <PanelReveal>
                <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">The challenge</h2>
                <p className="mt-3 text-base leading-relaxed text-fog-dim sm:text-lg">{caseStudy.challenge}</p>
              </PanelReveal>
              <PanelReveal delay={0.08}>
                <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">Our approach</h2>
                <p className="mt-3 text-base leading-relaxed text-fog-dim sm:text-lg">{caseStudy.approach}</p>
              </PanelReveal>
            </div>
          </div>
        </section>
      ),
    },
    {
      label: "Gallery",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          {/* Soft scrim only, not the near-opaque one the text panel gets —
              the gallery's own photos carry the panel, but the persistent
              hero background still bleeds through around/behind the grid so
              the cut into the gallery doesn't read as a different page. */}
          <div className="absolute inset-0 bg-ink/45" />
          <div className="relative mx-auto w-full max-w-7xl">
            <PanelReveal>
              <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">Gallery</h2>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(150px,auto)] md:gap-4">
                {caseStudy.gallery.map((slot, i) => (
                  <div
                    key={`${slot}-${i}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-glass-border transition-colors duration-300 hover:border-lime/40 md:aspect-auto"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
                      <DuotoneImage
                        src={getMedia(slot)}
                        alt={`${caseStudy.title} photo ${i + 1}`}
                        position={positions[slot]}
                      />
                    </div>
                    <span
                      aria-hidden="true"
                      className="card-shine"
                      style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
                    />
                  </div>
                ))}
              </div>
            </PanelReveal>
          </div>
        </section>
      ),
    },
  ];

  return (
    <ScrollJackTrack
      panels={panels}
      background={
        <PersistentPanelBackground
          src={getMedia(caseStudy.slot)}
          alt={caseStudy.title}
          position={positions[caseStudy.slot]}
        />
      }
    />
  );
}
