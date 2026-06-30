import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";

export function ServicesPreview() {
  const featured = SERVICES.slice(0, 6);

  return (
    <section id="services" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="editorial-eyebrow">What We Offer</span>
          <h2 className="mt-4 text-balance font-display text-4xl font-light text-ink sm:text-5xl">
            Treatments crafted around you
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted">
            Every service is delivered by trained specialists using premium products, in a space
            designed for quiet focus.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Link href="/services" className="btn-pill btn-secondary">
            View All Services <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
