"use client";

import { useState, type FormEvent } from "react";
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

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

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
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-10 text-center">
        <p className="font-display text-2xl text-lime">Message sent.</p>
        <p className="mt-2 text-sm text-fog-dim">
          We read every inquiry personally — expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="gradient-ring-border space-y-2 rounded-xl p-px">
          <Label htmlFor="name" className="sr-only">
            Full name
          </Label>
          <Input id="name" name="name" required placeholder="Full name" className="h-auto rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 focus-visible:ring-0" />
        </div>
        <div className="gradient-ring-border space-y-2 rounded-xl p-px">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input id="email" name="email" type="email" required placeholder="Email" className="h-auto rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 focus-visible:ring-0" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="gradient-ring-border space-y-2 rounded-xl p-px">
          <Label htmlFor="phone" className="sr-only">
            Phone
          </Label>
          <Input id="phone" name="phone" placeholder="Phone (optional)" className="h-auto rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 focus-visible:ring-0" />
        </div>
        <div className="gradient-ring-border space-y-2 rounded-xl p-px">
          <Label htmlFor="company" className="sr-only">
            Company / brand
          </Label>
          <Input id="company" name="company" placeholder="Company / brand" className="h-auto rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 focus-visible:ring-0" />
        </div>
      </div>

      <div className="gradient-ring-border rounded-xl p-px">
        <Select name="service" required>
          <SelectTrigger className="h-auto w-full rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog data-placeholder:text-fog-dim/60 focus-visible:ring-0">
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

      <div className="gradient-ring-border rounded-xl p-px">
        <Textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about the event you're planning"
          className="min-h-0 resize-none rounded-xl border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 focus-visible:ring-0"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-amber">Something went wrong sending that — try again or email us directly.</p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="h-auto w-full rounded-xl bg-lime px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.01] hover:bg-lime disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
