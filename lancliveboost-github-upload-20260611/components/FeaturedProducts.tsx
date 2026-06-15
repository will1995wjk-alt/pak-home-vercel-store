import { fallbackProducts } from "@/data/fallback-products";
import { getProducts } from "@/lib/shopify/client";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import ProductGrid from "./ProductGrid";

export default async function FeaturedProducts() {
  let products = fallbackProducts;
  let isFallback = true;

  try {
    const result = await getProducts({ first: 8 });
    if (result.products.length) {
      products = result.products;
      isFallback = false;
    }
  } catch {
    products = fallbackProducts;
    isFallback = true;
  }

  return (
    <section className="section-pad">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Handpicked for you</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Featured Products</h2>
            {isFallback ? (
              <p className="mt-2 text-sm text-muted">Sample products are shown until Shopify products are connected.</p>
            ) : null}
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
