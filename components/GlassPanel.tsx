import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export function GlassPanel({ children, className = "", as = "div" }: GlassPanelProps) {
  const Tag = as;
  return (
    <Tag
      className={`glass-panel gradient-ring-border rounded-2xl ${className}`}
    >
      {children}
    </Tag>
  );
}
