import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/ui/page-header";
import { logout } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: "My Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/account/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", user.id)
    .single();

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      "id, full_name, booking_date, booking_time, status, coupon_code, discount_amount, services(name)"
    )
    .eq("user_id", user.id)
    .order("booking_date", { ascending: false });

  return (
    <>
      <PageHeader eyebrow="Your Account" title={`Welcome, ${(profile as any)?.full_name || "there"}`} />
      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="card-luxury p-8">
            <h2 className="font-display text-xl text-ink">Profile</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="mt-1 font-medium text-ink">{user.email}</dd>
              </div>
              <div>
                <dt className="text-muted">Mobile</dt>
                <dd className="mt-1 font-medium text-ink">{(profile as any)?.phone || "—"}</dd>
              </div>
            </dl>

            <form action={logout} className="mt-6">
              <button type="submit" className="btn-pill btn-secondary text-sm">
                Sign Out
              </button>
            </form>
          </div>

          <div className="card-luxury mt-8 p-8">
            <h2 className="font-display text-xl text-ink">Your Bookings</h2>
            {!bookings || bookings.length === 0 ? (
              <p className="mt-3 text-sm text-muted">
                You haven&apos;t made any bookings yet.
              </p>
            ) : (
              <ul className="mt-5 flex flex-col gap-3">
                {(bookings as any[]).map((b) => (
                  <li
                    key={b.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-4 text-sm"
                  >
                    <div>
                      <p className="font-medium text-ink">
                        {(b as { services?: { name: string } | null }).services?.name ?? "Service"}
                      </p>
                      <p className="mt-1 text-muted">
                        {b.booking_date} at {b.booking_time}
                      </p>
                      {b.coupon_code && (
                        <p className="mt-1 text-xs font-medium text-green-700">
                          Coupon {b.coupon_code} applied — ₹{b.discount_amount} off
                        </p>
                      )}
                    </div>
                    <span className="rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold capitalize text-accent-hover">
                      {b.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
