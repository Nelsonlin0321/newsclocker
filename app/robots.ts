import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/auth/*", "/workspace/*"],
    },
    sitemap: "https://newsclocker.com/sitemap.xml",
  };
}
