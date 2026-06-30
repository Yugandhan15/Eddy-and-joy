"use client";

import { useActionState } from "react";
import { updateAdminProfile, type ActionState } from "@/lib/admin/actions";

const initialState: ActionState = {};

export function AdminProfileForm({ fullName, phone }: { fullName: string; phone: string }) {
  const [state, formAction, pending] = useActionState(updateAdminProfile, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-semibold text-ink">Full Name</label>
        <input name="full_name" defaultValue={fullName} required className="input-field mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-semibold text-ink">Mobile</label>
        <input name="phone" defaultValue={phone} placeholder="10-digit number" className="input-field mt-1.5" />
      </div>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Profile updated.</p>
      )}

      <button type="submit" disabled={pending} className="btn-pill btn-primary self-start text-sm disabled:opacity-60">
        {pending ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
