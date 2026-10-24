type EventPhotoPlaceholderProps = {
  /** Headline label. Defaults to the timeline's existing "Photos coming soon". */
  label?: string;
  /** Optional event tag (e.g. "Trading & Esports"), shown above the label. */
  tag?: string;
  /** Scales the type for a tile ("sm"), a dialog preview ("md"), or a
   * full-bleed backdrop ("lg"). */
  size?: "sm" | "md" | "lg";
  className?: string;
};

// "sm" tightens tracking and padding (and balances the wrap) so the label
// fits the 160px timeline thumbnail without orphaning "SOON" on its own line.
const SIZES = {
  sm: { gap: "gap-1.5", pad: "px-2", tag: "text-[10px]", label: "text-[11px] tracking-[0.14em]", note: "text-[10px]" },
  md: { gap: "gap-2", pad: "px-4", tag: "text-[11px]", label: "text-xs tracking-[0.2em] sm:text-sm", note: "text-[11px] sm:text-xs" },
  lg: { gap: "gap-3", pad: "px-4", tag: "text-xs", label: "text-sm tracking-[0.2em] sm:text-base", note: "text-xs sm:text-sm" },
} as const;

// Two soft brand glows over ink-raised, mixed from the site's own tokens so
// the empty state reads as deliberate rather than a flat grey box.
const GLOW_BACKGROUND = [
  "radial-gradient(70% 60% at 18% 12%, color-mix(in srgb, var(--cyan) 14%, transparent), transparent 70%)",
  "radial-gradient(65% 55% at 85% 90%, color-mix(in srgb, var(--lime) 12%, transparent), transparent 70%)",
].join(", ");

/**
 * Shared no-photo state for events without confirmed imagery. Visually
 * derived from the "Photos coming soon" tile in EventsTimeline, so a case
 * study with `slot: null` never falls back to `getMedia`'s hero photo.
 *
 * Like DuotoneImage, it always fills its nearest positioned ancestor
 * (absolute inset-0), so the caller supplies `relative` and a height.
 * Purely decorative: all text is aria-hidden and the event's real title
 * nearby carries the meaning. No hooks, safe to render on the server.
 */
export function EventPhotoPlaceholder({
  label = "Photos coming soon",
  tag,
  size = "md",
  className = "",
}: EventPhotoPlaceholderProps) {
  const s = SIZES[size];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden bg-ink-raised ${className}`}
      style={{ backgroundImage: GLOW_BACKGROUND }}
    >
      {/* Faint inner ring echoing the glass card edge. */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border border-glass-border/60" />
      <div className={`absolute inset-0 flex flex-col items-center justify-center text-center ${s.pad} ${s.gap}`}>
        {tag && (
          <span className={`font-medium tracking-[0.12em] text-fog-dim uppercase ${s.tag}`}>{tag}</span>
        )}
        <span className={`gradient-ring-text text-balance font-display font-semibold uppercase ${s.label}`}>
          {label}
        </span>
        <span className={`text-fog-dim ${s.note}`}>No confirmed imagery yet</span>
      </div>
    </div>
  );
}
