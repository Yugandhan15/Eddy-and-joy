import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { GalleryForm } from "@/components/admin/gallery-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteGalleryItem } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Gallery — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-ink">Gallery</h1>
          <p className="mt-2 text-sm text-muted">Manage the images shown on the public Gallery page.</p>
        </div>
        <GalleryForm />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(items ?? []).map((item) => (
          <div key={item.id} className="card-luxury overflow-hidden">
            <div className="relative aspect-[4/5] w-full bg-bg">
              <Image
                src={item.image_url}
                alt={item.caption ?? item.category}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-hover">
                {item.category}
              </p>
              {item.caption && <p className="mt-1 truncate text-sm text-ink">{item.caption}</p>}
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <GalleryForm item={item} />
                <DeleteButton
                  action={deleteGalleryItem.bind(null, item.id)}
                  confirmLabel="Delete image?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!items || items.length === 0) && (
        <p className="mt-6 text-sm text-muted">No gallery images yet. Add your first one above.</p>
      )}
    </div>
  );
}
