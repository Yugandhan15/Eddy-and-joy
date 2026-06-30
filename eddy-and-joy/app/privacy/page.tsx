import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-6 px-5 text-sm leading-relaxed text-ink-soft sm:px-8">
          <p>
            Eddy and Joy collects only the information needed to manage your bookings and provide
            our services: your name, contact details, and appointment preferences. We never sell
            your information to third parties.
          </p>
          <p>
            Information you provide when booking — name, mobile number, email, and appointment
            details — is used to confirm your visit and send related updates by WhatsApp, SMS or
            email. You may request access to or deletion of your data at any time by contacting
            us at the details listed on our Contact page.
          </p>
          <p>
            This page will be updated with our complete privacy policy as our booking and account
            systems go live.
          </p>
        </div>
      </section>
    </>
  );
}
