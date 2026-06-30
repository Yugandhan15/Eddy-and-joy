import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5 text-sm leading-relaxed text-ink-soft sm:px-8">
          <p>
            By booking an appointment with Eddy and Joy, you agree to arrive on time for your
            scheduled slot. Late arrivals may result in a shortened service to respect the next
            client&apos;s appointment.
          </p>
          <p>
            Cancellations or reschedules should be made at least 4 hours in advance via phone or
            WhatsApp. Prices listed on this website are starting prices and may vary based on hair
            length, condition, or specific requirements assessed during consultation.
          </p>
          <p>
            This page will be updated with complete terms as our online booking and payment
            systems go live.
          </p>
        </div>
      </section>
    </>
  );
}
