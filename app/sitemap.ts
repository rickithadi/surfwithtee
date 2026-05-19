import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://surfwithtee.com",
      lastModified: new Date("2026-05-17"),
    },
  ];
}
