"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { services } from "@/lib/services";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "@/components/DuotoneImage";
import { GlassPanel } from "@/components/GlassPanel";
import { ScrollJackTrack, type ScrollJackPanel } from "@/components/ScrollJackTrack";
import { PanelReveal } from "@/components/PanelReveal";
import { CTASection } from "@/components/CTASection";

type ServiceDetailPanelsProps = {
  slug: string;
};

export function ServiceDetailPanels({ slug }: ServiceDetailPanelsProps) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  const Icon = service.icon;
  const gallery = service.gallery ?? [service.media];

  const panels: ScrollJackPanel[] = [
    {
      label: "Overview",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <DuotoneImage src={getMedia(service.media)} alt={service.title} className="opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
          <div className="relative mx-auto w-full max-w-6xl">
            <PanelReveal>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-sm text-fog-dim transition-colors hover:text-lime"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to services
              </Link>
              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-ink/50 backdrop-blur-sm">
                  <Icon className="h-[46%] w-[46%] text-lime" strokeWidth={1.5} />
                </span>
              </div>
              <h1 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-6xl">
                {service.title}
              </h1>
              {service.tagline && (
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fog-dim">{service.tagline}</p>
              )}
            </PanelReveal>
          </div>
        </section>
      ),
    },
    {
      // Left column carries the "why" (a short framing line + the service
      // photo, reused from the hero at lower opacity for continuity); the
      // catalog grid gets the wider right column instead of competing for
      // space in a single centered text block. Full-width use of a 100vw
      // panel this way reads as a designed slide rather than a vertical
      // section that happens to be alone on screen.
      label: "What's included",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
            <PanelReveal>
              <div className="relative h-40 overflow-hidden rounded-2xl md:h-56">
                <DuotoneImage src={getMedia(service.media)} alt="" className="opacity-70" />
              </div>
              <h2 className="mt-6 font-display text-2xl tracking-tight text-fog sm:text-3xl">
                What&apos;s included
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-fog-dim">{service.blurb}</p>
            </PanelReveal>
            <PanelReveal delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.items.map((item, i) => (
                  <GlassPanel
                    key={item}
                    shineDelay={(i % 5) * 0.6}
                    className="flex items-center gap-3 px-5 py-3.5"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime" />
                    <span className="text-sm text-fog">{item}</span>
                  </GlassPanel>
                ))}
              </div>
            </PanelReveal>
          </div>
        </section>
      ),
    },
  ];

  if (service.overview && service.overview.length > 0) {
    panels.push({
      label: "Details",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <DuotoneImage src={getMedia(service.media)} alt="" className="opacity-10" />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="relative mx-auto w-full max-w-7xl">
            <PanelReveal>
              <h2 className="font-display text-2xl tracking-tight text-fog sm:text-3xl">Overview</h2>
            </PanelReveal>
            <div className="mt-8 grid gap-x-16 gap-y-6 md:grid-cols-2">
              {service.overview!.map((paragraph, i) => (
                <PanelReveal key={i} delay={0.06 + i * 0.06}>
                  <p className="text-base leading-relaxed text-fog-dim sm:text-lg">{paragraph}</p>
                </PanelReveal>
              ))}
            </div>
          </div>
        </section>
      ),
    });
  }

  if (service.process && service.process.length > 0) {
    panels.push({
      // A horizontal run of steps (not a 2x2 grid) — a process read
      // left-to-right across the full width of the frame matches the
      // page's own left-to-right pan instead of cutting against it.
      label: "Process",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <PanelReveal>
              <h2 className="font-display text-2xl tracking-tight text-fog sm:text-3xl">How it runs</h2>
            </PanelReveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {service.process!.map((step, i) => (
                <PanelReveal key={step.title} delay={0.05 + i * 0.05}>
                  <div className="glass-panel relative h-full overflow-hidden rounded-xl px-5 py-5">
                    <p className="font-display text-sm text-lime">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-3 font-display text-base text-fog">{step.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-fog-dim">{step.description}</p>
                    <span
                      aria-hidden="true"
                      className="card-shine"
                      style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
                    />
                  </div>
                </PanelReveal>
              ))}
            </div>
          </div>
        </section>
      ),
    });
  }

  panels.push({
    label: "Gallery",
    content: (
      <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <h2 className="font-display text-2xl tracking-tight text-fog sm:text-3xl">Gallery</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(160px,auto)] md:gap-4">
              {gallery.map((slot, i) => (
                <div
                  key={`${slot}-${i}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-glass-border transition-colors duration-300 hover:border-lime/40 md:aspect-auto"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
                    <DuotoneImage src={getMedia(slot)} alt={`${service.title} photo ${i + 1}`} />
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
  });

  panels.push({
    label: "Get in touch",
    content: (
      <div className="flex h-full items-center">
        <CTASection />
      </div>
    ),
  });

  return <ScrollJackTrack panels={panels} />;
}
