import { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { DuotoneImage } from "@/components/DuotoneImage";
import { Reveal } from "@/components/Reveal";
import { getMedia } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — GN Club",
  description: "Tell GN Club about the event you're planning.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-40">
      <DuotoneImage src={getMedia("contact.backdrop")} alt="" className="opacity-60" />

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-sm font-medium text-fog-dim">Let&apos;s talk</p>
            <h1 className="mt-2 font-display text-4xl tracking-tight text-fog sm:text-5xl">
              Tell us about the event.
            </h1>
            <p className="mt-4 text-sm text-fog-dim">
              Reach us directly at{" "}
              <a href={`mailto:${site.contact.email}`} className="text-lime hover:underline">
                {site.contact.email}
              </a>{" "}
              or {site.contact.phone}.
            </p>
          </div>

          <div className="glass-panel gradient-ring-border rounded-3xl p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
