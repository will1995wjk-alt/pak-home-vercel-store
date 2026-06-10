import ProductGrid from "@/components/ProductGrid";
import { searchProducts } from "@/lib/shopify/client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Search", description: "Search home appliances and daily essentials in Pakistan.", path: "/search" });

type Props = {
  searchParams: Promise<{ q?: string; after?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", after } = await searchParams;
  const query = q.trim();
  const result = query ? await searchProducts(query, { after }).catch(() => null) : null;

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-black">Search</h1>
      <form className="mt-6 flex max-w-xl gap-2" action="/search">
        <input className="field w-full" name="q" defaultValue={query} placeholder="Search products" />
        <button className="button button-primary" type="submit">
          Search
        </button>
      </form>
      <div className="mt-8">
        {query ? (
          result ? (
            <>
              <p className="mb-4 text-muted">Results for "{query}"</p>
              <ProductGrid products={result.products} />
              {result.pageInfo.hasNextPage && result.pageInfo.endCursor ? (
                <div className="mt-8 text-center">
                  <a className="button button-secondary" href={`/search?q=${encodeURIComponent(query)}&after=${encodeURIComponent(result.pageInfo.endCursor)}`}>
                    Load more
                  </a>
                </div>
              ) : null}
            </>
          ) : (
            <div className="card p-8 text-muted">Connect Shopify API settings to search products.</div>
          )
        ) : (
          <div className="card p-8 text-muted">Type a product name to search.</div>
        )}
      </div>
    </div>
  );
}
