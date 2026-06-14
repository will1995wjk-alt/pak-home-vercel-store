import type { Product } from "@/lib/shopify/types";

const fallbackImages = {
  kettle: "/images/product-kettle.png",
  blender: "/images/product-blender.png",
  mop: "/images/product-mop.png",
  storage: "/images/product-storage.png"
};

function fallbackProduct(title: string, handle: string, type: string, price: string, compareAt: string, image: string): Product {
  return {
    id: `fallback-${handle}`,
    handle,
    title,
    description: `${title} for daily home use in Pakistan with Cash on Delivery and WhatsApp order support.`,
    descriptionHtml: `<p>${title} for daily home use in Pakistan with Cash on Delivery and WhatsApp order support.</p>`,
    vendor: "Pak Home Essentials",
    productType: type,
    availableForSale: false,
    totalInventory: null,
    tags: [type, "Pakistan", "COD"],
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
  fallbackProduct("Electric Kettle", "electric-kettle", "Kitchen Appliances", "3499", "4299", fallbackImages.kettle),
  fallbackProduct("Blender", "blender", "Kitchen Appliances", "6999", "8499", fallbackImages.blender),
  fallbackProduct("Mop Set", "mop-set", "Home Cleaning", "2499", "3199", fallbackImages.mop),
  fallbackProduct("Storage Box", "storage-box", "Storage & Organization", "1899", "2499", fallbackImages.storage)
];
