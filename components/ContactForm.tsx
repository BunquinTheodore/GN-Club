"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
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
  "h-auto rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 transition-colors focus-visible:border-lime/60 focus-visible:ring-2 focus-visible:ring-lime/25";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

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
      toast.success("Message sent.", {
        description: "We read every inquiry personally — expect a reply within one business day.",
      });
    } catch {
      toast.error("Something went wrong sending that.", {
        description: "Try again, or email us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="sr-only">
            Full name
          </Label>
          <Input id="name" name="name" required placeholder="Full name" className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="Email" className={fieldClassName} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone" className="sr-only">
            Phone
          </Label>
          <Input id="phone" name="phone" placeholder="Phone (optional)" className={fieldClassName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="sr-only">
            Company / brand
          </Label>
          <Input id="company" name="company" placeholder="Company / brand" className={fieldClassName} />
        </div>
      </div>

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

      <Textarea
        name="message"
        required
        rows={5}
        placeholder="Tell us about the event you're planning"
        className={`min-h-0 resize-none ${fieldClassName}`}
      />

      <Button
        type="submit"
        disabled={submitting}
        className="h-auto w-full rounded-xl bg-lime px-6 py-3 text-sm font-medium text-ink transition-[filter,box-shadow,transform] hover:scale-[1.01] hover:bg-lime hover:brightness-110 hover:shadow-[0_0_28px_rgba(198,242,78,0.45)] disabled:opacity-60 disabled:hover:scale-100 disabled:hover:shadow-none sm:w-auto"
      >
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
