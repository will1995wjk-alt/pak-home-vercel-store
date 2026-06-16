import { fallbackProducts } from "@/data/fallback-products";
import ProductGrid from "./ProductGrid";

export default function DealSection() {
  const products = fallbackProducts.filter((product) => product.tags.includes("deal")).slice(0, 4);

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
