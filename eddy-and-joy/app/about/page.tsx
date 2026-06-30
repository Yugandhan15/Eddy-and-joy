import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { SITE } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Eddy and Joy's story, mission and the team behind our premium hair and beauty studio.",
};

const FALLBACK_TEAM = [
  {
    name: "Eddy Fernandes",
    role: "Founder & Senior Stylist",
    photo_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Joy Mathew",
    role: "Co-Founder & Skin Specialist",
    photo_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Priya Nair",
    role: "Senior Colourist",
    photo_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Arjun Das",
    role: "Nail & Beauty Specialist",
    photo_url:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
  },
];

const STATS = [
  { value: `${SITE.stats.yearsExperience}+`, label: "Years Experience" },
  { value: `${(SITE.stats.projectsCompleted / 1000).toFixed(1)}k+`, label: "Services Completed" },
  { value: `${(SITE.stats.happyClients / 1000).toFixed(1)}k+`, label: "Happy Clients" },
  { value: `${SITE.stats.rating}/5`, label: "Average Rating" },
];

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: dbTeam } = await supabase
    .from("team_members")
    .select("name, role, photo_url")
    .order("display_order");

  const team = dbTeam && dbTeam.length > 0 ? dbTeam : FALLBACK_TEAM;

  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Built on craft, not trends"
        description="Eddy and Joy is a premium hair salon and beauty studio designed around calm spaces and considered detail."
      />

      <section className="bg-bg py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <Reveal className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem]">
            <Image
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop"
              alt="Eddy and Joy salon interior"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-base leading-relaxed text-muted">
            <p>
              What started as a small studio has grown into a full beauty destination, but our
              mission hasn&apos;t changed: thoughtful technique, honest advice, and a space that
              feels calm the moment you walk in.
            </p>
            <p>
              <span className="font-semibold text-ink">Our mission</span> is to make premium care
              accessible without compromising on craft — every treatment is delivered with the
              same care, whether it&apos;s a quick brow shape or a full colour transformation.
            </p>
            <p>
              <span className="font-semibold text-ink">Our vision</span> is to be the studio our
              clients trust with their most important moments, building long-term relationships
              one appointment at a time.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-ink">{s.value}</p>
                  <p className="mt-1 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="editorial-eyebrow">Our Team</span>
            <h2 className="mt-4 font-display text-4xl font-light text-ink sm:text-5xl">
              The hands behind the craft
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-7 sm:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.08} className="text-center">
                <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl">
                  {member.photo_url ? (
                    <Image
                      src={member.photo_url}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 220px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-bg text-xs text-muted">
                      No photo
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{member.name}</p>
                <p className="text-xs text-muted">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
