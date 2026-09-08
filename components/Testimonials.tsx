import { testimonials } from "@/lib/testimonials";
import { GlassPanel } from "./GlassPanel";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08}>
          <GlassPanel className="flex h-full flex-col p-6">
            <p className="text-sm leading-relaxed text-fog">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6">
              <p className="text-sm font-medium text-fog">{t.name}</p>
              <p className="text-xs text-fog-dim">{t.role}</p>
            </div>
          </GlassPanel>
        </Reveal>
      ))}
    </div>
  );
}
