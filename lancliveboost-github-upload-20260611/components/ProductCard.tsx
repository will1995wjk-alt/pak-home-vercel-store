import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney, getCompareAtPrice, getDiscountPercent, getProductPrice, isDiscounted } from "@/lib/shopify/utils";
import AddToCartButton from "./AddToCartButton";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const image = product.featuredImage || product.images[0];
  const firstVariant = product.variants[0];
  const canAddToCart = Boolean(firstVariant?.id?.startsWith("gid://shopify/")) && product.availableForSale;
  const price = getProductPrice(product);
  const compareAt = getCompareAtPrice(product);

  return (
    <article className="card overflow-hidden">
      <Link href={`/products/${product.handle}`} className="block bg-paper">
        {image ? (
          <Image src={image.url} alt={image.altText || product.title} width={700} height={700} className="aspect-square object-cover" />
        ) : (
          <div className="grid aspect-square place-items-center bg-paper text-sm text-muted">No image</div>
        )}
      </Link>
      <div className="grid gap-3 p-3">
        <div>
          {isDiscounted(product) ? <span className="rounded bg-accent px-2 py-1 text-xs font-black text-white">{getDiscountPercent(product)}% off</span> : null}
          <h3 className="mt-2 line-clamp-2 min-h-12 font-black">
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <strong>{formatMoney(price)}</strong>
            {compareAt ? <span className="text-sm text-muted line-through">{formatMoney(compareAt)}</span> : null}
          </div>
        </div>
        <div className="grid gap-2">
          <AddToCartButton merchandiseId={firstVariant?.id || ""} disabled={!canAddToCart} />
          <WhatsAppButton product={{ title: product.title, handle: product.handle, price }} />
        </div>
      </div>
    </article>
  );
}
