"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";
import { DuotoneImage } from "@/components/DuotoneImage";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { events } from "@/lib/events";
import { getMedia } from "@/lib/media";

/**
 * Events timeline for /work: a chronological-feeling list of GN Club's real
 * events, distinct from the full case-study grid above it. Reuses
 * `GlassPanel` for every card surface (no bespoke glass treatment) and
 * `Reveal` for entrance motion, matching the rest of the site.
 *
 * Events without a confirmed date render "Date TBC" instead of a fabricated
 * one. Events without a real photo yet (currently just CJC Race Soft
 * Launch) get a styled gradient placeholder instead of a stock photo, so
 * nothing on this list pretends to be documented that isn't.
 */
export function EventsTimeline() {
  return (
    <section aria-labelledby="events-timeline-heading">
      <Reveal>
        <p className="text-sm font-medium text-fog-dim">Event by event</p>
        <h2
          id="events-timeline-heading"
          className="mt-2 max-w-2xl text-balance font-display text-2xl leading-[1.1] tracking-tight text-fog sm:text-3xl"
        >
          The events behind the case studies.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-fog-dim">
          A running list of the real activations, launches, and campaigns GN Club has produced. Dates and write-ups fill in as they&apos;re confirmed, nothing here is guessed.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-4 md:mt-10">
        {events.map((event, i) => {
          const hasCaseStudy = event.status === "confirmed" && event.slug;
          const dateLabel = event.date === "TODO" ? "Date TBC" : event.date;

          const card = (
            <GlassPanel
              shineDelay={(i % 5) * 0.6}
              className={`gap-4 p-4 transition-[border-color,box-shadow] duration-300 sm:p-5 md:flex-row md:items-center md:gap-6 ${
                hasCaseStudy ? "hover:border-lime/30 hover:shadow-[0_16px_40px_-16px_rgba(198,242,78,0.35)]" : ""
              } flex flex-col`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border border-glass-border sm:aspect-video md:aspect-[4/3] md:w-56">
                {event.slot ? (
                  <DuotoneImage
                    src={getMedia(event.slot)}
                    alt={event.title}
                    sizes="(min-width: 768px) 224px, 100vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-ink-raised px-4 text-center">
                    <span
                      aria-hidden="true"
                      className="gradient-ring-text font-display text-xs font-semibold tracking-[0.2em] uppercase"
                    >
                      Photos coming soon
                    </span>
                    <span className="text-[11px] text-fog-dim">No confirmed imagery yet</span>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{event.tag}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-fog-dim">
                    <CalendarClock className="h-3.5 w-3.5" strokeWidth={2} />
                    {dateLabel}
                  </span>
                  {event.status === "todo" && (
                    <Badge className="border-amber/40 bg-amber/10 text-amber">Write up pending</Badge>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg tracking-tight text-fog sm:text-xl">{event.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fog-dim sm:text-base">{event.summary}</p>

                {hasCaseStudy && (
                  <span className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-lime transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    View full case study
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                )}
              </div>
            </GlassPanel>
          );

          return (
            <Reveal key={event.title} delay={(i % 4) * 0.06}>
              {hasCaseStudy ? (
                <Link
                  href={`/work/${event.slug}`}
                  className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-lime"
                  aria-label={`View ${event.title} case study`}
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
