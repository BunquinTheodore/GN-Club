import { Hero } from "@/components/Hero";
import { ServiceBento } from "@/components/ServiceBento";
import { AlternatingRow } from "@/components/AlternatingRow";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { StatsBar } from "@/components/StatsBar";
import { ClientLogos } from "@/components/ClientLogos";
import { Testimonials } from "@/components/Testimonials";
import { getMedia } from "@/lib/media";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Reveal>
          <StatsBar />
        </Reveal>
        <Reveal delay={0.1} className="mt-16 border-t border-glass-border pt-10">
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-fog-dim">
            Trusted by teams and communities like
          </p>
          <ClientLogos />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <p className="max-w-xl text-sm font-medium text-fog-dim">What we do</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl tracking-tight text-fog sm:text-4xl">
            Six disciplines, one production team, zero handoffs.
          </h2>
        </Reveal>
        <div className="mt-12">
          <ServiceBento />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <AlternatingRow image={getMedia("about.team")} alt="GN Club production team on-site" title="Built by people who've run the room, not just the deck.">
            <p>
              GN Club is a Philippines-based production house working with tech and Web3 brands
              who need an event that actually moves their community — not just fills a venue.
            </p>
            <Link href="/about" className="inline-block text-lime hover:underline">
              More about GN Club
            </Link>
          </AlternatingRow>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="mb-12 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl tracking-tight text-fog sm:text-4xl">Recent work</h2>
          <Link href="/work" className="text-sm text-fog-dim hover:text-lime">
            View all work
          </Link>
        </Reveal>
        <PortfolioGrid />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal className="mb-12">
          <p className="text-sm font-medium text-fog-dim">What partners say</p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-fog sm:text-4xl">
            Ask the people we&apos;ve built rooms for.
          </h2>
        </Reveal>
        <Testimonials />
      </section>

      <CTASection />
    </>
  );
}
