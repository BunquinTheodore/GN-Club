import { timeline } from "@/lib/timeline";
import { Reveal } from "./Reveal";

export function CompanyTimeline() {
  return (
    <div className="relative space-y-4 border-l border-glass-border pl-8">
      {timeline.map((milestone, i) => (
        <Reveal key={milestone.year} delay={i * 0.06} from="left">
          <div className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1 h-[9px] w-[9px] rounded-full bg-lime" />
            <p className="font-display text-sm text-lime">{milestone.year}</p>
            <p className="mt-0.5 text-base text-fog">{milestone.title}</p>
            <p className="mt-0.5 max-w-xl text-xs leading-snug text-fog-dim">{milestone.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
