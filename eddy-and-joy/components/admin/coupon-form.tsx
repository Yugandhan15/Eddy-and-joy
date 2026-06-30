"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { saveCoupon, type ActionState } from "@/lib/admin/actions";
import type { Coupon } from "@/lib/types/database";

const initialState: ActionState = {};

export function CouponForm({ coupon }: { coupon?: Coupon }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(saveCoupon, initialState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.success]);

  return (
    <>
      {coupon ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs font-medium text-accent-hover hover:underline"
        >
          Edit
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn-pill btn-primary text-sm">
          <Plus size={15} aria-hidden /> Add Coupon
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">
                {coupon ? "Edit Coupon" : "New Coupon"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" aria-hidden />
              </button>
            </div>

            <form action={formAction} className="mt-5 flex flex-col gap-4">
              {coupon && <input type="hidden" name="id" value={coupon.id} />}

              <div>
                <label className="text-sm font-semibold text-ink">Coupon Code</label>
                <input
                  name="code"
                  defaultValue={coupon?.code}
                  required
                  placeholder="WELCOME100"
                  className="input-field mt-1.5 uppercase"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Discount Amount (₹ flat off)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  name="discount_amount"
                  defaultValue={coupon?.discount_amount}
                  required
                  className="input-field mt-1.5"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Expires On (optional)</label>
                <input
                  type="date"
                  name="expires_at"
                  defaultValue={coupon?.expires_at ?? ""}
                  className="input-field mt-1.5"
                />
              </div>

              <label className="flex items-center gap-2 text-sm font-medium text-ink">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={coupon?.is_active ?? true}
                  className="h-4 w-4 rounded border-line accent-[var(--color-accent)]"
                />
                Active (customers can apply it)
              </label>

              {state.error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
              )}

              <div className="mt-2 flex gap-3">
                <button type="submit" disabled={pending} className="btn-pill btn-primary flex-1 text-sm disabled:opacity-60">
                  {pending ? "Saving…" : coupon ? "Save Changes" : "Create Coupon"}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="btn-pill btn-secondary text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
