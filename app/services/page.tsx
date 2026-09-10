"use client";

import { ServiceBento } from "@/components/ServiceBento";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { PanelReveal } from "@/components/PanelReveal";
import { HorizontalScroll } from "@/components/HorizontalScroll";

export default function ServicesPage() {
  return (
    <HorizontalScroll>
      <section className="flex h-full flex-col justify-center px-6 py-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="text-sm font-medium text-fog-dim">What we do</p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              Everything between a brief and a room full of people who felt something.
            </h1>
          </PanelReveal>
        </div>
      </section>

      <HorizontalScroll.Panel width="150vw">
        <section className="flex h-full flex-col justify-center px-6 py-8 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <ServiceBento full />
          </div>
        </section>
      </HorizontalScroll.Panel>

      <section className="flex h-full flex-col justify-center px-6 py-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal className="mb-8 text-center">
            <p className="text-sm font-medium text-fog-dim">FAQ</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-fog sm:text-4xl">
              Questions we hear a lot.
            </h2>
          </PanelReveal>
          <FAQSection />
        </div>
      </section>

      <section className="flex h-full flex-col justify-center px-6 py-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <CTASection />
        </div>
      </section>
    </HorizontalScroll>
  );
}
