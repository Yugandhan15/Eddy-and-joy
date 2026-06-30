import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminProfileForm } from "@/components/admin/admin-profile-form";

export const metadata: Metadata = {
  title: "Settings — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role, created_at")
    .eq("id", user!.id)
    .single();

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-ink">Settings</h1>
      <p className="mt-2 text-sm text-muted">Manage your admin profile details.</p>

      <div className="card-luxury mt-6 max-w-lg p-7">
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">Email</dt>
            <dd className="mt-1 font-medium text-ink">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1 font-medium capitalize text-ink">{profile?.role}</dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-line pt-6">
          <AdminProfileForm fullName={profile?.full_name ?? ""} phone={profile?.phone ?? ""} />
        </div>
      </div>

      <div className="card-luxury mt-6 max-w-lg p-7">
        <h2 className="font-display text-lg text-ink">Notifications</h2>
        <p className="mt-2 text-sm text-muted">
          SMS/WhatsApp and email notifications for new bookings are planned for Phase 5, once an
          SMS/WhatsApp provider (e.g. Twilio, MSG91, Gupshup) and SMTP provider (e.g. Resend,
          SendGrid) are connected with real API keys.
        </p>
      </div>
    </div>
  );
}
