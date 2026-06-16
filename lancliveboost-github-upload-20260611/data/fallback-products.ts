import type { Product } from "@/lib/shopify/types";
import { siteConfig } from "@/lib/config";

const fallbackImages = {
  kettle: "/images/product-kettle.png",
  blender: "/images/product-blender.png",
  mop: "/images/product-mop.png",
  storage: "/images/product-storage.png"
};

function getShopifyProductUrl(handle: string) {
  const storeUrl = siteConfig.shopifyStoreUrl.replace(/\/$/, "");
  if (!storeUrl) return "";
  return `${storeUrl}/products/${handle}`;
}

function fallbackProduct(
  title: string,
  handle: string,
  type: string,
  price: string,
  compareAt: string,
  image: string,
  tags: string[] = []
): Product {
  return {
    id: `fallback-${handle}`,
    handle,
    title,
    description: `${title} for daily home use in Pakistan with Cash on Delivery, quick delivery, and WhatsApp order support.`,
    descriptionHtml: `
      <p>${title} for daily home use in Pakistan with Cash on Delivery, quick delivery, and WhatsApp order support.</p>
      <ul>
        <li>Suitable for everyday household use</li>
        <li>Quality checked before dispatch</li>
        <li>Order help available on WhatsApp</li>
      </ul>
    `,
    vendor: "Pak Home Essentials",
    productType: type,
    availableForSale: false,
    totalInventory: null,
    tags: [type, "Pakistan", "COD", ...tags],
    shopifyProductUrl: getShopifyProductUrl(handle),
    collections: [],
    featuredImage: {
      url: image,
      altText: title,
      width: 900,
      height: 900
    },
    images: [
      {
        url: image,
        altText: title,
        width: 900,
        height: 900
      }
    ],
    options: [{ name: "Title", values: ["Default Title"] }],
    variants: [
      {
        id: `fallback-variant-${handle}`,
        title: "Default Title",
        sku: `PHE-${handle.toUpperCase()}`,
        availableForSale: false,
        quantityAvailable: null,
        price: { amount: price, currencyCode: "PKR" },
        compareAtPrice: { amount: compareAt, currencyCode: "PKR" },
        selectedOptions: [{ name: "Title", value: "Default Title" }],
        image: {
          url: image,
          altText: title,
          width: 900,
          height: 900
        }
      }
    ],
    priceRange: {
      minVariantPrice: { amount: price, currencyCode: "PKR" },
      maxVariantPrice: { amount: price, currencyCode: "PKR" }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: compareAt, currencyCode: "PKR" },
      maxVariantPrice: { amount: compareAt, currencyCode: "PKR" }
    },
    seo: {
      title,
      description: `${title} in Pakistan with COD and WhatsApp support.`
    }
  };
}

export const fallbackProducts: Product[] = [
  fallbackProduct("Electric Kettle", "electric-kettle", "Kitchen Appliances", "3499", "4299", fallbackImages.kettle, [
    "deal",
    "kitchen-appliances"
  ]),
  fallbackProduct("2-in-1 Blender", "2-in-1-blender", "Kitchen Appliances", "6999", "8499", fallbackImages.blender, [
    "deal",
    "kitchen-appliances"
  ]),
  fallbackProduct("Hand Blender Set", "hand-blender-set", "Kitchen Appliances", "5499", "6499", fallbackImages.blender, [
    "kitchen-appliances"
  ]),
  fallbackProduct("Non-Stick Fry Pan", "non-stick-fry-pan", "Kitchen Appliances", "2799", "3499", fallbackImages.kettle, [
    "kitchen-appliances"
  ]),
  fallbackProduct("Spin Mop Set", "spin-mop-set", "Home Cleaning", "2499", "3199", fallbackImages.mop, [
    "deal",
    "home-cleaning"
  ]),
  fallbackProduct("Bathroom Cleaning Kit", "bathroom-cleaning-kit", "Home Cleaning", "1999", "2599", fallbackImages.mop, [
    "home-cleaning"
  ]),
  fallbackProduct("Lint Remover", "lint-remover", "Personal Care", "2299", "2899", fallbackImages.blender, [
    "personal-care"
  ]),
  fallbackProduct("Hair Dryer", "hair-dryer", "Personal Care", "3999", "4999", fallbackImages.kettle, [
    "personal-care"
  ]),
  fallbackProduct("Daily Use Utility Pack", "daily-use-utility-pack", "Daily Use Products", "1499", "1999", fallbackImages.storage, [
    "daily-use-products"
  ]),
  fallbackProduct("Kitchen Storage Box Set", "kitchen-storage-box-set", "Storage & Organization", "1899", "2499", fallbackImages.storage, [
    "deal",
    "storage-organization"
  ]),
  fallbackProduct("Foldable Storage Basket", "foldable-storage-basket", "Storage & Organization", "1299", "1699", fallbackImages.storage, [
    "storage-organization"
  ]),
  fallbackProduct("Home Starter Bundle", "home-starter-bundle", "Daily Use Products", "8999", "10999", fallbackImages.mop, [
    "daily-use-products",
    "deal"
  ])
];
