import { fallbackProducts } from "@/data/fallback-products";
import { getProducts } from "@/lib/shopify/client";
import ProductGrid from "./ProductGrid";

export default async function DealSection() {
  try {
    const { products } = await getProducts({ first: 4, query: "tag:deal OR tag:sale" });
    return (
      <section className="bg-white py-12">
        <div className="container">
          <p className="font-black text-accent">Limited time offers</p>
          <h2 className="mt-1 text-3xl font-black">Today's Hot Deals</h2>
          <div className="mt-6">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    );
  } catch {
    return (
      <section className="bg-white py-12">
        <div className="container">
          <p className="font-black text-accent">Limited time offers</p>
          <h2 className="mt-1 text-3xl font-black">Today's Hot Deals</h2>
          <p className="mt-2 text-muted">Sample deals are shown until Shopify products are connected.</p>
          <div className="mt-6">
            <ProductGrid products={fallbackProducts.slice(0, 2)} />
          </div>
        </div>
      </section>
    );
  }
}
