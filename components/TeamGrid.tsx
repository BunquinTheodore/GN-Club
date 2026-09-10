import { team } from "@/lib/team";
import { Reveal } from "./Reveal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Renders `initials` as a gradient avatar until real headshots are ready —
 * once photos exist, add an <AvatarImage src={member.photoUrl} /> here and
 * AvatarFallback stays as the loading/no-photo fallback automatically.
 */
export function TeamGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
      {team.map((member, i) => (
        <Reveal key={member.name} delay={(i % 3) * 0.08}>
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <Avatar className="gradient-ring-border size-16 bg-ink-raised after:hidden">
              <AvatarFallback className="font-display text-lg text-lime">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <p className="mt-3 text-sm font-medium text-fog">{member.name}</p>
            <p className="text-xs text-fog-dim">{member.role}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
