import { Metadata } from "next";
import { ServiceBento } from "@/components/ServiceBento";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Services — GN Club",
  description: "Activations, online events, digital, video production, logistics and more.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-40 lg:px-10">
        <Reveal>
          <p className="text-sm font-medium text-fog-dim">What we do</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl tracking-tight text-fog sm:text-5xl">
            Everything between a brief and a room full of people who felt something.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <ServiceBento full />
      </section>

      <CTASection />
    </>
  );
}
