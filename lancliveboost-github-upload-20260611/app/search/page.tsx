import ProductGrid from "@/components/ProductGrid";
import { emptyPageInfo, searchFallbackProducts } from "@/lib/fallback-catalog";
import { searchProducts } from "@/lib/shopify/client";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ title: "Search", description: "Search home appliances and daily essentials in Pakistan.", path: "/search" });

type Props = {
  searchParams: Promise<{ q?: string; after?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", after } = await searchParams;
  const query = q.trim();
  const shopifyResult = query ? await searchProducts(query, { after }).catch(() => null) : null;
  const fallbackProducts = query ? searchFallbackProducts(query) : searchFallbackProducts("");
  const result = shopifyResult || {
    products: fallbackProducts,
    pageInfo: emptyPageInfo
  };

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
          <>
            <p className="mb-4 text-muted">
              Results for &quot;{query}&quot;{shopifyResult ? "" : " from sample products"}
            </p>
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
          <>
            <div className="card p-6 text-muted">Type a product name to search, or browse popular sample products below.</div>
            <div className="mt-6">
              <ProductGrid products={result.products} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
