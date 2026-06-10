import { fallbackProducts } from "@/data/fallback-products";
import { getProducts } from "@/lib/shopify/client";
import ProductGrid from "./ProductGrid";

export default async function FeaturedProducts() {
  try {
    const { products } = await getProducts({ first: 8 });
    return (
      <section className="section-pad">
        <div className="container">
          <h2 className="text-3xl font-black">Featured products</h2>
          <div className="mt-6">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    );
  } catch {
    return (
      <section className="section-pad">
        <div className="container">
          <h2 className="text-3xl font-black">Featured products</h2>
          <p className="mt-2 text-muted">Sample products are shown until Shopify Storefront API is connected.</p>
          <div className="mt-6">
            <ProductGrid products={fallbackProducts} />
          </div>
        </div>
      </section>
    );
  }
}
