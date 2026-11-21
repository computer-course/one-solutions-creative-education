import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl, site } from "@/data/site";
import { populatedDepartments } from "@/data/teams";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/about", "/leadership", "/teams", "/services", "/institutions", "/courses", "/work", "/contact", "/privacy-policy", "/terms",
    ...(site.features.careers ? ["/careers"] : []),
    ...(site.features.insights ? ["/insights"] : []),
    ...services.map((s) => `/services/${s.slug}`),
    ...populatedDepartments().map((d) => `/teams/${d.slug}`),
  ];
  return paths.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
