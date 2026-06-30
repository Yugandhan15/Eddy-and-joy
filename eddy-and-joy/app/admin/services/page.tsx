import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "@/components/admin/service-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteService } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Services — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("category")
    .order("name");

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-ink">Services</h1>
          <p className="mt-2 text-sm text-muted">
            Manage what customers see on the Services page and in the booking form.
          </p>
        </div>
        <ServiceForm />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(services ?? []).map((service) => (
          <div key={service.id} className="card-luxury overflow-hidden">
            <div className="relative h-36 w-full bg-bg">
              {service.image_url ? (
                <Image
                  src={service.image_url}
                  alt={service.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted">
                  No image
                </div>
              )}
              {!service.is_active && (
                <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
                  Inactive
                </span>
              )}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-hover">
                {service.category}
              </p>
              <h3 className="mt-1 font-display text-lg text-ink">{service.name}</h3>
              <p className="mt-1 text-sm text-muted">
                ₹{service.price_from} · {service.duration_minutes} min
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <ServiceForm service={service} />
                <DeleteButton
                  action={deleteService.bind(null, service.id)}
                  confirmLabel="Delete service?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!services || services.length === 0) && (
        <p className="mt-6 text-sm text-muted">No services yet. Add your first one above.</p>
      )}
    </div>
  );
}
