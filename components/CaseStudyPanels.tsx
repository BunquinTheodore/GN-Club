"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { CaseStudy } from "@/lib/portfolio";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "@/components/DuotoneImage";
import { GlassPanel } from "@/components/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/CTASection";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { PanelReveal } from "@/components/PanelReveal";

type CaseStudyPanelsProps = {
  caseStudy: CaseStudy;
};

// Wide-panel gallery: keep each panel to at most 4 images (2 columns x 2
// rows) so it stays legible while still using the extra horizontal room; a
// gallery longer than that spills into a second wide panel rather than
// cramming everything into one.
const GALLERY_CHUNK_SIZE = 4;

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

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function CaseStudyPanels({ caseStudy }: CaseStudyPanelsProps) {
  const galleryChunks = chunk(caseStudy.gallery, GALLERY_CHUNK_SIZE);

  return (
    <HorizontalScroll>
      <section className="relative flex h-full flex-col justify-center px-6 py-10 lg:px-10">
        <DuotoneImage
          src={getMedia(caseStudy.slot)}
          alt={caseStudy.title}
          className="opacity-50"
          position={positions[caseStudy.slot]}
        />
        <div className="relative mx-auto w-full max-w-4xl">
          <PanelReveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm text-fog-dim transition-colors hover:text-lime"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <Badge variant="outline">{caseStudy.tag}</Badge>
            </div>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">{caseStudy.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog-dim">{caseStudy.description}</p>
          </PanelReveal>

          <PanelReveal delay={0.08} className="mt-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {caseStudy.results.map((result) => (
                <GlassPanel key={result.label} className="p-6 text-center">
                  <p className="gradient-ring-text font-display text-3xl">{result.value}</p>
                  <p className="mt-1 text-sm text-fog-dim">{result.label}</p>
                </GlassPanel>
              ))}
            </div>
          </PanelReveal>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <PanelReveal>
              <h2 className="font-display text-xl text-fog">The challenge</h2>
              <p className="mt-3 text-base leading-relaxed text-fog-dim">{caseStudy.challenge}</p>
            </PanelReveal>
            <PanelReveal delay={0.08}>
              <h2 className="font-display text-xl text-fog">Our approach</h2>
              <p className="mt-3 text-base leading-relaxed text-fog-dim">{caseStudy.approach}</p>
            </PanelReveal>
          </div>
        </div>
      </section>

      {galleryChunks.map((slots, chunkIndex) => {
        const cols = Math.max(1, Math.ceil(slots.length / 2));
        const width = `${Math.min(220, Math.max(120, cols * 55))}vw`;
        return (
          <HorizontalScroll.Panel key={chunkIndex} width={width}>
            <section className="flex h-full flex-col justify-center px-6 py-8 lg:px-10">
              <div className="mx-auto w-full max-w-[1600px]">
                {chunkIndex === 0 && (
                  <PanelReveal className="mb-3">
                    <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">Gallery</h2>
                  </PanelReveal>
                )}
                <div
                  className="grid gap-3"
                  style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                >
                  {slots.map((slot, i) => (
                    <PanelReveal key={`${slot}-${i}`} delay={i * 0.08}>
                      <div className="relative h-48 overflow-hidden rounded-2xl border border-glass-border sm:h-64">
                        <DuotoneImage
                          src={getMedia(slot)}
                          alt={`${caseStudy.title} photo ${chunkIndex * GALLERY_CHUNK_SIZE + i + 1}`}
                          position={positions[slot]}
                        />
                      </div>
                    </PanelReveal>
                  ))}
                </div>
              </div>
            </section>
          </HorizontalScroll.Panel>
        );
      })}

      <section className="flex h-full flex-col justify-center">
        <CTASection />
      </section>
    </HorizontalScroll>
  );
}
