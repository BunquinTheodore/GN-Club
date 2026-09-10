import { MagneticButton } from "./MagneticButton";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-16">
      <DuotoneImage src={getMedia("contact.backdrop")} alt=""  />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
          Have an event that needs to move a community?
        </h2>
        <p className="mt-4 text-base text-fog-dim">
          Tell us the brief — we&apos;ll tell you what it takes to pull it off.
        </p>
        <div className="mt-8 flex justify-center">
          <MagneticButton href="/contact">Start a project</MagneticButton>
        </div>
      </div>
    </section>
  );
}
