"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";
import { DuotoneImage } from "@/components/DuotoneImage";
import { EventPhotoPlaceholder } from "@/components/EventPhotoPlaceholder";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { events, type TimelineEvent } from "@/lib/events";
import { getMedia } from "@/lib/media";

type YearGroup = { label: string; items: TimelineEvent[] };

/** Heading for entries with no `isoDate` (e.g. Join Mazal, an ongoing
 * program). `events` already sorts these last, so this group always closes
 * the list. */
const UNDATED_LABEL = "Ongoing";

// `events` is already ordered newest first, so consecutive runs of the same
// year become one group. Built once at module load since the data is static.
const groups = events.reduce<YearGroup[]>((acc, event) => {
  const label = event.isoDate ? event.isoDate.slice(0, 4) : UNDATED_LABEL;
  const last = acc[acc.length - 1];
  return last && last.label === label
    ? [...acc.slice(0, -1), { ...last, items: [...last.items, event] }]
    : [...acc, { label, items: [event] }];
}, []);

/**
 * Events timeline for /work: every real GN Club event, newest first and
 * grouped by year, distinct from the full case-study grid above it. Reuses
 * `GlassPanel` for every card surface (no bespoke glass treatment) and
 * `Reveal` for entrance motion, matching the rest of the site.
 *
 * Cards sit in a two-column grid from xl up so ~20 entries read as a
 * scannable spread rather than one tall stack. Events without a confirmed
 * date render "Date TBC" instead of a fabricated one, and events without a
 * real photo get the shared `EventPhotoPlaceholder` instead of a stock
 * photo, so nothing on this list pretends to be documented that isn't.
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
          Every tournament, campus talk, meetup, and launch GN Club has run, newest first. Dates and write-ups fill in as they&apos;re confirmed. Nothing here is guessed.
        </p>
      </Reveal>

      <div className="mt-8 flex flex-col gap-10 md:mt-10 md:gap-12">
        {groups.map((group) => (
          <YearSection key={group.label} group={group} />
        ))}
      </div>
    </section>
  );
}

function YearSection({ group }: { group: YearGroup }) {
  const headingId = `events-year-${group.label.toLowerCase()}`;
  const count = group.items.length;

  return (
    <section aria-labelledby={headingId}>
      <Reveal>
        <div className="flex items-center gap-4">
          <h3 id={headingId} className="gradient-ring-text font-display text-xl tracking-tight sm:text-2xl">
            {group.label}
          </h3>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-fog-dim">
            {count} {count === 1 ? "event" : "events"}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-glass-border" />
        </div>
      </Reveal>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {group.items.map((event, i) => (
          // Delay cycles across the two columns so it never grows with index.
          <Reveal key={event.slug ?? event.title} delay={(i % 2) * 0.06} className="h-full">
            <TimelineCard event={event} shineDelay={(i % 5) * 0.6} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TimelineCard({ event, shineDelay }: { event: TimelineEvent; shineDelay: number }) {
  const hasCaseStudy = event.status === "confirmed" && event.slug;
  const dateLabel = event.date === "TODO" ? "Date TBC" : event.date;

  const card = (
    <GlassPanel
      shineDelay={shineDelay}
      className={`flex h-full flex-col gap-4 p-4 transition-[border-color,box-shadow] duration-300 sm:flex-row sm:items-start sm:gap-5 sm:p-5 ${
        hasCaseStudy ? "hover:border-lime/30 hover:shadow-[0_16px_40px_-16px_rgba(198,242,78,0.35)]" : ""
      }`}
    >
      {/* Below sm the frame is full width, so a photo-less event would open with a large empty
          placeholder; it is hidden there and the tag/date badge row leads the card instead. */}
      <div
        className={`relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-glass-border sm:aspect-[4/3] sm:w-40 lg:w-48 xl:w-40 ${
          event.slot ? "" : "hidden sm:block"
        }`}
      >
        {/* Scaled independently of the frame so the border/radius stays crisp */}
        <div
          className={`absolute inset-0 ${
            hasCaseStudy ? "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]" : ""
          }`}
        >
          {event.slot ? (
            <DuotoneImage
              src={getMedia(event.slot)}
              alt={event.title}
              sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 100vw"
            />
          ) : (
            <EventPhotoPlaceholder size="sm" />
          )}
        </div>
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
        <h4 className="mt-2 font-display text-lg tracking-tight text-fog sm:text-xl">{event.title}</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-fog-dim">{event.summary}</p>

        {hasCaseStudy && (
          <span className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-medium text-lime transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            View full case study
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        )}
      </div>
    </GlassPanel>
  );

  if (!hasCaseStudy) return card;

  return (
    <Link
      href={`/work/${event.slug}`}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-lime"
      aria-label={`View ${event.title} case study`}
    >
      {card}
    </Link>
  );
}
