import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Customers — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCustomersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, phone, role, created_at")
    .order("created_at", { ascending: false });

  const { data: bookingCounts } = await supabase.from("bookings").select("user_id");

  const countsByUser = new Map<string, number>();
  (bookingCounts ?? []).forEach((b) => {
    if (!b.user_id) return;
    countsByUser.set(b.user_id, (countsByUser.get(b.user_id) ?? 0) + 1);
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-ink">Customers</h1>
      <p className="mt-2 text-sm text-muted">
        Everyone registered on the site, {profiles?.length ?? 0} total.
      </p>

      <div className="card-luxury mt-6 overflow-x-auto p-6">
        {!profiles || profiles.length === 0 ? (
          <p className="text-sm text-muted">No customers yet.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="py-2 pr-4 font-semibold">Name</th>
                <th className="py-2 pr-4 font-semibold">Mobile</th>
                <th className="py-2 pr-4 font-semibold">Role</th>
                <th className="py-2 pr-4 font-semibold">Bookings</th>
                <th className="py-2 pr-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0">
                  <td className="py-3 pr-4 font-medium text-ink">{p.full_name || "—"}</td>
                  <td className="py-3 pr-4 text-muted">{p.phone || "—"}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        p.role === "admin"
                          ? "bg-ink text-white"
                          : "bg-accent-tint text-accent-hover"
                      }`}
                    >
                      {p.role}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted">{countsByUser.get(p.id) ?? 0}</td>
                  <td className="py-3 pr-4 whitespace-nowrap text-muted">
                    {new Date(p.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
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
