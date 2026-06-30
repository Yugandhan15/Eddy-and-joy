import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";
import { SERVICES } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/gallery", "/about", "/contact", "/booking"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const serviceRoutes = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
