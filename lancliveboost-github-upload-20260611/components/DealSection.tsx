import { getCollectionByHandle, logShopifyDebug } from "@/lib/shopify/client";
import ProductGrid from "./ProductGrid";

const HOT_DEALS_COLLECTION_HANDLE = "hot-deals";

export default async function DealSection() {
  const dealsCollection = await getCollectionByHandle(HOT_DEALS_COLLECTION_HANDLE, { first: 4 });
  const products = dealsCollection?.collection.products || [];
  logShopifyDebug("homepage.hot_deals.source", {
    handle: HOT_DEALS_COLLECTION_HANDLE,
    source: products.length ? "collection" : "empty_collection",
    productCount: products.length
  });

  return (
    <section className="bg-navy py-14 text-white">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-black text-accent">
              Limited time offers
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">Today&apos;s Hot Deals</h2>
            <p className="mt-2 text-white/70">Grab these prices before they are gone.</p>
          </div>
        </div>
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
