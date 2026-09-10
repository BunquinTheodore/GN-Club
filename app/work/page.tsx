"use client";

import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CTASection } from "@/components/CTASection";
import { PanelReveal } from "@/components/PanelReveal";
import { HorizontalScroll } from "@/components/HorizontalScroll";

export default function WorkPage() {
  return (
    <HorizontalScroll>
      <section className="flex h-full flex-col justify-center px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="text-sm font-medium text-fog-dim">Selected work</p>
            <h1 className="mt-2 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              A few rooms we&apos;ve built.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-fog-dim">
              Placeholder imagery below — swap in GN Club&apos;s own event photography any time via
              <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">lib/media.ts</code>.
            </p>
          </PanelReveal>
        </div>
      </section>

      <HorizontalScroll.Panel width="150vw">
        <section className="flex h-full flex-col justify-center px-6 py-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <PortfolioGrid />
          </div>
        </section>
      </HorizontalScroll.Panel>

      <section className="flex h-full flex-col justify-center px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <CTASection />
        </div>
      </section>
    </HorizontalScroll>
  );
}
