import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { createMetadata } from "@/lib/seo";
import { getCollectionByHandle } from "@/lib/shopify/client";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ after?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const view = await getCollectionByHandle(handle);
  const collection = view?.collection;
  if (!collection) return createMetadata({ title: "Collection" });
  return createMetadata({
    title: collection.title,
    description: collection.description,
    path: `/collections/${collection.handle}`,
    image: collection.image?.url
  });
}

export const revalidate = 60;

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { after } = await searchParams;
  const view = await getCollectionByHandle(handle, { after });
  if (!view?.collection) notFound();

  return (
    <div className="container py-10">
      <p className="eyebrow">Shop by category</p>
      <h1 className="mt-2 text-4xl font-black">{view.collection.title}</h1>
      {view.collection.description ? <p className="mt-3 max-w-3xl text-muted">{view.collection.description}</p> : null}
      <p className="mt-2 text-sm text-muted">Products sync from Shopify. WhatsApp ordering stays available if checkout is temporarily unavailable.</p>
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
