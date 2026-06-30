import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Gallery } from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse photos of our hair, beauty, facial, waxing and nail work at Eddy and Joy.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Gallery"
        description="A glimpse into the studio, our craft, and the results we're proud of."
      />
      <Gallery showHeading={false} />
    </>
  );
}
