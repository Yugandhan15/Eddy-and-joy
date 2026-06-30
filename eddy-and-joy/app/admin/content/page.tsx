import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { SiteContentForm } from "@/components/admin/site-content-form";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTeamMember } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Site Content — Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContentPage() {
  const supabase = await createClient();

  const [{ data: contentRows }, { data: team }] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    supabase.from("team_members").select("*").order("display_order"),
  ]);

  const values: Record<string, string> = {};
  (contentRows ?? []).forEach((row) => {
    values[row.key] = row.value ?? "";
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-light text-ink">Site Content</h1>
      <p className="mt-2 text-sm text-muted">
        Edit the homepage hero section and the team shown on the About page.
      </p>

      <div className="card-luxury mt-6 max-w-2xl p-7">
        <h2 className="font-display text-lg text-ink">Hero Section</h2>
        <p className="mt-1 text-sm text-muted">Shown at the top of the homepage.</p>
        <div className="mt-5">
          <SiteContentForm values={values} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-ink">Our Team</h2>
          <p className="mt-1 text-sm text-muted">Shown on the About page.</p>
        </div>
        <TeamMemberForm />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {(team ?? []).map((member) => (
          <div key={member.id} className="card-luxury overflow-hidden">
            <div className="relative aspect-square w-full bg-bg">
              {member.photo_url ? (
                <Image
                  src={member.photo_url}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted">
                  No photo
                </div>
              )}
              {!member.is_active && (
                <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-semibold text-white">
                  Hidden
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-ink">{member.name}</p>
              <p className="text-xs text-muted">{member.role}</p>
              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <TeamMemberForm member={member} />
                <DeleteButton
                  action={deleteTeamMember.bind(null, member.id)}
                  confirmLabel="Remove member?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!team || team.length === 0) && (
        <p className="mt-4 text-sm text-muted">No team members yet. Add your first one above.</p>
      )}
    </div>
  );
}
