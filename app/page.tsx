"use client";

import { Hero } from "@/components/Hero";
import { ServiceBento } from "@/components/ServiceBento";
import { AlternatingRow } from "@/components/AlternatingRow";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CTASection } from "@/components/CTASection";
import { Testimonials } from "@/components/Testimonials";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { PanelReveal } from "@/components/PanelReveal";
import { getMedia } from "@/lib/media";
import Link from "next/link";

export default function Home() {
  return (
    <HorizontalScroll>
      <Hero />

      <section className="flex h-full flex-col justify-center px-6 py-2 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="max-w-xl text-sm font-medium text-fog-dim">What we do</p>
            <h2 className="mt-2 max-w-2xl font-display text-3xl tracking-tight text-fog sm:text-4xl">
              Six disciplines, one production team, zero handoffs.
            </h2>
          </PanelReveal>
          <div className="mt-4">
            <ServiceBento />
          </div>
        </div>
      </section>

      <section className="flex h-full flex-col justify-center px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <AlternatingRow
              image={getMedia("about.team")}
              alt="GN Club production team on-site"
              eyebrow="About GN Club"
              title="Built by people who've run the room, not just the deck."
            >
              <p>
                GN Club is a Philippines-based production house working with tech and Web3 brands
                who need an event that actually moves their community — not just fills a venue.
              </p>
              <Link href="/about" className="inline-block text-lime hover:underline">
                More about GN Club
              </Link>
            </AlternatingRow>
          </PanelReveal>
        </div>
      </section>

      <HorizontalScroll.Panel width="150vw">
        <section className="flex h-full flex-col justify-center px-6 py-6 lg:px-10">
          <div className="mx-auto w-full max-w-[1600px]">
            <PanelReveal className="mb-4 flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight text-fog sm:text-4xl">Recent work</h2>
              <Link href="/work" className="text-sm text-fog-dim hover:text-lime">
                View all work
              </Link>
            </PanelReveal>
            <PortfolioGrid />
          </div>
        </section>
      </HorizontalScroll.Panel>

      <section className="flex h-full flex-col justify-center px-6 py-8 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal className="mb-6">
            <p className="text-sm font-medium text-fog-dim">What partners say</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-fog sm:text-4xl">
              Ask the people we&apos;ve built rooms for.
            </h2>
          </PanelReveal>
          <Testimonials />
        </div>
        <div className="mt-8">
          <CTASection />
        </div>
      </section>
    </HorizontalScroll>
  );
}
