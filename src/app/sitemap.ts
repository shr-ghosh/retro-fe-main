import { MetadataRoute } from "next";
import games from "@/constants/games";
import navbars from "@/constants/navbar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const navbarUrls = navbars.reduce((acc: MetadataRoute.Sitemap, navbar) => {
    if (navbar.options && navbar.sitemapPriority > 0) {
      const navbarOptionsUrls = navbar.options.map((option) => {
        return {
          url: new URL(option.href, BASE_URL).href,
          lastModified: new Date(),
          priority: navbar.sitemapPriority || 0.5,
        };
      });
      return [...acc, ...navbarOptionsUrls];
    }
    return acc;
  }, []);

  return [...navbarUrls];
}