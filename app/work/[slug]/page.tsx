import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { portfolio, getCaseStudy } from "@/lib/portfolio";
import { getMedia } from "@/lib/media";
import { DuotoneImage } from "@/components/DuotoneImage";
import { GlassPanel } from "@/components/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} — GN Club`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-40">
        <DuotoneImage src={getMedia(caseStudy.slot)} alt={caseStudy.title} className="opacity-50" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm text-fog-dim transition-colors hover:text-lime"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to work
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <Badge variant="outline">{caseStudy.tag}</Badge>
            </div>
            <h1 className="mt-3 font-display text-4xl tracking-tight text-fog sm:text-5xl">{caseStudy.title}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog-dim">{caseStudy.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {caseStudy.results.map((result) => (
              <GlassPanel key={result.label} className="p-6 text-center">
                <p className="gradient-ring-text font-display text-3xl">{result.value}</p>
                <p className="mt-1 text-sm text-fog-dim">{result.label}</p>
              </GlassPanel>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-xl text-fog">The challenge</h2>
            <p className="mt-3 text-base leading-relaxed text-fog-dim">{caseStudy.challenge}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-xl text-fog">Our approach</h2>
            <p className="mt-3 text-base leading-relaxed text-fog-dim">{caseStudy.approach}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {caseStudy.gallery.map((slot, i) => (
            <Reveal key={`${slot}-${i}`} delay={i * 0.08}>
              <div className="relative h-64 overflow-hidden rounded-2xl border border-glass-border sm:h-80">
                <DuotoneImage src={getMedia(slot)} alt={`${caseStudy.title} photo ${i + 1}`} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
