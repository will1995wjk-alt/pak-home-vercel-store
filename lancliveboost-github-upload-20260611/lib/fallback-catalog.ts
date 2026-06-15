import { categories } from "@/data/homepage";
import { fallbackProducts } from "@/data/fallback-products";
import type { Collection, PageInfo, Product } from "@/lib/shopify/types";

export const emptyPageInfo: PageInfo = {
  hasNextPage: false,
  endCursor: null
};

function normalize(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function getFallbackCollection(handle: string) {
  const category = categories.find((item) => item.handle === handle);
  if (!category) return null;

  const products = fallbackProducts.filter((product) => {
    const productType = normalize(product.productType);
    return product.tags.map(normalize).includes(handle) || productType === handle;
  });

  return {
    collection: {
      id: `fallback-collection-${handle}`,
      handle,
      title: category.title,
      description: `${category.title} selected for Pakistan households with COD and WhatsApp support.`,
      image: {
        url: category.image,
        altText: category.title,
        width: 900,
        height: 650
      },
      products
    } as Collection,
    pageInfo: emptyPageInfo
  };
}

export function getFallbackProduct(handle: string) {
  const product = fallbackProducts.find((item) => item.handle === handle);
  if (!product) return null;

  const relatedProducts = fallbackProducts
    .filter((item) => item.handle !== handle && item.productType === product.productType)
    .concat(fallbackProducts.filter((item) => item.handle !== handle && item.productType !== product.productType))
    .slice(0, 4);

  return { product, relatedProducts };
}

export function searchFallbackProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return fallbackProducts.slice(0, 8);

  return fallbackProducts.filter((product) => {
    const haystack = [product.title, product.productType, product.description, ...product.tags].join(" ").toLowerCase();
    return haystack.includes(term);
  });
}
