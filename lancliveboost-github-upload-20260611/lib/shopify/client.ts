import { getShopifyConfig } from "../config";
import {
  CART_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  COLLECTIONS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  SEARCH_PRODUCTS_QUERY
} from "./queries";
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION
} from "./mutations";
import type { Cart, Collection, PageInfo, Product } from "./types";
import {
  emptyPageInfo,
  getFallbackCollection,
  getFallbackCollections,
  getFallbackProduct,
  getFallbackProducts,
  searchFallbackProducts
} from "../fallback-catalog";

const API_VERSION = "2026-04";
const SHOPIFY_REVALIDATE_SECONDS = 60;

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type Connection<T> = {
  pageInfo: PageInfo;
  nodes: T[];
};

type ShopifyFetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

export async function fetchShopify<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: ShopifyFetchOptions = {}
) {
  const config = getShopifyConfig();
  if (!config) {
    throw new Error("Shopify checkout is not connected yet.");
  }
  const { domain, token } = config;
  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;
  const { cache, revalidate } = options;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token
    },
    body: JSON.stringify({ query, variables }),
    ...(cache ? { cache } : {}),
    ...(typeof revalidate === "number" ? { next: { revalidate } } : {})
  });

  if (!response.ok) {
    throw new Error(`Shopify API request failed with status ${response.status}.`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((error) => error.message).join("; "));
  }

  if (!json.data) {
    throw new Error("Shopify API returned an empty response.");
  }

  return json.data;
}

function unwrapProduct(product: any): Product {
  return {
    ...product,
    options: product.options?.map((option: any) => ({
      name: option.name,
      values: option.optionValues?.map((value: any) => value.name) || []
    })) || [],
    images: product.images?.nodes || [],
    variants: product.variants?.nodes || [],
    collections: product.collections?.nodes || [],
    shopifyProductUrl: product.onlineStoreUrl || undefined
  };
}

function unwrapProducts(products: any[] = []) {
  return products.map(unwrapProduct);
}

function throwUserErrors(errors?: { message: string }[]) {
  if (errors?.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }
}

export async function getProducts({ first = 12, after, query }: { first?: number; after?: string; query?: string } = {}) {
  try {
    const data = await fetchShopify<{ products: Connection<any> }>(
      PRODUCTS_QUERY,
      { first, after, query },
      { revalidate: SHOPIFY_REVALIDATE_SECONDS }
    );
    const products = unwrapProducts(data.products.nodes);
    return products.length ? { products, pageInfo: data.products.pageInfo } : getFallbackProducts(first);
  } catch {
    return getFallbackProducts(first);
  }
}

export async function getProductByHandle(handle: string) {
  try {
    const data = await fetchShopify<{ productByHandle: any | null }>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle },
      { revalidate: SHOPIFY_REVALIDATE_SECONDS }
    );
    if (!data.productByHandle) return getFallbackProduct(handle);
    const related = data.productByHandle.relatedCollection?.nodes?.[0]?.products?.nodes || [];
    return {
      product: unwrapProduct(data.productByHandle),
      relatedProducts: unwrapProducts(related).filter((item) => item.handle !== handle)
    };
  } catch {
    return getFallbackProduct(handle);
  }
}

export async function getCollections({ first = 20, after }: { first?: number; after?: string } = {}) {
  try {
    const data = await fetchShopify<{ collections: Connection<Collection> }>(
      COLLECTIONS_QUERY,
      { first, after },
      { revalidate: SHOPIFY_REVALIDATE_SECONDS }
    );
    return data.collections.nodes.length ? data.collections : getFallbackCollections();
  } catch {
    return getFallbackCollections();
  }
}

export async function getCollectionByHandle(handle: string, { first = 24, after }: { first?: number; after?: string } = {}) {
  try {
    const data = await fetchShopify<{ collectionByHandle: any | null }>(
      COLLECTION_BY_HANDLE_QUERY,
      { handle, first, after },
      { revalidate: SHOPIFY_REVALIDATE_SECONDS }
    );
    if (!data.collectionByHandle) return getFallbackCollection(handle);
    const products = unwrapProducts(data.collectionByHandle.products.nodes);
    return {
      collection: {
        ...data.collectionByHandle,
        products
      } as Collection,
      pageInfo: data.collectionByHandle.products.pageInfo as PageInfo
    };
  } catch {
    return getFallbackCollection(handle);
  }
}

export async function createCart(lines: { merchandiseId: string; quantity: number }[] = []) {
  const data = await fetchShopify<{ cartCreate: { cart: Pick<Cart, "id" | "checkoutUrl"> | null; userErrors: { message: string }[] } }>(
    CREATE_CART_MUTATION,
    { input: { lines } }
  );
  throwUserErrors(data.cartCreate.userErrors);
  if (!data.cartCreate.cart) throw new Error("Unable to create cart.");
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
  const data = await fetchShopify<{ cartLinesAdd: { userErrors: { message: string }[] } }>(
    ADD_TO_CART_MUTATION,
    { cartId, lines }
  );
  throwUserErrors(data.cartLinesAdd.userErrors);
  return getCart(cartId);
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]) {
  const data = await fetchShopify<{ cartLinesUpdate: { userErrors: { message: string }[] } }>(
    UPDATE_CART_MUTATION,
    { cartId, lines }
  );
  throwUserErrors(data.cartLinesUpdate.userErrors);
  return getCart(cartId);
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const data = await fetchShopify<{ cartLinesRemove: { userErrors: { message: string }[] } }>(
    REMOVE_FROM_CART_MUTATION,
    { cartId, lineIds }
  );
  throwUserErrors(data.cartLinesRemove.userErrors);
  return getCart(cartId);
}

export async function getCart(cartId: string) {
  const data = await fetchShopify<{ cart: any | null }>(CART_QUERY, { id: cartId }, { cache: "no-store" });
  if (!data.cart) return null;
  return {
    ...data.cart,
    lines: data.cart.lines.nodes
  } as Cart;
}

export async function searchProducts(query: string, { first = 24, after }: { first?: number; after?: string } = {}) {
  try {
    const data = await fetchShopify<{ products: Connection<any> }>(
      SEARCH_PRODUCTS_QUERY,
      { query, first, after },
      { revalidate: SHOPIFY_REVALIDATE_SECONDS }
    );
    const products = unwrapProducts(data.products.nodes);
    return {
      products: products.length ? products : searchFallbackProducts(query).slice(0, first),
      pageInfo: products.length ? data.products.pageInfo : emptyPageInfo
    };
  } catch {
    return {
      products: searchFallbackProducts(query).slice(0, first),
      pageInfo: emptyPageInfo
    };
  }
}
