import { Metadata } from "next";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/ContactForm";
import { DuotoneImage } from "@/components/DuotoneImage";
import { GlassPanel } from "@/components/GlassPanel";
import { PanelReveal } from "@/components/PanelReveal";
import { ScrollJackTrack, type ScrollJackPanel } from "@/components/ScrollJackTrack";
import { getMedia } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact: GN Club",
  description: "Tell GN Club about the event you're planning.",
};

const steps = [
  { step: "01", label: "Discovery call", detail: "We talk scope, dates, and goals." },
  { step: "02", label: "Proposal", detail: "You get a clear plan, timeline, and quote." },
  { step: "03", label: "Production", detail: "We build and run the event, start to finish." },
];

export default function ContactPage() {
  const panels: ScrollJackPanel[] = [
    {
      label: "Contact",
      content: (
        <section className="relative flex h-full flex-col justify-center overflow-hidden px-6 py-14 sm:py-16 lg:px-10">
          <DuotoneImage src={getMedia("contact.backdrop")} alt="" className="opacity-30" priority sizes="100vw" />

          <div className="relative mx-auto w-full max-w-7xl">
            <PanelReveal>
              <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-start md:gap-16 lg:gap-24">
                <div className="text-center md:text-left">
                  <p className="text-sm font-medium text-fog-dim">Let&apos;s talk</p>
                  <h1 className="mt-2 text-balance font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl lg:text-6xl">
                    Tell us about the event.
                  </h1>
                  <p className="mt-4 text-sm text-fog-dim lg:text-base">
                    Reach us directly at{" "}
                    <a href={`mailto:${site.contact.email}`} className="text-lime hover:underline">
                      {site.contact.email}
                    </a>
                    , or through the form. We reply personally within one business day.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-fog-dim md:justify-start">
                    <span>Prefer social?</span>
                    {site.socials.map((social, i) => (
                      <span key={social.href}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-fog hover:text-lime"
                        >
                          {social.label}
                        </a>
                        {i < site.socials.length - 1 ? <span className="text-fog-dim/60">,</span> : null}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 hidden gap-3 md:grid">
                    {steps.map((s, i) => (
                      <div
                        key={s.step}
                        className="glass-panel relative flex items-center gap-3 overflow-hidden rounded-lg px-4 py-3"
                      >
                        <p className="font-display text-xs text-lime">{s.step}</p>
                        <p className="font-display text-xs text-fog">{s.label}</p>
                        <p className="text-xs text-fog-dim">{s.detail}</p>
                        <span
                          aria-hidden="true"
                          className="card-shine"
                          style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <GlassPanel className="p-8 sm:p-10 lg:p-12">
                  <ContactForm />
                </GlassPanel>

                <div className="grid gap-4 sm:grid-cols-3 md:hidden">
                  {steps.map((s, i) => (
                    <div key={s.step} className="glass-panel relative overflow-hidden rounded-xl p-5">
                      <p className="font-display text-sm text-lime">{s.step}</p>
                      <p className="mt-2 font-display text-base text-fog">{s.label}</p>
                      <p className="mt-1 text-sm text-fog-dim">{s.detail}</p>
                      <span
                        aria-hidden="true"
                        className="card-shine"
                        style={{ "--shine-delay": `${(i % 5) * 0.6}s` } as CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </PanelReveal>
          </div>
        </section>
      ),
    },
  ];

  return <ScrollJackTrack panels={panels} />;
}
