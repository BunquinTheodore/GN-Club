"use client";

import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PanelReveal } from "@/components/PanelReveal";
import { ScrollJackTrack, type ScrollJackPanel } from "@/components/ScrollJackTrack";

export default function WorkPage() {
  const panels: ScrollJackPanel[] = [
    {
      label: "Selected work",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 md:pt-0 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <PanelReveal>
              <p className="text-sm font-medium text-fog-dim">Selected work</p>
              <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
                A few rooms we&apos;ve built.
              </h1>
            </PanelReveal>
          </div>
        </section>
      ),
    },
  ];

  return (
    <div className="flex flex-col pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-0 md:pb-24">
      <ScrollJackTrack panels={panels} />

      <div className="mx-auto mt-10 w-full max-w-7xl px-6 md:mt-16 lg:px-10">
        <PortfolioGrid />
      </div>
    </div>
  );
}
