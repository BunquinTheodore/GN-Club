import { clients } from "@/lib/clients";

/**
 * Text wordmark strip. Swap for real logo <Image>s (via lib/media.ts) once
 * GN Club has client-approved logo assets to display.
 */
export function ClientLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
      {clients.map((client) => (
        <span key={client} className="font-display text-sm tracking-wide text-fog-dim sm:text-base">
          {client}
        </span>
      ))}
    </div>
  );
}
