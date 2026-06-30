"use client";

import { useActionState, useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { saveGalleryItem, type ActionState } from "@/lib/admin/actions";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { GalleryItem } from "@/lib/types/database";

const initialState: ActionState = {};

export function GalleryForm({ item }: { item?: GalleryItem }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(saveGalleryItem, initialState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state.success]);

  return (
    <>
      {item ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs font-medium text-accent-hover hover:underline"
        >
          Edit
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn-pill btn-primary text-sm">
          <Plus size={15} aria-hidden /> Add Image
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-4 py-8">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-card p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink">
                {item ? "Edit Gallery Image" : "New Gallery Image"}
              </h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={20} className="text-muted" aria-hidden />
              </button>
            </div>

            <form action={formAction} className="mt-5 flex flex-col gap-4">
              {item && <input type="hidden" name="id" value={item.id} />}

              <div>
                <label className="text-sm font-semibold text-ink">Image</label>
                <div className="mt-1.5">
                  <ImageUploader bucket="gallery" name="image_url" initialUrl={item?.image_url} />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Category</label>
                <input
                  name="category"
                  defaultValue={item?.category}
                  required
                  placeholder="Hair, Nails, Facial, Studio…"
                  className="input-field mt-1.5"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Caption</label>
                <input
                  name="caption"
                  defaultValue={item?.caption ?? ""}
                  className="input-field mt-1.5"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">Display order</label>
                <input
                  type="number"
                  name="display_order"
                  defaultValue={item?.display_order ?? 0}
                  className="input-field mt-1.5"
                />
              </div>

              {state.error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
              )}

              <div className="mt-2 flex gap-3">
                <button type="submit" disabled={pending} className="btn-pill btn-primary flex-1 text-sm disabled:opacity-60">
                  {pending ? "Saving…" : item ? "Save Changes" : "Add to Gallery"}
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
