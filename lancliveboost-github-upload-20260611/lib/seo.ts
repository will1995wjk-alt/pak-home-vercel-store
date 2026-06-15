import type { Metadata } from "next";
import { siteConfig } from "./config";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createMetadata({ title, description, path = "/", image }: SeoInput): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | Pakistan Home Essentials`;
  const pageDescription =
    description ||
    "Affordable home appliances and daily essentials in Pakistan with Cash on Delivery, fast delivery, and WhatsApp support.";
  const url = new URL(path, siteConfig.url).toString();

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      images: image ? [{ url: image, alt: pageTitle }] : undefined,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: image ? [image] : undefined
    }
  };
}
