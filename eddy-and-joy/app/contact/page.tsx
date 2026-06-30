import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Eddy and Joy — call, WhatsApp, email or visit our studio.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="We'd love to hear from you"
        description="Questions about a treatment, or want to plan a visit? Reach out any way that suits you."
      />

      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <Reveal className="space-y-6">
            <InfoRow icon={<Phone size={18} />} label="Phone">
              <a href={SITE.phoneHref} className="hover:text-accent">
                {SITE.phone}
              </a>
            </InfoRow>
            <InfoRow icon={<Mail size={18} />} label="Email">
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                {SITE.email}
              </a>
            </InfoRow>
            <InfoRow icon={<MapPin size={18} />} label="Studio Address">
              {SITE.address}
            </InfoRow>
            <InfoRow icon={<Clock size={18} />} label="Business Hours">
              <ul className="space-y-1">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6 text-sm">
                    <span className="text-muted">{h.day}</span>
                    <span className="font-medium text-ink">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>

            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Eddy and Joy location on Google Maps"
                src="https://www.google.com/maps?q=Chennai&output=embed"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent-hover">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <div className="mt-1 text-sm font-medium text-ink-soft">{children}</div>
      </div>
    </div>
  );
}
