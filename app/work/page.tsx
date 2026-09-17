"use client";

import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PanelReveal } from "@/components/PanelReveal";
import { HorizontalScroll } from "@/components/HorizontalScroll";

export default function WorkPage() {
  return (
    <HorizontalScroll>
      <div className="flex flex-col px-6 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-0 md:pb-24 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="text-sm font-medium text-fog-dim">Selected work</p>
            <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              A few rooms we&apos;ve built.
            </h1>
          </PanelReveal>
        </div>

        <div className="mx-auto mt-10 w-full max-w-7xl md:mt-16">
          <PortfolioGrid />
        </div>
      </div>
    </HorizontalScroll>
  );
}
