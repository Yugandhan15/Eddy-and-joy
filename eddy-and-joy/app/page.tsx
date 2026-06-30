import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { Gallery } from "@/components/sections/gallery";
import { AboutPreview } from "@/components/sections/about-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: rows } = await supabase.from("site_content").select("key, value");

  const content: Record<string, string> = {};
  (rows ?? []).forEach((row) => {
    if (row.value) content[row.key] = row.value;
  });

  return (
    <>
      <Hero
        eyebrow={content.hero_eyebrow}
        headingLine1={content.hero_heading_line1}
        headingAccent={content.hero_heading_accent}
        headingLine2={content.hero_heading_line2}
        subheading={content.hero_subheading}
        imageUrl={content.hero_image_url}
      />
      <ServicesPreview />
      <AboutPreview />
      <Gallery />
      <Testimonials />
      <CtaBand />
    </>
  );
}
