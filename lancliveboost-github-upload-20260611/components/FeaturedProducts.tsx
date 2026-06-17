import Link from "next/link";
import { getCollectionByHandle, getProducts, logShopifyDebug } from "@/lib/shopify/client";
import { ArrowIcon } from "./Icons";
import ProductGrid from "./ProductGrid";

const HOMEPAGE_FEATURED_COLLECTION_HANDLE = "homepage-featured";

export default async function FeaturedProducts() {
  const featuredCollection = await getCollectionByHandle(HOMEPAGE_FEATURED_COLLECTION_HANDLE, { first: 8 });
  const collectionProducts = featuredCollection?.collection.products || [];
  const { products: fallbackProducts } = collectionProducts.length ? { products: [] } : await getProducts({ first: 8 });
  const products = collectionProducts.length ? collectionProducts : fallbackProducts;
  logShopifyDebug("homepage.featured.source", {
    handle: HOMEPAGE_FEATURED_COLLECTION_HANDLE,
    source: collectionProducts.length ? "collection" : "products_fallback",
    productCount: products.length
  });

  return (
    <section className="section-pad">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Handpicked for you</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Featured Products</h2>
            <p className="mt-2 text-sm text-muted">Live Shopify products with WhatsApp support as backup.</p>
          </div>
          <Link href="/collections" className="inline-flex items-center gap-2 font-bold text-brand hover:text-brand-dark">
            See all products
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
