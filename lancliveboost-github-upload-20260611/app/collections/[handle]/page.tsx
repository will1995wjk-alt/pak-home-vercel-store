import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getCollectionByHandle } from "@/lib/shopify/client";
import { createMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ after?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const result = await getCollectionByHandle(handle).catch(() => null);
  if (!result?.collection) return createMetadata({ title: "Collection" });
  return createMetadata({
    title: result.collection.title,
    description: result.collection.description,
    path: `/collections/${result.collection.handle}`,
    image: result.collection.image?.url
  });
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const { after } = await searchParams;
  const result = await getCollectionByHandle(handle, { first: 24, after }).catch(() => null);
  if (!result?.collection) notFound();

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">{result.collection.title}</h1>
      {result.collection.description ? <p className="mt-3 max-w-3xl text-muted">{result.collection.description}</p> : null}
      <div className="mt-8">
        <ProductGrid products={result.collection.products || []} />
      </div>
      {result.pageInfo.hasNextPage && result.pageInfo.endCursor ? (
        <div className="mt-8 text-center">
          <a className="button button-secondary" href={`/collections/${handle}?after=${encodeURIComponent(result.pageInfo.endCursor)}`}>
            Load more
          </a>
        </div>
      ) : null}
    </div>
  );
}
