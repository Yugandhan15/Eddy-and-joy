"use client";

import { useActionState } from "react";
import { saveSiteContent, type ActionState } from "@/lib/admin/actions";
import { ImageUploader } from "@/components/admin/image-uploader";

const initialState: ActionState = {};

export function SiteContentForm({
  values,
}: {
  values: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(saveSiteContent, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-semibold text-ink">Eyebrow text</label>
        <input
          name="hero_eyebrow"
          defaultValue={values.hero_eyebrow}
          className="input-field mt-1.5"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-ink">Heading line 1</label>
          <input
            name="hero_heading_line1"
            defaultValue={values.hero_heading_line1}
            className="input-field mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-ink">Accent word (italic)</label>
          <input
            name="hero_heading_accent"
            defaultValue={values.hero_heading_accent}
            className="input-field mt-1.5"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Heading line 2</label>
        <input
          name="hero_heading_line2"
          defaultValue={values.hero_heading_line2}
          className="input-field mt-1.5"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Subheading</label>
        <textarea
          name="hero_subheading"
          defaultValue={values.hero_subheading}
          rows={3}
          className="input-field mt-1.5 resize-none"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-ink">Background image</label>
        <div className="mt-1.5">
          <ImageUploader bucket="site" name="hero_image_url" initialUrl={values.hero_image_url} />
        </div>
      </div>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      )}
      {state.success && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Hero section updated.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-pill btn-primary self-start text-sm disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save Hero Section"}
      </button>
    </form>
  );
}
