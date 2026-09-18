"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { toast } from "sonner";
import { Check, Loader2, X } from "lucide-react";
import { services } from "@/lib/services";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Single-accent focus treatment (lime), used consistently across every
// field — swapped in for the old per-field cyan/lime/amber gradient ring,
// which read as busy with six fields glowing rainbow on the same form.
const fieldClassName =
  "h-auto rounded-xl border-glass-border bg-ink-raised/70 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 transition-colors focus-visible:border-lime/60 focus-visible:ring-2 focus-visible:ring-lime/25";

// Wraps each field to give it a subtle scale + lift on focus, using the same
// accent as the existing focus ring. The shadow carries a real vertical
// offset + blur (not a zero-offset halo) so focus reads as elevation, not
// just a glow — consistent with how the submit button elevates below.
const fieldWrapClassName =
  "rounded-xl transition-[transform,box-shadow] duration-300 ease-out focus-within:scale-[1.015] focus-within:shadow-[0_0_0_1px_rgba(198,242,78,0.35),0_10px_24px_-12px_rgba(198,242,78,0.45)]";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const reducedMotion = useReducedMotion();
  const submitting = status === "submitting";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
      toast.success("Message sent.", {
        description: "We read every inquiry personally. Expect a reply within one business day.",
      });
      setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("error");
      toast.error("Something went wrong sending that.", {
        description: "Try again, or email us directly.",
      });
      setTimeout(() => setStatus("idle"), 2200);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className={`space-y-2 ${fieldWrapClassName}`}>
          <Label htmlFor="name" className="sr-only">
            Full name
          </Label>
          <Input id="name" name="name" required placeholder="Full name" className={fieldClassName} />
        </div>
        <div className={`space-y-2 ${fieldWrapClassName}`}>
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="Email" className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className={`space-y-2 ${fieldWrapClassName}`}>
          <Label htmlFor="phone" className="sr-only">
            Phone
          </Label>
          <Input id="phone" name="phone" placeholder="Phone (optional)" className={fieldClassName} />
        </div>
        <div className={`space-y-2 ${fieldWrapClassName}`}>
          <Label htmlFor="company" className="sr-only">
            Company / brand
          </Label>
          <Input
            id="company"
            name="company"
            placeholder="Company / brand (optional)"
            className={fieldClassName}
          />
        </div>
      </div>

      <div className={fieldWrapClassName}>
        <Select name="service" required>
          <SelectTrigger className={`w-full data-placeholder:text-fog-dim/60 ${fieldClassName}`}>
            <SelectValue placeholder="What do you need help with?" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.slug} value={s.title}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={`mt-2 ${fieldWrapClassName}`}>
        <Textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about the event you're planning: dates, scale, goals"
          className={`min-h-0 resize-none ${fieldClassName}`}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting || status === "success"}
        aria-busy={submitting}
        className={`relative h-auto w-full overflow-hidden rounded-xl bg-lime px-6 py-3 text-sm font-medium text-ink transition-[filter,box-shadow,transform] hover:scale-[1.01] hover:bg-lime hover:brightness-110 hover:shadow-[0_14px_32px_-10px_rgba(198,242,78,0.5)] active:scale-[0.98] active:shadow-none disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none sm:w-auto ${
          submitting ? "opacity-70" : "disabled:opacity-90"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2"
            >
              <Check className="h-4 w-4" />
              Sent
            </motion.span>
          ) : status === "error" ? (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2"
            >
              <X className="h-4 w-4" />
              Couldn&apos;t send. Try again
            </motion.span>
          ) : submitting ? (
            <motion.span
              key="submitting"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-2"
            >
              <Loader2 className={`h-4 w-4 ${reducedMotion ? "" : "animate-spin"}`} />
              Sending…
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Send message
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <p className="text-center text-xs text-fog-dim sm:text-left">
        We read every inquiry personally. Expect a reply within one business day.
      </p>
    </form>
  );
}
