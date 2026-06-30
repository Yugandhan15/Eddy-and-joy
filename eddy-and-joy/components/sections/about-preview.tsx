import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site-config";

const STATS = [
  { value: `${SITE.stats.yearsExperience}+`, label: "Years of Experience" },
  { value: `${(SITE.stats.projectsCompleted / 1000).toFixed(1)}k+`, label: "Services Completed" },
  { value: `${(SITE.stats.happyClients / 1000).toFixed(1)}k+`, label: "Happy Clients" },
  { value: `${SITE.stats.rating}/5`, label: "Average Rating" },
];

export function AboutPreview() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop"
              alt="Eddy and Joy stylist working with a client"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="card-luxury absolute -bottom-8 -right-4 flex max-w-[220px] items-center gap-3 p-5 sm:-right-10">
            <Sparkles className="text-accent" size={28} />
            <p className="text-sm font-medium text-ink">
              Crafted experiences, every single visit
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="editorial-eyebrow">Our Story</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-light text-ink sm:text-5xl">
            Built on craft, not trends
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Eddy and Joy began with a simple belief: a salon visit should feel unhurried. What
            started as a small studio has grown into a full beauty destination, but our mission
            hasn&apos;t changed — thoughtful technique, honest advice, and a space that feels
            calm the moment you walk in.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Our vision is simple: to be the studio our clients trust with their most important
            moments, from a quick touch-up to a full transformation.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl text-ink">{s.value}</p>
                <p className="mt-1 text-xs text-muted">{s.label}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-pill btn-primary mt-10 inline-flex">
            More About Us <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
