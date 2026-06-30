import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CouponForm } from "@/components/admin/coupon-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCoupon } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Coupons — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCouponsPage() {
  const supabase = await createClient();
  const { data: coupons } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-ink">Coupons</h1>
          <p className="mt-2 text-sm text-muted">
            Flat ₹ discount codes customers can apply on the booking form.
          </p>
        </div>
        <CouponForm />
      </div>

      <div className="card-luxury mt-6 overflow-x-auto p-6">
        {!coupons || coupons.length === 0 ? (
          <p className="text-sm text-muted">No coupons yet. Add your first one above.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th className="py-2 pr-4 font-semibold">Code</th>
                <th className="py-2 pr-4 font-semibold">Discount</th>
                <th className="py-2 pr-4 font-semibold">Expires</th>
                <th className="py-2 pr-4 font-semibold">Status</th>
                <th className="py-2 pr-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-line/60 last:border-0">
                  <td className="py-3 pr-4 font-mono font-semibold text-ink">{c.code}</td>
                  <td className="py-3 pr-4 text-muted">₹{c.discount_amount} off</td>
                  <td className="py-3 pr-4 text-muted">{c.expires_at || "No expiry"}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        c.is_active ? "bg-green-50 text-green-700" : "bg-bg text-muted"
                      }`}
                    >
                      {c.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <CouponForm coupon={c} />
                      <DeleteButton
                        action={deleteCoupon.bind(null, c.id)}
                        confirmLabel="Delete coupon?"
                      />
                    </div>
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
