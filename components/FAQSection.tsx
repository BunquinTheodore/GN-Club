"use client";

import { faq } from "@/lib/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";

/**
 * Inline FAQ section — the real questions/answers render directly in the
 * page as a normal accordion people scroll to, not gated behind a button
 * and a dialog.
 */
export function FAQSection() {
  return (
    <Reveal>
      <div>
        <p className="text-sm font-medium text-fog-dim">FAQ</p>
        <h2 className="mt-2 max-w-xl text-balance font-display text-3xl leading-[1.05] tracking-tight text-fog sm:text-4xl">
          Questions we hear a lot.
        </h2>
        <div className="glass-panel relative mt-8 overflow-hidden rounded-2xl border border-glass-border px-5 sm:px-8">
          <span aria-hidden="true" className="card-shine" />
          <Accordion>
            {faq.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className={`border-glass-border ${i !== faq.length - 1 ? "border-b" : ""}`}
              >
                <AccordionTrigger className="font-display text-base tracking-tight text-fog transition-colors duration-200 hover:no-underline hover:text-lime focus-visible:text-lime sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-fog-dim leading-relaxed transition-[height] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Reveal>
  );
}
