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
              <h1 className="mt-3 text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
                {service.title}
              </h1>
              {service.tagline && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog-dim">{service.tagline}</p>
              )}
            </PanelReveal>
          </div>
        </section>
      ),
    },
    {
      label: "What's included",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <PanelReveal>
              <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">What&apos;s included</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <PanelReveal>
              <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">Overview</h2>
              <div className="mt-5 grid gap-6 md:grid-cols-2 md:gap-10">
                {service.overview!.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-fog-dim">
                    {paragraph}
                  </p>
                ))}
              </div>
            </PanelReveal>
          </div>
        </section>
      ),
    });
  }

  if (service.process && service.process.length > 0) {
    panels.push({
      label: "Process",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <PanelReveal>
              <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">How it runs</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.process!.map((step, i) => (
                  <div
                    key={step.title}
                    className="glass-panel relative overflow-hidden flex items-start gap-3 rounded-xl px-4 py-4"
                  >
                    <p className="font-display text-xs text-lime">{String(i + 1).padStart(2, "0")}</p>
                    <div>
                      <p className="font-display text-sm text-fog">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-fog-dim">{step.description}</p>
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
  }

  panels.push({
    label: "Gallery",
    content: (
      <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <PanelReveal>
            <h2 className="font-display text-xl tracking-tight text-fog sm:text-2xl">Gallery</h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[minmax(150px,auto)] md:gap-4">
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
