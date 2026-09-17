import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Services — GN Club",
  description: "Detailed breakdown of a GN Club service, from scope to process to gallery.",
};

export default function ServiceDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
