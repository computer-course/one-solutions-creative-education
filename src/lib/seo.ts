import type { Metadata } from "next";
import { site } from "@/data/site";

export function pageMeta(opts: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: opts.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${opts.title} | ${site.name}`,
      description: opts.description,
      url: opts.path,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${opts.title} | ${site.name}`, description: opts.description },
  };
}
