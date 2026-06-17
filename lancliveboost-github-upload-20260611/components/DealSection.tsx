import { fallbackProducts } from "@/data/fallback-products";
import { getCollectionByHandle, getProducts } from "@/lib/shopify/client";
import { isDiscounted } from "@/lib/shopify/utils";
import ProductGrid from "./ProductGrid";

const HOT_DEALS_COLLECTION_HANDLE = "hot-deals";

export default async function DealSection() {
  const dealsCollection = await getCollectionByHandle(HOT_DEALS_COLLECTION_HANDLE, { first: 4 });
  const collectionProducts = dealsCollection?.collection.products || [];
  const { products: catalog } = collectionProducts.length ? { products: [] } : await getProducts({ first: 16 });
  const discountedProducts = catalog
    .filter((product) => isDiscounted(product) || product.tags.some((tag) => ["deal", "hot-deals"].includes(tag)))
    .slice(0, 4);
  const demoDeals = fallbackProducts.filter((product) => isDiscounted(product)).slice(0, 4);
  const products = collectionProducts.length ? collectionProducts : discountedProducts.length ? discountedProducts : demoDeals;

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
