import { Metadata } from "next";
import { AlternatingRow } from "@/components/AlternatingRow";
import { CTASection } from "@/components/CTASection";
import { PanelReveal } from "@/components/PanelReveal";
import { CompanyTimeline } from "@/components/CompanyTimeline";
import { TeamGrid } from "@/components/TeamGrid";
import { HorizontalScroll } from "@/components/HorizontalScroll";
import { getMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "About — GN Club",
  description: "From concept to full production and execution.",
};

export default function AboutPage() {
  return (
    <HorizontalScroll>
      <section className="px-6 pt-24 pb-10 sm:pt-28 sm:pb-16 md:pt-0 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="text-sm font-medium text-fog-dim">About GN Club</p>
            <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              From concept to full production and execution.
            </h1>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-fog-dim">
              GN Club creates high-impact event activations — from 350-person conferences to
              rooftop product drops — for tech and Web3 brands in the Philippines and globally. If
              you need an event that moves your community, let&apos;s talk.
            </p>
          </PanelReveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 sm:gap-28">
          <PanelReveal>
            <AlternatingRow
              image={getMedia("about.team")}
              alt="GN Club team on-site at an activation"
              eyebrow="How we work"
              title="One team, from strategy to strike."
            >
              <p>
                We plan, build, staff, and run events ourselves — activations, concerts, trade
                shows, product launches — rather than brokering the work out. That&apos;s what
                keeps a 350-person conference and a rooftop product drop feeling like the same
                level of craft.
              </p>
            </AlternatingRow>
          </PanelReveal>

          <PanelReveal>
            <AlternatingRow
              image={getMedia("about.stage")}
              alt="Stage production for a GN Club event"
              eyebrow="Virtual production"
              title="Built for brands whose communities show up online first."
              reverse
            >
              <p>
                Most of our clients are tech and Web3 brands — audiences who expect a livestream
                as polished as the room itself. So the same team that builds the stage also runs
                the 3D virtual production behind it.
              </p>
            </AlternatingRow>
          </PanelReveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal className="mb-12 max-w-xl">
            <p className="text-sm font-medium text-fog-dim">Our story</p>
            <h2 className="mt-2 text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
              From small activations to full-scale production.
            </h2>
          </PanelReveal>
          <CompanyTimeline />
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal className="mb-12 max-w-xl">
            <p className="text-sm font-medium text-fog-dim">The team</p>
            <h2 className="mt-2 text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
              The people who show up on-site.
            </h2>
          </PanelReveal>
          <TeamGrid />
        </div>
      </section>

      <CTASection />
    </HorizontalScroll>
  );
}
