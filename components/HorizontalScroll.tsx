"use client";

import { Children, createContext, useMemo, type ReactElement, type ReactNode } from "react";

/**
 * Context that exposes the pinned, overflow-hidden "viewport" element that
 * panels used to be panned inside of during the old horizontal scroll-jack
 * layout. The site now scrolls top-to-bottom in normal document flow, so
 * this is never provided (stays null) and PanelReveal's whileInView falls
 * back to the window viewport, which works natively. Kept so PanelReveal /
 * AlternatingRow don't need a signature change.
 */
export const HorizontalScrollViewportContext =
  createContext<React.RefObject<HTMLDivElement | null> | null>(null);

type PanelProps = {
  /** No longer used now that panels stack vertically; kept for call-site compatibility. */
  width?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Per-panel wrapper. Historically controlled panel width in the horizontal
 * scroll-jack track; now every panel is simply full-width in normal
 * document flow, so this just unwraps to its children plus className.
 */
function Panel({ children }: PanelProps) {
  return <>{children}</>;
}

function isPanelElement(node: unknown): node is ReactElement<PanelProps> {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    (node as ReactElement).type === Panel
  );
}

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Plain top-to-bottom vertical stack of panels, using the browser's native
 * (smooth, per app/globals.css) scrolling. Each child - or each
 * <HorizontalScroll.Panel> wrapper - renders full-width in normal flow.
 */
export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const panels = useMemo(() => Children.toArray(children), [children]);

  return (
    <div className={`flex flex-col ${className}`}>
      {panels.map((panel, i) => {
        const content = isPanelElement(panel) ? panel.props.children : panel;
        const panelClassName = isPanelElement(panel) ? (panel.props.className ?? "") : "";
        return (
          <div key={i} className={`w-full ${panelClassName}`}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

HorizontalScroll.Panel = Panel;
