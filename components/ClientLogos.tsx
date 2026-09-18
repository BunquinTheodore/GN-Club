"use client";

import Image from "next/image";
import { Asterisk } from "lucide-react";
import { clients } from "@/lib/clients";
import { getMedia } from "@/lib/media";

export function ClientLogos() {
  return (
    <div className="group relative overflow-hidden border-y border-glass-border py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee-x items-center gap-10">
        {[...clients, ...clients].map((client, i) => (
          <div key={`${client.name}-${i}`} className="flex flex-shrink-0 items-center gap-10">
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
              <span className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.2em] text-fog-dim transition-colors duration-300 hover:text-fog">
                {client.name}
              </span>
            )}
            <Asterisk className="h-4 w-4 shrink-0 text-lime/70" strokeWidth={2} aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
