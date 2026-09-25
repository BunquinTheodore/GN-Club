"use client";

import { testimonials } from "@/lib/testimonials";
import { QuoteCard } from "./Testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Split out of Testimonials.tsx so embla-carousel can be dynamically
// imported (this component is only ever mounted on md:hidden viewports).
export function TestimonialCarousel({ testimonials: items }: { testimonials: typeof testimonials }) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="w-full">
      <CarouselContent>
        {items.map((t, i) => (
          <CarouselItem key={t.name} className="basis-[88%]">
            <QuoteCard t={t} index={i} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-6 flex justify-center gap-3">
        <CarouselPrevious className="static h-10 w-10 translate-x-0 translate-y-0" />
        <CarouselNext className="static h-10 w-10 translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
}
