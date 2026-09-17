"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { clients } from "@/lib/clients";
import { getMedia } from "@/lib/media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function ClientLogos() {
  const prefersReducedMotion = useReducedMotion();
  // Autoplay must be created once and only when motion is allowed — the
  // client's motion-heavy direction wants a living, drifting marquee, but
  // reduced-motion users get a static, manually-scrollable strip instead.
  // Lazy useState (not useRef) so the stable instance can be read during
  // render without tripping the "no ref access during render" rule.
  const [autoplay] = useState(() =>
    Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  return (
    <Carousel
      opts={{ loop: true, align: "center", dragFree: true }}
      plugins={prefersReducedMotion ? [] : [autoplay]}
      className="mx-auto w-full"
    >
      <CarouselContent className="items-center">
        {clients.map((client) => (
          <CarouselItem
            key={client.name}
            className="basis-1/2 pl-8 sm:basis-1/3 md:basis-1/5"
          >
            <div className="flex h-12 items-center justify-center">
              {client.logo ? (
                <Image
                  src={getMedia(client.logo)}
                  alt={client.name}
                  width={120}
                  height={75}
                  // Taller than before, and no dimming — GN Media's logo in
                  // particular is easy to mistake for GN Club's own mark at
                  // a glance (near-identical "gn" wordmark, gradient border;
                  // only the small "MEDIA" vs "CLUB" caption differs), so it
                  // needs to render legibly rather than as a faint icon.
                  className="h-9 w-auto object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-11"
                />
              ) : (
                <span className="font-display text-sm tracking-wide text-fog-dim transition-colors duration-300 hover:text-fog sm:text-base">
                  {client.name}
                </span>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
