import { PortfolioGrid } from "@/components/PortfolioGrid";
import { PanelReveal } from "@/components/PanelReveal";
import { EventsTimeline } from "@/components/EventsTimeline";

export default function WorkPage() {
  return (
    <div className="flex flex-col pb-16 sm:pb-20 md:pb-24">
      <section className="px-6 pt-24 pb-10 sm:pt-28 sm:pb-16 md:pt-0 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <PanelReveal>
            <p className="text-sm font-medium text-fog-dim">Selected work</p>
            <h1 className="mt-2 max-w-2xl text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              A few rooms we&apos;ve built.
            </h1>
          </PanelReveal>
        </div>
      </section>

      <div className="mx-auto mt-10 w-full max-w-7xl px-6 md:mt-16 lg:px-10">
        <PortfolioGrid priorityCount={3} />
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl px-6 sm:mt-20 md:mt-28 lg:px-10">
        <EventsTimeline />
      </div>
    </div>
  );
}
