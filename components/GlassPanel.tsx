import { type CSSProperties, type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  /** Stagger offset (seconds) for the continuous shine sweep, so cards in
   * the same grid/row don't sweep in unison. Defaults to 0 for standalone
   * panels. */
  shineDelay?: number;
};

export function GlassPanel({ children, className = "", as = "div", shineDelay = 0 }: GlassPanelProps) {
  const Tag = as;
  return (
    <Tag
      className={`glass-panel gradient-ring-border relative overflow-hidden rounded-2xl ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="card-shine"
        style={{ "--shine-delay": `${shineDelay}s` } as CSSProperties}
      />
    </Tag>
  );
}
