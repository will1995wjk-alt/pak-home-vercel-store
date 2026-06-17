import { NextResponse } from "next/server";
import { getShopifyConfig } from "@/lib/config";
import { fetchShopify } from "@/lib/shopify/client";
import { COLLECTION_BY_HANDLE_QUERY } from "@/lib/shopify/queries";

const DEBUG_COLLECTIONS = ["homepage-featured", "hot-deals"];

async function inspectCollection(handle: string) {
  try {
    const data = await fetchShopify<{
      collectionByHandle: {
        id: string;
        handle: string;
        title: string;
        products: { nodes: { id: string; handle: string; title: string; availableForSale: boolean }[] };
      } | null;
    }>(COLLECTION_BY_HANDLE_QUERY, { handle, first: 12 }, { cache: "no-store" });

    return {
      handle,
      found: Boolean(data.collectionByHandle),
      title: data.collectionByHandle?.title || null,
      productCount: data.collectionByHandle?.products.nodes.length || 0,
      productHandles: data.collectionByHandle?.products.nodes.map((product) => product.handle) || [],
      availableCount: data.collectionByHandle?.products.nodes.filter((product) => product.availableForSale).length || 0
    };
  } catch (error) {
    return {
      handle,
      found: false,
      productCount: 0,
      productHandles: [],
      availableCount: 0,
      error: error instanceof Error ? error.message : "Unknown Shopify error"
    };
  }
}

export async function GET() {
  const config = getShopifyConfig();
  const collections = await Promise.all(DEBUG_COLLECTIONS.map(inspectCollection));

  return NextResponse.json({
    ok: collections.every((collection) => collection.found && collection.productCount > 0),
    shopify: {
      domainConfigured: Boolean(config?.domain),
      tokenConfigured: Boolean(config?.token),
      domain: config?.domain || null
    },
    collections,
    note: "Safe debug only. Storefront token is never returned."
  });
}
