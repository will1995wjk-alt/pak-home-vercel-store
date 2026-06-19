import type { Product } from "@/lib/shopify/types";
import ProductCard from "./ProductCard";

export default function FeaturedProductCarousel({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="card p-8 text-center text-muted">No products found.</div>;
  }

  if (products.length <= 5) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  const productGroups = [products, products];

  return (
    <div className="product-carousel" aria-label="Featured products carousel">
      <div className="product-carousel-track">
        {productGroups.map((group, groupIndex) => (
          <div className="product-carousel-group" key={groupIndex} aria-hidden={groupIndex === 1}>
            {group.map((product) => (
              <div className="product-carousel-item" key={`${groupIndex}-${product.id}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
