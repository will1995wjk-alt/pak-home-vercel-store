const defaultContact = {
  whatsappNumber: "923199815828",
  supportPhone: "+923199815828",
  supportEmail: "will1995wjk@gmail.com",
  shopifyStoreUrl: "https://hjbcjw-h3.myshopify.com"
};

function contactValue(value: string | undefined, fallback: string) {
  if (!value) return fallback;
  const normalized = value.trim();
  const placeholderPattern = /x{3,}|example\.com|your-/i;
  return placeholderPattern.test(normalized) ? fallback : normalized;
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Pak Home Essentials",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsappNumber: contactValue(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, defaultContact.whatsappNumber),
  shopifyStoreUrl: process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || defaultContact.shopifyStoreUrl,
  supportEmail: contactValue(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, defaultContact.supportEmail),
  supportPhone: contactValue(process.env.NEXT_PUBLIC_SUPPORT_PHONE, defaultContact.supportPhone),
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  tiktokUrl: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
};

export function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return null;
  }

  return { domain, token };
}
