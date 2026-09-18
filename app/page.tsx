"use client";

import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServiceBento } from "@/components/ServiceBento";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { Testimonials } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />

      {/* What we do */}
      <section className="px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-fog-dim">What we do</p>
                <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
                  Six disciplines, one production team, zero handoffs.
                </h2>
              </div>
              <Link
                href="/services"
                className="inline-block shrink-0 text-sm text-lime outline-none hover:underline focus-visible:ring-2 focus-visible:ring-lime"
              >
                View all services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <ServiceBento />
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-fog-dim">Selected case studies</p>
                <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
                  Recent work.
                </h2>
              </div>
              <Link
                href="/work"
                className="inline-block shrink-0 text-sm text-lime outline-none hover:underline focus-visible:ring-2 focus-visible:ring-lime"
              >
                View all work →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <PortfolioGrid />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Reveal>
            <p className="text-sm font-medium text-fog-dim">What partners say</p>
            <h2 className="mt-2 max-w-2xl text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
              Ask the people we&apos;ve built rooms for.
            </h2>
          </Reveal>
          <div className="mt-10 md:mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
