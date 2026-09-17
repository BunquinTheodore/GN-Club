import { stats } from "@/lib/stats";
import { Reveal } from "./Reveal";
import { CountUpValue } from "./CountUpValue";

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08}>
          <CountUpValue
            value={stat.value}
            className="gradient-ring-text font-display text-3xl tracking-tight sm:text-4xl"
          />
          <p className="mt-1 text-sm text-fog-dim">{stat.label}</p>
        </Reveal>
      ))}
    </div>
  );
}
