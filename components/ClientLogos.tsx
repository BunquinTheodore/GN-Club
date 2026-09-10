import Image from "next/image";
import { clients } from "@/lib/clients";
import { getMedia } from "@/lib/media";

export function ClientLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-80">
      {clients.map((client) =>
        client.logo ? (
          <Image
            key={client.name}
            src={getMedia(client.logo)}
            alt={client.name}
            width={120}
            height={75}
            className="h-8 w-auto object-contain sm:h-10"
          />
        ) : (
          <span key={client.name} className="font-display text-sm tracking-wide text-fog-dim sm:text-base">
            {client.name}
          </span>
        ),
      )}
    </div>
  );
}
