import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import ProductInfo from "@/components/ProductInfo";
import { getProductByHandle } from "@/lib/shopify/client";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const result = await getProductByHandle(handle).catch(() => null);
  if (!result?.product) return createMetadata({ title: "Product" });
  const image = result.product.featuredImage?.url;
  return createMetadata({
    title: result.product.seo?.title || result.product.title,
    description: result.product.seo?.description || result.product.description,
    path: `/products/${result.product.handle}`,
    image
  });
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const result = await getProductByHandle(handle).catch(() => null);
  if (!result?.product) notFound();

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={result.product} />
        <ProductInfo product={result.product} />
      </div>
      <section className="section-pad">
        <h2 className="text-3xl font-black">Related products</h2>
        <div className="mt-6">
          <ProductGrid products={result.relatedProducts.slice(0, 4)} />
        </div>
      </section>
    </div>
  );
}
