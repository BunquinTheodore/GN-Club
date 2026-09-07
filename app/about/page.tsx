import { Metadata } from "next";
import { AlternatingRow } from "@/components/AlternatingRow";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { getMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "About — GN Club",
  description: "From concept to full production and execution.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-40 lg:px-10">
        <Reveal>
          <p className="text-sm font-medium text-fog-dim">About GN Club</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl tracking-tight text-fog sm:text-5xl">
            From concept to full production and execution.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fog-dim">
            GN Club creates high-impact event activations for tech and Web3 brands in the
            Philippines and globally. If you need an event that moves your community, let's talk.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl space-y-28 px-6 py-16 lg:px-10">
        <Reveal>
          <AlternatingRow
            image={getMedia("about.team")}
            alt="GN Club team on-site at an activation"
            title="One team, from strategy to strike."
          >
            <p>
              We plan, build, staff, and run events ourselves — activations, concerts, trade
              shows, product launches — rather than brokering the work out. That's what keeps a
              350-person conference and a rooftop product drop feeling like the same level of
              craft.
            </p>
          </AlternatingRow>
        </Reveal>

        <Reveal>
          <AlternatingRow
            image={getMedia("about.stage")}
            alt="Stage production for a GN Club event"
            title="Built for brands whose communities show up online first."
            reverse
          >
            <p>
              Most of our clients are tech and Web3 brands — audiences who expect a livestream as
              polished as the room itself. So the same team that builds the stage also runs the
              3D virtual production behind it.
            </p>
          </AlternatingRow>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
