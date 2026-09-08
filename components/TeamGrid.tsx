import { team } from "@/lib/team";
import { Reveal } from "./Reveal";

/**
 * Renders `initials` as a gradient avatar until real headshots are ready —
 * swap the avatar div for a DuotoneImage/Image once photos are available.
 */
export function TeamGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {team.map((member, i) => (
        <Reveal key={member.name} delay={(i % 3) * 0.08}>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="gradient-ring-border flex h-16 w-16 items-center justify-center rounded-full bg-ink-raised">
              <span className="font-display text-lg text-lime">{member.initials}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-fog">{member.name}</p>
            <p className="text-xs text-fog-dim">{member.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
