import Image from "next/image";

type DuotoneImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Grades any stock photo into GN Club's cool monochrome look (matches the
 * real Facebook cover art) via CSS filter + a blend-mode tint, so raw stock
 * URLs never need pre-processing before they land in lib/media.ts.
 *
 * Always fills its nearest positioned ancestor (absolute inset-0) — the
 * caller must give that ancestor `relative` and an explicit/implicit height.
 * `className` is for extra treatment only (opacity, rounding), not position.
 */
export function DuotoneImage({ src, alt, className = "", priority, sizes }: DuotoneImageProps) {
  const isRemote = /^https?:\/\//.test(src);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
        // Remote stock photos already carry Unsplash's own resize/format params
        // (?w=&q=&auto=format), and Vercel's optimization proxy re-fetching them
        // server-side is what breaks silently in production — skip it for these.
        unoptimized={isRemote}
        className="object-cover grayscale contrast-110 brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan/25 via-transparent to-ink/60 mix-blend-color" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
    </div>
  );
}
