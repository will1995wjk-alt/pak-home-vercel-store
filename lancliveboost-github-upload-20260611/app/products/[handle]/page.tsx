import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import ProductInfo from "@/components/ProductInfo";
import { createMetadata } from "@/lib/seo";
import { getProductByHandle } from "@/lib/shopify/client";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const view = await getProductByHandle(handle);
  const product = view?.product;
  if (!product) return createMetadata({ title: "Product" });
  const image = product.featuredImage?.url;
  return createMetadata({
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    path: `/products/${product.handle}`,
    image
  });
}

export const revalidate = 60;

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const view = await getProductByHandle(handle);
  if (!view?.product) notFound();

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery product={view.product} />
        <ProductInfo product={view.product} isFallback={view.product.id.startsWith("fallback-")} />
      </div>
      <section className="section-pad">
        <h2 className="text-3xl font-black">Related products</h2>
        <div className="mt-6">
          <ProductGrid products={view.relatedProducts.slice(0, 4)} />
        </div>
      </section>
    </div>
  );
}
