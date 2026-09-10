import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Work — GN Club",
  description: "Recent activations, launches, and productions from GN Club.",
};

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
