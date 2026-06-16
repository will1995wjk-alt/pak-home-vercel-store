import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getFallbackCollection } from "@/lib/fallback-catalog";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ after?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const view = getFallbackCollection(handle);
  const collection = view?.collection;
  if (!collection) return createMetadata({ title: "Collection" });
  return createMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.handle}`,
    image: collection.image?.url
  });
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  await searchParams;
  const view = getFallbackCollection(handle);
  if (!view?.collection) notFound();

  return (
    <div className="container py-10">
      <p className="eyebrow">Shop by category</p>
      <h1 className="mt-2 text-4xl font-black">{view.collection.title}</h1>
      {view.collection.description ? <p className="mt-3 max-w-3xl text-muted">{view.collection.description}</p> : null}
      <p className="mt-2 text-sm text-muted">Checkout is handled on each Shopify product page or WhatsApp.</p>
      <div className="mt-8">
        <ProductGrid products={view.collection.products || []} />
      </div>
      {view.pageInfo.hasNextPage && view.pageInfo.endCursor ? (
        <div className="mt-8 text-center">
          <a className="button button-secondary" href={`/collections/${handle}?after=${encodeURIComponent(view.pageInfo.endCursor)}`}>
            Load more
          </a>
        </div>
      ) : null}
    </div>
  );
}
