import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/homepage";
import { getCollections } from "@/lib/shopify/client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Collections",
  description: "Browse Pakistan home appliances, cleaning, personal care, daily use products, and storage collections.",
  path: "/collections"
});

export default async function CollectionsPage() {
  const result = await getCollections({ first: 30 }).catch(() => null);
  const collections = result?.nodes || [];

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">Collections</h1>
      <p className="mt-3 max-w-2xl text-muted">Shop home essentials by category. Create matching Shopify collections to make these pages live from your admin.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {(collections.length ? collections : categories).map((collection: any) => {
          const href = `/collections/${collection.handle}`;
          const image = collection.image?.url || collection.image || "https://placehold.co/700x520?text=Collection";
          const title = collection.title;
          return (
            <Link key={collection.handle} href={href} className="card overflow-hidden hover:shadow-soft">
              <Image src={image} alt={collection.image?.altText || title} width={700} height={520} className="aspect-[4/3] object-cover" />
              <div className="p-4 font-black">{title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
