import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BookingStatusSelect } from "@/components/admin/booking-status-select";
import type { BookingStatus } from "@/lib/types/database";

export const metadata: Metadata = {
  title: "Bookings — Admin",
  robots: { index: false, follow: false },
};

const STATUS_FILTERS: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("bookings")
    .select(
      "id, full_name, mobile, booking_date, booking_time, status, message, coupon_code, discount_amount, services(name)"
    )
    .order("booking_date", { ascending: false })
    .order("booking_time", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (q) {
    query = query.or(`full_name.ilike.%${q}%,mobile.ilike.%${q}%`);
  }

  const { data: bookings } = await query;

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-ink">Bookings</h1>
      <p className="mt-2 text-sm text-muted">View and manage every booking across all customers.</p>

      <form className="mt-6 flex flex-wrap items-center gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search name or mobile…"
          className="input-field max-w-xs"
        />
        {status && status !== "all" && <input type="hidden" name="status" value={status} />}
        <button type="submit" className="btn-pill btn-secondary text-sm">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => {
          const active = (status ?? "all") === f.value;
          const params = new URLSearchParams();
          if (f.value !== "all") params.set("status", f.value);
          if (q) params.set("q", q);
          const href = params.toString() ? `/admin/bookings?${params}` : "/admin/bookings";
          return (
            <a
              key={f.value}
              href={href}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                active ? "bg-ink text-white" : "bg-accent-tint text-accent-hover hover:bg-accent/20"
              }`}
            >
              {f.label}
            </a>
          );
        })}
      </div>

      <div className="card-luxury mt-6 overflow-x-auto p-6">
        {!bookings || bookings.length === 0 ? (
          <p className="text-sm text-muted">No bookings match this filter.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="py-2 pr-4 font-semibold">Customer</th>
                <th className="py-2 pr-4 font-semibold">Mobile</th>
                <th className="py-2 pr-4 font-semibold">Service</th>
                <th className="py-2 pr-4 font-semibold">Date / Time</th>
                <th className="py-2 pr-4 font-semibold">Coupon</th>
                <th className="py-2 pr-4 font-semibold">Note</th>
                <th className="py-2 pr-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-line/60 align-top last:border-0">
                  <td className="py-3 pr-4 font-medium text-ink">{b.full_name}</td>
                  <td className="py-3 pr-4 text-muted">{b.mobile}</td>
                  <td className="py-3 pr-4 text-muted">
                    {(b as { services?: { name: string } | null }).services?.name ?? "—"}
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted">
                    {b.booking_date} · {b.booking_time}
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {b.coupon_code ? (
                      <span className="font-medium text-green-700">
                        {b.coupon_code} (−₹{b.discount_amount})
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="max-w-[220px] truncate py-3 pr-4 text-muted">
                    {b.message || "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <BookingStatusSelect bookingId={b.id} status={b.status as BookingStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
