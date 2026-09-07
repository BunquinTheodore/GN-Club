"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-glass-border bg-white/5 px-4 py-3 text-sm text-fog placeholder:text-fog-dim/60 outline-none transition-colors focus:border-lime/60";

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
        <div className="gradient-ring-border rounded-xl">
          <input name="name" required placeholder="Full name" className={inputClasses} />
        </div>
        <div className="gradient-ring-border rounded-xl">
          <input name="email" type="email" required placeholder="Email" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="gradient-ring-border rounded-xl">
          <input name="phone" placeholder="Phone (optional)" className={inputClasses} />
        </div>
        <div className="gradient-ring-border rounded-xl">
          <input name="company" placeholder="Company / brand" className={inputClasses} />
        </div>
      </div>

      <div className="gradient-ring-border rounded-xl">
        <select name="service" required defaultValue="" className={`${inputClasses} appearance-none`}>
          <option value="" disabled>
            What do you need help with?
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-ink">
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="gradient-ring-border rounded-xl">
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about the event you're planning"
          className={`${inputClasses} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-amber">Something went wrong sending that — try again or email us directly.</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-lime px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.01] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
