import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { CalendarCheck, Users, Scissors, Images, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Overview",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [bookingsRes, pendingRes, customersRes, servicesRes, galleryRes, recentRes] =
    await Promise.all([
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("gallery_items").select("*", { count: "exact", head: true }),
      supabase
        .from("bookings")
        .select("id, full_name, booking_date, booking_time, status, services(name)")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const stats = [
    {
      label: "Total Bookings",
      value: bookingsRes.count ?? 0,
      icon: CalendarCheck,
      href: "/admin/bookings",
    },
    {
      label: "Pending Bookings",
      value: pendingRes.count ?? 0,
      icon: Clock,
      href: "/admin/bookings",
    },
    { label: "Customers", value: customersRes.count ?? 0, icon: Users, href: "/admin/customers" },
    { label: "Active Services", value: servicesRes.count ?? 0, icon: Scissors, href: "/admin/services" },
    { label: "Gallery Items", value: galleryRes.count ?? 0, icon: Images, href: "/admin/gallery" },
  ];

  const recent = recentRes.data ?? [];

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-ink">Admin Overview</h1>
      <p className="mt-2 text-sm text-muted">
        A quick snapshot of bookings, customers, services and gallery content.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} className="card-luxury p-6 hover:shadow-lg">
              <Icon size={18} className="text-accent" aria-hidden />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {stat.label}
              </p>
              <p className="mt-1 font-display text-3xl text-ink">{stat.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="card-luxury mt-8 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-accent-hover hover:underline">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No bookings yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4 font-semibold">Customer</th>
                  <th className="py-2 pr-4 font-semibold">Service</th>
                  <th className="py-2 pr-4 font-semibold">Date</th>
                  <th className="py-2 pr-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} className="border-b border-line/60 last:border-0">
                    <td className="py-3 pr-4 font-medium text-ink">{b.full_name}</td>
                    <td className="py-3 pr-4 text-muted">
                      {(b as { services?: { name: string } | null }).services?.name ?? "—"}
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {b.booking_date} · {b.booking_time}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold capitalize text-accent-hover">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
