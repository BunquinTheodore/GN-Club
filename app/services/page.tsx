"use client";

import { ServiceBento } from "@/components/ServiceBento";
import { FAQSection } from "@/components/FAQSection";
import { Reveal } from "@/components/Reveal";

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <section className="px-6 pt-24 pb-10 sm:pt-28 sm:pb-16 md:pt-0 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <p className="text-sm font-medium text-fog-dim">What we do</p>
            <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              Everything between a brief and a room full of people who felt something.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <ServiceBento full />
        </div>
      </section>

      <section className="border-t border-glass-border px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-3xl">
          <FAQSection />
        </div>
      </section>
    </div>
  );
}
