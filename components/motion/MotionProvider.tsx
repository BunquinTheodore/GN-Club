"use client";

import type { ReactNode } from "react";
import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * Wraps the app once in the root layout. Components use the lightweight `m` component and the
 * animation features arrive in a separate chunk after hydration instead of inside the main bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
