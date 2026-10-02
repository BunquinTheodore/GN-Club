import type { Metadata } from "next";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Page not found: GN Club",
};

// A custom not-found replaces Next's built-in 404 document, which injects its own white
// `body` background and black text and would cover the fixed constellation layer.
export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium text-lime">404</p>
      <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-fog sm:text-4xl">
        This page is not on the line-up.
      </h1>
      <p className="mt-3 max-w-md text-sm text-fog-dim">
        The link may be old or mistyped. Head back to the main stage.
      </p>
      <div className="mt-8">
        <MagneticButton href="/">Back to home</MagneticButton>
      </div>
    </section>
  );
}
