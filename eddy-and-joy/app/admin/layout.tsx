import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/account/login?redirectedFrom=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return (
    <div className="flex min-h-screen flex-col bg-bg pt-[72px] lg:flex-row">
      <AdminSidebar adminName={profile.full_name || user.email || "Admin"} />
      <main className="flex-1 px-5 py-10 sm:px-8 lg:px-10 lg:py-12">{children}</main>
    </div>
  );
}
