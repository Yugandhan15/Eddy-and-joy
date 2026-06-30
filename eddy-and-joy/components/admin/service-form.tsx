"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { saveService, type ActionState } from "@/lib/admin/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { Service } from "@/lib/types/database";

const initialState: ActionState = {};

export function ServiceForm({ service }: { service?: Service }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(saveService, initialState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.success]);

  return (
    <>
      {service ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs font-medium text-accent-hover hover:underline"
        >
          Edit
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="btn-pill btn-primary text-sm"
        >
          <Plus size={15} aria-hidden /> Add Service
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">
                {service ? "Edit Service" : "New Service"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" aria-hidden />
              </button>
            </div>

            <form action={formAction} className="mt-5 flex flex-col gap-4">
              {service && <input type="hidden" name="id" value={service.id} />}

              <div>
                <label className="text-sm font-semibold text-ink">Name</label>
                <input
                  name="name"
                  defaultValue={service?.name}
                  required
                  className="input-field mt-1.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-ink">Category</label>
                  <input
                    name="category"
                    defaultValue={service?.category}
                    required
                    placeholder="Hair, Nails, Facial…"
                    className="input-field mt-1.5"
                  />
                </div>
                <div className="flex items-end pb-2.5">
                  <label className="flex items-center gap-2 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      name="is_active"
                      defaultChecked={service?.is_active ?? true}
                      className="h-4 w-4 rounded border-line accent-[var(--color-accent)]"
                    />
                    Active (visible to customers)
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Description</label>
                <textarea
                  name="description"
                  defaultValue={service?.description ?? ""}
                  rows={3}
                  className="input-field mt-1.5 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-ink">Price from (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    name="price_from"
                    defaultValue={service?.price_from}
                    required
                    className="input-field mt-1.5"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-ink">Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    name="duration_minutes"
                    defaultValue={service?.duration_minutes ?? 30}
                    required
                    className="input-field mt-1.5"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Image</label>
                <div className="mt-1.5">
                  <ImageUploader bucket="services" name="image_url" initialUrl={service?.image_url} />
                </div>
              </div>

              {state.error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
              )}

              <div className="mt-2 flex gap-3">
                <button type="submit" disabled={pending} className="btn-pill btn-primary flex-1 text-sm disabled:opacity-60">
                  {pending ? "Saving…" : service ? "Save Changes" : "Create Service"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="btn-pill btn-secondary text-sm"
                >
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
