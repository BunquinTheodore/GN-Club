"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { DuotoneImage } from "./DuotoneImage";
import { getMedia } from "@/lib/media";
import type { portfolio } from "@/lib/portfolio";
import { slotPosition } from "./portfolioSlots";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PortfolioItem = (typeof portfolio)[number];

type PortfolioDialogProps = {
  activeItem: PortfolioItem | null;
  onClose: () => void;
};

/** Case-study preview dialog. Loaded on the first card click (see PortfolioGrid), so the dialog
 * and its Base UI primitives stay out of the initial page JavaScript. */
export default function PortfolioDialog({ activeItem, onClose }: PortfolioDialogProps) {
  return (
      <Dialog
        open={activeItem !== null}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <DialogContent
          className="duration-300 ease-out sm:max-w-lg data-open:zoom-in-95 data-open:slide-in-from-bottom-2 data-closed:zoom-out-95 data-closed:slide-out-to-bottom-1"
        >
          <AnimatePresence mode="wait">
            {activeItem && (
              <m.div
                key={activeItem.slug}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-4"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <DuotoneImage
                    src={getMedia(activeItem.slot)}
                    alt={activeItem.title}
                    position={slotPosition[activeItem.slot]}
                  />
                </div>
                <DialogHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{activeItem.tag}</Badge>
                  </div>
                  <DialogTitle>{activeItem.title}</DialogTitle>
                  <DialogDescription>{activeItem.description}</DialogDescription>
                </DialogHeader>
                <Button
                  render={<Link href={`/work/${activeItem.slug}`} />}
                  className="mt-2 w-full bg-lime text-ink transition-transform duration-200 hover:scale-[1.02] hover:bg-lime sm:w-auto"
                >
                  View full case study
                </Button>
              </m.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
  );
}
