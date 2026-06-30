"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { saveTeamMember, type ActionState } from "@/lib/admin/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { TeamMember } from "@/lib/types/database";

const initialState: ActionState = {};

export function TeamMemberForm({ member }: { member?: TeamMember }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(saveTeamMember, initialState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.success]);

  return (
    <>
      {member ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs font-medium text-accent-hover hover:underline"
        >
          Edit
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn-pill btn-primary text-sm">
          <Plus size={15} aria-hidden /> Add Team Member
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">
                {member ? "Edit Team Member" : "New Team Member"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" aria-hidden />
              </button>
            </div>

            <form action={formAction} className="mt-5 flex flex-col gap-4">
              {member && <input type="hidden" name="id" value={member.id} />}

              <div>
                <label className="text-sm font-semibold text-ink">Photo</label>
                <div className="mt-1.5">
                  <ImageUploader bucket="site" name="photo_url" initialUrl={member?.photo_url} />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Name</label>
                <input name="name" defaultValue={member?.name} required className="input-field mt-1.5" />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Role</label>
                <input name="role" defaultValue={member?.role} required className="input-field mt-1.5" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-ink">Display order</label>
                  <input
                    type="number"
                    name="display_order"
                    defaultValue={member?.display_order ?? 0}
                    className="input-field mt-1.5"
                  />
                </div>
                <div className="flex items-end pb-2.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      name="is_active"
                      defaultChecked={member?.is_active ?? true}
                      className="h-4 w-4 rounded border-line accent-[var(--color-accent)]"
                    />
                    Visible on site
                  </label>
                </div>
              </div>

              {state.error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
              )}

              <div className="mt-2 flex gap-3">
                <button type="submit" disabled={pending} className="btn-pill btn-primary flex-1 text-sm disabled:opacity-60">
                  {pending ? "Saving…" : member ? "Save Changes" : "Add Member"}
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
