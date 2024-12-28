import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/drafts/",
    },
    sitemap: "https://kpitzen.io/sitemap.xml", // Replace with your domain
  };
}
