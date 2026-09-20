import { DuotoneImage } from "@/components/DuotoneImage";

type PersistentPanelBackgroundProps = {
  src: string;
  alt: string;
  /** CSS object-position passthrough — see DuotoneImage. */
  position?: string;
};

/**
 * The single hero photo for a /work/[slug] or /services/[slug] detail page,
 * rendered once as the `background` passed to <ScrollJackTrack> so it sits
 * behind every panel at one consistent, moderate opacity as the track pans
 * — matching the treatment the Overview panel used to have on its own.
 *
 * Individual panels no longer render their own copy of this image at
 * different (fading) opacities; they layer their own scrim (e.g. bg-ink/NN)
 * on top of this shared background instead, so text legibility can still
 * vary per panel without the underlying photo disappearing.
 */
export function PersistentPanelBackground({ src, alt, position }: PersistentPanelBackgroundProps) {
  return (
    <DuotoneImage
      src={src}
      alt={alt}
      className="opacity-30"
      position={position}
      priority
      sizes="100vw"
    />
  );
}
