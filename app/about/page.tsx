import { Metadata } from "next";
import { AlternatingRow } from "@/components/AlternatingRow";
import { CTASection } from "@/components/CTASection";
import { PanelReveal } from "@/components/PanelReveal";
import { CompanyTimeline } from "@/components/CompanyTimeline";
import { TeamGrid } from "@/components/TeamGrid";
import { DuotoneImage } from "@/components/DuotoneImage";
import { ScrollJackTrack, type ScrollJackPanel } from "@/components/ScrollJackTrack";
import { getMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "About: GN Club",
  description: "From concept to full production and execution.",
};

export default function AboutPage() {
  // Split across two ScrollJackTrack instances rather than one: the "Our
  // story" timeline below is a naturally tall vertical list (5 milestones)
  // with its own scroll-linked line-fill animation driven by the timeline's
  // own position in the page, which depends on ordinary vertical scroll
  // progress — not a fit for a single pinned/panned panel. It stays a plain
  // vertical section between the two tracks, preserving the original
  // reading order (intro -> story -> team -> CTA).
  const introPanels: ScrollJackPanel[] = [
    {
      // Full-bleed background photo wash (same pattern as
      // ServiceDetailPanels' "Overview" hero) instead of a left-aligned text
      // block floating in empty space — the real Facebook cover photo
      // ("hero.cover") is distinct from the "about.team"/"about.stage" shots
      // used lower on the page, so it doesn't repeat imagery.
      label: "About GN Club",
      content: (
        <section className="relative flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <DuotoneImage src={getMedia("hero.cover")} alt="" className="opacity-30" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
          <div className="relative mx-auto w-full max-w-7xl">
            <PanelReveal>
              <p className="text-sm font-medium text-fog-dim">About GN Club</p>
              <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-6xl">
                From concept to full production and execution.
              </h1>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-fog-dim">
                GN Club creates high impact event activations, from 350 person conferences to
                rooftop product drops, for tech and Web3 brands in the Philippines and globally.
                If you need an event that moves your community, let&apos;s talk.
              </p>
            </PanelReveal>
          </div>
        </section>
      ),
    },
    {
      label: "How we work",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <PanelReveal>
              <AlternatingRow
                image={getMedia("about.team")}
                alt="GN Club team on site at an activation"
                eyebrow="How we work"
                title="One team, from strategy to strike."
              >
                <p>
                  We plan, build, staff, and run events ourselves: activations, concerts, trade
                  shows, product launches, rather than brokering the work out. That&apos;s what
                  keeps a 350 person conference and a rooftop product drop feeling like the same
                  level of craft.
                </p>
              </AlternatingRow>
            </PanelReveal>
          </div>
        </section>
      ),
    },
    {
      label: "Virtual production",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <PanelReveal>
              <AlternatingRow
                image={getMedia("about.stage")}
                alt="Stage production for a GN Club event"
                eyebrow="Virtual production"
                title="Built for brands whose communities show up online first."
                reverse
              >
                <p>
                  Most of our clients are tech and Web3 brands, audiences who expect a livestream
                  as polished as the room itself. So the same team that builds the stage also runs
                  the 3D virtual production behind it.
                </p>
              </AlternatingRow>
            </PanelReveal>
          </div>
        </section>
      ),
    },
  ];

  const closingPanels: ScrollJackPanel[] = [
    {
      label: "The team",
      content: (
        <section className="flex h-full flex-col justify-center px-6 py-14 sm:py-16 lg:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <PanelReveal className="mb-10 max-w-xl">
              <p className="text-sm font-medium text-fog-dim">The team</p>
              <h2 className="mt-2 text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
                The people who show up on site.
              </h2>
            </PanelReveal>
            <TeamGrid />
          </div>
        </section>
      ),
    },
    {
      label: "Get in touch",
      content: (
        <div className="flex h-full items-center">
          <CTASection />
        </div>
      ),
    },
  ];

  return (
    <>
      <ScrollJackTrack panels={introPanels} />

      <section className="px-6 py-20 sm:py-28 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal className="mb-12 max-w-xl">
            <p className="text-sm font-medium text-fog-dim">Our story</p>
            <h2 className="mt-2 text-balance font-display text-3xl tracking-tight text-fog sm:text-4xl">
              From small activations to full scale production.
            </h2>
          </PanelReveal>
          <CompanyTimeline />
        </div>
      </section>

      <ScrollJackTrack panels={closingPanels} />
    </>
  );
}
