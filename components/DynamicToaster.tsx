"use client";

import dynamic from "next/dynamic";

// Sonner's toast UI is only ever invoked from ContactForm — dynamically
// import it so its bundle (and the lucide icons it pulls in) isn't part of
// every route's initial JS, including the homepage. `ssr: false` requires a
// Client Component boundary, hence this wrapper around the Server Component
// root layout.
export const DynamicToaster = dynamic(() => import("@/components/ui/sonner").then((m) => m.Toaster), {
  ssr: false,
});
