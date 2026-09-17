"use client";

import { testimonials } from "@/lib/testimonials";
import { GlassPanel } from "./GlassPanel";
import { Reveal } from "./Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function QuoteCard({ t, index = 0 }: { t: (typeof testimonials)[number]; index?: number }) {
  return (
    <GlassPanel
      shineDelay={(index % 5) * 0.6}
      className="flex h-full flex-col p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]"
    >
      <p className="max-w-[60ch] text-sm leading-relaxed text-fog">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6">
        <p className="text-sm font-medium text-fog">{t.name}</p>
        <p className="text-xs text-fog-dim">{t.role}</p>
      </div>
    </GlassPanel>
  );
}

export function Testimonials() {
  return (
    <>
      {/* Narrow viewports: a swipeable carousel — three columns don't fit,
          and this reads as a deliberate, premium touch rather than cramped
          stacked cards. */}
      <div className="md:hidden">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem key={t.name} className="basis-[88%]">
                <QuoteCard t={t} index={i} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-3">
            <CarouselPrevious className="static translate-x-0 translate-y-0" />
            <CarouselNext className="static translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>

      {/* md+: a continuous left-to-right marquee instead of a static grid.
          The track's content is duplicated once so translating -50% loops
          seamlessly; a mask fades the edges so cards don't hard-cut. */}
      <Reveal className="hidden md:block">
        <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex w-max animate-marquee-x gap-6">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={`${t.name}-${i}`} className="w-[380px] flex-shrink-0">
                <QuoteCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </>
  );
}
