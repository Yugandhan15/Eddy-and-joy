import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Check, ArrowLeft } from "lucide-react";
import { SERVICES } from "@/lib/data/services";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

const INCLUDES = [
  "Consultation with a specialist",
  "Premium, salon-grade products",
  "Relaxed, private treatment space",
  "Aftercare guidance",
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  ).slice(0, 3);

  return (
    <>
      <section className="bg-bg pt-32 sm:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-accent"
          >
            <ArrowLeft size={16} /> Back to all services
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-12 pb-20 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </Reveal>

            <Reveal delay={0.1}>
              <span className="editorial-eyebrow">{service.category}</span>
              <h1 className="mt-3 font-display text-4xl font-light text-ink sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {service.longDescription}
              </p>

              <div className="mt-8 flex items-center gap-8 border-y border-line py-6">
                <div>
                  <p className="text-xs text-muted">Price</p>
                  <p className="mt-1 font-display text-2xl text-ink">{service.price}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Duration</p>
                  <p className="mt-1 flex items-center gap-1.5 font-display text-2xl text-ink">
                    <Clock size={18} className="text-accent" /> {service.duration}
                  </p>
                </div>
              </div>

              <ul className="mt-7 space-y-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                    <Check size={16} className="text-accent" /> {item}
                  </li>
                ))}
              </ul>

              <Link
                href={`/booking?service=${encodeURIComponent(service.name)}`}
                className="btn-pill btn-primary mt-9 inline-flex"
              >
                Book This Service
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <Reveal>
              <span className="editorial-eyebrow">You May Also Like</span>
              <h2 className="mt-3 font-display text-3xl font-light text-ink sm:text-4xl">
                More in {service.category}
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
