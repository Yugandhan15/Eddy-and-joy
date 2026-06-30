import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceCard } from "@/components/ui/service-card";
import { Reveal } from "@/components/ui/reveal";
import { SERVICES } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore haircuts, styling, colour, nails, facials and waxing treatments at Eddy and Joy. View pricing, duration and book online.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Offer"
        title="Services & Treatments"
        description="Twelve signature treatments, each delivered by trained specialists with premium products and honest pricing."
      />
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 6) * 0.06}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
