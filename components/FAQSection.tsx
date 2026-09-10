import { faq } from "@/lib/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FAQSection() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Accordion>
        {faq.map((item, i) => (
          <AccordionItem key={item.question} value={`item-${i}`} className="border-glass-border">
            <AccordionTrigger className="font-display text-base text-fog hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-fog-dim">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
