import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { BookingForm } from "@/components/sections/booking-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book your next appointment at Eddy and Joy in under two minutes.",
};

export default async function BookingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login?redirectedFrom=/booking");
  }

  const { data: services } = await supabase
    .from("services")
    .select("id, name, price_from")
    .eq("is_active", true)
    .order("name");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .single();

  return (
    <>
      <PageHeader
        eyebrow="Book a Service"
        title="Reserve your appointment"
        description="Tell us what you'd like, and we'll confirm your slot shortly after."
      />
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <Suspense fallback={null}>
            <BookingForm
              services={services ?? []}
              defaultName={profile?.full_name ?? ""}
              defaultMobile={profile?.phone ?? ""}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
