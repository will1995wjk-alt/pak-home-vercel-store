import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getCollections } from "@/lib/shopify/client";

export const metadata = createMetadata({
  title: "Collections",
  description: "Browse Pakistan home appliances, cleaning, personal care, daily use products, and storage collections.",
  path: "/collections"
});

export const revalidate = 60;

export default async function CollectionsPage() {
  const collections = await getCollections({ first: 24 });

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">Collections</h1>
      <p className="mt-3 max-w-2xl text-muted">Browse live Shopify collections. Demo categories appear automatically if Shopify is unavailable.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {collections.nodes.map((collection) => {
          const href = `/collections/${collection.handle}`;
          const image = collection.image?.url || "/images/cat-daily-use.png";
          const title = collection.title;
          return (
            <Link key={collection.handle} href={href} className="card overflow-hidden hover:shadow-soft">
              <Image src={image} alt={title} width={700} height={520} className="aspect-[4/3] object-cover" />
              <div className="p-4">
                <strong className="block font-black">{title}</strong>
                {collection.description ? <span className="mt-1 line-clamp-2 block text-sm text-muted">{collection.description}</span> : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
