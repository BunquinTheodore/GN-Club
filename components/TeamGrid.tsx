"use client";

import { motion, useReducedMotion } from "framer-motion";
import { team } from "@/lib/team";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

/**
 * Renders `initials` as a gradient avatar until real headshots are ready —
 * once photos exist, add an <AvatarImage src={member.photoUrl} /> here and
 * AvatarFallback stays as the loading/no-photo fallback automatically.
 */

// Short one-line bios for the hover/focus reveal — placeholders alongside
// the placeholder roster in lib/team.ts; swap in real bios as they land.
const bios: Record<string, string> = {
  "Gab Navarro": "Started GN Club running one-room launches; now runs the whole slate end to end.",
  "Lex Aquino": "Keeps every production on schedule, on budget, and calm under pressure.",
  "Rian Mercado": "The person behind the livestream, the AV rig, and the hybrid-event stack.",
  "Dani Ocampo": "First call for new clients — scopes the work and keeps the relationship honest.",
  "Kai Villaruel": "Sets the visual language for every event, from stage design to signage.",
  "Sam Bautista": "Moves the trucks, the crew, and the gear — nothing starts without this list.",
};

export function TeamGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
      {team.map((member, i) => (
        // Local reveal instead of the shared <Reveal> wrapper: the team
        // roster is core About-page content, so each card rests at a
        // visible-but-unsettled opacity instead of fully invisible, so it
        // still reads without a live scroll trigger (slow JS, print, a
        // capture tool, an anchor/landmark jump).
        <motion.div
          key={member.name}
          initial={reduceMotion ? false : { opacity: 0.5, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <HoverCard>
            <HoverCardTrigger
              delay={120}
              closeDelay={80}
              render={
                <button
                  type="button"
                  className="group flex w-full flex-col items-center rounded-xl text-center transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:items-start sm:text-left"
                />
              }
            >
              <Avatar className="gradient-ring-border size-16 bg-ink-raised transition-transform duration-300 after:hidden group-hover:scale-105 group-focus-visible:scale-105">
                <AvatarFallback className="font-display text-lg text-lime">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <p className="mt-3 text-sm font-medium text-fog">{member.name}</p>
              <p className="text-xs text-fog-dim">{member.role}</p>
            </HoverCardTrigger>
            <HoverCardContent
              className="glass-panel w-64 rounded-2xl border border-glass-border bg-ink-raised/90 p-4 text-fog ring-0 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]"
              sideOffset={10}
            >
              <p className="font-display text-sm tracking-tight text-fog">{member.name}</p>
              <p className="mt-0.5 text-xs text-lime">{member.role}</p>
              <p className="mt-2 text-xs leading-relaxed text-fog-dim">
                {bios[member.name] ?? "More on this GN Club team member soon."}
              </p>
            </HoverCardContent>
          </HoverCard>
        </motion.div>
      ))}
    </div>
  );
}
