"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ClientLogos } from "./ClientLogos";
import { site } from "@/lib/site";
import { stats } from "@/lib/stats";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const panelX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), { stiffness: 60, damping: 20 });
  const panelY = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative flex h-full min-h-screen items-end overflow-hidden pb-24 pt-32 md:min-h-0"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-ink"
      >
        <Image
          src="/hero-cover.png"
          alt="GN Club activation crew on-site"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/25" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <motion.div
          style={{ x: panelX, y: panelY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-xl"
        >
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_30%_30%,rgba(51,199,224,0.25),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(242,184,78,0.2),transparent_60%)] blur-2xl"
          />
          <div className="glass-panel gradient-ring-border rounded-3xl px-8 py-10">
            <p className="text-sm font-medium text-fog-dim">{site.tagline}</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-fog sm:text-5xl">
              We build the events tech and Web3 brands are remembered for.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-fog-dim">{site.bio}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact">Start a project</MagneticButton>
              <MagneticButton href="/work" variant="outline">
                See our work
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex max-w-3xl flex-wrap items-center gap-x-8 gap-y-4 border-t border-glass-border/60 pt-6"
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog-dim">
            {stats.map((stat) => (
              <span key={stat.label}>
                <span className="font-display text-fog">{stat.value}</span> {stat.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6 opacity-70">
            <ClientLogos />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
