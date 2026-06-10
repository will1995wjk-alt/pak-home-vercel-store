import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/collections", "/cart", "/search", "/about", "/contact", "/delivery-policy", "/return-policy", "/privacy-policy", "/terms", "/faq"];
  return pages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date()
  }));
}
