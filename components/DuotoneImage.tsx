import Image from "next/image";

type DuotoneImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, e.g. "center 20%" — art-directs which part of the
   * photo survives the crop. Defaults to center. */
  position?: string;
};

/**
 * Renders any photo (stock or GN Club's own) in full, untouched color inside
 * a standard card/hero crop, so raw stock URLs never need pre-processing
 * before they land in lib/media.ts.
 *
 * Uses object-cover — the standard for card/hero photography — so every
 * tile reads as a deliberately-composed crop instead of a randomly-sized
 * letterboxed sliver. Use `position` to art-direct the crop toward the
 * actual subject when a blind center-crop loses it (e.g. a crowd whose
 * heads sit near the top of the frame).
 *
 * Always fills its nearest positioned ancestor (absolute inset-0) — the
 * caller must give that ancestor `relative` and an explicit/implicit height.
 * `className` is for extra treatment only (opacity, rounding), not position.
 */
export function DuotoneImage({ src, alt, className = "", priority, sizes, position }: DuotoneImageProps) {
  const isRemote = /^https?:\/\//.test(src);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
        style={position ? { objectPosition: position } : undefined}
        // Remote stock photos already carry Unsplash's own resize/format params
        // (?w=&q=&auto=format), and Vercel's optimization proxy re-fetching them
        // server-side is what breaks silently in production — skip it for these.
        unoptimized={isRemote}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
    </div>
  );
}
