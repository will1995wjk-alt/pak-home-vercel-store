import { fallbackProducts } from "@/data/fallback-products";
import Link from "next/link";
import { ArrowIcon } from "./Icons";
import ProductGrid from "./ProductGrid";

export default function FeaturedProducts() {
  const products = fallbackProducts.slice(0, 8);

  return (
    <section className="section-pad">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">Handpicked for you</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Featured Products</h2>
            <p className="mt-2 text-sm text-muted">Checkout is handled on each Shopify product page or WhatsApp.</p>
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
