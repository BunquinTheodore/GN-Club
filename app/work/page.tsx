import { Metadata } from "next";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Work — GN Club",
  description: "Recent activations, launches, and productions from GN Club.",
};

export default function WorkPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-40 lg:px-10">
        <Reveal>
          <p className="text-sm font-medium text-fog-dim">Selected work</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight text-fog sm:text-5xl">
            A few rooms we&apos;ve built.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-fog-dim">
            Placeholder imagery below — swap in GN Club&apos;s own event photography any time via
            <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">lib/media.ts</code>.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <PortfolioGrid />
      </section>

      <CTASection />
    </>
  );
}
